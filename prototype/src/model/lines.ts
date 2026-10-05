// New report lines, with their text copied from the spec. Each line knows where it shows and
// who sees it: advisor notices never reach the client view or the PDF (AC-G-11).
import { employerExposures, investableAssets, unpricedFlagged } from './exposure';
import { dateLabel, money, pct } from './format';
import { countedFutureVests, countedGrants, employerOf, pastTranches, statusOf, trancheUnitsMismatch } from './grants';
import { priceOf } from './market';
import { totalOwed, vestTaxes } from './vestTax';
import { vestInflows } from './projection';
import { flagSuggestions } from './intake';
import type { ScoreResult } from './score';
import type { Firm, Household } from './types';

export type Surface =
  | 'viewMore.concentration'
  | 'assets.bullets'
  | 'assets.grants'
  | 'assets.lookInto'
  | 'summary.candidates'
  | 'investment.snapshot'
  | 'savings.bullets'
  | 'savings.vestTax'
  | 'savings.lookInto'
  | 'viewMore.liquidity'
  | 'viewMore.cashFlow'
  | 'statements.cashflow'
  | 'goals.bullets'
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
      const label = largest.position.name; // AC-A-12 names the position
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

const monthYear = (iso: string) => {
  const [y, m] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};

/** F-C lines. Per-vest tax and gap lines as written in AC-C-29 (D-069). */
export function linesFC(h: Household, firm: Firm, score: ScoreResult): ReportLine[] {
  const taxes = vestTaxes(h, firm);
  if (taxes.length === 0) return []; // AC-C-25
  const out: ReportLine[] = [];
  const rules = `at the ${dateLabel(h.analysisDate)} price and today's tax rules`; // AC-C-04
  const range = (a: number, b: number) => ` (range ${money(a)} to ${money(b)})`;

  // AC-C-23: per year
  const years = [...new Set(taxes.map((t) => t.vest.tranche.date.slice(0, 4)))];
  for (const y of years) {
    const ts = taxes.filter((t) => t.vest.tranche.date.startsWith(y));
    const value = ts.reduce((s, t) => s + t.vest.value, 0);
    const owed = ts.reduce((s, t) => s + totalOwed(t.owed), 0);
    const gap = ts.reduce((s, t) => s + t.gap, 0);
    out.push({ id: `C-23-${y}`, ac: 'AC-C-23', surface: 'savings.bullets', audience: 'shared',
      text: `${y} vests: ${money(value)} of income, estimated tax ${money(owed)}, gap after withholding ${money(gap)}.` });
  }

  // Per vest (AC-C-03 to AC-C-16)
  out.push({ id: 'C-06', ac: 'AC-C-06', surface: 'savings.vestTax', audience: 'shared',
    text: 'Federal withholding estimated at the supplemental rate (22%, 37% above $1 million).' });
  for (const t of taxes) {
    const g = `${dateLabel(t.vest.tranche.date)} vest`;
    const id = `${t.vest.grant.id}-${t.vest.tranche.id}`;
    const owed = totalOwed(t.owed);
    out.push({ id: `C-03-${id}`, ac: t.vest.psu ? 'AC-C-16' : 'AC-C-03', surface: 'savings.vestTax', audience: 'shared', group: g,
      text: `Estimated tax on this vest: ${money(owed)}${t.range ? ` at target${range(t.range.min.owed, t.range.max.owed)}` : ''} (federal ${money(t.owed.federal)}, Social Security and Medicare ${money(t.owed.fica)}, state ${money(t.owed.state)}), ${rules}.` });
    if (t.gap <= 0) {
      out.push({ id: `C-15-${id}`, ac: 'AC-C-15', surface: 'savings.vestTax', audience: 'shared', group: g, text: 'Withholding covers the estimated tax on this vest.' });
    } else {
      out.push({ id: `C-10-${id}`, ac: t.vest.psu ? 'AC-C-16' : 'AC-C-10', surface: 'savings.vestTax', audience: 'shared', group: g,
        text: `Estimated gap after withholding: ${money(t.gap)}${t.range ? ` at target${range(t.range.min.gap, t.range.max.gap)}` : ''}, ${rules}.` });
    }
    if (t.stateGap === null && t.owed.state > 0) {
      out.push({ id: `C-12-${id}`, ac: 'AC-C-12', surface: 'savings.vestTax', audience: 'shared', group: g,
        text: `Estimated state tax on this vest: ${money(t.owed.state)}. Your state withholding was not provided, so the gap shown is federal only.` });
    }
    out.push({ id: `C-14-${id}`, ac: 'AC-C-14', surface: 'savings.vestTax', audience: 'shared', group: g,
      text: `Social Security and Medicare tax on this vest: ${money(t.owed.fica)}, not included in the gap.` });
  }

  // AC-C-13: advisor notice per grant
  for (const g of [...new Set(taxes.map((t) => t.vest.grant))]) {
    if (g.stateWithholdingRate === undefined && h.stateTaxRate > 0) {
      const company = employerOf(h, g)?.name;
      out.push({ id: `C-13-${g.id}`, ac: 'AC-C-13', surface: 'advisor.notices', audience: 'advisor', text: `State withholding not entered for ${company} ${g.type}.` });
    }
  }

  // Score: View more (AC-C-20 to AC-C-22, AC-C-27)
  const liq = score.liquidity;
  if (liq.vestGaps > 0) {
    out.push({ id: 'C-20', ac: liq.federalOnly ? 'AC-C-21' : 'AC-C-20', surface: 'viewMore.liquidity', audience: 'shared',
      text: `Tax due on upcoming vests counted in near-term commitments: ${money(liq.vestGaps)}.${liq.federalOnly ? ' (federal only; state withholding not entered)' : ''}` });
    if (liq.psu) out.push({ id: 'C-22', ac: 'AC-C-22', surface: 'viewMore.liquidity', audience: 'shared', text: 'Performance units counted at target.' });
  }
  out.push({ id: 'C-27', ac: 'AC-C-27', surface: 'viewMore.cashFlow', audience: 'shared', text: 'Savings rate and debt ratios read reported income; vests are shown separately.' });

  // AC-C-24, AC-C-28: look into and Summary candidate
  for (const t of taxes.filter((x) => x.withinHorizon && x.gap > 0)) {
    const text = `Tax on the ${monthYear(t.vest.tranche.date)} vest may exceed withholding by ${money(t.gap)}.`;
    out.push({ id: `C-24-${t.vest.grant.id}-${t.vest.tranche.id}`, ac: 'AC-C-24', surface: 'savings.lookInto', audience: 'shared', text });
    out.push({ id: `C-28-${t.vest.grant.id}-${t.vest.tranche.id}`, ac: 'AC-C-28', surface: 'summary.candidates', audience: 'shared', text });
  }

  // AC-C-26: cash flow statement, vests this year
  const thisYear = h.analysisDate.slice(0, 4);
  const now = taxes.filter((t) => t.vest.tranche.date.startsWith(thisYear));
  if (now.length > 0) {
    const value = now.reduce((s, t) => s + t.vest.value, 0);
    const owed = now.reduce((s, t) => s + totalOwed(t.owed), 0);
    out.push({ id: 'C-26', ac: 'AC-C-26', surface: 'statements.cashflow', audience: 'shared',
      text: `Stock compensation (vests this year), not in the totals above: ${money(value)}, estimated tax ${money(owed)}.` });
  }
  return out;
}

