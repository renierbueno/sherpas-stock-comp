# F-A · Employer stock counted in concentration

Decisions: D-024, D-038, D-039, D-040, D-044, D-045, D-080 · Depends on: none · Release: first release (release 1, on its own), behind the firm setting (D-030, D-043, D-080)

## Context

Shares of the client's employer can already be entered as a position, but nothing marks them as the employer's, so the concentration check may read them as separate, smaller positions when they sit in several accounts, and nothing links them to the client's pay [FACT: questionnaire_map; data_model]. When the employer falters, the client can lose investments and job at the same time (R-014). This feature needs no grant: it works on positions the platform already holds.

## User story

As an advisor, I want employer stock recognised as one position and linked to my client's pay, so that the score and the report show how much of the household depends on one company.

## Requirements

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-A-01 | Where the firm has enabled stock compensation, the system shall let the advisor flag a held position as employer stock, naming the employer and the person. | D-024, D-031 | e2e | unit F-A, component F-A |
| AC-A-02 | When the advisor flags a position, the system shall ask whether it is the person's current employer (yes, no, unknown). | D-040 (pay link) | e2e | unit F-A, component F-A |
| AC-A-03 | When the advisor flags a position, the system shall let the advisor enter its cost basis. | Next (D-080); D-029; SC-30 | e2e | unit F-A, component F-A |
| AC-A-04 | The system shall compute employer exposure for each issuer as the market value of every held position flagged as employer stock of that issuer, summed across all accounts and all owners in the household. | D-040, D-024; R-014 | unit | unit F-A |
| AC-A-05 | The system shall leave positions of a private employer out of employer exposure. | D-025 | unit | unit F-A |
| AC-A-06 | The system shall leave unvested tranches out of employer exposure. | D-026, D-040 | unit | unit F-B |
| AC-A-07 | If a position flagged as employer stock has no market price, then the system shall leave it out of employer exposure. | [brief] missing data "is not treated as a zero" | unit | unit F-A |
| AC-A-08 | If a position flagged as employer stock has no market price, then the system shall show the advisor "Price not available for <ticker>: not counted in concentration." | [brief]; D-033 (missing-data notices on the advisor side) | e2e | component F-A |
| AC-A-09 | When the Investing concentration check runs, the system shall read the larger of today's largest-position figure and the largest employer exposure, on the same base (`P-CONC-BASE`). | D-044 | unit | unit F-A |
| AC-A-10 | The system shall score the figure of AC-A-09 on the check's existing curve (`P-CONC`). | D-040, D-044; [brief] | unit | unit F-A |
| AC-A-11 | If no held position is flagged as employer stock, then the system shall compute the concentration check exactly as today. | D-023 | unit | unit F-A |
| AC-A-12 | While the household has employer exposure, View more shall show "Largest position: <name> <X>%." beside "Employer stock (<company>): <Y>% of investable assets, counted as one position across all accounts." | D-044, D-039; [FACT: captures/client/02-score-breakdown] | e2e | component F-A |
| AC-A-13 | Where a flagged position is the current employer of its person, View more shall add "<Name>'s pay comes from the same company." | D-044; R-014 (double exposure); SC-29 | e2e | component F-A |
| AC-A-14 | When employer exposure is above zero, the Assets & Investments section shall add the bullet "<Company> stock held across <n> accounts: $<value>, <Y>% of investable assets.", or with one account "<Company> stock held in 1 account: $<value>, <Y>% of investable assets." | D-038, D-039, D-066 | e2e | unit F-A, component F-A |
| AC-A-15 | When the concentration check reads employer exposure, the "We should look into" box shall add "<Y>% of investable assets is in <company> stock." | D-039, D-044 | e2e | component F-A |
| AC-A-16 | Where the household has unvested tranches of a listed employer (F-B), the report shall add "If every scheduled grant vests, <company> stock would be <Z>% of investable assets, at the <analysis date> price, before shares withheld for tax." | D-040, D-045, D-050 | unit + e2e | unit F-B, component F-B |
| AC-A-17 | Where those tranches include performance units, the line of AC-A-16 shall state the figure at target followed by its range: "<Z>% at target (range <Zmin>% to <Zmax>%)". | D-045; R-002, R-011; SC-05 | unit + e2e | unit F-B, component F-B |
| AC-A-18 | The system shall compute Z as (employer exposure + value of unvested tranches) / (investable assets + value of unvested tranches). | D-045 | unit | unit F-B |
| AC-A-19 | The system shall not show a threshold or target for employer stock. | D-040; [brief] "The exact figures and thresholds behind each check are not shown in the product." | e2e | component F-A |
| AC-A-20 | The system shall offer the flag of AC-A-01 on each held position in Data & Assumptions and in the advisor-mode Investments block. | D-060 | e2e | component F-A |
| AC-A-21 | While a position is flagged, the holdings panel shall show the tag "Employer stock (<Name>)" on it. | D-060 | e2e | component F-A |
| AC-A-22 | When employer exposure is above zero, the Investment analysis snapshot and its PDF shall add the line of AC-A-14; purpose buckets, targets and the proposal shall not change. | D-055 | e2e | component F-A |
| AC-A-23 | The system shall offer the line of AC-A-15 as a candidate for the Summary recommendations, chosen by the platform's existing logic and phrased as a fact (AC-G-06). | D-039, D-060 | e2e | component F-A |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-A-01 | SIMULATED: $1M investable, $150K of employer stock in each of two accounts, largest fund line 20% | One exposure of $300K, 30%; the check reads 30% instead of 20% | AC-A-04, AC-A-09 |
| EC-A-02 | SIMULATED: fund line 45%, employer stock 30% | The check reads 45%, as today; View more shows both readings and the pay link | AC-A-09, AC-A-12, AC-A-13 |
| EC-A-03 | The client and the co-client both hold shares of the same employer | Summed into one exposure | AC-A-04 |
| EC-A-04 | The client and the co-client hold shares of two different employers | One exposure per issuer; the check reads the largest | AC-A-04, AC-A-09 |
| EC-A-05 | Shares of a former employer | Counted in exposure (one issuer held); no pay line | AC-A-02, AC-A-13 |
| EC-A-06 | Current employer unknown | Counted in exposure; no pay line | AC-A-02, AC-A-13 |
| EC-A-07 | Shares of a private employer | Out of exposure; the held shares stay as the advisor entered them (the instrument search accepts a free-text instrument) | AC-A-05; F-B; [FACT: questionnaire_map, 2026-10-05] |
| EC-A-08 | Grant pending detail, flagged shares already held | Held shares count; the grant does not | AC-A-04, AC-A-06; AC-G-04 |
| EC-A-09 | Employer stock held only inside a fund | Not counted as employer exposure | out: D-040 (held shares by issuer); how the check reads funds [ASSUMPTION: A-13] |
| EC-A-10 | Employer stock fund inside a 401(k), held as a position | Counted when flagged | AC-A-04 |
| EC-A-11 | Flagged position without a market price | Out of the figure; advisor notice | AC-A-07, AC-A-08 |
| EC-A-12 | Household without employer stock | Check, report and score identical to today | AC-A-11, AC-G-03 |
| EC-A-13 | The "concentrated stock risk" bucket of the Investment analysis | Unchanged: a single large employer position reaches it as today; split holdings do not, so the snapshot states the exposure | AC-A-22; D-055 |
| EC-A-14 | The advisor removes the flag | Exposure and the new lines disappear on reprocessing | AC-A-04, AC-A-11 |

