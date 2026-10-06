# Check F6.1 · Touchpoints line by line, first release, plan for the rest of F6

2026-10-06, run after the step was committed (`e4ef835`, `dc1a97d`; work since `d62fabb`). Changed: `03_decision_log.md` (D-073 to D-081), `06_direction.md` (F3-13, first release cut), `07`, `08`, `09`, `10_flow_review.md` (touchpoints, SF-21, GAP-39 to GAP-47), specs `00_index`, F-B, F-D, F-E, F-F, the check and flow-review skills, `prototype/scripts/consistency.ts`, `package.json`, `.gitignore`.

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Secrets and confidentiality | PASS | `git diff --name-only d62fabb dc1a97d`: no path under `captures/` or `inputs/`, no rtf, har or image; pre-commit hook on the current staged set: exit 0; `prototype/docs/` ignored (`.gitignore`) |
| 2a | Sources of the touchpoints | PASS | Every section of "Touchpoints, line by line" opens with its source: "Seen 2026-10-03, `captures/client/…`" or, for the advisor, "Not seen: the exercise has no advisor login [brief, section 4]. Steps rebuilt from…" (`10_flow_review.md` line 345) |
| 2b | Sources in the decisions and specs | PASS | D-075 `[FACT: captures/client/01-financial-health]`; D-079 and AC-F-15 `[FACT: questionnaire_map, 2026-10-05]`; D-080 `[web: privatebankerinternational.com]`, also in `01_context.md` line 31; facts left unverified in private notes (Cerulli, RightExpress) appear in no committed file (grep: no match) |
| 3 | Simulated is labelled | PASS | No new persona, interview or data set |
| 4 | Decisions logged | PASS | D-073 to D-081 each with what, options, why, date and "Confirmed by: Renier" |
| 5 | Open questions | PASS | No new unknown left untracked: open gaps GAP-36 to GAP-41, GAP-44, GAP-45, GAP-47 are in `10_flow_review.md` with status "Open"; the assumption added by D-080 ("who asked") was written in F6.2 |
| 6a | flow-review 1b: every touchpoint has a row, a state and a source | PASS | 102 touchpoint lines; each has a state (no change, can change, changed, new, Next, not defined yet) and an ID `TP-SFNN-nn`; SF-07 ("We should look into") is walked inside each section (TP-SF02-07, TP-SF03-06, TP-SF04-03, TP-SF05-05) |
| 6b | flow-review 5: every affected touchpoint has a category | FAIL, fixed | 54 lines change something; 53 carry A, B or Next; TP-SF08-06 ("View more > Key takeaways > can change", line 308) has none. The prototype does not show key takeaways (`grep -ri takeaway prototype/src`: no match), so it is B |
| 6c | flow-review: dry run shown | PASS | "Financial health > Summary (dry run, 2026-10-06)" shown to Renier before the rest (D-073) |
| 6d | flow-review: source of truth | PASS | `SKILL.md` output section: "This file is the source of truth; the Miro board mirrors it and never leads" |
| 6e | Consistency (`npm run check`) | PASS | At `dc1a97d`: consistency 6 PASS, 185 tests, build, trace 163 · 156 tested · 3 spec only · 4 pending (AC-D-11, AC-G-17, AC-F-14, AC-F-15). Today, with F6.2 on top: same, 164 · 156 · 3 · 5 (EV-G-01 added) |
| 6f | Known stale text left for F6.4 | NOTED | Spec headers "Release: after F-B", Next markers only in the index, AC-C-01 and AC-E-11 with projection text: listed as P1 to P15 for the spec pass (D-081, D-087), not failures of this step |
| 7 | Harness (check and flow-review skills changed) | PASS | Y1 two edits to existing skills, no new skill · Y2 step 1b added when the section-level review missed touchpoints (D-073) · Y3 `CLAUDE.md` 35 lines, unchanged · Y4 descriptions unchanged · Y5 under 500 lines · Y6 categories defined once, in flow-review · Y7 captures read per section · Y8 Renier's OK per step · Y9 consistency as a script run by `npm run check` · Y10 dry run on Summary · Y11 owned and edited · Y12 this table |
| 8 | Git | PASS | `git log --oneline \| grep -i wip`: empty; the step is in two commits with a "why" message |

Fix, same day: TP-SF08-06 now carries category B (`10_flow_review.md` line 308); `npm run check` passes.

Ready for gate.
