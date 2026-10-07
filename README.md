# Stock compensation in Sherpas

How I would integrate stock compensation (pay in shares of the client's employer) into the Sherpas Financial Health analysis: the proposal, the decisions behind it, a spec engineering can build from, and a working reference implementation. Brief: [`docs/00_brief.md`](docs/00_brief.md).

## What we propose

The brief asks five things. Each answer says what we propose, why, and where to go deeper. The reasons come from public research and real advisor and employee voices, not from guesses.

**1. How does it come in? What we ask the client or the advisor, and how.**
The client ticks a new "Stock compensation" income chip and fills one short row: employer, owner, an optional yearly amount. A plan statement goes in the documents step that exists today; the platform reads it and the advisor confirms the grants in one review, or types them in Data & Assumptions. Salary is asked without stock compensation.
*Why:* the detail of a grant lives in plan statements and stock-plan portals, not in the client's head, and account aggregators do not bring unvested grants; so the client is asked only what they know, and the platform reads the document, as it already does with other documents. Clients and tools often count vest income twice, so the salary question rules it out.
Deeper: [intake decisions](docs/06_direction.md) (F3-06 to F3-08, F3-14), specs [F-E](docs/spec/F-E_client-reports-stock-compensation.md) and [F-F](docs/spec/F-F_upload-plan-statement.md).

**2. Which types?**
RSUs and PSUs in full: the grant, its vest dates and the tax at each vest. Any employer shares the client already holds are recognised as employer stock, whatever their origin (an ESPP purchase, an exercised option). Private-company grants are recorded and shown, but stay out of the figures until they have a price.
*Why:* RSUs are granted by almost every large US company and performance units nearly as often, and one model covers both. Options are a falling minority and need their own tax logic (exercise, AMT); the ESPP has its own purchase and sale rules. Flagging held shares makes concentration right for every type once it becomes shares. For private stock, the platform's own rule applies: a figure it does not have is left out, not invented.
Deeper: [F3-01, F3-02](docs/06_direction.md), [research](docs/research.md).

**3. How is it modelled in the analysis?**
In the platform's four dimensions. Held employer shares are an **asset**: an existing position, flagged and summed by employer. An unvested grant is not an asset yet, only future vests. Each vest is **income**: wages of the year the shares are delivered. The tax on each vest is estimated with the platform's tax engine, and the part withholding does not cover is a near-term cash commitment, not a new **liability**. The score moves only through two checks it already has, concentration and near-term commitments, plus the figures read from the projection, each change explained in View more; there is no new score area.
*Why:* under US tax rules an RSU is not owned until it vests, and its value at vest is taxed as wages; treating it as owned before then inflates wealth and counts it twice. Using the platform's own dimensions, tax engine and score checks keeps the score's structure, and a household without stock compensation sees exactly what it sees today.
Deeper: [how the model changes](docs/spec/00_index.md#how-the-model-changes), [the rules and their numbers](docs/12_stock_comp_rules.md).

**4. Which analyses can we offer the advisor?**
Three, inside what the platform already shows: employer concentration in the Investing check; tax at vest and the withholding gap in the Liquidity check; vests as dated cash beside the client's goals and in the projection. View more says why the score moved. Facts and gaps, never sell or hold advice.
*Why:* the tax bill at vest is the main pain advisors and employees describe: withholding is often a flat 22% while the household's bracket is higher, so clients get surprise bills, and advisors track it in spreadsheets beside their planning tools. Employer stock is a double risk, because the job and the investments can fall together. Sherpas names tax planning among the areas it is building towards, and this is a first use of it inside the existing analysis. Vests often pay for near-term goals, so they show beside them.
Deeper: [F3-10 to F3-12](docs/06_direction.md), specs [F-A](docs/spec/F-A_employer-stock-concentration.md), [F-C](docs/spec/F-C_tax-at-vest.md), [F-D](docs/spec/F-D_vest-proceeds-dated-cash.md).

**5. What is left out, why, and in what order?**
Release 1: employer stock counted in concentration. Release 2: the full loop (grants, tax at vest, the client's question, plan statements). Next: ESPP purchases, cost basis, the 409A value, turning vests into positions. Later: options with exercise and AMT, sell-or-hold scenarios. Never: personal tax or sale advice, a separate score area.
*Why:* release 2 is the smallest scope that keeps the whole chain, from the client's answer to the report the advisor shares, and a pilot can read its result in weeks. Release 1 needs no grant data, so it can ship first. What waits serves a smaller group or needs heavy tax logic; advice stays the advisor's.
Deeper: [the cut, line by line](docs/06_direction.md#mvp-cut), [three options and the chosen one](docs/06_direction.md) (F3-13), [success criteria](docs/07_success_criteria.md).

## The method, in short

The work ran in phases (understand, research, discover, decide, specify, review the flows, prototype, deliver), each closed by a written check and a human gate, every decision logged with its reason. AI did the reading, drafting and building through one skill per step; deterministic scripts check the documents against each other and every requirement against its test, so the result does not rest on the model's word. Detail: [How the work is organised](#how-the-work-is-organised) and [How the work is kept objective](#how-the-work-is-kept-objective).

## Links

| What | Where |
|---|---|
| The brief | [`docs/00_brief.md`](docs/00_brief.md) |
| The prototype, to try in a browser | [Password-protected copy](https://stock-comp-prototype-k7q2.netlify.app); the password comes with the delivery email (D-124) |
| The pull request | [PR #1](https://github.com/renierbueno/sherpas-stock-comp/pull/1) |
| The repository | [github.com/renierbueno/sherpas-stock-comp](https://github.com/renierbueno/sherpas-stock-comp) (private) |
| Miro board | [The thinking board](https://miro.com/app/board/uXjVEecsLmY=/): flows today and with the feature, the options, the ten decisions, the pilot |
| Video | Linked from the Notion page |

## The work, stage by stage

| # | Stage | What it settled | Files |
|---|---|---|---|
| 1 | Context and problem | What the platform does today, how it models a household, and where stock compensation has no place | [`01_context.md`](docs/01_context.md), [`platform_map.md`](docs/platform_map.md), [`questionnaire_map.md`](docs/questionnaire_map.md), [`data_model.md`](docs/data_model.md) |
| 2 | Research | The US facts: types, vesting, tax, concentration, advisor tools; every tax or legal rule the model applies, with its number and source | [`research.md`](docs/research.md), [`12_stock_comp_rules.md`](docs/12_stock_comp_rules.md) |
| 3 | Discovery | What advisors and clients struggle with, from real public voices and SIMULATED interviews, and which assumptions hold | [`discovery/`](docs/discovery/synthesis.md) |
| 4 | Options and decisions | Scope, model, intake and analysis, each with three options; the first release and what is left out | [`06_direction.md`](docs/06_direction.md), [`03_decision_log.md`](docs/03_decision_log.md), [`02_open_questions.md`](docs/02_open_questions.md) |
| 5 | How we will know | The pilot, metrics per release, continue, change or stop | [`07_success_criteria.md`](docs/07_success_criteria.md) |
| 6 | Launch | What advisors are told and how they are trained | [`08_release_notes.md`](docs/08_release_notes.md), [`09_enablement.md`](docs/09_enablement.md) |
| 7 | What the change touches | Every screen element today and with the feature; gaps found and how each closed | [`10_flow_review.md`](docs/10_flow_review.md) |
| 8 | The spec | What engineering builds: requirements with IDs, edge cases, events, the score simulator contract, traceability to tests | [`spec/`](docs/spec/00_index.md), [`prototype/`](prototype/README.md) |

Terms: [`04_glossary.md`](docs/04_glossary.md). What is still unknown, and what was left for after delivery: [`02_open_questions.md`](docs/02_open_questions.md).

## How the work is organised

The work runs in phases. Each phase ends with a check (`/check`) and a human gate, and each closed gate is one commit on `main` that says why.

| Phase | What | Status |
|---|---|---|
| F0 · Setup | Brief, context, open questions, decision log, glossary; harness and safety rules | done |
| F1 · Understand | The platform, the advisor flow, the score's areas and dimensions; public research; questions for Sherpas | done |
| F2 · Discovery | Personas and interviews (SIMULATED unless real ones are possible, with their limits) | done |
| F3 · Decide | Three options, a recommendation, and the MVP cut: now / next / later / never, each with its reason | done |
| F4 · Spec | Feature specs with EARS acceptance criteria and edge cases, success criteria, release notes and enablement | done |
| F5 · Flow review | What the change touches that no requirement covers: screens, figures, shared reports, user flows | done |
| F6 · Prototype | A pull request implementing the MVP as a reference: input, model, score simulator, analysis view; each criterion linked to its test | done |
| F7 · Delivery | This README, the Notion pages, the video, the protected prototype copy | in progress |

Phases were renumbered when the flow review became its own phase (D-053).

How AI was used, as a product manager:
- **One skill per step** (`.claude/skills/`), each with a fixed input, steps, a fixed output and "done when"; written just before its phase and tried on a real run first. Adapted from my own spec-driven harnesses and from jinjin1's Cursor-for-Product-Managers (Apache-2.0, see `NOTICE`).
- **Evidence tags** on every claim: `[FACT: source]`, `[INFERENCE: from what]`, `[ASSUMPTION: A-NN]`; an assumption always has its fallback in `02_open_questions.md`.
- **Anything simulated is labelled SIMULATED** (personas, interviews, households, figures); never presented as real.
- **Roles kept apart:** product defines what the system does; QA verifies it; engineering plans how to build it (D-004, D-121).

## How the work is kept objective

| What | What it makes objective |
|---|---|
| [`docs/checks/`](docs/checks/) | One written check per phase against the phase's "done when", before the human gate |
| [`prototype/scripts/consistency.ts`](prototype/scripts/consistency.ts) | The documents agree with each other: every decision, requirement, rule and assumption cited exists; gaps and touchpoints carry a status; no replaced decision is cited as current |
| [`prototype/scripts/trace.ts`](prototype/scripts/trace.ts) | Every requirement and event of the spec against the tests whose titles name it; the spec's Test column is generated, not typed |
| [`prototype/scripts/evidence.ts`](prototype/scripts/evidence.ts) | The prototype's evidence page, built from the last real test run |
| [`.githooks/pre-commit`](.githooks/pre-commit) | No credential, capture or confidential file enters git |
| `npm run check` | All of the above plus the tests and the build, before every commit |

## Business logic

| What | Where |
|---|---|
| Every US tax or legal rule the model applies, with its number, source and signal strength | [`docs/12_stock_comp_rules.md`](docs/12_stock_comp_rules.md) |
| The score simulator: what is public in the score article and what is a SIMULATED parameter | [Score simulator parameters](docs/spec/00_index.md#score-simulator-parameters) |
| How the household model changes | [How the model changes](docs/spec/00_index.md#how-the-model-changes) |
| The model in code: grants, tax at vest, exposure, projection, score | [`prototype/src/model/`](prototype/src/model/) |

## For engineering: start here

1. [`docs/spec/00_index.md`](docs/spec/00_index.md): roles, how to work from the spec, the proposed definition of done, the formats of every line, the rules for every feature, shared data, score parameters and traceability to tests.
2. [`docs/spec/`](docs/spec/): one file per feature (F-A to F-F), each with its context, user story, requirements with IDs, edge cases, events and what is out of scope.
3. [`docs/12_stock_comp_rules.md`](docs/12_stock_comp_rules.md): every US tax or legal rule the model applies, with its numbers and source.
4. [`prototype/`](prototype/README.md): the reference implementation, with each test named after the requirement it proves. It is not the plan; how to build it is engineering's call (D-004).
5. [`docs/03_decision_log.md`](docs/03_decision_log.md) for why, and [`docs/02_open_questions.md`](docs/02_open_questions.md) for the assumptions, each with its fallback.

## Run the prototype

Node 20 or later.

```
cd prototype
npm install
npx playwright install chromium   # once, for the browser walk
npm run dev                       # open the address it prints; the prototype starts on "Start here"
npm run check                     # docs consistency, tests, build, traceability
npm run e2e                       # the walk from questionnaire to shared report in a real browser
```

What each scene shows, and what stays in the spec only: [`prototype/README.md`](prototype/README.md). Everything in the prototype is SIMULATED. To try it without running code, use the [password-protected copy](https://stock-comp-prototype-k7q2.netlify.app); the password comes with the delivery email (D-124).

## Repo map

```
docs/
  00_brief.md           the exercise, literal, credentials redacted
  01_context.md         what is confirmed about Sherpas, with sources
  02_open_questions.md  unknowns, by who can answer them
  03_decision_log.md    decisions: what, why, date, who confirmed
  04_glossary.md        one term, one meaning
  05_business_lens.md   internal business hypotheses (not part of the deliverable)
  research.md           public US facts, each with source, date and signal strength
  06_direction.md       the F3 decisions, the MVP cut, the riskiest assumptions
  07_success_criteria.md  how we will know it works: pilot, metrics, readout
  08_release_notes.md   what advisors are told, release by release
  09_enablement.md      advisor guide, FAQ, pilot playbook
  10_flow_review.md     what the change touches: surfaces, data paths, walk-throughs, gaps
  11_storyline.md       the order of the deliverables, the video and the follow-up session
  12_stock_comp_rules.md  every US tax or legal rule the model applies, with its numbers
  platform_map.md, questionnaire_map.md, data_model.md, design_tokens.md
                        what the platform shows today, read from the demo (derived notes only)
  spec/                 the feature specs: index plus one file per feature
  discovery/            assumptions, real public voices, SIMULATED personas and interviews
  checks/               the /check report that closed each phase
prototype/              the reference implementation: model, score simulator, screens, tests
.claude/skills/         the harness: one skill per step, fixed input and output, "done when"
.githooks/pre-commit    blocks credentials, confidential captures and original files
```

## Confidentiality

Everything seen on the Sherpas platform is confidential. Screenshots, page captures and network data stay outside git; only derived notes are committed, and a pre-commit hook enforces it. The prototype is original code that imitates the design.
