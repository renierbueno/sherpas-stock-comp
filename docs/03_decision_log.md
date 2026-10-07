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

## D-054 · This year's checks read reported income; vest income shows beside them, not in them
- What: savings rate, fixed commitments, debt-to-income, housing ratio, the life cover need, the Social Security estimate and contributions read reported income as today. Vest income is used for the tax on each vest (F-C) and for the projection (F-D), and shows beside the checks: a Savings & Expenses bullet, a line under the cash flow statement total, and in View more "Savings rate and debt ratios read reported income; vests are shown separately." Options in `10_flow_review.md` GAP-02: adding this year's vest income to the checks (the savings rate falls for having stock pay) and also counting after-tax proceeds as savings (assumes the client keeps or invests them, against D-037).
- Why: for a household whose reported income already includes its vests (D-028 "yes") nothing changes; for the others the vest is visible and labelled without moving the score on a price and a sale decision nobody knows yet; it settles GAP-01, GAP-03 and GAP-05 with one rule, without knowing the platform's internals.
- Date: 2026-10-05 · Confirmed by: Renier

## D-055 · The Investment analysis tab and its PDF state employer stock held across accounts
- What: the snapshot of the Investment analysis tab and its PDF add the employer exposure line of AC-A-14; purpose buckets, targets and the proposal do not change. Options in `10_flow_review.md` GAP-11: leaving the tab as today (the two tabs disagree when employer stock is split across accounts) and feeding the concentrated stock bucket and its trimming plan (changes the proposal and its advice, outside the MVP cut).
- Why: the investment analysis PDF is the report advisors share today [FACT: platform_map, 06-reports]; one fact line keeps both tabs and both PDFs consistent without touching the proposal engine.
- Date: 2026-10-05 · Confirmed by: Renier

## D-056 · The client reports stock pay with a "Stock compensation" income chip, not a separate yes/no (supersedes the placement of D-032)
- What: among "other current income", a "Stock compensation" chip opens a row in the native style (owner, approximate unvested value, vesting frequency) plus employer, ticker, type and the D-028 question; one helper line under the employment income field points to it. Households without stock pay see no new question. The client fields of D-030 and D-031 and the D-028 question stand. Options in `10_flow_review.md` GAP-25.
- Why: the Income screen seen on 2026-10-05 adds every extra income type as a chip that opens a row with owner, amount and frequency, and the platform's frequencies include quarterly and twice a year [FACT: questionnaire_map, 2026-10-05]; a chip keeps the questionnaire unchanged for everyone else (D-023, GR-01); the helper line answers the risk that a chip is easier to miss than a question.
- Date: 2026-10-05 · Confirmed by: Renier

## D-057 · The client can also upload the plan statement, through the questionnaire's documents step (amends D-042)
- What: the stock compensation row asks the client to upload the plan statement if they have it, in the existing documents step; the upload enters the same proposal and advisor confirmation as the advisor's upload (F-F). Nothing reaches the figures until the advisor confirms. D-042's "client questionnaire: not chosen" is superseded; the rest of D-042 stands. Options in `10_flow_review.md` GAP-26.
- Why: the questionnaire already has a documents step and per-account statement upload, and uploads go to a context the app classifies and prefills from [FACT: questionnaire_map, 2026-10-05]; detail that arrives with the questionnaire shortens the time to complete a grant (M-02); D-042's confirmation guard is unchanged; it still depends on riskiest assumption 1, as the advisor route does.
- Date: 2026-10-05 · Confirmed by: Renier

## D-058 · The spec maps onto the platform's existing stock compensation categories; a PSU is an RSU with performance terms
- What: the platform's type lists already hold a stock compensation asset category (RSU, non-qualified option, incentive option, ESPP) and a stock compensation income category (RSU, ESPP and option inflows), unused in the questionnaire. A grant is an element of the stock compensation asset category, sub-type RSU; a PSU is an RSU with its performance terms (condition, end of period, payout range), which the lists do not hold; vest income is the RSU inflow of the stock compensation income category; shares already held stay positions. D-026 holds: unvested value stays out of net worth. Options and ESPP stay out of the MVP (D-024, D-041). Works on [ASSUMPTION: the analysis does not use these categories today; if it does, the mapping holds and only the net worth treatment of D-026 needs checking]. Options in `10_flow_review.md` GAP-27.
- Why: found on 2026-10-05, after the spec (F4) was written and committed, by reading the platform's type lists [FACT: questionnaire_map, data_model]; reusing the platform's own taxonomy lowers the build cost and gives vest income a native cash flow line; the lists name the instruments but hold no grant, schedule, tax or score logic, which is what the spec adds; a PSU is taxed and settled like an RSU (R-002).
- Date: 2026-10-05 · Confirmed by: Renier

## D-059 · No more questions to Sherpas; every open question becomes a stated assumption with a fallback (amends D-020)
- What: no further questions are sent to Sherpas, and none are left for the follow-up session. Each open question in `02_open_questions.md` "For Sherpas" becomes an assumption the work proceeds on, with what changes if it is false. D-020's check still applies to deciding whether an unknown matters.
- Why: working with ambiguity is part of the exercise; Sherpas confirmed the exercise is worked from the client side only [brief, §4]; a stated assumption with its fallback lets the proposal stand on its own.
- Date: 2026-10-05 · Confirmed by: Renier

## D-060 · Flow review pass 1: small gaps resolved as proposed
- What: GAP-04, GAP-06 to GAP-10, GAP-12 to GAP-24 of `10_flow_review.md` are resolved as written there: shared lines read the same live and in the PDF; new findings can become Summary recommendations; the grant section lives in Assets & Investments; each vest counts once in the projection; advisor notices never reach the client view or PDF; every stock-pay save warns about a manual adjustment; turning the setting off keeps the data and hides it; the question goes into any Financial Health template [ASSUMPTION: confirm]; when a grant is complete; the income question in the grant editor; a grant without a market price; the $1 million rule per person and employer; labels name the price date; an employer stock tag on holdings; no new score limit; pending detail never blocks; where the flag is set; the private-shares edge case. GAP-23 closes with D-056 (owner selector).
- Why: each is a gap between confirmed decisions and the screens, figures or flows they touch; none changes a decision.
- Date: 2026-10-05 · Confirmed by: Renier

## D-061 · The prototype is not deployed in F6; it is built as a static site so a password-protected deploy stays possible in F7 (settles D-008's timing)
- What: in F6 the prototype runs locally; the pull request carries screenshots and the video shows it. It is built as static files any host can serve. Whether to deploy, behind a real password (D-008), is decided in F7 with the prototype in front of us. Options: deploy now behind a password (Sherpas tries it in one click, but needs an account set up and an outward-facing step), never deploy (reviewers must clone and run it).
- Why: no confidentiality exposure while it is being built; keeping it static costs nothing and leaves the deploy option open.
- Date: 2026-10-05 · Confirmed by: Renier

## D-062 · Prototype stack: Vite, React and TypeScript; Vitest for unit and component tests; one Playwright end-to-end test
- What: the score simulator and the household model are a TypeScript module with no UI. Vitest runs the simulator's unit tests (relations per feature) and component tests that render each screen without a browser and assert its text and states. Acceptance criteria marked `e2e` in the spec are proved by a component test on the rendered screen, or by the single Playwright test, which walks H2 in a real browser from the client questionnaire to the advisor and the shared view. The Test column names which. Options: one browser test per `e2e` criterion (about 95 walks, does not fit the timebox), plain HTML and JavaScript (screen states harder to test).
- Why: component tests check the same rendered text and states as a browser walk, at a fraction of the time; one real-browser walk proves the screens connect.
- Date: 2026-10-05 · Confirmed by: Renier

## D-063 · Prototype scope: all six features as vertical slices; what is SIMULATED and what stays in the spec only
- What: every `unit` criterion is built in the simulator. Screens are built for what the SIMULATED households H1 to H7 touch: the Income chip and row, the grant editor and the employer flag, the analysis sections that change, View more, the client view against advisor mode, and the shared PDF as a print view of the same lines. SIMULATED and labelled: the households, market prices, a simplified tax engine (brackets are not in `research.md`; the platform's engine is not public), the values of the `P-` parameters, the score areas and figures the change does not touch, and the extraction of F-F (a fixed result per sample document). Spec only, with the reason in the traceability table: the firm settings screen (a switch in the prototype), the opportunity record (a badge in the prototype) and the Investment analysis tab (its one new line only).
- Why: the calculations are cheap and are where the spec's precision is tested; screens are costly, so they cover the paths the walk-throughs use. Options: F-A to F-D only (leaves out how the client's data enters), every criterion on screen (does not fit the day).
- Date: 2026-10-05 · Confirmed by: Renier

