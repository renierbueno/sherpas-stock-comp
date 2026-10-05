# Check F5 · Flow review (pass 1)

Date: 2026-10-05. Run with `/check F5`. Skills used in the phase: `flow-review` (new). Step 2 audited line by line over `git diff -U0` of every changed doc plus the two new files.

| # | Check | Result | Evidence |
|---|---|---|---|
| 1a | Pre-commit hook on the full staged set | PASS | `git add -A && .githooks/pre-commit` → `hook exit 0`; staging reset |
| 1b | Nothing under `captures/`, `inputs/` or `private/` would be committed | PASS | `git diff --cached --name-only` filtered on those folders → "no captures/inputs/private staged"; `git check-ignore` on the new notes → ignored |
| 1c | No images or captures tracked outside `prototype/` | PASS | `git ls-files \| grep -iE '\.(rtf\|har\|png\|jpe?g)$'` → empty |
| 1d | No platform IDs, API paths, tokens or code names in changed docs | PASS | grep for the questionnaire and opportunity IDs, the link token, `api.`, `/v1/`, `eyJ` and the type-list code names over changed files → no hits |
| 1e | Nothing from the call or the JD in changed files | PASS | grep for the hiring manager, the call, the JD, the copilot → only D-020 and D-034 lines, unchanged since F3 |
| 2a | Sherpas facts use an allowed source tag | PASS | Sherpas' 2026-10-05 reply added to `00_brief.md` §4 as a dated excerpt in the original language (link redacted, nothing else); the four lines retagged `[brief, §4]` (`01_context.md`, `02_open_questions.md` ×2, D-059); `grep 'Sherpas, email' docs` → none outside this report. First run: FAIL |
| 2b | Each `[FACT: captures/…]` points at evidence that exists | PASS | `captures/questionnaire/03-fresh/notes.md` saved (git-ignored, 0 tokens) next to `shots/` (23 screenshots); it holds the type lists, income storage and frequencies, the Social Security call, the upload context, instrument type and last price, account sub-types, when the app saves, and the test actions. Every claim tagged `03-fresh` or `questionnaire_map, 2026-10-05` checked against it or the screenshots. First run: FAIL (notes could not be written) |
| 2c | US facts point at an R-NNN | PASS | D-058 "a PSU is taxed and settled like an RSU (R-002)": R-002 "Changes" line groups RSU and PSU, settlement converts them to taxable income; 02 assumption cites R-015, R-016 |
| 2d | Everything else tagged as inference or assumption | PASS | Unknowns carry `[ASSUMPTION: …]`: `00_index` shared data, AC-E-21, EC-E-07, D-058 What; the 15 rows of "Assumptions we work on" are assumptions by construction. Decision "Why" lines argue from tagged facts, as in earlier phases |
| 3 | Simulated is labelled | PASS | `10_flow_review.md`: "Households in the walk-throughs are SIMULATED" (intro) and column header "Household (SIMULATED)"; no new data set |
| 4 | Decisions logged | PASS | D-054 to D-060, each with What, Why, Date, "Confirmed by: Renier" |
| 5 | Open questions | PASS | `02_open_questions.md`: "Assumptions we work on (D-059)", 15 rows with fallback; answered items moved to "Answered" |
| 6a | flow-review: every surface × every new element has a cell or a reason | PASS | `10_flow_review.md` impact map: 20 surfaces × 8 elements; each `·` has its reason in the last column |
| 6b | flow-review: every new field has its full path | PASS | Data paths table: 21 fields, entered → stored → read → shown → exported, including the income question in the grant editor (AC-B-29) |
| 6c | flow-review: every walk-through step names a requirement | PASS | Client walk-throughs updated to the chip (AC-E-01 to AC-E-03, AC-E-19); steps naming a gap resolve through the gaps table to an AC |
| 6d | flow-review: every gap resolved, none open | PASS | GAP-01 to GAP-27 "Resolved" with decision and AC; `grep -c '\| Open \|'` → 0; no duplicate AC IDs and no reference to an undefined AC across `docs/spec/`, `10_flow_review.md`, `03_decision_log.md` |
| 6e | flow-review: dry run shown to Renier before the rest | PASS | Dry run section kept ("reviewed 2026-10-05"); Renier's F5 kick-off names `docs/10_flow_review.md (dry run)` as an input he had read |
| 7 | Harness Y1 to Y12 (skill added: `flow-review`) | PASS | Y1 one skill, 37 lines · Y2 written just before F5 (D-002, D-048) · Y3 `CLAUDE.md` 35 lines, unchanged · Y4 description excludes `spec` and `check` · Y5 under 500 lines, same vocabulary as `spec` · Y6 no duplicated content · Y7 inputs listed per pass · Y8 ends at `/check F5` and Renier's gate · Y9 confidentiality enforced by the pre-commit hook · Y10 dry run on one element first · Y11 owned in the repo · Y12 this table |
| 8 | Git | PASS | `git log --oneline \| grep -i wip` → empty; the phase's work is uncommitted, ready for one commit |

Ready for gate.
