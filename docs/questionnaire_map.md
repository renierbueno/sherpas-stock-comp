# Questionnaire map

What the Sherpas client questionnaire ("Financial Health & Portfolio Questionnaire") asks, how it validates and branches, what it produces, and where stock compensation would fit. Our own words, from the questionnaire definition and one set of submitted answers read on 2026-10-04. Raw material stays in `captures/questionnaire/` (outside git). No endpoints, internal IDs or code field names.

## How it was captured, and what is missing

- The link we received opened on the end screen: that questionnaire had already been completed on 2026-09-21, before it reached us, by a test household that is not the demo household of the analysis. We did not fill in or submit anything. [FACT: captures/questionnaire/01-load, 02-opportunity]
- The page loads the full questionnaire definition (sections, questions, required fields, validation and display rules, default data) and the answers already submitted. This map is built from those two. [FACT: captures/questionnaire/02-opportunity]
- A fresh link from Sherpas (2026-10-05) was walked by Renier as a client, with screenshots of every step, and then submitted. On a second tab still open before submission, every step was walked again without submitting: screenshots, the app's own network requests (method, path and status only), what the page holds in memory, and the app's static code. See "Seen on screen, 2026-10-05" below. [FACT: captures/questionnaire/03-fresh]

## At a glance

- One template, typed as the Financial Health questionnaire: 17 questions, about 10 minutes, 8 sections plus a welcome page and an end page. Language English (US). [FACT: captures/questionnaire/02-opportunity]
- Guided, one question group per screen, with Continue enabled only when the group is valid. Progress is tracked per section, and the last page visited and answers are stored as the client goes, so a client can leave and come back. [FACT: template display rules; INFERENCE: from the stored progress per section, the last page visited and a version counter in the record]
- The same questionnaire runs in two modes: the client fills it from a link, or the advisor fills it on the client's behalf (the advisor sees a section menu and an "Exit and review later" button). [FACT: template display rules]
- Every money answer belongs to someone: the client, the co-client, or both. [FACT: captures/questionnaire/02-opportunity answers]

## Sections and questions

| # | Section | Questions (as worded, shortened) | Answer type and options | Required / validation | Branching |
|---|---|---|---|---|---|
| 0 | Welcome | "Get your Financial Health Score and take control"; "Take this quick 10-minute check…". | Button "Get your score". | None | Shown only to the client, not in advisor mode. |
| 1 | Personal information | What is your name? Do you have a co-client you would like to include? What is your date of birth? How many dependents are under your care? What is your zip code for tax purposes? | Text (first, last name) for client and co-client; checkbox "I don't want to include a co-client"; date per person; dependents 0, 1, 2, 3, 4, 5+; zip code (5 digits). | Names, birth dates, number of children and zip code required; co-client fields required unless excluded; birth dates and zip validated. | Co-client fields hidden when excluded. Choosing 1+ dependents opens one row per child (name, birth date). |
| 2 | Goals | At what age would you like to retire? How much do you plan to contribute per child for their college education? What other financial goals do you have? Tell us more about your goals. | Retirement age per person (or already retired); college amount per child (currency); goal picker; goal table (amount, year). | Retirement age validated for each person; college amount required when the household has a child of college-relevant age. | College question only when a child needs it; goal table only if goals were picked. |
| 3 | Income | What is your total annual income before taxes? Do you or your co-client own a business, including self-employment or freelance work? Do you have a traditional pension…? How much per year in retirement? Do you have any annuities for retirement income? How much annually in retirement? | One gross annual amount per person (stored as salary); yes/no business owner; yes/no pension, then amount and start age; yes/no annuity, then amount. | At least one valid income; pension and annuity amounts validated when "yes". | Pension and annuity amounts only after "yes". A per-firm setting replaces the income questions with a combined "benefit plan income" block (its fields were not visible). |
| 4 | Investments | Account and holdings block ("be sure you have your investment statements on hand"). What level of investment risk are you comfortable with? | Accounts, each with holder(s), institution, account type (for example Solo 401k) and positions picked from a security search (name, ticker, logo, market cap) with an amount. Risk slider per person, 10 to 90 in steps of 20. | Risk required for each person; in advisor mode every account needs holdings. | None |
| 5 | Expenses | How much do you spend on essentials (food, insurance, etc.)? Excludes debt payments and housing. | Currency amount with a cadence (per month). | Required. | None |
| 6 | Assets ("Real estate") | Do you own or rent your primary home? Do you own any other real estate property? Do you own any vehicles? Do you own any high-value assets such as jewelry, art or collectibles? | Own/rent, then home value, mortgage balance, rate and monthly payment, or rent; checkbox "I don't want to include any real estate"; per property: type (for example vacation home), value, mortgage; per vehicle: value, loan; other assets: value. | Each yes needs valid items; a financed asset needs its loan. | Follow-up fields only after "yes"; real estate questions skipped when excluded. |
| 7 | Liabilities ("Credit card debt") | Do you currently carry a balance on any of your credit cards? Do you have student loans, including any you're paying for a child? Do you have any other loan debt, such as a HELOC or a personal loan? | Yes/no, then per debt: balance, interest rate, monthly payment. | Each yes needs valid items. | Follow-up fields only after "yes". |
| 8 | Insurance | Do you have any life insurance? Do you have any umbrella policies? Do you have any other insurance policies? | Yes/no, then cover per person; yes/no umbrella, then cover; checkboxes for other policies, offered per home and vehicle already entered. | Cover validated when "yes". | Other policies list built from the assets entered in section 6. |
| end | Feedback / end screen | "Thank you for providing your information!" | Client: depending on the firm's settings and where the client came from, confirm email and mobile, view the score, book a meeting, or a "we will analyse your information" note. Advisor: "Submit and continue" or "Exit and review later". | | |

