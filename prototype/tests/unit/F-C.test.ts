// F-C unit tests: tax at vest, withholding, gap, the Liquidity check, and the income rules of
// F-E it depends on. Tax figures come from src/model/tax.ts (real 2026 federal and FICA rules,
// SIMULATED state rate and households): the tests check how figures relate, not a real household's tax.
import { analyze } from '../../src/model/analysis';
import { EventLog } from '../../src/model/events';
import { countedFutureVests, saveGrant, setStateWithholding } from '../../src/model/grants';
import { H1, H2, H2_COMPLETE, H2_GRANT, H3, H6 } from '../../src/model/households';
import { simulateScore } from '../../src/model/score';
import { householdTax } from '../../src/model/tax';
import type { Firm, Grant, Household } from '../../src/model/types';
import { addedVestIncome, baseWages, countedVestGaps, taxYears, vestTaxes } from '../../src/model/vestTax';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const text = (h: Household, ac: string) => analyze(h, ON).lines.filter((l) => l.ac === ac).map((l) => l.text);
const grant = (id: string, employerId: string, date: string, units: number, extra: Partial<Grant> = {}): Grant => ({
  id, category: 'stockCompensation', subType: 'RSU', ownerId: 'p1', type: 'RSU', employerId, grantDate: '2025-01-01', units,
  tranches: [{ id: `${id}-t`, date, units }], source: 'advisor', ...extra,
});

/** EC-C-01 · SIMULATED: one $100K vest (2,000 HLDN at $50) in a household taxed at 32%. */
const EC_C_01: Household = {
  ...H2, flags: [], salary: { p1: 360_000, p2: 90_000 }, stateTaxRate: 0.06,
  grants: [grant('ec', 'halden', '2027-03-01', 2_000)],
};

