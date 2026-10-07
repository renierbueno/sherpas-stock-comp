// Reprocessing: turns a household into an analysis (score plus report lines). An analysis is
// a snapshot: it changes only when the advisor saves and the household is reprocessed.
import type { EventLog } from './events';
import { linesFA, linesFB, linesFC, linesFD, type ReportLine } from './lines';
import { simulateScore, type ScoreResult } from './score';
import type { Firm, Household } from './types';

export interface Analysis {
  householdId: string;
  analysisDate: string;
  firmStockComp: boolean;
  score: ScoreResult;
  lines: ReportLine[];
}

export function analyze(h: Household, firm: Firm, log?: EventLog): Analysis {
  const score = simulateScore(h, firm);
  if (score.liquidity.vestGaps > 0) log?.record('EV-C-02', h.id, { gaps: score.liquidity.vestGaps });
  if (score.concentration.readsEmployer) {
    log?.record('EV-A-02', h.id, { issuer: score.concentration.topExposure?.employer.id });
  }
  return {
    householdId: h.id,
    analysisDate: h.analysisDate,
    firmStockComp: firm.stockComp,
    score,
    lines: [...linesFA(h, firm, score), ...linesFB(h, firm), ...linesFC(h, firm, score), ...linesFD(h, firm)],
  };
}

export const sharedLines = (a: Analysis) => a.lines.filter((l) => l.audience === 'shared');
