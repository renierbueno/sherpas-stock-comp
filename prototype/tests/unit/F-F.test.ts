// F-F unit tests: proposals from a plan statement. Extraction is SIMULATED (fixed results per
// sample document); the tests check what the system does with a proposal.
import { analyze } from '../../src/model/analysis';
import { EventLog } from '../../src/model/events';
import { confirmAll, confirmProposed, duplicateOf, rejectProposed, uploadStatement } from '../../src/model/extraction';
import { countedGrants, statusOf } from '../../src/model/grants';
import { H2, H2_COMPLETE } from '../../src/model/households';
import { simulateScore } from '../../src/model/score';
import type { Firm, Household } from '../../src/model/types';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const HALDEN = 'Halden plan statement (SIMULATED).pdf';
const THREE = 'Brokerage statement with three grants (SIMULATED).pdf';
const BASE: Household = { ...H2, grants: [] };
const proposals = (h: Household) => h.grants.filter((g) => g.proposed);

describe('F-F · proposals', () => {
  it('AC-F-02 · EC-F-01 · one proposed grant per grant found: two RSU and one PSU', () => {
    const { household, found } = uploadStatement(BASE, THREE, 'advisor');
    expect(found).toBe(3);
    expect(proposals(household).map((g) => g.type)).toEqual(['RSU', 'RSU', 'PSU']);
    expect(proposals(household).every((g) => statusOf(household, g) === 'proposed' && g.source === 'extraction')).toBe(true);
  });

  it('AC-F-03 · EC-F-04 · a proposed grant stays out of every figure', () => {
    const { household } = uploadStatement(BASE, THREE, 'advisor');
    expect(countedGrants(household, ON)).toEqual([]);
    expect(simulateScore(household, ON)).toEqual(simulateScore(BASE, ON));
    expect(analyze(household, ON).lines.filter((l) => l.audience === 'shared')).toEqual(analyze(BASE, ON).lines.filter((l) => l.audience === 'shared'));
  });

  it('AC-F-06 · confirming marks the grant complete and it enters the figures', () => {
    const { household } = uploadStatement(BASE, HALDEN, 'advisor');
    const after = confirmProposed(household, proposals(household)[0]);
    expect(proposals(after)).toEqual([]);
    expect(countedGrants(after, ON)).toHaveLength(1);
  });

  it('AC-F-07 · rejecting discards the proposal and changes nothing else', () => {
    const { household } = uploadStatement(BASE, THREE, 'advisor');
    const after = rejectProposed(household, proposals(household)[0].id);
    expect(proposals(after)).toHaveLength(2);
    expect({ ...after, grants: [] }).toEqual({ ...household, grants: [] });
  });

  it('AC-F-08 · EC-F-03 · nothing found: no proposal', () => {
    const { household, found } = uploadStatement(BASE, 'Unreadable scan (SIMULATED).pdf', 'advisor');
    expect(found).toBe(0);
    expect(household.grants).toEqual([]);
  });

  it('AC-F-09 · EC-F-02 · same employer, grant date and type as an existing grant: both kept until the advisor chooses', () => {
    const { household } = uploadStatement(H2_COMPLETE, HALDEN, 'advisor');
    const p = proposals(household)[0];
    expect(duplicateOf(household, p)?.id).toBe('h2-g1');
    expect(confirmProposed(household, p, undefined, 'existing').grants).toEqual(H2_COMPLETE.grants);
    const kept = confirmProposed(household, p, undefined, 'proposed');
    expect(kept.grants).toHaveLength(1);
    expect(kept.grants[0].source).toBe('extraction');
  });

  it('AC-F-10 · AC-F-11 · EC-F-06 · past vests are proposed as past tranches with shares kept; no held position is created', () => {
    const { household } = uploadStatement(BASE, HALDEN, 'advisor');
    const p = proposals(household)[0];
    expect(p.tranches.filter((t) => t.date <= household.analysisDate).map((t) => t.sharesKept)).toEqual([620, 155, 155]);
    expect(household.accounts).toEqual(BASE.accounts);
    const after = confirmProposed(household, p);
    expect(after.accounts).toEqual(BASE.accounts);
    expect(analyze(after, ON).lines.filter((l) => l.ac === 'AC-B-12')).toHaveLength(3);
  });

  it('AC-F-13 · a client upload in the questionnaire becomes the same proposal for the advisor to confirm', () => {
    const a = uploadStatement(BASE, HALDEN, 'advisor').household;
    const c = uploadStatement(BASE, HALDEN, 'client').household;
    expect(proposals(c)).toEqual(proposals(a));
    expect(countedGrants(c, ON)).toEqual([]);
  });
});

