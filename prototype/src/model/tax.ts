// SIMULATED tax engine. The platform computes federal, FICA and state tax from the household's
// state, filing status and brackets [FACT: data_model]; its engine is not public and the
// brackets are not in docs/research.md, so every number below is SIMULATED and labelled.
// NOT real tax rules. Only the 22% / 37% supplemental withholding rates come from R-008.
import type { Household, Money, PersonId } from './types';

/** SIMULATED federal brackets on taxable income: [upper bound, rate], for joint filers. */
const JOINT: [number, number][] = [[24_000, 0.1], [96_000, 0.12], [206_000, 0.22], [394_000, 0.24], [500_000, 0.32], [750_000, 0.35], [Infinity, 0.37]];
const SIM_DEDUCTION = { joint: 30_000, single: 15_000 };
const SIM_SS_RATE = 0.062;
const SIM_SS_WAGE_BASE = 180_000;
const SIM_MEDICARE_RATE = 0.0145;

function federal(taxable: number, status: Household['filingStatus']): number {
  const scale = status === 'joint' ? 1 : 0.5;
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of JOINT) {
    const top = upper * scale;
    if (taxable > lower) tax += (Math.min(taxable, top) - lower) * rate;
    lower = top;
  }
  return tax;
}

export interface TaxByLevel { federal: Money; fica: Money; state: Money }

/** Household tax for a year, with wages per person (salary plus any vest income). */
export function householdTax(h: Household, wages: Record<PersonId, Money>): TaxByLevel {
  const total = Object.values(wages).reduce((a, b) => a + b, 0);
  const taxable = Math.max(0, total - SIM_DEDUCTION[h.filingStatus]);
  const fica = Object.values(wages).reduce((s, w) => s + Math.min(w, SIM_SS_WAGE_BASE) * SIM_SS_RATE + w * SIM_MEDICARE_RATE, 0);
  return { federal: federal(taxable, h.filingStatus), fica, state: taxable * h.stateTaxRate };
}

/** R-008: supplemental withholding, 22%, and 37% above $1 million in the year. */
export const SUPPLEMENTAL = { rate: 0.22, highRate: 0.37, threshold: 1_000_000 };
