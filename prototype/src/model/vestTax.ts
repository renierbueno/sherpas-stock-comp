// F-C · Tax at vest and the withholding gap (docs/spec/F-C_tax-at-vest.md), with the income
// income rule of F-E it depends on (AC-E-12). Tax figures come from src/model/tax.ts
// (real 2026 federal and FICA rules, SIMULATED state rate).
import { countedFutureVests, type TrancheValue } from './grants';
import { P_LIQ_HORIZON_MONTHS } from './params';
import { householdTax, SUPPLEMENTAL, type TaxByLevel } from './tax';
import type { Firm, Household, PersonId } from './types';

const yearOf = (iso: string) => Number(iso.slice(0, 4));

/**
 * Wages per person for a year before the vests are added: the reported salary, which excludes
 * company stock (AC-E-02, AC-E-12).
 */
export function baseWages(h: Household, _firm: Firm, _year: number): Record<PersonId, number> {
  return Object.fromEntries(h.people.map((p) => [p.id, h.salary[p.id] ?? 0]));
}

/** AC-E-12: every future vest of a year is added beside the reported salary. */
export function addedVestIncome(h: Household, firm: Firm, year: number): number {
  return countedFutureVests(h, firm)
    .filter((v) => yearOf(v.tranche.date) === year)
    .reduce((s, v) => s + v.value, 0);
}

export interface VestTax {
  vest: TrancheValue;
  owed: TaxByLevel;
  withheldFederal: number;
  federalGap: number;
  /** Null when no state withholding rate is entered (AC-C-12). */
  stateGap: number | null;
  /** What counts: positive federal gap plus the state gap when entered (AC-C-10, AC-C-11, AC-C-18). */
  gap: number;
  withinHorizon: boolean;
  /** PSU: the same figures at the bottom and top of the payout range (AC-C-16). */
  range?: { min: { owed: number; gap: number }; max: { owed: number; gap: number } };
}

const sum = (t: TaxByLevel) => t.federal + t.fica + t.state;

function computeAll(h: Household, firm: Firm, scale?: { trancheId: string; factor: number }): VestTax[] {
  const vests = countedFutureVests(h, firm).map((v) => (scale && v.tranche.id === scale.trancheId && v.psu ? { ...v, value: v.value * scale.factor } : v));
  const horizon = new Date(h.analysisDate);
  horizon.setUTCMonth(horizon.getUTCMonth() + P_LIQ_HORIZON_MONTHS);
  const out: VestTax[] = [];
  for (const year of [...new Set(vests.map((v) => yearOf(v.tranche.date)))]) {
    const wages = baseWages(h, firm, year);
    let prev = householdTax(h, wages);
    const perEmployer = new Map<string, number>(); // AC-C-05: per person and employer (D-060)
    for (const v of vests.filter((x) => yearOf(x.tranche.date) === year)) {
      wages[v.grant.ownerId] = (wages[v.grant.ownerId] ?? 0) + v.value; // AC-C-01
      const next = householdTax(h, wages);
      const owed = { federal: next.federal - prev.federal, fica: next.fica - prev.fica, state: next.state - prev.state }; // AC-C-03
      prev = next;
      const key = `${v.grant.ownerId}|${v.grant.employerId}`;
      const before = perEmployer.get(key) ?? 0;
      perEmployer.set(key, before + v.value);
      const above = Math.max(0, before + v.value - Math.max(before, SUPPLEMENTAL.threshold));
      const withheldFederal = (v.value - above) * SUPPLEMENTAL.rate + above * SUPPLEMENTAL.highRate;
      const federalGap = owed.federal - withheldFederal;
      const rate = v.grant.stateWithholdingRate;
      const stateGap = rate === undefined ? null : owed.state - rate * v.value;
      const gap = Math.max(0, federalGap + (stateGap ?? 0)); // AC-C-15: zero or below counts nothing
      out.push({ vest: v, owed, withheldFederal, federalGap, stateGap, gap, withinHorizon: new Date(v.tranche.date) <= horizon });
    }
  }
  return out;
}

/** Tax, withholding and gap for every counted future vest, in date order. */
export function vestTaxes(h: Household, firm: Firm): VestTax[] {
  const base = computeAll(h, firm);
  return base.map((t) => {
    if (!t.vest.psu) return t;
    const r = t.vest.grant.psu!;
    const at = (factor: number) => {
      const x = computeAll(h, firm, { trancheId: t.vest.tranche.id, factor }).find((y) => y.vest.tranche.id === t.vest.tranche.id)!;
      return { owed: sum(x.owed), gap: x.gap };
    };
    return { ...t, range: { min: at(r.rangeMin), max: at(r.rangeMax) } };
  });
}

/** AC-C-17 to AC-C-19: positive gaps of vests within the horizon, a PSU at target. */
export function countedVestGaps(h: Household, firm: Firm): { total: number; federalOnly: boolean; psu: boolean } {
  const counted = vestTaxes(h, firm).filter((t) => t.withinHorizon && t.gap > 0);
  return {
    total: counted.reduce((s, t) => s + t.gap, 0),
    federalOnly: counted.some((t) => t.stateGap === null),
    psu: counted.some((t) => t.vest.psu),
  };
}

export const totalOwed = sum;
