// F-A unit tests: model and score simulator. Titles start with the IDs they prove.
// Households are SIMULATED (src/model/households.ts).
import { analyze } from '../../src/model/analysis';
import { removeFlag, setFlag } from '../../src/model/actions';
import { EventLog } from '../../src/model/events';
import { concentration, employerExposures } from '../../src/model/exposure';
import { H1, H2, H4, H6 } from '../../src/model/households';
import { simulateScore } from '../../src/model/score';
import type { EmployerFlag, Firm, Household } from '../../src/model/types';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const OFF: Firm = { id: 'firm-sim', stockComp: false };

const flag = (positionId: string, employerId: string, personId = 'p1', currentEmployer: EmployerFlag['currentEmployer'] = 'yes'): EmployerFlag =>
  ({ positionId, employerId, personId, currentEmployer });

/** H2 with both Halden positions flagged: EC-A-01. */
const H2_FLAGGED: Household = { ...H2, flags: [flag('h2-hldn-brk', 'halden'), flag('h2-hldn-401k', 'halden')] };

describe('F-A · employer stock counted in concentration', () => {
  it('AC-A-04 · EC-A-01 · EC-A-10 · sums flagged positions of one issuer across accounts: $300K, 30%', () => {
    const [e] = employerExposures(H2_FLAGGED, ON);
    expect(e.value).toBe(300_000);
    expect(e.share).toBeCloseTo(0.3);
    expect(e.accountIds).toHaveLength(2);
  });

  it('AC-A-09 · EC-A-01 · the check reads 30% instead of the 20% fund line', () => {
    expect(concentration(H2, ON).figure).toBeCloseTo(0.2);
    const c = concentration(H2_FLAGGED, ON);
    expect(c.figure).toBeCloseTo(0.3);
    expect(c.readsEmployer).toBe(true);
  });

  it('AC-A-09 · EC-A-02 · a larger fund line still wins: reads today\'s figure', () => {
    // H1 has a 45% fund line; add 300K employer stock in a new account (share stays below 45%).
    const h: Household = {
      ...H1,
      employers: [{ id: 'emp', name: 'Sim Employer', listed: true, ticker: 'SIMEM' }],
      accounts: [...H1.accounts, { id: 'x', name: 'x', type: 'Brokerage', owners: ['p1'], positions: [{ id: 'emp-pos', ticker: 'SIMEM', name: 'Sim Employer', value: 300_000 }] }],
      flags: [flag('emp-pos', 'emp')],
    };
    const c = concentration(h, ON);
    expect(c.readsEmployer).toBe(false);
    expect(c.figure).toBeCloseTo(450_000 / 1_300_000);
  });

  it('AC-A-04 · EC-A-03 · client and co-client shares of the same employer make one exposure', () => {
    const h: Household = { ...H6, flags: [flag('h6-hldn-1', 'halden', 'p1'), flag('h6-hldn-2', 'halden', 'p2')] };
    const ex = employerExposures(h, ON);
    expect(ex).toHaveLength(1);
    expect(ex[0].value).toBe(160_000);
    expect(ex[0].payFrom).toEqual(['p1', 'p2']);
  });

  it('AC-A-04 · AC-A-09 · EC-A-04 · two employers make two exposures; the check reads the largest', () => {
    const h: Household = {
      ...H6,
      employers: [...H6.employers, { id: 'other', name: 'Sim Other', listed: true, ticker: 'SIMOT' }],
      flags: [flag('h6-hldn-1', 'halden', 'p1'), flag('h6-hldn-2', 'other', 'p2')],
    };
    const ex = employerExposures(h, ON);
    expect(ex.map((e) => e.employer.id)).toEqual(['halden', 'other']);
    expect(concentration(h, ON).topExposure?.employer.id).toBe('halden');
  });

  it('AC-A-05 · EC-A-07 · positions of a private employer stay out of exposure', () => {
    const h: Household = { ...H4, flags: [flag('h4-lumen', 'lumen')] };
    expect(employerExposures(h, ON)).toEqual([]);
    expect(concentration(h, ON).figure).toBeCloseTo(concentration(H4, ON).figure);
  });

  it('AC-A-07 · EC-A-11 · a flagged position without a market price stays out of exposure', () => {
    const h: Household = {
      ...H2_FLAGGED,
      accounts: H2_FLAGGED.accounts.map((a) => ({ ...a, positions: a.positions.map((p) => (p.id === 'h2-hldn-401k' ? { ...p, value: null } : p)) })),
    };
    expect(employerExposures(h, ON)[0].value).toBe(150_000);
  });

  it('AC-A-11 · EC-A-12 · AC-G-03 · no flag: concentration and score exactly as today', () => {
    expect(simulateScore(H2, ON)).toEqual(simulateScore(H2, OFF));
    expect(simulateScore(H1, ON)).toEqual(simulateScore(H1, OFF));
  });

  it('AC-A-10 · the employer figure is scored on the existing curve: same figure, same check score', () => {
    // One unflagged position of $300K in one account vs two flagged positions of $150K.
    const single: Household = {
      ...H2,
      accounts: [
        { id: 'one', name: 'one', type: 'Brokerage', owners: ['p1'], positions: [{ id: 'big', ticker: 'HLDN', name: 'Halden Robotics', value: 300_000 }] },
        ...H2.accounts.map((a) => ({ ...a, positions: a.positions.filter((p) => !p.id.startsWith('h2-hldn')) })),
      ],
    };
    const a = simulateScore(single, ON).areas.find((x) => x.area === 'investing')!;
    const b = simulateScore(H2_FLAGGED, ON).areas.find((x) => x.area === 'investing')!;
    expect(b.checks.concentration).toBeCloseTo(a.checks.concentration);
  });

  it('AC-G-01 · AC-G-13 · setting off: flags are kept but read as absent', () => {
    expect(employerExposures(H2_FLAGGED, OFF)).toEqual([]);
    expect(simulateScore(H2_FLAGGED, OFF)).toEqual(simulateScore(H2, OFF));
    expect(H2_FLAGGED.flags).toHaveLength(2);
  });

  it('EC-A-14 · removing the flag removes exposure and the new lines on reprocessing', () => {
    let h = H2_FLAGGED;
    h = removeFlag(h, 'h2-hldn-brk', ON);
    h = removeFlag(h, 'h2-hldn-401k', ON);
    expect(analyze(h, ON).lines).toEqual([]);
  });

  it('EC-A-05 · EC-A-06 · former or unknown employer: counted in exposure, no pay line', () => {
    const h: Household = { ...H2, flags: [flag('h2-hldn-brk', 'halden', 'p1', 'no'), flag('h2-hldn-401k', 'halden', 'p1', 'unknown')] };
    expect(employerExposures(h, ON)[0].value).toBe(300_000);
    expect(analyze(h, ON).lines.some((l) => l.ac === 'AC-A-13')).toBe(false);
  });

  it('AC-A-14 · one account reads "held in 1 account" (D-066)', () => {
    const h: Household = { ...H2, flags: [flag('h2-hldn-brk', 'halden')] };
    expect(analyze(h, ON).lines.find((l) => l.ac === 'AC-A-14')?.text)
      .toBe('Halden Robotics stock held in 1 account: $150,000, 15% of investable assets.');
  });

  it('EV-A-01 · flagging and unflagging record firm, household, issuer and listed', () => {
    const log = new EventLog();
    const h = setFlag(H2, flag('h2-hldn-brk', 'halden'), ON, log);
    removeFlag(h, 'h2-hldn-brk', ON, log);
    expect(log.of('EV-A-01').map((e) => e.data)).toEqual([
      { firm: 'firm-sim', action: 'flag', issuer: 'halden', listed: true },
      { firm: 'firm-sim', action: 'unflag', issuer: 'halden', listed: true },
    ]);
  });

  it('EV-A-02 · recorded when the check reads employer exposure, not otherwise', () => {
    const log = new EventLog();
    analyze(H2, ON, log);
    expect(log.of('EV-A-02')).toHaveLength(0);
    analyze(H2_FLAGGED, ON, log);
    expect(log.of('EV-A-02')).toEqual([{ id: 'EV-A-02', householdId: 'H2', data: { issuer: 'halden' } }]);
  });

  it('AC-A-01 · flagging is refused when the firm has not enabled stock compensation', () => {
    expect(() => setFlag(H2, flag('h2-hldn-brk', 'halden'), OFF)).toThrow();
  });

  it('AC-A-02 · AC-A-03 · the flag keeps current employer and cost basis', () => {
    const h = setFlag(H2, { ...flag('h2-hldn-brk', 'halden', 'p1', 'unknown'), costBasis: 90_000 }, ON);
    expect(h.flags[0]).toMatchObject({ currentEmployer: 'unknown', costBasis: 90_000 });
  });
});

