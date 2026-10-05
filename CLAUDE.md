# CLAUDE.md · sherpas-stock-comp

Sherpas technical exercise: integrate stock compensation into the platform. Brief: `docs/00_brief.md`. Decisions: `docs/03_decision_log.md`.

## Facts
- Sherpas facts come only from `docs/01_context.md` or the platform (`docs/platform_map.md`). US financial or regulatory facts come only from `docs/research.md` (source + date). Anything else goes to `docs/02_open_questions.md`, never guessed.
- Evidence tags: `[FACT: source]` · `[INFERENCE: from what]` · `[ASSUMPTION: confirm]`.
- Anything simulated (personas, interviews, data) is labelled `SIMULATED` in its title and first line. Never presented as real.

## Decisions and phases
- Phases: F0 setup · F1 understand · F2 discovery · F3 decide · F4 spec · F5 flow review · F6 prototype + tests · F7 delivery (D-053). Polish only after F7, timeboxed.
- Every decision → `docs/03_decision_log.md` (what, why, date, who confirmed).
- Every phase ends with `/check <phase>` and then Renier's gate. Do not start the next phase without his OK.
- Timebox each phase. Two iterations without progress → stop and ask Renier.
- Skills route by their descriptions; `/name` forces one. A new skill is written just before its phase, with a dry run.

## Git
- main: one commit per closed gate, message explains why. PR work: its own branch, small commits tied to acceptance-criterion IDs. No "wip" commits.
- Before every commit, show Renier the files, what they affect, why, and the message; commit only after his OK on that exact set. Any change after his OK needs a new OK.
- The history will be read by Sherpas. Remote, push, PR creation and merge only with Renier's OK at that moment.
- Never bypass the pre-commit hook.
- No `Co-Authored-By` trailer in this repo's commits or PRs.
- Only case material in the repo: the brief, public company facts with URL, the platform, research.

## Safety
- Questionnaire link is single-use: move between steps only with an approved click; never submit or press the last step. Renier submits, if he decides to.
- Never type a password. Renier logs in; then navigate.
- Their systems: read only. Network data re-read with GET only (the app and its own API, with the page's session); never POST, PUT, PATCH or DELETE. Tokens are never saved, printed or committed; API paths and IDs never leave `captures/` (D-013).
- `captures/` (screenshots, HTML, JSON) never enters git; only derived notes in `docs/`. Their HTML and JavaScript may be saved in `captures/` to understand how the app works, never in git or the prototype; the prototype is our own code imitating the design (D-012).
- Notion and Miro belong to Sherpas and are live: one upload each at the end, only after Renier's review and OK (D-011). Until then Miro is the thinking board in every phase, on Renier's own account.
- A deployed prototype that imitates their UI is always password-protected.

## Writing
- Repo, docs, skills, Notion, deliverables: English. Chat with Renier: Spanish. The brief stays in its original language.
- Plain and direct. No em dashes. Say "three", not "several". Tests: unit tests for the score simulator, each acceptance criterion linked to a test, one e2e of the prototype.
