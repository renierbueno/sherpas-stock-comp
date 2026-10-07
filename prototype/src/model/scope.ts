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
  'AC-B-33': 'tranches delivered earlier this year (common with quarterly plans, not an edge case): value at delivery not built in the prototype',
  'AC-C-31': 'tranches delivered earlier this year: keeping their tax in the year\'s figures until December not built in the prototype',
  'AC-C-32': 'tranches delivered earlier this year: valuing them at the value at delivery not built in the prototype',
  'AC-E-22': 'proposals from the questionnaire chat or an "Other income" row need the platform\'s context mechanism (A-27), which the prototype does not have',
  'AC-E-23': 'alert for a chat or "Other income" proposal: depends on AC-E-22',
  'AC-E-24': 'confirming or rejecting a chat or "Other income" proposal: depends on AC-E-22',
  'AC-F-15': 'the prototype has no opportunity documents page; uploads in Data & Assumptions and in the client\'s documents step use the same processing (AC-F-02, AC-F-13)',
  'AC-G-17': 'the prototype does not generate the platform\'s written paragraphs; the rule stays in the spec (D-097)',
  'AC-G-18': 'pilot control in Sherpas\' back office; the prototype\'s firm switch stands in for it',
  'AC-G-19': 'pilot-stop notice to advisors, shown only when Sherpas turns the setting off after use',
  'EV-G-01': 'share event: instrumentation for the pilot metrics, not shown in the prototype',
};
