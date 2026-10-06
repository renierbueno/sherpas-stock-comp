// Editing new lines before sharing, sharing, and the manual score adjustment (AC-G-07, AC-G-10,
// EV-A-03, EV-A-04, EV-D-01). Edits are kept per line ID; a deleted line is null.
import type { EventLog } from './events';
import { employerExposures } from './exposure';
import type { ReportLine } from './lines';
import type { Firm, Household } from './types';

export type LineEdits = Record<string, string | null>;

/** The text every shared surface shows: the advisor's edit, or nothing if deleted (AC-G-07, AC-G-10). */
export function applyEdits(lines: ReportLine[], edits: LineEdits): ReportLine[] {
  return lines.flatMap((l) => (l.id in edits ? (edits[l.id] === null ? [] : [{ ...l, text: edits[l.id] as string }]) : [l]));
}

/** EV-A-04, EV-D-01: on sharing, whether any F-A or F-D line was edited or deleted. */
export function shareAnalysis(h: Household, lines: ReportLine[], edits: LineEdits, log?: EventLog): void {
  for (const [event, prefix] of [['EV-A-04', 'AC-A-'], ['EV-D-01', 'AC-D-']] as const) {
    const ids = lines.filter((l) => l.ac.startsWith(prefix) && l.audience === 'shared').map((l) => l.id);
    if (ids.length === 0) continue;
    log?.record(event, h.id, { edited: ids.some((id) => id in edits) });
  }
}

/** EV-A-03: a manual adjustment on a household with employer exposure carries a "stock pay" tag. */
export function adjustScore(h: Household, points: number, reason: string, firm: Firm, log?: EventLog): Household {
  if (employerExposures(h, firm).length > 0) log?.record('EV-A-03', h.id, { points, reason, tag: 'stock pay' });
  return { ...h, manualAdjustment: { points, reason } };
}
