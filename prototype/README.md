# Prototype · stock compensation in the Financial Health analysis

SIMULATED. A reference implementation of the spec in `docs/spec/`, not production code and not Sherpas code or data (D-004, D-012, D-063). Every household, company, price and state tax rate is invented; the federal and FICA rules are the real 2026 ones (`docs/12_stock_comp_rules.md`).

## Run it

Node 20 or later, from this folder:

```
npm install
npx playwright install chromium   # once, for the browser walk
npm run dev        # the prototype, opens on "Start here"
npm run check      # consistency of the docs, unit and screen tests, build, traceability (fails if the spec's Test cells are out of date)
npm run e2e        # the end-to-end walk in a real browser (H2)
npm run trace -- --write   # rewrites the spec's Test cells and traceability table from the test titles
```

## What to look at

"Start here" shows the flow in five steps and five guided scenes, in the order things happen (D-117). In each scene a bar says what to do, what the screen shows and how the model changes; "Do it" runs the step's action and "Next step" switches view. "Explore freely" opens every household, the client view, advisor mode, the shared PDF and the firm switch. NEW and CHANGED marks, and dots on tabs, show what the feature adds or changes (D-114).

1. Maya is paid partly in RSUs: from questionnaire to shared report
2. Withholding that will not cover the tax
3. Vests that help fund a goal
4. A PSU with a performance range
5. An existing client: the advisor adds the grant

## Pilot, prototype and spec

What the pilot (the first release) covers and what comes later is the MVP cut in `docs/06_direction.md`, each row with its reason; it is not repeated here. This table says how the prototype shows the first release.

| First release | In the prototype | Spec only, and why |
|---|---|---|
| Employer stock as one position in concentration; flag by hand or on confirming a grant, with Undo (F-A, AC-E-17) | Yes: scenes 1 and 2 | |
| RSU and PSU grants with dated tranches, a delivery date per tranche (F-B) | Yes: scenes 1, 4 and 5 | Value at delivery for tranches delivered earlier this year (AC-B-33): common with quarterly plans, not built |
| Tax at vest, withholding gap, Liquidity check; income tax by delivery year, Social Security and Medicare by vest year (F-C) | Yes: scene 2, and the December-to-January case in the sample "three grants" statement | Keeping the tax of a tranche delivered earlier this year in the year's figures until December (AC-C-31, AC-C-32) |
| Vests in the projection as wages of their delivery year; every figure read from it labelled (F-D) | Yes: scene 3; the saved share follows the household's saving rate, SIMULATED (D-118) | A check that counts income not dependent on markets (part of AC-D-11): the prototype has no such check |
| Income asked without stock compensation; a Stock compensation row; a grant pending detail with an alert (F-E) | Yes: scene 1 | Proposals from the questionnaire chat or an "Other income" row (AC-E-22 to AC-E-24): need the platform's context mechanism (A-27) |
| Plan statement read, one review, "Confirm all"; completes the grant the client reported (F-F) | Yes: scene 1; extraction is SIMULATED, fixed per sample document | Upload to the opportunity's documents page (AC-F-15): no such page here; the same processing runs from Data & Assumptions and the client's documents step |
| Firm setting, PDF, sharing (G) | The firm switch and the print view | Only Sherpas switches the setting (AC-G-18); the notice when it is turned off after use (AC-G-19); the share event (EV-G-01); the platform's written paragraphs (AC-G-17) |
| Head of household filing status in the tax figures | No: the simulator uses single and joint | Not built (D-123): no SIMULATED household files as head of household, so no figure shown changes; the spec computes it through the platform's tax engine (AC-C-03) |

The full list, criterion by criterion, with its test or its reason, is printed by `npm run trace` and written into the spec by `npm run trace -- --write` (the Test column of each feature file and the Traceability section of `docs/spec/00_index.md`, which also says what these tests check and why they are not QA, D-119); the reasons live in `src/model/scope.ts`.

## How it is built

`src/model/` holds the types, the SIMULATED households and parameters (`params.ts`, each `P-` value labelled), one module per feature and the score simulator; `src/ui/` the screens; `tests/` the unit and screen tests, each title starting with the criterion it proves; `e2e/` the single browser walk. No HTML, CSS or JavaScript comes from the platform (D-012, D-015).
