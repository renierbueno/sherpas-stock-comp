---
name: flow-review
description: Use in phase F5 (pass 1, on paper, after the feature specs) and in F7 before delivery (pass 2, on the prototype) to find what the stock-compensation change touches that no decision or requirement covers: screens, figures, score checks, shared reports, user flows and data paths. Every gap ends as a requirement, as out with its decision, or as a decision for Renier. Not for writing the specs (spec) or auditing a phase (check).
---

# Flow review

Goal: no screen, figure or shared output changes without a requirement saying how, and no user is left in a flow the spec does not describe (D-048). Same rigor as `/check`: every row points at a file, a line or a screen.

## Input

- Pass 1: `docs/spec/` (all features), `docs/platform_map.md`, `docs/questionnaire_map.md`, `docs/data_model.md`, `docs/00_brief.md` (score article), `docs/03_decision_log.md`.
- Pass 2: the prototype (F6) and its screenshots, plus the pass 1 output.

## Steps

1. **Surfaces.** List every surface and output the platform shows or produces, from the inputs (sections of the analysis, score checks, statements, investment analysis, PDFs, questionnaire, opportunity, Data & Assumptions). One ID each (`SF-NN`).
2. **Impact map.** For each new data element (employer flag, grant, tranche, vest income, tax on vest, pending status, private grant, proposed grant), and each surface: is it affected? If yes, which requirement covers it (`AC-…`)? If none, it is a gap.
3. **Data paths.** For each new field: where it is entered, stored, read, shown and exported. A step with no requirement is a gap.
4. **Walk-throughs.** Client, advisor and firm admin, each with the SIMULATED households: no stock pay, RSU only, with PSU, private employer, detail pending, co-client with stock pay, existing household. Each step names the requirement that defines it; a step with none is a gap.
5. **Resolve.** Each gap ends as: a new requirement in its feature (written after Renier's OK), "out" with its decision, an open question (D-020 check), or a decision for Renier with options and a recommendation (D-046: no recommendation if no option solves it). Small gaps are grouped into one yes/no.

## Output (fixed path)

`docs/10_flow_review.md`: surfaces, impact map, data paths, walk-throughs, gaps table (ID `GAP-NN`, what, where, resolution, status). Pass 2 appends its own section.

## Done when

- Every surface in the inputs has a row in the impact map for every new data element, or a reason it cannot be affected.
- Every new field has its full path.
- Every walk-through reaches its end with a requirement at every step.
- Every gap has a resolution and a status; none open at the gate.
- The dry run (one data element across all surfaces) was shown to Renier before the rest.

## Next

Pass 1: `/check F5`, then F6 (prototype + tests). Pass 2: `/check F7`.
