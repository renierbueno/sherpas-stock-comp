# 10 · Flow review

What the stock-compensation change touches that no decision or requirement covers (D-048). Method: `.claude/skills/flow-review/SKILL.md`. Pass 1 on paper (phase F5, D-053), 2026-10-05, with the client questionnaire seen on screen the same day; every gap resolved (D-054 to D-060). Pass 2 (on the prototype, F7) appends its own section.

Households in the walk-throughs are SIMULATED.

## Surfaces

| ID | Surface | Source |
|---|---|---|
| SF-01 | Summary: cards (household, income, net worth, debt), narrative, five recommendations | [FACT: platform_map, 01-financial-health] |
| SF-02 | Retirement & Goals: projected net worth chart, goal and shortfall markers | [FACT: platform_map, 01-financial-health] |
| SF-03 | Assets & Investments: asset totals by category | [FACT: platform_map, 01-financial-health] |
| SF-04 | Debt management: debt-to-income, housing ratio, monthly payment | [FACT: platform_map, 01-financial-health] |
| SF-05 | Savings & Expenses: flow from income to taxes, housing, debt, savings, expenses, free cash flow | [FACT: platform_map, 01-financial-health] |
| SF-06 | Insurance & Protection: emergency fund, life cover per person, umbrella | [FACT: platform_map, 01-financial-health] |
| SF-07 | "We should look into" box of each section | [FACT: platform_map, 01-financial-health] |
| SF-08 | Score and View more: areas, checks, key takeaways, limits line, score feedback; manual adjustment | [FACT: platform_map, 02-score-breakdown]; [brief] |
| SF-09 | Investment analysis: snapshot by account type, purpose buckets incl. concentrated stock risk, allocation, performance, stress scenarios | [FACT: platform_map, 03-investment-analysis] |
| SF-10 | Accounts and holdings panel | [FACT: platform_map, 03a-accounts-holdings] |
| SF-11 | Cash and allocation deep dive; target allocation | [FACT: platform_map, 03b, 03c] |
| SF-12 | Balance sheet, household and per owner | [FACT: platform_map, 04, 04b] |
| SF-13 | Cash flow statement: inflows by type, taxes by type, outflows | [FACT: platform_map, 04c-statements-cashflow] |
| SF-14 | Shared PDF reports (Summary PDF with score cover; investment analysis PDF) | [FACT: platform_map, 06-reports]; [brief] |
| SF-15 | Client questionnaire, client mode and advisor mode; end screen | [FACT: questionnaire_map] |
| SF-16 | Opportunity record and its automatic alerts | [FACT: questionnaire_map; captures/questionnaire/02-opportunity] |
| SF-17 | Data & Assumptions; reprocessing | [brief] |
| SF-18 | Automatic Social Security income at 67 | [FACT: questionnaire_map, created without a question] |
| SF-19 | Retirement and savings contributions (401k, cash savings) | [FACT: platform_map, 04c-statements-cashflow] |
| SF-20 | Firm settings: the per-firm settings that already change the questionnaire and its end screen; home of the "stock compensation" setting (D-049) | [FACT: questionnaire_map, per-firm settings]; the settings screen itself was not seen |

The client sees SF-01 to SF-14 live, read only, plus the PDFs the advisor shares [FACT: platform_map, scope]. So any text placed in those surfaces reaches the client unless a requirement says otherwise (GAP-09).

## Dry run · vest income (reviewed 2026-10-05)

Kept as shown to Renier. Its gaps are carried into the full map below.