## D-064 · Prototype look: faithful only where the change lands
- What: the surfaces the change touches (top bar and tabs, hero, the affected analysis sections, "We should look into" boxes, the View more side panel, the questionnaire Income step, the advisor editors) imitate the platform from `design_tokens.md`, with screenshots as visual reference only, in our own code (D-012, D-015). Surfaces that do not change show as a grey block "Unchanged, as today". Options: imitate every section (hours on screens with nothing new), a neutral wireframe (hard to see the fit with the platform).
- Why: keeps the reader's eye on what is new and the build inside the day.
- Date: 2026-10-05 · Confirmed by: Renier

## D-065 · The prototype explains itself: a "Start here" page with guided scenes, a before/after switch and "New" marks
- What: the prototype opens on a "Start here" page: the problem in three lines and five scenes, one per idea (employer stock in two accounts, a grant that vests, the withholding gap, vests that fund a goal, the client reports stock pay). Each scene says what to look at, has a before/after switch, and marks every new line "New" with a link to its requirement in the spec. The prototype controls (household, view, firm setting) move to an "Explore freely" panel after the scenes. The video follows the same scenes. Options: only the before/after switch and "New" marks (no entry point: a reader still does not know where to start); the prototype as it is plus the README and the video (a reader who opens the link without the video understands nothing).
- Why: the prototype will be opened by people who did not build it, without a guide, and shown in a video of three to five minutes; each scene answers "what changed and why it matters" in under a minute.
- Date: 2026-10-05 · Confirmed by: Renier

## D-066 · Build gaps GAP-28 and GAP-29 resolved as proposed
- What: GAP-28: a new parameter `P-AREA-MIX`, how the check scores of one area combine into its points; not public, SIMULATED as equal weights [ASSUMPTION: confirm]. GAP-29: with employer stock in one account, AC-A-14 reads "<Company> stock held in 1 account: $<value>, <Y>% of investable assets." Options in `10_flow_review.md` pass 2: other invented weights (pretends a number we do not have); dropping the account count (loses the fact that matters when holdings are split).
- Why: the simulator's tests are relations (for example, flagging employer stock never raises the score), which hold for any positive weights, so equal weights change no conclusion; the count of accounts is the point of the line.
- Date: 2026-10-05 · Confirmed by: Renier

## D-067 · F6 cut order, with a time limit of 23:00 on 2026-10-05
- What: built in this order: (1) the simulator and unit tests of all six features; (2) screens and component tests of F-A, F-B and F-C, each with its scene (D-065); (3) the end-to-end walk of H2; (4) screens of F-D, F-E and F-F. What is not built by the limit is marked "spec only" in the traceability table with its reason.
- Why: the calculations are where the spec's precision is tested and cost little; F7 (proposal, video, delivery) must keep its morning.
- Date: 2026-10-05 · Confirmed by: Renier

## D-068 · A private employer's grant is "Awaiting a liquidity event" with or without vest dates (GAP-30)
- What: AC-B-19 applies to every grant of a private employer, whether or not the advisor entered vest dates; it stays out of every figure (AC-G-05). Option in `10_flow_review.md` pass 2: leaving it "pending detail", which shows the client "<Name> reported pay in <company> stock. It is not yet included in these figures." for a grant the advisor entered in full.
- Why: a private RSU usually needs a liquidity event as well as time to settle (R-011, double trigger); the status and the line the client reads should say that, not that detail is missing.
- Date: 2026-10-05 · Confirmed by: Renier

## D-069 · Per-vest tax lines: where they show and how they read (GAP-31)
- What: new AC-C-29. The tax owed by level, the gap and the PSU range of each vest show in a collapsible "Tax on each vest" in Savings & Expenses, after the per-year bullets (AC-C-23), one group per vest, with the labels written in AC-C-29. Option in `10_flow_review.md` pass 2: one line per vest in the per-year bullets (ten or more lines in the section most clients read first).
- Why: F-C required the figures but quoted no label and named no surface; collapsing them keeps the per-year bullet as the reading line and the detail one click away, and every label still names the price date (AC-G-15).
- Date: 2026-10-05 · Confirmed by: Renier

## D-070 · One flag suggestion per employer, naming every account (GAP-32)
- What: AC-E-17 shows the advisor one suggestion per employer the client gave: "<Company> (<ticker>) is held in <accounts>. Flag as employer stock?"; flagging stays one position at a time, after the advisor confirms (AC-E-18). Options in `10_flow_review.md` pass 2: one suggestion per position (near-identical notices when shares sit in several accounts), only highlighting the positions in the holdings list (missed if the advisor does not open it).
- Why: one notice states the whole fact, including that the shares are split across accounts, which is the problem F-A solves; confirmation per position keeps D-042's guard.
- Date: 2026-10-05 · Confirmed by: Renier

