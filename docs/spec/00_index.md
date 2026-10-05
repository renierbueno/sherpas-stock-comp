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
| AC-G-02 | Where the firm has enabled stock compensation, the system shall add to the questionnaire of a household that answers "no" only the stock-pay yes/no question. | D-023, D-030, D-032 | e2e | (F6) |
| AC-G-03 | While a household has no grant and no position flagged as employer stock, the system shall compute every score check, figure and report line exactly as today. | D-023 | unit | (F6) |
| AC-G-04 | The system shall leave out of every score figure any grant that is pending detail. | D-035, D-039 | unit | (F6) |
| AC-G-05 | The system shall leave out of every score figure any grant or share of a private employer. | D-025, D-039 | unit | (F6) |
| AC-G-06 | The system shall phrase every new report line as a fact about the household, without a sell, hold, exercise or tax instruction. | D-041 (personalised advice: never); A-04 | manual (wording review) | (F6) |
| AC-G-07 | The system shall let the advisor edit or delete every new report line before sharing, as for other generated lines. | [web: https://sherpaswealth.com/financial-health, advisors edit generated observations] | e2e | (F6) |

One firm setting, "stock compensation", turns everything on or off for a firm; the pilot runs on firms that turn it on (D-030, D-043, D-049). The stock-pay question always ships with the feature: it is how stock pay enters from the client (D-030, D-032).

## Existing households

Households analysed before a firm turns the setting on have no stock-pay data. Handling (D-052):

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-G-08 | When a firm turns the setting on, the system shall change no existing analysis until the advisor adds a flag or a grant. | D-023, D-052 | unit | (F6) |
| AC-G-09 | The system shall let the advisor add flags, grants and plan statements to an existing household through advisor mode and Data & Assumptions (F-A, F-B, F-F). | D-030, D-042, D-052 | e2e | (F6) |

After the MVP (D-052): asking existing clients the stock-pay question without the full questionnaire (asked in `02`); suggesting to the advisor existing households that hold single stocks; year-by-year follow-up (D-037 next).

## Features

| Feature | Advisor outcome | Decisions | Depends on | Release order |
|---|---|---|---|---|
| [F-A](F-A_employer-stock-concentration.md) | Concentration sees employer stock as one position, and View more shows the double exposure | D-024, D-040, D-044, D-045 | none | 1 |
| [F-B](F-B_record-grant-and-vests.md) | The advisor records an RSU or PSU grant and sees its future vests | D-024 to D-027, D-029, D-025, D-036, D-037, D-045 | none (F-A for the context lines) | 2 |
| [F-C](F-C_tax-at-vest.md) | Tax at each vest and the withholding gap; Liquidity counts it | D-033, D-038, D-039 | F-B | 3 |
| [F-D](F-D_vest-proceeds-dated-cash.md) | Vest proceeds as dated cash beside the goals | D-038, D-039, D-045 | F-B | 3 |
| [F-E](F-E_client-reports-stock-pay.md) | The client reports stock pay in Income; the grant stays pending and the opportunity shows an alert | D-028, D-030 to D-032, D-035, D-036 | F-B | 3 |
| [F-F](F-F_upload-plan-statement.md) | The advisor uploads a plan statement and confirms the extracted tranches | D-042 | F-B | 3 |

## Shared data

Described in product terms; field names and storage are engineering's call.

| Object | Holds | From |
|---|---|---|
| Employer | Name; listed or private; ticker when listed; latest 409A value and its date, when private and known | D-025, D-031 |
| Employer flag on a held position | Employer; person whose employer it is; current employer: yes, no or unknown; cost basis when known | D-024, D-029, D-031 |
| Grant | Owner (one person, never joint); type (RSU or PSU); employer; grant date; units; status (complete, pending detail, awaiting a liquidity event); source (advisor, questionnaire, extraction) | D-024 to D-027, D-035, D-042 |
| PSU terms | Performance condition; end of the performance period; payout range, 0% to 200% of target unless the award says otherwise | D-027; R-002, R-011 |
| Tranche | Vest date; units (PSU: target units); shares kept after withholding and cost basis, when known | D-027, D-029 |

## Score simulator parameters

The simulator reproduces only what the score article makes public [brief]; everything else is a parameter.

| Parameter | What it is | Public? | Simulator value |
|---|---|---|---|
| Check scale | Each check turns one figure into 0 to 100, on a scale, not pass or fail | Yes [brief] | As stated |
| Area weights | Building wealth 30/20/20/15/15; retirement 25/10/20/20/25 (cash flow, debt, protection, liquidity, investing) | Yes [brief] | As stated |
| Missing data | A figure Sherpas does not have is left out, not treated as zero or average | Yes [brief] | As stated |
| `P-CONC` | Curve of the Investing concentration check | No | SIMULATED, [ASSUMPTION: confirm]; R-014's 10% is reference only |
| `P-CONC-BASE` | The base of the concentration figure ("investable assets") | Name only [FACT: captures/client/02-score-breakdown] | SIMULATED: listed investments plus cash |
| `P-LIQ-HORIZON` | What "near-term" means in the Liquidity commitments check | No | SIMULATED, [ASSUMPTION: confirm] |
| `P-LIQ` | Curve of the near-term commitments check | No | SIMULATED, [ASSUMPTION: confirm] |
| `P-STAGE` | Weights of a household in transition | No ("values in between") | SIMULATED |
| `P-LIMITS` | Serious issues that hold the score down | No | Left out of the simulator, labelled |

Simulator tests are relations, not absolute scores (see each feature).

## Metrics fed (defined in `07_success_criteria.md`)

| ID | Metric |
|---|---|
| M-01 | Proposal conversion and time to proposal, households with stock pay against those without (primary) |
| M-02 | Share of households with stock pay whose detail is complete within N days |
| M-03 | Share of extracted tranches confirmed without edits |
| M-04 | Manual score adjustment rate, households with employer exposure against the rest, with the reason |
| M-05 | Share of analyses with stock pay shared without edits to the new lines |
| M-06 | Firms that enable the setting; share of their households with stock pay |
| GR-01 | Guardrail: questionnaire completion rate and time, households without stock pay (D-023) |
| GR-02 | Guardrail: retention of pilot firms, at renewal |

## Traceability

Filled in F6: feature · requirement IDs · test IDs · status.
