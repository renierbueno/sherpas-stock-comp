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

## D-023 · Nothing that works today gets worse for a household without stock compensation
- What: a household with no stock compensation sees the same questionnaire, the same analysis and the same score as today. Any new question, field or check appears only when it applies, and where possible only for firms that enable it. Every F3 option is judged against this rule first.
- Why: the questionnaire and the analysis already work for most households; the feature serves a segment (A-01), so its cost in friction must fall on that segment only. A score that moved for everyone would also need the whole score recalibrated.
- Date: 2026-10-05 · Confirmed by: Renier

## D-024 · MVP types: RSU and PSU, plus an employer flag on any held position
- What: the MVP models RSU and PSU grants in full (grant, schedule, future vests; a PSU adds a condition and a payout range). Any position the client already holds can be flagged as employer stock, whatever its origin (RSU, ESPP, exercised options). Future ESPP purchases and unexercised options are not projected in the MVP. Options in `06_direction.md` F3-01.
- Why: RSUs and performance units are granted by almost every responding company (R-016) and share one model (R-002, R-011); the flag makes the concentration analysis correct for every type once it is shares. ESPP and options each need their own tax logic for a smaller segment (R-003 to R-005, V20, V28).
- Date: 2026-10-05 · Confirmed by: Renier

## D-025 · Private-company equity is recorded and shown, but kept out of score figures until it has a price
- What: grants and shares of a private employer are recorded and shown in the analysis. They are left out of the score figures (net worth, concentration) until there is a market price. Double-trigger RSUs show as "awaiting a liquidity event", with no projected vest dates. A known 409A value is shown with its date, for information only. Options in `06_direction.md` F3-02.
- Why: the score article says a figure Sherpas does not have "is not treated as a zero" and is left out [brief]; a 409A value is a tax value up to 12 months old, not a sale price (R-017), and double-trigger RSUs deliver nothing until the liquidity event (R-011). Excluding private employers would leave the brief's problem unsolved for startup employees.
- Date: 2026-10-05 · Confirmed by: Renier

## D-026 · Unvested grants are future income and future shares by dated tranche, not current net worth
- What: an unvested RSU or PSU is a new grant element whose tranches each carry a date, a share count and their future income. On the vest date a tranche becomes wages for that year and a held position flagged as employer stock; sold shares become cash; forfeited tranches are removed. Unvested value is not counted in current net worth. Options in `06_direction.md` F3-03.
- Why: unvested RSUs are neither income nor an owned asset until settlement (R-001, R-002); advisors model them as future income or a separate entry, not as net worth (V07, V08); counting them now would put in the figures a value that is lost on leaving, against the same logic as D-025.
- Date: 2026-10-05 · Confirmed by: Renier

## D-027 · The vesting schedule is a list of dated tranches, generated from a pattern and editable
- What: a grant stores its schedule as tranches (date, share count). The list is generated from a simple pattern (length, frequency, cliff) and can be edited tranche by tranche. A PSU adds its performance condition and a payout range (0% to 200% of target). Options in `06_direction.md` F3-04.
- Why: filings show cliff, even, unequal and back-loaded schedules (R-009, R-010); a total plus frequency would misstate year-by-year income, tax and concentration; a rule engine is more than an MVP needs. A dated list is also what a plan statement provides.
- Date: 2026-10-05 · Confirmed by: Renier

## D-028 · Vest income and vested shares are counted once
- What: only households that say they have stock pay are asked whether their gross income includes stock that vested this year; vest income is counted once, inside or beside salary, by the answer. Past tranches exist only as held positions; the grant contributes future tranches only. Options in `06_direction.md` F3-05.
- Why: vest value is W-2 wages (R-001), and clients and tools double count it (V06, V38 to V41). Changing the income question for everyone would break D-023.
- Date: 2026-10-05 · Confirmed by: Renier

