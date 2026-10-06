# 08 · Release notes · Stock compensation (pilot)

For advisors in firms that turn on "stock compensation". One note per release, in the order of `spec/00_index.md`. Written as they would ship; the product names and screens are those the client view shows [FACT: platform_map]; advisor screens were not seen (D-034). US tax figures: R-001, R-008 (SC-01, SC-14, SC-17); PSU range: R-002, R-011 (SC-05). 2026-10-05.

## Release 1 · Employer stock counted as one position

**What's new**
- In a client's accounts, you can mark a position as employer stock, say whose employer it is and whether it is their current employer.
- The concentration check now counts employer stock held across all accounts as one position.
- View more shows both readings: the largest position and the employer stock, and whether your client's pay comes from the same company.
- The report adds a line with the employer stock held, and a "We should look into" item when it is the largest holding.

**Why a score may change**
- Only households with a position marked as employer stock. If their employer stock, summed across accounts, is larger than their largest position today, the concentration check reads that larger figure and the score can go down. Nothing that the check reads today is removed.

**What stays the same**
- Households without employer stock: same questionnaire, analysis and score.

## Release 2 · Grants, tax at vest, client questions and plan statements

One release (D-080): the client reports stock pay, you complete it from the plan statement or by hand, and the analysis shows tax at vest and the vests beside the goals.

**Grants and their vests**
- Add a client's RSU or PSU grant in advisor mode or Data & Assumptions: enter the schedule as a pattern (for example, four years, quarterly, one-year cliff) and edit any tranche.
- PSUs keep their performance condition and payout range (0% to 200% of target unless you change it). Figures show the target value with the range beside it.
- Private-company grants are recorded and shown, "awaiting a liquidity event", and are not counted in the figures.
- The analysis lists upcoming vests with their value at the price on the analysis date. No reminders are sent.

**Before you save**
- Saving a grant reprocesses the analysis and replaces any manual score adjustment. Finish your data edits before adjusting the score.

**Tax at vest**
- Each vest shows the tax the platform estimates on it (federal, Social Security and Medicare, state) and the gap after withholding.
- Federal withholding is estimated at the supplemental rate (22%, 37% above $1 million). Add the state withholding rate from the paystub or plan statement to see the full gap; without it, the gap is federal only and says so.
- The Liquidity check counts the gap of upcoming vests as a near-term commitment. View more says so.

**Dated cash for goals**
- Retirement & Goals lists the vests after estimated tax (and before tax), at the price on the analysis date, and which of them arrive before each goal. They are not counted as liquid before they arrive. The projection and every figure read from it (net worth at retirement, end of plan, the retirement shortfall and the saving needed) include each vest as wage income on its delivery date, labelled "includes future vests after estimated tax".

**Client questionnaire**
- Income has a new "Stock compensation" chip, with a helper line under employment income. The row works like every other income row: the employer, the owner, and an optional approximate amount per year. You complete the rest: ticker, type, vest dates, and whether the employment income already includes this year's vests.
- Their answers create a grant "pending detail", kept out of the figures, and an alert on the opportunity: "Stock pay: detail pending". Complete the grant to include it.

**Plan statements**
- Upload a client's plan statement in the grant editor, or with the opportunity's other documents. Proposed grants and tranches appear next to the document; nothing is counted until you confirm them.
- Clients can also upload their plan statement in the questionnaire's documents step, under "Investment & retirement accounts"; it arrives as a proposal for you to confirm.
- If the client already reported the grant in the questionnaire, confirming the statement completes that grant; no second grant is created.

**Why a score may change**
- Households with complete grants: the Liquidity check may count tax due on upcoming vests. Households with grants pending detail, private grants or proposed grants: no change.

**Existing clients**
- Nothing changes for an existing client until you add employer stock or a grant.

**What is not included yet**
- Vests are not turned into held shares automatically: when a tranche vests, record the shares kept as a position. Until you do, the shares from that vest are not counted anywhere in the analysis.
- ESPP purchases, stock options, RSA, SAR and phantom stock are not modelled; shares already held from them can be marked as employer stock.

## Next

- A 409A value for private-company grants, for information; cost basis on employer stock; shares kept at each vest.
