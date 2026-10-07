// F-D unit tests: vests as dated, after-tax inflows beside the goals. The projection growth and
// savings are SIMULATED; the tests check how vests enter it.
import { analyze } from '../../src/model/analysis';
import { H2, H2_COMPLETE, H3, H4, H5 } from '../../src/model/households';
import { projection, vestInflows } from '../../src/model/projection';
import { simulateScore } from '../../src/model/score';
import type { Firm, Household } from '../../src/model/types';
import { totalOwed, vestTaxes } from '../../src/model/vestTax';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const text = (h: Household, ac: string) => analyze(h, ON).lines.filter((l) => l.ac === ac).map((l) => l.text);
const NONE: Household = { ...H2, grants: [] };

/** EC-D-01 · SIMULATED: home purchase in 2028; vests of $40K in 2027 and 2028. */
const EC_D_01: Household = {
  ...H2_COMPLETE,
  goals: [{ id: 'home', name: 'Home purchase', year: 2028, amount: 250_000 }],
  grants: [{ ...H2_COMPLETE.grants[0], units: 1_600, tranches: [{ id: 'a', date: '2027-06-01', units: 800 }, { id: 'b', date: '2028-06-01', units: 800 }] }],
};

describe('F-D · inflows and goals', () => {
  it('AC-D-01 · AC-D-02 · one inflow per future tranche, on its date, after the tax computed in F-C', () => {
    const inflows = vestInflows(H2_COMPLETE, ON);
    const taxes = vestTaxes(H2_COMPLETE, ON);
    expect(inflows).toHaveLength(10);
    expect(inflows[0]).toMatchObject({ date: '2026-12-01', before: 12_500 });
    expect(inflows[0].after).toBeCloseTo(12_500 - totalOwed(taxes[0].owed));
  });

  it('AC-D-07 · EC-D-01 · vests before the goal: both years, after tax ($80K before tax)', () => {
    const inflows = vestInflows(EC_D_01, ON);
    expect(inflows.reduce((s, i) => s + i.before, 0)).toBe(80_000);
    const after = Math.round(inflows.reduce((s, i) => s + i.after, 0)).toLocaleString('en-US');
    expect(text(EC_D_01, 'AC-D-07')).toEqual([`Vests before Home purchase (2028): $${after} after estimated tax.`]);
  });

  it('AC-D-07 · EC-D-02 · a goal before the first vest gets no line', () => {
    const early = { ...EC_D_01, goals: [{ id: 'car', name: 'Vehicle', year: 2026, amount: 30_000 }] };
    expect(text(early, 'AC-D-07')).toEqual([]);
  });

  it('AC-D-06 · AC-D-08 · AC-G-15 · Retirement & Goals bullet with the price date, and the sell-or-keep note', () => {
    expect(text(H2_COMPLETE, 'AC-D-06')[0]).toMatch(/^Halden Robotics vests: \$[\d,]+ after estimated tax \(\$125,000 before tax\) between December 1, 2026 and March 1, 2029, at the October 5, 2026 price\.$/);
    expect(text(H2_COMPLETE, 'AC-D-08')).toEqual(["Value on the vest date; whether shares are sold or kept is the client's decision."]);
  });

  it('AC-D-06 · EC-D-03 · a PSU vest shows the target figure with its range', () => {
    expect(text(H3, 'AC-D-06')[0]).toMatch(/after estimated tax at target \(range \$0 to \$[\d,]+\) \(\$96,000 before tax\) on February 15, 2028/);
  });

  it('AC-D-04 · the projection carries a band where a year\'s vests include performance units', () => {
    const p = projection(H3, ON).find((x) => x.year === 2028)!;
    expect(p.low).toBeLessThan(p.netWorth);
    expect(p.high).toBeGreaterThan(p.netWorth);
    expect(projection(H2_COMPLETE, ON).every((x) => x.low === undefined)).toBe(true);
  });

  it('AC-D-05 · a tranche counts in no liquid figure before its vest date', () => {
    const a = simulateScore(H2_COMPLETE, ON).areas.find((x) => x.area === 'liquidity')!.checks.monthsOfReserve;
    const b = simulateScore(NONE, ON).areas.find((x) => x.area === 'liquidity')!.checks.monthsOfReserve;
    expect(a).toBe(b);
    expect(projection(H2_COMPLETE, ON)[0].netWorth - projection(NONE, ON)[0].netWorth).toBeCloseTo(vestInflows(H2_COMPLETE, ON).filter((i) => i.date < '2027').reduce((s, i) => s + i.after, 0));
  });

  it('AC-D-10 · EC-D-07 · each vest enters once, after tax, then grows as cash savings', () => {
    const diff = (y: number) => projection(EC_D_01, ON).find((p) => p.year === y)!.netWorth - projection({ ...EC_D_01, grants: [] }, ON).find((p) => p.year === y)!.netWorth;
    const [a, b] = vestInflows(EC_D_01, ON);
    expect(diff(2027)).toBeCloseTo(a.after);
    expect(diff(2028)).toBeCloseTo(a.after * 1.05 + b.after);
  });

  it('AC-D-09 · AC-G-04 · AC-G-05 · EC-D-04 · EC-D-05 · no complete listed grant: projection and goals as today', () => {
    for (const h of [H2, H4, H5]) {
      expect(projection(h, ON)).toEqual(projection({ ...h, grants: [] }, ON));
      expect(text(h, 'AC-D-06')).toEqual([]);
    }
  });
});

describe('F-D · simulator relations (spec "Simulator tests")', () => {
  it('REL-D-1 · adding a future tranche never changes current net worth or months of reserve', () => {
    expect(projection(H2_COMPLETE, ON)[0].netWorth - vestInflows(H2_COMPLETE, ON).filter((i) => i.date < '2027').reduce((s, i) => s + i.after, 0))
      .toBeCloseTo(projection(NONE, ON)[0].netWorth);
    expect(simulateScore(H2_COMPLETE, ON).areas.find((a) => a.area === 'liquidity')!.checks.monthsOfReserve)
      .toBe(simulateScore(NONE, ON).areas.find((a) => a.area === 'liquidity')!.checks.monthsOfReserve);
  });

  it('REL-D-2 · a household without grants gets the same projection as today', () => {
    expect(projection(NONE, ON)).toEqual(projection(NONE, { ...ON, stockComp: false }));
  });
});