## D-029 · Each tranche keeps the shares left after withholding and their cost basis
- What: on vest, a tranche records the shares the employee keeps after shares are withheld or sold for tax, and their cost basis (value at vest). Completes D-026. Entry in `06_direction.md` F3-05b.
- Why: net settlement and sell-to-cover leave fewer shares than vest (R-011, V39), so counting all vested shares would overstate holdings and concentration; basis equals the value included in income (R-002), and the questionnaire today loses it for held shares.
- Date: 2026-10-05 · Confirmed by: Renier

## D-030 · Intake: the client gives what they know, the advisor completes the detail
- What: the client answers a yes/no question and, if yes, type, employer, rough unvested value, vest frequency and the D-028 question. The advisor completes tranches through advisor mode and Data & Assumptions. The firm can switch the block off. Document upload of the plan statement is the next route; the model takes a list of tranches so it can feed it. Options in `06_direction.md` F3-06.
- Why: clients know totals, not schedules (A-05); aggregators miss unvested grants (R-013); both advisor routes already exist [FACT: questionnaire_map; brief]; D-023.
- Date: 2026-10-05 · Confirmed by: Renier

## D-031 · The employer and its ticker are asked per person inside the stock-pay block
- What: employer name, and ticker if listed, per person with stock pay. No insider flag; insider rules are listed as considered and not researched. Options in `06_direction.md` F3-07.
- Why: employer exposure needs salary, grants and held shares joined by employer (A-09, R-014); the insider evidence is one signal and one interpretation (V02, V26), with no research entry.
- Date: 2026-10-05 · Confirmed by: Renier

## D-032 · The stock-pay block sits in Income, after gross income
- What: a yes/no question right after the gross income question opens the block. Options in `06_direction.md` F3-08.
- Why: RSU value is pay (R-001); the questionnaire already branches the same way for pension and annuity [FACT: questionnaire_map]; the D-028 question belongs next to income. A-08 remains an assumption.
- Date: 2026-10-05 · Confirmed by: Renier

## D-033 · State withholding is an optional advisor field; the tax gap says when it is federal only
- What: the platform's tax engine computes tax owed on vest income, state included. The advisor may enter a state withholding rate per grant (not mandatory; hidden when state tax is zero). With it, the gap is complete; without it, the gap is federal only and labelled so, and the unknown state part is left out of any score figure. Terms for model, analysis, advisor, client and UX in `06_direction.md` F3-09.
- Why: federal withholding follows a researched rule (R-008); state rules were not researched; a mandatory field would invite a false zero, against the platform's missing-data rule [brief].
- Date: 2026-10-05 · Confirmed by: Renier

## D-034 · Ask once for an advisor demo login, accepting a no as part of the exercise
- What: the message to the hiring manager asks for an advisor login to the demo (no video), saying that if working from the client view is part of the exercise, the work continues as is. Until an answer arrives, advisor-side decisions rest on what the questionnaire definition, the opportunity record, the reports and the score article show (role-based display, advisor mode, firm settings, opportunity alerts, Data & Assumptions), and the deliverable states that the advisor screens were not seen. If access arrives in time, the advisor side is captured with `capture-platform` (pipeline and opportunity, advisor mode, Data & Assumptions, View more and score adjustment, sharing a report) and decisions it contradicts are superseded.
- Why: the brief gives the diagnosis "tal como lo ve el cliente final" [brief], so the client view may be a deliberate constraint; but advisors are the users [brief] and most F4 and F5 advisor-side work depends on screens we have not seen. One question, with the constraint acknowledged, passes the D-020 check.
- Date: 2026-10-05 · Confirmed by: Renier

## D-035 · A reported grant without detail stays out of the figures until the advisor completes it
- What: when a household reports stock pay but the tranches are not complete, the grant is left out of the score and the analysis figures; the analysis says "stock pay reported, detail pending"; the advisor sees an estimate from the client's answers only as a guide. Completing the detail reprocesses the analysis. Options in `06_direction.md` F3-A1.
- Why: the platform's rule for missing figures [brief]; a rough estimate would move the score and the shared report; blocking the analysis would break D-023.
- Date: 2026-10-05 · Confirmed by: Renier

