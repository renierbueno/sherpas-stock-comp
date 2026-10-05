// F-B unit tests: grants, tranches, completeness, and F-A's lines that need grants.
// Households are SIMULATED (src/model/households.ts).
import { analyze } from '../../src/model/analysis';
import { EventLog } from '../../src/model/events';
import { concentration } from '../../src/model/exposure';
import {
  addGrant, countedFutureVests, countedGrants, generateTranches, netWorth, saveGrant, statusOf, trancheUnitsMismatch,
} from '../../src/model/grants';
import { H1, H2, H2_COMPLETE, H2_GRANT, H3, H4, H5, H6 } from '../../src/model/households';
import { simulateScore } from '../../src/model/score';
import type { Firm, Grant, Household } from '../../src/model/types';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const OFF: Firm = { id: 'firm-sim', stockComp: false };
const text = (h: Household, ac: string) => analyze(h, ON).lines.filter((l) => l.ac === ac).map((l) => l.text);
const withGrant = (h: Household, g: Partial<Grant>): Household => ({ ...h, grants: h.grants.map((x, i) => (i === 0 ? { ...x, ...g } : x)) });

describe('F-B · grant and schedule', () => {
  it('AC-B-07 · EC-B-01 · four years, quarterly, one-year cliff: 13 tranches, the first with a quarter of the units', () => {
    const t = generateTranches('2025-03-01', 4_000, { lengthMonths: 48, frequencyMonths: 3, cliffMonths: 12 });
    expect(t).toHaveLength(13);
    expect(t[0]).toMatchObject({ date: '2026-03-01', units: 1_000 });
    expect(t.slice(1).every((x) => x.units === 250)).toBe(true);
    expect(t[12].date).toBe('2029-03-01');
  });

  it('AC-B-02 · EC-B-07 · a grant belongs to one person; joint or unknown owners are refused', () => {
    const g = { id: 'x', ownerId: 'p1+p2', type: 'RSU' as const, employerId: 'halden', tranches: [], source: 'advisor' as const };
    expect(() => addGrant(H2, g, ON)).toThrow(/never joint/);
    const ok = addGrant(H6, { ...g, id: 'y', ownerId: 'p2' }, ON);
    expect(ok.grants.find((x) => x.id === 'y')?.ownerId).toBe('p2');
  });

  it('AC-B-04 · AC-B-31 · AC-B-17 · stored as stock compensation, sub-type RSU; a PSU keeps its terms with the 0% to 200% default', () => {
    const h = addGrant(H3, { id: 'n', ownerId: 'p1', type: 'PSU', employerId: 'arvo', grantDate: '2026-01-01', units: 500, tranches: [], source: 'advisor' }, ON);
    const g = h.grants.find((x) => x.id === 'n')!;
    expect(g).toMatchObject({ category: 'stockCompensation', subType: 'RSU', type: 'PSU', employerId: 'arvo', grantDate: '2026-01-01', units: 500 });
    expect(g.psu).toMatchObject({ rangeMin: 0, rangeMax: 2 });
  });

  it('AC-B-17 · EC-B-08 · the advisor range is used instead of the default', () => {
    const h = withGrant(H3, { psu: { ...H3.grants[0].psu!, rangeMin: 0.5, rangeMax: 1.5 } });
    const [v] = countedFutureVests(h, ON);
    expect([v.min, v.max]).toEqual([48_000, 144_000]);
  });

  it('AC-B-10 · EC-B-05 · tranches that do not add up raise the notice without blocking', () => {
    const g = { ...H2_GRANT, tranches: H2_GRANT.tranches.slice(0, 12) };
    expect(trancheUnitsMismatch(g)).toEqual({ sum: 3_750, units: 4_000 });
    expect(text(withGrant(H2, g), 'AC-B-10')).toEqual(['Tranches add up to 3,750 of 4,000 units.']);
    expect(statusOf(withGrant(H2, g), g)).toBe('complete');
  });

  it('AC-B-11 · AC-B-12 · EC-B-03 · past tranches stay out of the figures, with the prompt', () => {
    const vests = countedFutureVests(H2_COMPLETE, ON);
    expect(vests).toHaveLength(10);
    expect(vests.reduce((s, v) => s + v.value, 0)).toBe(125_000);
    expect(text(H2_COMPLETE, 'AC-B-12')).toEqual([
      'Vested on March 1, 2026: record the shares kept as a held position.',
      'Vested on June 1, 2026: record the shares kept as a held position.',
      'Vested on September 1, 2026: record the shares kept as a held position.',
    ]);
  });

  it('AC-B-11 · EC-B-04 · a grant with every tranche in the past contributes nothing', () => {
    const g = { ...H2_GRANT, tranches: H2_GRANT.tranches.slice(0, 3) };
    expect(countedFutureVests(withGrant(H2, g), ON)).toEqual([]);
  });

  it('AC-B-13 · EC-B-11 · forfeited tranches leave the figures', () => {
    const g = { ...H2_GRANT, tranches: H2_GRANT.tranches.map((t, i) => (i >= 5 ? { ...t, forfeited: true } : t)) };
    expect(countedFutureVests(withGrant(H2, g), ON)).toHaveLength(2);
  });

  it('AC-B-22 · unvested tranches stay out of current net worth', () => {
    expect(netWorth(H2_COMPLETE)).toBe(netWorth({ ...H2, grants: [] }));
  });

  it('AC-B-23 · AC-G-15 · each future tranche with date, units and value at the analysis date price', () => {
    expect(text(H2_COMPLETE, 'AC-B-23')[0]).toBe('December 1, 2026: 250 units, $12,500, at the October 5, 2026 price.');
  });

  it('AC-B-24 · a performance unit tranche shows target value and range', () => {
    expect(text(H3, 'AC-B-24')).toEqual(['February 15, 2028: 1,200 target units, $96,000 at target (range $0 to $192,000), at the October 5, 2026 price.']);
  });

  it('AC-B-19 · AC-B-21 · AC-G-05 · EC-B-09 · private employer: awaiting a liquidity event, 409A for information only, out of the figures', () => {
    expect(statusOf(H4, H4.grants[0])).toBe('awaiting a liquidity event');
    expect(text(H4, 'AC-B-19')).toEqual(['Awaiting a liquidity event']);
    expect(text(H4, 'AC-B-21')).toEqual(['409A value $12.40 per share as of June 30, 2026, for information only; not counted in the figures.']);
    expect(countedGrants(H4, ON)).toEqual([]);
    expect(simulateScore(H4, ON)).toEqual(simulateScore({ ...H4, grants: [] }, ON));
  });

  it('AC-B-18 · a private grant saves without vest dates', () => {
    const h = addGrant(H4, { id: 'p', ownerId: 'p1', type: 'RSU', employerId: 'lumen', units: 100, tranches: [], source: 'advisor' }, ON);
    expect(h.grants.find((g) => g.id === 'p')?.tranches).toEqual([]);
  });

  it('AC-B-28 · EC-B-17 · complete only with owner, type, listed employer with ticker, units, a future tranche, PSU terms and a yes or no', () => {
    expect(statusOf(H2_COMPLETE, H2_GRANT)).toBe('complete');
    expect(statusOf(H2, H2.grants[0])).toBe('pending detail'); // no units, no tranches
    const unsure = { ...H2_COMPLETE, incomeIncludesVests: { p1: 'not sure' as const } };
    expect(statusOf(unsure, H2_GRANT)).toBe('pending detail');
    const unanswered = { ...H2_COMPLETE, incomeIncludesVests: {} };
    expect(statusOf(unanswered, H2_GRANT)).toBe('pending detail');
    const noTerms = withGrant(H3, { psu: { ...H3.grants[0].psu!, condition: '' } });
    expect(statusOf(noTerms, noTerms.grants[0])).toBe('pending detail');
  });

  it('AC-B-29 · AC-G-04 · a "not sure" answer keeps the grant pending and out of every figure', () => {
    const unsure = { ...H2_COMPLETE, incomeIncludesVests: { p1: 'not sure' as const } };
    expect(countedGrants(unsure, ON)).toEqual([]);
    expect(simulateScore(unsure, ON)).toEqual(simulateScore({ ...H2, grants: [] }, ON));
  });

  it('AC-B-30 · a grant whose ticker has no market price leaves the figures, with the advisor notice', () => {
    const h: Household = { ...H2_COMPLETE, employers: [{ ...H2.employers[0], ticker: 'SIMNP' }] };
    expect(countedGrants(h, ON)).toEqual([]);
    expect(text(h, 'AC-B-30')).toEqual(['Price not available for SIMNP: grant not counted.']);
    expect(analyze(h, ON).lines.find((l) => l.ac === 'AC-B-30')?.audience).toBe('advisor');
  });

  it('EC-B-06 · two grants from the same employer add up', () => {
    const second = { ...H2_GRANT, id: 'h2-g2', units: 400, tranches: [{ id: 'r1', date: '2027-06-01', units: 400 }] };
    const h = { ...H2_COMPLETE, grants: [H2_GRANT, second] };
    expect(countedFutureVests(h, ON).reduce((s, v) => s + v.value, 0)).toBe(145_000);
  });

  it('AC-B-26 · no grant, no grant section', () => {
    expect(analyze(H1, ON).lines.filter((l) => l.surface === 'assets.grants')).toEqual([]);
  });
});

