# Research

Public facts about US stock compensation, one entry per question. Append-only. Format and rules: `.claude/skills/research/SKILL.md`. Not tax advice.

## R-001 · When does an RSU become taxable income, and as what?
- Category: 2 (tax and regulation)
- Decision it unblocks: which of the four dimensions (asset, liability, income, expense) an RSU touches, and when.
- Finding: an RSU is an unfunded promise to deliver shares (or cash) once a vesting condition is met. Under IRC §83 the fair market value is included in gross income in the year the shares are transferred (or the cash is paid), reported in Box 1 of the W-2. RSUs are wages for income-tax withholding and for FICA; for FICA, an RSU that vests and pays in a later year generally follows the "special timing rule" of IRC §3121(v)(2) (taxed when there is no longer a substantial risk of forfeiture).
- Source: IRS Office of Chief Counsel, Information Letter 2024-0010 (June 18, 2024), https://irs.gov/pub/irs-wd/24-0010.pdf · Accessed: 2026-10-03 · Source date: 2024-06-28 (release)
- Evidence size: one IRS document stating general principles, citing IRC §83, §3121(v)(2) and Rev. Rul. 79-305. It says itself that it is informational and "does not constitute a ruling".
- Signal: STRONG for the general principle (IRS, citing the code). Edge cases (deferral, cash settlement, leaving the employer) need their own entry.
- Changes: an unvested RSU is not yet income or a held asset. At settlement it becomes wage income (W-2) and, if shares are kept, an asset (a single-stock position). [INFERENCE: from the finding above and the four-dimension model in `00_brief.md`]
- Assumption carried forward: the household's RSU income at vest is already in the W-2 wages a client reports, so it could be counted twice if also entered as a separate RSU income. [ASSUMPTION: A-06]

## R-002 · RSU and PSU: lifecycle states and what each state changes for the employee
- Category: 1 instruments
- Decision it unblocks: whether the MVP models RSU/PSU as unvested (contingent) vs vested/settled (owned) holdings, and whether PSU needs a target plus payout range in intake.
- Finding: An RSU is a promise to deliver shares in the future if vesting conditions are met; no stock is transferred at grant and the holder has no shareholder rights (voting, dividends) until shares are delivered. Units that do not meet vesting conditions are forfeited. Many companies credit dividend equivalents during vesting, on terms that differ by plan: the Athene RSU agreement pays them on each unit "whether or not vested", the Fiserv PSU agreement credits them (R-025). Settlement typically follows vesting "as soon as administratively practicable"; the RSU and PSU clocks differ: the Athene RSU agreement delivers no later than the 15th day of the third month after the fiscal year (the participant's or the company's) in which the unit vests (the §409A short-term deferral window, 26 CFR §1.409A-1(b)(4)), the Fiserv PSU agreement no later than March 15 of the year after the performance period ends (re-checked 2026-10-06). A PSU is an RSU whose earned quantity depends on performance goals over a performance period, certified by the compensation committee; sample award agreements set the earned range at 0% to 200% of target.
- Lifecycle states:
  - Granted / unvested → ownership: none (contractual promise) · income: none · tax: none · risk: forfeiture on termination plus full stock price risk.
  - (PSU only) In performance period → quantity unknown, 0% to 200% of target in sample agreements; adds performance-outcome risk on top of price risk.
  - Vested → right becomes nonforfeitable; income is recognized at settlement (delivery of the shares), not at vest: the fair market value of the stock is included in gross income in the year the transfer occurs (R-001); W-2 wages, supplemental withholding (R-008, R-022). A unit that vests late in a year can settle in the next tax year.
  - Settled / delivered → employee owns shares; cost basis = the amount included in income plus any amount paid, holding period from delivery (R-024; applying it to RSU shares is an inference [ASSUMPTION: A-49]); dividends and voting start; from here a normal stock holding (capital gain/loss on sale).
  - Forfeited → units and accrued dividend equivalents disappear; no income, no deduction.
- Data an advisor needs: grant date, units granted (PSU: target units and min/max payout %), vest schedule (dates and units per tranche), performance period end (PSU), settlement date of each tranche, units vested/settled to date, shares withheld for tax, FMV at each settlement, dividend equivalent treatment, termination/forfeiture terms.
- Source: SEC EDGAR, Athene "Notice of Restricted Share Unit Award" (Ex. 10.28), https://ir.athene.com/sec-filings/all-sec-filings/content/0001527469-25-000016/q42024exhibit1028.htm · Accessed: 2026-10-05 · Source date: 2025 (10-K exhibit)
- Source: SEC EDGAR, Fiserv PSU award agreement form (Ex. 10.28), https://www.sec.gov/Archives/edgar/data/831259/000083125925000006/a4q2024exhibit1028.htm · Accessed: 2026-10-05 · Source date: 2025
- Source: SEC EDGAR, Janus International form of PSU agreement (Ex. 10.23), https://sec.gov/Archives/edgar/data/1839839/000183983923000024/exhibit1023-formofperforma.htm · Accessed: 2026-10-05 · Source date: 2023
- Source: Meridian Compensation Partners, "Restricted Stock Unit Fundamentals", https://www.meridiancp.com/?p=1244 · Accessed: 2026-10-05 · Source date: undated
- Source: 26 CFR §1.409A-1(b)(4), short-term deferrals, https://www.law.cornell.edu/cfr/text/26/1.409A-1 · Accessed: 2026-10-06 · Source date: current regulation (a safe harbour from §409A, not a rule that settlement must occur by then)
- Evidence size: several sources agree (company award agreements filed with the SEC plus one consultant note); search summaries, not every clause read in full.
- Signal: STRONG
- Changes: unvested RSU/PSU is a contingent future income item, not an asset owned today; settlement converts it to taxable income plus a liquid asset (public company); all states add to employer-stock concentration; PSU adds a range, not a point estimate. [INFERENCE]
- Assumption carried forward: 0% to 200% PSU payout range is typical for public companies, not a legal rule; actual range comes from each award agreement [ASSUMPTION: A-34].

## R-003 · NSO (non-qualified stock options): states, tax at exercise, basis, sale
- Category: 1 instruments
- Decision it unblocks: whether the MVP supports NSOs, with vested vs unvested and in-the-money spread, and asks strike, expiry and post-termination window.
- Finding: For an NSO without a readily determinable FMV (the usual employee option), there is no taxable event at grant; at exercise the employee includes "the FMV of the stock on the date of exercise minus the option price" in income, and the employer must withhold income tax, Social Security and Medicare on it (IRS Pub 525, 2025). Basis in the shares is the amount paid plus the amount included in income; a later sale gives capital gain or loss (IRS Pub 525; Topic 427). Unlike ISOs (§422(b), 10-year cap), no federal statute caps the NSO term; "most options are granted with a 10-year term", some 7 or 5 years, and a former employee usually has "90 days from your last day of work" to exercise vested options, per the grant agreement (myStockOptions, undated). A 2021 survey cited in search results put 60% of companies at three months after involuntary termination.
- Lifecycle states:
  - Granted / unvested → ownership: none · income/tax: none · risk: forfeiture plus price risk; value only if stock > strike.
  - Vested / exercisable → may exercise; still no income until exercise; value = spread (FMV minus strike) x shares, can go to zero.
  - Exercised → cash out for strike (unless cashless); spread taxed as ordinary wage income with withholding; employee owns shares with basis = strike + spread.
  - Sold → capital gain/loss vs basis; holding period from exercise sets short vs long term.
  - Post-termination window → vested options must be exercised within the plan window (often 90 days) or lapse; unvested options generally forfeited.
  - Expired → unexercised options lapse with no value and no tax.
  - Forfeited → unvested options cancelled; no tax.