## D-071 · Each scene shows its inputs and its calculation; a page states how we know the model works, from the last test run
- What: each guided scene adds "The household" (the inputs: positions and values, the grant and its schedule, the tax profile, the rows that matter highlighted) and "How it is computed" (the calculation with its numbers and the requirement it follows). A page "How we know it works" is generated from the last real run of the tests, with its date: each requirement, its tests and whether they pass, the simulator relations, and what the tests prove (the prototype does what the spec says) and do not prove (that Sherpas' unpublished curves and thresholds match the SIMULATED ones). Options: only the inputs (the proof stays inside the repo); telling it in the video and the README (a reader who opens the link alone sees no proof).
- Why: a reader without context cannot follow a figure without its inputs, and cannot trust a model whose tests they cannot see; generating the page from the run keeps it from being an assertion.
- Date: 2026-10-05 · Confirmed by: Renier

## D-072 · Before reworking the prototype, map the platform's own flows in Miro and overlay the feature on them
- What: the rest of F6 runs in steps. (0) Save the built work and log the review findings as gaps (GAP-34 to GAP-38). (1) Draw the platform's flows as they are today in Miro: the client questionnaire, step by step, and the advisor's analysis and sharing. (2) Overlay the feature on those flows: each touchpoint marked new, changed or unchanged, with its requirement and the screen or scene that shows it. (3) Review coverage (every requirement has a place in a flow) and fit (nothing breaks, no extra friction, no feature in the wrong step); decide GAP-33 to GAP-38 there. (4) Spec changes, each as a decision. (5) Rework the prototype. (6) Review prototype and model against the flows. (7) Close F6. The prototype is a full part of the delivery and is built to that standard. Options: rework the screens straight from the feedback (fast, but checks each screen alone, not the feature across the flow); review flows only in the docs (no shared picture to review the prototype against).
- Why: the first review of the prototype found a questionnaire row with fields no other Income row asks for, a documents step in a place the platform does not use, and scenes ordered by feature rather than by what happens first. All three come from building screens before checking them against the platform's flows. Miro is the thinking board in every phase and was not used in F6.
- Date: 2026-10-06 · Confirmed by: Renier

## D-073 · The flow review maps every screen line by line and sorts what falls outside the main flow
- What: the flow review adds a step between surfaces and the impact map: every element a person sees or uses on each captured screen (card, figure, chart, generated paragraph, recommendation, field, button, notice, alert, PDF page) gets a row `TP-SFNN-nn` under its surface, walked in the order of the platform's own flow, saying whether it was seen or inferred, whether it is unchanged, changed or new and why, and what covers it. Each affected touchpoint is sorted: A, main flow in the prototype (requirement and test); B, in the MVP but not in the prototype (requirement, marked as not shown); C, outside the main flow (flagged on the board with a possible solution, its assumption and when); serious issues (a wrong figure, an advisor-only line reaching the client, data lost, legal or consent) are fixed at once. `docs/10_flow_review.md` stays the source of truth; the board mirrors it. This is step (1) of D-072 done at the level of single lines. Options: keep the review at section level (it missed the generated paragraphs and the asset breakdown); inventory only the screens the prototype shows (leaves the advisor and secondary flows unchecked).
- Why: reviewing whole sections hid elements the change reaches, such as the generated narrative of each section; a line-level pass over the captured screens is the only way to say that every touchpoint was considered, and sorting by likelihood and impact keeps it from turning into designing every theoretical case.
- Date: 2026-10-06 · Confirmed by: Renier

## D-074 · Every figure read from the projection includes future vests after tax (GAP-43)
- What: with a complete grant of a listed employer, the projected line and every figure read from it (net worth at retirement, end of plan, retirement shortfall, share of retirement income covered, age when liquid assets run out, extra saving needed) include future vests after estimated tax, labelled "includes future vests after estimated tax, at the <analysis date> price", and "at target" with performance units. A check that counts income not dependent on markets does not count vests. Written as AC-D-11. Checked before writing: no score check reads the projection for a household still building wealth; double counting is already prevented (AC-D-10, AC-E-11); grants pending detail and private grants stay out (AC-G-04, AC-G-05). Options in `10_flow_review.md` GAP-43: vests only as markers beside an unchanged line (hides cash the client will receive and conflicts with D-039); two lines, with and without vests (clearer, but adds a second line to a chart the platform owns).
- Why: D-039 and D-050 already put vests in the projection as dated cash after tax, and the prototype raises the line; the figures on the same screen must tell the same story. The platform already projects other future income, such as Social Security and pensions.
- Date: 2026-10-06 · Confirmed by: Renier

## D-075 · The platform's written paragraphs treat employer stock and vests as they treat other holdings (GAP-42)
- What: the paragraphs each section opens with, and the score explanation, use the facts of the new lines the way they use other holdings and figures today, never contradicting them and without advice (AC-G-06). Written as AC-G-17. The prototype shows them as fixed text, not generated. Options: leaving the paragraphs untouched (they could contradict the lines below them); writing new paragraphs for stock pay (a second voice in a report the platform writes).
- Why: the platform's paragraphs already name single positions, for example "the $450,000 VTI position is your clearest concentration point" [FACT: captures/client/01-financial-health]; keeping that logic adds no new pattern.
- Date: 2026-10-06 · Confirmed by: Renier

## D-076 · The stock compensation row is a row like every other income chip (GAP-34; amends D-031)
- What: the row the "Stock compensation" chip opens has the same fields as every other chip row: the employer in the name field, the owner, and an optional approximate amount with the frequency set to "per year" by default. It no longer asks for the ticker, the award type, the vest frequency, the question whether the employment income includes this year's vests, or a plan statement. The advisor completes all of these in the flow that exists (advisor mode, Data & Assumptions, plan statement): the income question is asked in the grant editor only (AC-B-29), and the ticker and type are entered there. Changes AC-E-03 to AC-E-05, AC-E-11 to AC-E-13, AC-E-16, AC-E-19 and AC-B-29; replaces the client part of D-030 and D-031 (employer and ticker asked of the client). Checked before writing: no score figure changes, because a reported grant was already pending detail until the advisor completes it (D-035); the flag suggestion (AC-E-17) still works once the advisor gives the employer's ticker. Options: keeping the richer row (more input, but a pattern no other row uses and questions clients cannot answer, A-05); an amount per vest with its frequency (fits the widget literally, but cliffs, unequal tranches and the share price make a per-vest amount unknowable for most clients).
- Why: the questionnaire must add stock pay without adding a new pattern or friction; clients know totals, not schedules (A-05), and the amount is a client estimate never used in the figures (AC-E-14). Vests are mostly monthly, quarterly or yearly (R-009), and the widget already offers those frequencies [FACT: questionnaire_map], but the schedule comes from the advisor or the statement.
- Date: 2026-10-06 · Confirmed by: Renier

## D-077 · A client's plan statement goes in the existing documents step; a category of its own is for after the MVP (GAP-35)
- What: no upload prompt in the Income row. A plan statement the client uploads goes in the documents step, which comes first in the questionnaire, under "Investment & retirement accounts", the closest of its eight categories; otherwise the advisor asks for it and uploads it (D-057). After the MVP: a "Stock plan statements" category in the documents step. Options: a link from the row back to the documents step (breaks the row pattern and sends the client backwards); a new category now (clearer, but the client meets it before saying they have stock pay).
- Why: no step of the client flow changes; the advisor route already exists.
- Date: 2026-10-06 · Confirmed by: Renier

## D-078 · Confirming a plan statement completes the grant the client already reported (GAP-33)
- What: when the advisor confirms a proposed grant with the same owner and employer as a grant pending detail, the proposal completes that grant instead of adding a second; the client's estimate and the date it was reported are kept; any further grant in the same statement is added as new. Written as AC-F-14, with EC-F-07 and EC-F-08. Checked before writing: the alert and the pending line follow the existing rules (AC-E-09, AC-E-10); duplicates by employer and grant date between complete grants still follow AC-F-09; no figure changes other than the grant becoming complete. Option: leave both grants and let the advisor delete the pending one (the client keeps reading "not yet included in these figures" until someone notices).
- Why: the questionnaire and the statement describe the same grant; keeping one record avoids a stale alert and a stale line in what the client reads.
- Date: 2026-10-06 · Confirmed by: Renier

## D-079 · A plan statement is processed the same way wherever it is uploaded (GAP-46)
- What: a plan statement uploaded to the opportunity's documents, where advisors upload documents today, is processed as one uploaded in the grant editor: proposals the advisor confirms (AC-F-02 to AC-F-12). Written as AC-F-15. With AC-F-01 (grant editor) and AC-F-13 (client documents step), every upload point is covered. Option: only the grant editor, said in the enablement material (a statement uploaded the usual way would be silently ignored).
- Why: the platform already classifies uploads to the opportunity [FACT: questionnaire_map, 2026-10-05]; advisors should not need to learn a second place to upload.
- Date: 2026-10-06 · Confirmed by: Renier

## D-080 · The first release is the core loop; the projection and three record-only items come next (F3-13; amends D-038, D-039, D-041, D-074)
- What: option B of F3-13 in `06_direction.md`. The first release covers employer stock in concentration (F-A), the client's Income chip (F-E), grants and vests (F-B), plan statements (F-F) and tax at vest (F-C), with F-D as text lines only (vests after estimated tax per year, "Vests before <goal>"). Next: the projection change and every figure read from it (AC-D-01, AC-D-03, AC-D-04, AC-D-10, AC-D-11, so D-074 applies from that release), the 409A display (AC-B-20, AC-B-21), cost basis on a flagged position (AC-A-03) and shares kept per tranche (AC-B-14); no figure of the first release reads them. Releases: F-A first (it needs no grant), then the rest as one release, not grants alone. Before building: run the three test cards of `07_success_criteria.md` (extraction on 10 plan statements, the concentration threshold, reach from Sherpas' own data) and five interviews with advisors of the pilot firms, because no public voice of Sherpas' customers confirms the demand and the brief does not say who raised it. Changes, in part: D-038 (the third analysis ships as text lines), D-039 (vests in the projection move to Next), D-041 (MVP cut rows), D-074 (applies from Next), and the release and pilot order (D-043, D-047). Unchanged: every other decision, and every rule of G. Requirements stay in the spec; the ones for Next are listed in `spec/00_index.md`. Options: A, exposure first (about 40% to 45% of the scope, but leaves out tax at vest, the strongest validated pain, A-04); C, everything at once (the full picture, but the most client-facing figures change on the weakest evidence, and a pilot of weeks cannot check them).
- Why: it is the smallest scope in which the model is whole for advisor and client: the client reports stock pay, the advisor completes it with one review, vest income is counted once, and concentration and tax at vest reach the score and the shared report through two existing checks. Tax is the only domain named in Sherpas' public use of funds ("decision frameworks across retirement, tax, investment and risk planning") [web: https://www.privatebankerinternational.com/news/ai-wealth-tech-firm-sherpas-seed-round/, accessed 2026-10-03], and the build uses what the platform already does: the questionnaire, document extraction and the generated analysis. The projection waits because a vest is wages (R-001), vests often fund near-term goals (A-10), and how the platform projects wages is not known; the retirement figures are the ones the client reads most and the slowest to verify.
- Date: 2026-10-06 · Confirmed by: Renier

## D-081 · The rest of F6 is rebuilt around the first release (replaces D-072)
- What: steps 0 and 1 of D-072 are done (built work saved, flows mapped and inventoried, D-073 to D-080). The rest of F6 runs in these steps, each ending with `npm run check` and Renier's OK. F6.2 · Options story: F3-13 written as the spine of the delivery (three options, how they were judged, the choice and what each would need), mirrored in Miro, the change maps recoloured for D-080, the pilot metrics set per release, "who asked for it" stated as an assumption with its fallback. F6.3 · Open decisions: the advisor's workload, then GAP-36 to GAP-41, GAP-44, GAP-45 and GAP-47, one at a time. F6.4 · Spec pass: every document states the current scope in place, with no addenda: the MVP cut of `06_direction.md` as one table, the release line of each feature, a Next marker in each Next requirement, AC-C-01 and AC-E-11 split, amendment markers in this log, the glossary. F6.5 · Prototype to the first release: intake (D-076, D-077), extraction (D-078, D-079), Next labels, scenes in the order of the flow, tests and evidence. F6.6 · Close F6: README files, traceability, `/check F6`, gate commit on main. F7 then runs as planned (flow review pass 2, Notion, Miro, video, PR), adding the non-obvious impacts (privacy and consent for plan statements, data kept when a firm turns the setting off, compliance review of shared tax lines, accessibility) and whether the prototype is deployed (password-protected if so). Each step has what must ship and what can wait, because delivery is 2026-10-07. Options: keep D-072 as written (its steps predate D-080 and would rework screens for a scope that changed); rebuild only the prototype (the docs would keep describing the old scope beside the new one).
- Why: D-080 changed the first release after most of the spec, docs and prototype were written; working through it as one ordered pass (decide, then spec, then prototype, then deliverables) is the way every document ends up stating the same scope, and nothing found in the review is left without a step.
- Date: 2026-10-06 · Confirmed by: Renier

