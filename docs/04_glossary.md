# 04 · Glossary

One term, one meaning, used the same way everywhere in the repo. Sherpas terms come from the brief or the platform. Finance terms are added by `research` with their `R-NNN` source.

## Sherpas terms

| Term | Meaning | Source |
|---|---|---|
| Advisor | The wealth advisor at a US firm who uses Sherpas. The user. | [brief] |
| Client | The person or household the advisor serves; reached through the advisor. | [brief] |
| Questionnaire | The form the client fills in to give their information. Single-use per link. | [brief] |
| Financial Health analysis | The diagnosis the platform generates from the client's data: score plus report. | [brief] |
| Financial Health Score | A 0–100 number built from checks, grouped into five areas, weighted by life stage, capped by serious issues. | [brief] |
| Check | One scored reading of one figure (e.g. savings rate), on a 0–100 scale, not pass/fail. | [brief] |
| Area | One of five groups of checks: Cash flow, Debt, Protection, Liquidity, Investing. | [brief] |
| Life stage | Building wealth, in transition, or in retirement; read from contributions and withdrawals; sets the area weights. | [brief] |
| Limit | A serious issue that holds the score down instead of being averaged away. | [brief] |
| Dimension | One of four ways an element shows up: asset, liability, income, expense. | [brief] |
| Element | Any financial item in the client's life (a house, a loan, a job), expressed in one or more dimensions. | [brief] |
| View more | The panel next to the score that shows the breakdown. | [brief] |
| Data & Assumptions | Where the advisor reviews and edits the data; saving reprocesses the analysis. | [brief] |
| Opportunity | A client case in the advisor's pipeline; analyses are opened from it. | [brief] |

## Case terms