- Data an advisor needs: grant date, options granted, strike price, vest schedule, options vested/exercised to date, expiration date, post-termination exercise window, FMV at exercise, shares held from exercise and their cost basis, exercise method (cash, cashless, sell-to-cover).
- Source: IRS Topic No. 427, Stock options, https://www.irs.gov/taxtopics/tc427 · Accessed: 2026-10-05 · Source date: last reviewed 2026-09-24
- Source: IRS Publication 525 (2025), Taxable and Nontaxable Income, https://www.irs.gov/publications/p525 · Accessed: 2026-10-05 · Source date: tax year 2025
- Source: myStockOptions.com, "What is the standard stock option term?", https://www.mystockoptions.com/content/what-is-the-standard-stock-option-term-do-options-ever-expire · Accessed: 2026-10-05 · Source date: undated
- Evidence size: primary rule (tax); one vendor (10-year term and 90-day window as practice)
- Signal: STRONG for tax; WEAK for term and window norms
- Changes: vested NSO = contingent asset whose value is the spread, not share value; exercise needs cash (strike plus tax) and creates taxable income; shares after exercise add to concentration; expiry date is a hard liquidity deadline. [INFERENCE]
- Assumption carried forward: 10-year term and 90-day post-termination window are common practice, not law, for NSOs [ASSUMPTION: A-35].

## R-004 · ISO: §422 rules, holding periods, dispositions, AMT, $100,000 limit, Form 3921
- Category: 2 tax and regulation
- Decision it unblocks: whether the MVP supports ISOs (needs AMT flag and holding-period tracking) or treats them as NSO-like with a warning; intake fields for exercise date and FMV at exercise.
- Finding: No regular income at grant or exercise (Topic 427). Qualifying disposition requires holding the stock more than 2 years from grant and more than 1 year from exercise (§422(a)(1); Pub 525); then the whole gain over the strike is capital gain. If sold earlier (disqualifying disposition), ordinary income equals the lesser of (a) FMV at exercise minus option price or (b) amount realized minus option price; the rest is capital gain (Pub 525). Statutory requirements: option term not more than 10 years, strike not less than FMV at grant, employment until 3 months before exercise (§422(b), (a)(2)); for a 10%+ shareholder, strike at least 110% of FMV and term at most 5 years (§422(c)(5)). Options first exercisable in a calendar year above $100,000 of FMV (measured at grant) are treated as NSOs (§422(d)). For AMT, the exercise spread (FMV when the stock is transferable or vested minus amount paid) goes on Form 6251 line 2i, and raises AMT basis; no adjustment if the stock is sold in the same year (Form 6251 instructions, tax year 2025). ISO exercise and sale are excluded from FICA wages (§3121(a)(22)). The employer files Form 3921 per exercise: grant date, exercise date, exercise price, FMV at exercise, shares transferred (Instructions for Forms 3921/3922, rev. April 2025).
- Lifecycle states:
  - Granted / unvested → as NSO: no ownership, no tax, forfeiture risk.
  - Vested / exercisable → no tax until exercise; $100,000 first-exercisable test applies per calendar year.
  - Exercised and held → owns shares; no regular income; AMT adjustment = spread in exercise year (unless sold same year); cash needed for strike and possible AMT.
  - Qualifying disposition (more than 2y from grant and 1y from exercise) → all gain long-term capital gain.
  - Disqualifying disposition → ordinary income (lesser of spread at exercise or actual gain), not subject to FICA; rest capital.
  - Post-termination → ISO status requires exercise within 3 months of leaving employment (§422(a)(2)); later exercise gets NSO tax treatment [INFERENCE: from §422(a)(2)].
  - Expired / forfeited → as NSO.
- Data an advisor needs: grant date, options, strike, vest schedule, expiration, exercise dates, shares exercised per date, FMV at exercise (Form 3921 box 4), shares still held per lot, sale dates, ISO vs NSO split per grant.
- Source: 26 U.S.C. §422, https://www.law.cornell.edu/uscode/text/26/422 · Accessed: 2026-10-05 · Source date: current code
- Source: IRS Publication 525 (2025), https://www.irs.gov/publications/p525 · Accessed: 2026-10-05 · Source date: tax year 2025
- Source: IRS Instructions for Form 6251 (2025), https://www.irs.gov/instructions/i6251 · Accessed: 2026-10-05 · Source date: tax year 2025
- Source: IRS Instructions for Forms 3921 and 3922, https://www.irs.gov/instructions/i3921 · Accessed: 2026-10-05 · Source date: rev. April 2025
- Source: 26 U.S.C. §3121(a)(22), https://www.law.cornell.edu/uscode/text/26/3121 · Accessed: 2026-10-05 · Source date: current code
- Evidence size: primary rule
- Signal: STRONG
- Changes: ISO exercise can create a tax liability (AMT) with no cash income; held ISO shares are a concentrated asset with a dated tax status (qualifying date); the holding period ties liquidity to a date. [INFERENCE]
- Assumption carried forward: 2025 AMT exemption amounts (single/HoH $88,100; MFJ $137,000; MFS $68,500, Form 6251 instructions 2025) are the latest found; 2026 amounts not fetched [ASSUMPTION: A-36].

## R-005 · ESPP: §423 qualified plans and dispositions; non-qualified ESPP
- Category: 2 tax and regulation
- Decision it unblocks: whether the MVP supports ESPP shares (purchased lots with disposition status) and what intake asks per purchase.
- Finding: Under §423 the purchase price must be at least 85% of FMV at grant (offering date) or at exercise (purchase date), so the discount is at most 15%; plans may use a lookback that applies the discount to the lower of the two prices [FACT: §423(b)(6)] [lookback wording: secondary sources]. An offering can last at most 27 months, or 5 years if the price is set only by FMV at purchase (§423(b)(7)). An employee cannot accrue rights to buy more than $25,000 of stock per calendar year, valued at grant (§423(b)(8)). No income at grant or purchase (Topic 427). Qualifying disposition (more than 2 years from grant and 1 year from purchase): ordinary income is the lesser of the actual gain or the discount measured at the offering date, rest long-term capital gain (§423(c); Schwab example: offering FMV $50, price $42.50, sale $100 → $7.50 ordinary, $50 LTCG). Disqualifying disposition: "the difference between the FMV of the stock when you exercised the option and the price you paid for it" is wages (Pub 525, tax year 2025). §423 purchases and dispositions are excluded from FICA wages (§3121(a)(22)). The employer issues Form 3922 for the first transfer of legal title, reporting grant date, purchase date, FMV at grant and at purchase, price paid, shares, transfer date. Non-qualified ESPP (not meeting §423): the discount is taxed at purchase as wages, like an NSO spread [INFERENCE: from Pub 525 nonstatutory option rule; not separately sourced].
- Lifecycle states:
  - Enrolled / offering period → payroll contributions accumulate as cash (refundable on withdrawal per plan); no shares, no tax.
  - Purchase date → shares bought at discount; employee owns shares; no tax yet (§423).
  - Held → disposition status depends on dates; price risk; adds to concentration.
  - Qualifying disposition → limited ordinary income, rest LTCG.
  - Disqualifying disposition → discount at purchase as ordinary income, rest capital gain/loss.
- Data an advisor needs: offering (grant) date, purchase date, FMV at offering and at purchase, purchase price, shares per purchase lot, discount %, lookback yes/no, contribution rate and accumulated cash, shares still held per lot, sale dates.
- Source: 26 U.S.C. §423, https://www.law.cornell.edu/uscode/text/26/423 · Accessed: 2026-10-05 · Source date: current code
- Source: IRS Topic No. 427, https://www.irs.gov/taxtopics/tc427 · Accessed: 2026-10-05 · Source date: last reviewed 2026-09-24
- Source: IRS Instructions for Forms 3921 and 3922, https://www.irs.gov/instructions/i3921 · Accessed: 2026-10-05 · Source date: rev. April 2025
- Source: IRS Publication 525 (2025), https://www.irs.gov/publications/p525 · Accessed: 2026-10-05 · Source date: tax year 2025
- Source: Charles Schwab, "Employee Stock Purchase Plan (ESPP) Taxes: A Guide", https://www.schwab.com/learn/story/espp-taxes · Accessed: 2026-10-05 (page returned an error on fetch; content seen via search summary only) · Source date: undated
- Evidence size: primary rule (limits, holding periods, Form 3922, disqualifying disposition); one vendor (lookback wording, qualifying example)
- Signal: STRONG (disqualifying disposition checked against Pub 525 text on 2026-10-05)
- Changes: ESPP is a regular payroll deduction (expense/savings) that becomes a stock asset at each purchase; frequent small lots add steadily to concentration. [INFERENCE]
- Assumption carried forward: non-qualified ESPP treatment is an inference, not sourced [ASSUMPTION: A-37].