## D-036 · Missing stock-pay detail raises an alert on the opportunity
- What: an alert "stock pay: detail pending" on the opportunity, of the same kind as the existing automatic alerts. In advisor mode the stock-pay block opens the full tranche editor. Options in `06_direction.md` F3-A2.
- Why: the platform already alerts advisors at opportunity level [FACT: captures/questionnaire/02-opportunity]; D-035 only works if the advisor learns the detail is missing.
- Date: 2026-10-05 · Confirmed by: Renier

## D-037 · No vest conversion in the MVP; next, the system proposes and the advisor confirms
- What: the MVP analysis is computed as of a date (past vests are held positions as entered, the grant adds future tranches, D-028). Next: on each vest date the tranche becomes "vested, pending confirmation"; the advisor records kept, sold or forfeited; PSUs wait for certification and double-trigger RSUs for the liquidity event; linked accounts are matched instead of assumed; unconfirmed tranches stay out of the figures. Options in `06_direction.md` F3-A3.
- Why: vesting is automatic only if the employee is still employed (R-002); PSU payout, double trigger, withholding and the decision to sell are not known in advance (R-011, V39, V35, V36); assuming them would show holdings and concentration that may not exist.
- Date: 2026-10-05 · Confirmed by: Renier

## D-038 · Three analyses: employer exposure, tax at vest and its withholding gap, vest proceeds as dated cash
- What: the advisor gets employer exposure, the expected tax at vest with the gap against withholding (D-033), and future vest proceeds as dated cash available for goals. The vest calendar shows as data, with no reminders. Options in `06_direction.md` F3-10.
- Why: each answers an assumption validated in F2 (A-09, A-04, A-10) with data the MVP collects; sell-or-hold and AMT depend on options, out by D-024.
- Date: 2026-10-05 · Confirmed by: Renier

## D-039 · The analyses live inside existing checks and report parts; the score structure does not change
- What: the Investing concentration check recognises employer stock (F3-12); the Liquidity near-term commitments check counts the tax gap of vests within its horizon, leaving out an unknown state part; the report adds bullets, "We should look into" and a recommendation when they apply; future vests appear as dated inflows in the projection; View more says why the score moved. Private equity and grants pending detail do not score. Options in `06_direction.md` F3-11.
- Why: a score that ignored employer stock would mislead (A-09); a new area would change every household's weights, against D-023; existing checks and report parts are already understood by advisors [FACT: platform_map].
- Date: 2026-10-05 · Confirmed by: Renier

## D-040 · The concentration check reads held employer stock summed by issuer, on its existing threshold
- What: the Investing concentration check reads employer exposure: held employer shares (vested, kept after withholding, listed only) summed across all accounts. It keeps its existing scale and threshold. Unvested grants and salary from the same employer show in the report as context, not in the score. Options in `06_direction.md` F3-12.
- Why: FINRA names the double exposure (R-014); measured by holding, employer stock split across accounts would hide; scoring unvested value would contradict D-026; the threshold is a product choice with no rule behind it (R-014), so the proposal reuses the platform's own. Whether that threshold fits a single company is a riskiest assumption.
- Date: 2026-10-05 · Confirmed by: Renier

## D-041 · MVP cut, gaps not researched, and the three riskiest assumptions
- What: the MVP cut, the "Considered, not researched" list and the three riskiest assumptions in `06_direction.md` are confirmed, including four placements not decided before: ESOP never (a retirement plan), RSA, SAR and phantom stock later, personalised tax, exercise or sale advice never, a separate score area never.
- Why: each MVP row comes from a confirmed decision (D-024 to D-040); ESOP is a qualified retirement plan (R-007); restricted stock is granted by few companies and SAR and phantom are often cash-settled (R-006, R-016); the analysis states facts and gaps, advice stays with the advisor (A-04); a new area would change every household's weights (D-023).
- Date: 2026-10-05 · Confirmed by: Renier

