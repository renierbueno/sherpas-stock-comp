---
name: spec
description: Use in phase F4 to turn the confirmed direction and MVP cut into product-owned feature specs (EARS requirements with acceptance criterion IDs, edge cases, instrumentation events, the score simulator contract), the success criteria, the release notes and the enablement material. Not for taking new product decisions (decide), finding facts (research) or checking flows across features (flow-review).
---

# Spec

Goal: engineering and QA can plan, build and verify the MVP without a clarifying question, and every line traces back to a confirmed decision. Product owns the what and why; engineering owns the plan and tasks; QA verifies against the acceptance criteria (D-004, D-047). Structure adapted from product-sdd `write-spec` (EARS, "a criterion you cannot test is a wish") and GitHub Spec Kit (one spec per feature, independently testable); success-metrics format from jinjin1 (credited in `NOTICE`).

## Input

- `docs/06_direction.md`: MVP cut, advisor journey, riskiest assumptions. `docs/03_decision_log.md`: D-023 first, then D-024 to D-048.
- `docs/data_model.md`, `docs/questionnaire_map.md`, `docs/platform_map.md`, `docs/00_brief.md` (score article), `docs/research.md`.

## Outputs (fixed paths)

| File | Reader | Holds |
|---|---|---|
| `docs/07_success_criteria.md` | Product, Sherpas | Metrics `M-NN` (primary, secondary, guardrail), pilot, learning loop, riskiest-assumption test cards, weekly readout table (D-043) |
| `docs/spec/00_index.md` | Everyone | D-023 rule (G), firm switch, roles, features with order and dependencies, simulator parameters, traceability |
| `docs/spec/F-A_…` to `F-F_…` | Engineering, QA, F6 | One vertical feature each (D-047) |
| `docs/08_release_notes.md` | Advisors | What is new, why scores of households with stock pay move, what stays out |
| `docs/09_enablement.md` | Advisors, Client Success | How to complete a grant, read the federal-only gap, talk about it with the client; pilot playbook |

## EARS (one pattern per line)

- Ubiquitous: `The system shall <behaviour>.`
- Event: `When <trigger>, the system shall <behaviour>.`
- State: `While <state>, the system shall <behaviour>.`
- Unwanted: `If <condition>, then the system shall <behaviour>.`
- Optional feature: `Where <feature is enabled>, the system shall <behaviour>.`

Rules: one behaviour per line (an "and" splits it in two); no adjectives that cannot be measured; a line that cannot be tested is rewritten or dropped; user-facing labels are quoted in full and read on their own, because the client may see the shared report.

## Feature template

```markdown
# F-X · <advisor outcome>
Decisions: D-… · Depends on: F-… · Release: behind the firm switch (D-030)

## Context
<Two or three sentences: the problem, for whom. No solution embedded.>

## User story
As <advisor | client | firm admin>, I want <action>, so that <outcome>.

## Requirements
| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-X-01 | When …, the system shall … | D-… ; R-… / [FACT: …] | unit / e2e / manual | (F6) |

## Edge cases
| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-X-01 | … | … | AC-X-0x, or "out: D-…" |

## Instrumentation
| ID | Event (EARS) | Feeds | Verify | Test |

## Out of scope
- <what this feature does not do>, D-…

## Owned by engineering
Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
```

- IDs are never reused or renumbered; a dropped line stays with "dropped: why".
- Every feature that touches something that exists today has at least one D-023 line: a household without stock pay gets exactly today's behaviour.
- `Verify`: `unit` (simulator or model), `e2e` (prototype path), `manual` (cannot be shown in the prototype; say why).

## Score simulator contract

- Lives in the index (parameters) and in the features that touch checks (F-A, F-C). The spec defines the figure each check reads, never its score. Public parts of the score article are used as given [brief]; anything not public (check curves, thresholds, horizons, limits) is a named parameter `P-…` tagged `[ASSUMPTION: confirm]`, with SIMULATED test values. Never a Sherpas number we do not have. R-014's 10% is reference only.
- Tests are relations, not absolute scores: unchanged without stock pay; two accounts equal one position; pending or private changes nothing; a larger gap never raises Liquidity.

## Gaps

When writing a line needs a decision F3 did not take: stop, bring Renier the options and a recommendation (decide template; if no option solves it, no recommendation, D-046), write the line as `pending D-…` until he confirms, then log the `D-NNN`. Never "Confirmed by" before he confirms. Unknown facts go to `02_open_questions.md` after the D-020 check.

## Steps

1. Dry run: one feature, shown to Renier before the rest.
2. Index and features, in two review batches.
3. `07_success_criteria.md` (metrics, riskiest-assumption test cards).
4. Release notes and enablement.
5. New terms to `04_glossary.md`.

Evidence rules from `CLAUDE.md` apply; call and JD context never appears (`CLAUDE.local.md`).

Before proposing an option, a resolution or a requirement that depends on a US tax or legal rule, check it against `docs/12_stock_comp_rules.md` and cite its SC-NN; a missing or WEAK rule goes to research or becomes an A-NN first (D-100).

## Done when

- Every MVP row of D-041 and D-042 sits in a feature; every requirement is EARS with an `AC-` ID, its `D-NNN`, a verify method and a Test cell.
- Every feature has context, a user story, edge cases, instrumentation, out of scope and the "Owned by engineering" section.
- G is covered by a D-023 line in every feature that touches existing behaviour.
- No Sherpas threshold, horizon or curve is invented: each is a `P-` parameter tagged `[ASSUMPTION: confirm]`.
- Every edge case resolves to an AC or to "out" with its `D-NNN`.
- Each riskiest assumption has a test card in `07`: how, signal, and what changes if it fails, linked to its `M-NN`.
- Every `M-NN` has a definition, window, target or "set with Sherpas after week 1", and a decision rule, and is fed by an instrumentation event with an ID.
- Release notes say that scores of households with stock pay move and that reprocessing replaces a manual adjustment (D-033).
- Decisions taken while writing have a `D-NNN` with "Confirmed by: Renier"; the glossary is current.
- The dry run was shown to Renier before the rest was written.

## Next

`/check F4`, then F5 (`flow-review` pass 1), then F6 (prototype + tests), which fills the Test column.
