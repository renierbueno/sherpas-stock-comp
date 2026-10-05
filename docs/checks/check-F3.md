# Check F3 · decide

Date: 2026-10-05 (fourth run, after D-042 from the public website; earlier FAILs 2b, 2c, 5, 6c and 2a were fixed). Skills used in the phase: `decide` (new). Files changed: `docs/01_context.md`, `docs/06_direction.md` (new), `docs/03_decision_log.md`, `docs/02_open_questions.md`, `docs/04_glossary.md`, `docs/checks/check-F3.md` (new), `.claude/skills/decide/SKILL.md` (new).

| # | Check | Result | Evidence |
|---|---|---|---|
| 1a | Staged set has no captures, inputs or private files | PASS | `git add -A --dry-run`: only the seven files above |
| 1b | Pre-commit hook on the staged set | PASS | `.githooks/pre-commit` exit 0 |
| 1c | No media tracked outside `prototype/` | PASS | `git ls-files \| grep -iE '\.(rtf\|har\|png\|jpe?g)$'` returns nothing |
| 1d | No call or JD context in committed files | PASS | grep for transcript, "in the call", JD in `01`, `02`, `04`, `06`: no match. Document upload is now cited from the public website, not from the call. D-034 names our own message to the hiring manager (brief §2) |
| 2a | Sherpas facts tagged | PASS | Every line added to `01_context.md` carries `[web: URL, accessed 2026-10-05]` (diff scan: no untagged line); `06_direction.md` F3-06b and the advisor table cite `[web: sherpaswealth.com/…]`; plan-statement extraction is `[ASSUMPTION: confirm]`. The awk scan of `06_direction.md` lists only design statements, table headers, "none" or unknown cells and rows covered by a block-level source line |
| 2b | US facts point at an `R-NNN` | PASS | Intros of F3-02, F3-03, F3-04, F3-05, F3-06 now cite R-001, R-002, R-009 to R-011, R-013, R-017; MVP cut rows cite R-005 and R-016 |
| 2c | No claim beyond its source | PASS | "mostly in cash" removed from `06_direction.md` and D-041 (grep: no match); now "often cash-settled" (R-006) |
| 3 | SIMULATED labelled | PASS | No simulated material added in F3 |
| 4 | Decisions logged | PASS | D-023 to D-042: 20 entries, each with What, Why and "Date … · Confirmed by: Renier" (awk: 20 × 3 lines). D-042 partly supersedes D-030 by a new entry, D-030 unedited. D-034 was first written on a misreading of Renier's instruction and rewritten the same session, before any commit, to what he asked |
| 5 | Open questions | PASS | `02_open_questions.md` "For public research": insider rules, acceleration and clawbacks, state supplemental withholding, compliance review; threshold calibration added to the concentration question; plan-statement extraction and the questionnaire recheck after the link reset (D-042) |
| 6a | decide: every synthesis item has an entry | PASS | Items 1 to 8 → F3-01, F3-03, F3-04, F3-06, F3-05, F3-10 to F3-12, F3-02, F3-07 |
| 6b | decide: every chosen option has a `D-NNN` | PASS | `grep "Chosen:"`: D-024 to D-040, D-042 (F3-06b) |
| 6c | decide: every option checked against D-023 | PASS | 16 of 17 entries carry a D-023 line; F3-05b has no options by design (completeness fix to F3-03) |
| 6d | decide: MVP cut with why and source | PASS | `06_direction.md` "MVP cut", 22 rows, D-041; the plan-statement row moved from next to MVP (D-042), the old next row removed (grep: no match) |
| 6e | decide: at most three riskiest assumptions with validation | PASS | `06_direction.md` "Riskiest assumptions", 3 rows |
| 6f | decide: questions to Sherpas passed D-020 | PASS | Only new question to Sherpas: advisor login, reasoned in D-034; plan-statement extraction kept as an assumption, not asked (D-020) |
| 6g | decide: dry run shown before the rest | PASS | F3-01 written to the scratchpad and shown in chat before `06_direction.md` existed |
| 7 | Harness Y1–Y12 for `decide` | PASS | Y1 one file, template and steps only · Y2 written just before block 1 (D-002) · Y3 CLAUDE.md 35 lines, unchanged · Y4 description excludes research and discovery · Y5 61 lines, case vocabulary · Y6 evidence rules referenced, not copied · Y7 inputs read per block · Y8 Renier chooses each decision · Y9 n/a, no new must-hold rule · Y10 dry run on F3-01 · Y11 ICE format credited to jinjin1 (`NOTICE`) · Y12 this table |
| 8 | Git | PASS | `git log --oneline \| grep -i wip` returns nothing; the phase fits one commit |

Ready for gate
