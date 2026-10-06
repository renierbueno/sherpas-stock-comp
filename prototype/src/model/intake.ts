// F-E · The client reports stock pay (docs/spec/F-E_client-reports-stock-pay.md).
import type { EventLog } from './events';
import { heldPositions } from './exposure';
import { statusOf } from './grants';
import type { ClientEstimate, Firm, Household, IncomeAnswer, IsoDate, PersonId } from './types';

/** One "Stock compensation" chip row (AC-E-03 to AC-E-05). Only the employer is required (AC-E-04). */
export interface StockPayRow {
  id: string;
  ownerId: PersonId;
  employer: string;
  ticker?: string;
  type?: ClientEstimate['type'];
  unvestedValue?: number;
  frequency?: ClientEstimate['frequency'];
  incomeIncludesVests?: IncomeAnswer;
}

export const HELPER_LINE = 'Paid partly in company stock? Add it below as Stock compensation.'; // AC-E-02
export const INCOME_QUESTION = 'Does your employment income above include stock that vested this year?'; // AC-E-05
export const UPLOAD_PROMPT = 'Upload your plan statement if you have it'; // AC-E-19

/** AC-E-04: the employer is the only required field. */
export function rowErrors(row: StockPayRow): string[] {
  return row.employer.trim() ? [] : ['Employer is required'];
}

export function recordRowChange(h: Household, firm: Firm, action: 'added' | 'removed', log?: EventLog): void {
  log?.record('EV-E-01', h.id, { firm: firm.id, action }); // EV-E-01
}

/**
 * AC-E-07, AC-E-20, EV-E-02: on submit, each row becomes a grant pending detail, source
 * questionnaire; nothing blocks the submit. Without rows the household is unchanged (AC-E-06).
 */
export function submitQuestionnaire(h: Household, rows: StockPayRow[], firm: Firm, submittedOn: IsoDate, log?: EventLog): Household {
  log?.record('EV-E-02', h.id, { stockPay: rows.length > 0 ? 'yes' : 'no' });
  if (!firm.stockComp || rows.length === 0) return h;
  let next = h;
  for (const r of rows) {
    if (rowErrors(r).length) continue;
    const id = r.employer.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const known = next.employers.find((e) => e.id === id || e.name.toLowerCase() === r.employer.trim().toLowerCase());
    const employer = known ?? { id, name: r.employer.trim(), listed: !!r.ticker, ticker: r.ticker, ...(r.ticker ? {} : { listedUnknown: true }) };
    next = {
      ...next,
      employers: known ? next.employers : [...next.employers, employer],
      incomeIncludesVests: { ...next.incomeIncludesVests, [r.ownerId]: r.incomeIncludesVests ?? next.incomeIncludesVests[r.ownerId] },
      grants: [...next.grants, {
        id: `q-${r.id}`, category: 'stockCompensation', subType: 'RSU', ownerId: r.ownerId, type: r.type === 'PSU' ? 'PSU' : 'RSU',
        employerId: employer.id, tranches: [], source: 'questionnaire', reportedOn: submittedOn,
        clientEstimate: { type: r.type, unvestedValue: r.unvestedValue, frequency: r.frequency },
      }],
    };
  }
  return next;
}

export const PENDING_ALERT = 'Stock pay: detail pending'; // AC-E-08

/** AC-E-08, AC-E-09: opportunity alerts. */
export function opportunityAlerts(h: Household, firm: Firm): string[] {
  if (!firm.stockComp) return [];
  return h.grants.some((g) => statusOf(h, g) === 'pending detail') ? [PENDING_ALERT] : [];
}

/** EV-E-03: record when the alert is raised or removed between two states of a household. */
export function recordAlertChange(before: Household, after: Household, firm: Firm, at: IsoDate, log?: EventLog): void {
  const a = opportunityAlerts(before, firm).includes(PENDING_ALERT);
  const b = opportunityAlerts(after, firm).includes(PENDING_ALERT);
  if (a !== b) log?.record('EV-E-03', after.id, { change: b ? 'raised' : 'removed', at });
}

/**
 * AC-E-17 (D-070): one suggestion per employer the client gave, naming every held, unflagged
 * position with its ticker. Flagging stays one position at a time, after the advisor confirms (AC-E-18).
 */
export function flagSuggestions(h: Household, firm: Firm): { employerId: string; positionIds: string[]; label: string }[] {
  if (!firm.stockComp) return [];
  const out: { employerId: string; positionIds: string[]; label: string }[] = [];
  for (const e of h.employers) {
    if (!e.ticker || !h.grants.some((g) => g.employerId === e.id)) continue;
    const held = heldPositions(h).filter(({ position }) => position.ticker === e.ticker && !h.flags.some((f) => f.positionId === position.id));
    if (held.length === 0) continue;
    const accounts = [...new Set(held.map(({ account }) => account.name))];
    const where = accounts.length === 1 ? accounts[0] : `${accounts.slice(0, -1).join(', ')} and ${accounts[accounts.length - 1]}`;
    out.push({ employerId: e.id, positionIds: held.map(({ position }) => position.id), label: `${e.name} (${e.ticker}) is held in ${where}. Flag as employer stock?` });
  }
  return out;
}
