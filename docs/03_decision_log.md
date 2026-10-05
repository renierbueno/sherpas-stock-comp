# 03 · Decision log

Every decision in the case: what, why, date, who confirmed. Newest at the bottom. A decision is changed by a new entry that supersedes the old one, never by editing it.

## D-001 · The harness is adapted from existing skills, not written from scratch
- What: the skills in `.claude/skills/` are copied and edited from product-sdd and a private derivative of it (my own spec-driven harnesses) for structure, checkpoints, evidence labels and "done when" criteria, and from jinjin1's Cursor-for-Product-Managers (Apache-2.0, credited in `NOTICE`, license in `third_party/`) for output formats only (interview snapshots, ICE, one-pager). Anything not relevant to this case is cut.
- Why: proven skills, edited for the case, are faster and more reliable than new ones; owning and editing them is the documented best practice for Claude Code skills.
- Date: 2026-10-03 · Confirmed by: Renier

## D-002 · Each skill is written just before its phase
- What: F0 writes only `setup-case`, `capture-platform`, `research` and `/check`. Each later skill (discovery, decide, assumptions, spec, prototype) is written right before its phase, with a dry run that shows its output file. A skill that does not pass its dry run within the timebox is used as is, and the debt is logged here.
- Why: build by need and test before writing more, instead of configuring everything up front.
- Date: 2026-10-03 · Confirmed by: Renier

## D-003 · Markdown in the repo is the source of truth; Notion and Miro are published at every closed gate
- What: Miro is the working board (messy is fine). Notion holds only clean content, updated at every closed gate. Each publish needs Renier's OK at that moment.
- Why: both workspaces belong to Sherpas and changes are visible in real time; the brief offers them to think and to show how we think, so waiting until the last day would waste them.
- Date: 2026-10-03 · Confirmed by: Renier

## D-004 · Two connected deliverables: proposal + EARS spec, and a pull request
- What: (1) the proposal and the EARS spec in Notion (the definition); (2) a pull request in this repo implementing the MVP in the prototype (input, model, score simulator, analysis view), with each acceptance criterion linked to its test, tests green, and screenshots or a deploy (decided in F5). The spec drives the PR; the PR validates the spec; gaps found go back to the spec and to this log. The PR is a reference implementation: engineering decides how to build it in production. The proposal answers the brief's four questions plus what stays out and why.
- Why: a spec says what to build; a working implementation shows the spec holds up and is precise enough to build from.
- Date: 2026-10-03 · Confirmed by: Renier

## D-005 · Language
- What: repo, docs, skills, outputs and deliverables in English. The brief stays in its original language.
- Why: the product and its users are in the US and the video is in English.
- Date: 2026-10-03 · Confirmed by: Renier

## D-006 · The brief is kept as received
- What: `00_brief.md` keeps the brief, the email and the score article as received, with no translation. Only credentials and private links are redacted.
- Why: it is the source; a translation would be a second version to keep in sync.
- Date: 2026-10-03 · Confirmed by: Renier

## D-007 · Questionnaire: capture every step, never submit
- What: moving between steps is allowed, with every click asked through the "ask" permission. Submitting or the last step: never by Claude. Renier decides at the end of F1 whether to submit; if so, he does it himself with a realistic profile that includes RSUs.
- Why: the link is single-use; the information cannot be recovered after submitting.
- Date: 2026-10-03 · Confirmed by: Renier

## D-008 · A prototype that imitates the Sherpas interface is always password-protected if deployed
- What: whether to deploy (versus repo or video only) is decided in F5; if deployed and it imitates their UI, it sits behind a password.
- Why: everything seen on the platform is confidential [brief].
- Date: 2026-10-03 · Confirmed by: Renier

## D-009 · Git history is part of the delivery
- What: on main, one commit per closed gate with a message that explains why. The PR lives on its own branch with small commits tied to acceptance criteria and is merged to main when F5 closes. No "wip" commits anywhere. The remote is private on GitHub and will be shared with Sherpas. Push only with Renier's OK.
- Why: the history shows how the work was done, which the brief asks to see.
- Date: 2026-10-03 · Confirmed by: Renier