## D-042 · The advisor can upload the plan statement in the MVP; extracted tranches need the advisor's confirmation (partly supersedes D-030)
- What: in the MVP the advisor has a second route to complete a grant: upload the equity plan statement; the existing document extraction proposes the tranches; nothing reaches the figures until the advisor confirms them. D-030 stays for the client questions and the manual advisor route; its "document upload next" line is superseded. That extraction reads plan statements is an assumption. The client questionnaire and the placement of D-032 are rechecked when the questionnaire link is reset. Options in `06_direction.md` F3-06b.
- Why: the website shows document upload with custom extraction [web: https://sherpaswealth.com/data-extraction, accessed 2026-10-05]; grant detail lives in documents (V01, V29) and aggregators miss unvested grants (R-013); confirming extracted data follows D-037 and guards against extraction errors. It lowers riskiest assumption 1.
- Date: 2026-10-05 · Confirmed by: Renier

## D-043 · Success criteria live in a product document; the spec carries only the events that measure them
- What: success criteria live in `docs/07_success_criteria.md`, a product document with metric IDs (`M-NN`), each with a definition, window, target and decision rule, plus the pilot design and a weekly readout table for follow-up. The engineering spec (`docs/08_spec.md`) carries only the instrumentation events as EARS requirements, each citing the `M-NN` it feeds; it holds no targets. The pilot runs on 3 to 5 firms that enable the stock-pay block (D-030), read weekly, with a decision every two weeks. The primary metric is proposal conversion and time to proposal for households with stock pay against those without [ASSUMPTION: confirm that conversion is tracked]. Secondary metrics test the three riskiest assumptions and the advisor's value. Advisor corrections tagged as stock pay (score adjustment reasons, edits to generated observations and recommendations) feed the platform's existing learning from advisors. D-023 and firm retention are guardrails, not success criteria. Targets without a baseline are set with Sherpas after the first weekly readout.
- Why: success criteria describe what and why, which belongs in the product document; the engineering spec describes what to build and is checked by tests (product practice: success metrics in the PRD, the tracking plan as "a spec your team builds against" [web: https://www.amplitude.com/blog/create-tracking-plan, accessed 2026-10-05]; jinjin1's PRD and success-metrics templates, credited in `NOTICE`). A proposal cycle runs in hours to days, not months (the website: "8-10 hours" per client before, "20 min" with Sherpas [web: https://sherpaswealth.com, accessed 2026-10-05]), so conversion and time to proposal can be read within a pilot, while retention cannot. The platform already learns from advisors ("Learns your voice" [web: https://sherpaswealth.com, accessed 2026-10-05]) and advisors already adjust the score with a reason [brief] and edit generated observations [web: https://sherpaswealth.com/financial-health], so the signals exist where advisors already work.
- Date: 2026-10-05 · Confirmed by: Renier

## D-044 · The concentration check reads the larger of today's largest position and employer exposure; View more shows both
- What: the Investing concentration check reads the larger of two figures, today's largest-position figure and the largest employer exposure (D-040), on the same base and scale. Whenever the household has employer exposure, View more shows both readings and the pay link, for example "Largest position: VTI 45%. Employer stock (<company>): 30%, and <name>'s pay comes from the same company." Options considered: employer exposure replacing today's figure (it would lower the figure when a fund line is larger) and a new employer-stock check inside Investing (it needs a curve and threshold that are not public, and goes against D-039); the first version of this option left the double exposure invisible when a fund line is larger, so the View more line was added (D-046).
- Why: the figure the check reads can only stay or rise, so nothing the score reads today is removed and a household without employer stock is unchanged (D-023); employer stock split across accounts is read as one position (R-014); the double exposure is shown where the advisor reads the score, without a threshold we do not have [brief].
- Date: 2026-10-05 · Confirmed by: Renier

## D-045 · Unvested value: today's price; performance units at target as the headline, with their range beside it
- What: unvested tranches are valued at today's market price, labelled so. A performance unit tranche shows its target value as the headline figure and its payout range beside it, in screen and PDF alike ("$150K at target (range $0 to $300K)"); in the projection, a line at target and a shaded band for performance unit tranches only. Any score figure that needs a single number uses target, and View more says "performance units counted at target". Households with RSUs only see one number.
- Why: the payout is unknown until certification and ranges from 0% to 200% of target in sample agreements (R-002, R-011), so one number alone hides real uncertainty; the shared PDF is static, so the range is written next to the number instead of behind a tooltip; a score check reads one figure, and target is the figure the award itself names (R-002). No price forecast is invented.
- Date: 2026-10-05 · Confirmed by: Renier

## D-046 · No recommendation when no option solves the problem
- What: when none of the options on the table solves the problem well, no recommendation is made: more options are generated or combined, and each says which gap it closes. Applies to every decision in `decide` and `spec`.
- Why: a choice among three weak options is still a weak choice; D-044's first version showed the cost of recommending too early.
- Date: 2026-10-05 · Confirmed by: Renier

## D-047 · The spec is split into vertical features owned by product; engineering owns the plan and tasks (partly supersedes D-043)
- What: the spec lives in `docs/spec/`: an index (D-023 rule, firm switch, roles, order and dependencies, traceability) and one file per vertical feature, each an advisor outcome that can be tested and released on its own: F-A employer stock in concentration, F-B record a grant and its vests, F-C tax at vest and withholding gap, F-D vest proceeds as dated cash, F-E client reports stock pay, F-F upload and confirm a plan statement. Each feature holds context, EARS requirements with IDs, edge cases, its instrumentation events, what stays out, and an empty "Owned by engineering: plan, tasks" section. The riskiest-assumption tests move to `07_success_criteria.md`. Supersedes the `docs/08_spec.md` path and the single S14 of D-043; the rest of D-043 stands.
- Why: one spec per feature, with independently testable user stories, the what in the spec and the how in an engineering plan, is the documented practice (GitHub Spec Kit, `specs/<feature>/spec.md`, `plan.md`, `tasks.md` [web: https://docs.plannotator.ai/frameworks/github-spec-kit.md, accessed 2026-10-05]; a PRD "frames the what and why, so engineering can propose the how" [web: https://plane.so/blog/how-to-write-a-prd-that-engineers-actually-read, accessed 2026-10-05]); smaller specs get better review; vertical features let separate squads build and release in parallel, and F-A can ship first because it needs no grant model.
- Date: 2026-10-05 · Confirmed by: Renier

## D-048 · A flow and UX review in two passes, to find what the change touches that the case did not consider
- What: a `flow-review` skill, written just before its first use with a dry run, run twice: in F4 on paper, after the feature specs and before `/check F4`; in F6 on the prototype, before delivery. Method: an impact map of every surface and output in `platform_map.md` against every new data element; the path of each new field from entry to display and export; walk-throughs for client, advisor and firm admin with SIMULATED households (no stock pay, RSU only, with PSU, private employer, detail pending, co-client). Every gap ends as a new requirement, as "out" with its decision, or as a decision under D-046. Output: `docs/10_flow_review.md`; its "done when" joins `/check F4` and `/check F6`.
- Why: the decisions were taken one at a time; an impacted screen, figure or shared report that no decision names is a gap that only a cross-check finds, and finding it on paper is cheaper than in the prototype.
- Date: 2026-10-05 · Confirmed by: Renier

## D-049 · Three spec additions: current employer on the flag, one firm setting, a warning before replacing a manual adjustment
- What: (1) flagging a held position as employer stock asks whether it is the person's current employer (yes, no, unknown); the pay line appears only on "yes". (2) One firm setting, "stock compensation", turns every stock-pay feature on or off for a firm, not only the questionnaire block. (3) If the analysis has a manual score adjustment, saving a grant first warns that reprocessing replaces it. Written in `spec/F-A`, `spec/00_index.md` (G) and `spec/F-B`.
- Why: (1) without it, the pay link of D-040 and D-044 would depend on a grant, and F-A would not stand alone (D-047); "unknown" avoids a false link. (2) The pilot of D-043 is enabled per firm, and a household of a firm that has not enabled it must see today's product (D-023). (3) Reprocessing replaces a manual adjustment [brief]; D-033 asked for a notice or release note.
- Date: 2026-10-05 · Confirmed by: Renier

## D-050 · A future vest shows its value after the tax the platform computes, with the value before tax beside it
- What: a future vest shown as cash arriving (F-D) reads "$X after estimated tax ($Y before tax)", where the tax is the one the platform's tax engine computes for that vest (F-C). Shares kept after withholding are not estimated; they are recorded when the advisor knows them (D-029). The exposure line "if every grant vests" stays before tax, labelled "before shares withheld for tax". Options considered: before tax only (overstates the cash available for goals) and net of estimated withholding (FICA withholding not researched, and withholding is not the final tax).
- Why: it introduces no rate we have not researched; the tax owed is complete because the engine computes state tax as well (only state withholding can be missing, D-033); F-C and F-D read the same figures; two figures follow the pattern of D-045.
- Date: 2026-10-05 · Confirmed by: Renier

## D-051 · Six spec additions on income, flags and withholding
- What: (1) when the client says reported income includes this year's vests, no vest income is added for the current year and, from the next year, salary is reported income minus the current year's vest value; (2) "not sure" keeps the grant pending detail, with an advisor notice; (3) a held position with the employer's ticker is suggested for the employer flag, flagged only when the advisor confirms; (4) federal withholding is estimated at 22%, 37% above $1 million, and labelled; (5) FICA owed is shown outside the gap until FICA withholding is researched; (6) a 0% state rate entered by the advisor is data, unlike an empty field. Written in `spec/F-E` (AC-E-11, AC-E-13, AC-E-17, AC-E-18) and `spec/F-C` (AC-C-05, AC-C-14, EC-C-04).
- Why: (1) and (2) apply D-028 without counting vest income twice and the missing-data rule of D-035; (3) follows the "propose, confirm" pattern of D-042; (4) R-008; (5) no researched fact supports a FICA gap (asked in `02`); (6) D-033 separates a known zero from an unknown.
- Date: 2026-10-05 · Confirmed by: Renier

## D-052 · Existing households: unchanged until the advisor adds stock pay; asking them proactively comes after the MVP
- What: turning the firm setting on changes no existing analysis until the advisor adds a flag or a grant; the advisor completes existing households through advisor mode and Data & Assumptions (F-A, F-B, F-F). After the MVP: asking existing clients the stock-pay question without the full questionnaire, suggesting households that hold single stocks, and year-by-year follow-up (D-037). Written in `spec/00_index.md` (AC-G-08, AC-G-09).
- Why: the questionnaire link is single use [brief] and whether an advisor can resend it or one question is unknown (asked in `02`); the advisor routes already exist [brief; FACT: questionnaire_map]; D-023 holds because nothing moves without new data.
- Date: 2026-10-05 · Confirmed by: Renier

## D-053 · Flow review becomes its own phase; phases renumbered F0 to F7 (amends D-048)
- What: F4 spec closes with its own check and gate, without the flow review. Phases are now F0 setup, F1 understand, F2 discovery, F3 decide, F4 spec, F5 flow review (pass 1 of D-048, on paper), F6 prototype and tests (the former F5), F7 delivery (the former F6, with pass 2 of D-048 before delivery). Earlier entries keep their wording; where they say F5 for the prototype or F6 for delivery, read F6 and F7.
- Why: the flow review has its own skill, output and "done when", so it earns its own gate; closing F4 now commits the spec instead of leaving it uncommitted; gaps the review finds go back to the spec and the log, as D-004 already foresees.
- Date: 2026-10-05 · Confirmed by: Renier