## R-006 · RSA and the §83(b) election; SARs and phantom stock
- Category: 1 instruments
- Decision it unblocks: whether RSA, SAR and phantom stock are in MVP scope or "other / not modelled"; whether intake asks for an 83(b) flag.
- Finding: Restricted stock (RSA) is actual stock transferred at grant subject to a substantial risk of forfeiture; under §83(a) the FMV minus the amount paid is income when the stock first becomes transferable or not subject to forfeiture (vesting). Under §83(b) the employee can instead elect to include it at transfer; the election must be made "not later than 30 days after the date of such transfer", is generally irrevocable, and no deduction is allowed if the stock is later forfeited. Dividends on unvested restricted stock are treated differently depending on whether 83(b) was made (Pub 525). A SAR pays the appreciation between grant and exercise, in cash or stock; it is taxed at exercise (Pub 525) and is exempt from §409A if the exercise price is not below FMV at grant and it has no other deferral feature. Phantom stock credits hypothetical shares and pays their full value (not only appreciation) in cash or stock at vesting; a payout deferred past vesting must comply with §409A, whose failure makes all deferred amounts taxable now plus a 20% additional tax and interest at the underpayment rate plus 1 point (§409A(a)(1)(B)).
- Lifecycle states:
  - RSA granted, unvested, no 83(b) → employee holds shares (votes, dividends taxed as wages [INFERENCE: from Pub 525]); income at each vest = FMV at vest.
  - RSA with 83(b) → income at grant = FMV minus price paid; vesting is not a tax event; later sale = capital gain from grant-date basis; forfeiture loses the tax paid.
  - RSA vested → normal holding.
  - SAR granted/vested → no tax; value = spread; exercised → spread taxed as ordinary income (cash or shares).
  - Phantom stock vested/paid → full value taxed as ordinary income when paid; cash settled adds no share holding.
- Data an advisor needs: RSA: grant date, shares, price paid, vest schedule, 83(b) yes/no and date, FMV at grant/vest. SAR: grant date, units, base (exercise) price, vest schedule, expiry, settlement form (cash/stock). Phantom: units, vest schedule, payout date, settlement form.
- Source: 26 U.S.C. §83, https://www.law.cornell.edu/uscode/text/26/83 · Accessed: 2026-10-05 · Source date: current code
- Source: IRS Publication 525 (2025), https://www.irs.gov/publications/p525 · Accessed: 2026-10-05 · Source date: tax year 2025
- Source: 26 U.S.C. §409A, https://www.law.cornell.edu/uscode/text/26/409A · Accessed: 2026-10-05 · Source date: current code
- Source: Boardman Clark, "Specific Types of Equity Compensation: Phantom Stock and Stock Appreciation Rights", https://boardmanclark.com/publications/business-minute/specific-types-of-equity-compensation-phantom-stock-and-stock-appreciation-rights · Accessed: 2026-10-05 · Source date: undated
- Source: EisnerAmper, "Section 409A and the closely held business", https://www.eisneramper.com/insights/employee-benefit-plan/section-409a-closely-held-business-1011/ · Accessed: 2026-10-05 · Source date: June 2011
- Evidence size: primary rule (§83, §409A, Pub 525); several secondary sources agree on SAR/phantom mechanics
- Signal: STRONG
- Changes: RSA is an owned asset from day one (with forfeiture risk); 83(b) moves tax earlier; cash-settled SARs and phantom stock are cash income promises tied to employer value, adding concentration without shares. [INFERENCE]
- Assumption carried forward: RSA, SAR and phantom stock are less common for public-company employees of advisor clients than RSU/NSO/ESPP [ASSUMPTION: A-38].

## R-007 · ESOP: retirement plan, not an employee-held grant
- Category: 1 instruments
- Decision it unblocks: excluding ESOP from the stock-comp MVP, or treating it as a retirement account in existing retirement fields.
- Finding: An ESOP is "an IRC section 401(a) qualified defined contribution plan that is a stock bonus plan or a stock bonus/money purchase plan" that must be "designed to invest primarily in qualifying employer securities" (§4975(e)(8)); the IRS and DOL share jurisdiction and it must meet ERISA reporting, disclosure and fiduciary rules. The company funds a trust with tax-deductible contributions and each participant's account is credited with shares or cash. Distributions come at retirement, death, disability or after leaving the company, in cash, stock or both; §409(h) requires a put option (resale right) for distributed stock that is not readily tradable. So the employee holds an account balance inside a qualified plan, not a personal grant with strike, vest-and-settle income events, or W-2 income at vest; taxation follows retirement-plan distribution rules [INFERENCE: from 401(a) qualified status].
- Lifecycle states: Allocated to account → vests under the plan's retirement vesting schedule → distributed after a trigger event (retirement, termination, death, disability) → for non-traded stock, put back to the company for cash.
- Data an advisor needs: account balance (shares and value), vested %, company private or public, expected distribution timing and form.
- Source: IRS, "Employee Stock Ownership Plans (ESOPs)", https://www.irs.gov/retirement-plans/employee-stock-ownership-plans-esops · Accessed: 2026-10-05 · Source date: last reviewed 2026-07-23
- Source: Hirschler/HPY law, "Description and Purpose of an ESOP", https://www.hpylaw.com/publications/description-and-purpose-of-an-esop/ · Accessed: 2026-10-05 · Source date: undated
- Source: ESOP Partners, "What is an ESOP distribution", https://esoppartners.com/blog/what-is-an-esop-distribution · Accessed: 2026-10-05 · Source date: undated
- Evidence size: primary rule (IRS) plus two secondary sources
- Signal: STRONG
- Changes: ESOP belongs with retirement assets (illiquid until distribution) rather than with equity comp grants; still employer-stock concentration if the client also holds grants. [INFERENCE]
- Assumption carried forward: no DOL page fetched directly; ERISA coverage taken from secondary sources plus IRS "shared jurisdiction" [ASSUMPTION: A-39].

## R-008 · Federal supplemental wage withholding rates for tax year 2026
- Category: 2 tax and regulation
- Decision it unblocks: what default withholding the MVP assumes at RSU/PSU settlement and NSO exercise, to show the gap between tax withheld and tax owed.
- Finding: Publication 15 (2026), "What's New": "The withholding rate on supplemental wages remains 22% (37% if supplemental wages paid to an employee during the calendar year exceed $1 million)", because P.L. 119-21 permanently extended the individual tax rates of P.L. 115-97. The 37% rate is mandatory on supplemental wages above $1 million; the 22% flat rate is the optional method below that, and under it no other percentage is allowed; it needs income tax withheld from regular wages in the current or preceding calendar year, otherwise the employer aggregates with regular wages, and other outcomes come only from that aggregate method (R-022). The $1 million counts all supplemental wages paid to the employee in the calendar year, including all businesses under common control (R-022). Withholding is not the final tax; the real liability is set on the return, so a client in a bracket above 22% can be under-withheld [INFERENCE].
- Data an advisor needs: expected supplemental income per year from settlements and exercises (per employer), year-to-date supplemental wages, client marginal bracket, whether the employer uses the flat 22% method (no other percentage allowed) or the aggregate method, whose outcome follows the Form W-4 (R-022).
- Source: IRS Publication 15 (2026), (Circular E) Employer's Tax Guide, https://www.irs.gov/publications/p15 · Accessed: 2026-10-05 · Source date: tax year 2026
- Evidence size: primary rule
- Signal: STRONG
- Changes: settlement creates income plus a possible tax liability not covered by withholding (liability/expense in the year); shares withheld for tax reduce the asset received. [INFERENCE]
- Assumption carried forward: employers use the 22% flat method for amounts below $1 million [ASSUMPTION: A-40].