## D-010 · Confidentiality is enforced by hooks and permissions, not by prose
- What: a pre-commit hook blocks the original brief files, platform captures, screenshots outside `prototype/`, the demo user and password, one-use links and auth tokens. Bypassing it (`--no-verify`) and changing `core.hooksPath` are denied in `.claude/settings.json`. Chrome clicks and page writes need an "ask" approval. Raw captures live in `captures/`, outside git. The prototype uses our own code that imitates the design; their JavaScript and source are never copied.
- Why: a rule that must always hold should be a hook, not a request. Tested on 2026-10-03 in a throwaway repo: 7 bad commits blocked, 2 good ones passed.
- Date: 2026-10-03 · Confirmed by: Renier

## D-011 · Notion and Miro get one reviewed upload at the end (supersedes D-003)
- What: Notion gets a single upload into Sherpas' page once the content is complete and reviewed by Renier. Renier has guest access without edit rights and asks Sherpas for edit access on 2026-10-05. Miro is used to think in every phase, on a board in Renier's own free Miro account; at the end Renier reviews it and confirms what moves to Sherpas' board. The Miro connector is set up on Renier's account at its first use in F1; the Notion connector just before the upload, not at the start of F1 as `checks/check-F0.md` planned.
- Why: content and format are not settled yet. Both spaces are Sherpas' and visible in real time, so a half-built page or board there would show unfinished work, while a private board keeps the thinking visual without that exposure, and the process is already recorded in git. Without edit access no upload is possible yet in any case.
- Date: 2026-10-03 · Confirmed by: Renier

## D-012 · Their HTML and JavaScript may be kept privately to understand the app
- What: during the platform capture, full page HTML including scripts is saved in `captures/` (outside git). It is used only to understand how the app is built and where its data comes from. It never goes into git, the deliverables or the prototype, which stays our own code imitating the design. Supersedes the "never save their JavaScript" line in D-010.
- Why: the page HTML carries the analysis itself and the app's route list, which explain the product better than screenshots; keeping it private keeps the confidentiality the brief asks for.
- Date: 2026-10-03 · Confirmed by: Renier

## D-013 · The platform API is read with GET only, and stays out of the deliverables
- What: on 2026-10-03 the client-view API was read with GET requests using the page's own session: four responses (household and members, opportunity and diagnostics, user, shared reports), saved in `captures/client/07-api/` with tokens removed. Requests the app makes with POST (the element-level net worth and cash flow data) were not made, and the app's code was not analysed further to reconstruct them. Committed files describe the data model in our own words, with no API paths, IDs or tokens. The element schema is asked of Sherpas instead (`02_open_questions.md`).
- Why: a POST can write or trigger processing even when it is meant to read; the element-level data is already visible on the Statements and holdings screens; and asking for the schema is how a PM would get it, which reads better than rebuilding their backend.
- Date: 2026-10-03 · Confirmed by: Renier

## D-014 · No POST to the platform API; element data comes from the screens and from Sherpas (confirms D-013)
- What: the element-level net worth and cash flow data the app loads with POST is not requested by us, and the app's code is not analysed to rebuild those calls. The data is read from the Statements and holdings screens, and the element schema is asked of Sherpas (`02_open_questions.md`). Clicks inside the questionnaire that may save progress are a separate matter, covered by D-007 and D-016.
- Why: a POST can write or trigger processing in their system even when it is meant to read; the same data is already visible on screen; and asking for the schema is how a PM would get it.
- Date: 2026-10-04 · Confirmed by: Renier

## D-015 · The prototype is our own code only (confirms D-012)
- What: the prototype does not reuse their HTML, CSS or JavaScript, rendered or not. It is built from `design_tokens.md` and scale-1 screenshots used as visual reference. Their code stays in `captures/`, outside git.
- Why: high visual fidelity is reachable with tokens and reference screenshots, and their code would otherwise leave their systems inside a repo shared with their engineering team and, if deployed, on a public host. Their minified bundles are not practical to reuse in any case.
- Date: 2026-10-04 · Confirmed by: Renier

## D-016 · Questionnaire capture: read the definition first, block writes while stepping through
- What: the single-use link is opened once, in one tab, never reloaded. Before any click: a GET baseline of the household and profile, a passive load with network logging, and a GET re-read of any form definition the page loads. While stepping through, a script in the page logs every request and blocks POST, PUT, PATCH and DELETE to the API, so no step can save or submit; if the form cannot advance without a save, Claude stops and Renier decides. Required fields get a minimal SIMULATED profile with RSUs, entered only with Renier's OK per step. The last step is identified by the definition's step count, the progress indicator and the button label, captured without clicking, and never pressed by Claude. The baseline GET is repeated at the end to confirm nothing changed.
- Why: the link cannot be recovered once used, and a write in their system cannot be undone; reading the definition gives every field, option and branch with the fewest clicks.
- Date: 2026-10-04 · Confirmed by: Renier

