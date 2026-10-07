# Check F6.5 · prototype on the amended first release · 2026-10-07

Work since the F6.4 re-check (`751780b`): 11 commits, `8f8c8be` to `7fac435`. Skill that owns the step: `prototype`. Items: the income question without stock compensation, "Confirm all", the automatic flag with Undo, vests in the projection as wages, the delivery date per tranche, the statement completing a reported grant, one name per concept, the explain-itself format and the five guided scenes; the rest of the first release as spec only with its reason.

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Secrets and confidentiality | PASS | `git add -A --dry-run`: 1 file (`.claude/settings.json`), none under `captures/`, `inputs/` or `private/`; pre-commit hook on the staged set: exit 0; `git ls-files` lists no rtf, har, png or jpg outside `prototype/` |
| 2a | Sherpas facts sourced | PASS after fix | D-116 cited `platform_map` for the platform's "stock compensation" category; the fact is in `data_model.md`, "Where stock compensation would fit"; tag corrected in this check. The documents step before Personal information rests on `questionnaire_map.md`, "Seen on screen, 2026-10-05" (D-077, scene 1) |
| 2b | US facts cite research and rules | PASS | No new US rule. The delivery-year and vest-year split cites SC-02 and SC-03 (AC-C-30, commit `d25bd9e`); P-VEST-SAVE is SIMULATED and rests on A-62, not on a rule (D-118) |
| 2c | Assumptions tagged | PASS after fix | D-115 carried an untagged "[ASSUMPTION: confirm]" on how often same-day RSU and PSU awards occur; added as A-63 with its fallback in `02_open_questions.md` and cited in D-115 in this check |
| 3 | Simulated is labelled | PASS | Every household's name starts "SIMULATED ·" (`households.ts`, `base()`); `stories.ts` header and `prototype/README.md` first line say SIMULATED; every view, scenes included, renders the "SIMULATED prototype" banner (`App.tsx`, `Tour.tsx`) |
| 4 | Decisions logged | PASS | D-114 (explain-itself format), D-115 (duplicates by type), D-116 (one name per concept), D-117 (guided scenes), D-118 (vest saved at the household's rate): each with What, Why, Date and "Confirmed by: Renier" |
| 5 | Open questions | PASS | A-63 added (row 2c); P-VEST-SAVE rests on A-62, already listed; nothing is asked of Sherpas before delivery (D-099) |
| 6a | Every AC of the six features and G in the trace, with a test or spec only with its reason | PASS | `npm run trace`: "178 criteria and events · 160 tested · 18 spec only · 0 pending"; reasons in `prototype/src/model/scope.ts` |
| 6b | Each simulator relation has a unit test | PASS | "Simulator tests" bullets per feature: F-A 4, F-B 3, F-C 4, F-D 2, F-E 2, F-F 2; tests REL-A-1 to 4, REL-B-1 to 3, REL-C-1 to 4, REL-D-1 and 2, REL-E-1 and 2, REL-F-1 and 2 |
| 6c | `npm test`, `npm run e2e`, `npm run build` pass | PASS | Tests "238 passed (238)"; build "✓ built in 2.96s"; e2e "1 passed" (`e2e/h2.spec.ts`, now relying on the automatic flag) |
| 6d | Every view carries the SIMULATED banner; H1 to H7 labelled in title and first line | PASS | As row 3; `households.ts` first line "SIMULATED households H1 to H7" |
| 6e | No file in `prototype/` comes from `captures/`; the pre-commit hook passes | PASS | Hook exit 0 (row 1); the documents step and the section bar are our own code imitating the screens seen (D-012) |
| 6f | Renier has seen the prototype running locally | PASS | Each item shown at http://localhost:5180 before its commit, 2026-10-07; Renier's screenshot of the Income step and his review of scenes 1 to 5 |
| 6g | The dry run was shown before the rest | PASS | F-A was built end to end first, as one vertical slice (commit `f3a1a85`), before F-B to F-F in the cut order Renier confirmed (D-063, D-067); no separate record says when he saw it, so this row rests on the commit order and D-067 |
| 6h | Consistency | PASS | `npm run check`: "Consistency: all checks pass", 238 tests, build OK, trace as row 6a |
| 7 | Harness (two skills changed: wording only, D-116) | PASS | Y1 no new skill, wording only · Y5 one vocabulary now ("stock compensation", "employer stock"), spec skill 107 lines, all skills 629 lines · Y6 no content duplicated · Y12 evidence above; Y2 to Y4, Y7 to Y11 unaffected; `CLAUDE.md` 36 lines (Y3) |
| 8 | Git | PASS | `git log --oneline | grep -ic wip`: 0; 11 commits with "why" bodies; this check's fixes (D-115, D-116 tags, A-63, this file) are ready for one commit |

Ready for gate.
