// New report lines, with their text copied from the spec. Each line knows where it shows and
// who sees it: advisor notices never reach the client view or the PDF (AC-G-11).
import { employerExposures, investableAssets, unpricedFlagged } from './exposure';
import { dateLabel, money, pct } from './format';
import { countedFutureVests, countedGrants, employerOf, pastTranches, statusOf, trancheUnitsMismatch } from './grants';
import { priceOf } from './market';
import type { ScoreResult } from './score';
import type { Firm, Household } from './types';

export type Surface =
  | 'viewMore.concentration'
  | 'assets.bullets'
  | 'assets.grants'
  | 'assets.lookInto'
  | 'summary.candidates'
  | 'investment.snapshot'
  | 'advisor.notices';

export interface ReportLine {
  /** Stable line ID: the AC that defines it, plus a key when one AC writes several lines. */
  id: string;
  ac: string;
  surface: Surface;
  audience: 'shared' | 'advisor';
  text: string;
  /** Grant the line belongs to, for the grant block (AC-B-27). */
  group?: string;
}

const atPrice = (h: Household) => `at the ${dateLabel(h.analysisDate)} price`; // AC-G-15
const units = (n: number) => n.toLocaleString('en-US');

/** AC-A-16 to AC-A-18: employer stock if every scheduled grant vests. */
function unvestedConcentration(h: Household, firm: Firm): ReportLine[] {
  const base = investableAssets(h);
  const exposures = employerExposures(h, firm);
  const byEmployer = new Map<string, { target: number; min: number; max: number; psu: boolean }>();
  for (const v of countedFutureVests(h, firm)) {
    const e = byEmployer.get(v.grant.employerId) ?? { target: 0, min: 0, max: 0, psu: false };
    e.target += v.value; e.min += v.min; e.max += v.max; e.psu ||= v.psu;
    byEmployer.set(v.grant.employerId, e);
  }
  return [...byEmployer.entries()].map(([employerId, u]) => {
    const company = h.employers.find((e) => e.id === employerId)!.name;
    const held = exposures.find((e) => e.employer.id === employerId)?.value ?? 0;
    const z = (x: number) => (held + x) / (base + x); // AC-A-18
    const figure = u.psu ? `${pct(z(u.target))} at target (range ${pct(z(u.min))} to ${pct(z(u.max))})` : pct(z(u.target)); // AC-A-17
    return { id: `A-16-${employerId}`, ac: 'AC-A-16', surface: 'assets.bullets' as const, audience: 'shared' as const,
      text: `If every scheduled grant vests, ${company} stock would be ${figure} of investable assets, ${atPrice(h)}, before shares withheld for tax.` };
  });
}