| Surface | Affected? | Covered by | Gap |
|---|---|---|---|
| SF-01 Summary income card | Yes: income may include current-year vests | none | GAP-01 |
| SF-02 Projection | Yes | F-D AC-D-01 to AC-D-09 | GAP-08 (found in the full pass) |
| SF-03 Asset totals | No: income, not an asset | | |
| SF-04 Debt-to-income, housing ratio | Yes: if they read income, they improve with vests; the Debt score moves | none | GAP-02 |
| SF-05 Savings & Expenses flow | Yes: vest income and its tax enter the flow | F-C tax figures; the flow itself: none | GAP-01 |
| SF-06 Life cover need | Unknown: whether the need reads income is not public [brief] | none | GAP-03 |
| SF-07 "We should look into" | Yes, through F-C and F-D | AC-C-24, AC-D-07 | |
| SF-08 Cash flow area, savings rate | Yes: income up with savings unchanged lowers the savings rate; the Cash flow score moves | none | GAP-02 |
| SF-08 Liquidity, near-term commitments | Yes | AC-C-17 to AC-C-22 | |
| SF-09 to SF-11 Investments | No: income, not a holding | | |
| SF-12 Balance sheet | No: unvested is not net worth | AC-B-22 | |
| SF-13 Cash flow statement | Yes: no line for vest income today; taxes by type change | F-C for the tax figures; the income line: none | GAP-01 |
| SF-14 Shared PDF | Yes: the same lines must appear and read on their own | AC-G-07 covers editing only | GAP-04 |
| SF-15, SF-16 Questionnaire, opportunity | No: vest income is computed, not asked | | |
| SF-17 Data & Assumptions | Yes: the D-028 answer and the grants drive it | AC-E-11 to AC-E-13, AC-B-05 | |
| SF-18 Social Security | Unknown: vests are wages for FICA (R-001); whether the estimate reads wages is not public | none | GAP-05 |
| SF-19 Contributions | Unknown: whether 401k contributions are a share of salary | none | GAP-05 |

## Impact map · every element × every surface

Elements: **Flag** (employer flag on a held position) · **Grant** · **Tranche** · **VInc** (vest income) · **VTax** (tax on vest, withholding, gap) · **Pend** (pending detail) · **Priv** (private employer grant) · **Prop** (proposed grant from a statement).

Cell: a requirement (`A-09` = `AC-A-09`) that covers it, `GAP-NN`, or `·` = not affected, with the reason in the last column.

| Surface | Flag | Grant | Tranche | VInc | VTax | Pend | Priv | Prop | Why `·` |
|---|---|---|---|---|---|---|---|---|---|
| SF-01 Summary | A-14, A-15; GAP-06 | GAP-07 | B-22 | GAP-01, GAP-02 | GAP-02 | E-10; GAP-07 | B-19; GAP-07 | F-03 | |
| SF-02 Projection | · | D-09 | D-01 to D-04 | D-01; GAP-08 | D-02 | G-04 | G-05 | F-03 | Flag: a held position is projected as today |
| SF-03 Assets | A-14 | B-22 | B-22 | · | · | G-04 | B-21 | F-03 | VInc, VTax: income, not an asset |
| SF-04 Debt | · | · | · | GAP-02 | GAP-02 | G-04 | G-05 | F-03 | Flag, Grant, Tranche: debt checks read liabilities and income, not holdings [FACT: data_model] |
| SF-05 Savings & Expenses | · | C-23 | C-23 | C-23; GAP-01, GAP-02 | C-23; GAP-02 | G-04 | G-05 | F-03 | Flag: a holding |
| SF-06 Protection | · | · | D-05 | GAP-03 | · | G-04 | G-05 | F-03 | Flag: liquid assets read as today; Grant, VTax: not read by cover or umbrella |
| SF-07 Look into | A-15 | · | C-24 | · | C-24 | GAP-09 | · | · | Grant, VInc: shown through tranches and tax; Priv, Prop: out of every figure |
| SF-08 Score, View more | A-09 to A-13, A-19 | · | C-17, C-19 | GAP-02 | C-17 to C-22 | G-04 | G-05 | F-03 | Grant: read through its tranches. All columns: GAP-10 (adjustment), GAP-20 (limits) |
| SF-09 Investment analysis | GAP-11 | GAP-11 | D-05 | · | · | · | · | · | VInc, VTax: income; Pend, Priv, Prop: out of every figure |
| SF-10 Holdings panel | GAP-19 | B-22 | B-12 | · | · | · | A-05; GAP-24 | F-11 | Not holdings |
| SF-11 Cash, allocation | · | · | D-05 | · | · | · | · | · | Flag: allocation reads the position as today; the rest is not a holding |
| SF-12 Balance sheet | · | B-22 | B-22 | · | · | G-04 | B-21 | F-03 | Flag: already in the sheet as a position; VInc, VTax: income |
| SF-13 Cash flow statement | · | GAP-01 | GAP-01 | GAP-01, GAP-02 | GAP-01, GAP-02 | G-04 | G-05 | F-03 | Flag: a holding |
| SF-14 PDFs | GAP-04, GAP-18 | GAP-04 | GAP-04, GAP-18 | GAP-04 | GAP-04 | GAP-04, GAP-09 | GAP-04 | F-03; GAP-09 | |
| SF-15 Questionnaire | E-17 (after) | E-01 to E-07; GAP-13, GAP-23 | · | E-05 | C-09 | E-07; GAP-21 | E-03 | · | Tranche: not asked of the client (D-030); Prop: no client upload (D-042) |
| SF-16 Opportunity | · | EV-B-01 | · | · | · | E-08, E-09; GAP-21 | E-09 | EC-F-04 | Flag, Tranche, VInc, VTax: no alert needed |
| SF-17 Data & Assumptions | A-01 to A-03, A-08; GAP-22 | B-01, B-04 to B-06; GAP-14, GAP-15 | B-07 to B-14; GAP-16 | E-11 to E-13; GAP-15 | C-07, C-13 | E-13, E-14 | B-18 to B-21 | F-01 to F-12 | All columns: GAP-10 (reprocessing) |
| SF-18 Social Security | · | · | · | GAP-05 | · | · | · | · | Only wages could change it |
| SF-19 Contributions | · | · | · | GAP-05 | · | · | · | · | Only wages could change it |
| SF-20 Firm settings | G-01 | G-01, G-02 | G-01 | G-01 | G-01 | G-01 | G-01 | G-01 | All: GAP-12 (turning the setting off) |

