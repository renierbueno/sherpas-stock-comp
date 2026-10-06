# Spec index · stock compensation MVP

The feature specs for the MVP: what the system does, checked by tests. Product owns the what and why; engineering owns the plan and tasks; QA verifies against the acceptance criteria (D-004, D-047). Success criteria and their targets live in `../07_success_criteria.md` (D-043). Method: `.claude/skills/spec/SKILL.md`. 2026-10-05.

## How to read a feature

- Each feature is one advisor outcome that can be tested and released on its own (D-047).
- Requirements are EARS lines with an ID (`AC-A-01`: feature A, line 01), the decision they come from, how they are verified (`unit`, `e2e`, `manual`) and the test that proves them (filled in F6).
- Edge cases (`EC-A-01`) resolve to a requirement or are out of the MVP with their decision.
- Instrumentation events (`EV-A-01`) feed the metrics in `07_success_criteria.md`.
- `pending D-…` marks a line that waits for a decision not yet confirmed.
- Parameters `P-…` are parts of the score that are not public [brief]; their test values are SIMULATED.

## Roles

| Role | Owns |
|---|---|
| Product | These specs, the success criteria, acceptance of each feature |
| Engineering | The plan and tasks for each feature, how it is built (D-004) |
| QA | Verification against the acceptance criteria |

The prototype pull request (F6) is a reference implementation that shows the spec holds up; it is not the plan (D-004).

