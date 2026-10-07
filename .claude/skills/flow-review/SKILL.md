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
1b. **Touchpoints, line by line** (D-073). Walk each surface in the order of the platform's own flow (client questionnaire, client analysis, shared reports, advisor steps, secondary flows) and list every element a person sees or uses: card, figure, chart, generated paragraph, recommendation, field, button, notice, alert, PDF page. Source: the captured page text and screenshots, not memory. One row each, ID `TP-SFNN-nn` under its surface. Each row states: seen or inferred, as a tag right after its ID, then any A-NN the new behaviour rests on (D-113); unchanged, changed or new, with the reason; what covers it (`AC-…`, `D-…` or `GAP-NN`); its category (below). Show one surface to Renier as a dry run before the rest.
2. **Impact map.** For each new data element (employer flag, grant, tranche, vest income, tax on vest, pending status, private grant, proposed grant), and each surface: is it affected? If yes, which requirement covers it (`AC-…`)? If none, it is a gap.
3. **Data paths.** For each new field: where it is entered, stored, read, shown and exported. A step with no requirement is a gap.
4. **Walk-throughs.** Client, advisor and firm admin, each with the SIMULATED households: no stock compensation, RSU only, with PSU, private employer, detail pending, co-client with stock compensation, existing household. Each step names the requirement that defines it; a step with none is a gap.
5. **Sort.** Every touchpoint the change affects gets one category:
   - **A · main flow, in the prototype:** a requirement and a test.
   - **B · in the MVP, not in the prototype:** a requirement; the prototype says it is not shown.
   - **C · outside the main flow:** not solved now; flagged on the board with a possible solution, its assumption and when (next, later, never).
   - **Serious** (a wrong figure or score, an advisor-only line reaching the client, data lost, a legal or consent issue): raised at once and fixed before going on.
   Prioritise by likelihood and impact; do not design for every theoretical case.
6. **Resolve.** Each gap ends as: a new requirement in its feature (written after Renier's OK), "out" with its decision, an open question (D-020 check), or a decision for Renier with options and a recommendation (D-046: no recommendation if no option solves it). Small gaps are grouped into one yes/no.

Before proposing an option, a resolution or a requirement that depends on a US tax or legal rule, check it against `docs/12_stock_comp_rules.md` and cite its SC-NN; a missing or WEAK rule goes to research or becomes an A-NN first (D-100).

## Output (fixed path)

`docs/10_flow_review.md`: surfaces, touchpoints, impact map, data paths, walk-throughs, gaps table (ID `GAP-NN`, what, where, resolution, status). Pass 2 appends its own section. This file is the source of truth; the Miro board mirrors it and never leads. A spec change enters only through a decision Renier confirms; the prototype changes only after the spec.

Miro change maps mirror the touchpoints with one card each, always in this format (D-112): badge `NEW`, `CHANGED` or `NO CHANGE` in its usual colour · `Screen > Element` · `Today:` what it does today (empty for NEW) · `With the feature:` what it does now · `Why:` one line · a grey line with the evidence tag (`Seen`, `Inferred`, plus any `A-NN`) and the covering requirement and decision IDs (D-113). Each map is named `Persona · Page or module · Job to do`; its subtitle says what the person gets, where it sits in the flow and what the prototype shows, then the legend of badges and evidence tags.

## Done when

- Every surface in the inputs has a row in the impact map for every new data element, or a reason it cannot be affected.
- Every touchpoint on the captured screens has a row with its category; a surface not yet walked is marked "not inventoried", never left silent.
- Every new field has its full path.
- Every walk-through reaches its end with a requirement at every step.
- Every gap has a resolution and a status; none open at the gate.
- The dry run (one data element across all surfaces) was shown to Renier before the rest.

## Next

Pass 1: `/check F5`, then F6 (prototype + tests). Pass 2: `/check F7`.
