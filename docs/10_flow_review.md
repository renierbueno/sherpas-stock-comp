# 10 · Flow review

What the stock-compensation change touches that no decision or requirement covers (D-048). Method: `.claude/skills/flow-review/SKILL.md`: surfaces, an impact map, data paths, walk-throughs, touchpoints line by line, then each gap sorted and resolved. Pass 1 on paper (phase F5, D-053), redone on 2026-10-06 for the first release of D-080 as amended by D-101 to D-107: release 1 is F-A; release 2 is F-B, F-C, F-D with the projection, F-E and F-F together; Next is the 409A display, cost basis, shares kept per tranche, options, ESPP and vest conversion (D-037). Every row that rests on a US tax or legal rule cites its `SC-NN` in `12_stock_comp_rules.md` (D-100). Pass 2, on the prototype, runs in F7.

Households in the walk-throughs are SIMULATED.

Decisions taken before this review are written into the spec: the income question excludes company stock (AC-E-02), with a helper line (AC-E-25), and vests are added beside reported income (AC-E-12) (D-094); "Confirm all" (AC-F-18) and the automatic flag with Undo (AC-E-17), with its person and current employer (AC-E-18) (D-090, D-092, D-110); proposals from the chat and from "Other income" (AC-E-22 proposal, AC-E-23 alert, AC-E-24 confirm creates a pending grant; D-093, D-096, D-110); grant complete (AC-B-28; D-109); the salary line in the grant review (AC-F-17; D-108). Rows cite those requirements.

## Surfaces