/** F-D lines in Retirement & Goals (AC-D-06 to AC-D-08). */
export function linesFD(h: Household, firm: Firm): ReportLine[] {
  const inflows = vestInflows(h, firm);
  if (inflows.length === 0) return []; // AC-D-09
  const out: ReportLine[] = [];
  const range = (a: number, b: number) => ` (range ${money(a)} to ${money(b)})`;
  for (const company of [...new Set(inflows.map((i) => i.company))]) {
    const xs = inflows.filter((i) => i.company === company);
    const after = xs.reduce((s, i) => s + i.after, 0);
    const before = xs.reduce((s, i) => s + i.before, 0);
    const psu = xs.some((i) => i.psu);
    const r = psu ? ` at target${range(xs.reduce((s, i) => s + (i.psu ? i.min : i.after), 0), xs.reduce((s, i) => s + (i.psu ? i.max : i.after), 0))}` : '';
    const span = xs.length === 1 ? `on ${dateLabel(xs[0].date)}` : `between ${dateLabel(xs[0].date)} and ${dateLabel(xs[xs.length - 1].date)}`;
    out.push({ id: `D-06-${company}`, ac: 'AC-D-06', surface: 'goals.bullets', audience: 'shared',
      text: `${company} vests: ${money(after)} after estimated tax${r} (${money(before)} before tax) ${span}, ${atPrice(h)}.` });
  }
  for (const g of [...h.goals].sort((a, b) => a.year - b.year)) {
    const xs = inflows.filter((i) => Number(i.date.slice(0, 4)) <= g.year);
    if (xs.length === 0) continue; // EC-D-02
    out.push({ id: `D-07-${g.id}`, ac: 'AC-D-07', surface: 'goals.bullets', audience: 'shared',
      text: `Vests before ${g.name} (${g.year}): ${money(xs.reduce((s, i) => s + i.after, 0))} after estimated tax.` });
  }
  out.push({ id: 'D-08', ac: 'AC-D-08', surface: 'goals.bullets', audience: 'shared',
    text: "Value on the vest date; whether shares are sold or kept is the client's decision." });
  return out;
}

/** F-E advisor notices (AC-E-13, AC-E-16, AC-E-17); never shared (AC-G-11). */
export function linesFE(h: Household, firm: Firm): ReportLine[] {
  if (!firm.stockComp) return [];
  const out: ReportLine[] = [];
  for (const p of h.people) {
    if (h.incomeIncludesVests[p.id] === 'not sure' && h.grants.some((g) => g.ownerId === p.id && !g.proposed)) {
      out.push({ id: `E-13-${p.id}`, ac: 'AC-E-13', surface: 'advisor.notices', audience: 'advisor',
        text: 'Check whether the reported income includes stock that vested this year.' });
    }
  }
  for (const g of h.grants.filter((x) => x.clientEstimate?.type === 'other')) {
    out.push({ id: `E-16-${g.id}`, ac: 'AC-E-16', surface: 'advisor.notices', audience: 'advisor',
      text: 'This type is not modelled in this version; flag any shares already held as employer stock.' });
  }
  for (const s of flagSuggestions(h, firm)) {
    out.push({ id: `E-17-${s.employerId}`, ac: 'AC-E-17', surface: 'advisor.notices', audience: 'advisor', text: s.label });
  }
  return out;
}