describe('F-A lines that need grants', () => {
  it('AC-A-06 · unvested tranches stay out of employer exposure and the check', () => {
    expect(concentration(H2_COMPLETE, ON).figure).toBeCloseTo(concentration({ ...H2, grants: [] }, ON).figure);
  });

  it('AC-A-16 · AC-A-18 · Z = (exposure + unvested) / (investable + unvested), labelled with the price date', () => {
    const flagged: Household = { ...H2_COMPLETE, flags: [
      { positionId: 'h2-hldn-brk', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' },
      { positionId: 'h2-hldn-401k', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' },
    ] };
    // (300,000 + 125,000) / (1,000,000 + 125,000) = 37.8%
    expect(text(flagged, 'AC-A-16')).toEqual(['If every scheduled grant vests, Halden Robotics stock would be 38% of investable assets, at the October 5, 2026 price, before shares withheld for tax.']);
    // No held shares: 125,000 / 1,125,000 = 11.1%
    expect(text(H2_COMPLETE, 'AC-A-16')[0]).toContain('would be 11% of investable assets');
  });

  it('AC-A-17 · performance units: target followed by the range', () => {
    // 96,000 / 596,000 = 16%; min 0%; max 192,000 / 692,000 = 28%
    expect(text(H3, 'AC-A-16')).toEqual(['If every scheduled grant vests, Arvo Health stock would be 16% at target (range 0% to 28%) of investable assets, at the October 5, 2026 price, before shares withheld for tax.']);
  });

  it('AC-G-05 · AC-A-16 · no line for a private employer or a pending grant', () => {
    expect(text(H4, 'AC-A-16')).toEqual([]);
    expect(text(H5, 'AC-A-16')).toEqual([]);
  });
});

describe('F-B · events', () => {
  it('EV-B-01 · creating a grant records firm, type and source', () => {
    const log = new EventLog();
    addGrant(H7Like(), { id: 'g', ownerId: 'p1', type: 'RSU', employerId: 'orrin', tranches: [], source: 'advisor' }, ON, log);
    expect(log.of('EV-B-01')[0].data).toEqual({ firm: 'firm-sim', type: 'RSU', source: 'advisor' });
  });

  it('EV-B-02 · pending to complete records days since reported', () => {
    const log = new EventLog();
    saveGrant(H2, H2_GRANT, ON, log);
    expect(log.of('EV-B-02')[0].data).toEqual({ grant: 'h2-g1', daysSinceReported: 7 });
  });

  it('EV-B-03 · editing generated tranches records how many changed', () => {
    const log = new EventLog();
    const generated = H2_GRANT.tranches;
    const edited = { ...H2_GRANT, tranches: generated.map((t, i) => (i === 4 ? { ...t, units: 300 } : t)).filter((_, i) => i !== 12) };
    saveGrant(H2_COMPLETE, edited, ON, log, generated);
    expect(log.of('EV-B-03')[0].data).toEqual({ grant: 'h2-g1', tranchesChanged: 2 });
  });

  it('AC-B-01 · adding a grant is refused when the firm has not enabled stock compensation', () => {
    expect(() => addGrant(H2, { id: 'g', ownerId: 'p1', type: 'RSU', employerId: 'halden', tranches: [], source: 'advisor' }, OFF)).toThrow();
  });
});

describe('F-B · simulator relations (spec "Simulator tests")', () => {
  it('REL-B-1 · with and without a grant: same current net worth', () => {
    for (const h of [H2_COMPLETE, H3, H4, H6]) expect(netWorth(h)).toBe(netWorth({ ...h, grants: [] }));
  });

  it('REL-B-2 · a private grant, or one with every tranche past, changes no score figure', () => {
    const allPast = withGrant(H2_COMPLETE, { tranches: H2_GRANT.tranches.slice(0, 3) });
    expect(simulateScore(allPast, ON)).toEqual(simulateScore({ ...H2, grants: [] }, ON));
    expect(simulateScore(H4, ON)).toEqual(simulateScore({ ...H4, grants: [] }, ON));
  });

  it('REL-B-3 · forfeiting a tranche never raises a figure that counts future vests', () => {
    const total = (h: Household) => countedFutureVests(h, ON).reduce((s, v) => s + v.value, 0);
    const forfeited = withGrant(H2_COMPLETE, { tranches: H2_GRANT.tranches.map((t, i) => (i === 6 ? { ...t, forfeited: true } : t)) });
    expect(total(forfeited)).toBeLessThanOrEqual(total(H2_COMPLETE));
  });
});

function H7Like(): Household {
  return { ...H1, employers: [{ id: 'orrin', name: 'Orrin Software', listed: true, ticker: 'ORSW' }] };
}