An optional "Additional Information" free-text box can close each section when the firm enables it. [FACT: template display rules]

## Seen on screen, 2026-10-05

The definition above is unchanged; these widgets render it differently from what the definition alone suggested. [FACT: captures/questionnaire/03-fresh]

- **Documents step, before Personal information:** "Let's start gathering your info", one drop zone and eight categories (Government ID, Tax returns, Investment & retirement accounts, Bank statements, Wills and trusts, Life insurance, Property & mortgage, Other). Uploaded files go to the opportunity's context, where the app classifies them and prefills data; the same context also takes meeting notes and CRM records.
- **Income:** one gross annual employment income per person, then two chip rows. "What other current income do you currently have right now?": Pension, Annuity, Rental property, Business, Side hustle, Royalty, Other income. "What future income do you expect?": Social Security, Pension, Annuity, Inheritance, Other income. Each click on a chip adds one row of that type (several per type are allowed). A current row has the type, a name, one owner and an amount with a frequency (default per type: Business per year, Royalty per quarter, the rest per month); a future row adds a start age; Inheritance is one-time. The pension and annuity yes/no questions of the definition do not show. No chip for stock pay, bonus or commission.
- **Social Security:** prefilled per adult (start age 67, a monthly amount), computed by the platform from the household's data each time Income opens; editing the amount marks it as no longer computed.
- **Investments:** one row per account (name, type, custodian, owner, balance). Accounts are filled by hand, by linking through Plaid, or by uploading a statement. Account types offered: Retirement (401k, 403b, 457b, IRA variants), Health Savings, Educational, Brokerage (brokerage, custodial UGMA and UTMA), Cash, Crypto; none for equity compensation. A holding is an instrument and a balance: no quantity, cost basis or purchase date. The instrument search lists stocks, ETFs and funds with ticker, name, logo, type and last price, and accepts a free-text instrument not in the list.
- **"Anything to add about…":** opens a chat panel per section.
- **Saving:** the app saves as the client goes, when data changes and on Continue.

[FACT for the whole table: captures/questionnaire/02-opportunity template]

## What one submission produces