## R-009 · Which time-based vesting patterns are common, with filing examples, and do new-hire grants differ from annual refresh grants?
- Category: 1 (instruments)
- Decision it unblocks: Which vesting models the MVP represents (cliff + periodic, graded annual, even periodic, unequal tranches), and that the intake asks for a vesting start date plus a list of dated tranches rather than a single "4 years" field.
- Finding: Filings show at least four time-based shapes: (a) one-year cliff then equal quarterly installments, (b) equal installments with no cliff (16 quarterly), (c) equal annual installments (3 years), (d) unequal annual tranches (10/20/35/35). Monthly 48-month option vesting also appears. Where filings distinguish grant types, new-hire/initial awards carry a cliff or longer period and annual awards are shorter or cliff-free, but the examples below are director or executive awards, not rank-and-file employee grants. A search summary also described a company that replaced a new-hire one-year cliff with quarterly vesting; the company and filing were not verified (see Open questions).
- Examples:
  - Cloudera · DEF 14A (director pay) · filed 2021-04-27 · Initial award: 1/3 at first anniversary of vesting commencement date, rest quarterly over the next two years; Annual award: 100% at first anniversary.
  - 1stdibs.com · DEF 14A · filed 2025-03-25 · NEO annual RSUs: 16 equal quarterly installments, no cliff; initial director award: equal annual installments over three years; options: monthly over 48 months, or 20.8333% at commencement date then 38 equal monthly installments.
  - Rubrik · DEF 14A · filed 2025-05-13 · CEO and CFO March 2024 RSUs: 10% on 2025-03-15, 20% on 2026-03-15, 35% on 2027-03-15, 35% on 2028-03-15 (time condition plus a performance condition satisfied at IPO).
  - SoFi · DEF 14A · filed 2025-04-15 · Director annual RSUs vest at the earlier of 12 months or the next annual meeting (vest date is event-linked, not a fixed length).
- Source: Cloudera 2021 Proxy Statement (DEF 14A), https://www.sec.gov/Archives/edgar/data/1535379/000162828021007729/cldr-2021proxystatement.htm · Accessed: 2026-10-05 · Source date: 2021-04-27
- Source: 1stdibs.com DEF 14A 2025, https://www.sec.gov/Archives/edgar/data/1600641/000160064125000046/def14aproxystatement2025an.htm · Accessed: 2026-10-05 · Source date: 2025-03-25
- Source: Rubrik DEF 14A 2025, https://www.sec.gov/Archives/edgar/data/1943896/000194389625000020/rbrk-20250512.htm · Accessed: 2026-10-05 · Source date: 2025-05-13
- Source: SoFi DEF 14A 2025, https://www.sec.gov/Archives/edgar/data/1818874/000181887425000060/sofi-20250415.htm · Accessed: 2026-10-05 · Source date: 2025-04-15
- Evidence size: several sources agree (four filings; text read through a page-summarising fetch tool, quotes not checked against the raw filing).
- Signal: STRONG for "these shapes exist"; WEAK for "new-hire differs from refresh" (director examples only).
- Changes: Future shares: the count and date of each tranche set when shares arrive; a cliff means zero shares until month 12, then a step. Future income: each tranche is ordinary income at vest for RSUs [INFERENCE]. Concentration: stays flat until the first tranche, then rises in steps. Liquidity: shares are unsellable (and taxes unfunded) until vest dates.
- Assumption carried forward: Employee (non-executive, non-director) grants follow the same shapes as the executive and director examples. [ASSUMPTION: A-41]

## R-010 · What is back-loaded vesting (Amazon) and which large tech companies moved to front-loaded schedules?
- Category: 1 (instruments)
- Decision it unblocks: Whether the MVP must support unequal tranche percentages (it must if any real schedule is unequal) and per-tranche dates that are not evenly spaced.
- Finding: A primary source for Amazon's 5/15/40/40 split was not found. Amazon's 10-K says employees vest in RSUs "over the corresponding service term, generally between two and five years" (per search snippet of the FY2020 to FY2024 10-Ks; exact page not opened). The 5% / 15% / 20% / 20% / 20% / 20% cadence (5% after year 1, 15% after year 2, then 20% every six months) and the 5/15/40/40 yearly equivalent come from brokerage/advisor pages and press only (WEAK). Alphabet's shift from even vesting to 33/33/22/12 comes from secondary sources only; the Alphabet 10-K text on this was not found. A securities-law blog (Feb 2022) cites Forbes that Google moved to front-loaded vesting and Amazon was considering monthly vesting, with no percentages. For a documented primary unequal schedule, Rubrik's 2025 proxy gives 10/20/35/35 (see R-009).
- Examples:
  - Amazon · 10-K FY2020 to FY2024 (general text) · RSUs vest over 2 to 5 years (no percentages).
  - Amazon · secondary (WEAK) · 5% yr1, 15% yr2, then 20% each six months across years 3 and 4 (equals 5/15/40/40 by year).
  - Alphabet · secondary (WEAK) · 33% / 33% / 22% / 12% by year, previously reported as even over four years.
  - Rubrik · DEF 14A · filed 2025-05-13 · 10/20/35/35 over four annual dates (primary).
- Source: Amazon 10-K FY2022, https://www.sec.gov/Archives/edgar/data/1018724/000101872423000004/amzn-20221231.htm · Accessed: 2026-10-05 · Source date: 2023 (filing year; snippet only)
- Source: Compensation Standards blog (Liz Dunshee), https://www.compensationstandards.com/member/blogs/consultant/2022/02/tech-giants-adjust-stock-grant-practices-to-retain-employees.html · Accessed: 2026-10-05 · Source date: 2022-02-14
- Source: MyStockOptions.com, https://www.mystockoptions.com/articles/how-amazon-apple-google-adapted-their-rsu-grants-to-help-retain-top-talent · Accessed: 2026-10-05 · Source date: not stated
- Source: Vested Finance and Aviera Advisors Amazon RSU pages (WEAK), https://vestedfinance.com/rsu-esops/blog/how-to-manage-amazon-rsus-tax-and-vesting-guide/ · Accessed: 2026-10-05 · Source date: not stated
- Evidence size: one secondary pattern repeated by several vendors; no primary source for Amazon or Google percentages.
- Signal: WEAK (Amazon and Google percentages); STRONG (that unequal annual tranches exist, via Rubrik).
- Changes: Back-loaded schedules push income, share count and concentration to years 3 and 4 and make early departure forfeit most of the grant; front-loaded schedules do the opposite, so a projection that assumes even tranches would misstate year-by-year income, shares and concentration. [INFERENCE]
- Assumption carried forward: Back-loaded schedules at the largest tech employers are present in client portfolios, so tranche percentages must be free-form. [ASSUMPTION: A-42]

## R-011 · How do PSUs, double-trigger RSUs and option expiry or post-termination windows affect a vesting schedule?
- Category: 1 (instruments)
- Decision it unblocks: Whether the MVP represents condition types other than time (performance, liquidity), a payout range (0 to 200% of target) and option expiry, or treats them as out of scope or as manual inputs.
- Finding: PSUs: performance period typically three years; payout expressed as a percentage of target with a cap of 200%; metric can be relative TSR (Equifax) or financial metrics with a TSR modifier (Martin Marietta). Shares vest or settle at the later of the third anniversary or the committee's certification date, so the share count is unknown until then. Double-trigger RSUs at private companies: S-1s state RSUs settle only after both a service condition and a liquidity event (IPO or sale); Klaviyo and Reddit state the liquidity condition is satisfied in connection with the offering, and Reddit says it will fund tax withholding on net settlement from IPO proceeds. The tax reason (§83 and §409A) was not confirmed from IRS text in this block; see Open questions. Options: standard term of 10 years and 90 days to exercise after termination for ISOs (three months under the ISO rules), with longer windows converting ISOs to NSOs; this is from secondary sources only (WEAK).
- Examples:
  - Equifax · Performance Share Award Agreement (TSR), exhibit to an SEC filing (accession 0000033185-21-000032, filed about 2021-03-31) · 3-year calendar performance period; payout vs S&P 500 TSR percentile: 75th or higher 200%, 62.5th 150%, 50th 100%, 25th 50%, below 25th 0%; settles on the later of the third grant anniversary or certification; capped at 100% if three-year TSR is negative.
  - Martin Marietta · DEF 14A · 2020 · performance period 2017-01-01 to 2019-12-31; EBITDA 67%, sales growth 33%, relative TSR modifier plus or minus 20%; payout range 0% to 200%; actual result 186% of target.
  - Klaviyo · S-1 · filed 2023-08-25 · 10,483,603 shares issuable on RSU settlement "upon the satisfaction of both a time and service condition and a liquidity event condition"; liquidity event expected in connection with the IPO.
  - Reddit · S-1 · filed 2024-02-22 · RSUs with service, performance and/or liquidity conditions; liquidity condition satisfied in connection with the offering; net settlement with tax withholding funded from proceeds. Rubrik (DEF 14A 2025-05-13) similarly reports a performance condition satisfied at IPO.
