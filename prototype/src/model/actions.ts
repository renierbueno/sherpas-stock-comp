// Advisor edits on a household. Pure: each returns a new household. Saving one of them
// reprocesses the analysis (AC-G-12); the warning about a manual adjustment is shown first.
import type { EventLog } from './events';
import type { EmployerFlag, Firm, Household } from './types';

export function setFlag(h: Household, flag: EmployerFlag, firm: Firm, log?: EventLog): Household {
  if (!firm.stockComp) throw new Error('Stock compensation is not enabled for this firm (AC-A-01).');
  const employer = h.employers.find((e) => e.id === flag.employerId);
  log?.record('EV-A-01', h.id, { firm: firm.id, action: 'flag', issuer: flag.employerId, listed: employer?.listed ?? false });
  return { ...h, flags: [...h.flags.filter((f) => f.positionId !== flag.positionId), flag] };
}

export function removeFlag(h: Household, positionId: string, firm: Firm, log?: EventLog): Household {
  const flag = h.flags.find((f) => f.positionId === positionId);
  if (!flag) return h;
  const employer = h.employers.find((e) => e.id === flag.employerId);
  log?.record('EV-A-01', h.id, { firm: firm.id, action: 'unflag', issuer: flag.employerId, listed: employer?.listed ?? false });
  return { ...h, flags: h.flags.filter((f) => f.positionId !== positionId) };
}

/** AC-B-06 / AC-G-12 text, shown before any stock-pay save when an adjustment exists. */
export const ADJUSTMENT_WARNING = 'Saving reprocesses the analysis and replaces your manual score adjustment.';
export const SALARY_CHECK = 'Salary on file should exclude company stock. If it includes stock that vested, edit it.'; // AC-F-17

export function needsAdjustmentWarning(h: Household): boolean {
  return !!h.manualAdjustment;
}

/** Saving reprocesses and replaces the manual adjustment. */
export function afterSave(h: Household): Household {
  return { ...h, manualAdjustment: undefined };
}
