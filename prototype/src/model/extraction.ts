// F-F · Upload a plan statement and confirm the extracted tranches (docs/spec/F-F_upload-plan-statement.md).
// Extraction is SIMULATED (D-063): each sample document returns a fixed result. How the platform
// reads documents, and how well, is riskiest assumption 1.
import type { EventLog } from './events';
import { PSU_DEFAULT_RANGE, statusOf } from './grants';
import type { Grant, Household } from './types';

type Found = Omit<Grant, 'id' | 'category' | 'subType' | 'source' | 'proposed'>;

/** SIMULATED sample documents and what "extraction" finds in each. */
export const SAMPLE_DOCUMENTS: Record<string, (h: Household) => Found[]> = {
  'Halden plan statement (SIMULATED).pdf': (h) => [{
    ownerId: h.people[0].id, type: 'RSU', employerId: 'halden', grantDate: '2025-03-01', units: 4_000,
    tranches: [
      { id: 'x1', date: '2026-03-01', units: 1_000, sharesKept: 620 },
      { id: 'x2', date: '2026-06-01', units: 250, sharesKept: 155 },
      { id: 'x3', date: '2026-09-01', units: 250, sharesKept: 155 },
      ...Array.from({ length: 10 }, (_, i) => ({ id: `x${i + 4}`, date: ['2026-12-01', '2027-03-01', '2027-06-01', '2027-09-01', '2027-12-01', '2028-03-01', '2028-06-01', '2028-09-01', '2028-12-01', '2029-03-01'][i], units: 250 })),
    ],
  }],
  'Brokerage statement with three grants (SIMULATED).pdf': (h) => [
    { ownerId: h.people[0].id, type: 'RSU', employerId: 'halden', grantDate: '2024-03-01', units: 1_200, tranches: [{ id: 'a1', date: '2027-03-01', units: 1_200 }] },
    // EC-C-12, AC-F-16: the statement shows a release date after the vest date, in the next year.
    { ownerId: h.people[0].id, type: 'RSU', employerId: 'halden', grantDate: '2026-03-01', units: 800, tranches: [{ id: 'b1', date: '2026-12-15', deliveryDate: '2027-01-05', units: 800 }] },
    { ownerId: h.people[0].id, type: 'PSU', employerId: 'halden', grantDate: '2026-03-01', units: 600, psu: { condition: 'Revenue growth target', periodEnd: '2028-12-31', ...PSU_DEFAULT_RANGE }, tranches: [{ id: 'c1', date: '2029-02-15', units: 600 }] },
  ],
  'Unreadable scan (SIMULATED).pdf': () => [],
};

export const NO_GRANTS = 'No grants found in this document. Enter them by hand.'; // AC-F-08
export const proposedLabel = (doc: string) => `Extracted from ${doc}, not confirmed`; // AC-F-12

/**
 * AC-F-02, AC-F-13, EV-F-01: one proposed grant per grant found; nothing reaches the figures.
 * AC-F-16: a release date on the statement is proposed as the delivery date; otherwise the vest date is.
 */
export function uploadStatement(h: Household, document: string, by: 'advisor' | 'client', log?: EventLog): { household: Household; found: number } {
  const found = (SAMPLE_DOCUMENTS[document] ?? (() => []))(h);
  log?.record('EV-F-01', h.id, { document, by, grantsFound: found.length });
  // Ids stay unique across several uploads on the same analysis date.
  const taken = new Set(h.grants.map((g) => g.id));
  let n = 0;
  const nextId = () => { while (taken.has(`p-${Date.parse(h.analysisDate)}-${n}`)) n++; taken.add(`p-${Date.parse(h.analysisDate)}-${n}`); return `p-${Date.parse(h.analysisDate)}-${n}`; };
  const proposed: Grant[] = found.map((f) => ({ ...f, id: nextId(), category: 'stockCompensation', subType: 'RSU', source: 'extraction', proposed: { document } }));
  return { household: { ...h, grants: [...h.grants, ...proposed] }, found: found.length };
}