- Source: Equifax Performance Share Award Agreement exhibit, https://investor.equifax.com/sec-filings/all-sec-filings/content/0000033185-21-000032/exhibit103-20210331.htm · Accessed: 2026-10-05 · Source date: 2021 (exact filing date not confirmed)
- Source: Martin Marietta 2020 Proxy Statement p.55, https://mcdn.martinmarietta.com/Investors/Proxy/files/basic-html/page55.html · Accessed: 2026-10-05 · Source date: 2020
- Source: Klaviyo Form S-1, https://www.sec.gov/Archives/edgar/data/1835830/000162828023030618/klaviyoincs-1.htm · Accessed: 2026-10-05 · Source date: 2023-08-25
- Source: Reddit Form S-1, https://www.sec.gov/Archives/edgar/data/1713445/000162828024006294/reddits-1q423.htm · Accessed: 2026-10-05 · Source date: 2024-02-22
- Source: MyStockOptions, post-termination exercise, https://www.mystockoptions.com/content/how-much-time-do-i-have-for-exercising-vested-stock-options-after-my-employment-ends · Accessed: 2026-10-05 · Source date: not stated (WEAK)
- Source: Eqvista, post-termination exercise window, https://eqvista.com/post-termination-option-exercise-window/ · Accessed: 2026-10-05 · Source date: not stated (WEAK)
- Evidence size: PSUs two filings agree; double-trigger several S-1s agree; options one to two vendors.
- Signal: STRONG (PSU structure, double-trigger structure); WEAK (option post-termination windows).
- Changes: PSUs: future shares are a range (0 to 2x target) resolved only at certification, so income and concentration become scenarios, not a single number. Double-trigger: before the liquidity event, no shares and no income are realised even if the time condition is met; at the event, many tranches vest at once, creating a one-time income and tax event and a concentration step with the shares often locked up [INFERENCE on lock-up; not found in this block]. Options: a clock to expiry and a shorter clock after leaving the employer limit the time in which liquidity can be created.
- Assumption carried forward: Double-trigger RSU holders in advisor client lists are mainly pre-IPO private-company employees, so the liquidity condition is a pending event with no date. [ASSUMPTION: A-43]