The answers are stored as structured elements, already shaped like the analysis model in `data_model.md`:

| Answer | Stored as |
|---|---|
| Name, birth date, zip code, co-client, children | Household members with roles (head, spouse, child) and birth dates |
| Retirement age, college amount, other goals | Goals with type, people, amount and years |
| Gross annual income | One salary income per person, current |
| (automatic) | One future Social Security income per adult, starting at 67, created without a question |
| Pension, annuity | Future income with amount, frequency and start age |
| Accounts and holdings | Accounts with holders, institution, type and positions (security plus amount) |
| Risk | A risk score per person |
| Expenses | One essentials amount with its cadence |
| Home, other property, vehicles, other assets | Assets with type, value and owners, each linked to its loan |
| Credit card, student loan, other debt, mortgages, vehicle loans | Liabilities with type, balance, rate, monthly payment and owners |
| Insurance | Policies with type (life, umbrella, home, auto), cover, people and the asset they protect |

[FACT: captures/questionnaire/02-opportunity answers]

## From questionnaire to analysis

- The submission we read is marked completed, but its client has no profile and no analysis, and the system raised an "opportunity stalled, send the questionnaire" alert. [FACT: captures/questionnaire/02-opportunity]
- The end screen gives the advisor a "Submit and continue" step that closes the questionnaire and, once closed, leads to the analysis. [FACT: template display rules]
- So completion by the client and the analysis are two steps: the advisor reviews and submits, then a processing step turns the answers into a versioned client profile (the demo profile reports "questionnaire" as its source) and the analysis. [INFERENCE: from the two facts above and the profile metadata in captures/client/01-financial-health] [ASSUMPTION: A-18]

## Where stock compensation would fit

First reading, for F2 and F3; every line is an inference until research and Sherpas confirm it.

The lines below read stock compensation as RSUs only. Which types, lifecycle states and vesting models are supported is open: researched in F2, decided in F3 (`02_open_questions.md`).

- **Today the questionnaire has no question for equity compensation, bonus or variable pay.** Income is one gross annual number per person, stored as salary. [FACT: template]
- **The platform's own type lists already name stock compensation**, though no screen of the questionnaire uses them: an asset category for stock compensation with RSU, non-qualified option, incentive option and ESPP sub-types, and an income category for stock compensation with RSU, ESPP and option inflows, beside bonuses and commissions. No field for grants, vesting or strike price was found in the questionnaire's code. Whether the advisor side or the analysis uses them is asked in `02_open_questions.md`. [FACT: captures/questionnaire/03-fresh, app type lists read 2026-10-05]
- **Income chips are the native pattern for an extra income type**: a stock-pay chip would follow how pension, business or royalty are added today (flow-review GAP-25). [FACT: captures/questionnaire/03-fresh]
- **Vested employer shares** can already be entered as a position in an account (the security search covers direct stocks). What is lost is that the position is the employer's stock, and its cost basis. [INFERENCE: from the holdings block and the submitted answers]
- **Grants not yet delivered as shares** (unvested RSUs, unexercised options, ESPP in progress) have no native place: they are not an account position and not current salary. Only workarounds exist: a generic future income (the model already holds future incomes with a start age and an "other" income type), which loses shares, price and schedule, or the optional free-text box, which does not reach the analysis. [INFERENCE: from the sections above and the submitted answers]
- **Natural home: the Income section**, right after the gross income question, as a yes/no follow-up ("Does part of your pay come in company stock?") that opens grant rows only for those who say yes. This keeps the questionnaire short for everyone else, uses the same pattern as pension and annuity, and avoids double counting by asking whether the gross figure already includes vest income. [INFERENCE: from the branching pattern in sections 3, 6 and 7]
- **Ownership** fits as is: every element already belongs to the client, the co-client or both, and an award belongs to one person. [FACT: answers model]
- **Advisor mode** means the advisor can complete the equity part from the client's statements, which matters if clients do not know their grant details. [INFERENCE: from the two modes]
