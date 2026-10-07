// F-A · Employer stock counted in concentration (docs/spec/F-A_employer-stock-concentration.md).
import type { Account, Employer, Firm, Household, Position } from './types';

export interface HeldPosition {
  account: Account;
  position: Position;
}

export function heldPositions(h: Household): HeldPosition[] {
  return h.accounts.flatMap((account) => account.positions.map((position) => ({ account, position })));
}

/** Positions inside the concentration base: priced and listed. */
function inBase(p: Position): boolean {
  return p.value !== null && !p.privateInstrument;
}

/** P-CONC-BASE · SIMULATED: listed investments plus cash ("investable assets"). */
export function investableAssets(h: Household): number {
  return heldPositions(h)
    .filter(({ position }) => inBase(position))
    .reduce((sum, { position }) => sum + (position.value ?? 0), h.cash);
}

/** Today's reading: the single largest holding, row by row, as a share of investable assets. */
export function largestPosition(h: Household): { position: Position; share: number } | null {
  const base = investableAssets(h);
  let best: { position: Position; share: number } | null = null;
  for (const { position } of heldPositions(h)) {
    if (!inBase(position) || base <= 0) continue;
    const share = (position.value as number) / base;
    if (!best || share > best.share) best = { position, share };
  }
  return best;
}

export interface IssuerExposure {
  employer: Employer;
  value: number;
  share: number;
  accountIds: string[];
  /** People flagged with this issuer as their current employer (AC-A-13). */
  payFrom: string[];
}

function flagsInEffect(h: Household, firm: Firm) {
  // AC-G-01, AC-G-13: with the setting off, flags are kept but read as absent.
  return firm.stockComp ? h.flags : [];
}

/** AC-A-04, AC-A-05, AC-A-07: exposure per listed issuer, summed across accounts and owners. */
export function employerExposures(h: Household, firm: Firm): IssuerExposure[] {
  const base = investableAssets(h);
  const byIssuer = new Map<string, IssuerExposure>();
  for (const flag of flagsInEffect(h, firm)) {
    const employer = h.employers.find((e) => e.id === flag.employerId);
    const held = heldPositions(h).find(({ position }) => position.id === flag.positionId);
    if (!employer || !held) continue;
    if (!employer.listed) continue; // AC-A-05
    if (held.position.value === null) continue; // AC-A-07
    const entry = byIssuer.get(employer.id) ?? { employer, value: 0, share: 0, accountIds: [], payFrom: [] };
    entry.value += held.position.value;
    if (!entry.accountIds.includes(held.account.id)) entry.accountIds.push(held.account.id);
    if (flag.currentEmployer === 'yes' && !entry.payFrom.includes(flag.personId)) entry.payFrom.push(flag.personId);
    byIssuer.set(employer.id, entry);
  }
  return [...byIssuer.values()]
    .map((e) => ({ ...e, share: base > 0 ? e.value / base : 0 }))
    .sort((a, b) => b.value - a.value);
}

/** AC-A-08: flagged positions with no market price, for the advisor notice. */
export function unpricedFlagged(h: Household, firm: Firm): Position[] {
  return flagsInEffect(h, firm)
    .map((f) => heldPositions(h).find(({ position }) => position.id === f.positionId)?.position)
    .filter((p): p is Position => !!p && p.value === null);
}

export interface ConcentrationReading {
  /** The figure the check reads, 0 to 1. */
  figure: number;
  largest: { position: Position; share: number } | null;
  topExposure: IssuerExposure | null;
  /** True when the check reads employer exposure instead of today's figure (AC-A-15, EV-A-02). */
  readsEmployer: boolean;
}

/** AC-A-09, AC-A-11: the larger of today's largest position and the largest employer exposure. */
export function concentration(h: Household, firm: Firm): ConcentrationReading {
  const largest = largestPosition(h);
  const topExposure = employerExposures(h, firm)[0] ?? null;
  const today = largest?.share ?? 0;
  const employer = topExposure?.share ?? 0;
  return { figure: Math.max(today, employer), largest, topExposure, readsEmployer: employer > today };
}
