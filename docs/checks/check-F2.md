# /check F2 · 2026-10-05

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Pre-commit hook passes on the full staged set | PASS | `git add -A && .githooks/pre-commit` → exit 0; staged set: discovery skill, `docs/02`, `03`, `04`, `research.md`, `docs/discovery/` (voices, personas, synthesis, 5 snapshots), this report; `git reset -q` after |
| 1b | Nothing raw in git | PASS | `git diff --cached --name-only \| grep -E '^(captures\|inputs)/'` → none; `git status --ignored`: `captures/voices/` (screenshots, labelled lists) ignored (`!!`) with the other capture folders |
| 1c | No confidential file types tracked | PASS | `git ls-files \| grep -iE '\.(rtf\|har\|png\|jpe?g)$'` → none |
| 1d | No platform API paths, IDs or tokens in changed docs | PASS | grep for `eyJ`, `/api/`, `/v1/`, UUIDs over changed docs → one hit, `research.md:219`, Plaid's public API documentation URL (a public source, not Sherpas) |
| 2 | Sherpas facts tagged, case sources only | PASS | Fixed during this check: `[brief]` added at `synthesis.md` (score rule, users), `voices.md` (Limits), `personas.md` (advisor-2); `[FACT: captures/…]` added for the questionnaire's income fields, sector concentration and the business-owner flag in `synthesis.md` item 8 |
| 2b | US facts point at research | PASS | Every `R-NNN` entry R-002 to R-017 has Category, Decision, Source, Accessed, Evidence size and Signal (script check: none missing). Discovery docs cite `R-NNN` for every rule; tax claims inside quotes are labelled R-consistent or R-contradicts against a named entry (`voices.md`, Misconceptions) |
| 2c | Inferences and assumptions tagged | PASS | Every "Changes:" line in R-002 to R-017 carries `[INFERENCE]` and every "Assumption carried forward" line carries `[ASSUMPTION: confirm]` or "none" (grep: no line missing); the "What F3 should do" column in `synthesis.md` carries a block `[INFERENCE]` tag (added during this check) |
| 3 | SIMULATED labelled | PASS | `personas.md` and the five `snapshots/*.md`: "SIMULATED" in the title (line 1) and the first content line (line 3); every simulated quote marked "(SIMULATED)" |
| 4 | Decisions logged | PASS | D-019 (F2 plan, evidence weights), D-020 (filter for questions to Sherpas), D-021 (public-voice filter), D-022 (Miro only when needed, logged during this check): each with what, why, date, who. Note: classing V02 and V03 as "signal" applies D-021 and was proposed to Renier; it is reversible in `voices.md` |
| 5 | Open questions captured | PASS | `02_open_questions.md`: research answers moved to Answered (R-002 to R-008, R-009 to R-012, R-014); new gaps (MoneyGuide, aggregators, 2026 AMT, back-loaded sources, double-trigger tax reason, RSA/SAR prevalence, 409A access, household prevalence, URLs of translated threads) |
| 6 | research "done when" 1: every entry has source, access date, evidence size and signal | PASS | Script check over R-002 to R-017: none missing |
| 6b | research "done when" 2: every number has its tax year or source date | PASS | R-004 AMT amounts "tax year 2025"; R-008 rates "tax year 2026"; R-014 and R-016 figures with source dates; snippet-only figures removed from R-012 and R-015 (none used as fact) |
| 6c | research "done when" 3: every entry names the decision it unblocks | PASS | Same script check ("Decision it unblocks") |
| 6d | discovery "done when" 1: SIMULATED in title and first line | PASS | Row 3 |
| 6e | discovery "done when" 2: every assumption has status, evidence and weight, or is dropped with a reason | PASS | `synthesis.md` Assumptions table A-01 to A-11; "Dropped, with reason": the large-firm premise, the research carry-forward lines, and the platform-capability inferences (added during this check) |
| 6f | discovery "done when" 3: nothing validated on SIMULATED alone | PASS | Each "Validated" row in `synthesis.md` cites real voices (V-NN) or R-NNN; snapshots only cross-reference them |
| 6g | discovery "done when" 4: US facts cite R-NNN; real quotes have URL and date and were read in full | PASS, note | All verbatim quotes have URL or forum thread and date; five were re-checked against the source (Pub 15, FINRA, Plaid, Pub 525, InvestmentNews). Translated Reddit threads are paraphrased, never quoted; their URLs are an open item in `02` |
| 6h | discovery "done when" 5: contradicting evidence stated | PASS | `synthesis.md` "Contradicting evidence" (4 items) |
| 6i | discovery "done when" 6: "What F3 needs" lists decisions and evidence | PASS | `synthesis.md` items 1 to 8 |
| 6j | discovery "done when" 7: dry run shown before the rest | PASS, note | `snapshots/advisor-1.md` shown to Renier on 2026-10-05 before the others were written; no explicit OK on the format was recorded before continuing |
| 7 | Harness checklist | see below | `discovery` skill added in F2 |
| 8 | Git | PASS | `git log --oneline \| grep -i wip` → none; main has F0 and F1 commits; F2 work is one coherent set, ready for one commit |

## Harness (discovery skill added)

| # | Result | Evidence |
|---|---|---|
| Y1 simplest thing that works | PASS | One skill file (96 lines), no scripts |
| Y2 built by trigger | PASS | Written just before the discovery block (D-002); the filter section was added when Renier asked for it (D-021) |
| Y3 CLAUDE.md always-on, under 200 lines | PASS | `CLAUDE.md` unchanged in F2, 35 lines |
| Y4 non-overlapping descriptions | PASS | discovery (advisor and client assumptions) vs research (US facts) vs capture-platform (Sherpas screens); each description says what it is not for |
| Y5 concise, under 500 lines per skill | PASS | Largest: discovery, 96 lines |
| Y6 no duplicated content | PASS, note | The D-021 filter is summarised in the decision log and specified in the skill: the log records the decision, the skill the procedure (same pattern as F1) |
| Y7 just-in-time loading | PASS | discovery loads only in F2 |
| Y8 fixed chain with human checkpoints | PASS | Plan, research list, Chrome reading, dry run and the filter were each shown to Renier before the next block |
| Y9 rules that must hold are hooks or permissions | PASS | Pre-commit hook kept `captures/voices/` out (row 1b); no new rule needed a hook |
| Y10 tested on a real run | PASS | F2 itself, with the dry run (row 6j) |
| Y11 owned and credited | PASS | Snapshot and synthesis formats credited to jinjin1 in the skill and in `NOTICE` |
| Y12 evidence shown | PASS | This report |

## Result

Fixed during this check: missing source tags in three discovery files (row 2), the block tag on the recommendation column (row 2c), the dropped platform inferences (row 6e), and the Miro decision logged as D-022 (row 4). Two notes for Renier: V02 and V03 kept as "signal" (row 4) and the format of the dry run was not explicitly approved (row 6j).

Ready for gate
