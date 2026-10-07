# Data model

**TL;DR:** How the platform represents a household, organised around the brief's four dimensions (asset, liability, income, expense) and the five score areas. The platform's type lists already carry a stock compensation asset and income category, unused on screen. The last sections say where stock compensation would fit and what the demo shows inconsistently.

How the platform represents a household, described in our own words from what the client view shows (2026-10-03). Organised around the four dimensions (asset, liability, income, expense) and the five score areas. No endpoints, internal IDs or field names from their code. The advisor-side data view (Data & Assumptions) was not reachable, so field-level detail is incomplete.

## Household

- A household has a head, a spouse and dependents. Each person has a role in the household, a birth date, a retirement age and date, and a risk level. [FACT: captures/client/07-api]
- The household carries a state of residence and a tax filing status, and the platform holds federal and state tax brackets. Taxes appear as computed lines (federal, FICA, state). [FACT: captures/client/07-api, 04c-statements-cashflow]
- A person can be flagged as a business owner. [FACT: captures/client/07-api]
- The client's data arrives through the questionnaire and is turned into a versioned client profile (a processing step reports "questionnaire" as the source). [INFERENCE: from the profile metadata in captures/client/01-financial-health] The questionnaire already stores its answers as household members, goals, incomes, accounts with positions, assets, liabilities and policies, each with owners; a completed questionnaire seems to need the advisor's submit before the profile and analysis exist. See `questionnaire_map.md`. [FACT: captures/questionnaire/02-opportunity; INFERENCE for the advisor step]
- Some elements are created without a question: one future Social Security income per adult, starting at 67. [FACT: captures/questionnaire/02-opportunity]
- Every element has an owner: one person or joint. The balance sheet can be shown per owner. [FACT: captures/client/04b-statements-balance-individual]

## Elements by dimension