describe('F-A · simulator relations (spec "Simulator tests")', () => {
  it('REL-A-1 · flagging a single position that is already the largest leaves the score unchanged', () => {
    const h: Household = { ...H1, employers: [{ id: 'f', name: 'Sim Fund Co', listed: true, ticker: 'SIMTM' }], flags: [flag('h1-tmf', 'f')] };
    expect(simulateScore(h, ON).score).toBe(simulateScore(H1, ON).score);
  });

  it('REL-A-2 · employer stock split across two accounts scores as one position of the sum', () => {
    const single: Household = {
      ...H2,
      accounts: [
        { id: 'one', name: 'one', type: 'Brokerage', owners: ['p1'], positions: [{ id: 'big', ticker: 'HLDN', name: 'Halden Robotics', value: 300_000 }] },
        ...H2.accounts.map((a) => ({ ...a, positions: a.positions.filter((p) => !p.id.startsWith('h2-hldn')) })),
      ],
    };
    expect(simulateScore(H2_FLAGGED, ON).score).toBe(simulateScore(single, ON).score);
  });

  it('REL-A-3 · adding a private-employer position never changes the concentration figure', () => {
    const h: Household = {
      ...H2_FLAGGED,
      employers: [...H2.employers, { id: 'priv', name: 'Sim Private', listed: false }],
      accounts: [...H2_FLAGGED.accounts, { id: 'p', name: 'p', type: 'Brokerage', owners: ['p1'], positions: [{ id: 'priv-pos', name: 'Sim Private shares', value: 500_000, privateInstrument: true }] }],
      flags: [...H2_FLAGGED.flags, flag('priv-pos', 'priv')],
    };
    expect(concentration(h, ON).figure).toBeCloseTo(concentration(H2_FLAGGED, ON).figure);
  });

  it('REL-A-4 · the concentration figure with employer exposure is never lower than today\'s', () => {
    for (const h of [H2_FLAGGED, { ...H6, flags: [flag('h6-hldn-1', 'halden')] }]) {
      expect(concentration(h, ON).figure).toBeGreaterThanOrEqual(concentration(h, OFF).figure);
    }
  });
});