## G · Rules for every feature

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-G-01 | Where the firm has not enabled stock compensation, the system shall show the questionnaire, the analysis and the score exactly as today. | D-023, D-030 | unit + e2e | (F6) |
| AC-G-02 | Where the firm has enabled stock compensation, the system shall add to the questionnaire only the "Stock compensation" income chip and its helper line; a household that adds no stock compensation row sees no new question. | D-023, D-030, D-056 | e2e | (F6) |
| AC-G-03 | While a household has no grant and no position flagged as employer stock, the system shall compute every score check, figure and report line exactly as today. | D-023 | unit | (F6) |
| AC-G-04 | The system shall leave out of every score figure any grant that is pending detail. | D-035, D-039 | unit | (F6) |
| AC-G-05 | The system shall leave out of every score figure any grant or share of a private employer. | D-025, D-039 | unit | (F6) |
| AC-G-06 | The system shall phrase every new report line as a fact about the household, without a sell, hold, exercise or tax instruction. | D-041 (personalised advice: never); A-04 | manual (wording review) | (F6) |
| AC-G-07 | The system shall let the advisor edit or delete every new report line before sharing, as for other generated lines. | [web: https://sherpaswealth.com/financial-health, advisors edit generated observations] | e2e | (F6) |
| AC-G-10 | The system shall show every new client-facing line with the same text in the live client view and in the shared PDF, including the advisor's edits and, for performance units, the range beside the number. | D-045, D-060 | e2e | (F6) |
| AC-G-11 | The system shall show the advisor notices of AC-A-08, AC-B-10, AC-B-12, AC-B-30, AC-C-13, AC-E-13, AC-E-16, AC-E-17, AC-F-08 and AC-F-12, the client's estimates (AC-E-14) and proposed grants only in advisor mode and Data & Assumptions, never in the client view or the shared PDF. | D-060; [FACT: platform_map, the client sees the analysis live] | e2e | (F6) |
| AC-G-12 | When the advisor saves any stock-pay change (a flag, a grant, a tranche, a state withholding rate, the income question, a confirmed extraction), the system shall reprocess the analysis and, if it has a manual score adjustment, first show the warning of AC-B-06. | [brief]; D-049, D-060 | e2e | (F6) |
| AC-G-13 | When a firm turns the setting off, the system shall keep its stock-pay data, hide it and leave it out of every figure from the next reprocessing, leaving analyses already generated and PDFs already shared unchanged; turning the setting on again shall restore it. | D-030, D-060 | unit + e2e | (F6) |
| AC-G-14 | The system shall add no new score limit; existing limits read the checks as today. | D-039, D-060 | unit | (F6) |
| AC-G-15 | The system shall label every value of a future vest with the price date: "at the <analysis date> price". | D-045, D-060 | e2e | (F6) |
| AC-G-16 | The system shall compute the savings rate, fixed commitments, debt-to-income, housing ratio, life cover need, Social Security estimate and contributions from reported income as today, never adding vest income. | D-054 | unit | (F6) |
| AC-G-17 | The paragraphs the platform writes for each section and the score explanation shall use the stock-pay facts of the new lines (AC-A-14 to AC-A-16, AC-C-23, AC-C-24, AC-D-06, AC-D-07, AC-E-10) the way they use other holdings and figures today, never contradicting those lines and phrased as AC-G-06 requires. | D-075 | manual (wording review) | (F6) |
| EV-G-01 | When an analysis of a household with stock pay is shared, the system shall record the firm, the household and the status of each grant (complete, pending detail, awaiting a liquidity event). | D-088; M-07, M-08 | unit | (F6) |

One firm setting, "stock compensation", turns everything on or off for a firm; the pilot runs on firms that turn it on (D-030, D-043, D-049). The stock-pay question always ships with the feature: it is how stock pay enters from the client (D-030, D-032).

## Existing households

Households analysed before a firm turns the setting on have no stock-pay data. Handling (D-052):

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-G-08 | When a firm turns the setting on, the system shall change no existing analysis until the advisor adds a flag or a grant. | D-023, D-052 | unit | (F6) |
| AC-G-09 | The system shall let the advisor add flags, grants and plan statements to an existing household through advisor mode and Data & Assumptions (F-A, F-B, F-F). | D-030, D-042, D-052 | e2e | (F6) |

After the MVP (D-052): asking existing clients the stock-pay question without the full questionnaire [ASSUMPTION: A-22]; suggesting to the advisor existing households that hold single stocks; year-by-year follow-up (D-037 next).

## Features

| Feature | Advisor outcome | Decisions | Depends on | Release order |
|---|---|---|---|---|
| [F-A](F-A_employer-stock-concentration.md) | Concentration sees employer stock as one position, and View more shows the double exposure | D-024, D-040, D-044, D-045 | none | 1 |
| [F-B](F-B_record-grant-and-vests.md) | The advisor records an RSU or PSU grant and sees its future vests | D-024 to D-027, D-029, D-025, D-036, D-037, D-045, D-058 | none (F-A for the context lines) | 2 |
| [F-C](F-C_tax-at-vest.md) | Tax at each vest and the withholding gap; Liquidity counts it | D-033, D-038, D-039 | F-B | 2 |
| [F-D](F-D_vest-proceeds-dated-cash.md) | Vest proceeds as dated cash beside the goals | D-038, D-039, D-045 | F-B | 2 (text lines; projection Next) |
| [F-E](F-E_client-reports-stock-pay.md) | The client reports stock pay in Income with a chip; the grant stays pending and the opportunity shows an alert | D-028, D-030, D-031, D-035, D-036, D-056, D-057 | F-B | 2 |
| [F-F](F-F_upload-plan-statement.md) | The advisor or the client uploads a plan statement; the advisor confirms the extracted tranches | D-042, D-057 | F-B | 2 |

## First release and Next (D-080)

Release 1 is F-A; release 2 is F-B, F-C, F-E, F-F and the text lines of F-D, together. These requirements are for the release after (Next); they stay specified and the prototype keeps them, labelled: AC-A-03, AC-B-14, AC-B-20, AC-B-21, AC-D-01, AC-D-03, AC-D-04, AC-D-10, AC-D-11. AC-C-01 feeds the projection only from Next; AC-E-11 uses "from the next year" only with the projection.

## Shared data

Described in product terms; field names and storage are engineering's call. The platform's type lists already hold a stock compensation asset category (sub-type RSU used here) and a stock compensation income category (RSU inflow used here); grants and vest income map onto them, and what the lists do not hold (PSU terms, tranches, status, the employer flag) is added (D-058) [ASSUMPTION: A-12].

| Object | Holds | From |
|---|---|---|
| Employer | Name; listed or private; ticker when listed; latest 409A value and its date, when private and known | D-025, D-031 |
| Employer flag on a held position | Employer; person whose employer it is; current employer: yes, no or unknown; cost basis when known | D-024, D-029, D-031 |
| Grant | Owner (one person, never joint); type (RSU, or PSU: an RSU with performance terms); employer; grant date; units; status (complete, pending detail, awaiting a liquidity event); source (advisor, questionnaire, extraction) | D-024 to D-027, D-035, D-042 |
| PSU terms | Performance condition; end of the performance period; payout range, 0% to 200% of target unless the award says otherwise | D-027; R-002, R-011 |
| Tranche | Vest date; units (PSU: target units); shares kept after withholding and cost basis, when known | D-027, D-029 |

## Score simulator parameters

The simulator reproduces only what the score article makes public [brief]; everything else is a parameter.

| Parameter | What it is | Public? | Simulator value |
|---|---|---|---|
| Check scale | Each check turns one figure into 0 to 100, on a scale, not pass or fail | Yes [brief] | As stated |
| Area weights | Building wealth 30/20/20/15/15; retirement 25/10/20/20/25 (cash flow, debt, protection, liquidity, investing) | Yes [brief] | As stated |
| Missing data | A figure Sherpas does not have is left out, not treated as zero or average | Yes [brief] | As stated |
| `P-CONC` | Curve of the Investing concentration check | No | SIMULATED, [ASSUMPTION: A-31]; R-014's 10% is reference only |
| `P-CONC-BASE` | The base of the concentration figure ("investable assets") | Name only [FACT: captures/client/02-score-breakdown] | SIMULATED: listed investments plus cash |
| `P-LIQ-HORIZON` | What "near-term" means in the Liquidity commitments check | No | SIMULATED, [ASSUMPTION: A-31] |
| `P-LIQ` | Curve of the near-term commitments check | No | SIMULATED, [ASSUMPTION: A-31] |
| `P-AREA-MIX` | How the check scores of one area combine into its points | No | SIMULATED: equal weights, [ASSUMPTION: A-31] (D-066) |
| `P-STAGE` | Weights of a household in transition | No ("values in between") | SIMULATED |
| `P-LIMITS` | Serious issues that hold the score down | No | Left out of the simulator, labelled |

Simulator tests are relations, not absolute scores (see each feature).

## Metrics fed (defined in `07_success_criteria.md`)

| ID | Metric |
|---|---|
| M-01 | Proposal conversion and time to proposal, households with stock pay against those without (read, not a gate) |
| M-02 | Share of households with stock pay whose detail is complete within N days |
| M-03 | Share of extracted tranches confirmed without edits |
| M-04 | Manual score adjustment rate, households with employer exposure against the rest, with the reason |
| M-05 | Share of analyses with stock pay shared without edits to the new lines |
| M-06 | Firms that enable the setting; share of their households with stock pay |
| M-07 | Share of analyses of households with stock pay shared with every grant complete (primary, release 2) |
| M-08 | Advisor actions per household with stock pay, from the questionnaire to the first share |
| GR-01 | Guardrail: questionnaire completion rate and time, households without stock pay (D-023) |
| GR-02 | Guardrail: retention of pilot firms, at renewal |

## Traceability

Filled in F6: feature · requirement IDs · test IDs · status.