## R-012 · How do advisor planning tools (RightCapital, eMoney, MoneyGuide) handle equity compensation?
- Category: 4 advisor practice
- Decision it unblocks: Which grant fields the product must capture, and which outputs (projection, tax, concentration) an advisor expects from a stock-comp module.
- Finding: RightCapital has a dedicated Stock Plans module. It captures grant type (ISO, NQO, RS, RSU), vesting schedule, strike price and expiration date. It projects vested and unvested shares by year, yearly taxes paid (with AMT for ISOs), and has a "Stock Plan Percentage of Portfolio" chart. Only vested but unexercised stock enters current net worth; grants vest, exercise and liquidate over time per the entered data. eMoney captures, per grant: grant date and number, option type (non-qualified or incentive), shares granted, exercise price, exercise discount, FMV, expiration date, shares sold, first vest date, vest frequency, vest periods, plus a Lots tab and an exercise/sell strategy tab. The eMoney page lists options only (RSU not shown in the fetched page). For MoneyGuide (Envestnet): not found in vendor docs.
- Source: Stock Plans - Grant Type Overview (RightCapital Help), https://help.rightcapital.com/knowledge-base/profile/net-worth/stock-plans-overview · Accessed: 2026-10-05 · Source date: not shown
- Source: stock plans module (RightCapital Help), https://help.rightcapital.com/knowledge-base/more-menu/stock-plans-module · Accessed: 2026-10-05 · Source date: not shown
- Source: Entering stock options into eMoney (eMoney blog), https://blog.emoneyadvisor.com/best-practices/entering-stock-options-into-emoney/ · Accessed: 2026-10-05 · Source date: not shown (page images dated Oct 2020, so likely 2020)
- Evidence size: two vendors (RightCapital strong, eMoney partial); MoneyGuide not found
- Signal: WEAK for the whole question (MoneyGuide missing, eMoney page may be 2020), STRONG for the RightCapital field list
- Changes: The grant field set (type, grant date, shares, strike, vest schedule, expiry) is the industry baseline and matches what a questionnaire step can ask. Concentration in these tools is "stock plan as % of investment portfolio", not % of net worth including salary dependence. [INFERENCE: from the RightCapital and eMoney help pages]
- Assumption carried forward: how MoneyGuide handles equity compensation is unknown [ASSUMPTION: A-44].
- Note: advisor-side gap evidence is vendor marketing only (Grantd, "Equity compensation needs to evolve beyond spreadsheets", https://www.grantdequity.com/articles/equity-compensation-needs-to-evolve-beyond-spreadsheets-heres-why, no date shown): it claims planning tools "lack integrated equity compensation features" and that advisors use spreadsheets. Treated as WEAK, an interested party. Specialist tools named in search results (not opened): EquityNav, Net Worth Strategies "Stockopter", Grantd, Worthy, myStockOptions.com Pro.

## R-013 · Can advisors or aggregators (Plaid, Yodlee) pull unvested grants from stock-plan platforms?
- Category: 4 advisor practice
- Decision it unblocks: Whether "account aggregation" as a data source can feed stock compensation, or only questionnaire and upload can.
- Finding: Plaid Investments returns holdings (quantity, cost basis, price), securities and up to 24 months of transactions. Holdings carry `vested_quantity` ("total quantity of vested assets held, as reported by the financial institution. Vested assets are only associated with equities") and `vested_value`. The docs do not say unvested grants or stock-plan award lists are returned. Plaid names Fidelity and Charles Schwab as institutions with access rules. Plaid does not list Carta, Shareworks, Equity Edge or Fidelity Stock Plan Services as sources in what was fetched. Yodlee: no equity-compensation or unvested-grant mention found.
- Source: Plaid Investments API reference, https://plaid.com/docs/api/products/investments/ · Accessed: 2026-10-05 · Source date: not shown
- Source: Plaid Investments overview, https://plaid.com/docs/investments/ · Accessed: 2026-10-05 · Source date: not shown
- Evidence size: one vendor (Plaid), absence of evidence for Yodlee, Carta, Fidelity SPS, Schwab EAC, E*Trade
- Signal: WEAK (absence of documentation is not proof of absence)
- Changes: Do not assume aggregation delivers unvested grants. Plan for the questionnaire and document upload (grant agreement, award statement) as the main route for unvested equity; aggregation covers only vested shares already in a brokerage account. [INFERENCE: from Plaid field docs]
- Assumption carried forward: Aggregators do not return unvested awards from Carta, Shareworks, Fidelity SPS, Schwab EAC or E*Trade Equity Edge. [ASSUMPTION: A-45]

## R-014 · What guidance exists on a concentration threshold and on double exposure to the employer?
- Category: 3 financial-health effect
- Decision it unblocks: Whether the existing "concentration in the largest position" check can be reused with a threshold, and whether employer-as-payer needs a separate flag.
- Finding: No regulatory threshold for single-stock or employer-stock concentration was found. FINRA (Aug 11, 2023): "Some experts recommend investing no more than 10 percent of total investment assets in a single stock, including stock of your company—and that could be too high"; FINRA says it cannot give that sort of advice. T. Rowe Price (dated Aug 2026 per fetch): above 5% of a portfolio is "worth addressing", above 10% "typically warrant more immediate planning". Search-result snippets from other firms quote 10-20%, 10-15%, 10-30% of portfolio and 25-30% of net worth; these were not fetched and conflict, so they are not usable as a single number. All numbers are rules of thumb, not rules. Double exposure: FINRA: "In the event your company falters, not only might your investments tumble, but you might also find yourself out of work at the same time."
- Source: Love Your Company Stock? Here's What to Know (FINRA), https://www.finra.org/investors/insights/love-your-company-stock-what-to-know · Accessed: 2026-10-05 · Source date: 2023-08-11
- Source: Concentrated company stock (T. Rowe Price), https://www.troweprice.com/en/us/insights/concentrated-company-stock-reduce-concentration-risk · Accessed: 2026-10-05 · Source date: August 2026 (as returned by fetch)
- Evidence size: one regulator-affiliated primary (FINRA) plus one large firm; others are weak snippets
- Signal: STRONG that the qualitative double-exposure risk is official; WEAK for any single numeric threshold
- Changes: A threshold in the score is a product choice, not a regulatory one, and must be labelled a rule of thumb (10% is the most cited; FINRA's own caveat applies). Employer stock is exposed through income as well as wealth, so unvested grants and the employer link cannot be seen by a single-largest-position check alone. [INFERENCE: from FINRA and T. Rowe Price text]
- Assumption carried forward: 10% of investable assets as the default flag level; denominator (portfolio vs net worth) is undecided and sources differ. [ASSUMPTION: A-46]
- Note: not found: Investor.gov concentration page (HTTP 403), SEC bulletin, CFP Board, Morgan Stanley, Fidelity, Schwab, J.P. Morgan primary pages with a threshold.

## R-015 · How common are RSUs, options and ESPPs among US employees and high earners, and what is the trend?
- Category: 5 market size
- Decision it unblocks: Which equity types to support first and how large the affected advisor-client segment is.
- Finding: No current primary data was retrieved. Older figures (BLS National Compensation Survey 2003, NCEO General Social Survey 2006 and 2010) and recent survey figures (Morgan Stanley at Work 2022, NCEO) appeared only in search snippets whose pages could not be opened, so none is used. Carta describes, without figures, that companies often move from stock options to RSUs as they grow (search snippet).
- Source: none opened. Candidates: BLS, https://www.bls.gov/opub/mlr/cwc/stock-options-national-compensation-survey-update.pdf · NCEO, https://nceo.org/blog/employee-ownership-2010-general-social-survey · Morgan Stanley at Work, https://www.businesswire.com/news/home/20220203005312/en · Accessed: 2026-10-05
- Evidence size: none read
- Signal: WEAK
- Changes: The order of types cannot be set from prevalence data; it has to rest on other criteria (fit with the platform, modelling effort, advisor tools' coverage). [INFERENCE]
- Assumption carried forward: current share of RSUs, options and ESPP among US high earners is unknown [ASSUMPTION: A-25].

## R-016 · Which equity award types do US companies grant today?
- Category: 5 (market size)
- Decision it unblocks: which types the MVP supports first (complements R-015, which found no household-level data).
- Finding: In the NASPP and Deloitte Consulting 2024 Equity Incentives Design Survey, "99% of the responding companies now award full-value awards"; "95% award RSUs" and "just 14% grant restricted stock (down from 44% back in 2013)"; performance-based awards are granted by "91% of the companies"; "only 41% of the surveyed companies grant traditional time-vested stock options" (down from 47% in the 2021 edition, per search summary). ESPP: an earlier edition of the same survey (2020) reported that 52% of respondents offer an ESPP, 67% of technology companies and 25% of manufacturing companies (search summary only; the NCEO pages that report it returned 404).
- Source: myStockOptions.com, "How does your stock plan compare? Part 1" (reporting the NASPP/Deloitte 2024 survey), https://www.mystockoptions.com/articles/how-does-your-stock-plan-compare-part-1 · Accessed: 2026-10-05 · Source date: undated article; survey 2024
- Source: NCEO blog, "NASPP Survey Shows ESPPs Somewhat More Conservative", https://nceo.org/blog/naspp-survey-shows-espps-somewhat-more-conservative · Accessed: 2026-10-05 (404; figures from search summary) · Source date: survey 2020
- Evidence size: one industry survey reported by a secondary source; survey report itself not read; respondent count and company mix not stated
- Signal: WEAK for exact figures (secondary report of a survey); consistent in direction with V04 in `discovery/voices.md` (advisors see more RSUs, fewer options)
- Changes: RSUs (and performance-based units) are granted by almost every responding company, options by a minority and falling, ESPP by about half and more often in technology. This is prevalence among companies, not among advisors' client households. [INFERENCE]
- Assumption carried forward: respondents are mostly public companies, so private-company practice (options more common) is under-represented [ASSUMPTION: A-47].

## R-017 · How is private-company stock valued for employees?
- Category: 2 (tax and regulation)
- Decision it unblocks: whether private-company equity can carry a value in the analysis, and which one.
- Finding: For stock "not readily tradable on an established securities market", Treasury Regulation §1.409A-1(b)(5)(iv)(B) requires a reasonable valuation method considering, among other factors, the company's assets, "the present value of anticipated future cash-flows", comparable companies, "recent arm's length transactions" and "discounts for lack of marketability". A valuation by an independent appraisal "as of a date that is no more than 12 months before the relevant transaction" is presumed reasonable, rebuttable only if "grossly unreasonable". This is the "409A valuation" private companies use to set option strike prices. Secondary sources add that common stock is valued below preferred stock, often far below at early stages (WEAK, vendor pages).
- Source: 26 CFR §1.409A-1 (Cornell LII), https://www.law.cornell.edu/cfr/text/26/1.409A-1 · Accessed: 2026-10-05 · Source date: current regulation
- Source: Eqvista, "409a Valuation For Employees", https://eqvista.com/409a-valuation/409a-valuation-for-employees/ · Accessed: 2026-10-05 · Source date: undated (search summary)
- Evidence size: primary rule (regulation); one vendor for the common vs preferred gap
- Signal: STRONG for the rule; WEAK for typical discounts
- Changes: a private-company share has a tax value (the latest 409A FMV, up to 12 months old) but no market price and no liquidity; it is a different number from what the employee could sell it for. A product can record that value and its date, but cannot treat it like a listed price. [INFERENCE]
- Assumption carried forward: clients or advisors can obtain the latest 409A value from the employer or the grant documents [ASSUMPTION: A-48].

## R-018 · What are the employee Social Security and Medicare rates and the Social Security wage base for tax year 2026?
- Category: 2 (tax and regulation)
- Decision it unblocks: the Social Security and Medicare part of the tax owed on each vest (AC-C-03, AC-C-14) and the FICA constants of the simulator.
- Finding: for 2026 the employee Social Security rate is 6.2% on wages up to $184,500; the employee Medicare rate is 1.45% with no wage base. Pub 15 (2026): "The social security wage base limit is $184,500." "The rate of social security tax on taxable wages is 6.2% each for the employer and employee. The Medicare tax rate is 1.45% each for the employee and employer, unchanged from 2025." "There is no wage base limit for Medicare tax; all covered wages are subject to Medicare tax." Topic 751: "For earnings in 2026, this base limit is $184,500."
- Source: IRS Publication 15 (2026), (Circular E) Employer's Tax Guide, https://www.irs.gov/publications/p15 · Accessed: 2026-10-06 · Source date: tax year 2026 (dated Dec 15, 2025)
- Source: IRS Topic no. 751, Social Security and Medicare withholding rates, https://www.irs.gov/taxtopics/tc751 · Accessed: 2026-10-06 · Source date: tax year 2026 (Tier 2, informational)
- Evidence size: primary rule; two IRS pages agree (ssa.gov returned HTTP 403 and was not read)
- Signal: STRONG
- Changes: the simulator's wage base was a placeholder ($180,000); 2026 is $184,500. The wage base changes every year, so each figure carries its tax year.
- Assumption carried forward: none

## R-019 · Additional Medicare Tax: rate, who withholds it, and the thresholds owed by filing status (tax year 2026)
- Category: 2 (tax and regulation)
- Decision it unblocks: whether the FICA line of AC-C-14 includes the 0.9% Additional Medicare Tax, and whether FICA withheld at vest can differ from FICA owed.
- Finding: the employer withholds 0.9% on wages it pays to an employee above $200,000 in a calendar year, whatever the filing status. The tax owed on the return starts above $250,000 (married filing jointly), $125,000 (married filing separately) or $200,000 (single, head of household, qualifying surviving spouse), on combined wages, so the amount withheld can be more or less than the amount owed; Form 8959 reconciles them. Pub 15 (2026): "you must withhold a 0.9% Additional Medicare Tax from wages you pay to an employee in excess of $200,000 in a calendar year". Topic 751: "Employers are responsible for withholding the 0.9% Additional Medicare tax on an individual's wages paid in excess of $200,000 in a calendar year, without regard to filing status." IRS Q&A: an individual "may owe more than the amount withheld by the employer, depending on the individual's filing status, wages, compensation, and self-employment income."
- Source: IRS Publication 15 (2026), https://www.irs.gov/publications/p15 · Accessed: 2026-10-06 · Source date: tax year 2026
- Source: IRS Topic no. 751, https://www.irs.gov/taxtopics/tc751 · Accessed: 2026-10-06 · Source date: tax year 2026 (Tier 2, informational)
- Source: IRS, Questions and Answers for the Additional Medicare Tax, https://www.irs.gov/businesses/small-businesses-self-employed/questions-and-answers-for-the-additional-medicare-tax · Accessed: 2026-10-06 · Source date: undated (Tier 2, not binding)
- Source: IRS, Instructions for Form 8959, https://www.irs.gov/instructions/i8959 · Accessed: 2026-10-06 · Source date: edition year not confirmed; the thresholds are fixed in the statute, not indexed
- Evidence size: primary rule; four IRS pages agree (Q&A and Form 8959 text read through a summarising fetch tool)
- Signal: STRONG
- Changes: FICA on a vest for a person above $200,000 of wages has a third part (0.9%); the simulator had none. Withheld and owed use different thresholds.
- Assumption carried forward: each person has one employer in the year, so the employer's $200,000 test reads that person's wages [ASSUMPTION: A-56].

## R-020 · How do Social Security and Medicare apply to vest income, above the wage base and with two employers? (tax year 2026)
- Category: 2 (tax and regulation)
- Decision it unblocks: whether AC-C-14 can compute FICA on each vest as the full rates up to the wage base, and what happens with two employers.
- Finding: supplemental wages are subject to Social Security and Medicare whatever the income tax withholding method. The employer stops the employee's Social Security once the year's wages reach the base. With more than one employer, each withholds up to the base, and the excess is a credit on the income tax return, so Social Security owed is capped per person. Pub 15 (2026): "Regardless of the method you use to withhold income tax on supplemental wages, they're subject to social security, Medicare, and FUTA taxes." "Stop collecting the employee share of social security tax when their wages and tips for tax year 2026 reach $184,500". Topic 608: with more than one employer and wages over the base, the tax withheld "may have exceeded the maximum amount due", and "you may be able to claim the excess as a credit against your income tax on your income tax return." That RSU vest income is wages for FICA comes from R-001.
- Source: IRS Publication 15 (2026), https://www.irs.gov/publications/p15 · Accessed: 2026-10-06 · Source date: tax year 2026
- Source: IRS Topic no. 608, Excess Social Security and RRTA tax withheld, https://www.irs.gov/taxtopics/tc608 · Accessed: 2026-10-06 · Source date: undated (Tier 2, informational)
- Evidence size: primary rule plus one IRS informational page; IRC §3101, §3102(f) and Treas. Reg. §31.3121(v)(2)-1 not read
- Signal: STRONG
- Changes: a vest before the person's wages reach the base pays 6.2% Social Security; a vest after it pays none, so tranche order within a year matters. FICA withheld equals FICA owed for one employer under the thresholds [INFERENCE: from the Pub 15 quotes; no IRS sentence says so]; it differs with two employers above the base and through the Additional Medicare Tax (R-019).
- Assumption carried forward: FICA withheld at vest equals FICA owed except in the listed cases [ASSUMPTION: A-53]; each person's reported salary is the vesting employer's wages for the year [ASSUMPTION: A-56].

## R-021 · What are the 2026 federal brackets and standard deductions?
- Category: 2 (tax and regulation)
- Decision it unblocks: replaces the SIMULATED brackets and deductions of the simulator's tax engine, used for the tax owed on each vest (AC-C-03) and the gap (AC-C-10).
- Finding: for taxable years beginning in 2026, Rev. Proc. 2025-32 sets the tables below; rates stay 10/12/22/24/32/35/37 (P.L. 119-21 "permanently extended the individual tax rates enacted in P.L. 115-97", Pub 15 (2026)). Top of each bracket, on taxable income (after the deduction):
  - Married filing jointly (Table 1): 10% to $24,800; 12% to $100,800; 22% to $211,400; 24% to $403,550; 32% to $512,450; 35% to $768,700; 37% above.
  - Single (Table 3): 10% to $12,400; 12% to $50,400; 22% to $105,700; 24% to $201,775; 32% to $256,225; 35% to $640,600; 37% above.
  - Head of household (Table 2): 10% to $17,700; 12% to $67,450; 22% to $105,700; 24% to $201,750; 32% to $256,200; 35% to $640,600; 37% above.
  - Standard deduction (section 4.14(1)): joint $32,200; head of household $24,150; single and married filing separately $16,100.
  Single is not half of joint at the top: half of the joint 35% top is $384,350, the single top is $640,600.
- Source: Rev. Proc. 2025-32, https://www.irs.gov/pub/irs-drop/rp-25-32.pdf · Accessed: 2026-10-06 · Source date: 2025-10-09 (taxable years beginning in 2026)
- Source: IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026", https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill · Accessed: 2026-10-06 · Source date: 2025-10-09 (Tier 2)
- Evidence size: primary rule; the newsroom agrees on every number
- Signal: STRONG
- Changes: the engine uses the real 2026 tables, separate for joint and single; head of household is a third schedule the model does not have.
- Assumption carried forward: tax figures for vests in later years use the 2026 rules, labelled "today's tax rules" (AC-C-04) [ASSUMPTION: A-57].

## R-022 · How does federal supplemental wage withholding work for a vest in 2026: the $1 million scope, the flat 22% conditions, other rates?
- Category: 2 (tax and regulation)
- Decision it unblocks: AC-C-05, AC-C-06, AC-C-10, EC-C-02 and EC-C-10 (the withholding estimate, its label and its scope).
- Finding: (a) The $1 million threshold counts all supplemental wages paid to one employee in the calendar year, including payments from all businesses under common control; it is not limited to vests. The excess is withheld at 37% without regard to Form W-4. (b) The flat 22% is optional and needs income tax withheld from the employee's regular wages in the current or preceding calendar year and supplemental wages identified separately; otherwise the employer aggregates them with regular wages (method 1b). (c) Under the flat method no other percentage is allowed; a different amount comes only from the aggregate method, which follows the Form W-4. Pub 15 (2026), section 7: "If a supplemental wage payment, together with other supplemental wage payments made to the employee during the calendar year, exceeds $1 million, the excess is subject to withholding at 37% (or the highest rate of income tax for the year). Withhold using the 37% rate without regard to the employee's Form W-4. In determining supplemental wages paid to the employee during the year, include payments from all businesses under common control." "If you withheld income tax from an employee's regular wages in the current or immediately preceding calendar year, you can use one of the following methods for the supplemental wages. a. Withhold a flat 22% (no other percentage allowed)." "If you didn't withhold income tax from the employee's regular wages in the current or immediately preceding calendar year, use method 1b."
- Source: IRS Publication 15 (2026), section 7, https://www.irs.gov/publications/p15 · Accessed: 2026-10-06 · Source date: tax year 2026 (dated Dec 15, 2025)
- Source: 26 CFR §31.3402(g)-1, https://www.law.cornell.edu/cfr/text/26/31.3402(g)-1 · Accessed: 2026-10-06 · Source date: current regulation (read through a summarising fetch tool; names an older rate, Pub 15 gives the 2026 rate)
- Evidence size: primary rule (publication and regulation agree)
- Signal: STRONG for (a), (b) and (c); WEAK for how a single vest could be withheld above 22% in practice (not described in the sources read)
- Changes: the 22% and 37% rates and the per-employer scope of AC-C-05 hold, but the $1 million counts all supplemental pay and the controlled group, not only vests. The 22% is an assumption about the employer's method.
- Assumption carried forward: the employer uses the flat 22% method for each vest below $1 million [ASSUMPTION: A-40]; the platform does not hold other supplemental pay or the controlled group, so the $1 million test counts vests only [ASSUMPTION: A-55].

## R-023 · Does holding back or selling shares at vest change the withholding rules?
- Category: 2 (tax and regulation)
- Decision it unblocks: AC-C-05 and AC-C-10 (whether the estimate holds whichever way the tax is funded).
- Finding: stock paid as wages is subject to income tax withholding, and the employer pays the tax in money. No IRS source read names net share settlement or sell to cover, and none gives a different rate for them. 26 CFR §31.3402(a)-1(c): an employer is required to withhold "notwithstanding the wages are paid in something other than money (for example, wages paid in stocks or bonds". Chief Counsel memo 202327014: the employer must "pay over the tax in money". Information Letter 2024-0010: "equity compensation such as restricted stock and RSUs are wages subject to federal income tax withholding."
- Source: 26 CFR §31.3402(a)-1, https://www.law.cornell.edu/cfr/text/26/31.3402(a)-1 · Accessed: 2026-10-06 · Source date: current regulation (read through a summarising fetch tool)
- Source: IRS Chief Counsel memorandum 202327014, https://www.irs.gov/pub/irs-wd/202327014.pdf · Accessed: 2026-10-06 · Source date: 2023-04-04 (Tier 2, not binding)
- Source: IRS Information Letter 2024-0010, https://www.irs.gov/pub/irs-wd/24-0010.pdf · Accessed: 2026-10-06 · Source date: 2024-06-18 (Tier 2, not binding)
- Evidence size: one regulation plus two IRS documents agree on withholding in money; nothing primary on share withholding by name
- Signal: STRONG that stock wages are withheld; WEAK that the share-withholding amount equals the supplemental amount (inference)
- Changes: none to the formula; the gap stays federal tax owed minus withholding whichever way the employer funds it.
- Assumption carried forward: the amount withheld by holding back or selling shares equals the supplemental-rate amount [ASSUMPTION: A-51].

## R-024 · What is the cost basis and holding-period start of shares received when an RSU settles?
- Category: 2 (tax and regulation)
- Decision it unblocks: AC-A-03 and AC-B-14 (cost basis of a flagged position and of shares kept per tranche, Next).
- Finding: basis is the amount paid plus the amount included in income as compensation; the holding period starts when the property becomes substantially vested. For an RSU, property exists only at delivery: before it there is only an unfunded promise, which is not property (§1.83-3(e)). Pub 551: "If you receive property for services, include the property's FMV in income. The amount you include in income becomes your basis." 26 U.S.C. §83(f): the holding period includes "only the period beginning at the first time his rights in such property are transferable or are not subject to a substantial risk of forfeiture". 26 CFR §1.83-3(e): property excludes "an unfunded and unsecured promise to pay money or property in the future." Pub 525 (2025), Restricted Property, states the same basis and holding-period rule (two reads of the page returned slightly different wording; the section is cited, not a sentence).
- Source: IRS Publication 551, Basis of Assets, https://www.irs.gov/publications/p551 · Accessed: 2026-10-06 · Source date: current edition (year not shown)
- Source: IRS Publication 525 (2025), https://www.irs.gov/publications/p525 · Accessed: 2026-10-06 · Source date: tax year 2025
- Source: 26 U.S.C. §83, https://www.law.cornell.edu/uscode/text/26/83 · Accessed: 2026-10-06 · Source date: current code
- Source: 26 CFR §1.83-3, https://www.law.cornell.edu/cfr/text/26/1.83-3 · Accessed: 2026-10-06 · Source date: current regulation
- Evidence size: statute plus two IRS publications agree
- Signal: STRONG for restricted property; applying it to RSU shares is an inference (no IRS text names RSU shares in the basis sentence)
- Changes: cost basis and holding period are Next; concentration reads market value, so no first-release figure changes.
- Assumption carried forward: RSU shares kept take a basis equal to the income included [ASSUMPTION: A-49]; the advisor can read the value at vest from the W-2 or the plan statement [ASSUMPTION: A-58].

## R-025 · Are dividend equivalents paid on unvested RSUs wages?
- Category: 2 (tax and regulation)
- Decision it unblocks: whether the vest tax of F-C may leave dividend equivalents out.
- Finding: no IRS or code text found names dividend equivalents on RSUs. The closest rules: income from restricted property received by the employee is additional compensation in the year received (§1.83-1(a)(1)); wages are "all remuneration" for services, for withholding (§3401(a)) and FICA (§3121(a)); RSUs are wages (Information Letter 2024-0010). So a cash dividend equivalent paid to an employee is wages when paid [INFERENCE]. Plan terms differ: one sample pays them whether or not the unit has vested, another credits them (R-002). 26 CFR §1.83-1(a)(1): "any income from such property received by the employee ... constitutes additional compensation and shall be included in the gross income of such employee ... for the taxable year in which such income is received". Rev. Rul. 2012-19 treats dividend equivalents on RSUs as compensation for the §162(m) deduction test only.
- Source: 26 CFR §1.83-1, https://www.law.cornell.edu/cfr/text/26/1.83-1 · Accessed: 2026-10-06 · Source date: current regulation
- Source: 26 U.S.C. §3401, https://www.law.cornell.edu/uscode/text/26/3401 · Accessed: 2026-10-06 · Source date: current code
- Source: 26 U.S.C. §3121, https://www.law.cornell.edu/uscode/text/26/3121 · Accessed: 2026-10-06 · Source date: current code (subsection (v) not read on this page)
- Source: IRS Information Letter 2024-0010, https://www.irs.gov/pub/irs-wd/24-0010.pdf · Accessed: 2026-10-06 · Source date: 2024-06-18 (Tier 2, not binding)
- Source: Rev. Rul. 2012-19, https://www.irs.gov/pub/irs-drop/rr-12-19.pdf · Accessed: 2026-10-06 · Source date: 2012
- Evidence size: statute wage definitions plus the restricted-property rule; no direct text on RSU dividend equivalents in three searches
- Signal: WEAK (inference for RSU dividend equivalents)
- Changes: where a plan pays dividend equivalents before vest, that cash is wages of the year paid, outside the tranche; leaving it out makes the year's tax owed slightly too low.
- Assumption carried forward: dividend equivalents are wages when paid and small against vest value, so the first release leaves them out [ASSUMPTION: A-50].

## R-026 · Is there a legal limit on the RSUs an employee can receive?
- Category: 2 (tax and regulation)
- Decision it unblocks: whether the grant form needs a validation cap like the ISO $100,000 rule (R-004) or the ESPP $25,000 rule (R-005).
- Finding: no statutory or regulatory limit on the number or value of RSUs per employee was found in §83 or the IRS texts read. §83 taxes what is transferred and sets no cap. §162(m) limits the employer's deduction for covered employees above $1,000,000, not the employee's award: Rev. Rul. 2012-19: "no deduction is allowed for applicable employee remuneration with respect to any covered employee to the extent that the amount of the remuneration for the taxable year exceeds $1,000,000." (2012 wording; later changes to §162(m) not checked). Any cap comes from the plan document, a company term.
- Source: 26 U.S.C. §83, https://www.law.cornell.edu/uscode/text/26/83 · Accessed: 2026-10-06 · Source date: current code ((a) and (f) read)
- Source: Rev. Rul. 2012-19, https://www.irs.gov/pub/irs-drop/rr-12-19.pdf · Accessed: 2026-10-06 · Source date: 2012
- Evidence size: absence of a limit; no primary source states the absence
- Signal: WEAK (absence)
- Changes: no cap in the model; the intake accepts any grant size.
- Assumption carried forward: no legal cap on RSUs per employee; plan-level caps are company terms and are not modelled [ASSUMPTION: A-52].