/** AC-F-09: an existing grant with the same employer, grant date and type (D-115). */
export function duplicateOf(h: Household, proposed: Grant): Grant | undefined {
  return h.grants.find((g) => !g.proposed && g.id !== proposed.id && g.employerId === proposed.employerId && g.grantDate === proposed.grantDate && g.type === proposed.type);
}

const FIELDS = ['ownerId', 'type', 'employerId', 'grantDate', 'units'] as const;

/**
 * AC-F-06, EV-F-02: confirm a proposed grant, with the advisor's edits (AC-F-05). With a
 * duplicate (AC-F-09), keep decides which one stays.
 */
export function confirmProposed(h: Household, edited: Grant, log?: EventLog, keep: 'proposed' | 'existing' = 'proposed'): Household {
  const original = h.grants.find((g) => g.id === edited.id);
  if (!original?.proposed) return h;
  const dup = duplicateOf(h, original);
  if (dup && keep === 'existing') return { ...h, grants: h.grants.filter((g) => g.id !== edited.id) };
  const changed = FIELDS.filter((f) => original[f] !== edited[f]).length
    + edited.tranches.filter((t) => { const o = original.tranches.find((x) => x.id === t.id); return !o || o.date !== t.date || o.units !== t.units; }).length;
  log?.record('EV-F-02', h.id, { grant: edited.id, fieldsChanged: changed });
  const confirmed: Grant = { ...edited, proposed: undefined, id: dup ? dup.id : edited.id };
  if (!dup) return completePending(h, edited.id, confirmed, log);
  return { ...h, grants: [...h.grants.filter((g) => g.id !== edited.id && g.id !== dup?.id), confirmed] };
}

/**
 * AC-F-14, EV-B-02: a confirmed proposal with the same owner and employer as a grant pending
 * detail completes that grant instead of adding a second one, keeping the client's estimate and
 * the date it was reported. Without such a grant, the proposal is added as a new grant.
 */
function completePending(h: Household, proposalId: string, confirmed: Grant, log?: EventLog): Household {
  const pending = h.grants.find((g) => !g.proposed && g.ownerId === confirmed.ownerId && g.employerId === confirmed.employerId
    && statusOf(h, g) === 'pending detail');
  if (!pending) return { ...h, grants: [...h.grants.filter((g) => g.id !== proposalId), confirmed] };
  const done: Grant = { ...confirmed, id: pending.id, clientEstimate: pending.clientEstimate, reportedOn: pending.reportedOn, completedOn: h.analysisDate };
  if (pending.reportedOn) log?.record('EV-B-02', h.id, { grant: pending.id, daysSinceReported: (Date.parse(h.analysisDate) - Date.parse(pending.reportedOn)) / 86_400_000 });
  return { ...h, grants: h.grants.filter((g) => g.id !== proposalId).map((g) => (g.id === pending.id ? done : g)) };
}

/**
 * AC-F-18: "Confirm all" confirms every proposed grant of one statement as AC-F-06 does. A
 * proposal with a duplicate (AC-F-09) is left for the advisor to choose which to keep.
 */
export function confirmAll(h: Household, document: string, log?: EventLog): Household {
  // Duplicates are judged against the grants before this confirmation: grants of one statement
  // are never duplicates of each other.
  const ready = h.grants.filter((g) => g.proposed?.document === document && !duplicateOf(h, g));
  return ready.reduce((acc, g) => {
    log?.record('EV-F-02', h.id, { grant: g.id, fieldsChanged: 0 });
    return completePending(acc, g.id, { ...g, proposed: undefined }, log);
  }, h);
}

/** AC-F-07, EV-F-03: reject discards the proposal and changes nothing else. */
export function rejectProposed(h: Household, id: string, log?: EventLog): Household {
  log?.record('EV-F-03', h.id, { grant: id });
  return { ...h, grants: h.grants.filter((g) => g.id !== id) };
}
