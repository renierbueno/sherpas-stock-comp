# Check F7 · Delivery

Date: 2026-10-07 · Branch `f7-delivery`, commits `ac573dd`, `4a0811b`, `2e8c42b`, `dd9e8cf` on top of `main` (`19f0df8`). Skills used: `deliver` (steps 1, 3, 4b), `spec` (step 2). Skill changed in the phase: `deliver`.

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Secrets and confidentiality | PASS | `git add -A --dry-run` lists only `.claude/settings.json` (Renier's, kept out of commits); `.githooks/pre-commit` exit 0 on the staged set; nothing tracked under `inputs/`; `captures/` holds only `.keep`; `git ls-files` lists no `.rtf`, `.har`, `.png` or `.jpg` outside `prototype/`. The prototype password lives only in `private/` (ignored) and in the delivery email. |
| 2a | No invented facts: repo documents | PASS | New text in `03` (D-125 to D-127), `07` "Before building", `10` "Impacts beyond the screens" and `02` (A-65 to A-67) carries `[brief]`, `[ASSUMPTION: A-NN]` or cites the decision it rests on. The TL;DR lines summarise the tagged content of their own document. `npm run consistency`: every A-NN, SC-NN, D-NNN and spec ID cited exists. |
| 2b | No invented facts: README "What we propose" and the Notion home page | FAIL | The five "Why" lines state US facts (RSU and PSU prevalence, the 22% flat withholding, aggregators and unvested grants, RSU taxed as wages at vest) and one Sherpas fact (tax planning among the areas it builds towards) without their source: `README.md` lines 11, 16, 21 and 26; the same text on the Notion home page. Sources exist (R-001, R-008, R-013, R-016; `01_context.md` seed round line) but are not cited. |
| 3 | Simulated is labelled | PASS | No new persona, interview or data set. Figures quoted on Notion (scenarios, video script) keep the spec's "SIMULATED" label; the protected copy shows "SIMULATED prototype" on every screen and on the password page. |
| 4 | Decisions logged | FAIL | Logged: D-125 (delivery structure and cuts), D-126 (validation with the prototype, impacts), D-127 (Miro). Not logged: the Notion feature pages show one acceptance scenario per edge case, each with a When that the spec does not hold yet, where D-122 says "a few key examples"; and the Glossary and Follow-up pages shorten repo text, where D-084 says Notion is filled from the repo. Both need a decision that amends D-122 and D-084. |
| 5 | Open questions and follow-up | FAIL | A-65 to A-67 and "Follow-up after delivery" are in `02`. GAP-37 and GAP-38 in `10_flow_review.md` still read "Open, prototype rework in step F6.5 (D-098)", a step that closed; the prototype has the guide strip (GAP-37 in part) but no note on the chart (GAP-38). They need a current status and a line in "Follow-up after delivery". |
| 6.1 | deliver: every brief line answered on Notion Home and the README, with a link deeper, and mapped to the video | PASS | `README.md` "What we propose" (five answers, each with "Deeper"); Notion home page, same five answers with links to its pages; `11_storyline.md` "Fit with the brief" maps each line to a Home answer, a stage and a video part. |
| 6.2 | deliver: Notion and README share structure A; the video script follows order B | PASS | Notion pages: Home, Strategy, Engineering deliverables (six Spec Kit feature pages), Methodology, Tools, Glossary, Follow-up, as in `11_storyline.md` "Notion pages"; README stages 1 to 8, spec last; `private/f7_video_script_private.md` scenes in the brief's order. All 13 Notion pages read back after writing. |
| 6.3 | deliver: every stage document opens with a TL;DR | PASS, one gap | 16 documents carry it (`01`, `02`, `04`, `06` to `12`, `research.md`, `platform_map.md`, `questionnaire_map.md`, `data_model.md`, `discovery/synthesis.md`, `spec/00_index.md`). `design_tokens.md`, listed under stage 1 in `11_storyline.md`, has none. |
| 6.4 | deliver: no bare code and no untagged claim in what Sherpas reads | FAIL | Codes on Notion and in the README sit beside a plain label. Untagged claims: see 2b. |
| 6.5 | deliver: Renier saw the dry run | PASS | README shown in Downloads before its commit; F-A shown before the other five feature pages (this session). |
| 6.6 | Notion names the commit it was built from (D-084) | FAIL | No page names the commit. To add on the home page once the last commit of the phase is known. |
| 6.7 | spec (step 2): decisions taken while writing have a D-NNN; dry run shown | PASS | D-126 "Confirmed by: Renier"; `~/Downloads/F7_paso2_validacion_impactos.md` shown before the commit `4a0811b`. No requirement changed; trace unchanged. |
| 6.8 | Delivery items outside the repo | FAIL (pending) | Protected copy published at https://stock-comp-prototype-k7q2.netlify.app: wrong password does not open it, no prototype text is readable without the password, `noindex` present, the old URL returns 404 (checked in a clean headless browser and with curl); the right password is not yet tested in a private window, and the password file in `private/` is not the one used. Miro board `uXjVEecsLmY=`: new frames present, no "stock pay" left, the ten decision cards match `03`; five "no rule ID" notes and two embeds to the private board remain, and read access is not checked. Video: not recorded. |
| 6b | Consistency | PASS | `npm run check`: 15 consistency checks PASS, 238 tests passed, build OK, trace "178 criteria and events · 160 tested · 18 spec only · 0 pending". `npm run e2e`: 1 passed. |
| 7 | Harness (deliver changed) | PASS | Y1 the skill was edited, not replaced · Y2 changed when the delivery format changed (D-125) · Y3 `CLAUDE.md` 36 lines, untouched · Y4 its description says what it owns and what it does not (decide, spec, check) · Y5 43 lines · Y6 the structure lives in `11_storyline.md`, the skill points to it · Y7 inputs named, read when needed · Y8 order fixed, dry run and gate kept · Y9 consistency and pre-commit unchanged and passing · Y10 used on this phase's real run (README, Notion) · Y11 sources credited in the README and Tools page · Y12 this report. |
| 8 | Git | PASS | No "wip" commit in `git log`; four commits on `f7-delivery`, each with a "why" message. |

FAILs to fix before the gate:
1. 2b and 6.4: add the source in brackets at the end of each "Why" in the README and on the Notion home page.
2. 4: a decision that amends D-122 (one scenario per edge case, with a When the spec gets after delivery) and D-084 (Glossary and Follow-up text shortened for reading, repo right where they differ).
3. 5: current status for GAP-37 and GAP-38, and a line for each in "Follow-up after delivery".
4. 6.3: a TL;DR on `design_tokens.md`.
5. 6.6: the commit on the Notion home page, after the last commit.
6. 6.8: Renier tests the protected copy with the right password in a private window and keeps one password; the Miro agent removes the five notes and the two embeds and checks read access; the video is recorded and linked.

## Re-check 2026-10-07 · after fixing 1 to 4

| # | Check | Result | Evidence |
|---|---|---|---|
| 2b, 6.4 | Sources on the README and the Notion home page | PASS | Each "Why" ends with its source in brackets: `README.md` lines 11, 16, 21, 26 and 31 (R-013, R-016, R-003 to R-005, R-001, R-008, R-014, SC-01, SC-04, discovery patterns 1 to 3, A-06, A-10, `01_context.md`, F3-13, D-080), with a legend of the codes under "What we propose"; the same on the Notion home page. |
| 4 | Decisions logged | PASS | D-128 amends D-122 (one Given, When, Then scenario per edge case on Notion; the When reaches the spec after delivery) and D-084 (Glossary and Follow-up shortened, the repo right where they differ). |
| 5 | Open questions and follow-up | PASS | GAP-37 and GAP-38 read "Open, after delivery (D-128)" in `10_flow_review.md`; both are a line in "Follow-up after delivery" in `02` and on the Notion Follow-up page. |
| 6.3 | TL;DR on every stage document | PASS | `design_tokens.md` now opens with one. |
| 6b | Consistency | PASS | `npm run check`: all consistency checks PASS, 238 tests, build OK, trace 178 · 160 · 18 · 0. `npm run e2e`: 1 passed. |

Still open, outside this commit:
1. 6.6: the commit on the Notion home page, once the last commit of the phase is known.
2. 6.8: Renier tests the protected copy with the right password in a private window and keeps one password; the Miro agent removes the five "no rule ID" notes and the two embeds and checks read access; the video is recorded and linked.

## Re-check 2026-10-07 · before the gate

| # | Check | Result | Evidence |
|---|---|---|---|
| 6.8 | Delivery items outside the repo | PASS | Protected copy: Renier tested the published copy with his password in a private window; one password kept (the file in `private/` and Claude's local copy deleted). Miro: the nine leftovers removed from the working board (1035 to 1026 items; a new search finds no "no rule ID", no embed to a private board, no "stock pay"); Renier pasted the board into Sherpas' Miro, https://miro.com/app/board/uXjVEfJNAvQ=/, which Claude's Miro connection cannot open, so that copy rests on Renier's word (D-129). The README and the Notion home page link Sherpas' board and the copy. |
| 6.6 | Notion names the commit it was built from | PASS after commit | The commit of this re-check is named on the Notion home page once made. |
| 4 | Decisions logged | PASS | D-129: the board Sherpas reads is the copy on Sherpas' Miro (amends D-127). |
| 9 | README phase table | PASS | F7 "done" in `README.md`; the consistency check "README phases match the closed checks" passes. |
| 6b | Consistency | PASS | `npm run check`: all consistency checks PASS, 238 tests, build OK, trace 178 · 160 · 18 · 0. `npm run e2e`: 1 passed. |

The video is recorded after the gate and goes with the delivery email and on the Notion home page; the README points to Notion for it, so no repo change follows.

Ready for gate
