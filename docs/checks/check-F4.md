# Check F4 · spec

Date: 2026-10-05 (first run). Skills used in the phase: `spec` (new); `decide` changed (D-046 line); `check` changed (phases F0 to F7, D-053). Files in the F4 set: `CLAUDE.md`, `README.md`, `.claude/skills/spec/SKILL.md` (new), `.claude/skills/decide/SKILL.md`, `.claude/skills/check/SKILL.md`, `docs/02_open_questions.md`, `docs/03_decision_log.md`, `docs/04_glossary.md`, `docs/07_success_criteria.md` (new), `docs/08_release_notes.md` (new), `docs/09_enablement.md` (new), `docs/spec/` (index and F-A to F-F, new), `docs/checks/check-F4.md` (new). Held back for F5 (D-053): `.claude/skills/flow-review/SKILL.md` and `docs/10_flow_review.md` (dry run).

| # | Check | Result | Evidence |
|---|---|---|---|
| 1a | Staged set has no captures, inputs or private files | PASS | `git add -A --dry-run`: only repo docs and skills; `git status --porcelain \| grep -E "captures/\|inputs/\|private/"` returns nothing |
| 1b | Pre-commit hook on the staged set | PASS | `.githooks/pre-commit` exit 0 |
| 1c | No media tracked outside `prototype/` | PASS | `git ls-files \| grep -iE '\.(rtf\|har\|png\|jpe?g)$'` returns nothing |
| 1d | No call or JD context in committed files | PASS | grep for copilot, power user, hiring manager, transcript, `[T mm:ss]`, JD in the F4 set and in D-043 to D-053: no match (three hits are other meanings: "engineering's call", "call the end client", the skill rule itself). Conversion and the learning loop stand on public sources (D-043, wording option 1) |
| 2a | Sherpas facts tagged | PASS | Context sections of F-A to F-F, `07`, `08`, `09` carry `[FACT: …]`, `[brief]` or `[web: URL, accessed 2026-10-05]`; EV-E-02 tagged after the scan; capabilities not seen are `[ASSUMPTION: confirm]` or `[INFERENCE: …]` (extraction of plan statements, the engine taking vest income, conversion tracking, sharing records) |
| 2b | US facts point at an `R-NNN` | PASS | Tax at vest R-001, R-008 (F-C, `08`); PSU range R-002, R-011 (F-B, F-A, `08`); concentration and double exposure R-014 (F-A, `09`); schedules R-009, R-010; 409A R-017; providers R-013; household prevalence R-015 (no data, so no target) |
| 2c | No Sherpas threshold invented | PASS | Curves, thresholds, horizons, transition weights and limits are `P-CONC`, `P-CONC-BASE`, `P-LIQ-HORIZON`, `P-LIQ`, `P-STAGE`, `P-LIMITS` in `spec/00_index.md`, tagged `[ASSUMPTION: confirm]`; R-014's 10% is reference only. Targets in `07` are labelled "proposed", to agree with Sherpas |
| 3 | SIMULATED labelled | PASS | Every example household in the specs and `07` starts with "SIMULATED:" or says "SIMULATED example"; no persona or data set added |
| 4 | Decisions logged | PASS | D-043 to D-053: 11 entries, each with What, Why and "Date … · Confirmed by: Renier". D-047 partly supersedes D-043 and D-053 amends D-048 by new entries; earlier entries unedited |
| 5 | Open questions | PASS | Added to `02`: conversion tracking, sharing and edits recorded, FICA withholding (research), tagging past opportunities, resending the questionnaire; each passed the D-020 check (not answered by the brief, the website or the platform) |
| 6a | Every MVP row of D-041 and D-042 sits in a feature | PASS | Grants and tranches, private equity: F-B · employer flag: F-A · unvested as future income, kept shares and basis: F-B (AC-B-14, AC-B-22), F-A (AC-A-03) · deduplication: F-E (AC-E-05, AC-E-11 to AC-E-13) · client block: F-E · advisor completion: F-B (AC-B-01), F-E (AC-E-15) · upload: F-F · pending and alert: F-E (AC-E-07 to AC-E-10) · state withholding: F-C · three analyses in existing checks: F-A, F-C, F-D |
| 6b | Every requirement is EARS with ID, decision, verify method and Test cell | PASS | 109 `AC-` rows in F-A to F-F plus 9 `AC-G` in the index; AC-B-15 kept as "Dropped" with its reason (D-050), IDs not reused |
| 6c | Every feature has context, story, edge cases, instrumentation, out of scope, engineering section | PASS | Section scan: Y for all seven sections in all six features |
| 6d | D-023 line in every feature touching existing behaviour | PASS | AC-A-11, AC-B-26, AC-C-25, AC-D-09, AC-E-06; G: AC-G-01 to AC-G-03, AC-G-08. F-F adds a new route only; AC-F-03 keeps it out of the figures |
| 6e | Every edge case resolves | PASS | 62 `EC-` rows; awk on the "Covered by" column: 0 empty |
| 6f | Riskiest assumptions have test cards linked to metrics | PASS | `07` test cards 1 to 3, each with test, absolute success, pilot metric (M-02, M-03; M-04; M-06) and "if it fails" |
| 6g | Every `M-NN` has definition, window, target, decision rule and an event | PASS | `07` metrics table: M-01 to M-06 all filled; events EV-A to EV-F listed per metric; M-01 also needs Sherpas' conversion data (`[ASSUMPTION: confirm]`, asked in `02`) |
| 6h | Release notes: scores move; reprocessing replaces a manual adjustment | PASS | `08` "Why a score may change" (releases 1 and 3), "Before you save" (release 2); in product: AC-B-06 |
| 6i | Glossary current | PASS | `04_glossary.md`: 13 terms added (EARS, acceptance criterion, edge case, feature, instrumentation event, parameter, relation test, success metric, guardrail, design partner, pilot readout, proposed grant, firm setting) and withholding gap updated |
| 6j | Dry run shown before the rest | PASS | S11 dry run shown and reviewed; restructured into F-A after D-047 |
| 7 | Harness Y1 to Y12 (skills changed) | PASS | Y1 one skill per step, template-driven · Y2 `spec` written just before use; `flow-review` held back to F5 · Y3 `CLAUDE.md` 35 lines, rules only · Y4 descriptions exclude each other (`spec` not for flow checks; `flow-review` not for writing specs or audits) · Y5 `spec` 105 lines · Y6 EARS rules only in `spec` · Y7 inputs read per step · Y8 fixed chain with gates, renumbered (D-053) · Y9 pre-commit hook exit 0 · Y10 dry run before the rest · Y11 sources credited (product-sdd, jinjin1 in `NOTICE`; Spec Kit cited by URL in D-047) · Y12 this table |
| 8 | Git | PASS | `git log --oneline \| grep -i wip`: none; one commit proposed for the gate |

Open items carried to F5 (not F4 criteria): GAP-01 to GAP-05 in the flow-review dry run, GAP-02 first (do income-based checks read vest income?).

Ready for gate.
