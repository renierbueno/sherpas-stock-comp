# Stock compensation in Sherpas

How I would integrate stock compensation into the Sherpas Financial Health analysis: from understanding the platform to a spec and a working reference implementation.

- **The brief:** [`docs/00_brief.md`](docs/00_brief.md)
- **Every decision and why:** [`docs/03_decision_log.md`](docs/03_decision_log.md)
- **What is still unknown:** [`docs/02_open_questions.md`](docs/02_open_questions.md)

## How the work is organised

The work runs in phases. Each phase ends with a check (`/check`) and a human gate, and each closed gate is one commit on `main` that says why.

| Phase | What | Status |
|---|---|---|
| F0 · Setup | Brief, context, open questions, decision log, glossary; harness and safety rules | done |
| F1 · Understand | The platform, the advisor flow, the score's areas and dimensions; public research; questions for Sherpas | not started |
| F2 · Discovery | Personas and interviews (SIMULATED unless real ones are possible, with their limits) | not started |
| F3 · Decide | Three options, a recommendation, and the MVP cut: now / next / later / never, each with its reason | not started |
| F4 · Spec | EARS acceptance criteria, edge cases, release notes and enablement | not started |
| F5 · Prototype | A pull request implementing the MVP as a reference: input, model, score simulator, analysis view; each criterion linked to its test | not started |
| F6 · Delivery | Notion write-up, this README, the video script | not started |

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
  checks/               the /check report that closed each phase
.claude/skills/         the harness: one skill per step, fixed input and output, "done when"
.githooks/pre-commit    blocks credentials, confidential captures and original files
```

## The harness

Each step of the work is a skill in `.claude/skills/` with the same shape: input (the previous skill's file) → steps → output (fixed path) → "done when" → next skill. The skills are adapted from my own spec-driven harnesses and from jinjin1's Cursor-for-Product-Managers (Apache-2.0, see `NOTICE`). Skills are written just before the phase that uses them, each tested on a real run first.

## Confidentiality

Everything seen on the Sherpas platform is confidential. Screenshots, page captures and network data stay outside git; only derived notes are committed, and a pre-commit hook enforces it. The prototype is original code that imitates the design.
