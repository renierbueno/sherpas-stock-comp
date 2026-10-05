# /check F1 · 2026-10-04

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Pre-commit hook passes on the full staged set | PASS | `git add -A && .githooks/pre-commit` → exit 0; staged set: `CLAUDE.md`, capture-platform skill, `docs/02`, `03`, `data_model`, `design_tokens`, `platform_map`, `questionnaire_map`; `git reset -q` after |
| 1b | Nothing raw in git | PASS | `git status --ignored`: `captures/_dryrun/`, `captures/client/`, `captures/questionnaire/` all ignored (`!!`); nothing under `inputs/` |
| 1c | No confidential file types tracked | PASS | `git ls-files \| grep -iE '\.(rtf\|har\|png\|jpe?g)$'` → none |
| 1d | No API paths, IDs, tokens or private names in docs | PASS | `grep -E` for UUIDs, `/api/`, `/v1/`, the test household email, the demo email and the hiring manager's name over `docs/*.md` → only the name inside `00_brief.md` (kept as received, D-006); 0 `eyJ` in `captures/questionnaire/` |
| 2 | Sherpas facts tagged, case sources only | PASS | Fixed after the first run: tags added at `data_model.md:18,20-22` (balance sheet capture), a block tag on the component notes in `design_tokens.md`, and `platform_map.md:31` (questionnaire captures). All other lines carry a line, row or block tag (`platform_map` table, `data_model` blocks, `questionnaire_map` tables with block tags) |
| 2b | US facts point at research | PASS | Only `R-001` is cited (`data_model.md`, "Where stock compensation would fit"); no new US facts in F1 docs. Social Security at 67 in `questionnaire_map.md` is the platform's default, tagged as a platform fact |
| 2c | Inferences tagged | PASS | Stock compensation fit sections in `data_model.md` and `questionnaire_map.md`: every line `[INFERENCE: …]` or `[FACT: …]`; questionnaire to analysis flow tagged as inference |
| 3 | SIMULATED labelled | N/A | Nothing simulated in F1 (the SIMULATED profile of D-016 was never used: the questionnaire was already completed) |
| 4 | Decisions logged | PASS | D-011 to D-018 each have what, why, date and who confirmed (`03_decision_log.md`). The commit-review rule added to `CLAUDE.md` is D-018 (fixed after the first run) |
| 5 | Open questions captured | PASS | `02_open_questions.md`: questionnaire screens and the "benefit plan income" block (platform); new link, analysis trigger after completion, version precedence (Sherpas); four questionnaire questions moved to Answered with sources |
| 6 | capture-platform "done when" 1: every screen has a folder and a line | PASS | `captures/client/01…06` and `captures/questionnaire/01-load` each have a line in `platform_map.md`; `07-api`, `_tokens`, `00-baseline`, `02-opportunity` are data, not screens |
| 6b | "done when" 2: questionnaire captured to its last step, or submit decision logged | PASS, replaced | Not possible: the link was already completed on 2026-09-21. Replaced by D-017 (definition and answers read by GET, new link asked of Sherpas). Incident timeline in `captures/questionnaire/incident_log.md` (outside git) |
| 6c | "done when" 3: `design_tokens.md` and `data_model.md` exist and pass the hook | PASS | Both present; hook exit 0 (row 1) |
| 6d | "done when" 4: `git status` shows nothing under `captures/` | PASS | Row 1b |
| 7 | Harness checklist | see below | capture-platform skill changed in F1 |
| 8 | Git | PASS | `git log --oneline \| grep -i wip` → none; one commit on main (F0); F1 work is one coherent set, ready for one commit |

## Harness (capture-platform changed)

| # | Result | Evidence |
|---|---|---|
| Y1 simplest thing that works | PASS | The skill change rewrites three rules in place; no new files |
| Y2 built by trigger | PASS | Changes came from the real F1 run (token redaction, Downloads cleanup, HTML kept privately per D-012) |
| Y3 CLAUDE.md always-on, under 200 lines | PASS | 35 lines; the new lines are always-on rules |
| Y4 non-overlapping descriptions | PASS | capture-platform (platform screens), research (public US facts), setup-case (F0 only), check (manual only) |
| Y5 concise, under 500 lines per skill | PASS | Largest skill: research, 63 lines |
| Y6 no duplicated content | PASS, note | The GET-only and no-copied-code rules appear in both `CLAUDE.md` and the skill; the skill adds the how (redaction, grep, Downloads). Acceptable: CLAUDE.md is the rule, the skill the procedure |
| Y7 just-in-time loading | PASS | The skill loads only in F1 |
| Y8 fixed chain with human checkpoints | PASS | Every questionnaire step was proposed and approved before it ran (session of 2026-10-04) |
| Y9 rules that must hold are hooks or permissions | PASS | Chrome click, JavaScript and batch tools are "ask" in `.claude/settings.json`; pre-commit hook blocks captures and tokens; `--no-verify` and `core.hooksPath` denied |
| Y10 tested on a real run | PASS | F1 itself is the real run |
| Y11 owned and credited | PASS | No new third-party content |
| Y12 evidence shown | PASS | This report |

## Result

First run: two FAILs (untagged claims; commit-review rule not logged). Both fixed the same day, rows 2 and 4.

Ready for gate
