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
| SF-21 | Advisor review and share: edit or delete generated lines, advisor-only notices, share the analysis and PDFs with the client (added in F6, D-073) | [web: https://sherpaswealth.com/financial-health, advisors edit generated observations]; [brief] |

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
| H2 RSU only, listed | Reads the helper line (E-02) → selects the chip (E-01) → row: employer, owner, optional amount per year (E-03, E-04; D-076); no income question, the advisor asks it (E-05, B-29) → submits; nothing blocks on missing detail (GAP-21) → later sees the analysis with the pending line (E-10), then, once the advisor completes it, the vest lines (C-23, D-06) in the live view and the shared PDF (GAP-04) |
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

## Touchpoints, line by line (D-073)

Every element on each captured screen, walked in the order of the platform's flow. Each line reads as a path: where it is > what it is > what happens, and why. Where the outcome depends on a state (on or off, yes or no), each state gets its own line. The reference in brackets at the end is for traceability: touchpoint ID, then what covers it, then the category (**A** main flow, in the prototype · **B** in the MVP, not in the prototype · **C** outside the main flow, flagged on the board with a possible solution · **Next** specified, but not in the first release, D-080). A screen not yet walked says so.

### Financial health > Summary (dry run, 2026-10-06)

Seen 2026-10-03, `captures/client/01-financial-health`.

- Summary > Household card > no change: the people and their ages stay the same. [TP-SF01-01]
- Summary > Income card > no change: it shows the income the client declared; vests appear beside it, in Savings & Expenses. [TP-SF01-02 · D-054, AC-G-16]
- Summary > Net worth card > no change: shares already received are already counted; shares not yet received are not wealth. [TP-SF01-03 · D-026, AC-B-22]
- Summary > Debt card > no change: nothing new is owed. [TP-SF01-04]
- Summary > Six written paragraphs > can change: the platform writes them from the household data; they use the facts of the new lines the way they already name holdings such as VTI. [TP-SF01-05 · GAP-42, AC-G-17 · B]
- Summary > Five recommendations > can change: "<Y>% of investable assets is in <company> stock" and the tax gap on a vest enter as candidates; the platform's own logic picks the five. [TP-SF01-06 · AC-A-23, AC-C-28 · A]

### Financial health > header, sections and View more (2026-10-06)

Seen 2026-10-03, `captures/client/01-financial-health`, `02-score-breakdown`.

Header
- Header > Household name and analysis date > no change. [TP-SF08-01]
- Header > Score > can move, only for households with employer stock or vest tax due soon; same scale and colours. [TP-SF08-02 · AC-A-09, AC-C-17, AC-G-14 · A]
- Header > Two-sentence score explanation (written by the platform) > can change: same rule as the paragraphs. [TP-SF08-03 · AC-G-17 · B]
- Header > Disclaimer "This reflects the data you've shared..." > no change. [TP-SF08-04]
- Header > Section links (six sections) > no change: no new section. [TP-SF08-05 · D-039]

Retirement & Goals
- Retirement & Goals > Numbered goals > no change. [TP-SF02-01]
- Retirement & Goals > "Current net worth" > no change: unvested shares are not wealth. [TP-SF02-02 · AC-B-22]
- Retirement & Goals > "Net worth at retirement", "End of plan" > no change in the first release; from Next they include future vests after tax, with a label (D-074). [TP-SF02-03 · AC-D-11, D-080 · Next]
- Retirement & Goals > Projected net worth chart > no change in the first release; from Next, a marker for each year with vests, a band for performance units, and the line includes vests after tax. [TP-SF02-04 · AC-D-01, AC-D-03, AC-D-04, D-080 · Next]
- Retirement & Goals > Written paragraphs (shortfall, share of retirement income covered, age when assets run out, extra saving needed) > no change in the first release; from Next they read a projection that includes vests. [TP-SF02-05 · AC-D-11, AC-G-17, D-080 · Next]
- Retirement & Goals > New bullets "<Company> vests: $X after estimated tax..." and "Vests before <goal>..." > new. [TP-SF02-06 · AC-D-06 to AC-D-08 · A]
- Retirement & Goals > "We should look into" > no change. [TP-SF02-07]

Assets & Investments
- Assets & Investments > Assets bar and its breakdown (bank accounts, investable assets, real estate, vehicles, other) > no change: employer shares are already inside investable assets; unvested is not an asset. [TP-SF03-01 · AC-B-22]
- Assets & Investments > Written paragraphs (largest holding, equity share, account mix) > can change: employer stock named as VTI is today. [TP-SF03-02 · AC-G-17 · B]
- Assets & Investments > New bullet "<Company> stock held across <n> accounts..." > new, when shares are flagged. [TP-SF03-03 · AC-A-14 · A]
- Assets & Investments > New line "If every scheduled grant vests, <company> stock would be <Z>%..." > new, when there are unvested grants. [TP-SF03-04 · AC-A-16 · A]
- Assets & Investments > New block "Stock compensation not yet vested (not in net worth)" > new: the vest list, "Awaiting a liquidity event" for a private employer, or the pending line. [TP-SF03-05 · AC-B-23, AC-B-27, AC-B-19, AC-E-10 · A]
- Assets & Investments > "We should look into" > changed: adds "<Y>% of investable assets is in <company> stock." [TP-SF03-06 · AC-A-15 · A]

Debt management
- Debt management > Debt-to-income, housing ratio, monthly payment > no change: they read declared income. [TP-SF04-01 · AC-G-16]
- Debt management > Liabilities by category > no change. [TP-SF04-02]
- Debt management > Written paragraphs, "We should look into" > no change expected; covered by the rule for paragraphs. [TP-SF04-03 · AC-G-17]

Savings & Expenses
- Savings & Expenses > Flow from income to taxes, housing, debt, savings, expenses, free cash flow > no change: declared income and today's tax lines. [TP-SF05-01 · D-054]
- Savings & Expenses > New bullet per year "<Year> vests: $X of income, estimated tax $Y, gap after withholding $Z." > new. [TP-SF05-02 · AC-C-23 · A]
- Savings & Expenses > New collapsible "Tax on each vest" > new. [TP-SF05-03 · AC-C-29 · A]
- Savings & Expenses > Written paragraphs > can change: vest tax named as other figures are. [TP-SF05-04 · AC-G-17 · B]
- Savings & Expenses > "We should look into" > changed: adds "Tax on the <month year> vest may exceed withholding by $X." when it falls soon. [TP-SF05-05 · AC-C-24 · A]

Insurance & Protection
- Insurance & Protection > Emergency fund (months of reserve) > no change: a vest is not cash until it arrives. [TP-SF06-01 · AC-D-05]
- Insurance & Protection > Life insurance need per person > no change: reads declared income. [TP-SF06-02 · AC-G-16]
- Insurance & Protection > Umbrella against net worth > no change: unvested is not net worth. [TP-SF06-03 · AC-B-22]
- Insurance & Protection > Written paragraphs, "We should look into" > no change expected. [TP-SF06-04 · AC-G-17]

View more
- View more > Key takeaways (written by the platform) > can change: picked from the checks, so they may name employer stock or vest tax. [TP-SF08-06 · D-039]
- View more > Cash flow row > changed: adds "Savings rate and debt ratios read reported income; vests are shown separately." [TP-SF08-07 · AC-C-27 · A]
- View more > Debt and Protection rows > no change. [TP-SF08-08 · AC-G-16]
- View more > Liquidity row > changed: adds the tax due on upcoming vests, federal only when the state rate is missing, and performance units at target. [TP-SF08-09 · AC-C-20 to AC-C-22 · A]
- View more > Investing row, concentration > changed: "Largest position" beside "Employer stock (<company>)...", and the pay line when it is the current employer. [TP-SF08-10 · AC-A-12, AC-A-13 · A]
- View more > Limits line > no change: no new limit. [TP-SF08-11 · AC-G-14]
- View more > "Give feedback on this score" > no change. [TP-SF08-12]
- View more > Help Center links > not defined yet: the article "How is the score calculated?" would no longer describe the concentration and liquidity checks fully. Proposal: an article update in the release notes. [TP-SF08-13 · GAP-44 · C]

### Questionnaire, client (2026-10-06)

Seen 2026-10-05, `captures/questionnaire/03-fresh` (screenshots and notes). Firm setting on; with it off, every step is exactly as today (AC-G-01).

- Welcome > Title, text, "Get your score" > no change. [TP-SF15-01]
- Documents > Drop zone and eight categories > changed behind the screen: a plan statement uploaded here, under "Investment & retirement accounts", becomes a proposal the advisor confirms; the step itself does not change. A category of its own is for after the MVP. [TP-SF15-02 · AC-F-13, D-077 · A]
- Documents > Continue without uploading > no change: uploading stays optional. [TP-SF15-03]
- Personal information > Names, co-client, birth dates, dependents > no change; the people listed here are the owners offered in the stock row. [TP-SF15-04]
- Personal information > Zip code > no change on screen; it sets the state used for tax on each vest. [TP-SF15-05 · F-C]
- Goals > Retirement age, college, goal picker, goal rows > no change on screen; the goals are what vests are compared against. [TP-SF15-06 · AC-D-07]
- Income > Employment income per person > changed: a helper line below it, "Paid partly in company stock? Add it below as Stock compensation." [TP-SF15-07 · AC-E-02 · A]
- Income > "What other current income?" chips > new chip "Stock compensation". [TP-SF15-08 · AC-E-01 · A]
- Income > Stock compensation row > new, with the same fields as every other chip row: the employer as its name, the owner, and an optional amount per year. The advisor completes the rest. [TP-SF15-09 · AC-E-03 to AC-E-05, D-076 · A]
- Income > Row validation > new: only the employer is required; an empty amount is fine; nothing blocks the questionnaire. [TP-SF15-10 · AC-E-04, AC-E-20 · A]
- Income > "Other income" chips (current and future) > not defined yet: a client may enter stock pay there instead of the new chip; the helper line points to the chip, but nothing tells the advisor. [TP-SF15-11 · GAP-45 · C]
- Income > Social Security prefilled at 67 > no change: it reads declared income. [TP-SF15-12 · AC-G-16]
- Income > "Benefit plan income" block (firm setting) > changed: the chip goes there too. [TP-SF15-13 · EC-E-07 · B]
- Every step > "Anything to add about..." chat > no change; stock pay mentioned only there is not picked up. [TP-SF15-14 · GAP-40 · C]
- Investments > Account rows (name, type, custodian, owner, balance) > no change: no account type for equity compensation is added. [TP-SF15-15 · D-058]
- Investments > Holdings search and balance > no change on screen; employer shares are entered as any stock and flagged later by the advisor. [TP-SF15-16 · AC-A-20, AC-E-17]
- Investments > Link account, Upload statement > no change; held shares that arrive this way are the open question of GAP-39. [TP-SF15-17 · GAP-39 · C]
- Investments > Risk level > no change. [TP-SF15-18]
- Expenses, Real estate, Liabilities, Insurance > every field > no change. [TP-SF15-19]
- End > "Thank you" screen and its options > no change. [TP-SF15-20]
- End > On submit, behind the screen > new: each stock row becomes a grant "pending detail" and the opportunity gets the alert "Stock pay: detail pending"; an uploaded statement becomes a proposal. [TP-SF15-21 · AC-E-07, AC-E-08, AC-F-13 · A]

### Advisor (2026-10-06)

Not seen: the exercise has no advisor login [brief, section 4]. Steps rebuilt from the score article, the questionnaire definition, the opportunity record and the website (frame A on the board). Firm setting on.

- A1 Send the questionnaire > Opportunity and link > no change; with the setting on, the client's Income step shows the chip. [TP-SF16-01 · AC-E-01]
- A2 Receive the answers > Opportunity alerts > new: "Stock pay: detail pending" while any grant is pending; removed when none is. [TP-SF16-02 · AC-E-08, AC-E-09 · A]
- A2 Receive the answers > "Submit and continue" and processing > changed behind the screen: each stock row becomes a grant pending detail; the analysis is generated anyway. [TP-SF16-03 · AC-E-07, AC-E-20 · A]
- A3 Advisor mode > Stock compensation row > changed: opens the full grant editor instead of the client row. [TP-SF17-01 · AC-E-15 · A]
- A3 Advisor mode > Investments block > changed: "Flag as employer stock" on each held position. [TP-SF17-02 · AC-A-20 · A]
- A4 Data & Assumptions > Held position > new action "Flag as employer stock": employer, person, current employer (yes, no, unknown); cost basis from Next. [TP-SF17-03 · AC-A-01, AC-A-02 · A; AC-A-03 · Next]
- A4 Data & Assumptions > Suggestion "<Company> (<ticker>) is held in <accounts>. Flag as employer stock?" > new: one per employer, flagged only when the advisor confirms. [TP-SF17-04 · AC-E-17, AC-E-18 · A]
- A4 Data & Assumptions > Notice "Price not available for <ticker>: not counted in concentration." > new. [TP-SF17-05 · AC-A-08 · A]
- A4 Data & Assumptions > Grant editor > new: owner, type (RSU or PSU), employer and ticker, grant date, units; a pattern (length, frequency, cliff) that generates dated tranches, each editable; PSU condition and range; private employer with or without dates; the 409A value from Next. [TP-SF17-06 · AC-B-01 to AC-B-04, AC-B-07 to AC-B-10, AC-B-16 to AC-B-20 · A]
- A4 Data & Assumptions > Grant editor > Client estimate > new: the client's employer and amount, labelled "Client estimate, not used in the figures". [TP-SF17-07 · AC-E-14 · A]
- A4 Data & Assumptions > Grant editor > Income question > new: "Does the salary on file include stock that vested this year?", unanswered until the advisor answers. [TP-SF17-08 · AC-B-29 · A]
- A4 Data & Assumptions > Grant editor > State withholding rate > new, optional, hidden when the household pays no state tax; a notice while it is missing. [TP-SF17-09 · AC-C-07, AC-C-08, AC-C-13 · A]
- A4 Data & Assumptions > Grant editor > Past and forfeited tranches > new: "Vested on <date>: record the shares kept as a held position."; forfeited tranches leave the figures; shares kept and cost basis per tranche from Next (AC-B-14). [TP-SF17-10 · AC-B-11 to AC-B-14 · A]
- A4 Data & Assumptions > Grant editor > Reported grant notice > new: "Only RSU and PSU are modelled in this version..." [TP-SF17-11 · AC-E-16 · A]
- A4 Data & Assumptions > Save > changed: saving a stock change reprocesses the analysis, after a warning when a manual score adjustment would be replaced. [TP-SF17-12 · AC-B-05, AC-B-06, AC-G-12 · A]
- A5 Documents > Upload in the grant editor > new: extraction proposes grants and tranches next to the document, labelled "Extracted from <document>, not confirmed"; the advisor edits, confirms or rejects; nothing counts until confirmed; no held positions are created. [TP-SF17-13 · AC-F-01 to AC-F-12 · A]
- A5 Documents > Statement for a grant the client already reported > changed: confirming it completes the pending grant; no second grant. [TP-SF17-14 · AC-F-14 · A]
- A5 Documents > Statement uploaded where the advisor uploads documents today (the opportunity's documents) > changed behind the screen: processed like one uploaded in the grant editor. [TP-SF16-04 · AC-F-15 · B]
- A6 Review > Score and View more > changed, as in Financial health. [TP-SF08 · see Financial health]
- A6 Review > Manual score adjustment (within 10 points) > no change; a later stock save replaces it, after the warning. [TP-SF08-14 · AC-B-06]
- A6 Review > Edit or delete each new line before sharing > changed: the new lines can be edited or deleted like other generated lines. [TP-SF21-01 · AC-G-07 · A]
- A6 Review > Advisor notices > new, shown only to the advisor. [TP-SF21-02 · AC-G-11 · A]
- A7 Share > Live view and PDF > changed: the same new lines, with the advisor's edits, in both; no advisor notice in either. [TP-SF21-03 · AC-G-10, AC-G-11 · A]

### Investment analysis, Statements, reports, firm settings and the rest (2026-10-06)

Seen 2026-10-03 (`captures/client/03-*`, `04-*`, `06-reports`), except the firm settings screen, which was not seen.

- Investment analysis > Summary cards (allocation, return, risk, current against proposed) > no change: holdings and the proposal do not change. [TP-SF09-01 · D-055]
- Investment analysis > Written paragraphs > can change: same rule as the Financial health paragraphs, limited to the snapshot line below; to confirm that the rule covers this tab. [TP-SF09-02 · GAP-47 · B]
- Investment analysis > Snapshot (amount invested, accounts by type and holder) > changed: adds the employer stock line when shares are flagged. [TP-SF09-03 · AC-A-22 · A]
- Investment analysis > Purpose buckets, including "concentrated stock risk" > no change: a single large employer position reaches the bucket as today. [TP-SF09-04 · D-055, EC-A-13]
- Investment analysis > Performance, allocation, stress scenarios > no change. [TP-SF09-05]
- Investment analysis > Accounts and holdings panel > changed: a flagged position shows "Employer stock (<Name>)". [TP-SF10-01 · AC-A-21 · A]
- Investment analysis > Portfolio deep dive (cash, allocation) and target allocation > no change: a vest is not cash before it arrives; targets do not change. [TP-SF11-01 · AC-D-05, D-055]
- Statements > Balance sheet, household and per owner > no change: flagged shares keep their value; unvested is not net worth. [TP-SF12-01 · AC-B-22]
- Statements > Cash flow statement > changed: a line below the total, "Stock compensation (vests this year), not in the totals above: $X, estimated tax $Y." Wording when the salary already includes the vests: GAP-41. [TP-SF13-01 · AC-C-26, GAP-41 · A]
- Reports > Summary PDF > changed: the cover score can move; the same new lines as the live view, with the advisor's edits; no advisor notice. [TP-SF14-01 · AC-G-10, AC-G-11 · A]
- Reports > Investment analysis PDF > changed: the employer stock line of the snapshot. [TP-SF14-02 · AC-A-22 · B]
- Reports > Report list, viewer, download > no change. [TP-SF14-03]
- Social Security estimate and contributions > no change: they read declared income. [TP-SF18-01, TP-SF19-01 · AC-G-16]
- Firm settings > "Stock compensation" setting > new: on, the feature appears; off, everything as today; off after use, data kept and hidden, figures back to today's from the next reprocessing. Who turns it on (a firm admin) is inferred. [TP-SF20-01 · AC-G-01, AC-G-02, AC-G-13 · A]
- Existing households > no change until the advisor adds data. Not covered, after the MVP: the advisor has no list of existing clients with stock pay; options are suggesting households that hold single stocks, resending only the Income section, or reading CRM notes already attached to the opportunity. [TP-SF16-05 · D-052 · C]

## Pass 2 · gaps found while building (F6)

Found while building the prototype (`prototype/`, D-062). Each goes back to the spec and the log; none is fixed silently in code. The full pass 2 on the prototype runs in F7.

| ID | What | Where | Resolution | Status |
|---|---|---|---|---|
| GAP-28 | The parameter table says how each check reads a figure and how areas are weighted, but not how the check scores of one area combine into its points; the simulator cannot compute an area without it | `00_index` parameters | A parameter `P-AREA-MIX`, not public, SIMULATED as equal weights within an area [ASSUMPTION: confirm] | Resolved, D-066: `00_index` parameters |
| GAP-29 | AC-A-14 reads "held across <n> accounts"; with employer stock in one account (H3, H7) it renders "held across 1 accounts" | F-A AC-A-14, AC-A-22 | With one account, "<Company> stock held in 1 account: $<value>, <Y>% of investable assets." | Resolved, D-066: AC-A-14 |
| GAP-30 | A private employer's grant with vest dates (time condition entered, double trigger) is neither "awaiting" (AC-B-19 needs no dates) nor complete (AC-B-28 needs a listed employer), so it falls to "pending detail" and the client sees "<Name> reported pay in <company> stock. It is not yet included in these figures." (AC-E-10), which reads wrong for a grant the advisor entered in full | F-B AC-B-19 | A private employer's grant shows "Awaiting a liquidity event" with or without vest dates; it stays out of every figure (AC-G-05) | Resolved, D-068: AC-B-19 |
| GAP-31 | F-C asks to show, for each vest, the tax owed by level (AC-C-03), the gap (AC-C-10, AC-C-11) and the PSU range (AC-C-16), but quotes no label for them and names no surface; AC-C-12, AC-C-14 and AC-C-15 quote labels without a surface | F-C | A collapsible "Tax on each vest" in Savings & Expenses, after the per-year bullets (AC-C-23), one group per vest, with "Estimated tax on this vest: $<total> (federal $<a>, Social Security and Medicare $<b>, state $<c>), at the <analysis date> price and today's tax rules." and "Estimated gap after withholding: $<gap>, at the <analysis date> price and today's tax rules."; PSU figures add "at target (range $<min> to $<max>)" | Resolved, D-069: AC-C-29 |
| GAP-32 | AC-E-17 asks to suggest flagging a held position with the employer's ticker but quotes no label; one suggestion per position repeats near-identical notices when the shares sit in several accounts | F-E AC-E-17 | One suggestion per employer naming every account: "<Company> (<ticker>) is held in <accounts>. Flag as employer stock?"; the advisor still confirms each position (AC-E-18) | Resolved, D-070: AC-E-17 |
| GAP-33 | A client reports stock pay (a grant pending detail, no grant date) and the advisor then confirms the same grant from the plan statement: AC-F-09 matches duplicates by employer and grant date, so the pending grant stays beside the confirmed one, the alert stays, and the client still reads "<Name> reported pay in <company> stock. It is not yet included in these figures." until the advisor deletes it | F-F AC-F-09, F-E AC-E-09 | Proposed: confirming a proposal with the same owner and employer as a grant pending detail completes that grant (keeps its client estimate and report date) instead of adding a second one | Resolved, D-078: AC-F-14 |
| GAP-34 | The questionnaire's "Stock compensation" row asks for employer, ticker, award type, unvested value, frequency, the salary question (D-028) and an upload prompt; every other Income chip opens a row with type, name, one owner and an amount with a frequency, and accounts come in the next step (Investments). The row may add friction and a pattern the client does not see elsewhere | F-E AC-E-03, D-030, D-031, D-056; `questionnaire_map.md` "Seen on screen, 2026-10-05" | Compare against their Income flow (F6 flows review, D-072); options for Renier, any spec change as a new D-NNN | Resolved, D-076: AC-E-03 to AC-E-05 |
| GAP-35 | The prototype opens the documents step from the Income row, after Income; in their questionnaire the documents step comes first, before Personal information, and already takes "Investment & retirement accounts". The client should upload there; if they do not, the advisor uploads, as designed (D-057) | F-E AC-E-19 to AC-E-21, F-F AC-F-13 | Place the plan statement in their existing documents step; no second upload point unless the flows review shows a need | Resolved, D-077: AC-E-19 |
| GAP-36 | The guided scenes follow the features (F-A first), not the order things happen; a reader meets the analysis before the client has reported anything. Titles read as isolated cases, not as touchpoints of one feature | `prototype/src/model/scenes.ts`, D-065 | Order scenes by the flow (questionnaire, advisor completes the grant, flag held shares, concentration, tax at vest, vests and goals, then review, edit and share) and title each as a touchpoint ("1 · Questionnaire: the client says they are paid in stock") | Open |
| GAP-37 | The six analysis sections are all on Financial health, the unchanged ones grey "Unchanged, as today" (D-064), but a reader does not see which sections a scene changes and which it leaves alone | `prototype/src/ui/FinancialHealth.tsx`, `SceneDetail.tsx` | A section index at the top of each scene: changed, unchanged and why | Open |
| GAP-38 | The projection chart in Retirement & Goals exists today [FACT: platform_map, 01-financial-health]; the prototype draws our imitation and does not say so, so a reader may take the whole chart as new. What F-D adds is the vest markers (AC-D-03) and the PSU band (AC-D-04) | F-D, `ProjectionChart.tsx` | A note on the chart: "The platform's chart, imitated. New: vest markers and the PSU band." | Open |
| GAP-39 | Held employer shares can arrive from a linked account (Plaid) or an uploaded account statement, not only by hand; AC-E-17 suggests the flag for "a held position with the employer's ticker" but does not say whether it applies whatever the source | F-E AC-E-17; `questionnaire_map.md` Investments | Proposed: the suggestion applies to every held position, whatever its source; unvested grants never arrive this way (R-013) | Open |
| GAP-40 | Each questionnaire section opens an "Anything to add" chat; a client may mention stock pay only there. Whether that text reaches the analysis is not known | F-E; `questionnaire_map.md` "Seen on screen" | Proposed: no change, the Income chip is the route; the enablement material tells advisors to read the chat for stock pay | Open |
| GAP-41 | AC-C-26 writes "Stock compensation (vests this year), not in the totals above" for every household with vests this year. Where the client answered that their reported income already includes this year's vests (AC-E-05 yes, AC-E-11), those vests are inside the salary line, so "not in the totals above" may be wrong for them. To verify against AC-E-11 and the prototype (`src/model/lines.ts`) | F-C AC-C-26, F-E AC-E-11 | Proposed: on "yes", the line reads "Stock compensation (vests this year), included in salary above: $<value>, estimated tax $<owed>."; on "no" or "not sure", as today | Open, to verify |
| GAP-42 | Each section of Financial health opens with paragraphs the platform writes from the household data (six in Summary). No requirement says whether they mention employer stock, the tax at vest or stock pay pending detail, so the narrative and the new lines below it may disagree | SF-01 to SF-06; TP-SF01-05 | Proposed: the paragraphs may use only the facts of the new lines (AC-A-14, AC-A-15, AC-C-23, AC-C-24, AC-E-10), phrased as facts (AC-G-06); the prototype shows them as fixed text, not generated | Resolved, D-075: AC-G-17 |
| GAP-43 | Vests enter the projection as inflows (AC-D-01), so the projected line and every figure read from it would move: "Net worth at retirement", "End of plan", the retirement shortfall, the share of retirement income covered, the age when liquid assets run out and the extra saving needed. No requirement says whether they move; the prototype raises the line but the platform's other figures would not follow, so one screen could show two stories | F-D AC-D-01; SF-02; TP-SF02-03 to TP-SF02-05 | Decision for Renier: (a) every projection figure includes vests after tax; (b) the line and its figures stay as today and vests show as markers and bullets beside them; (c) both, today's line plus a second "with vests" line | Resolved, D-074: AC-D-11 |
| GAP-44 | The score article in the Help Center describes the concentration check as "concentration in the largest position" and does not mention tax due on vests in Liquidity; after the change it would no longer describe what View more shows | SF-08; TP-SF08-13 | Proposed: the release notes ask for the article to be updated (`08_release_notes.md`) | Open |
| GAP-45 | A client may report stock pay under "Other income" (current or future) instead of the "Stock compensation" chip. The amount then enters as ordinary income, no grant is created and the advisor is not told | F-E; TP-SF15-11 | Proposed: none in the MVP beyond the helper line (AC-E-02); the enablement material asks advisors to check "Other income" rows for stock pay; after the MVP, suggest the chip when an "Other income" name mentions stock, RSU or shares | Open |
| GAP-46 | Advisors upload documents to the opportunity today, and the platform classifies them [FACT: questionnaire_map, 2026-10-05]. A plan statement uploaded there, rather than in the grant editor, is not covered: AC-F-01 names the grant editor and AC-F-13 the client's documents step | F-F; TP-SF16-04 | Proposed: a plan statement is processed the same way whatever the upload point (grant editor, opportunity documents, client documents step) | Resolved, D-079: AC-F-15 |
| GAP-47 | The Investment analysis tab opens with paragraphs the platform writes (for example on concentration in Financial Services). AC-G-17 names "each section" and the score explanation, which reads as Financial health only | SF-09; TP-SF09-02 | Proposed: AC-G-17 covers every paragraph the platform writes for the client, including the Investment analysis tab, limited there to the snapshot line of AC-A-22 | Open |
