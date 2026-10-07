# F-C · Tax at vest and the withholding gap

Decisions: D-026, D-033, D-038, D-039, D-045, D-080, D-101, D-102, D-103, D-105, D-107, D-110 · Depends on: F-B · Release: first release (release 2, with F-B, F-D, F-E and F-F), behind the firm setting (D-030, D-043, D-080)

## Context

The value of an RSU at vest is wages: federal income tax, FICA and state tax are due on it (R-001; SC-01, SC-22). Employers usually withhold federal tax at the flat supplemental rate, 22%, or 37% on supplemental wages above $1 million in the year (R-008; SC-14); a client in a higher bracket owes more than was withheld, and the difference is due later [INFERENCE: R-008; SC-17]. The platform already computes federal, FICA and state tax from the household's state, filing status and brackets [FACT: data_model]. State withholding rules were not researched (D-033).

## User story

As an advisor, I want to see the tax due on each vest and how much of it withholding may not cover, so that the client sets cash aside before the bill arrives.

## Requirements

### Tax owed

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-C-01 | While a household has a complete grant of a listed employer, the system shall add the value of each future tranche at vest to the owner's wages of the year of its delivery date (AC-B-32) for income tax, for the tax of AC-C-03 and the projection of F-D only (AC-G-16). | D-026, D-101; R-001; SC-01, SC-02 | unit F-C |
| AC-C-02 | The system shall value a tranche at vest at today's market price; a performance unit tranche at target. | D-045 | unit F-C |
| AC-C-03 | The system shall compute the tax owed on each vest as the household's tax with the vest income minus its tax without it, with the platform's tax engine, by level (federal, FICA, state). | D-033; [FACT: data_model, tax lines]; [INFERENCE: the engine can take vest income like salary]; SC-01, SC-09, SC-10, SC-12, SC-20, SC-21 | unit F-C |
| AC-C-04 | The system shall label every tax figure on a future vest "at the <analysis date> price and today's tax rules". | D-045; R-008 (rates by tax year); SC-13 | unit F-C, component F-C |

### Withholding and gap

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-C-05 | The system shall estimate federal withholding on each vest at 22% of its value, and at 37% on the part of the person's vest income from that employer above $1 million in the delivery year, tranches delivered earlier that year included. | D-110; R-008, R-022 (rate and per employer STRONG); SC-14, SC-15, SC-16, SC-19; D-051 | unit F-C |
| AC-C-06 | The system shall label the estimate "Federal withholding estimated at the supplemental rate (22%, 37% above $1 million)." | R-008; SC-14 | component F-C |
| AC-C-07 | Where the platform computes state tax above zero for the household, the system shall let the advisor enter a state withholding rate per grant, with the helper text "From the paystub or plan statement". | D-033 | component F-C |
| AC-C-08 | If the platform computes zero state tax for the household, then the system shall hide the state withholding field. | D-033 | unit F-C, component F-C |
| AC-C-09 | The system shall show the state withholding field in advisor mode and Data & Assumptions only, never in the client questionnaire. | D-033 | component F-C |
| AC-C-10 | The system shall compute the federal gap of each vest as federal tax owed minus estimated federal withholding. | D-033; R-008; SC-17, SC-18 | unit F-C |
| AC-C-11 | Where a state withholding rate is entered, the system shall compute the state gap as state tax owed minus the rate times the vest value. | D-033 | unit F-C |
| AC-C-12 | If no state withholding rate is entered, then the system shall show "Estimated state tax on this vest: $<X>. Your state withholding was not provided, so the gap shown is federal only." | D-033 (label as decided) | component F-C |
| AC-C-13 | If no state withholding rate is entered, then the system shall show the advisor "State withholding not entered for <grant>." in Data & Assumptions. | D-033 | unit F-C, component F-C |
| AC-C-14 | The system shall show FICA owed on each vest with "Social Security and Medicare tax on this vest: $<X>, not included in the gap." | R-001 (RSUs are wages for FICA), R-018, R-019, R-020; SC-03, SC-20, SC-21, SC-22, SC-23; withheld against owed is conflict (c) of `12_stock_comp_rules.md`; D-051 | unit F-C, component F-C |
| AC-C-30 | The system shall compute Social Security and Medicare tax on a tranche in the year of its vest date, and income tax in the year of its delivery date. | D-101; SC-02, SC-03 | unit F-C |
| AC-C-31 | While a tranche delivered earlier in the current tax year has a positive gap, the system shall keep its tax owed and gap in that year's figures, in the Liquidity near-term commitments check and in the line of AC-C-24 until the end of that year. | D-107; SC-02, SC-17 | spec only (see index) |
| AC-C-32 | The system shall value a tranche of AC-C-31 at the value at delivery the advisor entered (AC-B-33), or else at the <analysis date> price, labelled "delivered on <date>, at its value on delivery" when the advisor entered it, or else as AC-C-04. | D-107, D-110; SC-01 | spec only (see index) |
| AC-C-15 | If a gap is zero or below, then the system shall show it as "Withholding covers the estimated tax on this vest." and count nothing. | D-033 | unit F-C, component F-C |
| AC-C-16 | Where a vest includes performance units, the system shall show its tax owed and gap at target followed by their range. | D-045; SC-05 | unit F-C, component F-C |