Resolved by this map without a new requirement:
- EC-A-13 (concentrated stock risk bucket): a single large employer position reaches the bucket as any held position does today; employer stock split across accounts does not, and that is GAP-11.
- EC-D-07 (kept shares after the vest date): resolved by GAP-08.
- Key takeaways (SF-08): the platform picks them from the checks; new figures enter only through existing checks (D-039), so no requirement is needed.

## Data paths · every new field

Entered → stored → read → shown → exported. `PDF` means the Summary PDF; the client sees the same live (SF-01 to SF-14).

| Field | Entered | Stored | Read by | Shown | Exported |
|---|---|---|---|---|---|
| Firm setting | SF-20, firm admin | Firm | Every feature (G-01, G-02) | SF-20 | No |
| Employer flag: employer, person | D&A or advisor mode, on a held position (A-01; where: GAP-22); suggested from the ticker (E-17, E-18) | Employer flag | Exposure (A-04), check (A-09) | View more (A-12), Assets (A-14), Look into (A-15); holdings tag (GAP-19) | PDF: the report lines (GAP-04) |
| Current employer (yes, no, unknown) | With the flag (A-02) | Employer flag | Pay line (A-13) | View more (A-13) | PDF (GAP-04) |
| Cost basis | Flag (A-03), tranche (B-14) | Employer flag, tranche | None in the MVP (gain or loss is later, D-041) | D&A only | No |
| Employer: listed or private, ticker | Questionnaire (E-03); grant editor (B-04) | Employer | Price for every tranche figure; exposure (A-05); suggestion (E-17) | Grant section (GAP-07) | PDF (GAP-04) |
| Market price | Platform market data [FACT: data_model] | Platform | Tranche value (C-02), exposure (A-04) | Labelled with its date (GAP-18) | PDF (GAP-18) |
| 409A value and date | Grant editor (B-20) | Employer | Nothing (information only) | B-21 | PDF (GAP-04) |
| Grant: owner, type, employer, date, units | Questionnaire as pending (E-07); grant editor (B-01 to B-04); extraction (F-02) | Grant | Tranches; completeness (GAP-14) | Grant section (GAP-07) | PDF (GAP-04) |
| Grant status | System (E-07, F-02, B-19; complete: GAP-14) | Grant | Every figure (G-04, G-05, F-03) | Pending line (E-10), alert (E-08) | Pending line in PDF (GAP-04); proposed never (GAP-09) |
| Client estimates (type, value, frequency) | Questionnaire (E-03) | Grant | Nothing (D-035) | Grant editor only (E-14) | No |
| D-028 answer (income includes this year's vests) | Questionnaire (E-05); grant editor (GAP-15) | Grant (per person) | Wages (E-11, E-12); status (E-13) | D&A notice (E-13) | No |
| PSU terms and range | Grant editor (B-16, B-17); extraction (F-02) | PSU terms | Range figures (A-17, B-24, C-16, D-04) | Grant section, View more, projection band | PDF, range written beside the number (D-045) |
| Tranche: date, units | Generated (B-07), edited (B-08, B-09), extracted (F-02) | Tranche | Value (C-02), wages (C-01), projection (D-01), Z (A-18), check (C-17) | Grant section (B-23, B-24), bullets (C-23, D-06) | PDF (GAP-04) |
| Tranche forfeited | Grant editor (B-13) | Tranche | Removed from every figure | Grant section | PDF: not listed |
| Shares kept after withholding | Grant editor (B-14) | Tranche | Nothing: exposure reads held positions (A-04) | D&A only | No |
| State withholding rate | D&A or advisor mode, per grant (C-07 to C-09) | Grant | State gap (C-11) | Tax lines (C-12), notice (C-13) | PDF: tax lines (GAP-04); notice never (GAP-09) |
| Plan statement | Grant editor (F-01) | Document, as the platform stores uploads today | Extraction (F-02) | Beside proposed values (F-04) | No |
| Vest income (computed) | | | Vest tax (C-03), projection (D-01); ratios: GAP-02 | Savings & Expenses (C-23); cash flow statement and income card: GAP-01 | PDF (GAP-04) |
| Tax owed, withholding, gap (computed) | | | Liquidity check (C-17), net inflow (D-02) | C-12, C-14, C-15, C-20, C-23, C-24 | PDF (GAP-04) |
| Employer exposure, Z (computed) | | | Concentration check (A-09) | A-12 to A-16 | PDF (GAP-04); Investment analysis PDF: GAP-11 |

## Walk-throughs

Firm has the setting on unless stated. Each step names the requirement that defines it.

### Client

| Household (SIMULATED) | Steps |
|---|---|
| H1 No stock pay | Adds no stock compensation row (E-06) → questionnaire as today → analysis identical to today (G-03) |
| H2 RSU only, listed | Reads the helper line (E-02) → selects the chip (E-01) → row: owner, employer, ticker, type, value, frequency (E-03, E-04); upload prompt (E-19) → "income includes this year's vests?" (E-05) → submits; nothing blocks on missing detail (GAP-21) → later sees the analysis with the pending line (E-10), then, once the advisor completes it, the vest lines (C-23, D-06) in the live view and the shared PDF (GAP-04) |
| H3 With PSU | As H2, type PSU → sees target figures with their range (A-17, B-24, C-16, D-04) |
| H4 Private employer | As H2, no ticker (E-03) → sees "Awaiting a liquidity event" in the grant section (B-19, GAP-07); nothing in the figures (G-05) |
| H5 Detail pending | As H2, knows only the employer (E-04) → sees the pending line only (E-10); no advisor notice reaches the client (GAP-09) |
| H6 Co-client with stock pay | Two rows, one per owner (E-03) → two grants, one per person (E-07, B-02) |
| H7 Existing household | Not asked again (D-052) → sees the new lines only after the advisor adds data (G-08, G-09) |

### Advisor

| Household (SIMULATED) | Steps |
|---|---|
| H1 No stock pay | Opportunity as today → analysis as today (G-03); may still flag a held position (A-01) |
| H2 RSU only, listed | Alert "Stock pay: detail pending" (E-08) → opens advisor mode or D&A (E-15, B-01) → sees client estimates (E-14) → enters or uploads (B-07, F-01 to F-06) → confirms the income question if the client was not sure (E-13; advisor route: GAP-15) → enters state rate when asked (C-07) → saves: warning if adjusted (B-06; every save: GAP-10) → grant becomes complete (GAP-14) → alert removed (E-09) → flags the held position suggested by the ticker (E-17, E-18) → reads View more, bullets and look into (A-12 to A-16, C-20 to C-24, D-06 to D-08) → edits lines (G-07) → shares the PDF (GAP-04); the Investment analysis tab and its PDF say nothing about split employer stock (GAP-11) |
| H3 With PSU | As H2 → enters performance condition, period end, range (B-16, B-17) → certified units later: edits the tranche units and sets the range to 100% (B-08, B-17) |
| H4 Private employer | Marks the employer private (B-04) → saves with no dates (B-18) → "Awaiting a liquidity event" (B-19) → 409A for information (B-20, B-21) → alert removed: the grant is not pending (E-09) |
| H5 Detail pending | Alert stays (E-08) → analysis generated without the grant (G-04; never blocked: GAP-21) → advisor never completes: the pending line stays in what the client sees (E-10) |
| H6 Co-client | Two grants (B-02) → one exposure if same employer (A-04) → pay line per person (A-13) → withholding $1 million rule per person and employer (GAP-17) |
| H7 Existing household | Firm turns the setting on: nothing changes (G-08) → advisor adds a grant in D&A (G-09, B-01) → nobody has answered the income question (GAP-15) → warning, then reprocessing replaces the manual adjustment (B-06) |
| Any | Ticker with no market price for a grant (GAP-16) |

### Firm admin

| Step | Requirement |
|---|---|
| Turns the setting on | G-01, G-02; D-049 |
| The firm uses its own questionnaire template | GAP-13 |
| Reads what changed and trains advisors | `08_release_notes.md`, `09_enablement.md` |
| Turns the setting off after households have grants | GAP-12 |

## Gaps

Resolution types: requirement (written into the feature after Renier's OK), out (with its decision), open question (D-020 check), decision for Renier.

| ID | What | Where | Resolution | Status |
|---|---|---|---|---|
| GAP-01 | Where vest income shows as income: summary card, Savings & Expenses flow, cash flow statement | F-C | Follows GAP-02 | Resolved, D-054: AC-C-23, AC-C-26 |
| GAP-02 | Do the checks and figures of the current year (savings rate, fixed commitments, debt-to-income, housing ratio, life cover need) read vest income? Today they would move with no decision saying so | F-C, `00_index` G | Decision for Renier | Resolved, D-054: AC-G-16, AC-C-01, AC-C-27 |
| GAP-03 | Life cover need may read income | F-C | Follows GAP-02; no question to Sherpas if the checks read income as today | Resolved, D-054: AC-G-16 |
| GAP-04 | Every new client-facing line reads the same in the live client view and the shared PDF, edits included; PSU range written beside the number | `00_index` G | Requirement | Resolved, D-060: AC-G-10 |
| GAP-05 | Social Security estimate and 401k contributions may read wages. The platform computes Social Security from the household's data [FACT: questionnaire_map, 2026-10-05], so vest income fed as wages would move it | F-C | Out of the MVP: they read salary as today; stated in F-C | Resolved, D-054: AC-G-16, F-C out of scope |
| GAP-06 | The Summary narrative and its five recommendations: D-039 says "a recommendation when they apply", no requirement says how | F-A, F-C | Requirement: the new look-into lines are candidates for the Summary recommendations, chosen by the platform's existing logic, phrased as facts (G-06) | Resolved, D-060: AC-A-23, AC-C-28 |
| GAP-07 | Where the grant section lives (vest list B-23, "Awaiting a liquidity event" B-19, the pending line E-10) | F-B, F-E | Requirement: Assets & Investments section, block "Stock compensation not yet vested (not in net worth)", after the asset totals | Resolved, D-060: AC-B-27 |
| GAP-08 | The projection could count a vest twice: as the inflow of D-01 and again through the year's income; after the vest, what the inflow becomes | F-D | Requirement: each vest counts once, as the D-01 inflow; after its date it is projected as the platform projects cash savings (resolves EC-D-07) | Resolved, D-060: AC-D-10 |
| GAP-09 | Advisor notices sit in surfaces the client sees live: A-08, B-10, B-12, C-13, E-13, E-16, E-17, F-08, F-12, the client estimates (E-14) and proposed grants | `00_index` G | Requirement: these appear only in advisor mode and D&A, never in the client view or the PDF | Resolved, D-060: AC-G-11 |
| GAP-10 | Only saving a grant warns about the manual adjustment (B-06); a flag, a tranche edit, a state rate, a confirmed extraction and the income answer also reprocess | `00_index` G | Requirement: every stock-pay save reprocesses and shows the B-06 warning when an adjustment exists | Resolved, D-060: AC-G-12 |
| GAP-11 | Employer stock split across accounts: the score and the Financial health tab show it, the Investment analysis tab and its PDF do not (EC-A-13) | F-A | Decision for Renier | Resolved, D-055: AC-A-22 |
| GAP-12 | A firm turns the setting off after households have stock-pay data | `00_index` G | Requirement: data kept, hidden, out of every figure from the next reprocessing; analyses already generated and PDFs already shared unchanged; turning it back on restores it | Resolved, D-060: AC-G-13 |
| GAP-13 | A firm uses its own questionnaire template | F-E | Requirement with assumption: the question goes after the gross income question of any Financial Health template [ASSUMPTION: confirm]. Not asked of Sherpas: the work proceeds on the assumption (D-020) | Resolved, D-060: AC-E-21 |
| GAP-14 | No requirement says when a grant becomes complete | F-B | Requirement: complete when it has owner, type, listed employer with ticker, units, at least one future tranche with date and units, and a yes or no to the income question; set by the system, which then removes the alert (E-09) | Resolved, D-060: AC-B-28 |
| GAP-15 | Grants the advisor enters (existing households, advisor mode) never get the income question, so E-11 and E-12 cannot apply and vest income may be counted twice | F-B, F-E | Requirement: the grant editor asks "Does the salary on file include stock that vested this year?" (yes, no, not sure), per person, prefilled with the client's answer | Resolved, D-060: AC-B-29 |
| GAP-16 | A grant of a listed employer whose ticker has no market price | F-B | Requirement: its figures are left out and the advisor sees "Price not available for <ticker>: grant not counted" (as A-07, A-08) | Resolved, D-060: AC-B-30 |
| GAP-17 | The $1 million withholding rule is per employer in C-05; withholding is per employee | F-C | Requirement: per person and employer (edit C-05, EC-C-10) | Resolved, D-060: AC-C-05, EC-C-10 |
| GAP-18 | "At today's price" stays in a PDF read weeks later | F-A, F-C, F-D | Requirement: labels name the price date, "at the <analysis date> price" (A-16, C-04, D-06, B-23) | Resolved, D-060: AC-G-15 and wording of AC-A-16, AC-B-23, AC-C-04, AC-D-06 |
| GAP-19 | Holdings panel: nothing shows that a position is flagged | F-A | Requirement: tag "Employer stock (<Name>)" on the position | Resolved, D-060: AC-A-21 |
| GAP-20 | Could a vest gap or employer exposure trigger a score limit? | `00_index` G | Requirement: no new limit; existing limits read the checks as today (D-039) | Resolved, D-060: AC-G-14 |
| GAP-21 | A pending grant could block submitting the questionnaire or generating the analysis | F-E | Requirement: it never blocks either (D-035) | Resolved, D-060: AC-E-20 |
| GAP-22 | A-01 does not say where the advisor flags a position | F-A | Requirement: on the position, in D&A and in the advisor-mode Investments block | Resolved, D-060: AC-A-20 |
| GAP-23 | Household without a co-client: the "which person" question is useless | F-E | Requirement: skip it and open one row for the client | Resolved, D-056: owner selector in the row (AC-E-03) |
| GAP-24 | EC-A-07 says private shares are "shown as private equity"; no such element is known | F-A | Edge case fix: held private shares stay as the advisor entered them today (the instrument search accepts a free-text instrument [FACT: questionnaire_map, 2026-10-05]) | Resolved, D-060: EC-A-07 |
| GAP-25 | The questionnaire seen on 2026-10-05 adds extra income types as chips, each opening a row with owner, amount and frequency; D-032 placed stock pay as a separate yes/no after the income question | F-E | Decision for Renier | Resolved, D-056: AC-E-01 to AC-E-06 |
| GAP-26 | The client can upload documents in the questionnaire (documents step, and "Upload statement" per account), and uploads go to a context the app classifies and prefills from; D-042 kept the plan statement upload on the advisor side partly because this was unknown | F-E, F-F | Decision for Renier | Resolved, D-057: AC-E-19, AC-F-13 |
| GAP-27 | The platform's type lists already hold a stock compensation asset category (RSU, NSO, ISO, ESPP) and a stock compensation income category (RSU, ESPP, option inflows); the spec defines its own objects and says no element exists | F-B, F-C, `00_index` shared data | Decision for Renier, plus a question to Sherpas | Resolved, D-058: AC-B-31, `00_index` shared data |

### Decision options

**GAP-02 · Do this year's checks read vest income?**

| Option | What | Closes | Leaves open |
|---|---|---|---|
| A | Checks and the income figures read reported income, as today. Vests show beside them: Savings & Expenses bullet (C-23), a line under the cash flow statement total ("Vests this year, not in the totals above: $X, estimated tax $Y"), and in View more "Savings rate and debt ratios read reported income; vests are shown separately." | GAP-01, GAP-03 (need reads income as today), GAP-05 (same rule); no score moves on a price-dependent figure; D-023 holds | A household whose vests are not in reported income looks tighter on debt ratios than it is; the advisor sees the vest lines |
| B | Checks read reported income plus this year's vest income, savings unchanged | Complete income picture | Savings rate falls when stock pay is added (income up, savings the same): the score drops for having stock pay; moves with the price |
| C | As B, and this year's after-tax vest proceeds count as savings | Savings rate consistent with B | Assumes the client keeps or invests the proceeds, against D-037; score moves on a choice the client has not made |

Recommendation: A. For a household that answered "yes", reported income already holds the vests, so A changes nothing for it; for the others, the vest is visible and labelled but does not move the score on a price and a choice we do not know.

**GAP-11 · Does the Investment analysis tab show employer stock split across accounts?**

| Option | What | Closes | Leaves open |
|---|---|---|---|
| A | Out of the MVP; the tab stays as today | Nothing new to build | Two tabs disagree for split holdings; the investment analysis PDF, the report advisors share today, says nothing |
| B | The tab's snapshot and its PDF add the A-14 line; buckets, targets and the proposal unchanged | The two tabs and both PDFs agree on the fact | The concentrated stock bucket still reads per position |
| C | Employer exposure feeds the concentrated stock bucket and its trimming plan | Full consistency | Changes the proposal engine and its advice (D-041: no sell instruction in new lines); outside the MVP cut |

Recommendation: B.

**GAP-25 · Where the client reports stock pay**

| Option | What | Closes | Leaves open |
|---|---|---|---|
| A | Keep D-032: a yes/no right after the employment income question, then one row per person | Explicit prompt for every client | Adds a question for every household, against the D-023 guardrail; not the pattern the Income screen uses today |
| B | A "Stock compensation" chip among "other current income", opening a row in the native style (owner, approximate unvested value, vesting frequency) plus employer, ticker, type and the D-028 question "Does your employment income above include stock that vested this year?" | Nothing new for households without stock pay; native pattern and frequencies; owner selector replaces the "which person" question (closes GAP-23) | The row needs more fields than other chips; a chip is easier to miss than a question |
| C | B, plus one helper line under the employment income field: "Paid partly in company stock? Add it below as Stock compensation." | B, and the prompt where clients state their pay | One more line of text on the Income screen for everyone |

Recommendation: C.

**GAP-26 · Who can upload the plan statement**

| Option | What | Closes | Leaves open |
|---|---|---|---|
| A | Keep D-042: the advisor uploads, in the grant editor | Nothing new for the client | Detail waits for the advisor; the client already has an upload step and does not use it for this |
| B | Also from the client: the stock compensation row says "Upload your plan statement if you have it", pointing to the documents step (Investment & retirement accounts); the upload enters the same proposal and advisor confirmation as F-F | Detail can arrive with the questionnaire (M-02); reuses the existing step and context; nothing reaches the figures until the advisor confirms (D-042) | Still depends on extraction reading plan statements (riskiest assumption 1), as A does |

Recommendation: B.

**GAP-27 · The existing stock compensation categories**

| Option | What | Closes | Leaves open |
|---|---|---|---|
| A | Map the spec onto them: a grant is an element of the stock compensation asset category, sub-type RSU (a PSU is an RSU with performance terms); vest income is the RSU inflow of the stock compensation income category; held shares stay positions; D-026 holds (unvested value out of net worth) | Engineering reuses the taxonomy; the cash flow statement has a native line for vest income (helps GAP-01); the proposal uses the platform's own language | How the analysis treats these categories today is unknown [ASSUMPTION: confirm]; asked of Sherpas |
| B | Keep the spec's own objects; mention the categories in a note | No dependency on an unknown | Ignores a fit the platform already prepared; F-B's context line "no element exists" stays wrong |

Recommendation: A. The other sub-types (options, ESPP) stay out of the MVP: their reasons are tax and lifecycle modelling (D-024, D-041), which the existing categories do not provide.

## Open questions from this pass (D-020 check)

None go to Sherpas (D-059): the one below became an assumption in `02_open_questions.md`. It was drafted as: "Your type lists include a stock compensation asset category (RSU, options, ESPP) and a stock compensation income category. Are they used today on the advisor side or in the analysis, and how do they count in net worth and cash flow?" It changes how F-B and F-C map (GAP-27); the brief, `01_context.md`, the F1 docs and `research.md` do not answer it; the work proceeds on [ASSUMPTION: confirm]. GAP-03 and GAP-05 are settled by the GAP-02 rule; GAP-13 proceeds on a stated assumption; the bucket logic of GAP-11 is not needed for option B.

## Pass 2 · gaps found while building (F6)

Found while building the prototype (`prototype/`, D-062). Each goes back to the spec and the log; none is fixed silently in code. The full pass 2 on the prototype runs in F7.

| ID | What | Where | Resolution | Status |
|---|---|---|---|---|
| GAP-28 | The parameter table says how each check reads a figure and how areas are weighted, but not how the check scores of one area combine into its points; the simulator cannot compute an area without it | `00_index` parameters | A parameter `P-AREA-MIX`, not public, SIMULATED as equal weights within an area [ASSUMPTION: confirm] | Resolved, D-066: `00_index` parameters |
| GAP-29 | AC-A-14 reads "held across <n> accounts"; with employer stock in one account (H3, H7) it renders "held across 1 accounts" | F-A AC-A-14, AC-A-22 | With one account, "<Company> stock held in 1 account: $<value>, <Y>% of investable assets." | Resolved, D-066: AC-A-14 |
| GAP-30 | A private employer's grant with vest dates (time condition entered, double trigger) is neither "awaiting" (AC-B-19 needs no dates) nor complete (AC-B-28 needs a listed employer), so it falls to "pending detail" and the client sees "<Name> reported pay in <company> stock. It is not yet included in these figures." (AC-E-10), which reads wrong for a grant the advisor entered in full | F-B AC-B-19 | A private employer's grant shows "Awaiting a liquidity event" with or without vest dates; it stays out of every figure (AC-G-05) | Resolved, D-068: AC-B-19 |
