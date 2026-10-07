// F-E unit tests: what the client's stock-pay row creates, the alert, and the advisor notices.
// Households are SIMULATED.
import { setFlag } from '../../src/model/actions';
import { analyze } from '../../src/model/analysis';
import { EventLog } from '../../src/model/events';
import { saveGrant, statusOf } from '../../src/model/grants';
import { H1, H2, H2_GRANT, H5 } from '../../src/model/households';
import { flagSuggestions, opportunityAlerts, PENDING_ALERT, recordAlertChange, recordRowChange, rowErrors, submitQuestionnaire, type StockPayRow } from '../../src/model/intake';
import { simulateScore } from '../../src/model/score';
import type { Firm, Household } from '../../src/model/types';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const text = (h: Household, ac: string) => analyze(h, ON).lines.filter((l) => l.ac === ac).map((l) => l.text);
const row = (r: Partial<StockPayRow>): StockPayRow => ({ id: 'r1', ownerId: 'p1', employer: 'Halden Robotics', ...r });
const BLANK: Household = { ...H2, grants: [] };

describe('F-E · questionnaire rows', () => {
  it('AC-E-04 · EC-E-03 · only the employer is required; every other field may be empty or "not sure"', () => {
    expect(rowErrors(row({ employer: '' }))).toEqual(['Employer is required']);
    expect(rowErrors(row({ type: 'not sure', frequency: 'not sure' }))).toEqual([]);
  });

  it('AC-E-07 · EC-E-03 · submitting a row creates a grant pending detail, source questionnaire, with the client estimate', () => {
    const h = submitQuestionnaire(BLANK, [row({ ticker: 'HLDN', type: 'RSU', unvestedValue: 120_000, frequency: 'quarterly' })], ON, '2026-09-28');
    expect(h.grants).toHaveLength(1);
    expect(h.grants[0]).toMatchObject({ ownerId: 'p1', employerId: 'halden', source: 'questionnaire', clientEstimate: { unvestedValue: 120_000, frequency: 'quarterly' } });
    expect(statusOf(h, h.grants[0])).toBe('pending detail');
  });

  it('AC-E-03 · EC-E-02 · client and co-client with the same employer: two rows, two grants, one employer', () => {
    const h = submitQuestionnaire(BLANK, [row({ id: 'a' }), row({ id: 'b', ownerId: 'p2' })], ON, '2026-09-28');
    expect(h.grants.map((g) => g.ownerId)).toEqual(['p1', 'p2']);
    expect(h.employers.filter((e) => e.name === 'Halden Robotics')).toHaveLength(1);
  });

  it('AC-E-03 · EC-E-05 · no ticker: listed or private is unknown, so the grant stays pending until the advisor says', () => {
    const h = submitQuestionnaire(H1, [row({ employer: 'Sim Startup' })], ON, '2026-09-28');
    expect(h.employers.find((e) => e.name === 'Sim Startup')).toMatchObject({ listed: false, listedUnknown: true });
    expect(statusOf(h, h.grants[0])).toBe('pending detail');
    const priv = { ...h, employers: h.employers.map((e) => (e.name === 'Sim Startup' ? { ...e, listedUnknown: undefined } : e)) };
    expect(statusOf(priv, priv.grants[0])).toBe('awaiting a liquidity event');
  });

  it('AC-E-06 · AC-G-03 · no row: the household and its analysis are exactly as today', () => {
    expect(submitQuestionnaire(H1, [], ON, '2026-09-28')).toBe(H1);
  });

  it('AC-E-20 · a pending grant never blocks submitting or generating the analysis', () => {
    const h = submitQuestionnaire(BLANK, [row({})], ON, '2026-09-28');
    expect(() => analyze(h, ON)).not.toThrow();
    expect(simulateScore(h, ON)).toEqual(simulateScore(BLANK, ON));
  });

  it('AC-G-01 · with the setting off, rows create nothing', () => {
    expect(submitQuestionnaire(BLANK, [row({})], { ...ON, stockComp: false }, '2026-09-28').grants).toEqual([]);
  });
});

