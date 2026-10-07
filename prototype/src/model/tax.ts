// Tax engine of the prototype. The platform computes federal, FICA and state tax from the
// household's state, filing status and brackets [FACT: data_model]; its engine is not public,
// so this one stands in for it.
// Real (tax year 2026, docs/12_stock_comp_rules.md): federal brackets and standard deductions
// for joint and single filers, Social Security, Medicare, Additional Medicare withholding and
// the supplemental withholding rates. Each constant cites its SC-NN; tests/unit/rules.test.ts
// checks it against the rules table (D-100).
// SIMULATED: the state tax, a flat rate per household (Household.stateTaxRate), and every
// household, salary and price it is applied to. Not tax advice.
import type { Household, Money, PersonId } from './types';

/** SC-13: the tax year of every constant below. */
export const TAX_YEAR = 2026;

/** Federal brackets on taxable income: [upper bound, rate]. Separate tables, not derived. */
export const BRACKETS: Record<Household['filingStatus'], [number, number][]> = {
  // SC-09: married filing jointly, 2026
  joint: [[24_800, 0.1], [100_800, 0.12], [211_400, 0.22], [403_550, 0.24], [512_450, 0.32], [768_700, 0.35], [Infinity, 0.37]],
  // SC-10: single, 2026
  single: [[12_400, 0.1], [50_400, 0.12], [105_700, 0.22], [201_775, 0.24], [256_225, 0.32], [640_600, 0.35], [Infinity, 0.37]],
};
/** SC-12: standard deduction, 2026. */
export const STANDARD_DEDUCTION: Record<Household['filingStatus'], number> = { joint: 32_200, single: 16_100 };
/** SC-20: employee Social Security rate and wage base, 2026, per person. */
export const SS_RATE = 0.062;
export const SS_WAGE_BASE = 184_500;
/** SC-21: employee Medicare rate, no wage base. */
export const MEDICARE_RATE = 0.0145;
/** SC-23: Additional Medicare Tax withheld on each person's wages above $200,000 in the year. */
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_WITHHOLDING_THRESHOLD = 200_000;

function federal(taxable: number, status: Household['filingStatus']): number {
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of BRACKETS[status]) {
    if (taxable > lower) tax += (Math.min(taxable, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

/**
 * FICA of one person's wages for the year, as withheld (SC-20, SC-21, SC-23). Withholding view:
 * one employer per person [ASSUMPTION: A-56], so the $200,000 test and the wage base read the
 * person's wages. The amount owed on the return by filing status (SC-24) and the two-employer
 * credit (SC-25) are left out [ASSUMPTION: A-53].
 */
function fica(wages: number): number {
  return Math.min(wages, SS_WAGE_BASE) * SS_RATE
    + wages * MEDICARE_RATE
    + Math.max(0, wages - ADDITIONAL_MEDICARE_WITHHOLDING_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
}

export interface TaxByLevel { federal: Money; fica: Money; state: Money }

/** Household tax for a year, with wages per person (salary plus any vest income). */
export function householdTax(h: Household, wages: Record<PersonId, Money>): TaxByLevel {
  const total = Object.values(wages).reduce((a, b) => a + b, 0);
  const taxable = Math.max(0, total - STANDARD_DEDUCTION[h.filingStatus]);
  return {
    federal: federal(taxable, h.filingStatus),
    fica: Object.values(wages).reduce((s, w) => s + fica(w), 0),
    state: taxable * h.stateTaxRate, // SIMULATED flat state rate
  };
}

/** SC-14: supplemental withholding, 22%, and 37% above $1 million in the year. */
export const SUPPLEMENTAL = { rate: 0.22, highRate: 0.37, threshold: 1_000_000 };
