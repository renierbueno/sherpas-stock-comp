// Score simulator. Reproduces only what the score article makes public [brief]; the rest is
// a P- parameter (params.ts). Checks the change does not touch are fixed SIMULATED values.
import { AREA_CHECKS, AREA_WEIGHTS, areaMix, pConc, type Area } from './params';
import { concentration, type ConcentrationReading } from './exposure';
import type { Firm, Household } from './types';

export interface AreaResult {
  area: Area;
  available: number;
  points: number;
  checks: Record<string, number>;
}

export interface ScoreResult {
  score: number;
  areas: AreaResult[];
  concentration: ConcentrationReading;
}

export function simulateScore(h: Household, firm: Firm): ScoreResult {
  const conc = concentration(h, firm);
  const checks: Record<string, number> = { ...h.untouchedChecks, concentration: pConc(conc.figure) };
  const areas = (Object.keys(AREA_WEIGHTS) as Area[]).map((area) => {
    const scores = AREA_CHECKS[area].map((c) => {
      if (checks[c] === undefined) throw new Error(`SIMULATED check value missing: ${c}`);
      return checks[c];
    });
    const available = AREA_WEIGHTS[area];
    const areaChecks = Object.fromEntries(AREA_CHECKS[area].map((c) => [c, checks[c]]));
    return { area, available, points: (available * areaMix(scores)) / 100, checks: areaChecks };
  });
  // No new score limit (AC-G-14): P-LIMITS are left out of the simulator, as labelled in the spec.
  const score = Math.round(areas.reduce((s, a) => s + a.points, 0));
  return { score, areas, concentration: conc };
}