## Instrumentation

| ID | Event (EARS) | Feeds | Verify | Test |
|---|---|---|---|---|
| EV-A-01 | When the advisor flags or unflags a position, the system shall record the firm, the household, the issuer and whether it is listed. | M-06 | unit | unit F-A |
| EV-A-02 | When the concentration check reads employer exposure instead of today's figure, the system shall record it with the household. | M-04 | unit | unit F-A |
| EV-A-03 | When the advisor adjusts the score of a household with employer exposure, the system shall record the adjustment and its reason with a "stock compensation" tag. | M-04 | unit | unit G, component G |
| EV-A-04 | When an analysis with employer exposure is shared, the system shall record whether any F-A line was edited or deleted before sharing. | M-05 | unit | unit G |

EV-A-04 depends on whether sharing and edits are recorded today [ASSUMPTION: A-20].

## Simulator tests (relations)

- Same household with and without the flag on a single position that is already the largest: same score.
- Employer stock split across two accounts scores the same as one position of the sum.
- Adding a private-employer position or an unvested tranche never changes the concentration figure.
- The concentration figure with employer exposure is never lower than today's.

## Out of scope

- Employer stock held through funds (look-through), D-040.
- An employer-specific threshold: next, if the existing one does not fit (D-041, riskiest assumption 2).
- Suggesting the flag from the employer ticker the client gives: considered in F-E.

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
