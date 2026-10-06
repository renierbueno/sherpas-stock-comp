# Check F6.3 · Open decisions and gaps

2026-10-06. Work since `4824fe8`: D-089 to D-097; `06_direction.md` F3-14 and F3-15; `10_flow_review.md` (GAP-39, GAP-40, GAP-41, GAP-44, GAP-45, GAP-47 resolved; touchpoints TP-SF08-13, TP-SF09-02, TP-SF13-01, TP-SF15-07, TP-SF15-11, TP-SF15-14, TP-SF15-17, TP-SF17-04, TP-SF17-08, TP-SF17-13 brought in step); `02_open_questions.md` (chat assumption); `01_context.md` (blog fact).

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Secrets and confidentiality | PASS | `git add -A --dry-run`: 5 files under `docs/`, none under `captures/` or `inputs/`; pre-commit hook on the staged set: exit 0; `git ls-files` lists no rtf, har or image outside `prototype/` |
| 2a | Sherpas facts sourced | PASS | Blog quotes in `01_context.md` checked against the page on 2026-10-06 ("take weeks or months to send documents", "stuck gathering, organizing, and entering"); "the end client's view of a shared analysis" `[FACT: platform_map]`; the opportunity's context `[FACT: questionnaire_map]`; the Social Security estimate `[FACT: captures/questionnaire/03-fresh/notes.md]` (tag made exact during this check) |
| 2b | US facts point at research | PASS | Vests as wages for withholding and FICA: R-001 (D-094); withholding: R-008 not newly cited |
| 2c | Unknowns tagged | PASS | Chat feeding the context: `[ASSUMPTION]` in `10_flow_review.md` and a row in `02_open_questions.md`; Social Security reading low: `[INFERENCE]` in D-094 |
| 3 | Simulated is labelled | PASS | No new persona, interview or data set |
| 4 | Decisions logged | PASS | D-089 to D-097, each with what, options, why, date, "Confirmed by: Renier"; F3-14 and F3-15 in `06_direction.md` marked "Chosen" with their D-NNN |
| 5 | Open questions | PASS | The one new unknown (does the chat feed the context) is in `02_open_questions.md` with its fallback (D-093) |
| 6a | flow-review Resolve: every gap of the step has a resolution and a status | FAIL, fixed | GAP-39, 40, 41, 44, 45, 47: "Resolved" with their decision. GAP-36, 37, 38 are marked "Open, prototype rework in step F6.5 (D-081)", but D-081 lists them in F6.3; the move to F6.5 (Renier, 2026-10-06) is not logged |
| 6b | flow-review: touchpoints in step with the gaps | PASS | `npm run consistency` "touchpoints unique and in step with their gaps": PASS; it failed once during the step (TP-SF08-13 still "not defined yet" after GAP-44 closed) and the line was updated |
| 6c | decide: three options and a recommendation | PASS | F3-14 and F3-15 in the F3 template (options, gains, costs, evidence, recommendation, chosen); D-092 to D-097 list the options not taken |
| 6d | decide: checked against D-023 | PASS | F3-14 and F3-15: "D-023: holds in all three"; D-094: the income question means the same for households without stock pay |
| 6e | Consistency (`npm run check`) | PASS | Consistency: all checks pass (cleanup warnings for F6.4 by D-087); tests 185 passed; build passed; trace 164 criteria and events, 156 tested, 3 spec only, 5 pending |
| 6f | Known follow-ups for F6.4 | NOTED | The spec still holds AC-B-29, AC-E-05, AC-E-11, AC-E-13, EC-E-04 (removed by D-094), the old AC-E-17 and AC-E-18 wording (D-090, D-092), AC-G-17 scope (D-097); the F3-14 entry describes the income default that D-094 removed. All written in step F6.4 (D-081) |
| 7 | Harness | N/A | No skill changed in the step |
| 8 | Git | PASS | `git log --oneline \| grep -i wip`: empty; the step is ready for one commit |

Fix, same day: D-098 moves GAP-36 to GAP-38 to step F6.5; their status reads "Open, prototype rework in step F6.5 (D-098)"; `npm run check` passes.

Ready for gate.