| Term | Meaning | Source |
|---|---|---|
| Stock compensation | Shares or rights to shares in the client's employer, received as part of pay. [brief] Types and terms are defined in `research.md`. |
| RSU (restricted stock unit) | An unfunded promise by the employer to deliver shares (or their cash value) once a vesting condition is met. Taxed as wages when settled. [R-001] |
| SIMULATED | Any persona, interview or data set that is not real. Always labelled; never presented as real. |
| Stock pay | Our product label for stock compensation in the questionnaire and the analysis ("stock pay reported, detail pending"). | D-030, D-035 |
| Employer flag | A mark on a held position saying it is stock of the person's employer, whatever its origin. | D-024 |
| Employer exposure | Held employer shares summed across accounts by issuer; in the report, with unvested grants and salary from the same employer as context. | D-040 |
| Withholding gap | Tax owed on a vest minus tax withheld at vest; federal always, state only when the advisor enters the rate; FICA shown outside it. | D-033, D-051 |
| Detail pending | State of a grant the client reported but the advisor has not completed; kept out of figures. | D-035 |
| Proposed grant | A grant extracted from a plan statement and not yet confirmed by the advisor; kept out of figures. | D-042 |
| Firm setting | "Stock compensation": one setting per firm that turns every stock-pay feature on or off. | D-049 |
| Feature (spec) | One advisor outcome that can be built, tested and released on its own (F-A to F-F). | D-047 |
| EARS | A fixed way to write a requirement: one testable sentence per behaviour, with five patterns (always; when an event; while a state; if something unwanted, then; where a feature is enabled). | `.claude/skills/spec/SKILL.md` |
| Acceptance criterion | A yes/no check that a requirement is met; ID `AC-<feature>-NN`, linked to a test. | D-004, D-047 |
| Edge case | An unusual but possible situation that tends to break the logic; ID `EC-<feature>-NN`. | `.claude/skills/spec/SKILL.md` |
| Instrumentation event | What the system records so a metric can be measured; ID `EV-<feature>-NN`. | D-043 |
| Parameter (`P-…`) | A part of the score that is not public (a check's curve, threshold or horizon); SIMULATED values in tests. | [brief]; `spec/00_index.md` |
| Relation test | A test that checks a relation that must always hold (two accounts equal one position) instead of an absolute score. | `spec/00_index.md` |
| Success metric | A measurable signal that the feature works, with a window, a target and a decision rule; ID `M-NN`. | D-043 |
| Guardrail | A metric that must not get worse rather than improve; ID `GR-NN`. | D-043 |
| Design partner | A firm in the pilot that turns the setting on and gives weekly feedback. | D-043 |
| Pilot readout | The weekly table of metrics, grouped advisor corrections and the decision taken. | D-043 |

## Stock compensation terms

| Term | Meaning | Source |
|---|---|---|
| Grant (award) | The employer's award of units, options or shares to an employee on a grant date. | R-002, R-003 |
| Vesting | Meeting the condition (time, performance, liquidity event) that makes an award no longer forfeitable. | R-002, R-009 |
| Vesting commencement date | The date the vesting clock starts; can differ from the grant date. | R-009 |
| Tranche | One dated portion of a grant that vests together. | R-009 |
| Cliff | A first period with no vesting, then a first tranche at its end (often 12 months). | R-009 |
| Graded vesting | Vesting in several tranches over time. | R-009 |
| Back-loaded / front-loaded | More of the grant vests late / early. | R-010 |
| Forfeiture | Losing unvested units or options, usually on leaving the employer. | R-002 |
| Settlement (delivery) | Transfer of shares or cash to the holder after an RSU or PSU vests. | R-002 |
| Net settlement | The company withholds shares to cover taxes at settlement. | R-011 |
| Sell-to-cover | Selling part of the vested shares to pay the tax withheld at vest. | R-011, V39 |
| Cost basis | For shares received at vest, the value included in income at vest; the base for gain or loss on sale. | R-002 |
| W-2 | The employer's annual wage statement; RSU income at vest is reported in Box 1. | R-001 |
| Dividend equivalent | A credit equal to dividends paid during vesting, usually vesting and forfeited with the award. | R-002 |
| PSU (performance stock unit) | An RSU whose number of shares depends on performance goals over a performance period. | R-002, R-011 |
| Target / payout range | The baseline number of PSU shares / the percentage of target actually earned (0% to 200% in the examples found). | R-002, R-011 |
| Certification | The compensation committee's confirmation of performance results, which fixes the PSU payout. | R-011 |
| Double-trigger RSU | An RSU that needs both a service condition and a liquidity event (IPO or sale) to settle. | R-011 |
| Stock option | The right to buy employer shares at a fixed price (strike) until an expiry date. | R-003 |
| Strike (exercise price) | The fixed price an option holder pays per share. | R-003 |
| Exercise | Using an option to buy the shares at the strike. | R-003 |
| Spread | Market value at exercise minus strike, times shares. | R-003, R-004 |
| NSO (non-qualified stock option) | An option without special tax status; the spread is taxed as wages at exercise. | R-003 |
| ISO (incentive stock option) | An option under IRC §422; no regular tax at exercise, possible AMT, capital-gain treatment if holding periods are met. | R-004 |
| AMT (alternative minimum tax) | A parallel federal tax calculation; the ISO spread at exercise is added to it. | R-004 |
| Post-termination exercise window | Time after leaving the employer to exercise vested options; plan-set for NSOs, 3 months to keep ISO status. | R-003, R-004 |
| Qualifying / disqualifying disposition | Sale of ISO or ESPP shares after / before both holding periods (2 years from grant, 1 year from exercise or purchase). | R-004, R-005 |
| ESPP (employee stock purchase plan) | A plan to buy employer shares through payroll, at up to a 15% discount under IRC §423. | R-005 |
| Offering period / purchase date | The ESPP window in which payroll contributions accumulate / the date shares are bought. | R-005 |
| Lookback | ESPP feature that applies the discount to the lower of the offering-date and purchase-date prices. | R-005 |
| RSA (restricted stock award) | Actual shares transferred at grant, subject to forfeiture until they vest. | R-006 |
| §83(b) election | Choice to be taxed on restricted shares at grant instead of at vesting; due within 30 days. | R-006 |
| SAR (stock appreciation right) | A right to the rise in share value between grant and exercise, paid in cash or shares. | R-006 |
| Phantom stock | Hypothetical shares that pay their full value in cash or shares at vesting. | R-006 |
| §409A | Rules for deferred compensation; failing them means immediate tax plus a 20% additional tax and interest. | R-006 |
| ESOP | A 401(a) retirement plan that invests mainly in employer stock through a trust. | R-007 |
| Supplemental wages | Pay outside regular wages (bonuses, equity income), withheld at a flat 22%, or 37% above $1 million (tax year 2026). | R-008 |
| Concentration | A large share of wealth in one stock; 10% of investment assets is a common rule of thumb, not a rule. | R-014 |
| Double exposure | Salary and savings tied to the same employer. | R-014 |
| Full-value award | An award that delivers the whole share value (RSU, restricted stock, performance shares), as opposed to an option that pays only the gain over the strike. | R-016 |
| 409A valuation | An independent appraisal of a private company's common stock, used for tax and to set option strike prices; presumed reasonable for 12 months. | R-017 |
| Discount for lack of marketability | A reduction in value because shares cannot be sold on a public market. | R-017 |
