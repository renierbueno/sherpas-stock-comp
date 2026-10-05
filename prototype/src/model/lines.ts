// New report lines, with their text copied from the spec. Each line knows where it shows and
// who sees it: advisor notices never reach the client view or the PDF (AC-G-11).
import { employerExposures, unpricedFlagged } from './exposure';
import { money, pct } from './format';
import type { ScoreResult } from './score';
import type { Firm, Household } from './types';

export type Surface =
  | 'viewMore.concentration'
  | 'assets.bullets'
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
