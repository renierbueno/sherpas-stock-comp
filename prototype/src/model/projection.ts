// F-D · Vest proceeds as dated cash for goals (docs/spec/F-D_vest-proceeds-dated-cash.md).
// The projection itself is SIMULATED (growth and savings below): the platform's projection is not
// public. What is tested is how vests enter it, not the projection.
import { deliveryOf, netWorth } from './grants';
import { dateLabel, money } from './format';
import { vestSavingRate } from './params';
import type { Firm, Household } from './types';
import { totalOwed, vestTaxes, type VestTax } from './vestTax';

const SIM_GROWTH = 0.05;
const yearOf = (iso: string) => Number(iso.slice(0, 4));

export interface Inflow {
  date: string;
  company: string;
  before: number;
  after: number;
  psu: boolean;
  min: number;
  max: number;
}

/** AC-D-01, AC-D-02: one inflow per counted future tranche, after the tax computed in F-C. */
export function vestInflows(h: Household, firm: Firm): Inflow[] {
  return vestTaxes(h, firm).map((t: VestTax) => {
    const after = t.vest.value - totalOwed(t.owed);
    const share = t.vest.value > 0 ? after / t.vest.value : 0;
    return {
      date: deliveryOf(t.vest.tranche), // AC-D-01: on its delivery date
      company: h.employers.find((e) => e.id === t.vest.grant.employerId)?.name ?? '',
      before: t.vest.value,
      after,
      psu: t.vest.psu,
      min: t.vest.min * share,
      max: t.vest.max * share,
    };
  });
}

export interface ProjectionPoint { year: number; netWorth: number; vestAfterTax: number; low?: number; high?: number }

/** P-VEST-SAVE: the share of each vest, after tax, the household saves, as it saves its wages. */
export const savingRate = (h: Household) => vestSavingRate(h.annualSavings, Object.values(h.salary));

/**
 * Yearly projected net worth. Starts from current net worth (no unvested value, AC-B-22, AC-D-05).
 * Each vest enters once, on its year, as wages of that year (AC-D-10, D-106): after its tax, the
 * household saves the share it saves of its salary (P-VEST-SAVE, D-118) and spends the rest.
 */
export function projection(h: Household, firm: Firm, years = 10): ProjectionPoint[] {
  const inflows = vestInflows(h, firm);
  const rate = savingRate(h);
  const start = yearOf(h.analysisDate);
  let nw = netWorth(h);
  let low = nw;
  let high = nw;
  const out: ProjectionPoint[] = [];
  for (let y = start; y <= start + years; y++) {
    const inYear = inflows.filter((i) => yearOf(i.date) === y);
    const add = inYear.reduce((s, i) => s + i.after, 0);
    const psu = inYear.some((i) => i.psu);
    if (y > start) { nw *= 1 + SIM_GROWTH; low *= 1 + SIM_GROWTH; high *= 1 + SIM_GROWTH; }
    nw += (y > start ? h.annualSavings : 0) + add * rate;
    low += (y > start ? h.annualSavings : 0) + rate * inYear.reduce((s, i) => s + (i.psu ? i.min : i.after), 0);
    high += (y > start ? h.annualSavings : 0) + rate * inYear.reduce((s, i) => s + (i.psu ? i.max : i.after), 0);
    out.push({ year: y, netWorth: nw, vestAfterTax: add, ...(psu ? { low, high } : {}) });
  }
  return out;
}

/**
 * AC-D-11: a figure read from the projection, here net worth at its last year, labelled when it
 * includes future vests; "at target" where performance units are included.
 */
export function projectedFigure(h: Household, firm: Firm): { year: number; value: number; label: string | null } {
  const last = projection(h, firm).at(-1)!;
  const inflows = vestInflows(h, firm);
  const label = inflows.length === 0 ? null
    : `includes future vests after estimated tax, at the ${dateLabel(h.analysisDate)} price${inflows.some((i) => i.psu) ? ', at target' : ''}`;
  return { year: last.year, value: last.netWorth, label };
}

export const projectedFigureText = (h: Household, firm: Firm) => {
  const f = projectedFigure(h, firm);
  return `Projected net worth in ${f.year}: ${money(f.value)}`;
};
