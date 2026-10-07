# F-D · Vest proceeds as dated cash for goals

Decisions: D-026, D-037, D-038, D-039, D-045, D-050, D-074, D-106 · Depends on: F-B, F-C (after-tax figures, D-050) · Release: first release (release 2, with F-B, F-C, F-E and F-F), behind the firm setting (D-030, D-043, D-080, D-106)

## Context

Future vests are a known, dated inflow that clients and advisors want to match with goals such as a home purchase or education (A-10). The analysis already shows goals as markers on the projected net worth chart [FACT: captures/client/01-financial-health]. The value is not liquid until the vest date, and whether the shares are sold or kept is the client's choice (D-037).

## User story

As an advisor, I want future vests shown as dated inflows beside the client's goals, so that we can see which goals they can help fund and when.

## Requirements

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-D-01 | While a household has a complete grant of a listed employer, the projection shall add each future tranche as a one-time wage income of the stock compensation income category, at its value at vest, on its delivery date (AC-B-32). | D-026, D-039, D-106; SC-01, SC-02 [ASSUMPTION: A-62] | unit F-D |
| AC-D-02 | The system shall show each inflow as "$<X> after estimated tax ($<Y> before tax)", with the tax computed for that vest in F-C. | D-050, D-045 | unit F-D, component F-D |
| AC-D-03 | The projected net worth chart shall show a marker for each year with tranche deliveries, beside the goal markers. | D-039, D-110; [FACT: captures/client/01-financial-health, goal markers] | component F-D |
| AC-D-04 | Where a year's vests include performance units, the chart shall show a line at target and a shaded band for their range. | D-045 | unit F-D, component F-D |
| AC-D-05 | The system shall not count a tranche in liquid assets, months of reserve or near-term cash before its delivery date. | D-039, D-110; SC-02 | unit F-D |
| AC-D-06 | The Retirement & Goals section shall add the bullet "<Company> vests: $<X> after estimated tax ($<Y> before tax) between <first delivery date> and <last delivery date>, at the <analysis date> price." | D-038, D-045, D-110 | unit F-D, component F-D |
| AC-D-07 | Where a goal's year falls on or after a tranche's delivery date, the system shall add "Vests before <goal> (<year>): $<X> after estimated tax." | D-038, D-110; A-10 | unit F-D, component F-D |
| AC-D-08 | The system shall add to the vest bullets "Value on the vest date; whether shares are sold or kept is the client's decision." | D-037, D-041 (no advice) | unit F-D, component F-D |
| AC-D-09 | If the household has no complete grant of a listed employer, then the system shall show the projection, the goal markers and the Retirement & Goals section exactly as today. | D-023 | unit F-D, component F-D |
| AC-D-10 | The projection shall count each vest once, as the income of AC-D-01, and treat it as it treats wages of that year (spending and saving), not as cash savings, with the tax on that vest computed in F-C (AC-C-03), so the bullets and the projection use one tax figure per vest. | D-054, D-060, D-106, D-110; SC-01 [ASSUMPTION: A-62] | unit F-D |
| AC-D-11 | While a household has a complete grant of a listed employer, every figure read from the projection (net worth at retirement, end of plan, retirement shortfall, share of retirement income covered, age when liquid assets run out, extra saving needed) shall include future vests after estimated tax, labelled "includes future vests after estimated tax, at the <analysis date> price", adding "at target" where performance units are included; a check that counts income not dependent on markets shall not count vests. | D-074, D-106 | unit F-D, component F-D |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-D-01 | SIMULATED: home purchase goal in 2028; vests of $40K in 2027 and 2028 | Bullet "Vests before Home purchase (2028): $<X> after estimated tax", $80K before tax | AC-D-07 |
| EC-D-02 | Goal before the first vest | No goal line | AC-D-07 |
| EC-D-03 | PSU vest in a goal year | Target figure with range in the bullet; band on the chart | AC-D-04, AC-D-06 |
| EC-D-04 | Grant pending detail | No inflows, markers or bullets | AC-G-04 |
| EC-D-05 | Private employer, awaiting a liquidity event | No inflows | AC-G-05 |
| EC-D-06 | Vest income already inside the salary on file | Counted once after the advisor edits the salary (AC-F-17); the projection adds each vest as its own income | AC-E-12, AC-D-10; F-F (AC-F-17) |
| EC-D-07 | After the delivery date, what the vest becomes in the projection | Projected as the platform projects wages of that year; shares the advisor records as held positions are projected as positions | AC-D-10; AC-B-12 |
| EC-D-08 | The client keeps all the delivered shares | Before delivery, projected as wages; after it, the tranche leaves the figures (AC-B-11) and the shares count once, as a held position, when recorded | AC-B-11, AC-D-10 |

## Instrumentation

| ID | Event (EARS) | Feeds | Test |
|---|---|---|---|
| EV-D-01 | When an analysis with vest inflows is shared, the system shall record whether any F-D line was edited or deleted before sharing. | M-05 | unit G |

## Simulator tests (relations)

- Adding a future tranche never changes current net worth or months of reserve.
- A household without grants gets the same projection as today.

## Out of scope

- Sell-or-hold scenarios (D-038, D-041 later).
- Reminders on vest dates (D-038).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
