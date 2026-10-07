// Criteria not built in the prototype, each with its reason (D-063). The trace script prints
// them as "spec only". Anything not here and without a test is "pending".
export const SPEC_ONLY: Record<string, string> = {
  'AC-B-15': 'dropped in the spec (D-050)',
  'AC-B-25': 'absence of reminders: nothing to build or show (manual)',
  'AC-G-06': 'wording review, manual; every new line is copied from the spec',
  'AC-B-29': 'dropped in the spec (D-094)',
  'AC-E-05': 'dropped in the spec (D-094)',
  'AC-E-11': 'dropped in the spec (D-094)',
  'AC-E-13': 'dropped in the spec (D-094)',
};
