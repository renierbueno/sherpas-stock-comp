// Score simulator parameters (docs/spec/00_index.md "Score simulator parameters").
// Public parts of the score article are used as given [brief]. Every P- value below is
// SIMULATED [ASSUMPTION: confirm]: it is not a Sherpas number. Tests assert relations, not scores.

/** Area weights for a household building wealth [brief]. */
export const AREA_WEIGHTS = {
  cashFlow: 30,
  debt: 20,
  protection: 20,
  liquidity: 15,
  investing: 15,
} as const;
export type Area = keyof typeof AREA_WEIGHTS;

/** Which checks feed each area [FACT: platform_map, 02-score-breakdown]. */
export const AREA_CHECKS: Record<Area, string[]> = {
  cashFlow: ['savingsRate', 'fixedCommitments'],
  debt: ['housingLoad', 'revolvingBalance'],
  protection: ['coverVsNeed', 'umbrella'],
  liquidity: ['monthsOfReserve', 'nearTermCommitments'],
  investing: ['allocationVsTarget', 'concentration', 'idleCash', 'taxLocation'],
};

/**
 * P-AREA-MIX · SIMULATED: how check scores combine into an area. Not in the spec's
 * parameter table until GAP-28; added by D-066. Equal weights.
 */
export function areaMix(checkScores: number[]): number {
  return checkScores.reduce((a, b) => a + b, 0) / checkScores.length;
}

/**
 * P-CONC · SIMULATED curve of the Investing concentration check: figure (share of
 * investable assets in one position, 0 to 1) to a 0-100 score. 100 up to 10%, falling
 * linearly to 0 at 50%. R-014's 10% is reference only.
 */
export function pConc(figure: number): number {
  const lo = 0.1;
  const hi = 0.5;
  if (figure <= lo) return 100;
  if (figure >= hi) return 0;
  return 100 * (1 - (figure - lo) / (hi - lo));
}

/** P-LIQ-HORIZON · SIMULATED: "near-term" in the Liquidity commitments check, in months. */
export const P_LIQ_HORIZON_MONTHS = 12;

/**
 * P-LIQ · SIMULATED curve of the near-term commitments check: cash held over near-term
 * commitments to a 0-100 score. 0 at 0.5 or less, 100 at 1.5 or more, linear between.
 */
export function pLiq(cover: number): number {
  if (cover >= 1.5) return 100;
  if (cover <= 0.5) return 0;
  return 100 * (cover - 0.5);
}