export function linesFB(h: Household, firm: Firm): ReportLine[] {
  if (!firm.stockComp || h.grants.length === 0) return []; // AC-B-26
  const out: ReportLine[] = [];
  const counted = countedGrants(h, firm);
  const person = (id: string) => h.people.find((p) => p.id === id)?.name ?? id;
  for (const g of h.grants) {
    const e = employerOf(h, g);
    const company = e?.name ?? 'Employer';
    const status = statusOf(h, g);
    if (status === 'proposed') continue; // proposed grants never reach the analysis (AC-G-11, AC-F-03)
    const head = `${company} ${g.type} (${person(g.ownerId)})`;
    if (counted.includes(g)) {
      for (const v of countedFutureVests(h, firm).filter((x) => x.grant === g)) {
        const t = v.tranche;
        const val = v.psu
          ? `${units(t.units)} target units, ${money(v.value)} at target (range ${money(v.min)} to ${money(v.max)})` // AC-B-24
          : `${units(t.units)} units, ${money(v.value)}`;
        out.push({ id: `B-23-${g.id}-${t.id}`, ac: v.psu ? 'AC-B-24' : 'AC-B-23', surface: 'assets.grants', audience: 'shared', group: head,
          text: `${dateLabel(t.date)}: ${val}, ${atPrice(h)}.` });
      }
    } else if (status === 'awaiting a liquidity event') {
      out.push({ id: `B-19-${g.id}`, ac: 'AC-B-19', surface: 'assets.grants', audience: 'shared', group: head, text: 'Awaiting a liquidity event' });
      if (e?.fmv409a) {
        out.push({ id: `B-21-${g.id}`, ac: 'AC-B-21', surface: 'assets.grants', audience: 'shared', group: head,
          text: `409A value $${e.fmv409a.value.toFixed(2)} per share as of ${dateLabel(e.fmv409a.date)}, for information only; not counted in the figures.` });
      }
    } else if (status === 'pending detail') {
      out.push({ id: `E-10-${g.id}`, ac: 'AC-E-10', surface: 'assets.grants', audience: 'shared', group: head,
        text: `${person(g.ownerId)} reported pay in ${company} stock. It is not yet included in these figures.` });
    }
    // Advisor notices (AC-G-11)
    const mismatch = trancheUnitsMismatch(g);
    if (mismatch) out.push({ id: `B-10-${g.id}`, ac: 'AC-B-10', surface: 'advisor.notices', audience: 'advisor',
      text: `Tranches add up to ${units(mismatch.sum)} of ${units(mismatch.units)} units.` });
    for (const t of pastTranches(h, g)) {
      out.push({ id: `B-12-${g.id}-${t.id}`, ac: 'AC-B-12', surface: 'advisor.notices', audience: 'advisor',
        text: `Vested on ${dateLabel(t.date)}: record the shares kept as a held position.` });
    }
    if (status === 'complete' && priceOf(e?.ticker) === null) {
      out.push({ id: `B-30-${g.id}`, ac: 'AC-B-30', surface: 'advisor.notices', audience: 'advisor',
        text: `Price not available for ${e?.ticker}: grant not counted.` });
    }
  }
  return [...out, ...unvestedConcentration(h, firm)];
}

export function linesFA(h: Household, firm: Firm, score: ScoreResult): ReportLine[] {
  if (!firm.stockComp) return [];
  const out: ReportLine[] = [];
  const exposures = employerExposures(h, firm);
  const { largest, readsEmployer, topExposure } = score.concentration;

  if (exposures.length > 0) {
    if (largest) {
      const label = largest.position.ticker ?? largest.position.name;
      out.push({ id: 'A-12-largest', ac: 'AC-A-12', surface: 'viewMore.concentration', audience: 'shared',
        text: `Largest position: ${label} ${pct(largest.share)}.` });
    }
    for (const e of exposures) {
      const company = e.employer.name;
      out.push({ id: `A-12-employer-${e.employer.id}`, ac: 'AC-A-12', surface: 'viewMore.concentration', audience: 'shared',
        text: `Employer stock (${company}): ${pct(e.share)} of investable assets, counted as one position across all accounts.` });
      for (const personId of e.payFrom) {
        const name = h.people.find((p) => p.id === personId)?.name ?? personId;
        out.push({ id: `A-13-${e.employer.id}-${personId}`, ac: 'AC-A-13', surface: 'viewMore.concentration', audience: 'shared',
          text: `${name}'s pay comes from the same company.` });
      }
      const where = e.accountIds.length === 1 ? 'in 1 account' : `across ${e.accountIds.length} accounts`; // D-066
      const bullet = `${company} stock held ${where}: ${money(e.value)}, ${pct(e.share)} of investable assets.`;
      out.push({ id: `A-14-${e.employer.id}`, ac: 'AC-A-14', surface: 'assets.bullets', audience: 'shared', text: bullet });
      out.push({ id: `A-22-${e.employer.id}`, ac: 'AC-A-22', surface: 'investment.snapshot', audience: 'shared', text: bullet });
    }
  }

  if (readsEmployer && topExposure) {
    const text = `${pct(topExposure.share)} of investable assets is in ${topExposure.employer.name} stock.`;
    out.push({ id: 'A-15', ac: 'AC-A-15', surface: 'assets.lookInto', audience: 'shared', text });
    out.push({ id: 'A-23', ac: 'AC-A-23', surface: 'summary.candidates', audience: 'shared', text });
  }

  for (const p of unpricedFlagged(h, firm)) {
    out.push({ id: `A-08-${p.id}`, ac: 'AC-A-08', surface: 'advisor.notices', audience: 'advisor',
      text: `Price not available for ${p.ticker ?? p.name}: not counted in concentration.` });
  }
  return out;
}