### Score and report

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-C-17 | When the Liquidity near-term commitments check runs, the system shall add the positive gaps of tranches whose delivery date falls within its horizon (`P-LIQ-HORIZON`), and those of AC-C-31, to the commitments it reads. | D-039, D-110; SC-02, SC-17 | unit F-C |
| AC-C-18 | The system shall leave the state part of a gap out of the check when no state withholding rate is entered. | D-033, D-039 | unit F-C |
| AC-C-19 | The system shall count a performance unit tranche at target in the check. | D-045; SC-05 | unit F-C |
| AC-C-20 | When the check counts a vest gap, View more shall show "Tax due on upcoming vests counted in near-term commitments: $<X>." | D-039 | unit F-C, component F-C |
| AC-C-21 | Where the gap counted is federal only, the line of AC-C-20 shall end with "(federal only; state withholding not entered)". | D-033 | unit F-C, component F-C |
| AC-C-22 | Where any performance units are counted, View more shall add "Performance units counted at target." | D-045 | unit F-C, component F-C |
| AC-C-23 | While a household has future tranches or tranches of AC-C-31, the Savings & Expenses section shall add, per year of delivery, the bullet "<Year> vests: $<value> of income, estimated tax $<owed>, gap after withholding $<gap>." | D-038, D-110; SC-02 | unit F-C, component F-C |
| AC-C-24 | When a positive gap falls within the check's horizon, the "We should look into" box shall add "Tax on the <month year of delivery> vest may exceed withholding by $<gap>." | D-039, D-110; SC-02, SC-17 | unit F-C, component F-C |
| AC-C-25 | If the household has no complete grant of a listed employer, then the system shall compute tax lines, the Liquidity check and the report exactly as today. | D-023 | unit F-C |
| AC-C-26 | While a household has tranches delivered this year, future or of AC-C-31, the cash flow statement shall show below its total, under the stock compensation income category, "Stock compensation (vests this year), not in the totals above: $<value>, estimated tax $<owed>." | D-054, D-058, D-110; SC-02 | unit F-C, component F-C |
| AC-C-27 | While a household has future vests, View more shall show "Savings rate and debt ratios read reported income; vests are shown separately." | D-054 | unit F-C, component F-C |
| AC-C-29 | The system shall show the per-vest figures of AC-C-03, AC-C-10 to AC-C-12, AC-C-14 to AC-C-16 in a collapsible "Tax on each vest" in Savings & Expenses, after the bullets of AC-C-23, one group per tranche delivered this year or later, as "Estimated tax on this vest: $<total> (federal $<a>, Social Security and Medicare $<b>, state $<c>), at the <analysis date> price and today's tax rules." and "Estimated gap after withholding: $<gap>, at the <analysis date> price and today's tax rules."; performance unit figures add "at target (range $<min> to $<max>)"; a tranche of AC-C-31 is labelled as AC-C-32. | D-069, D-110 | component F-C |
| AC-C-28 | The system shall offer the line of AC-C-24 as a candidate for the Summary recommendations, chosen by the platform's existing logic and phrased as a fact (AC-G-06). | D-039, D-060 | unit F-C, component F-C |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-C-01 | SIMULATED: vest of $100K, household in a 32% federal bracket, no state rate | Federal gap about $10K (32% owed minus 22% withheld, before deductions); state tax owed shown; gap labelled federal only | AC-C-03, AC-C-05, AC-C-10, AC-C-12; SC-09, SC-14, SC-17 |
| EC-C-02 | Vest income from one employer above $1 million in a year | 37% on the part above $1 million | AC-C-05; SC-14, SC-15 |
| EC-C-03 | State with no income tax | No state field; no state lines | AC-C-08 |
| EC-C-04 | Advisor enters 0% state withholding | Treated as entered: the full state tax is a gap (unlike an empty field) | AC-C-11, AC-C-12 |
| EC-C-05 | Household in a 22% bracket or lower | Gap zero or below; nothing counted | AC-C-15 |
| EC-C-06 | Vest outside the check's horizon | Shown in the report; not counted in the check | AC-C-17, AC-C-23 |
| EC-C-07 | PSU vest within the horizon | Counted at target; range shown | AC-C-16, AC-C-19, AC-C-22 |
| EC-C-08 | Vest income already included in the salary on file | The advisor edits the salary after the line of AC-F-17; vests are then added beside it once | F-E (AC-E-12); F-F (AC-F-17); D-108 |
| EC-C-09 | Private employer | No tax lines until it has dates and a price | AC-G-05; F-B (AC-B-19) |
| EC-C-10 | Two grants from different employers in the same year | The $1 million rule applies per person and employer | AC-C-05 (per employer); SC-15
| EC-C-11 | Saving a state rate after a manual score adjustment | Warning; the adjustment is replaced | F-B (AC-B-06) |
| EC-C-12 | RSU vests on 15 December, shares delivered on 5 January | Income tax in the next year; Social Security and Medicare in the vest year | AC-C-01, AC-C-30; SC-02, SC-03 |
| EC-C-13 | PSU performance period ends 31 December, certified and delivered in March | Income tax in the year of delivery; Social Security and Medicare in the year of the vest date [ASSUMPTION: A-61] | AC-C-30; SC-02, SC-03 |
| EC-C-14 | A tranche delivered earlier this year, under-withheld; the difference is still to pay at filing | Its tax and gap stay in the year's figures and the Liquidity check until year end, at the value at delivery if entered | AC-B-11, AC-C-31, AC-C-32; D-107 |
| EC-C-15 | Vests below $1 million from one employer, but vests plus bonuses from that employer above it | Withholding estimated at 22% on all vests, so the gap may read high; the advisor can edit the line before sharing | AC-C-05, AC-G-07; D-102 [ASSUMPTION: A-55]; SC-15 |
| EC-C-16 | Known edge case. Married couple, each below $200,000 of wages with their own employer, above $250,000 combined | No Additional Medicare is withheld but 0.9% of the combined excess is owed at filing (SIMULATED: two wages of $199,000, about $1,330); not in the gap, which reads low by that amount | AC-C-14; D-103 [ASSUMPTION: A-53]; SC-23, SC-24 |
| EC-C-17 | Known edge case. Social Security over-withheld (two employers above the wage base) or Additional Medicare withheld but not owed | A refund at filing; not shown, and nothing is counted | AC-C-14; D-103; SC-24, SC-25 |

## Instrumentation

| ID | Event (EARS) | Feeds | Test |
|---|---|---|---|
| EV-C-01 | When the advisor enters a state withholding rate, the system shall record the grant and the time since the grant was completed. | M-02 | unit F-C |
| EV-C-02 | When the Liquidity check counts a vest gap, the system shall record it with the household. | M-04 | unit F-C |

## Simulator tests (relations)

- A larger gap never raises the Liquidity score.
- Entering a state withholding rate equal to the state tax owed leaves the counted gap equal to the federal gap.
- A household without grants gets the same Liquidity figure as today.
- A vest outside the horizon changes no score figure.

## Out of scope

- State withholding rules applied automatically (D-033, D-041 later).
- AMT and option exercise (D-024).
- Personalised tax advice (D-041 never).
- Vest income in this year's checks, the Social Security estimate and contributions: they read reported income (D-054, AC-G-16).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
