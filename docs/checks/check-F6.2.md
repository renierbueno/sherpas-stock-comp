# Check F6.2 · Options story, storyline, pilot gates

2026-10-06. Work since `dc1a97d`: D-082 to D-088, `06_direction.md` F3-13, `07_success_criteria.md`, `spec/00_index.md` (EV-G-01, M-07, M-08), `docs/11_storyline.md`, `.claude/skills/deliver/`, `prototype/scripts/consistency.ts`; Miro frames "Three options for the first release, and the chosen one" and "Pilot and metrics", board reordered by stage.

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Secrets and confidentiality | PASS | `git add -A --dry-run`: 7 files, none under `captures/` or `inputs/`; pre-commit hook on the staged set: exit 0; `git ls-files` lists no rtf, har or image outside `prototype/` |
| 2a | No invented facts: `06_direction.md` F3-13 | PASS | Every cell cites an assumption (A-xx), a voice (V-xx), a decision, a requirement, `01_context.md` or `[brief]`; effort tagged `[INFERENCE]` |
| 2b | No invented facts: `07_success_criteria.md` | PASS | Pilot size claim tagged `[INFERENCE: pilot size above]`; thresholds stated as proposed; R-015 for reach; `[web: sherpaswealth.com]` kept |
| 2c | No invented facts: `11_storyline.md` | FAIL, fixed | Line under table A: "the brief's route to market is decided with the product": the brief does not mention route to market (`00_brief.md`, grep "market": only "markets" in the score article, line 89) |
| 2d | Consistency between docs | FAIL, fixed | `06_direction.md` "What would change the choice": "the threshold agreed for test card 3 (M-06)", while D-088 sets it in `07` (stop below 1 in 20) |
| 3 | Simulated is labelled | PASS | No new persona, interview or data set; `07` keeps "SIMULATED example" on M-05 and GR-01 |
| 4 | Decisions logged | PASS | D-082 to D-088 in `03_decision_log.md`, each with what, why, date, "Confirmed by: Renier" |
| 5 | Open questions | FAIL, fixed | "Who asked for the feature" as an assumption with its fallback (D-081, F6.2) is not in `02_open_questions.md` (grep "who asked": no match) |
| 6a | decide: three options and a recommendation per decision | FAIL, fixed | D-082, D-083, D-084, D-088 list the options not taken; D-085, D-086, D-087 do not |
| 6b | decide: every option checked against D-023 | PASS | F3-13 gate 2 "Nothing changes for households without stock pay (D-023)": pass for A, B, C |
| 6c | decide: dry run shown | PASS | `deliver` dry run: options frame rewritten and shown to Renier before the board was reordered |
| 6d | D-081 scope of F6.2 | PASS | F3-13 as spine (06), Miro options frame, change maps show D-080 (C2 frame: 3 "NEXT RELEASE" chips; A frame: cost basis and shares kept say "next release"), pilot metrics per release (07, D-088) |
| 6e | Consistency (`npm run check`) | PASS | Consistency: 6 PASS, 4 WARN (54 cleanup warnings, failures from F6.4 by D-087); tests 185 passed in 15 files; build passed; trace 164 criteria and events, 156 tested, 3 spec only, 5 pending (AC-D-11, AC-G-17, AC-F-14, AC-F-15, EV-G-01) |
| 7 | Harness (skill `deliver` added, check script extended) | PASS | Y1 one skill, 41 lines · Y2 written when ordering the board needed it (D-083) · Y3 `CLAUDE.md` 35 lines, unchanged · Y4 description excludes decide, spec, check · Y5 under 500 lines · Y6 orders live in `11_storyline.md`, the skill points to it · Y7 inputs listed per step · Y8 dry run and Renier's OK · Y9 the new rules are checks in `consistency.ts`, not prose · Y10 dry run on the options frame · Y11 Pyramid Principle credited (Minto) · Y12 this table |
| 8 | Git | PASS | `git log --oneline \| grep -i wip`: empty; work ready for one commit |

Fixes, same day, then `npm run check` again (consistency pass with 54 cleanup warnings for F6.4, 185 tests, build, trace 164 · 156 · 3 · 5):
1. 2c: `11_storyline.md` launch line now gives its own reason, tagged `[INFERENCE: from how the stages depend on each other]`.
2. 2d: `06_direction.md` "doing nothing" points at the release 1 stop threshold of `07` (fewer than 1 in 20, D-088).
3. 5: `02_open_questions.md` has "the demand comes from advisors whose clients have stock pay" with its fallback.
4. 6a: D-085, D-086 and D-087 list the options not taken.

Ready for gate.