## D-082 · The three options are presented as gates, criteria in words, and what would change the choice (F3-13)
- What: F3-13 in `06_direction.md` judges the options with three pass or fail gates (sound model; nothing changes for households without stock pay; the default path reaches the client without the advisor typing grants), then five criteria compared in words with their evidence (impact, what the pilot learns, fit with the platform, effort, risk of a wrong figure reaching the client), a rule (impact decides between options that pass the gates; learning and risk break ties) and, for each option not chosen, the signal that would make it right. The same structure feeds the Miro board, Notion, the PR and the video. Options: the gains and costs table alone (no written criteria, so "by what measure?" has no answer); weighted scores with a sensitivity check (the weights would be opinion shown as a number, and the evidence says which option is stronger on each criterion, not by how much).
- Why: the brief values what is left out and why as much as what is in [brief]; saying what would bring each left-out option back answers that directly, and every cell carries a source.
- Date: 2026-10-06 · Confirmed by: Renier

## D-083 · Three orders for three audiences: deliverables in product order ending with the spec, the video in the brief's order, the session prepared privately
- What: a `deliver` skill and `docs/11_storyline.md` fix the order of what Sherpas reads or watches. The deliverables (Notion, the Miro board, the repo) follow the product process as a product manager works: context and problem, research, discovery, options and decisions, how we will know, launch, what the change touches, and last the spec, which is what engineering receives, with the prototype as its reference implementation. The video, the output of the exercise, follows the brief: what we propose, why, what is left out, the process, with the deliverables shown only as support. The 30-minute session is prepared privately. Every code a reader meets sits next to a plain label. Options: one answer-first storyline for everything (the video's order would hide the product process the deliverables should show); the brief's order for everything (the spec would not end the chain engineering receives).
- Why: the exercise is treated as real work: the deliverables show the work in the order it is done and hand over a spec, and the video answers what the brief asks [brief].
- Date: 2026-10-06 · Confirmed by: Renier

## D-084 · Notion is the product home; the repo is engineering's home (amends D-004)
- What: the Notion page holds what the company reads: the proposal (in the role of a PRD), the spec by feature, the success criteria, the release notes, the enablement material, a short page of key decisions, and links to the Miro board, the pull request and the video. The repo holds what engineering builds and checks against: the prototype, the tests, the spec as the file each test traces to, the full decision log, the harness and the history. Engineering gets the spec in Notion, where each requirement keeps its ID, and the pull request, where each ID links to its test; how to build it stays engineering's call (D-004). Notion is still filled once, at the end, from the repo (D-011), and says which commit it was built from. Options: the repo as the only home, with Notion as a copy (product, sales and customer success would have to read GitHub); everything in Notion (tests could not point to a requirement, so the trace breaks).
- Why: the brief offers the Notion page "para trabajar, crear lo que consideres y enlazar lo que hagas fuera" [brief], which is a hub that links outward; a definition belongs where the company reads it, and code where engineering works.
- Date: 2026-10-06 · Confirmed by: Renier

## D-085 · The Miro board shows what was found and how the decisions fit; the full content stays in the repo (amends D-011)
- What: the board carries findings, the flows today and with the feature, the options, and how decisions connect, each card short and pointing to the file in the repo that holds the detail. It does not copy documents. Options: the full content on the board (a second copy that drifts from the repo); no board at all (the brief asks to use tools to show how we think [brief], and the flows are easier to review drawn).
- Why: the board is for seeing and thinking; a second full copy would drift from the repo.
- Date: 2026-10-06 · Confirmed by: Renier

## D-086 · The prototype is published only if Sherpas cannot open it privately (amends D-004 and D-008)
- What: the private routes come first: the shared private repository, run locally or in a browser-based development environment opened from it. Only if none works for Sherpas is it deployed, and then behind a password (D-008). Decided when F6 closes. Options: deploy behind a password from the start (a confidential imitation on the open web, even if gated); video only (Sherpas could not try the flow themselves).
- Why: everything seen on the platform is confidential [brief], and the prototype imitates its interface.
- Date: 2026-10-06 · Confirmed by: Renier

## D-087 · Living documents state the current state, checked in code
- What: every document except the decision log and the phase checks (which are history) says what holds now. Each assumption in `02_open_questions.md` gets an ID (`AS-NN`) and every assumption tag in the repo cites one; nothing is asked of Sherpas (D-059); no decision replaced in full is cited as current; the README phase table matches the closed checks. `npm run consistency` reports these as warnings until the cleanup of step F6.4 (D-081), and as failures after it. Options: a manual review pass before delivery (the same drift returns at the next change); fixing each document when someone notices (the review found 58 places nobody had noticed).
- Why: the review on 2026-10-06 found 58 places where a document still states an older state; a rule in prose did not keep them in step, a check in code will.
- Date: 2026-10-06 · Confirmed by: Renier

## D-088 · Each release has its own gate; conversion is read, not a gate (F6.2)
- What: `07_success_criteria.md` gives each release a question and a gate with proposed absolute thresholds to continue, change or stop. Release 1 (employer stock in concentration): reach (M-06) and score trust (M-04). Release 2 (the core loop): a new primary, stock pay reached the client (M-07: share of analyses of households with stock pay shared with every grant complete), with a new metric of the advisor's added work (M-08), extraction (M-03) and lines kept (M-05). Conversion and time to proposal (M-01) are read and reported, never a gate in the pilot. A new event, EV-G-01, records each share with the status of each grant. The test cards no longer ask Sherpas: card 2 works on the assumption in `02` and the simulator, card 3 on the platform's own data. Options: one metric set with a release column (conversion stays the gate, and a small pilot cannot read it); one north-star metric for the whole pilot (release 1 has no grants, so it would read zero).
- Why: a pilot of 3 to 5 firms over four to six weeks has too few households with stock pay for conversion to decide [INFERENCE: pilot size, `07`]; each release must answer the question it was built for, and the advisor's work is measured because the platform promises less of it [brief].
- Date: 2026-10-06 · Confirmed by: Renier

## D-089 · The business lens is product work and is cleaned, not hidden
- What: `05_business_lens.md` stays in the repo as the business case: who it serves, why now, what it competes with for resources, how it could be packaged. In step F6.4 every line either cites a public source (`[brief]`, `[web: …]`, `R-NNN`, discovery) or becomes an assumption in `02_open_questions.md`; nothing from private context; the note "not a section of the deliverable" is removed. Options: move it out of the shared repo (the reasoning behind the choice would be missing from what Sherpas reads); keep it as it is (lines that rest on nothing a reader can check).
- Why: the case for building something, and against what else, is part of a product manager's output, and the repo is shared with Sherpas (D-009).
- Date: 2026-10-06 · Confirmed by: Renier

## D-090 · The advisor reviews once and nothing blocks (F3-14, amends D-028 and D-070)
- What: option C of F3-14 in `06_direction.md`. A plan statement gives one review screen with "Confirm all"; nothing read from a document counts until the advisor confirms (D-042 holds). Confirming a grant flags the held shares of its ticker at once, shown with Undo. The income question no longer blocks a complete grant: until the advisor answers, this year's vests are taken as already inside the reported salary, and the figures say so. Spec changes in step F6.4: AC-B-28, AC-B-29, AC-E-13, EC-E-04, AC-E-17, AC-E-18 and one new F-F requirement. Options: keep each confirmation (about four per household, and an unanswered question keeps tax at vest from the client); apply everything by default with Undo (values read from a document would count before anyone checks them).
- Why: it removes confirmations that add no judgement while keeping the platform's flow (the client uploads, the platform reads, the advisor confirms and shares); the default can never count vest income twice (A-06), and a figure it lacks is left out and labelled, as the score already treats missing data [brief].
- Date: 2026-10-06 · Confirmed by: Renier

## D-091 · AI acts where the platform already uses it: reading the plan statement and writing the analysis; no new agent (F3-15)
- What: option A of F3-15 in `06_direction.md`. The client (or the advisor) uploads the plan statement; the platform's extraction reads it into proposed grants; the advisor confirms them (D-090); the analysis text uses the new facts (AC-G-17). If stock pay is reported without a statement, nothing blocks: the grant stays pending and out of the figures (D-035), the statement can be uploaded later wherever documents are uploaded (D-079), and confirming it runs the analysis again (AC-F-06). No agent drafts or sends anything to the client. Never: sell, hold or exercise advice (AC-G-06), reminders on vest dates (AC-B-25). Options: an agent that drafts the request for the missing statement for the advisor to send (no such feature is visible in the platform, and it adds a client message to review); agents across the loop (three new AI outputs in a release chosen to be small).
- Why: keep it simple: the platform already reads documents [web, `01_context.md`], and the flow upload, read, confirm, rerun covers the late statement without anything new.
- Date: 2026-10-06 · Confirmed by: Renier

## D-092 · Employer shares are flagged whatever their source (GAP-39)
- What: the flag applied when the advisor confirms a grant (D-090) covers every held position with that ticker, whether it was typed, came from a linked account or from an uploaded account statement. AC-E-17 is rewritten in step F6.4. Options: only positions typed by hand (shares that arrive by link or statement stay unflagged and concentration reads wrong); leave it for the next release (the advisor flags them by hand in the first).
- Why: concentration depends on whose stock it is, not on how the position arrived.
- Date: 2026-10-06 · Confirmed by: Renier

## D-093 · Stock pay written in the questionnaire chat is proposed through the platform's existing context mechanism (GAP-40)
- What: text the client writes in an "Anything to add" chat goes through the same mechanism the platform already uses for the opportunity's context (documents, meeting notes, CRM records), which classifies information and prefills data [FACT: questionnaire_map]. Where it mentions stock pay, it is proposed to the advisor as a grant pending detail, and the advisor confirms it, as with any proposal (D-090). No new agent (D-091). The requirement is written in step F6.4. Assumption, in `02_open_questions.md`: the chat feeds that context; if not, the enablement material asks advisors to read the chat. Options: nothing new, the advisor reads the chat (depends on the advisor remembering); a new detector that reads the chat and alerts the advisor (a new AI output, against D-091).
- Why: it uses the mechanism the platform already has for what the client tells it, and keeps the advisor as the one who confirms.
- Date: 2026-10-06 · Confirmed by: Renier

## D-094 · The income question excludes company stock; vests always sit beside it (GAP-41, amends D-028 and D-090)
- What: with the firm setting on, the questionnaire's income question reads "Total annual income before taxes, not counting company stock"; the helper line below it points to the Stock compensation chip. Each field means one thing: the reported income never contains stock, and every future vest, including this year's, is added beside it. The advisor is no longer asked whether the salary includes this year's vests: AC-B-29, AC-E-05, AC-E-11, AC-E-13 and EC-E-04 are removed, AC-E-12 becomes the only rule, and AC-B-28 and AC-E-02 are rewritten, in step F6.4. Kept from D-028: past tranches exist only as held positions; the grant adds future tranches only. Kept from D-090: one review with "Confirm all", and the flag applied on confirming a grant; its default answer to the income question goes, since there is no question. For households without stock pay the question means the same, so D-023 holds. Next: the platform's Social Security estimate reads this income per person [FACT: captures/questionnaire/03-fresh/notes.md], while vests are wages for Social Security (R-001), so it could read low for households below the wage base [INFERENCE]; adding vests to that estimate is for the next release. Options: a note in the helper line only, the question unchanged (read less than the question itself, and clients mix up payroll and broker figures, A-06); a question that asks for cash salary only (people would also leave out bonus and commission, which changes every household's analysis).
- Why: one field, one meaning removes the ambiguity at the source instead of resolving it later with a question and a default; the advisor has nothing to check, and every figure that reads the income reads the same thing.
- Date: 2026-10-06 · Confirmed by: Renier

## D-095 · The score article is updated at launch (GAP-44)
- What: the release notes ask for the Help Center article "How is the Financial Health Score calculated?" to be updated with the release, with the proposed text: the concentration check reads employer stock held across accounts as one position, and the liquidity check counts tax due on vests within its horizon. Written in `08_release_notes.md` in step F6.4. Options: leave it, since View more explains the change (the article would contradict the product); update it in the next release (a contradiction during the first).
- Why: the article is how advisors learn what the score reads [brief, section 3]; it is part of the launch, like the release notes and the advisor guide.
- Date: 2026-10-06 · Confirmed by: Renier

## D-096 · Stock pay entered as "Other income" is proposed to the advisor (GAP-45)
- What: an "Other income" row (current or future) whose name mentions stock pay (for example RSU, stock, shares) goes through the same mechanism as the chat (D-093) and is proposed to the advisor as a grant pending detail. Kept simple for the pilot, an edge case: nothing moves on its own; if the row duplicates the grant, the advisor deletes the row, as the advisor guide says. Requirement written in step F6.4. Options: the helper line and the advisor guide only (depends on the advisor checking those rows); the next release (the same, during the first).
- Why: the same pattern as the chat, applied to the other place where the client names income in free text; the advisor still confirms.
- Date: 2026-10-06 · Confirmed by: Renier

## D-097 · The rule for the platform's paragraphs covers the Investment analysis tab too (GAP-47)
- What: AC-G-17 applies to every paragraph the platform writes for the client, including the Investment analysis tab, where it is limited to the employer stock line of the snapshot (AC-A-22). Rewritten in step F6.4. Options: Financial health only (the two tabs could contradict each other); the next release (a possible contradiction during the first).
- Why: the client reads both tabs, and they must say the same about employer stock.
- Date: 2026-10-06 · Confirmed by: Renier

## D-098 · The prototype gaps move to the prototype step (GAP-36 to GAP-38, amends D-081)
- What: GAP-36 (scenes in flow order), GAP-37 (which sections each scene changes) and GAP-38 (the projection chart already exists) are about how the prototype shows the feature, not about the feature; they are resolved in step F6.5, with the prototype, instead of F6.3.
- Why: F6.3 settles the flows and decisions; the prototype is reworked once they are settled (D-081).
- Date: 2026-10-06 · Confirmed by: Renier

## D-099 · Open questions are discussed in the follow-up session, not asked before delivery; assumptions use the discovery IDs (amends D-059)
- What: no question is sent to Sherpas before delivery. Each open question stays an assumption with its fallback in `02_open_questions.md`, and that list is what is discussed with Sherpas in the follow-up session. Every assumption has an ID in the discovery system (`A-NN`): A-01 to A-11 in `discovery/synthesis.md`, A-12 onwards in `02_open_questions.md` with its source; every `[ASSUMPTION]` tag in the living docs cites one, checked in code (D-087).
- Why: the proposal must stand on its own on delivery day, so it works on stated assumptions; the questions behind them are still worth answering together once Sherpas has read it. One ID system for every assumption lets a reader find what each line stands on and what changes if it is false.
- Date: 2026-10-06 · Confirmed by: Renier

## D-100 · A rules table checks every decision, flow, requirement and simulator constant that depends on a US tax or legal rule
- What: `12_stock_comp_rules.md` holds every US tax or legal rule the model applies, one row each (`SC-NN`): the rule, what it applies to, the model figure it changes, its research source and any assumption, signal, tax year, release and the numbers the code uses. Every decision, flow-review gap, spec line and simulator constant that depends on such a rule cites its `SC-NN`. `npm run check` fails when a row cites research that does not exist, has no signal, or is release 1 and WEAK without an assumption; when an `SC-NN` cited anywhere has no row; when a spec, flow-review or decision line from D-100 cites a tax or legal research entry without an `SC-NN`; and when a conflict cites a spec ID that does not exist. `tests/unit/rules.test.ts` checks that the simulator's constants equal the table's values. The decide, flow-review, spec, prototype and check skills each carry one line that applies the table. Five conflicts are left for Renier, listed in the table with the spec lines they touch: the $1 million threshold counts all supplemental pay and the controlled group; the income tax year is the delivery year; FICA withheld can differ from FICA owed; head of household is missing; dividend equivalents are not in the spec.
- Why: a review on 2026-10-06 found the simulator used invented brackets and a wrong Social Security wage base, and five spec lines that primary sources contradict or do not cover. A checked table stops a rule without a source from reaching a figure the client reads.
- Date: 2026-10-06 · Confirmed by: Renier

## D-101 · Each tranche carries a delivery date beside its vest date (conflict (b) of the rules table)
- What: every tranche has a delivery date, prefilled with its vest date and editable by the advisor; the extraction proposes it when the plan statement shows it. Income tax, the per-year bullets, the "delivered this year" line and the Liquidity check read the delivery year; Social Security and Medicare read the vest year (AC-B-32, AC-C-01, AC-C-30, AC-F-16). No extra review step: the advisor confirms it with the rest of the grant (D-090). Edge cases EC-B-18, EC-B-19, EC-C-12 to EC-C-14; EC-C-14 (tax still due on a tranche delivered earlier this year) goes to the option B flow review.
- Why: income tax falls in the year the shares are delivered (SC-02) and FICA when they can no longer be forfeited (SC-03); for most PSUs and for late-year RSUs the two years differ, and a single vest date put the income and its tax in the wrong year. A prefilled field costs nothing when the dates match.
- Date: 2026-10-06 · Confirmed by: Renier

## D-102 · The $1 million withholding threshold counts vests only (conflict (a) of the rules table)
- What: the estimated federal withholding applies 37% above $1 million of vest income per person and employer in the year (AC-C-05 unchanged); bonuses and other supplemental pay are not asked for. The rule's wider scope (all supplemental wages and the controlled group, SC-15) stays as assumption A-55, with edge case EC-C-15.
- Why: the platform stores income as one gross figure with no bonus line [FACT: questionnaire_map]; the case only arises above $1 million of supplemental pay from one employer; and leaving bonuses out errs on the prudent side: withholding reads low and the gap high, never the reverse.
- Date: 2026-10-06 · Confirmed by: Renier

## D-103 · Social Security and Medicare stay outside the gap; the differences are known edge cases (conflict (c) of the rules table)
- What: AC-C-14 is unchanged: FICA owed on each vest is shown, "not included in the gap". Where FICA withheld differs from FICA owed (Additional Medicare by filing status, SC-24; two employers above the wage base, SC-25), the model does not adjust the gap; the cases are recorded as known edge cases EC-C-16 and EC-C-17, and A-53 stays the assumption.
- Why: the only case that creates a payment is a couple with two wages each below $200,000 and above $250,000 combined, and it adds at most about $2,000 to a gap that is typically several times larger (EC-C-01), so it rarely moves the Liquidity check; refunds create no payment.
- Date: 2026-10-06 · Confirmed by: Renier

## D-104 · Head of household is added to the simulator; the spec stays on the platform's tax engine (conflict (d) of the rules table)
- What: the spec is unchanged: tax on each vest is computed by the platform's tax engine with the household's filing status (AC-C-03). The prototype simulator adds the 2026 head of household brackets and standard deduction (SC-11) in step F6.5, each constant tagged and checked by the rules test.
- Why: the platform already stores the filing status [INFERENCE: from captures/client/07-api, `data_model.md`], so only the simulator lacked the status; official 2026 figures exist, and treating these households as single would overstate their tax and gap.
- Date: 2026-10-06 · Confirmed by: Renier

## D-105 · Dividend equivalents stay out of the first release as a known edge case (conflict (e) of the rules table)
- What: dividend equivalents on unvested units are not modelled (EC-B-13, D-041); the rule that they are wages when paid (SC-27) stays WEAK with assumption A-50.
- Why: no IRS text states the rule for RSU dividend equivalents (R-025, SC-27), the amount is small against vest value, and the platform has no dividend data for the employer to compute it.
- Date: 2026-10-06 · Confirmed by: Renier

## D-106 · Vests enter the projection in the first release, as wage income on their delivery date (amends D-080)
- What: the projection with vests and every figure read from it (AC-D-01, AC-D-03, AC-D-04, AC-D-10, AC-D-11) join the first release (release 2). Each tranche enters the projection as a one-time wage income of the stock compensation income category, at its value at vest, on its delivery date (AC-B-32), and the projection treats it as it treats wages; it is not projected as cash savings. Current-year checks still read reported income only (AC-G-16). D-074 applies from the first release. If the projection cannot read such an income (A-62), the projection part waits for Next and the rest ships.
- Why: without vests the retirement figures sit beside vest lines that they leave out, which reads as a contradiction to the client. A vest is wages of the delivery year (SC-01, SC-02), so entering it as wages follows the rule and lets the platform apply its own tax, spending and saving logic; projecting it as savings was a modelling choice with no rule behind it that could make retirement figures read high (vests often fund near-term goals, A-10).
- Date: 2026-10-06 · Confirmed by: Renier

## D-107 · Current-year figures exclude the projection's vest income; tranches delivered this year keep their tax gap until year end (GAP-48, GAP-49)
- What: AC-G-16 now also keeps the Summary income card and the cash flow statement totals on reported income, including the income the projection reads (D-106). A tranche delivered earlier in the current tax year keeps its tax owed and gap in that year's figures, the Liquidity check and the "We should look into" line until year end (AC-C-31), valued at the value at delivery the advisor enters (AC-B-33) or else at the analysis-date price (AC-C-32); AC-B-11 makes that one exception. A-62 now includes keeping that income out of current-year totals.
- Why: found in the dry run of the option B flow review. Entering vests as income for the projection must not inflate this year's income; and an under-withheld vest earlier in the year is a payment due at filing (SC-17) that the analysis knew about and dropped.
- Date: 2026-10-06 · Confirmed by: Renier

## D-108 · A fixed line in the grant review asks the advisor to keep company stock out of the salary on file (GAP-50)
- What: when the advisor confirms a proposed grant or saves a grant, the review shows "Salary on file should exclude company stock. If it includes stock that vested, edit it." (AC-F-17), advisor-only (AC-G-11). It shows every time, reads nothing and stores nothing.
- Why: salaries collected before the new income question (existing households, D-052), from a template without the new wording (A-30) or typed from a W-2, whose wages include vests (SC-01), would count vests twice. A fixed line fixes the source figure without a stored marker or a rule to maintain; the options of a provenance marker, a confirmation that hides the line, or a per-person income question were weighed and set aside for that maintenance or for the extra step D-090 avoids.
- Date: 2026-10-06 · Confirmed by: Renier

## D-109 · A grant stays complete while a tranche is future or delivered this year (GAP-51)
- What: AC-B-28 marks a grant complete with an owner, a type, a listed employer with a ticker, its units, at least one tranche that is future or delivered in the current tax year, and PSU terms for a PSU; the yes or no to the income question is no longer a condition (D-094). EC-B-04 states that tranches delivered this year keep their tax and gap until year end (AC-C-31).
- Why: a grant whose last tranche was delivered this year, or whose remaining tranches were forfeited, had no future tranche, so it was not complete and the tax still due at filing (SC-17) never reached the Liquidity check. Option B, computing that tax whatever the grant's status, would let an unconfirmed grant reach the figures, against D-035 and D-090.
- Date: 2026-10-06 · Confirmed by: Renier

## D-110 · Seven consistency fixes from the option B flow review (GAP-52 to GAP-58)
- What: (1) stock pay in a chat or an "Other income" row is an advisor-only proposal that raises the existing alert and becomes a grant pending detail only when the advisor confirms (AC-E-22 to AC-E-24); (2) every income, cash, goal and chart line reads the delivery date, and only Social Security and Medicare and the "Vested on" prompt read the vest date (AC-B-12, AC-B-23, AC-C-17, AC-C-24, AC-D-03, AC-D-05 to AC-D-07); (3) a tranche delivered this year shows in the year's bullet, the cash flow line and "Tax on each vest", labelled with its value on delivery when entered (AC-C-23, AC-C-26, AC-C-29, AC-C-32); (4) the projection uses the per-vest tax of F-C (AC-D-10); (5) the automatic flag sets person = grant owner and current employer = yes, editable (AC-E-17, AC-E-18, which also state D-090 and D-092); (6) the $1 million test counts by delivery year, tranches delivered earlier that year included (AC-C-05); (7) AC-G-17 covers projection figures with their label.
- Why: each line followed from D-090 to D-109 but the spec still read the earlier rule, so the same vest could appear in two years, with two tax figures, or reach the client before an advisor checked it (SC-02, SC-03, SC-15, SC-17).
- Date: 2026-10-06 · Confirmed by: Renier

## D-111 · In the first release only Sherpas turns the firm setting on and off; turning it off tells advisors to check the salary (GAP-59)
- What: during the first release the firm setting stays per firm (D-030), but only Sherpas changes it, for the pilot firms it chose (D-043); firm admins see its state (AC-G-18). When it is turned off, each household with a grant shows the advisor "Income was reported without company stock. Check the salary on file." (AC-G-19). Firm admins changing it themselves is Next.
- Why: with the setting off, income reported "not counting company stock" stays without it while grants are hidden, so the figures read low. Turning it off is a pilot decision (the stop rule of D-088), so it belongs to whoever runs the pilot, happens rarely, and comes with the line that lets advisors fix the salary. Removing the off switch was weighed and set aside: it would take away the pilot's stop and the way to withdraw a wrong figure firm by firm.
- Date: 2026-10-06 · Confirmed by: Renier

## D-112 · Every card of the Miro change maps uses one fixed format
- What: each card of the change maps shows its badge (NEW, CHANGED or NO CHANGE, in the board's usual colours), "Screen > Element", "Today:" (empty for NEW), "With the feature:", "Why:" in one line, and the covering requirement and decision IDs. Written in the flow-review skill; the maps are rewritten with it, mirroring `10_flow_review.md` (D-085).
- Why: the cards named what changed but not what the screen did before and does now, so a reader could not tell what is new without the repo; one format makes every card readable on its own and comparable with the prototype.
- Date: 2026-10-06 · Confirmed by: Renier

## D-113 · Every touchpoint and Miro card says whether it was seen, inferred or assumed; each change map is named by persona, page and job
- What: each touchpoint in `10_flow_review.md` carries "seen" (observed on the captured screens) or "inferred" (not observed, rebuilt from the sources named), then any A-NN its new behaviour rests on; `npm run check` fails if a touchpoint lacks it. Each Miro card shows the same tag on its grey line, with a legend in the frame subtitle. Each change map is named "Persona · Page or module · Job to do", and its subtitle states what the person gets, where it sits in the flow and what the prototype shows.
- Why: most of the advisor side was never seen (no advisor login, brief section 4), so a card read without its source looks like a fact about the platform; the tag lets Sherpas tell what exists today from what is rebuilt or assumed. The name tells the reader whose flow a map is before reading it.
- Date: 2026-10-07 · Confirmed by: Renier

## D-114 · The prototype explains itself with one fixed format: a flow map, a guide strip on every screen and scene, and NEW or CHANGED marks
- What: "Start here" shows the flow in five steps (client answers, advisor completes, analysis recalculates, advisor shares, client reads), the same stages as the Miro change maps. Every scene and every screen of "Explore freely" opens with a guide strip: the five steps with the current one lit, "What you see" and "Model" in one line each (at most 15 words, checked by a test), and "Why" folded, holding the reason and its rule IDs. An element the feature adds or changes carries a small NEW (yellow) or CHANGED (orange) mark, the Miro legend colours, with its reason on hover; unchanged elements carry no mark. A tab, the View more link and a View more area holding something new or changed carry a small dot in the same colours (changed wins over new); areas with a new reading open by default. Nothing is marked while the firm setting is off. The scene paragraphs move into "Why".
- Why: a reader with no context (Sherpas, the video viewer) must see where a screen sits in the flow and how it changes the model in two seconds, without long paragraphs; one format on every screen keeps that quiet and consistent. Addresses the reading side of GAP-36 and GAP-37; the scene order and the section index stay open.
- Date: 2026-10-07 · Confirmed by: Renier

## D-115 · A proposed grant is a duplicate only with the same employer, grant date and type
- What: AC-F-09 matches a proposed grant against an existing one on employer, grant date and type (RSU or PSU). An RSU and a PSU granted the same day are two grants and are confirmed side by side; "Confirm all" (AC-F-18) judges duplicates against the grants that existed before it.
- Why: with employer and date only, confirming the second of two same-day awards asked the advisor which to keep, and keeping it dropped a real grant (GAP-60). Adding the type is the smallest change that keeps two awards apart; adding units as well could let a real duplicate through when the statement rounds them differently. How often same-day RSU and PSU awards occur is not in `research.md` (A-63).
- Date: 2026-10-07 · Confirmed by: Renier

## D-116 · One name per concept: "stock compensation" for pay in shares, "employer stock" for shares already held
- What: "stock compensation" names pay received in shares (grants, tranches, vests) everywhere, in documents, spec, prototype and tests; "stock pay" (D-030, D-035) is retired. "Employer stock" names shares of the employer already held in an account, the asset the concentration check reads; "company stock" is retired, and where it meant pay it now reads "stock compensation". Client-facing labels change with it: the income question reads "Total annual income before taxes, not counting stock compensation" (AC-E-02), the helper line "Receive stock compensation? Add it below." (AC-E-25), the review line "Salary on file should exclude stock compensation. If it includes vested stock compensation, edit it." (AC-F-17), and the off-setting notice "Income was reported without stock compensation. Check the salary on file." (AC-G-19). Closed records (earlier decisions, checks, research quotes, discovery) keep their wording.
- Why: two names for one thing, and "company stock" used for both pay and held shares, made the reader ask whether they were different; the platform's type lists already name an asset and an income category "stock compensation" [FACT: data_model.md, "Where stock compensation would fit"], so one name per concept follows it.
- Date: 2026-10-07 · Confirmed by: Renier

## D-117 · The scenes are guided walks on the live prototype, in flow order, for the five most relevant cases
- What: each scene is a household and a sequence of steps; each step sets the view (client, advisor, shared PDF) and the tab, and its guide strip says what to do, what the reader sees and how the model changes; what the reader does on one step carries over to the next, and the last steps show what moved since the start. Screens that do not matter to the case come prefilled (the client's questionnaire opens on Income with the answers and the uploaded statement), and each step with an action has a "Do it" button that runs it as the on-screen button would, so a presenter only presses Do it and Next. The five scenes, in flow order: 1, Maya is paid partly in RSUs, from questionnaire to shared report (the end-to-end walk for the video; it absorbs the former scenes on concentration, the four-year grant and the client report); 2, withholding that will not cover the tax; 3, vests that help fund a goal; 4, a PSU with a performance range; 5, an existing client whose advisor adds the grant. Scenes 2 and 3 stay before-and-after views until they are rebuilt as walks; 4 and 5 follow. Update 2026-10-07: all five are walks; a scene that starts complete compares its figures with the same household without stock compensation, and the D-071 calculation stays folded under "How it is computed".
- Why: a reader could not switch view inside a scene, and the scenes followed the features rather than what happens, so the flow from client to advisor and back could not be shown (GAP-36).
- Date: 2026-10-07 · Confirmed by: Renier

## D-118 · In the projection, a vest is saved at the household's own saving rate, as its wages are (P-VEST-SAVE)
- What: each vest enters the projection as wages of its year (AC-D-10, D-106): after its tax (F-C), the projection saves the share the household saves of its reported salary (annual savings over reported salary) and treats the rest as spent, as it treats wages. The prototype shows one figure read from the projection, net worth at its last year, under the chart, labelled "includes future vests after estimated tax, at the <analysis date> price", with ", at target" when performance units are included (AC-D-11). The prototype has no check that counts income not dependent on markets, so that clause of AC-D-11 is spec only. Options: save every vest in full after tax (what the prototype did; D-106 had ruled it out because it makes retirement figures read high), or one fixed saving share for every household (simpler, but not "as wages are").
- Why: D-106 asks the projection to treat a vest as wages; the platform's own spending and saving logic is not public, so the household's own saving rate is the closest stand-in, labelled SIMULATED and resting on A-62.
- Date: 2026-10-07 · Confirmed by: Renier

## D-119 · The prototype's tests check the spec, not the product; QA verifies the build
- What: the Traceability section of `spec/00_index.md` says what the prototype's tests check (business rules, data model, user flows, events), how and why, and what they leave out (Sherpas' real curves, the platform's tax engine, look, performance, accessibility, security). They show each requirement can be built and tested as written; QA verifies the production build against the same IDs and engineering writes its own tests. `npm run trace -- --write` fills the Test column of every requirement and the index table from the test titles, and `npm run check` fails when they differ. The page "How we know it works" adds that it does not replace QA. Options: the table alone, without saying what the tests are (a reader can take them as the product's verification); typing the Test cells by hand (they go stale at the next test change).
- Why: the spec's roles give definition to product and verification to QA (D-004, D-047); tests written by whoever wrote the requirements prove the spec is precise, not that the product works. A table generated and checked from the tests cannot drift from them.
- Date: 2026-10-07 · Confirmed by: Renier

## D-120 · In Notion, each feature page reads for a person first and keeps the acceptance criteria word for word (amends D-084)
- What: each feature page in Notion opens with one plain sentence, a SIMULATED example with the figures the prototype computes, a screenshot, and what changes and what stays as today. Then a table of its acceptance criteria: the EARS text as in the repo (placeholders in square brackets, IDs at the end in brackets), a link to the feature file in the repo, and the status (tested, or spec only with its reason). Test cases (the edge cases and the prototype's tests) and the column "From" stay only in the repo. The table is generated from the repo, not typed. A criterion a person cannot read is fixed in the spec itself. Options: the repo tables pasted as they are (hard to read without the repo); requirements rewritten in plain words for Notion (two wordings of one requirement drift apart, and QA and readers would check different texts); a Given / When / Then line per criterion in Notion (test cases in two places).
- Why: Notion is where the company reads the spec (D-084); one wording keeps the definition the same for every reader, and each EARS line already states when and what must happen, so a team that verifies by hand can read its check from the criterion and take the test cases from the repo.
- Date: 2026-10-07 · Confirmed by: Renier

## D-121 · The spec says what the system does, not how it is verified; it adds a proposed definition of done and the formats of every line (amends D-062 and the spec template)
- What: the "Verify" column (`unit`, `e2e`, `manual`) leaves every table of `spec/`; how and at what level a requirement is verified is QA's and engineering's call, and the Test column only shows how the prototype proved a line can be tested. `spec/00_index.md` adds: "Working from this spec" (the same trace for teams that automate tests; the Notion criteria for teams that verify by hand, D-120; product's test cases only in the repo; a line that cannot be built comes back as a change); a definition of done, proposed for the team to agree (every criterion passes as a test case verified by QA on the production build; every event recorded and visible; without stock compensation or with the setting off, exactly today's output); the formats of amounts, shares, dates, names and counts; what "exactly as today" means; and that a line with several clauses passes only when each passes. The `spec` skill template follows. Options: keep "Verify" as a suggestion (it still reads as an instruction to QA); leave formats to engineering (the prototype had to choose its own rounding, a question the spec should have answered).
- Why: defining and verifying belong to different roles (Roles in `spec/00_index.md`; D-004, D-047). The sources this method is built on carry no verification column: product-sdd `write-spec`, GitHub Spec Kit's spec template (user scenarios as Given / When / Then, requirements, success criteria, "NEEDS CLARIFICATION" for anything undefined [web: https://github.com/github/spec-kit/blob/main/templates/spec-template.md, accessed 2026-10-07]) and Kiro (requirements, design, tasks [web: https://kiro.dev/docs/specs/, accessed 2026-10-07]). `write-spec` closes each spec with a definition of done ("all EARS criteria pass as test cases", "the metric instrumented and visible"), which the adapted template had dropped; the Scrum Guide gives the definition of done to the team, not to one role [web: https://scrumguides.org/scrum-guide.html, accessed 2026-10-07]. An undefined format or "as today" is a question an engineer would have to ask.
- Date: 2026-10-07 · Confirmed by: Renier

## D-122 · Each Notion feature page follows the GitHub Spec Kit template in full, with acceptance scenarios that cite the repo IDs (amends D-120 and the test-case line of D-121)
- What: each feature page in Notion uses the sections of the Spec Kit spec template [web: https://github.com/github/spec-kit/blob/main/templates/spec-template.md, accessed 2026-10-07]: a header (feature, release, dependencies, status, link to the repo file and the commit it was built from); User Scenarios & Testing (the user story with its priority, why that priority, the independent test, acceptance scenarios as Given / When / Then, edge cases as questions with their answer); Requirements (the functional requirements, generated from the repo with its words and its `AC-` IDs, and the key entities from the shared data); Success Criteria (the metrics the feature feeds, from `07_success_criteria.md`); Assumptions (the `A-NN` it rests on, with the fallback); plus out of scope and who owns the plan. The acceptance scenarios are a few key examples taken from the feature's edge cases and spec examples, with the prototype's SIMULATED figures, and each cites the `EC-` and `AC-` IDs it comes from; the full edge cases and the prototype's tests stay only in the repo. The plain layer of D-120 stays as one sentence under the header. Options: D-120 as it was, criteria only (a reader sees no example of the behaviour); Spec Kit IDs `FR-NNN` (would break the trace to the tests).
- Why: Spec Kit is the template this method follows (D-047) and one an engineering team working with AI is likely to know [INFERENCE: Spec Kit is GitHub's published template for spec-driven development with AI agents]; acceptance scenarios are examples written by product that define the behaviour, while QA's test cases stay QA's. Citing the IDs keeps every scenario traceable to the repo requirement, edge case and test, so engineering can go from Notion to the code without a question.
- Date: 2026-10-07 · Confirmed by: Renier

## D-123 · Head of household stays out of the prototype's simulator (amends D-104)
- What: the prototype's simulator keeps single and joint filing only; the head of household brackets and standard deduction stay in `12_stock_comp_rules.md` (SC-11) for the platform's tax engine, which the spec already uses (AC-C-03). The spec is unchanged. `prototype/README.md` says it is not built and why. Options: add it to the simulator now (about 40 minutes on delivery day).
- Why: no SIMULATED household files as head of household [FACT: `prototype/src/model/households.ts`, filing status joint or single], so no figure the prototype shows changes; the spec, which is what engineering builds from, already covers it through the platform's tax engine.
- Date: 2026-10-07 · Confirmed by: Renier

## D-124 · Two ways in: the private repository for engineering, a password-protected copy for everyone else (settles D-086)
- What: engineering reaches the pull request and the code through the private repository, shared with the people Sherpas names. Readers without a development setup open a copy of the prototype from a link on the Notion page: the static build (D-061) as one HTML file, encrypted with a password so its content cannot be read without it, on a free static host under Renier's account. The password goes in the delivery email, never in the repository. Publishing happens in F7, only with Renier's OK at that moment. Options: the private repository only (a reader without a development setup cannot try the flow); video and screenshots only (nobody can try the flow).
- Why: D-086 deploys only when the private route does not work for a reader, and a product reader who does not run code locally is that case [ASSUMPTION: A-64]. Encrypting the page, rather than hiding it behind a link, keeps an imitation of a confidential interface unreadable on the open web (D-008).
- Date: 2026-10-07 · Confirmed by: Renier


## D-125 · The delivery opens with the brief answered on one screen; Notion and the README share one structure (amends D-083, D-084, D-085, D-122)
- What: the Notion home page and the README open the same way: what we propose, as the brief's five questions answered in two or three plain lines each (how stock compensation comes in, which types, how it is modelled, which analyses the advisor gets, what is left out, why and in what order), each linking to the page or file that goes deeper; then the method in short, the links (brief, password-protected prototype copy, pull request, repository, Miro board, video) and the map of pages. Notion pages: Home; Strategy (the PRD: problem, research, platform mapping, scope in and out with the reason, hypotheses, options and recommendation, "How we will know it works", flows, prototype, validation with advisors, tracking, non-obvious impacts, decisions pending); Engineering deliverables (the model diagram, the proposed definition of done, the three kinds of tests, release notes, enablement, and the six feature pages in the Spec Kit template of D-122); Methodology; Tools; Glossary (from `04_glossary.md`); Follow-up (from `02_open_questions.md`). The README follows with the work stage by stage and its files, how the work is organised, how it is kept objective, the business logic, and the engineering entry point. Every stage document opens with a TL;DR of three to five lines. Everything is written in the repo first and Notion is filled from it, naming the commit (D-084 stands). This replaces the one-page-per-stage order of D-083 for Notion and the README; the stages keep their order inside Strategy and the README, and the video keeps the brief's order. The Miro board delivers the change maps, the options and the pilot; the flows of today get the change maps' format, and the decision map is filled, only if time is left at the end; if not, the video shows the decisions from Notion (amends D-085). Cut at delivery, each listed in `02_open_questions.md` under "Follow-up after delivery": the second flow review pass on the prototype (the five guided scenes are walked while recording the video; the first pass covered every touchpoint, `10_flow_review.md`); a Help Center article (release notes and enablement cover what advisors are told); screenshots in the pull request (the video and the protected copy show the screens); a full re-read of release notes and enablement (a TL;DR is added; no product behaviour changed since their last review). Options: one page per stage as in D-083 (a reader walks several pages before learning what is proposed); answer-first everywhere, deep pages included (the deep pages would lose the product process the stages show).
- Why: the brief asks for four topics and for what is left out and why [brief], so a reader should find each answer on the first screen and choose where to go deeper. A PRD opens with an executive summary for readers who skim and then the detail (Product-Manager-Skills, `prd-development`, section 1), which is the role the home page plays; the feature pages keep Spec Kit (D-122).
- Date: 2026-10-07 · Confirmed by: Renier

## D-126 · Five advisors try the prototype before release 2 is built, and the impacts outside the screens are written with their owner (amends D-080)
- What: the five advisor interviews that D-080 runs before building become sessions with the password-protected prototype (D-124): a concept part, a task test on the "Start here" walk, and three signals with proposed pass marks (4 of 5 complete the grant from the statement without help; 4 of 5 explain the tax gap and the concentration correctly; at least 3 of 5 would share the report as generated); a failed signal changes the screens before building (`07_success_criteria.md`, "Before building: validation with advisors and the prototype"; `06_direction.md`, F3-13). The impacts no requirement fully covers are written in `10_flow_review.md`, "Impacts beyond the screens": privacy and consent for plan statements (A-65), data kept when the setting is turned off (covered by AC-G-13), compliance review of the client-facing tax lines (A-66), accessibility of the new elements (A-67), each with what the spec already does, what stays open and who decides. Options: interviews without the prototype, as D-080 had them (advisors would react to a description, not to what they would use); a separate document for the impacts (the flow review is where the method puts what no requirement covers).
- Why: the riskiest assumptions of the first release are that advisors complete grants from a statement and trust the readings (`07_success_criteria.md`, test cards 1 and 2); watching five advisors use the screens tests both before engineering time is spent. The impacts outside the screens decide whether a pilot firm can turn the feature on, so each needs an owner before the pilot.
- Date: 2026-10-07 · Confirmed by: Renier

## D-127 · The Miro board is delivered with the proposal and the decisions on it; the flows of today keep their format (amends the Miro line of D-125)
- What: the board delivered is https://miro.com/app/board/uXjVEecsLmY=/. Besides the flows of today, the options, the pilot and the four change maps, it now carries a title frame with a legend and a reading path, a "What we propose" frame, a "What is left out" frame, an area heading with a one-line summary per area, and the decision map, "Decisions · The 10 that shaped the proposal": D-023, D-024, D-025, D-026, D-030, D-035, D-039, D-042, D-080 and D-091, each card with what was chosen, what was dropped and why, matching its entry in this log. "Stock pay" and "company stock" meaning pay read "stock compensation" across the board (D-116); the four "Next (F6.2)" working notes were removed. The flows of today keep their own format and stay listed in "Follow-up after delivery". Options: deliver the change maps only (a reader would not see the proposal and the decisions on the board the brief offers for thinking); reformat the flows of today too (no time left at delivery).
- Why: the brief offers the board to show how we think [brief]; the proposal and the ten decisions that shaped it, each pointing to the log, let a reader follow the reasoning on one canvas, while the full content stays in the repo (D-085).
- Date: 2026-10-07 · Confirmed by: Renier
