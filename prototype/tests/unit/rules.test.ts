// The simulator's tax constants equal the Value column of docs/12_stock_comp_rules.md (D-100).
// Reads the table, not a copy: a rule changed in the table and not in the code fails here.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ADDITIONAL_MEDICARE_RATE, ADDITIONAL_MEDICARE_WITHHOLDING_THRESHOLD, BRACKETS, MEDICARE_RATE,
  SS_RATE, SS_WAGE_BASE, STANDARD_DEDUCTION, SUPPLEMENTAL, TAX_YEAR,
} from '../../src/model/tax';

const table = readFileSync(join(import.meta.dirname, '..', '..', '..', 'docs', '12_stock_comp_rules.md'), 'utf8');

/** key=value pairs of every SC row, with the row they come from. */
const values = new Map<string, { value: number; row: string }>();
for (const line of table.split('\n').filter((l) => /^\| SC-\d{2} \|/.test(l))) {
  const cells = line.split('|').map((c) => c.trim());
  const row = cells[1];
  const cell = cells[cells.length - 2];
  if (cell === '-') continue;
  for (const pair of cell.split(';').map((p) => p.trim()).filter(Boolean)) {
    const [key, raw] = pair.split('=').map((p) => p.trim());
    if (values.has(key)) throw new Error(`${key} defined twice (${values.get(key)!.row}, ${row})`);
    values.set(key, { value: Number(raw), row });
  }
}

/** The same keys, read from the code. */
const code = new Map<string, number>([
  ['tax_year', TAX_YEAR],
  ['joint_deduction', STANDARD_DEDUCTION.joint],
  ['single_deduction', STANDARD_DEDUCTION.single],
  ['ss_rate', SS_RATE],
  ['ss_wage_base', SS_WAGE_BASE],
  ['medicare_rate', MEDICARE_RATE],
  ['additional_medicare_rate', ADDITIONAL_MEDICARE_RATE],
  ['additional_medicare_withholding_threshold', ADDITIONAL_MEDICARE_WITHHOLDING_THRESHOLD],
  ['supplemental_rate', SUPPLEMENTAL.rate],
  ['supplemental_high_rate', SUPPLEMENTAL.highRate],
  ['supplemental_threshold', SUPPLEMENTAL.threshold],
]);
for (const status of ['joint', 'single'] as const) {
  for (const [upper, rate] of BRACKETS[status]) {
    if (upper === Infinity) code.set(`${status}_top_rate`, rate);
    else code.set(`${status}_top_${Math.round(rate * 100)}`, upper);
  }
}

describe('Rules table (docs/12_stock_comp_rules.md) against the simulator constants', () => {
  it('every value in the table is a number', () => {
    expect([...values].filter(([, v]) => Number.isNaN(v.value)).map(([k, v]) => `${v.row} ${k}`)).toEqual([]);
  });

  it('every value in the table equals the constant in src/model/tax.ts', () => {
    const wrong = [...values].filter(([k, v]) => code.get(k) !== v.value).map(([k, v]) => `${v.row} ${k}: table ${v.value}, code ${code.get(k)}`);
    expect(wrong).toEqual([]);
  });

  it('every constant in src/model/tax.ts has its value in the table', () => {
    expect([...code.keys()].filter((k) => !values.has(k))).toEqual([]);
  });

  it('brackets rise and rates rise, per filing status', () => {
    for (const status of ['joint', 'single'] as const) {
      const b = BRACKETS[status];
      for (let i = 1; i < b.length; i++) {
        expect(b[i][0]).toBeGreaterThan(b[i - 1][0]);
        expect(b[i][1]).toBeGreaterThan(b[i - 1][1]);
      }
    }
  });
});
