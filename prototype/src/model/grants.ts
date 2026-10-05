// F-B · Record a grant and its vests (docs/spec/F-B_record-grant-and-vests.md).
import type { EventLog } from './events';
import { priceOf } from './market';
import type { Employer, Firm, Grant, Household, IsoDate, Tranche } from './types';

export const PSU_DEFAULT_RANGE = { rangeMin: 0, rangeMax: 2 }; // AC-B-17, R-002

export type GrantStatus = 'complete' | 'pending detail' | 'awaiting a liquidity event' | 'proposed';

export const employerOf = (h: Household, g: Grant): Employer | undefined => h.employers.find((e) => e.id === g.employerId);

/** AC-B-11, AC-B-13: tranches dated after the analysis date and not forfeited. */
export function futureTranches(h: Household, g: Grant): Tranche[] {
  return g.tranches.filter((t) => t.date > h.analysisDate && !t.forfeited).sort((a, b) => a.date.localeCompare(b.date));
}

/** AC-B-11: tranches on or before the analysis date (for the AC-B-12 prompt). */
export function pastTranches(h: Household, g: Grant): Tranche[] {
  return g.tranches.filter((t) => t.date <= h.analysisDate && !t.forfeited);
}

/** AC-B-19: private employer and no vest dates. */
const awaiting = (h: Household, g: Grant) => employerOf(h, g)?.listed === false && g.tranches.length === 0;

/** AC-B-28: complete when every field the figures need is there. */
export function isComplete(h: Household, g: Grant): boolean {
  const e = employerOf(h, g);
  const answer = h.incomeIncludesVests[g.ownerId];
  return (
    !!g.ownerId &&
    !!g.type &&
    !!e && e.listed && !!e.ticker &&
    !!g.units && g.units > 0 &&
    futureTranches(h, g).some((t) => t.units > 0) &&
    (g.type === 'RSU' || !!(g.psu && g.psu.condition && g.psu.periodEnd)) &&
    (answer === 'yes' || answer === 'no')
  );
}

export function statusOf(h: Household, g: Grant): GrantStatus {
  if (g.proposed) return 'proposed';
  if (awaiting(h, g)) return 'awaiting a liquidity event';
  return isComplete(h, g) ? 'complete' : 'pending detail';
}

/**
 * Grants that enter the figures: complete, listed, priced, confirmed, setting on
 * (AC-G-04, AC-G-05, AC-B-30, AC-F-03, AC-G-13).
 */
export function countedGrants(h: Household, firm: Firm): Grant[] {
  if (!firm.stockComp) return [];
  return h.grants.filter((g) => statusOf(h, g) === 'complete' && priceOf(employerOf(h, g)?.ticker) !== null);
}

export interface TrancheValue {
  tranche: Tranche;
  grant: Grant;
  /** At target for a PSU (AC-C-02). */
  value: number;
  min: number;
  max: number;
  psu: boolean;
}

/** AC-C-02: today's price times units; a PSU at target with its range. */
export function trancheValue(h: Household, g: Grant, t: Tranche): TrancheValue {
  const price = priceOf(employerOf(h, g)?.ticker) ?? 0;
  const value = t.units * price;
  const psu = g.type === 'PSU';
  const r = g.psu ?? PSU_DEFAULT_RANGE;
  return { tranche: t, grant: g, value, min: psu ? value * r.rangeMin : value, max: psu ? value * r.rangeMax : value, psu };
}

/** Every counted future tranche, valued, in date order. */
export function countedFutureVests(h: Household, firm: Firm): TrancheValue[] {
  return countedGrants(h, firm)
    .flatMap((g) => futureTranches(h, g).map((t) => trancheValue(h, g, t)))
    .sort((a, b) => a.tranche.date.localeCompare(b.tranche.date));
}

/** AC-B-22: current net worth reads held positions and cash; grants never enter it. */
export function netWorth(h: Household): number {
  return h.accounts.flatMap((a) => a.positions).reduce((s, p) => s + (p.value ?? 0), h.cash);
}

/** AC-B-10: units of all tranches against the grant's units. */
export function trancheUnitsMismatch(g: Grant): { sum: number; units: number } | null {
  if (!g.units || g.tranches.length === 0) return null;
  const sum = g.tranches.reduce((s, t) => s + t.units, 0);
  return sum === g.units ? null : { sum, units: g.units };
}

const addMonths = (iso: IsoDate, months: number): IsoDate => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1 + months, d));
  return dt.toISOString().slice(0, 10);
};

/**
 * AC-B-07: dated tranches from a pattern. Units are spread evenly per period; the cliff
 * tranche carries the periods before it (EC-B-01). Remainders go to the last tranche.
 */
export function generateTranches(start: IsoDate, units: number, pattern: { lengthMonths: number; frequencyMonths: number; cliffMonths: number }): Tranche[] {
  const { lengthMonths, frequencyMonths, cliffMonths } = pattern;
  const periods = Math.floor(lengthMonths / frequencyMonths);
  const perPeriod = Math.floor(units / periods);
  const cliffPeriods = Math.max(1, Math.floor(cliffMonths / frequencyMonths));
  const out: Tranche[] = [];
  for (let p = cliffPeriods; p <= periods; p++) {
    const n = p === cliffPeriods ? perPeriod * cliffPeriods : perPeriod;
    out.push({ id: `t${p}`, date: addMonths(start, p * frequencyMonths), units: n });
  }
  out[out.length - 1].units += units - perPeriod * periods;
  return out;
}

/** AC-B-02, AC-B-04, AC-B-17, EV-B-01: create a grant for one person of the household. */
export function addGrant(h: Household, g: Omit<Grant, 'category' | 'subType'>, firm: Firm, log?: EventLog): Household {
  if (!firm.stockComp) throw new Error('Stock compensation is not enabled for this firm (AC-B-01).');
  if (!h.people.some((p) => p.id === g.ownerId)) throw new Error('A grant belongs to one person of the household, never joint (AC-B-02).');
  const grant: Grant = {
    ...g,
    category: 'stockCompensation',
    subType: 'RSU',
    psu: g.type === 'PSU' ? { condition: '', periodEnd: '', ...PSU_DEFAULT_RANGE, ...g.psu } : undefined,
  };
  log?.record('EV-B-01', h.id, { firm: firm.id, type: grant.type, source: grant.source });
  return { ...h, grants: [...h.grants.filter((x) => x.id !== grant.id), grant] };
}

/**
 * Save an edited grant. EV-B-02 when it turns complete (days since reported); EV-B-03 with
 * how many generated tranches the advisor changed.
 */
export function saveGrant(h: Household, g: Grant, firm: Firm, log?: EventLog, generated?: Tranche[]): Household {
  const before = h.grants.find((x) => x.id === g.id);
  const next = { ...h, grants: [...h.grants.filter((x) => x.id !== g.id), g] };
  if (before && statusOf(h, before) !== 'complete' && statusOf(next, g) === 'complete' && g.reportedOn) {
    const days = (Date.parse(h.analysisDate) - Date.parse(g.reportedOn)) / 86_400_000;
    log?.record('EV-B-02', h.id, { grant: g.id, daysSinceReported: days });
  }
  if (generated) {
    const changed = g.tranches.filter((t) => { const o = generated.find((x) => x.id === t.id); return !o || o.date !== t.date || o.units !== t.units; }).length
      + generated.filter((o) => !g.tranches.some((t) => t.id === o.id)).length;
    if (changed > 0) log?.record('EV-B-03', h.id, { grant: g.id, tranchesChanged: changed });
  }
  return next;
}