| Dimension | Category > sub-type > element (as shown) | Notes |
|---|---|---|
| Asset | Cash account > Checking | Counts toward the emergency reserve. [FACT: captures/client/04-statements-balance, 02-score-breakdown] |
| Asset | Investment account > Taxable / Tax-free / Tax-deferred > account (Brokerage, 401k) | Each account has a custodian, an owner and a type. Accounts hold positions: ticker, name, asset class, % of account, value, 1-year return, standard deviation. [FACT: captures/client/03a-accounts-holdings] |
| Asset | Real estate > Primary home, Rental property | [FACT: captures/client/04-statements-balance] |
| Asset | Vehicle > one element per vehicle | [FACT: captures/client/04-statements-balance] |
| Asset | Other asset > e.g. Jewelry | [FACT: captures/client/04-statements-balance] |
| Liability | Credit card, Student loan, Personal loan, Real estate debt | Named after what they financed ("Primary home - Mortgage", vehicle loan), so a liability links to an asset. [INFERENCE: from element names in captures/client/04-statements-balance] |
| Income | Earned income > Salary and wages (per person); Rental income > Long-term rental | No bonus, commission or equity income line. [FACT: captures/client/04c-statements-cashflow] |
| Expense | Taxes (federal, FICA, state); Living expenses; Housing (mortgage payment, HOA, property tax, home insurance); Savings (401k contributions, cash savings); Debt payments | Housing costs are the expense dimension of the home element. [INFERENCE: from the brief's house example and captures/client/04c-statements-cashflow] |

Other objects:

- **Goals**: retirement, education per child, home purchase, vehicle purchase, recurring vacation; each with an amount and a year or frequency. Goals show as markers on the projected net worth chart. [FACT: captures/client/01-financial-health]
- **Insurance**: life cover per person and umbrella cover, each compared with an estimated need. [FACT: captures/client/01-financial-health]
- **Investment targets**: each account has a purpose bucket (near-term reserve, retirement, flexible long-term wealth, concentrated stock risk) and a target mix from model portfolios. [FACT: captures/client/03-investment-analysis, 03c-target-allocation]

## How the analysis reads it

| Score area | Checks seen in the panel | Elements it reads |
|---|---|---|
| Cash flow | Savings rate; fixed commitments vs income | Income, savings, fixed expenses |
| Debt | Housing cost vs income; revolving balance vs income and its rate; rates vs normal for the type | Liabilities, housing expenses |
| Protection | Life cover plus liquid assets vs need; umbrella vs net worth | Insurance, liquid assets, dependents |
| Liquidity | Months of expenses in cash; near-term commitments vs liquid assets | Cash, goals in the near term |
| Investing | Allocation vs profile target; **concentration in the largest position**; idle cash; tax location | Holdings, accounts, risk level |

[FACT: captures/client/02-score-breakdown]

Market data for direct stocks is already part of the platform (the report cites a provider for direct stocks and crypto, separate from the one for ETFs and funds). [FACT: captures/client/06-reports]

## Where stock compensation would fit

First reading, to test in F2 and F3. Every line is an inference until research and Sherpas confirm it.

The lines below read stock compensation as RSUs only. Which types, lifecycle states and vesting models are supported is open: researched in F2, decided in F3 (`02_open_questions.md`).

- **Vested shares the client keeps** are a position in an investment account: they already fit the holdings model, and the concentration check and the "concentrated stock risk" bucket already react to them. What is missing is knowing that the position is the employer's stock. [INFERENCE: from captures/client/03a-accounts-holdings, 02-score-breakdown and R-001]
- **Unvested awards** are neither an asset nor income yet (R-001). They need a new element with a grant and a vesting schedule that turns into future income and future shares. [INFERENCE: from R-001 and the categories above]
- **The taxonomy already has the slots, unused on screen.** The platform's type lists include an asset category for stock compensation (sub-types RSU, non-qualified option, incentive option, ESPP) and an income category for stock compensation (RSU, ESPP and option inflows), next to bonuses and commissions and 409A deferred compensation. The questionnaire offers none of them, and no grant or vesting field was found in its code. [FACT: captures/questionnaire/03-fresh, app type lists read 2026-10-05] How the analysis treats them, if at all, is asked in `02_open_questions.md`.
- **Incomes are stored with a phase (current or future), a type, an amount, a frequency and, for future ones, a start age**; frequencies include monthly, quarterly, twice a year, yearly and one-time. [FACT: captures/questionnaire/03-fresh]
- **Social Security is computed by the platform** from the household's data and marked as computed until someone edits it. [FACT: captures/questionnaire/03-fresh]
- **Holdings carry no cost basis or quantity** in the client questionnaire: an instrument and a balance. The instrument list carries the instrument type (stock, ETF, fund) and a last price. [FACT: captures/questionnaire/03-fresh]
- **Income at vest** is wage income. Earned income today has only "Salary and wages", so vest income either needs its own line or is already inside reported salary, which risks double counting (R-001 assumption). [INFERENCE: from captures/client/04c-statements-cashflow and R-001]
- **Tax at vest** could be estimated with what the platform already stores (filing status, state, tax brackets). [INFERENCE: from captures/client/07-api]
- **Owner** matters: an award belongs to one person, not joint. [INFERENCE: from captures/client/04b-statements-balance-individual]
- **Goals and liquidity**: vest proceeds are a known future cash inflow that could fund near-term goals. [INFERENCE: from the goal model above]

## Inconsistencies seen in the demo

Recorded as questions in `02_open_questions.md`; they matter because a stock-compensation analysis would sit on the same numbers.

- Net worth reads $1.9M (summary), $1.865M (balance sheet) and about $1.35M (score panel).
- The equity share reads about 79.5% (Assets section), 58.5% (Investment analysis) and about 70% vs a 79% target (score panel).
- Concentration reads "VTI about 45% of investable assets" (score) and "39% Financial Services" (Investment analysis), while the holdings show no financial-sector stock.
- The cash deep dive shows a yield of about 7,210%.
- Jane's 401k is listed with John as owner.

[FACT: captures/client/01-financial-health, 02-score-breakdown, 03-investment-analysis, 03a-accounts-holdings, 03b-portfolio-deep-dive]