describe('F-C · tax owed', () => {
  it('AC-C-01 · AC-C-02 · AC-C-03 · tax owed is tax with the vest income minus tax without it, by level, at today\'s price', () => {
    const [t] = vestTaxes(EC_C_01, ON);
    expect(t.vest.value).toBe(100_000);
    const without = householdTax(EC_C_01, { p1: 360_000, p2: 90_000 });
    const withVest = householdTax(EC_C_01, { p1: 460_000, p2: 90_000 });
    expect(t.owed.federal).toBeCloseTo(withVest.federal - without.federal);
    expect(t.owed.fica).toBeCloseTo(withVest.fica - without.fica);
    expect(t.owed.state).toBeCloseTo(withVest.state - without.state);
  });

  it('AC-C-05 · AC-C-10 · EC-C-01 · 32% household, $100K vest, no state rate: federal gap about $10K, labelled federal only', () => {
    const [t] = vestTaxes(EC_C_01, ON);
    expect(t.withheldFederal).toBe(22_000);
    expect(t.federalGap).toBeGreaterThan(9_000);
    expect(t.federalGap).toBeLessThan(11_000);
    expect(t.stateGap).toBeNull();
    expect(t.gap).toBeCloseTo(t.federalGap);
    expect(text(EC_C_01, 'AC-C-12')[0]).toMatch(/^Estimated state tax on this vest: \$6,000\. Your state withholding was not provided, so the gap shown is federal only\.$/);
  });

  it('AC-C-05 · EC-C-02 · 37% on the part of a person\'s vest income from one employer above $1 million', () => {
    const h: Household = { ...EC_C_01, grants: [grant('big', 'halden', '2027-03-01', 24_000)] }; // $1.2M
    expect(vestTaxes(h, ON)[0].withheldFederal).toBeCloseTo(1_000_000 * 0.22 + 200_000 * 0.37);
  });

  it('AC-C-05 · EC-C-10 · the $1 million rule applies per person and employer', () => {
    const h: Household = {
      ...EC_C_01,
      employers: [...EC_C_01.employers, { id: 'orrin', name: 'Orrin Software', listed: true, ticker: 'ORSW' }],
      grants: [grant('a', 'halden', '2027-03-01', 12_000), grant('b', 'orrin', '2027-04-01', 15_000)], // $600K each
    };
    expect(vestTaxes(h, ON).reduce((s, t) => s + t.withheldFederal, 0)).toBeCloseTo(1_200_000 * 0.22);
  });

  it('AC-C-11 · EC-C-04 · a state rate gives a state gap; 0% counts the full state tax as gap', () => {
    const zero = { ...EC_C_01, grants: [{ ...EC_C_01.grants[0], stateWithholdingRate: 0 }] };
    const [t] = vestTaxes(zero, ON);
    expect(t.stateGap).toBeCloseTo(t.owed.state);
    expect(t.gap).toBeCloseTo(t.federalGap + t.owed.state);
  });

  it('AC-C-15 · EC-C-05 · a household at 22% or lower: withholding covers it and nothing is counted', () => {
    const low: Household = { ...EC_C_01, salary: { p1: 60_000, p2: 20_000 }, grants: [grant('l', 'halden', '2027-03-01', 200)] };
    const [t] = vestTaxes(low, ON);
    expect(t.federalGap).toBeLessThanOrEqual(0);
    expect(t.gap).toBe(0);
    expect(text(low, 'AC-C-15')).toEqual(['Withholding covers the estimated tax on this vest.']);
    expect(countedVestGaps(low, ON).total).toBe(0);
  });

  it('AC-C-16 · AC-C-19 · a PSU vest shows tax and gap at target with the range; counted at target', () => {
    const [t] = vestTaxes(H3, ON);
    expect(t.range!.min.owed).toBe(0);
    expect(t.range!.max.owed).toBeGreaterThan(t.owed.federal + t.owed.fica + t.owed.state);
    expect(text(H3, 'AC-C-16')[0]).toMatch(/at target \(range \$0 to \$[\d,]+\)/);
  });

  it('AC-C-04 · AC-C-14 · labels name the price date and tax rules; FICA shown apart from the gap', () => {
    expect(text(EC_C_01, 'AC-C-03')[0]).toMatch(/at the October 5, 2026 price and today's tax rules\.$/);
    expect(text(EC_C_01, 'AC-C-14')[0]).toMatch(/^Social Security and Medicare tax on this vest: \$[\d,]+, not included in the gap\.$/);
  });

  it('AC-C-13 · AC-C-08 · state withholding notice for the advisor only, and none where the state has no income tax', () => {
    expect(analyze(EC_C_01, ON).lines.find((l) => l.ac === 'AC-C-13')).toMatchObject({ audience: 'advisor', text: 'State withholding not entered for Halden Robotics RSU.' });
    expect(text(H6, 'AC-C-13')).toEqual([]);
    expect(text(H6, 'AC-C-12')).toEqual([]);
  });
});

describe('F-C · score and report', () => {
  it('AC-C-17 · AC-C-18 · positive gaps within the horizon are added to near-term commitments; state part only when entered', () => {
    const near: Household = { ...EC_C_01, grants: [grant('n', 'halden', '2027-01-15', 2_000)] };
    const s = simulateScore(near, ON);
    const [t] = vestTaxes(near, ON);
    expect(s.liquidity.vestGaps).toBeCloseTo(t.federalGap);
    expect(s.liquidity.commitments).toBeCloseTo(near.nearTermCommitments + t.federalGap);
  });

  it('AC-C-17 · EC-C-06 · a vest outside the horizon is in the report, not in the check', () => {
    const far: Household = { ...EC_C_01, grants: [grant('f', 'halden', '2028-06-01', 2_000)] };
    expect(simulateScore(far, ON).liquidity.vestGaps).toBe(0);
    expect(text(far, 'AC-C-23')).toHaveLength(1);
    expect(text(far, 'AC-C-24')).toEqual([]);
  });

  it('AC-C-20 · AC-C-21 · AC-C-24 · AC-C-28 · View more, look into and Summary candidate for a gap within the horizon', () => {
    const near: Household = { ...EC_C_01, grants: [grant('n', 'halden', '2027-01-15', 2_000)] };
    const gap = Math.round(vestTaxes(near, ON)[0].gap).toLocaleString('en-US');
    expect(text(near, 'AC-C-21')).toEqual([`Tax due on upcoming vests counted in near-term commitments: $${gap}. (federal only; state withholding not entered)`]);
    expect(text(near, 'AC-C-24')).toEqual([`Tax on the January 2027 vest may exceed withholding by $${gap}.`]);
    expect(text(near, 'AC-C-28')).toEqual(text(near, 'AC-C-24'));
    const entered = { ...near, grants: [{ ...near.grants[0], stateWithholdingRate: 0.05 }] };
    expect(text(entered, 'AC-C-20')[0]).toMatch(/^Tax due on upcoming vests counted in near-term commitments: \$[\d,]+\.$/);
  });

  it('AC-C-22 · performance units counted: View more says so', () => {
    const near: Household = { ...H3, grants: [{ ...H3.grants[0], tranches: [{ id: 't1', date: '2027-02-15', units: 1_200 }] }], salary: { p1: 420_000 } };
    expect(text(near, 'AC-C-22')).toEqual(['Performance units counted at target.']);
  });

  it('AC-C-23 · AC-C-26 · AC-C-27 · per-year bullet, this year\'s line under the cash flow statement, and the reported-income note', () => {
    expect(text(H2_COMPLETE, 'AC-C-23')[0]).toMatch(/^2026 vests: \$12,500 of income, estimated tax \$[\d,]+, gap after withholding \$[\d,]+\.$/);
    expect(text(H2_COMPLETE, 'AC-C-26')[0]).toMatch(/^Stock compensation \(vests this year\), not in the totals above: \$12,500, estimated tax \$[\d,]+\.$/);
    expect(text(H2_COMPLETE, 'AC-C-27')).toEqual(['Savings rate and debt ratios read reported income; vests are shown separately.']);
  });

  it('AC-C-25 · AC-G-03 · no complete grant: tax lines, Liquidity and report as today', () => {
    expect(analyze(H2, ON).lines.filter((l) => l.ac.startsWith('AC-C'))).toEqual([]);
    expect(simulateScore(H2, ON)).toEqual(simulateScore({ ...H2, grants: [] }, ON));
  });

  it('AC-G-16 · checks that read income (savings rate, debt, cover) never change with vests', () => {
    const a = simulateScore(H2_COMPLETE, ON).areas;
    const b = simulateScore({ ...H2, grants: [] }, ON).areas;
    for (const area of ['cashFlow', 'debt', 'protection'] as const) {
      expect(a.find((x) => x.area === area)).toEqual(b.find((x) => x.area === area));
    }
    expect(a.find((x) => x.area === 'liquidity')!.checks.monthsOfReserve).toBe(b.find((x) => x.area === 'liquidity')!.checks.monthsOfReserve);
  });
});

describe('F-E income rules used by F-C', () => {
  it('AC-E-12 · "no": every future tranche, this year\'s included, is added beside salary', () => {
    expect(baseWages(H2_COMPLETE, ON, 2026)).toEqual({ p1: 260_000, p2: 90_000 });
    expect(addedVestIncome(H2_COMPLETE, ON, 2026)).toBe(12_500);
  });

  it('AC-E-12 · EC-C-08 · wages are the reported salary in every year; each future vest is added beside it once', () => {
    for (const y of [2026, 2027, 2028]) expect(baseWages(H2_COMPLETE, ON, y)).toEqual({ p1: 260_000, p2: 90_000 });
    const futureIn = (y: number) => countedFutureVests(H2_COMPLETE, ON).filter((v) => v.tranche.date.startsWith(String(y))).reduce((s, v) => s + v.value, 0);
    for (const y of [2026, 2027]) expect(addedVestIncome(H2_COMPLETE, ON, y)).toBe(futureIn(y));
  });
});

describe('F-C · events', () => {
  it('EV-C-01 · entering a state rate records the grant and the days since it was completed', () => {
    const log = new EventLog();
    const done = saveGrant(H2, H2_GRANT, ON); // completed on the analysis date
    setStateWithholding(done, 'h2-g1', 0.06, '2026-10-12', log);
    expect(log.of('EV-C-01')[0].data).toEqual({ grant: 'h2-g1', daysSinceCompleted: 7 });
  });

  it('EV-C-02 · recorded when the Liquidity check counts a vest gap', () => {
    const log = new EventLog();
    analyze(H1, ON, log);
    expect(log.of('EV-C-02')).toEqual([]);
    analyze(H2_COMPLETE, ON, log);
    expect(log.of('EV-C-02')).toHaveLength(1);
  });
});

describe('F-C · simulator relations (spec "Simulator tests")', () => {
  const liquidity = (h: Household) => simulateScore(h, ON).areas.find((a) => a.area === 'liquidity')!.points;
  const near = (units: number): Household => ({ ...EC_C_01, cash: 30_000, grants: [grant('n', 'halden', '2027-01-15', units)] });

  it('REL-C-1 · a larger gap never raises the Liquidity score', () => {
    expect(liquidity(near(4_000))).toBeLessThanOrEqual(liquidity(near(2_000)));
    expect(liquidity(near(2_000))).toBeLessThanOrEqual(liquidity(near(0)));
  });

  it('REL-C-2 · a state rate equal to the state tax owed leaves the counted gap equal to the federal gap', () => {
    const h = near(2_000);
    const [t] = vestTaxes(h, ON);
    const rate = t.owed.state / t.vest.value;
    const entered = { ...h, grants: [{ ...h.grants[0], stateWithholdingRate: rate }] };
    expect(countedVestGaps(entered, ON).total).toBeCloseTo(t.federalGap);
  });

  it('REL-C-3 · a household without grants gets the same Liquidity figure as today', () => {
    expect(simulateScore({ ...H6, grants: [] }, ON).liquidity).toEqual(simulateScore({ ...H6, grants: [] }, { ...ON, stockComp: false }).liquidity);
  });

  it('REL-C-4 · a vest outside the horizon changes no score figure', () => {
    const far: Household = { ...near(2_000), grants: [grant('f', 'halden', '2028-06-01', 2_000)] };
    expect(simulateScore(far, ON)).toEqual(simulateScore({ ...far, grants: [] }, ON));
  });

  it('AC-C-30 · EC-C-12 · vest on 15 December, shares delivered on 5 January: income tax and its lines in the next year, Social Security and Medicare in the vest year', () => {
    const h: Household = { ...EC_C_01, grants: [grant('dec', 'halden', '2026-12-15', 2_000, { tranches: [{ id: 'dec-t', date: '2026-12-15', deliveryDate: '2027-01-05', units: 2_000 }] })] };
    const [t] = vestTaxes(h, ON);
    expect(taxYears(t.vest)).toEqual({ income: 2027, fica: 2026 });
    expect(addedVestIncome(h, ON, 2027)).toBe(100_000);
    expect(addedVestIncome(h, ON, 2026)).toBe(0);
    expect(text(h, 'AC-C-23')[0]).toMatch(/^2027 vests: \$100,000 of income/);
    expect(text(h, 'AC-C-24')[0] ?? '').not.toMatch(/December 2026/);
    expect(text(h, 'AC-C-26')).toEqual([]);
  });
});
