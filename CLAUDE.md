# CLAUDE.md · sherpas-stock-comp

Sherpas technical exercise: integrate stock compensation into the platform. Brief: `docs/00_brief.md`. Decisions: `docs/03_decision_log.md`.

## Facts
- Sherpas facts come only from `docs/01_context.md` or the platform (`docs/platform_map.md`). US financial or regulatory facts come only from `docs/research.md` (source + date). Anything else goes to `docs/02_open_questions.md`, never guessed.
- Evidence tags: `[FACT: source]` · `[INFERENCE: from what]` · `[ASSUMPTION: confirm]`.
- Anything simulated (personas, interviews, data) is labelled `SIMULATED` in its title and first line. Never presented as real.

## Decisions and phases
- Phases: F0 setup · F1 understand · F2 discovery · F3 decide · F4 spec · F5 prototype + tests · F6 delivery. Polish only after F6, timeboxed.
- Every decision → `docs/03_decision_log.md` (what, why, date, who confirmed).
- Every phase ends with `/check <phase>` and then Renier's gate. Do not start the next phase without his OK.
- Timebox each phase. Two iterations without progress → stop and ask Renier.
- Skills route by their descriptions; `/name` forces one. A new skill is written just before its phase, with a dry run.

## Git
- main: one commit per closed gate, message explains why. PR work: its own branch, small commits tied to acceptance-criterion IDs. No "wip" commits.
- The history will be read by Sherpas. Remote, push, PR creation and merge only with Renier's OK at that moment.
- Never bypass the pre-commit hook.
- No `Co-Authored-By` trailer in this repo's commits or PRs.
- Only case material in the repo: the brief, public company facts with URL, the platform, research.

## Safety
- Questionnaire link is single-use: move between steps only with an approved click; never submit or press the last step. Renier submits, if he decides to.
- Never type a password. Renier logs in; then navigate.
- Their systems: read only. Network data re-read with same-origin GET only.
- `captures/` (screenshots, HTML, JSON) never enters git; only derived notes in `docs/`. Never copy their JavaScript or source; the prototype is our own code imitating the design.
- Notion and Miro belong to Sherpas and are live: publish only with Renier's OK. Notion = clean content at each gate; Miro = working board.
- A deployed prototype that imitates their UI is always password-protected.

## Writing
- Repo, docs, skills, Notion, deliverables: English. Chat with Renier: Spanish. The brief stays in its original language.
- Plain and direct. No em dashes. Say "three", not "several". Tests: unit tests for the score simulator, each acceptance criterion linked to a test, one e2e of the prototype.
