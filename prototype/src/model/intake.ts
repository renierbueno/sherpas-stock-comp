// F-E · The client reports stock compensation (docs/spec/F-E_client-reports-stock-compensation.md).
import type { EventLog } from './events';
import { heldPositions } from './exposure';
import { statusOf } from './grants';
import type { ClientEstimate, Firm, Household, IsoDate, PersonId } from './types';

/** One "Stock compensation" chip row (AC-E-03, AC-E-04). Only the employer is required (AC-E-04). */
export interface StockCompensationRow {
  id: string;
  ownerId: PersonId;
  employer: string;
  ticker?: string;
  type?: ClientEstimate['type'];
  unvestedValue?: number;
  frequency?: ClientEstimate['frequency'];
}

export const INCOME_QUESTION = 'Total annual income before taxes, not counting stock compensation'; // AC-E-02
export const INCOME_QUESTION_TODAY = 'What is your total annual income before taxes?';
export const HELPER_LINE = 'Receive stock compensation? Add it below.'; // AC-E-25

/** AC-E-04: the employer is the only required field. */
export function rowErrors(row: StockCompensationRow): string[] {
  return row.employer.trim() ? [] : ['Employer is required'];
}

export function recordRowChange(h: Household, firm: Firm, action: 'added' | 'removed', log?: EventLog): void {
  log?.record('EV-E-01', h.id, { firm: firm.id, action }); // EV-E-01
}

/**
 * AC-E-07, AC-E-20, EV-E-02: on submit, each row becomes a grant pending detail, source
 * questionnaire; nothing blocks the submit. Without rows the household is unchanged (AC-E-06).
 */
export function submitQuestionnaire(h: Household, rows: StockCompensationRow[], firm: Firm, submittedOn: IsoDate, log?: EventLog): Household {
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
      grants: [...next.grants, {
        id: `q-${r.id}`, category: 'stockCompensation', subType: 'RSU', ownerId: r.ownerId, type: r.type === 'PSU' ? 'PSU' : 'RSU',
        employerId: employer.id, tranches: [], source: 'questionnaire', reportedOn: submittedOn,
        clientEstimate: { type: r.type, unvestedValue: r.unvestedValue, frequency: r.frequency },
      }],
    };
  }
  return next;
}

/** AC-E-16: in the editor of every grant reported from the questionnaire, as the spec words it. */
export const NOT_MODELLED = 'Only RSU and PSU are modelled in this version. If this stock compensation is ESPP or options, delete the grant and flag any shares already held as employer stock.';

export const PENDING_ALERT = 'Stock compensation: detail pending'; // AC-E-08

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

export interface AutoFlag { employerId: string; positionIds: string[]; text: string }

/**
 * AC-E-17, AC-E-18 (D-090, D-092, D-110): when the advisor confirms a grant (saved complete, or a
 * proposal confirmed), every held, unflagged position with the grant's employer ticker is flagged
 * as employer stock, whatever its source, for the grant owner and "current employer: yes". The
 * advisor sees one notice per employer with Undo.
 */
export function flagOnConfirm(before: Household, after: Household, firm: Firm, log?: EventLog): { household: Household; notices: AutoFlag[] } {
  if (!firm.stockComp) return { household: after, notices: [] };
  const confirmed = after.grants.filter((g) => statusOf(after, g) === 'complete'
    && !before.grants.some((b) => b.id === g.id && !b.proposed && statusOf(before, b) === 'complete'));
  let h = after;
  const notices: AutoFlag[] = [];
  for (const g of confirmed) {
    const e = h.employers.find((x) => x.id === g.employerId);
    if (!e?.ticker) continue;
    const held = heldPositions(h).filter(({ position }) => position.ticker === e.ticker && !h.flags.some((f) => f.positionId === position.id));
    if (held.length === 0) continue;
    for (const { position } of held) {
      log?.record('EV-A-01', h.id, { firm: firm.id, action: 'flag', issuer: e.id, listed: e.listed });
      h = { ...h, flags: [...h.flags, { positionId: position.id, employerId: e.id, personId: g.ownerId, currentEmployer: 'yes' }] };
    }
    const accounts = [...new Set(held.map(({ account }) => account.name))];
    const where = accounts.length === 1 ? accounts[0] : `${accounts.slice(0, -1).join(', ')} and ${accounts[accounts.length - 1]}`;
    notices.push({ employerId: e.id, positionIds: held.map(({ position }) => position.id), text: `${e.name} (${e.ticker}) held in ${where} flagged as employer stock.` });
  }
  return { household: h, notices };
}