describe('F-F · events', () => {
  it('EV-F-01 · upload records whether any grant was found', () => {
    const log = new EventLog();
    uploadStatement(BASE, THREE, 'advisor', log);
    uploadStatement(BASE, 'Unreadable scan (SIMULATED).pdf', 'client', log);
    expect(log.of('EV-F-01').map((e) => e.data.grantsFound)).toEqual([3, 0]);
  });

  it('EV-F-02 · confirming records how many fields the advisor changed', () => {
    const log = new EventLog();
    const { household } = uploadStatement(BASE, THREE, 'advisor');
    const p = proposals(household)[0];
    confirmProposed(household, { ...p, units: 1_000, tranches: [{ ...p.tranches[0], units: 1_000 }] }, log);
    expect(log.of('EV-F-02')[0].data).toMatchObject({ fieldsChanged: 2 });
  });

  it('EV-F-03 · rejecting is recorded', () => {
    const log = new EventLog();
    const { household } = uploadStatement(BASE, THREE, 'advisor');
    rejectProposed(household, proposals(household)[0].id, log);
    expect(log.of('EV-F-03')).toHaveLength(1);
  });
});

describe('F-F · simulator relations (spec "Simulator tests")', () => {
  it('REL-F-1 · a proposed grant changes no figure until it is confirmed', () => {
    const { household } = uploadStatement(H2_COMPLETE, THREE, 'advisor');
    expect(simulateScore(household, ON)).toEqual(simulateScore(H2_COMPLETE, ON));
  });

  it('REL-F-2 · confirming a proposal gives the same figures as entering the same tranches by hand', () => {
    const { household } = uploadStatement({ ...H2, grants: [] }, HALDEN, 'advisor');
    const confirmed = confirmProposed(household, proposals(household)[0]);
    const strip = (h: Household) => analyze(h, ON).score;
    expect(strip(confirmed)).toEqual(strip(H2_COMPLETE));
  });

  it('AC-F-18 · "Confirm all" confirms every proposed grant of that statement and no other', () => {
    let { household } = uploadStatement(BASE, THREE, 'advisor');
    household = uploadStatement(household, HALDEN, 'advisor').household;
    const done = confirmAll(household, THREE);
    expect(done.grants.filter((g) => !g.proposed).map((g) => g.type)).toEqual(['RSU', 'RSU', 'PSU']);
    expect(proposals(done).map((g) => g.proposed!.document)).toEqual([HALDEN]);
  });

  it('AC-F-18 · AC-F-09 · a proposal with a duplicate stays for the advisor to choose', () => {
    const existing = { ...uploadStatement(BASE, THREE, 'advisor').household.grants[0], id: 'kept', proposed: undefined, source: 'advisor' as const };
    const { household } = uploadStatement({ ...BASE, grants: [existing] }, THREE, 'advisor');
    const done = confirmAll(household, THREE);
    expect(proposals(done)).toHaveLength(1);
    expect(duplicateOf(done, proposals(done)[0])?.id).toBe('kept');
  });

  it('AC-F-09 · an RSU and a PSU granted the same day are two grants, not duplicates (D-115)', () => {
    let { household } = uploadStatement(BASE, THREE, 'advisor');
    const [, rsu, psu] = household.grants;
    household = confirmProposed(household, rsu);
    expect(duplicateOf(household, household.grants.find((g) => g.id === psu.id)!)).toBeUndefined();
  });
});
