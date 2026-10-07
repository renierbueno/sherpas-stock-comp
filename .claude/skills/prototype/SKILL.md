---
name: prototype
description: Use in phase F6 to build the reference implementation of the stock-compensation spec in prototype/ (household model, score simulator, analysis and questionnaire screens) with each acceptance criterion linked to its test, and to fill the traceability table of docs/spec/00_index.md. One feature at a time, on its own branch. Not for changing requirements (spec), finding flow gaps (flow-review) or auditing the phase (check).
---

# Prototype

Goal: show the spec holds up and is precise enough to build from (D-004). Every in-scope acceptance criterion has a test that names it; every criterion left out says why. The prototype is a reference, not engineering's plan.

## Input

- `docs/spec/00_index.md` (G rules, shared data, simulator parameters) and the feature file `docs/spec/F-X_…`.
- `docs/10_flow_review.md`: households H1 to H7 and the walk-throughs.
- `docs/design_tokens.md`; scale-1 screenshots in `captures/` as visual reference only.
- Decisions D-061 (no deploy in F6, static build), D-062 (stack and tests), D-063 (scope, SIMULATED), D-064 (look), D-012 and D-015 (our own code only).

## Layout (fixed paths)

| Path | Holds |
|---|---|
| `prototype/src/model/` | Types, SIMULATED households and parameters, one module per feature, the score simulator, report lines. No UI. |
| `prototype/src/ui/` | Screens: questionnaire Income step, advisor editors, analysis view (client view, advisor mode, print view). |
| `prototype/tests/unit/` | Vitest: model and simulator, one file per feature (`F-X.test.ts`). |
| `prototype/tests/component/` | Vitest + Testing Library: rendered screens, one file per feature. |
| `prototype/e2e/` | The single Playwright walk (H2). |
| `prototype/scripts/trace.ts` | Builds the traceability table from test titles; fails if an in-scope AC has no test. |

## Rules

- **Test titles start with their IDs:** `it('AC-A-04 · EC-A-03 · sums exposure across accounts and owners')`. The trace script reads only these.
- **Scope per D-063.** A criterion not built is listed in `prototype/src/model/scope.ts` with its reason (`spec only: <why>`); the trace script prints it as such.
- **SIMULATED is labelled** in file headers, in the households' names and on screen (a banner on every view).
- **Parameters `P-…`** live in one file with their SIMULATED values and `[ASSUMPTION: confirm]`; tests assert relations, never absolute scores, except where the spec gives the figure (EC-A-01).
- Every tax or legal constant in the simulator carries its SC-NN and is checked by tests/unit/rules.test.ts (D-100).
- **Labels are copied from the spec verbatim.** A label that cannot be rendered as written is a gap.
- **Gaps:** if a requirement cannot be built as written (ambiguous, contradicts another, needs a missing decision), stop on that line, log it in `docs/10_flow_review.md` under "Pass 2 · gaps found while building" and bring Renier options (D-046). Never fix it silently in code.
- **Own code only** (D-012, D-015): no HTML, CSS or JavaScript from `captures/`. No platform data: names, figures and tickers are SIMULATED.
- **Git** (D-009): branch `f6-prototype`; small commits per feature, message names the AC IDs; every commit shown to Renier first.

## Steps per feature

1. Read the feature; list its ACs as built, component-tested, e2e or spec only.
2. Model: types and functions; unit tests for each `unit` AC and each simulator relation listed in the feature.
3. Screens: the surfaces the feature touches; component tests for each `e2e` AC.
4. `npm test` and `npm run trace` green; screenshot of the feature's view saved in `prototype/docs/screens/`.
5. Show Renier: the view running locally, the trace rows of the feature, any gap. Then the commit proposal.

After all features: the Playwright walk, the traceability table pasted into `docs/spec/00_index.md`, `prototype/README.md` (how to run, what is SIMULATED, what is spec only).

## Output

- `prototype/` as above; `npm run dev`, `npm test`, `npm run e2e`, `npm run trace`, `npm run build` (static, D-061).
- `docs/spec/00_index.md` Traceability: feature · AC IDs · test IDs · status (built, spec only: why).
- Gaps found, if any, in `docs/10_flow_review.md` and the decision log.

## Done when

- Every AC of the six features and G is in the trace output: with at least one test, or spec only with its reason.
- Each simulator relation listed under "Simulator tests" in each feature has a unit test.
- `npm test`, `npm run e2e` and `npm run build` pass; output shown, not asserted.
- Every view carries the SIMULATED banner; households H1 to H7 are labelled SIMULATED in title and first line.
- No file in `prototype/` comes from `captures/`; the pre-commit hook passes.
- Renier has seen the prototype running locally.
- The dry run (one feature end to end) was shown to Renier before the rest.

## Next

`/check F6`, Renier's gate, then F7 (flow-review pass 2 on the prototype, delivery).
