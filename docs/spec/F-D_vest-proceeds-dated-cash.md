# F-D · Vest proceeds as dated cash for goals

Decisions: D-026, D-037, D-038, D-039, D-045, D-050 · Depends on: F-B, F-C (after-tax figures, D-050) · Release: after F-B, behind the firm setting (D-030, D-043)

## Context

Future vests are a known, dated inflow that clients and advisors want to match with goals such as a home purchase or education (A-10). The analysis already shows goals as markers on the projected net worth chart [FACT: captures/client/01-financial-health]. The value is not liquid until the vest date, and whether the shares are sold or kept is the client's choice (D-037).

## User story

As an advisor, I want future vests shown as dated inflows beside the client's goals, so that we can see which goals they can help fund and when.

## Requirements

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-D-01 | While a household has a complete grant of a listed employer, the projection shall add each future tranche as an inflow on its vest date. | D-026, D-039 | unit | (F6) |
| AC-D-02 | The system shall show each inflow as "$<X> after estimated tax ($<Y> before tax)", with the tax computed for that vest in F-C. | D-050, D-045 | unit + e2e | (F6) |
| AC-D-03 | The projected net worth chart shall show a marker for each year with vests, beside the goal markers. | D-039; [FACT: captures/client/01-financial-health, goal markers] | e2e | (F6) |
| AC-D-04 | Where a year's vests include performance units, the chart shall show a line at target and a shaded band for their range. | D-045 | e2e | (F6) |
| AC-D-05 | The system shall not count a tranche in liquid assets, months of reserve or near-term cash before its vest date. | D-039 | unit | (F6) |
| AC-D-06 | The Retirement & Goals section shall add the bullet "<Company> vests: $<X> after estimated tax ($<Y> before tax) between <first date> and <last date>, at the <analysis date> price." | D-038, D-045 | e2e | (F6) |
| AC-D-07 | Where a goal's year falls on or after a vest, the system shall add "Vests before <goal> (<year>): $<X> after estimated tax." | D-038; A-10 | e2e | (F6) |
| AC-D-08 | The system shall add to the vest bullets "Value on the vest date; whether shares are sold or kept is the client's decision." | D-037, D-041 (no advice) | e2e | (F6) |
| AC-D-09 | If the household has no complete grant of a listed employer, then the system shall show the projection, the goal markers and the Retirement & Goals section exactly as today. | D-023 | unit + e2e | (F6) |
| AC-D-10 | The projection shall count each vest once, as the inflow of AC-D-01, and not again through the year's income; after its vest date it shall project the after-tax amount as the platform projects cash savings. | D-054, D-060 | unit | (F6) |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-D-01 | SIMULATED: home purchase goal in 2028; vests of $40K in 2027 and 2028 | Bullet "Vests before Home purchase (2028): $<X> after estimated tax", $80K before tax | AC-D-07 |
| EC-D-02 | Goal before the first vest | No goal line | AC-D-07 |
| EC-D-03 | PSU vest in a goal year | Target figure with range in the bullet; band on the chart | AC-D-04, AC-D-06 |
| EC-D-04 | Grant pending detail | No inflows, markers or bullets | AC-G-04 |
| EC-D-05 | Private employer, awaiting a liquidity event | No inflows | AC-G-05 |
| EC-D-06 | Vest income already inside reported salary | Projection must not count it twice | F-E (AC-E-11, AC-E-12) |
| EC-D-07 | After the vest date, what the inflow becomes in the projection | Projected as cash savings; shares the advisor records as held positions are projected as positions | AC-D-10; AC-B-12 |

## Instrumentation

| ID | Event (EARS) | Feeds | Verify | Test |
|---|---|---|---|---|
| EV-D-01 | When an analysis with vest inflows is shared, the system shall record whether any F-D line was edited or deleted before sharing. | M-05 | unit | (F6) |

## Simulator tests (relations)

- Adding a future tranche never changes current net worth or months of reserve.
- A household without grants gets the same projection as today.

## Out of scope

- Sell-or-hold scenarios (D-038, D-041 later).
- Reminders on vest dates (D-038).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