describe('F-E · alert and notices', () => {
  it('AC-E-08 · AC-E-09 · EC-E-09 · the alert shows while a grant is pending and goes when none is', () => {
    expect(opportunityAlerts(H2, ON)).toEqual([PENDING_ALERT]);
    expect(opportunityAlerts(saveGrant(H2, H2_GRANT, ON), ON)).toEqual([]);
    expect(opportunityAlerts({ ...H2, grants: [] }, ON)).toEqual([]);
  });

  it('AC-E-16 · EC-E-06 · type "other": advisor notice to flag held shares instead', () => {
    const h = submitQuestionnaire(BLANK, [row({ type: 'other' })], ON, '2026-09-28');
    expect(text(h, 'AC-E-16')).toEqual(['This type is not modelled in this version; flag any shares already held as employer stock.']);
  });

  it('AC-E-17 · AC-E-18 · one suggestion per employer naming every account; flagged only after the advisor confirms each position', () => {
    expect(flagSuggestions(H2, ON).map((x) => x.positionIds)).toEqual([['h2-hldn-brk', 'h2-hldn-401k']]);
    expect(text(H2, 'AC-E-17')).toEqual(['Halden Robotics (HLDN) is held in Maya brokerage and Maya 401(k). Flag as employer stock?']);
    expect(H2.flags).toEqual([]);
    const confirmed = setFlag(H2, { positionId: 'h2-hldn-brk', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' }, ON);
    expect(text(confirmed, 'AC-E-17')).toEqual(['Halden Robotics (HLDN) is held in Maya 401(k). Flag as employer stock?']);
  });

  it('AC-G-11 · F-E notices never reach the shared view', () => {
    expect(analyze(H2, ON).lines.filter((l) => l.ac.startsWith('AC-E-1') && l.ac !== 'AC-E-10').every((l) => l.audience === 'advisor')).toBe(true);
  });
});

describe('F-E · events', () => {
  it('EV-E-01 · adding or removing a row is recorded with the firm', () => {
    const log = new EventLog();
    recordRowChange(H2, ON, 'added', log);
    recordRowChange(H2, ON, 'removed', log);
    expect(log.of('EV-E-01').map((e) => e.data)).toEqual([{ firm: 'firm-sim', action: 'added' }, { firm: 'firm-sim', action: 'removed' }]);
  });

  it('EV-E-02 · the completion keeps the stock-pay answer', () => {
    const log = new EventLog();
    submitQuestionnaire(H1, [], ON, '2026-09-28', log);
    submitQuestionnaire(BLANK, [row({})], ON, '2026-09-28', log);
    expect(log.of('EV-E-02').map((e) => e.data)).toEqual([{ stockPay: 'no' }, { stockPay: 'yes' }]);
  });

  it('EV-E-03 · the alert being raised and removed is recorded with the time', () => {
    const log = new EventLog();
    const pending = submitQuestionnaire(BLANK, [row({})], ON, '2026-09-28');
    recordAlertChange(BLANK, pending, ON, '2026-09-28', log);
    recordAlertChange(pending, { ...pending, grants: [] }, ON, '2026-10-05', log);
    expect(log.of('EV-E-03').map((e) => e.data)).toEqual([{ change: 'raised', at: '2026-09-28' }, { change: 'removed', at: '2026-10-05' }]);
  });
});

describe('F-E · simulator relations (spec "Simulator tests")', () => {
  it('REL-E-1 · the current year\'s total income is the reported income plus that year\'s future vests (AC-E-12)', async () => {
    const { addedVestIncome, baseWages } = await import('../../src/model/vestTax');
    const h = saveGrant(H2, H2_GRANT, ON);
    const reported = Object.values(h.salary).reduce((a, b) => a + b, 0);
    const wages = Object.values(baseWages(h, ON, 2026)).reduce((a, b) => a + b, 0);
    expect(wages).toBe(reported);
    expect(addedVestIncome(h, ON, 2026)).toBeGreaterThan(0);
  });

  it('REL-E-2 · a grant pending detail changes no score figure', () => {
    expect(simulateScore(H5, ON)).toEqual(simulateScore({ ...H5, grants: [] }, ON));
  });
});
