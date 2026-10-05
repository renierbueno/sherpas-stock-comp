---
name: decide
description: Use in phase F3 to turn the "What F3 needs to decide" list of the discovery synthesis into decisions. For each decision, three options with trade-offs and a recommendation; Renier chooses. Ends with the MVP cut (MVP, next, later, never, each with a why) and the riskiest assumptions of the chosen direction. Not for finding new facts (research) or testing assumptions with voices (discovery).
---

# Decide

Goal: every choice in the proposal is Renier's, taken between real alternatives, on evidence whose weight is stated. What is left out, and why, is as visible as what goes in [brief]. Structured as three options plus a recommendation; ICE is support only, adapted from jinjin1's format (credited in `NOTICE`).

## Input

- `docs/discovery/synthesis.md`: "What F3 needs to decide" and the assumptions A-01 to A-11 with status.
- `docs/research.md` (R-NNN), `docs/discovery/voices.md` (V-NN), `docs/data_model.md`, `docs/questionnaire_map.md`, `docs/00_brief.md`.
- `docs/03_decision_log.md`, D-023 first: every option is judged against it.

## Steps

1. **Block.** Decisions run in four blocks, in order: scope, model, intake, analysis. Before each block, tell Renier what it covers.
2. **Options.** For each decision, write the entry with the template below: the question in plain words, three options that are real alternatives (not a straw man and two variants), trade-offs, the evidence for each, and a recommendation with why it beats the other two. Check each option against D-023 and against what the platform already does (cite `data_model.md` or `questionnaire_map.md`). If no option solves the problem well, do not recommend: generate or combine more options and say which gap each closes (D-046).
3. **Explain.** In chat, explain every domain term in plain Spanish at the moment of deciding.
4. **Choose.** Renier chooses, edits or rejects. Only then record it: a `D-NNN` in `03_decision_log.md` (what, why, date, "Confirmed by: Renier") and the chosen option marked in `06_direction.md`. Never write "Confirmed by" before he confirms.
5. **Unknowns.** A fact a decision needs that no source gives goes to `02_open_questions.md` after the D-020 check, with the assumption the work proceeds on.
6. **MVP cut.** After the four blocks: one table, every item in MVP, next, later or never, each with a why and the `D-NNN` it comes from. ICE only to break a tie, with its scores shown.
7. **Riskiest assumptions.** At most three assumptions the chosen direction stands on, each with how it would be validated and what changes if it is wrong.
8. **Glossary.** New terms used in `06_direction.md` go to `04_glossary.md` with their source.

Evidence rules from `CLAUDE.md` apply: Sherpas facts tagged `[brief]` or `[FACT: captures/…]`, US facts cite `R-NNN`, the rest `[INFERENCE: …]` or `[ASSUMPTION: confirm]`. Call or JD context never appears in committed files (`CLAUDE.local.md`).

## Decision template

```markdown
### F3-NN · <decision, as a question>
<What it means, in two sentences a non-specialist understands.>

| | Option | Gains | Costs | Evidence |
|---|---|---|---|---|
| A | … | … | … | R-…, V-…, [FACT: …] |
| B | … | … | … | … |
| C | … | … | … | … |

- **Recommendation:** <letter>, because <why it beats the other two>. D-023: <holds / how>.
- **Chosen:** <pending | letter, edits> · <D-NNN>
```

## Output (fixed paths)

`docs/06_direction.md` (blocks with their decisions, the MVP cut, the riskiest assumptions); new `D-NNN` entries in `docs/03_decision_log.md`; updates to `docs/02_open_questions.md` and `docs/04_glossary.md`.

## Done when

- Every item of "What F3 needs to decide" has an entry with three options, trade-offs with evidence tags and a recommendation, or is merged into another entry with a reason.
- Every chosen option has a `D-NNN` with "Confirmed by: Renier".
- Every option was checked against D-023.
- The MVP cut places every item considered in MVP, next, later or never, with a why and a `D-NNN`.
- At most three riskiest assumptions, each with how to validate it.
- New questions to Sherpas passed the D-020 check.
- The dry run showed one entry to Renier before the rest were written.

## Next

`/check F3`, then F4 (`spec`).
