// Rules for every feature (G) and the sharing events. SIMULATED households.
import { analyze } from '../../src/model/analysis';
import { EventLog } from '../../src/model/events';
import { H2, H2_COMPLETE } from '../../src/model/households';
import { simulateScore } from '../../src/model/score';
import { adjustScore, applyEdits, shareAnalysis } from '../../src/model/sharing';
import type { Firm, Household } from '../../src/model/types';

const ON: Firm = { id: 'firm-sim', stockComp: true };
const FLAGGED: Household = { ...H2_COMPLETE, flags: [
  { positionId: 'h2-hldn-brk', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' },
  { positionId: 'h2-hldn-401k', employerId: 'halden', personId: 'p1', currentEmployer: 'yes' },
] };

describe('G · rules for every feature', () => {
  it('AC-G-14 · no new score limit: the score is the sum of the area points, with employer exposure and vest gaps', () => {
    for (const h of [FLAGGED, H2_COMPLETE]) {
      const s = simulateScore(h, ON);
      expect(s.score).toBe(Math.round(s.areas.reduce((t, a) => t + a.points, 0)));
    }
  });

  it('AC-G-07 · AC-G-10 · edited lines show their new text; deleted lines show nowhere', () => {
    const lines = analyze(FLAGGED, ON).lines;
    const out = applyEdits(lines, { 'A-15': 'Edited by the advisor.', 'A-23': null });
    expect(out.find((l) => l.id === 'A-15')?.text).toBe('Edited by the advisor.');
    expect(out.find((l) => l.id === 'A-23')).toBeUndefined();
    expect(out).toHaveLength(lines.length - 1);
  });
});

describe('G · events', () => {
  it('EV-A-03 · adjusting the score of a household with employer exposure records it with a "stock compensation" tag', () => {
    const log = new EventLog();
    adjustScore(H2, 2, 'Threshold too hard', ON, log);
    expect(log.of('EV-A-03')).toEqual([]);
    adjustScore(FLAGGED, -3, 'Threshold too hard for one company', ON, log);
    expect(log.of('EV-A-03')[0].data).toEqual({ points: -3, reason: 'Threshold too hard for one company', tag: 'stock compensation' });
  });

  it('EV-A-04 · EV-D-01 · sharing records whether F-A and F-D lines were edited or deleted', () => {
    const log = new EventLog();
    const lines = analyze(FLAGGED, ON).lines;
    shareAnalysis(FLAGGED, lines, {}, log);
    shareAnalysis(FLAGGED, lines, { 'A-15': null }, log);
    expect(log.of('EV-A-04').map((e) => e.data)).toEqual([{ edited: false }, { edited: true }]);
    expect(log.of('EV-D-01').map((e) => e.data)).toEqual([{ edited: false }, { edited: false }]);
  });
});