| ID | Surface | Source |
|---|---|---|
| SF-01 | Summary: cards (household, income, net worth, debt), narrative, five recommendations | [FACT: platform_map, 01-financial-health] |
| SF-02 | Retirement & Goals: projected net worth chart, goal and shortfall markers, the figures read from the projection | [FACT: platform_map, 01-financial-health] |
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
| SF-15 | Client questionnaire, client mode and advisor mode: documents step, Income chips, "Anything to add" chat per section, end screen | [FACT: questionnaire_map] |
| SF-16 | Opportunity record: its automatic alerts and the documents the advisor uploads to it | [FACT: questionnaire_map; captures/questionnaire/02-opportunity] |
| SF-17 | Data & Assumptions and the grant editor; reprocessing | [brief] |
| SF-18 | Automatic Social Security income at 67 | [FACT: questionnaire_map, created without a question] |
| SF-19 | Retirement and savings contributions (401k, cash savings) | [FACT: platform_map, 04c-statements-cashflow] |
| SF-20 | Firm settings: the per-firm settings that already change the questionnaire and its end screen; home of the "stock compensation" setting (D-049) | [FACT: questionnaire_map, per-firm settings]; the settings screen itself was not seen |
| SF-21 | Advisor review and share: edit or delete generated lines, advisor-only notices, share the analysis and PDFs with the client | [web: https://sherpaswealth.com/financial-health, advisors edit generated observations]; [brief] |

The client sees SF-01 to SF-14 live, read only, plus the PDFs the advisor shares [FACT: platform_map, scope]. So any text placed in those surfaces reaches the client unless a requirement says otherwise (AC-G-11).

## Dry run · vest income in the first release (reviewed 2026-10-06)

Vest income enters three places: the tax at vest per tranche (F-C: income tax by delivery year, Social Security and Medicare by vest year), the text lines (F-C, F-D), and the projection as a one-time wage income on the delivery date (D-106). Current-year figures and checks read reported income only (AC-G-16, D-107). The two gaps it found are resolved by D-107.

| Surface | Affected in release 2? | Covered by | Rules |
|---|---|---|---|
| SF-01 Summary income card | Must not change: reads reported income | AC-G-16 (D-107) | |
| SF-02 Retirement & Goals, chart and figures | Yes: each vest as wage income on its delivery date; markers, PSU band; figures labelled | AC-D-01, AC-D-03, AC-D-04, AC-D-10, AC-D-11 | SC-01, SC-02 [ASSUMPTION: A-62] |
| SF-02 Retirement & Goals, bullets | Yes | AC-D-06 to AC-D-08 | |
| SF-03 Asset totals | No: income, not an asset | AC-B-22 | SC-04 |
| SF-04 Debt ratios | No: reported income | AC-G-16, AC-C-27 | |
| SF-05 Savings & Expenses | Yes: bullet per delivery year, "Tax on each vest"; the flow reads reported income | AC-C-23, AC-C-29, AC-G-16 | SC-02 |
| SF-06 Protection | Reserve only: no tranche liquid before its date; life cover reads reported income | AC-D-05, AC-G-16 | |
| SF-07 "We should look into" | Yes: tax gap of a near-term vest, and of a tranche delivered earlier this year | AC-C-24, AC-C-28, AC-C-31 | SC-17 |
| SF-08 Score, View more | Liquidity near-term commitments, including a tranche delivered earlier this year; savings rate reads reported income, with the note | AC-C-17 to AC-C-22, AC-C-27, AC-C-31, AC-G-16 | SC-17 |
| SF-09 to SF-11 Investments | No | | |
| SF-12 Balance sheet | No: unvested is not net worth | AC-B-22 | SC-04 |
| SF-13 Cash flow statement | Yes: one line below the total, "vests this year", not in the totals | AC-C-26, AC-G-16 | SC-02 |
| SF-14 Shared PDF | Yes: same lines and chart | AC-G-10 | |
| SF-15 Questionnaire | No: computed, not asked; the income question excludes company stock | AC-E-02, AC-E-25, AC-E-12 (D-094) | |
| SF-16 Opportunity | No | | |
| SF-17 Data & Assumptions | Yes: tranche dates (vest and delivery), no income question to the advisor | AC-B-32, AC-B-05; D-094 | SC-02, SC-03 |
| SF-18 Social Security | Must not change: reported income only; adding vests to the estimate is Next (D-094) | AC-G-16 | SC-22 [ASSUMPTION: A-62] |
| SF-19 Contributions | Must not change | AC-G-16 | [ASSUMPTION: A-62] |
| SF-20 Firm settings | Off means today's behaviour | AC-G-01, AC-G-13 | |
| SF-21 Advisor review and share | New lines editable; paragraphs use the facts | AC-G-07, AC-G-17 | |

## Impact map · every element × every surface

Elements: **Flag** (employer flag on a held position, by hand or automatic) · **Grant** · **Tranche** (vest date, units) · **Deliv** (delivery date and value at delivery) · **VInc** (vest income, including the projection) · **VTax** (tax on vest, withholding, gap) · **Pend** (pending detail) · **Priv** (private employer grant) · **Prop** (grant proposed from a statement, the chat or "Other income").

Cell: a requirement that covers it (`A-09` = `AC-A-09`), `GAP-NN`, or `·` = not affected, with the reason in the last column. `(Next)` marks a cell outside the first release.

| Surface | Flag | Grant | Tranche | Deliv | VInc | VTax | Pend | Priv | Prop | Why `·`, and rules |
|---|---|---|---|---|---|---|---|---|---|---|
| SF-01 Summary | A-23, G-17 | G-17 | B-22 | · | G-16, G-17 | C-28, G-17 | G-04, G-17 | G-05 | F-03, G-11, E-22 | Deliv: no date in the Summary. VInc: the income card reads reported income (D-107) |
| SF-02 Retirement & Goals | · | D-09 | D-01, D-03, D-04, D-11 | D-01, D-03, D-06, D-07 | D-01, D-10, D-11, G-17 | D-02, D-06, D-07, D-10 | G-04 | G-05 | F-03, E-22 | Flag: a held position is projected as today. VInc: wage income of the delivery year (SC-01, SC-02) [ASSUMPTION: A-62] |
| SF-03 Assets & Investments | A-14, A-15 | B-23, B-27 | B-22, B-23, B-24, A-16, A-17 | B-23 | · | · | E-10 in B-27 | B-19 in B-27; A-05 | F-03, G-11, E-22 | VInc, VTax: income, not an asset; unvested is not property (SC-04) |
| SF-04 Debt | · | · | · | · | G-16 | · | G-04 | G-05 | F-03 | Flag to Deliv: debt checks read liabilities and reported income [FACT: data_model]; VTax: not read |
| SF-05 Savings & Expenses | · | C-23 | C-23, C-29 | C-23, C-30 | C-23; flow G-16 | C-23, C-29, C-12, C-14 to C-16, C-31, C-32 | G-04 | G-05 | F-03 | Flag: a holding. Income tax by delivery year, FICA by vest year (SC-02, SC-03); gap (SC-14, SC-17) |
| SF-06 Protection | · | · | D-05 | D-05 | G-16 | · | G-04 | G-05 | F-03 | Flag: liquid assets read as today; Grant, VTax: not read by cover or umbrella |
| SF-07 Look into | A-15 | · | C-24 | C-24 | · | C-24, C-31, B-28 | G-11 | · | · | Grant, VInc: shown through tranches and tax; Priv, Prop: out of every figure. Gap at filing (SC-17) |
| SF-08 Score, View more | A-09 to A-13, A-19, E-18 | · | C-17, C-19 | C-17 | C-27, G-16 | C-05, C-17 to C-22, C-31, B-28 | G-04 | G-05 | F-03 | Grant: read through its tranches. All columns: G-14 (no new limit). Withholding (SC-14, SC-15), gap (SC-17), PSU at target (SC-05) |
| SF-09 Investment analysis | A-22 | · | · | · | · | · | · | · | · | Grants and income are not holdings; buckets, targets and the proposal unchanged (D-055) |
| SF-10 Holdings panel | A-21, E-18 | · | B-12 | EC-B-19 | · | · | · | A-05, EC-A-07 | F-11 | Grant, VInc, VTax: not holdings. Delivered shares count once, as a position (D-092) [ASSUMPTION: A-60] |
| SF-11 Cash, allocation | · | · | D-05 | · | · | · | · | · | · | Flag: allocation reads the position as today; the rest is not a holding |
| SF-12 Balance sheet | · | B-22, B-31 | B-22 | · | · | · | G-04 | B-22, G-05 | F-03 | Flag: already a position; VInc, VTax: income and tax, not assets or liabilities; unvested is not net worth (SC-04) |
| SF-13 Cash flow statement | · | C-26 | C-26 | C-26, C-30 | C-26; totals G-16 | C-26 | G-04 | G-05 | F-03 | Flag: a holding. Tax year is the delivery year (SC-02) |
| SF-14 PDFs | G-10; A-22 | G-10 | G-10 | G-10 | G-10, D-11 | G-10 | G-10, G-11 | G-10 | G-11, E-22 | |
| SF-15 Questionnaire | · | E-01, E-03, E-04, E-07, E-21 | · | · | E-02, E-12, E-25 | C-09 | E-07, E-20 | E-03 | F-13, E-22 | Flag: flagged later by the advisor (A-20); Tranche, Deliv: not asked of the client (D-030) |
| SF-16 Opportunity | · | E-08 | · | · | · | · | E-08, E-09, E-23 | E-09 | F-15, E-23 | Flag, Tranche, Deliv, VInc, VTax: no alert needed |
| SF-17 Data & Assumptions | A-01, A-02, A-08, A-20, E-17, E-18; A-03 (Next) | B-01 to B-06, B-30, B-31, E-14 to E-16, B-28 | B-07 to B-13; B-14 (Next) | B-32, B-33, F-16 | E-12, F-17 | C-07 to C-09, C-13 | E-14, E-15 | B-18, B-19; B-20, B-21 (Next) | F-01 to F-12, F-14 to F-18, E-22, E-24 | All columns: G-12 (every save reprocesses). Delivery date (SC-02, SC-03) |
| SF-18 Social Security | · | · | · | · | G-16; vests in the estimate (Next, D-094) | · | · | · | · | Only wages could change it; vests are wages for Social Security (SC-22) |
| SF-19 Contributions | · | · | · | · | G-16 | · | · | · | · | Only wages could change it [ASSUMPTION: A-62] |
| SF-20 Firm settings | G-01, G-13 | G-01, G-13 | G-01, G-13 | G-01, G-13 | G-01, G-13, E-02 | G-01, G-13 | G-01, G-13 | G-01, G-13 | G-01, G-13 | |
| SF-21 Advisor review and share | G-07, G-11 | G-07 | G-07 | · | G-07, G-17 | G-07, EC-C-15 | G-11 | G-07 | G-11 | Deliv: shown only inside the lines it dates |

Resolved by this map without a new requirement:
- EC-A-13 (concentrated stock risk bucket): a single large employer position reaches the bucket as any held position does today; split holdings reach the snapshot line (AC-A-22, D-055).
- EC-D-07 (after the delivery date): the vest is wages of that year in the projection, not cash savings (AC-D-10, D-106); shares the advisor records are projected as positions.
- Key takeaways (SF-08): the platform picks them from the checks; new figures enter only through existing checks (D-039).

## Data paths · every new field

Entered, stored, read, shown, exported. `PDF` means the Summary PDF; the client sees the same live (SF-01 to SF-14).

| Field | Entered | Stored | Read by | Shown | Exported |
|---|---|---|---|---|---|
| Firm setting | SF-20, Sherpas in the first release (G-01, G-18) | Firm | Every feature and the income question wording (G-01, G-02, E-02; D-094) | SF-20 | No |
| Reported income, "not counting company stock" | Questionnaire, client or advisor mode (E-02, E-25; D-094) | Salary income per person, as today | Every current-year check and total (G-16); projection as today (D-10) | As today | As today; for income reported under the old wording, the grant review asks to keep company stock out of the salary on file (F-17; D-108) |
| Employer flag: employer, person, current employer | By hand on a held position in D&A or advisor mode (A-01, A-02, A-20); automatic on confirming a grant, with Undo (E-17; D-090, D-092); it sets the grant owner as person and current employer yes, both editable (E-18; D-110) | Employer flag | Exposure (A-04), check (A-09), pay line (A-13) | View more (A-12, A-13), Assets (A-14), look into (A-15), holdings tag (A-21), Investment analysis (A-22) | PDF (G-10); Investment analysis PDF (A-22) |
| Cost basis on a flag | D&A (A-03, Next) | Employer flag | Nothing in the first release (D-080) | D&A only | No |
| Employer: listed or private, ticker | Questionnaire as the row's name (E-03); grant editor (B-04); extraction (F-02) | Employer | Price for every tranche figure (C-02); exposure (A-05); automatic flag (D-092) | Grant section (B-27) | PDF (G-10) |
| Market price | Platform market data [FACT: data_model] | Platform | Tranche value (C-02), exposure (A-04); missing price (A-07, B-30) | Labelled with its date (G-15) | PDF (G-15) |
| 409A value and date | Grant editor (B-20, Next) | Employer | Nothing (information only) | B-21 (Next) | No |
| Grant: owner, type, employer, grant date, units, source | Questionnaire as pending (E-07); grant editor (B-01 to B-04); extraction (F-02); chat or "Other income" proposal (E-22; D-093, D-096) | Grant, as an element of the stock compensation asset category (B-31) [ASSUMPTION: A-12] | Tranches; completeness (B-28; D-109) | Grant section (B-27) | PDF (G-10) |
| Grant status | System (E-07, B-19, F-06, F-14; pending on confirming a chat or "Other income" proposal: E-24; complete: B-28) | Grant | Every figure (G-04, G-05, F-03) | Pending line (E-10), alert (E-08, E-09, E-23) | Pending line in PDF (G-10); proposed never (G-11) |
| Client estimates (employer, amount per year) | Questionnaire row (E-03) | Grant | Nothing (D-035) | Grant editor only (E-14, G-11) | No |
| PSU terms and range | Grant editor (B-16, B-17); extraction (F-02) | PSU terms | Range figures (A-17, B-24, C-16, D-04, D-11) (SC-05) | Grant section, View more, projection band | PDF, range beside the number (G-10) |
| Tranche: vest date, units | Generated (B-07), edited (B-08, B-09), extracted (F-02) | Tranche | Value (C-02), FICA year (C-30), Z (A-18); forfeited (B-13) (SC-03, SC-06) | Grant section (B-23, B-24) | PDF (G-10) |
| Delivery date "Shares delivered on" | Prefilled with the vest date, edited (B-32); proposed by extraction (F-16) [ASSUMPTION: A-59] | Tranche | Income tax year (C-01, C-30), per-year bullet (C-23), cash flow line (C-26), Liquidity (C-17), projection date (D-01), leaving the figures (B-11) (SC-02) | Inside the lines it dates; every income, cash, goal and chart line reads the delivery date; only Social Security and Medicare and the "Vested on" prompt read the vest date (B-12, B-23, C-17, C-24, D-03, D-05 to D-07; D-110) | PDF through those lines (G-10) |
| Value at delivery | Grant editor, per delivered tranche, "From the W-2 or the plan statement" (B-33) [ASSUMPTION: A-58] | Tranche | Tax and gap of a tranche delivered this year (C-31, C-32) (SC-01, SC-17) | Inside its tax group and the Liquidity line; labelled "delivered on <date>, at its value on delivery" (C-32; D-110) | PDF through those lines (G-10) |
| Tranche forfeited | Grant editor (B-13) | Tranche | Removed from every figure (SC-04) | Grant section | PDF: not listed |
| Shares kept and cost basis per tranche | Grant editor (B-14, Next) | Tranche | Nothing: exposure reads held positions (A-04) | D&A only | No |
| State withholding rate | D&A or advisor mode, per grant (C-07 to C-09) | Grant | State gap (C-11), Liquidity (C-18) | Tax lines (C-12), advisor notice (C-13) | PDF: tax lines (G-10); notice never (G-11) |
| Plan statement | Grant editor (F-01), client documents step (F-13), opportunity documents (F-15) | Document, as the platform stores uploads today | Extraction (F-02, F-16) | Beside the proposed values (F-04) | No |
| Proposed grant (statement, chat, "Other income") | Extraction (F-02); chat and "Other income" through the context mechanism (E-22; D-093, D-096) [ASSUMPTION: A-27] | Grant, status proposed; a chat or "Other income" proposal stays advisor-only until confirmed, then becomes a grant pending detail (E-22, E-24; D-110) | Nothing until confirmed (F-03); "Confirm all" (F-18; D-090); completes a pending grant (F-14) | Advisor only (G-11), labelled (F-12); alert while a chat or "Other income" proposal awaits review (E-23) | Never (G-11) |
| Vest income (computed) | | Projection: one-time income of the stock compensation income category (D-01) [ASSUMPTION: A-62] | Vest tax (C-03), projection (D-01, D-10); never current-year checks or totals (G-16) (SC-01, SC-02) | Savings & Expenses (C-23), cash flow line (C-26), Retirement & Goals (D-06, D-07, D-11) | PDF (G-10) |
| Tax owed, withholding, gap (computed) | | | Liquidity check (C-17, C-31), after-tax figures (D-02, D-11); the projection uses the same tax on each vest (D-10; D-110) (SC-14, SC-17) | C-12, C-14, C-15, C-20, C-23, C-24, C-29 | PDF (G-10) |
| Employer exposure, Z (computed) | | | Concentration check (A-09) | A-12 to A-16 | PDF (G-10); Investment analysis PDF (A-22) |

## Walk-throughs

Firm has the setting on unless stated. Each step names the requirement that defines it (short form as in the impact map).

### Client

| Household (SIMULATED) | Steps |
|---|---|
| H1 No stock pay | Reads "Total annual income before taxes, not counting company stock" and the helper line (E-02, E-25; D-094); the answer means the same for them (D-023) → adds no stock compensation row (E-06) → analysis identical to today (G-03, A-11, C-25, D-09) |
| H2 RSU only, listed | Enters income without company stock (D-094) → selects the chip (E-01) → row: employer as its name, owner, optional amount per year (E-03, E-04; D-076) → may upload the plan statement in the documents step (E-19, F-13) → submits; nothing blocks (E-20) → sees the pending line (E-10) until the advisor confirms → then sees the vest list (B-23, B-27), the bullet per delivery year and "Tax on each vest" (C-23, C-29), the look-into line when a gap falls soon (C-24), the Retirement & Goals bullets (D-06 to D-08), the projection and retirement figures with vests, labelled (D-01, D-03, D-11), and the concentration lines once the shares are flagged (A-12 to A-16), the same in the shared PDF (G-10) |
| H2 variant: mentions stock pay only in the chat | Writes it in "Anything to add" → proposed to the advisor (E-22; D-093) [ASSUMPTION: A-27] → the client sees nothing until the advisor confirms, since the proposal is advisor-only (E-22, G-11; D-110) → then as H2 |
| H2 variant: enters stock pay as "Other income" | The row counts as reported income, as today (G-16) → proposed to the advisor (E-22; D-096) → the client sees nothing until the advisor confirms (E-22, G-11; D-110) → the advisor deletes the row if it duplicates the grant (D-096) |
| H3 With PSU | As H2, the advisor records a PSU → sees target figures with their range (A-17, B-24, C-16), the band on the chart and "at target" on the retirement figures (D-04, D-11) (SC-05) |
| H4 Private employer | As H2 → sees "Awaiting a liquidity event" in the grant section (B-19, B-27); nothing in the figures or the projection (G-05) |
| H5 Detail pending | As H2, knows only the employer (E-04) → sees the pending line only (E-10); no advisor notice reaches the client (G-11); nothing in the figures or the projection (G-04) |
| H6 Couple with stock pay | Two rows, one per owner (E-03) → two grants, one per person (E-07, B-02) → each person's vests in the bullets and the projection (C-23, D-01) |
| H7 Existing household | Not asked again (D-052) → sees the new lines only after the advisor adds data (G-08, G-09); the salary on file was reported without the stock exclusion, so the grant review asks the advisor to keep company stock out of it (F-17; D-108) |

### Advisor

| Household (SIMULATED) | Steps |
|---|---|
| H1 No stock pay | Opportunity as today → analysis as today (G-03); may still flag a held position by hand (A-01, A-20) |
| H2 RSU only, listed | Alert "Stock pay: detail pending" (E-08) → opens advisor mode or D&A (E-15, B-01) → sees the client estimate (E-14) → opens the client's statement or uploads one (F-01, F-13, F-15) → one review beside the document, edits, "Confirm all" (F-04, F-05, F-12, F-18; D-090) → the proposal completes the pending grant (F-14) → delivery dates proposed or prefilled with the vest date (F-16, B-32) → held positions with the ticker flagged at once, whatever their source, with Undo, each set to the grant owner as person and current employer yes, both editable (E-17, E-18; D-090, D-092, D-110) → no income question; the review asks to keep company stock out of the salary on file (F-17; D-094, D-108) → state rate when asked (C-07, C-08, C-13) → save reprocesses, warning if adjusted (B-05, B-06, G-12) → grant complete (B-28; D-109) → alert removed (E-09) → reads View more, bullets, look into and the projection (A-12 to A-16, C-20 to C-24, C-29, D-06 to D-11) → edits lines (G-07) → shares the live view and the PDF, without advisor notices (G-10, G-11); the Investment analysis tab and its PDF state the exposure (A-22) |
| H2 variant: chat or "Other income" proposal | Sees the proposed grant, advisor-only, with the alert "Stock pay: detail pending" while it awaits review (E-22, E-23; D-093, D-096, D-110) → confirms, which creates a grant pending detail, or rejects, which creates nothing (E-24) → completes as H2 → deletes a duplicate "Other income" row (D-096) |
| H3 With PSU | As H2 → enters performance condition, period end, range (B-16, B-17) → delivery date after certification (B-32; EC-C-13) [ASSUMPTION: A-61] (SC-02, SC-03) → certified units later: edits the tranche units and sets the range to 100% (B-08, B-17) |
| H4 Private employer | Marks the employer private (B-04) → saves with or without dates (B-18) → "Awaiting a liquidity event" (B-19) → 409A for information (B-20, B-21, Next) → alert removed: the grant is not pending (E-09) |
| H5 Detail pending | Alert stays (E-08) → analysis generated without the grant (G-04, E-20) → advisor never completes: the pending line stays in what the client sees (E-10) |
| H6 Couple with stock pay | Two grants (B-02) → one exposure if same employer (A-04); the automatic flag sets a joint position to the grant owner as person, editable (E-18; D-110) → withholding at 37% above $1 million per person and employer (C-05, EC-C-10; D-102) (SC-14, SC-15); counted by delivery year, tranches delivered earlier that year included (C-05; D-110) → FICA per person (C-14) (SC-20, SC-23); Additional Medicare owed on combined wages is a known edge case (EC-C-16; D-103) (SC-24) |
| H7 Existing household | Firm turns the setting on: nothing changes (G-08) → advisor adds a grant in D&A (G-09, B-01) → no income question (D-094); the salary on file may include vests, so the grant review asks to keep company stock out of it (F-17; D-108) → warning, then reprocessing replaces the manual adjustment (B-06, G-12) |
| December vest delivered in January | The advisor sets "Shares delivered on" to 5 January (B-32) or the extraction proposes it (F-16) → income tax and the bullet in the next year, the projection on 5 January (C-01, C-23, C-30, D-01) (SC-02) → Social Security and Medicare in the vest year (C-30; EC-C-12) (SC-03) → the chart marker, the goal line and the look-into month show the delivery year (C-24, D-03, D-07; D-110) |
| Tranche delivered earlier this year | The tranche leaves the vest list and the projection (B-11) → prompt "Vested on <date>: record the shares kept as a held position." (B-12) → advisor enters the value at delivery (B-33) → its tax and gap stay in the year's figures, the Liquidity check and the look-into line until year end (C-31, C-32; EC-C-14) (SC-17) → the bullet, the cash flow line and "Tax on each vest" list it, labelled "delivered on <date>, at its value on delivery" when entered (C-23, C-26, C-29, C-32; D-110) → when it was the grant's last tranche, the grant stays complete until year end (B-28, EC-B-04; D-109) |
| Undo the automatic flag | Exposure and the new lines go on reprocessing (EC-A-14, A-11, G-12) |
| Any | Ticker with no market price for a grant (B-30) or a flag (A-07, A-08) |

### Firm admin

| Step | Requirement |
|---|---|
| Sherpas turns the setting on for a pilot firm; the firm admin sees its state | G-01, G-02, G-18; D-049, D-111 |
| The income question changes wording with the setting | AC-E-02, AC-E-25 (D-094) |
| The firm uses its own questionnaire template | AC-E-21 [ASSUMPTION: A-30]; if the wording does not reach it, the grant review asks to keep company stock out of the salary on file (AC-F-17, D-108) |
| Reads what changed and trains advisors; the score article is updated at launch | `08_release_notes.md`, `09_enablement.md`; D-095 |
| Sherpas turns the setting off after households have grants (pilot stop) | G-13, G-19: data kept and hidden; advisors see "Income was reported without company stock. Check the salary on file." in each household with a grant (D-111) |

## Gaps

Resolution types: requirement (written into the feature after Renier's OK), out (with its decision), assumption (D-099), decision for Renier. New gaps from the 2026-10-06 review (GAP-50 to GAP-58) are ordered by likelihood and impact.

| ID | What | Where | Resolution | Status |
|---|---|---|---|---|
| GAP-01 | Where vest income shows as income: summary card, Savings & Expenses flow, cash flow statement | F-C | Beside the figures, never in them: AC-C-23, AC-C-26; the card and the totals read reported income (AC-G-16) | Resolved, D-054, D-107: AC-C-23, AC-C-26, AC-G-16 |
| GAP-02 | Do the checks and figures of the current year (savings rate, fixed commitments, debt-to-income, housing ratio, life cover need) read vest income? | F-C, `00_index` G | Reported income only; vests shown beside them | Resolved, D-054: AC-G-16, AC-C-01, AC-C-27 |
| GAP-03 | Life cover need may read income | F-C | Follows GAP-02 | Resolved, D-054: AC-G-16 |
| GAP-04 | Every new client-facing line reads the same in the live client view and the shared PDF, edits included; PSU range written beside the number | `00_index` G | Requirement | Resolved, D-060: AC-G-10 |
| GAP-05 | Social Security estimate and 401k contributions may read wages; vests are wages for Social Security (SC-22) | F-C | They read reported income in the first release; adding vests to the estimate is Next (D-094) | Resolved, D-054, D-094: AC-G-16 |
| GAP-06 | The Summary narrative and its five recommendations | F-A, F-C | The new look-into lines are candidates, chosen by the platform's existing logic, phrased as facts | Resolved, D-060: AC-A-23, AC-C-28 |
| GAP-07 | Where the grant section lives (vest list, "Awaiting a liquidity event", the pending line) | F-B, F-E | Assets & Investments, block "Stock compensation not yet vested (not in net worth)", after the asset totals | Resolved, D-060: AC-B-27 |
| GAP-08 | The projection could count a vest twice, and what a vest becomes after its date | F-D | Each vest counts once, as wage income of its delivery date, treated as the platform treats wages, not as cash savings (SC-01) | Resolved, D-060, D-106: AC-D-10 |
| GAP-09 | Advisor notices sit in surfaces the client sees live | `00_index` G | They appear only in advisor mode and D&A, never in the client view or the PDF | Resolved, D-060: AC-G-11 |
| GAP-10 | Only saving a grant warned about the manual adjustment; every other stock-pay save also reprocesses | `00_index` G | Every stock-pay save reprocesses and shows the warning when an adjustment exists | Resolved, D-060: AC-G-12 |
| GAP-11 | Employer stock split across accounts: the score and the Financial health tab show it, the Investment analysis tab and its PDF did not | F-A | The snapshot and its PDF add the exposure line; buckets, targets and the proposal unchanged | Resolved, D-055: AC-A-22 |
| GAP-12 | A firm turns the setting off after households have stock-pay data | `00_index` G | Data kept, hidden, out of every figure from the next reprocessing; analyses and PDFs already shared unchanged; turning it back on restores it; in the first release only Sherpas turns it off (D-111) | Resolved, D-060, D-111: AC-G-13, AC-G-18 |
| GAP-13 | A firm uses its own questionnaire template | F-E | The chip goes in any Financial Health template [ASSUMPTION: A-30] | Resolved, D-060: AC-E-21 |
| GAP-14 | No requirement said when a grant becomes complete | F-B | Complete when it has owner, type, listed employer with ticker, units, at least one future tranche with date and units, PSU terms for a PSU; set by the system, which removes the alert. The income-question condition was removed by D-094 (AC-B-28) | Resolved, D-060, D-094: AC-B-28 |
| GAP-15 | Grants the advisor enters never got the client's income question, so vest income could be counted twice | F-B, F-E | No question: the income field excludes company stock, so every future vest is added beside it (AC-E-12); income reported before the change: the grant review line of AC-F-17 (D-108) | Resolved, D-094: AC-E-12 |
| GAP-16 | A grant of a listed employer whose ticker has no market price | F-B | Left out of every figure; advisor notice "Price not available for <ticker>: grant not counted." | Resolved, D-060: AC-B-30 |
| GAP-17 | The $1 million withholding rule was per employer; withholding is per employee | F-C | Per person and employer, vests only (SC-14, SC-15) [ASSUMPTION: A-55] | Resolved, D-060, D-102: AC-C-05, EC-C-10 |
| GAP-18 | "At today's price" stays in a PDF read weeks later | F-A, F-C, F-D | Labels name the price date, "at the <analysis date> price" | Resolved, D-060: AC-G-15 and wording of AC-A-16, AC-B-23, AC-C-04, AC-D-06 |
| GAP-19 | Holdings panel: nothing showed that a position is flagged | F-A | Tag "Employer stock (<Name>)" on the position | Resolved, D-060: AC-A-21 |
| GAP-20 | Could a vest gap or employer exposure trigger a score limit? | `00_index` G | No new limit; existing limits read the checks as today | Resolved, D-060: AC-G-14 |
| GAP-21 | A pending grant could block submitting the questionnaire or generating the analysis | F-E | It never blocks either | Resolved, D-060: AC-E-20 |
| GAP-22 | Where the advisor flags a position | F-A | On the position, in D&A and in the advisor-mode Investments block | Resolved, D-060: AC-A-20 |
| GAP-23 | Household without a co-client: a "which person" question is useless | F-E | Owner selector in the row | Resolved, D-056: AC-E-03 |
| GAP-24 | EC-A-07 said private shares are "shown as private equity"; no such element is known | F-A | Held private shares stay as the advisor entered them (free-text instrument) [FACT: questionnaire_map, 2026-10-05] | Resolved, D-060: EC-A-07 |
| GAP-25 | The questionnaire adds extra income types as chips; a separate yes/no did not follow that pattern | F-E | A "Stock compensation" chip with a row like every other chip row, and a helper line under the income question | Resolved, D-056, D-076: AC-E-01 to AC-E-04 |
| GAP-26 | The client can upload documents in the questionnaire; the plan statement upload was advisor-only | F-E, F-F | The client's statement goes in the existing documents step and enters the same proposal and confirmation | Resolved, D-057, D-077: AC-E-19, AC-F-13 |
| GAP-27 | The platform's type lists already hold stock compensation asset and income categories | F-B, F-C, `00_index` shared data | Map the spec onto them [ASSUMPTION: A-12] | Resolved, D-058: AC-B-31, `00_index` shared data |
| GAP-50 | Serious. Reported income collected without the "not counting company stock" wording may include vests: existing households (D-052), a template the wording does not reach [ASSUMPTION: A-30], or a salary typed from a W-2, whose wages include vests (SC-01). Every future tranche is added beside it (AC-E-12), so the tax on each vest, the gap, Liquidity and the projection read high. The reverse after a firm turns the setting off (AC-G-13): income excludes stock and nothing adds it | F-E, F-B; SF-15, SF-17, SF-20 | A fixed advisor-only line in the grant review, shown on every confirmation or save, asking to keep company stock out of the salary on file; no new data or rule | Resolved, D-108: AC-F-17 |
| GAP-51 | Serious. A grant whose last tranche was delivered earlier this year (the final tranche of any grant, or a client who left the employer and forfeited the rest) has no future tranche, so it is not complete (AC-B-28 needs one), EC-B-04 says it contributes nothing and AC-C-01 needs a complete grant: the gap D-107 keeps until year end may never reach the Liquidity check or the look-into line (SC-17) | F-B AC-B-28, EC-B-04; F-C AC-C-31; SF-07, SF-08 | A grant stays complete while it has a future tranche or one delivered in the current tax year; the income answer is no longer a condition (D-094) | Resolved, D-109: AC-B-28, EC-B-04 |
| GAP-52 | Serious. A grant proposed from the chat or an "Other income" row (D-093, D-096) is read by the platform from free text. If it is created as a grant pending detail at once, the client view shows "<Name> reported pay in <company> stock..." (AC-E-10) before any person has checked it, while proposed grants are advisor-only (AC-G-11); the text may also name no employer, which every row needs (AC-E-04). Nothing says whether it raises the alert | F-E; SF-01, SF-03, SF-14 to SF-17 | Advisor-only proposal that raises the existing alert and becomes a grant pending detail only when the advisor confirms | Resolved, D-110: AC-E-22, AC-E-23, AC-E-24 |
| GAP-53 | Lines still read "vest" dates after D-101: the "Vested on" prompt (AC-B-12), the vest list date (AC-B-23), chart markers "each year with vests" (AC-D-03), liquid only after "its vest date" (AC-D-05), the date range (AC-D-06), "Vests before <goal>" (AC-D-07), the horizon (AC-C-17) and "<month year> vest" (AC-C-24). For a December vest delivered in January each could show a different year from the bullet and the projection (SC-02, SC-03) | F-B, F-C, F-D | Delivery date for every income, cash, goal and chart line; vest date only for Social Security and Medicare (AC-C-30) and the "Vested on" prompt | Resolved, D-110: AC-B-12, AC-B-23, AC-C-17, AC-C-24, AC-D-03, AC-D-05, AC-D-06, AC-D-07 |
| GAP-54 | A tranche delivered earlier this year keeps its tax and gap (AC-C-31), but the per-year bullet's income (AC-C-23) and the cash flow line ("future tranches delivered this year", AC-C-26) do not say whether they list it, so the bullet could show its tax without its income; and AC-C-32 labels a tranche valued at the advisor's value at delivery "as AC-C-04", that is "at the <analysis date> price", which is wrong for that value | F-C AC-C-23, AC-C-26, AC-C-29, AC-C-32; SF-05, SF-13 | A tranche delivered this year shows in the year's bullet, the cash flow line and "Tax on each vest", labelled "delivered on <date>, at its value on delivery" when entered | Resolved, D-110: AC-C-23, AC-C-26, AC-C-29, AC-C-32 |
| GAP-55 | The after-tax vest figures of the bullets (AC-D-02, AC-D-06, AC-D-07) use the F-C tax at today's price and rules; the projection applies the platform's own tax to the same wage income (AC-D-10). Nothing says they agree, so "Vests before <goal>: $X after estimated tax" and the retirement figures could tell two stories (SC-13) | F-D AC-D-02, AC-D-10, AC-D-11; SF-02 | The projection uses the tax on each vest computed in F-C, so bullets and projection share one figure | Resolved, D-110: AC-D-10 |
| GAP-56 | The automatic flag on confirming a grant (D-090, D-092) must set the person and "current employer" that AC-A-02 asks for. "Yes" adds the client-visible pay line (AC-A-13); a joint or co-client position takes the grant owner as person | F-A AC-A-02, AC-A-13; F-E AC-E-17, AC-E-18; SF-08, SF-10, SF-17 | Person = grant owner, current employer = yes, both editable | Resolved, D-110: AC-E-17, AC-E-18 |
| GAP-57 | The $1 million test of AC-C-05 counts the person's vest income "in the year" without saying which year (supplemental wages count by the year paid, the delivery year) or whether a tranche delivered earlier this year (AC-C-31) counts toward it (SC-14, SC-15). Rare: above $1 million of vests from one employer | F-C AC-C-05; SF-08 | Delivery year, tranches delivered earlier that year included (SC-15) | Resolved, D-110: AC-C-05 |
| GAP-58 | The Retirement & Goals paragraphs read projection figures that now include vests (AC-D-11), but AC-G-17 lists only AC-D-06 and AC-D-07, so a paragraph could quote net worth at retirement without "includes future vests after estimated tax" | `00_index` AC-G-17; F-D AC-D-11; SF-02 | AC-G-17 covers projection figures and carries the AC-D-11 label | Resolved, D-110: AC-G-17 |
| GAP-59 | After the setting is turned off, households whose income was reported without company stock lose their stock pay from every figure, so income, tax and retirement figures read low | `00_index` AC-G-13; SF-20, SF-17 | In the first release only Sherpas turns the setting on and off (a pilot decision, D-088); on turning it off, advisors see a line in each household with a grant asking to check the salary on file | Resolved, D-111: AC-G-18, AC-G-19 |

## Assumptions this review stands on

None is asked of Sherpas before delivery (D-099); each is an assumption with its fallback in `02_open_questions.md`: the stock compensation categories (A-12), the chat feeding the opportunity's context (A-27), the chip and the income wording in every template (A-30), the $1 million test on vests only (A-55), FICA withheld equal to owed (A-53), the advisor reading the value at delivery (A-58), statements showing the delivery date (A-59), linked accounts read again after delivery (A-60), and the projection reading a one-time stock compensation income as wages while keeping it out of current-year totals (A-62).

## Touchpoints, line by line (D-073)

Every element on each captured screen, walked in the order of the platform's flow. Each line reads as a path: where it is > what it is > what happens, and why. Where the outcome depends on a state, each state gets its own line. The reference in brackets at the end is for traceability: touchpoint ID, then what covers it, then the category (**A** main flow, in the prototype once step F6.5 closes · **B** in the first release, not in the prototype · **C** outside the main flow, flagged on the board with a possible solution · **Next** specified, after the first release, D-080). After the touchpoint ID: seen (observed on the captured screens) or inferred (not observed, rebuilt from the sources named), then any A-NN the new behaviour rests on (D-113). Release 1 is F-A; release 2 is the rest (D-106). A screen not yet walked says so.

### Financial health > Summary

Seen 2026-10-03, `captures/client/01-financial-health`.

- Summary > Household card > no change: the people and their ages stay the same. [TP-SF01-01 · seen]
- Summary > Income card > no change: it shows the income the client declared, which excludes company stock; vests appear beside it, in Savings & Expenses, and the projection's vest income never enters it. [TP-SF01-02 · seen · A-62 · AC-G-16, D-054, D-107]
- Summary > Net worth card > no change: shares already received are already counted; shares not yet received are not wealth. [TP-SF01-03 · seen · D-026, AC-B-22]
- Summary > Debt card > no change: nothing new is owed. [TP-SF01-04 · seen]
- Summary > Six written paragraphs > can change: the platform writes them from the household data; they use the facts of the new lines the way they already name holdings such as VTI. [TP-SF01-05 · seen · AC-G-17, D-075 · B]
- Summary > Five recommendations > can change: "<Y>% of investable assets is in <company> stock" and the tax gap on a vest enter as candidates; the platform's own logic picks the five. [TP-SF01-06 · seen · AC-A-23, AC-C-28 · A]

### Financial health > header, sections and View more

Seen 2026-10-03, `captures/client/01-financial-health`, `02-score-breakdown`.

Header
- Header > Household name and analysis date > no change. [TP-SF08-01 · seen]
- Header > Score > can move, only for households with employer stock or vest tax due soon, including a tranche delivered earlier this year; same scale and colours. [TP-SF08-02 · seen · AC-A-09, AC-C-17, AC-C-31, AC-G-14 · A]
- Header > Two-sentence score explanation (written by the platform) > can change: same rule as the paragraphs. [TP-SF08-03 · seen · AC-G-17 · B]
- Header > Disclaimer "This reflects the data you've shared..." > no change. [TP-SF08-04 · inferred]
- Header > Section links (six sections) > no change: no new section. [TP-SF08-05 · seen · D-039]

Retirement & Goals
- Retirement & Goals > Numbered goals > no change. [TP-SF02-01 · seen]
- Retirement & Goals > "Current net worth" > no change: unvested shares are not wealth. [TP-SF02-02 · inferred · AC-B-22]
- Retirement & Goals > "Net worth at retirement", "End of plan" > changed: they include future vests, entered as wage income on their delivery date, labelled "includes future vests after estimated tax, at the <analysis date> price"; the projection applies the tax on each vest computed in F-C (AC-D-10). [TP-SF02-03 · inferred · A-62 · AC-D-10, AC-D-11, D-106, D-110 · A]
- Retirement & Goals > Projected net worth chart > changed: the line includes each vest as wage income on its delivery date (SC-01, SC-02), with a marker for each year with vests and a band for performance units; a December vest delivered in January marks its delivery year (AC-D-03). [TP-SF02-04 · seen · A-62 · AC-D-01, AC-D-03, AC-D-04, D-106, D-110 · A]
- Retirement & Goals > Written paragraphs (shortfall, share of retirement income covered, age when assets run out, extra saving needed) > changed: they read a projection that includes vests; a paragraph that quotes a projection figure carries the AC-D-11 label (AC-G-17). [TP-SF02-05 · inferred · A-62 · AC-D-11, AC-G-17, D-106, D-110 · A]
- Retirement & Goals > New bullets "<Company> vests: $X after estimated tax..." and "Vests before <goal>..." > new; they read the delivery date (AC-D-06, AC-D-07). [TP-SF02-06 · seen · AC-D-06 to AC-D-08, D-110 · A]
- Retirement & Goals > "We should look into" > no change. [TP-SF02-07 · seen]

Assets & Investments
- Assets & Investments > Assets bar and its breakdown (bank accounts, investable assets, real estate, vehicles, other) > no change: employer shares are already inside investable assets; unvested is not an asset (SC-04). [TP-SF03-01 · seen · AC-B-22]
- Assets & Investments > Written paragraphs (largest holding, equity share, account mix) > can change: employer stock named as VTI is today. [TP-SF03-02 · inferred · AC-G-17 · B]
- Assets & Investments > New bullet "<Company> stock held across <n> accounts..." > new, when shares are flagged, by hand or automatically. [TP-SF03-03 · seen · AC-A-14, D-090 · A]
- Assets & Investments > New line "If every scheduled grant vests, <company> stock would be <Z>%..." > new, when there are unvested grants. [TP-SF03-04 · seen · AC-A-16 · A]
- Assets & Investments > New block "Stock compensation not yet vested (not in net worth)" > new: the vest list with each tranche's date, units and value, "Awaiting a liquidity event" for a private employer, or the pending line; the list shows the delivery date (AC-B-23). [TP-SF03-05 · seen · AC-B-23, AC-B-27, AC-B-19, AC-E-10, D-110 · A]
- Assets & Investments > "We should look into" > changed: adds "<Y>% of investable assets is in <company> stock." [TP-SF03-06 · seen · AC-A-15 · A]

Debt management
- Debt management > Debt-to-income, housing ratio, monthly payment > no change: they read declared income. [TP-SF04-01 · seen · AC-G-16]
- Debt management > Liabilities by category > no change. [TP-SF04-02 · seen]
- Debt management > Written paragraphs, "We should look into" > no change expected; covered by the rule for paragraphs. [TP-SF04-03 · inferred · AC-G-17]

Savings & Expenses
- Savings & Expenses > Flow from income to taxes, housing, debt, savings, expenses, free cash flow > no change: declared income and today's tax lines; the projection's vest income stays out. [TP-SF05-01 · seen · A-62 · AC-G-16, D-054, D-107]
- Savings & Expenses > New bullet per year of delivery "<Year> vests: $X of income, estimated tax $Y, gap after withholding $Z." > new; income tax in the delivery year (SC-02); it lists a tranche delivered earlier this year (AC-C-23). [TP-SF05-02 · seen · AC-C-23, AC-C-30, D-110 · A]
- Savings & Expenses > New collapsible "Tax on each vest" > new: federal, Social Security and Medicare (vest year, SC-03), state, the gap after withholding (SC-14, SC-17). [TP-SF05-03 · seen · A-53 · AC-C-29, AC-C-30 · A]
- Savings & Expenses > Written paragraphs > can change: vest tax named as other figures are. [TP-SF05-04 · inferred · AC-G-17 · B]
- Savings & Expenses > "We should look into" > changed: adds "Tax on the <month year> vest may exceed withholding by $X." when it falls soon, or for a tranche delivered earlier this year until year end; the month is the delivery month, and the grant stays complete while that tranche is in this tax year (AC-B-28). [TP-SF05-05 · seen · AC-C-24, AC-C-31, AC-B-28, D-109, D-110 · A]
- Savings & Expenses > "Tax on each vest" > group for a tranche delivered earlier this year > new: its tax and gap until year end, at the value at delivery when entered (SC-01, SC-17); labelled "delivered on <date>, at its value on delivery" when entered (AC-C-32). [TP-SF05-06 · seen · AC-C-31, AC-C-32, D-107, D-110 · A]

Insurance & Protection
- Insurance & Protection > Emergency fund (months of reserve) > no change: a vest is not cash until it arrives; it counts as liquid only after its delivery date (AC-D-05). [TP-SF06-01 · seen · AC-D-05, D-110]
- Insurance & Protection > Life insurance need per person > no change: reads declared income. [TP-SF06-02 · seen · AC-G-16]
- Insurance & Protection > Umbrella against net worth > no change: unvested is not net worth. [TP-SF06-03 · seen · AC-B-22]
- Insurance & Protection > Written paragraphs, "We should look into" > no change expected. [TP-SF06-04 · inferred · AC-G-17]

View more
- View more > Key takeaways (written by the platform) > can change: picked from the checks, so they may name employer stock or vest tax. [TP-SF08-06 · seen · D-039 · B]
- View more > Cash flow row > changed: adds "Savings rate and debt ratios read reported income; vests are shown separately." [TP-SF08-07 · seen · AC-C-27 · A]
- View more > Debt and Protection rows > no change. [TP-SF08-08 · seen · AC-G-16]
- View more > Liquidity row > changed: adds the tax due on upcoming vests and on a tranche delivered earlier this year, federal only when the state rate is missing, and performance units at target (SC-05, SC-17); a grant whose last tranche was delivered this year stays complete until year end (AC-B-28). [TP-SF08-09 · seen · AC-C-20 to AC-C-22, AC-C-31, AC-B-28, D-109 · A]
- View more > Investing row, concentration > changed: "Largest position" beside "Employer stock (<company>)...", and the pay line when it is the current employer; the automatic flag sets current employer yes, so the pay line shows (AC-E-18). [TP-SF08-10 · seen · AC-A-12, AC-A-13, AC-E-18, D-110 · A]
- View more > Limits line > no change: no new limit. [TP-SF08-11 · seen · AC-G-14]
- View more > "Give feedback on this score" > no change. [TP-SF08-12 · seen]
- View more > Help Center links > changed outside the product: the article "How is the score calculated?" is updated with the release. [TP-SF08-13 · seen · D-095 · B]

### Questionnaire, client

Seen 2026-10-05, `captures/questionnaire/03-fresh` (screenshots and notes). Firm setting on; with it off, every step is exactly as today (AC-G-01).

- Welcome > Title, text, "Get your score" > no change. [TP-SF15-01 · seen]
- Documents > Drop zone and eight categories > changed behind the screen: a plan statement uploaded here, under "Investment & retirement accounts", becomes a proposal the advisor confirms; the step itself does not change. A category of its own is for after the first release. [TP-SF15-02 · seen · AC-F-13, D-077 · A]
- Documents > Continue without uploading > no change: uploading stays optional. [TP-SF15-03 · seen]
- Personal information > Names, co-client, birth dates, dependents > no change; the people listed here are the owners offered in the stock row. [TP-SF15-04 · seen]
- Personal information > Zip code > no change on screen; it sets the state used for tax on each vest. [TP-SF15-05 · seen · AC-C-03]
- Goals > Retirement age, college, goal picker, goal rows > no change on screen; the goals are what vests are compared against. [TP-SF15-06 · seen · AC-D-07]
- Income > Employment income per person > changed: the question reads "Total annual income before taxes, not counting company stock", with a helper line below it pointing to the Stock compensation chip; for households without stock pay it means the same. Vests are added beside it (AC-E-12). Income reported before this wording: the grant review asks the advisor to keep company stock out of the salary on file (AC-F-17). [TP-SF15-07 · seen · A-30 · AC-E-02, AC-E-25, AC-E-12, AC-F-17, D-094, D-108 · A]
- Income > "What other current income?" chips > new chip "Stock compensation". [TP-SF15-08 · seen · A-30 · AC-E-01 · A]
- Income > Stock compensation row > new, with the same fields as every other chip row: the employer as its name, the owner, and an optional amount per year. No question about whether the income includes stock (D-094); the advisor completes the rest. [TP-SF15-09 · seen · AC-E-03, AC-E-04, D-076, D-094 · A]
- Income > Row validation > new: only the employer is required; an empty amount is fine; nothing blocks the questionnaire. [TP-SF15-10 · seen · AC-E-04, AC-E-20 · A]
- Income > "Other income" chips (current and future) > changed behind the screen: a row whose name mentions stock pay is proposed to the advisor as a grant, advisor-only, and becomes a grant pending detail when the advisor confirms; the advisor deletes the row if it duplicates the grant; the client sees nothing before that. [TP-SF15-11 · seen · AC-E-22 to AC-E-24, AC-G-11, D-096, D-110 · B]
- Income > Social Security prefilled at 67 > no change: it reads declared income; adding vests to the estimate is Next (SC-22). [TP-SF15-12 · seen · AC-G-16, D-094]
- Income > "Benefit plan income" block (firm setting) > changed: the chip goes there too; the template shows the block replaces the income questions for some firms, its fields render in a widget not shown in the demo. [TP-SF15-13 · seen · A-24 · EC-E-07 · B]
- Every step > "Anything to add about..." chat > changed behind the screen: a mention of stock pay goes through the platform's context mechanism and is proposed to the advisor as a grant, advisor-only, and becomes a grant pending detail when the advisor confirms. [TP-SF15-14 · seen · A-27 · AC-E-22 to AC-E-24, AC-G-11, D-093, D-110 · B]
- Investments > Account rows (name, type, custodian, owner, balance) > no change: no account type for equity compensation is added. [TP-SF15-15 · seen · D-058]
- Investments > Holdings search and balance > no change on screen; employer shares are entered as any stock and flagged later by the advisor or automatically on confirming a grant. [TP-SF15-16 · seen · AC-A-20, D-090]
- Investments > Link account, Upload statement > no change on screen; held shares that arrive this way are flagged like typed ones when the advisor confirms the grant. [TP-SF15-17 · seen · D-092 · A]
- Investments > Risk level > no change. [TP-SF15-18 · seen]
- Expenses, Real estate, Liabilities, Insurance > every field > no change. [TP-SF15-19 · seen]
- End > "Thank you" screen and its options > no change. [TP-SF15-20 · seen]
- End > On submit, behind the screen > new: each stock row becomes a grant "pending detail" and the opportunity gets the alert "Stock pay: detail pending"; an uploaded statement becomes a proposal. [TP-SF15-21 · seen · AC-E-07, AC-E-08, AC-F-13 · A]

### Advisor

Not seen: the exercise has no advisor login [brief, section 4]. Steps rebuilt from the score article, the questionnaire definition, the opportunity record and the website (frame A on the board). Firm setting on.

- A1 Send the questionnaire > Opportunity and link > no change; with the setting on, the client's Income step shows the chip. [TP-SF16-01 · inferred · A-30 · AC-E-01]
- A2 Receive the answers > Opportunity alerts > new: "Stock pay: detail pending" while any grant is pending; removed when none is; a chat or "Other income" proposal raises it while it awaits review (AC-E-23). [TP-SF16-02 · inferred · AC-E-08, AC-E-09, AC-E-23, D-110 · A]
- A2 Receive the answers > "Submit and continue" and processing > changed behind the screen: each stock row becomes a grant pending detail; the analysis is generated anyway. [TP-SF16-03 · inferred · AC-E-07, AC-E-20 · A]
- A3 Advisor mode > Stock compensation row > changed: opens the full grant editor instead of the client row. [TP-SF17-01 · inferred · AC-E-15 · A]
- A3 Advisor mode > Investments block > changed: "Flag as employer stock" on each held position. [TP-SF17-02 · inferred · AC-A-20 · A]
- A4 Data & Assumptions > Held position > new action "Flag as employer stock": employer, person, current employer (yes, no, unknown); cost basis from Next. [TP-SF17-03 · inferred · AC-A-01, AC-A-02 · A; AC-A-03 · Next]
- A4 Data & Assumptions > Flag of held employer shares > new: confirming a grant flags every held position with its ticker, whatever its source, shown with Undo; each flagged position takes the grant owner as person and current employer yes, both editable. [TP-SF17-04 · inferred · AC-E-17, AC-E-18, D-090, D-092, D-110 · A]
- A4 Data & Assumptions > Notice "Price not available for <ticker>: not counted in concentration." > new. [TP-SF17-05 · inferred · AC-A-08 · A]
- A4 Data & Assumptions > Grant editor > new: owner, type (RSU or PSU), employer and ticker, grant date, units; a pattern (length, frequency, cliff) that generates dated tranches, each editable (SC-06); PSU condition and range (SC-05); private employer with or without dates (SC-08); the 409A value from Next. [TP-SF17-06 · inferred · AC-B-01 to AC-B-04, AC-B-07 to AC-B-10, AC-B-16 to AC-B-19 · A; AC-B-20 · Next]
- A4 Data & Assumptions > Grant editor > Client estimate > new: the client's employer and amount, labelled "Client estimate, not used in the figures". [TP-SF17-07 · inferred · AC-E-14 · A]
- A4 Data & Assumptions > Grant editor > Income question > none: the reported income never contains company stock, so nothing is asked; income reported before the wording: the grant review shows "Salary on file should exclude company stock. If it includes stock that vested, edit it." (AC-F-17). [TP-SF17-08 · inferred · AC-E-12, AC-F-17, D-094, D-108]
- A4 Data & Assumptions > Grant editor > State withholding rate > new, optional, hidden when the household pays no state tax; a notice while it is missing. [TP-SF17-09 · inferred · AC-C-07, AC-C-08, AC-C-13 · A]
- A4 Data & Assumptions > Grant editor > Past and forfeited tranches > new: a tranche delivered on or before the analysis date leaves the figures, except this year's tax and gap, with "Vested on <date>: record the shares kept as a held position."; forfeited tranches leave the figures (SC-04); shares kept and cost basis per tranche from Next. [TP-SF17-10 · inferred · AC-B-11 to AC-B-13, AC-C-31 · A; AC-B-14 · Next]
- A4 Data & Assumptions > Grant editor > Reported grant notice > new: "Only RSU and PSU are modelled in this version..." [TP-SF17-11 · inferred · AC-E-16 · A]
- A4 Data & Assumptions > Save > changed: saving a stock change reprocesses the analysis, after a warning when a manual score adjustment would be replaced. [TP-SF17-12 · inferred · AC-B-05, AC-B-06, AC-G-12 · A]
- A5 Documents > Upload in the grant editor > new: extraction proposes grants and tranches next to the document, labelled "Extracted from <document>, not confirmed"; the advisor edits, confirms or rejects in one review, with "Confirm all" and the line asking to keep company stock out of the salary on file; nothing counts until confirmed; no held positions are created. [TP-SF17-13 · inferred · AC-F-01 to AC-F-12, AC-F-17, AC-F-18, D-090, D-108 · A]
- A5 Documents > Statement for a grant the client already reported > changed: confirming it completes the pending grant; no second grant. [TP-SF17-14 · inferred · AC-F-14 · A]
- A5 Documents > Statement uploaded where the advisor uploads documents today (the opportunity's documents) > changed behind the screen: processed like one uploaded in the grant editor. [TP-SF16-04 · inferred · AC-F-15 · B]
- A4 Data & Assumptions > Grant editor > Tranche > "Shares delivered on" > new: prefilled with the vest date, editable; the extraction proposes it when the statement shows it [ASSUMPTION: A-59]; income tax follows it, Social Security and Medicare follow the vest date (SC-02, SC-03). [TP-SF17-15 · inferred · A-59 · AC-B-32, AC-C-30, AC-F-16, D-101 · A]
- A4 Data & Assumptions > Grant editor > Delivered tranche > "Value at delivery", helper "From the W-2 or the plan statement" > new, for a tranche delivered this year [ASSUMPTION: A-58]. [TP-SF17-16 · inferred · A-58 · AC-B-33, AC-C-32, D-107 · A]
- A4 Data & Assumptions > Proposed grant from the chat or "Other income" > new: shown to the advisor to confirm or reject, as a statement proposal; advisor-only and raising the alert while it awaits review; confirming creates a grant pending detail, rejecting creates nothing. [TP-SF17-17 · inferred · A-27 · AC-E-22 to AC-E-24, D-093, D-096, D-110 · B]
- A6 Review > Score and View more > changed, as in Financial health. [TP-SF08 · inferred · see Financial health]
- A6 Review > Manual score adjustment (within 10 points) > no change; a later stock save replaces it, after the warning. [TP-SF08-14 · inferred · AC-B-06]
- A6 Review > Edit or delete each new line before sharing > changed: the new lines can be edited or deleted like other generated lines. [TP-SF21-01 · inferred · AC-G-07 · A]
- A6 Review > Advisor notices > new, shown only to the advisor. [TP-SF21-02 · inferred · AC-G-11 · A]
- A7 Share > Live view and PDF > changed: the same new lines, with the advisor's edits, in both; no advisor notice in either. [TP-SF21-03 · inferred · AC-G-10, AC-G-11 · A]

### Investment analysis, Statements, reports, firm settings and the rest

Seen 2026-10-03 (`captures/client/03-*`, `04-*`, `06-reports`), except the firm settings screen, which was not seen.

- Investment analysis > Summary cards (allocation, return, risk, current against proposed) > no change: holdings and the proposal do not change. [TP-SF09-01 · seen · D-055]
- Investment analysis > Written paragraphs > can change: same rule as the Financial health paragraphs, limited to the snapshot line below. [TP-SF09-02 · seen · AC-G-17, D-097 · B]
- Investment analysis > Snapshot (amount invested, accounts by type and holder) > changed: adds the employer stock line when shares are flagged. [TP-SF09-03 · seen · AC-A-22 · A]
- Investment analysis > Purpose buckets, including "concentrated stock risk" > no change: a single large employer position reaches the bucket as today. [TP-SF09-04 · seen · D-055, EC-A-13]
- Investment analysis > Performance, allocation, stress scenarios > no change. [TP-SF09-05 · seen]
- Investment analysis > Accounts and holdings panel > changed: a flagged position shows "Employer stock (<Name>)"; delivered shares that arrive later by link or statement count once, as a position [ASSUMPTION: A-60]. [TP-SF10-01 · seen · A-60 · AC-A-21, EC-B-19 · A]
- Investment analysis > Portfolio deep dive (cash, allocation) and target allocation > no change: a vest is not cash before it arrives; targets do not change. [TP-SF11-01 · seen · AC-D-05, D-055]
- Statements > Balance sheet, household and per owner > no change: flagged shares keep their value; unvested is not net worth. [TP-SF12-01 · seen · AC-B-22]
- Statements > Cash flow statement > changed: a line below the total, "Stock compensation (vests this year), not in the totals above: $X, estimated tax $Y." by delivery year (SC-02); always true, since the income question excludes company stock; the totals never take the projection's vest income; it includes a tranche delivered earlier this year (AC-C-26). [TP-SF13-01 · seen · A-62 · AC-C-26, AC-G-16, D-094, D-107, D-110 · A]
- Reports > Summary PDF > changed: the cover score can move; the same new lines and chart as the live view, with the advisor's edits; no advisor notice. [TP-SF14-01 · inferred · AC-G-10, AC-G-11 · A]
- Reports > Investment analysis PDF > changed: the employer stock line of the snapshot. [TP-SF14-02 · seen · AC-A-22 · B]
- Reports > Report list, viewer, download > no change. [TP-SF14-03 · seen]
- Social Security > Automatic income at 67 > no change in the first release: the platform computes it from declared income (AC-G-16), so it includes no vest, past or future; adding vests to the estimate is Next, since vests are wages for Social Security (SC-22). The Social Security and Medicare tax on each vest is computed in the first release, in the vest year (AC-C-30). [TP-SF18-01 · seen · A-62 · AC-G-16, AC-C-30, D-094 · Next]
- Cash flow > Savings lines (401(k) contributions, cash savings) > no change: they read declared income; vests do not change them. [TP-SF19-01 · seen · AC-G-16, D-094]
- Firm settings > "Stock compensation" setting > new: on, the feature appears and the income question excludes company stock; off, everything as today; off after use, data kept and hidden, figures back to today's from the next reprocessing, and each household with a grant shows the advisor "Income was reported without company stock. Check the salary on file."; in the first release only Sherpas turns it on and off, and the firm admin sees its state (D-111). [TP-SF20-01 · inferred · AC-G-01, AC-G-02, AC-G-13, AC-G-18, AC-G-19; GAP-59 · A]
- Existing households > no change until the advisor adds data. Not covered, after the first release: the advisor has no list of existing clients with stock pay; options are suggesting households that hold single stocks, resending only the Income section, or reading CRM notes already attached to the opportunity. [TP-SF16-05 · inferred · D-052 · C]

## Pass 2 · gaps found while building (F6)

Found while building the prototype (`prototype/`, D-062). Each goes back to the spec and the log; none is fixed silently in code. The full pass 2 on the prototype runs in F7.

| ID | What | Where | Resolution | Status |
|---|---|---|---|---|
| GAP-28 | The parameter table says how each check reads a figure and how areas are weighted, but not how the check scores of one area combine into its points; the simulator cannot compute an area without it | `00_index` parameters | A parameter `P-AREA-MIX`, not public, SIMULATED as equal weights within an area [ASSUMPTION: A-31] | Resolved, D-066: `00_index` parameters |
| GAP-29 | AC-A-14 reads "held across <n> accounts"; with employer stock in one account it renders "held across 1 accounts" | F-A AC-A-14, AC-A-22 | With one account, "<Company> stock held in 1 account: $<value>, <Y>% of investable assets." | Resolved, D-066: AC-A-14 |
| GAP-30 | A private employer's grant with vest dates is neither "awaiting" nor complete, so it falls to "pending detail" and the client reads a line that is wrong for a grant the advisor entered in full | F-B AC-B-19 | A private employer's grant shows "Awaiting a liquidity event" with or without vest dates; it stays out of every figure (AC-G-05) (SC-08) | Resolved, D-068: AC-B-19 |
| GAP-31 | F-C asked to show tax owed by level, the gap and the PSU range per vest, but quoted no label and named no surface | F-C | A collapsible "Tax on each vest" in Savings & Expenses, after the per-year bullets, one group per vest, with the labels of AC-C-29 | Resolved, D-069: AC-C-29 |
| GAP-32 | AC-E-17 quoted no label, and one suggestion per position repeats near-identical notices when the shares sit in several accounts | F-E AC-E-17 | One suggestion per employer naming every account; the automatic flag on confirming a grant replaces the confirmation per position (D-090, AC-E-17, AC-E-18) | Resolved, D-070, D-090: AC-E-17 |
| GAP-33 | A client reports stock pay and the advisor then confirms the same grant from the plan statement: the pending grant stayed beside the confirmed one | F-F AC-F-09, F-E AC-E-09 | Confirming a proposal with the same owner and employer as a grant pending detail completes that grant instead of adding a second one | Resolved, D-078: AC-F-14 |
| GAP-34 | The questionnaire's "Stock compensation" row asked for more fields than every other Income chip row | F-E AC-E-03 | A row like every other chip row: employer as its name, owner, optional amount per year | Resolved, D-076: AC-E-03, AC-E-04 |
| GAP-35 | The prototype opened the documents step from the Income row; in their questionnaire the documents step comes first and already takes "Investment & retirement accounts" | F-E AC-E-19, F-F AC-F-13 | The plan statement goes in their existing documents step; no second upload point | Resolved, D-077: AC-E-19 |
| GAP-36 | The guided scenes follow the features (F-A first), not the order things happen | `prototype/src/model/scenes.ts`, D-065 | Order scenes by the flow and title each as a touchpoint | Open, prototype rework in step F6.5 (D-098); the guide strip of D-114 shows where each screen sits in the flow and what it changes in the model |
| GAP-37 | A reader does not see which sections a scene changes and which it leaves alone | `prototype/src/ui/FinancialHealth.tsx`, `SceneDetail.tsx` | A section index at the top of each scene: changed, unchanged and why | Open, prototype rework in step F6.5 (D-098); the guide strip of D-114 shows where each screen sits in the flow and what it changes in the model |
| GAP-38 | The projection chart exists today [FACT: platform_map, 01-financial-health]; the prototype draws our imitation and does not say so | F-D, `ProjectionChart.tsx` | A note on the chart: "The platform's chart, imitated. New: vest markers, the PSU band and vests as wage income." | Open, prototype rework in step F6.5 (D-098) |
| GAP-39 | Held employer shares can arrive from a linked account or an uploaded account statement, not only by hand | F-E AC-E-17; `questionnaire_map.md` Investments | The flag applied on confirming a grant covers every held position with that ticker, whatever its source (AC-E-17) | Resolved, D-092 |
| GAP-40 | A client may mention stock pay only in the "Anything to add" chat | F-E; `questionnaire_map.md` "Seen on screen" | The chat text goes through the platform's context mechanism and a mention of stock pay is proposed to the advisor; AC-E-22 [ASSUMPTION: A-27]; advisor-only, with the alert while it awaits review, and a grant pending detail once confirmed (AC-E-23, AC-E-24; D-110, from GAP-52) | Resolved, D-093 |
| GAP-41 | The cash flow line "not in the totals above" could be wrong where the reported income already included this year's vests | F-C AC-C-26 | The income question excludes company stock and vests always sit beside it, so the line is always true; no change to AC-C-26 | Resolved, D-094 |
| GAP-42 | No requirement said whether the platform's paragraphs mention employer stock, the tax at vest or stock pay pending detail | SF-01 to SF-06; TP-SF01-05 | The paragraphs may use only the facts of the new lines, phrased as facts; the prototype shows them as fixed text | Resolved, D-075: AC-G-17 |
| GAP-43 | Vests in the projection would move every figure read from it, with no requirement saying whether they move | F-D AC-D-01; SF-02 | Every projection figure includes vests after tax, labelled, from the first release | Resolved, D-074, D-106: AC-D-11 |
| GAP-44 | The score article in the Help Center would no longer describe what View more shows | SF-08; TP-SF08-13 | The release notes ask for the article to be updated, with the proposed text | Resolved, D-095 |
| GAP-45 | A client may report stock pay under "Other income" instead of the chip | F-E; TP-SF15-11 | An "Other income" row whose name mentions stock pay is proposed to the advisor as a grant pending detail, through the same mechanism as the chat; the advisor deletes a duplicate row; AC-E-22; advisor-only, with the alert while it awaits review, and a grant pending detail once confirmed (AC-E-23, AC-E-24; D-110, from GAP-52) | Resolved, D-096 |
| GAP-46 | A plan statement uploaded to the opportunity's documents was not covered | F-F; TP-SF16-04 | Processed the same way whatever the upload point | Resolved, D-079: AC-F-15 |
| GAP-47 | AC-G-17 read as Financial health only; the Investment analysis tab also has written paragraphs | SF-09; TP-SF09-02 | AC-G-17 covers every paragraph the platform writes for the client, limited on that tab to the snapshot line (AC-G-17) | Resolved, D-097 |
| GAP-48 | Vests enter the projection as a one-time wage income; if the platform also adds it to the income card or the cash flow totals, the current year's income reads high | `00_index` AC-G-16; SF-01, SF-13 | AC-G-16 extended to the income card and the cash flow totals, and to the income the projection reads [ASSUMPTION: A-62] | Resolved, D-107: AC-G-16 |
| GAP-49 | A tranche delivered earlier this year can be under-withheld, with the difference paid at filing (SC-17), but it left every figure on its date | F-B AC-B-11; F-C EC-C-14; SF-07, SF-08 | Its tax and gap stay in the year's figures until year end, at the value at delivery the advisor enters, or else at the analysis-date price | Resolved, D-107: AC-B-11, AC-B-33, AC-C-31, AC-C-32 |
| GAP-60 | Two grants of one statement with the same employer and grant date, such as an RSU and a PSU granted the same day, read as duplicates: confirming the second one asked the advisor which to keep, and keeping it dropped the first | F-F AC-F-09, AC-F-18 | A duplicate matches employer, grant date and type (RSU or PSU); "Confirm all" judges duplicates against the grants before it | Resolved, D-115: AC-F-09 |
