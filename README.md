# Stock compensation in Sherpas

How I would integrate stock compensation into the Sherpas Financial Health analysis: from understanding the platform to a spec and a working reference implementation.

- **The brief:** [`docs/00_brief.md`](docs/00_brief.md)
- **Every decision and why:** [`docs/03_decision_log.md`](docs/03_decision_log.md)
- **What is still unknown:** [`docs/02_open_questions.md`](docs/02_open_questions.md)

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

What each scene shows, and what stays in the spec only: [`prototype/README.md`](prototype/README.md). Everything in the prototype is SIMULATED. To try it without running code, use the password-protected copy linked from the Notion page; the password comes with the delivery email (D-124).

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
| F7 · Delivery | Notion write-up, this README, the video script; flow review on the prototype | not started |

Phases were renumbered when the flow review became its own phase (D-053).

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

## The harness

Each step of the work is a skill in `.claude/skills/` with the same shape: input (the previous skill's file) → steps → output (fixed path) → "done when" → next skill. The skills are adapted from my own spec-driven harnesses and from jinjin1's Cursor-for-Product-Managers (Apache-2.0, see `NOTICE`). Skills are written just before the phase that uses them, each tested on a real run first.

## Confidentiality

Everything seen on the Sherpas platform is confidential. Screenshots, page captures and network data stay outside git; only derived notes are committed, and a pre-commit hook enforces it. The prototype is original code that imitates the design.