## D-017 · The questionnaire is documented from its definition, not its screens
- What: the single-use link was already completed on 2026-09-21 by another test household, so its steps cannot be walked. F1 closes with the questionnaire definition and one set of submitted answers, read by GET (`questionnaire_map.md`). A fresh link is asked of Sherpas (`02_open_questions.md`); if it arrives, the step screens are captured then. This replaces the capture-platform "done when" line on capturing the questionnaire to its last step.
- Why: the definition gives every section, question, rule and output, which is what the intake design needs; the screens matter only for visual fidelity, which the client view's design tokens already cover.
- Date: 2026-10-04 · Confirmed by: Renier

## D-018 · Every commit is reviewed by Renier on the exact set
- What: before every commit, Claude shows Renier the files, what they affect, why, and the message. The commit happens only after his OK on that exact set; any change after the OK needs a new OK. Added to the Git rules in `CLAUDE.md`.
- Why: the git history is part of the delivery and will be read by Sherpas (D-009), so each commit must be one Renier has seen and stands behind; the pre-commit hook guards confidentiality, not content or wording.
- Date: 2026-10-04 · Confirmed by: Renier

## D-019 · F2 plan: research first, discovery from real public sources and SIMULATED material, timeboxed for the 2026-10-07 delivery
- What: F2 runs research first (about 12 `R-NNN` entries in three parallel blocks: types with lifecycle and federal tax; vesting models; advisor practice, tools and prevalence), then discovery, then a synthesis for F3. Discovery uses real public voices (advisor and employee posts, surveys, product reviews, with URL and date) and SIMULATED personas and interviews; real interviews only if they arrive in time. Evidence weight: real > real public voice > SIMULATED; no assumption is marked validated on SIMULATED material alone. The `discovery` skill is written just before its block, with a dry run (D-002). Miro is connected at the synthesis step. Timebox: about 3.5 hours of working time.
- Why: the interview questions depend on knowing which types and states exist; parallel research blocks fit the delivery date; simulated interviews can only generate hypotheses, so the weight of each source is stated up front.
- Date: 2026-10-05 · Confirmed by: Renier

## D-020 · A question goes to Sherpas only after checking every source we already have
- What: before a question enters "For Sherpas" in `02_open_questions.md`, it is checked against the brief (including the four points of the assignment and the score article), `01_context.md`, the F1 docs and `research.md`. It goes only if it changes a decision in F3 to F5 and no stated assumption lets the work proceed. Each question records what it was checked against and the decision it changes. The existing list is re-audited with this rule at the end of F2.
- Why: questions already answered by the brief, or that are the exercise itself (for example how stock compensation changes the score), cost the hiring manager's time and the proposal's credibility.
- Date: 2026-10-05 · Confirmed by: Renier

## D-021 · Public voices are filtered by who speaks and what kind of claim it is
- What: every public post, comment, review or press quote used in discovery is labelled by speaker (verified professional, self-declared professional, lived experience, no stated basis) and by claim (rule, behaviour, opinion). Rule claims are checked against `research.md`; ones that contradict it count as evidence of confusion, never as facts. Items with no stated basis and opinions are excluded from the evidence. An assumption is validated only by behaviour or rule-consistent items from two independent speakers with a professional or lived basis. Machine-translated text is never quoted as verbatim. The filter lives in the `discovery` skill and applies to every public source.
- Why: forums and reviews mix professionals, people with real experience and people with no basis; without a filter, noise and popular opinion would pass as evidence.
- Date: 2026-10-05 · Confirmed by: Renier

## D-022 · Miro is connected only when a task needs it (supersedes the Miro line of D-019)
- What: the Miro board is not connected at the F2 synthesis. It is connected the first time a task needs a visual board, and the markdown in the repo stays the source of truth. D-011 still holds for anything that reaches Sherpas' board.
- Why: the F2 synthesis reads well as tables in markdown; connecting a tool with nothing that needs it adds setup and a second place to keep in sync.
- Date: 2026-10-05 · Confirmed by: Renier
