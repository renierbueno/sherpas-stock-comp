# 08 · Release notes · Stock compensation (pilot)

For advisors in the pilot firms, where Sherpas turns on "stock compensation" (D-111). One note per release, in the order of `spec/00_index.md`. Written as they would ship; the product names and screens are those the client view shows [FACT: platform_map]; advisor screens were not seen (D-034). Each line that states a US tax rule cites its row in `12_stock_comp_rules.md`. 2026-10-06.

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

The client reports stock pay, you complete it from the plan statement or by hand, and the analysis shows tax at vest and includes the vests in the goals and the projection.

**Grants and their vests**
- Add a client's RSU or PSU grant in advisor mode or Data & Assumptions: enter the schedule as a pattern (for example, four years, quarterly, one-year cliff) and edit any tranche (SC-06).
- Each tranche has a vest date and a delivery date. The delivery date is prefilled with the vest date; change it when the plan delivers the shares later, which is common for PSUs and for vests late in the year. Income tax follows the delivery year; Social Security and Medicare follow the vest year (SC-02, SC-03).
- PSUs keep their performance condition and payout range (0% to 200% of target unless you change it). Figures show the target value with the range beside it (SC-05).
- Private-company grants are recorded and shown, "awaiting a liquidity event", and are not counted in the figures (SC-08).
- The analysis lists upcoming vests with their value at the price on the analysis date. No reminders are sent.

**Confirming a grant**
- The review shows one line every time: "Salary on file should exclude company stock. If it includes stock that vested, edit it." Salaries typed from a W-2 include vests (SC-01) and would count them twice.
- Confirming a grant marks every held position with that ticker as employer stock, whether you typed it, it came from a linked account or from an uploaded account statement. The person is the grant owner and current employer is set to yes; you can edit both, and Undo reverses the marking.

**Before you save**
- Saving a grant reprocesses the analysis and replaces any manual score adjustment. Finish your data edits before adjusting the score.

**Tax at vest**
- Each vest shows the income tax the platform estimates on it (federal and state) and the gap after withholding (SC-17).
- Federal withholding is estimated at 22%, and at 37% above $1 million of vests from one employer in the delivery year (SC-14). Bonuses are not counted toward the $1 million, so for a client whose bonuses push supplemental pay past $1 million the gap may read high (SC-15).
- State withholding is optional: add the rate from the paystub or plan statement to see the full gap; without it, the gap is federal only and says so.
- Social Security and Medicare owed on each vest are shown apart, "not included in the gap" (SC-22).
- A tranche delivered earlier this year keeps its tax and gap in this year's figures until year end, since that tax is still due at filing. Enter its value at delivery if you have it; otherwise the price on the analysis date is used.
- The Liquidity check counts the gap of vests delivered this year and of upcoming vests as a near-term commitment. View more says so.

**Vests in goals and the projection**
- Retirement & Goals lists the vests after estimated tax (and before tax), at the price on the analysis date, and which of them arrive before each goal. They are not counted as liquid before they arrive.
- The projection and every retirement figure read from it (net worth at retirement, end of plan, the retirement shortfall and the saving needed) include each vest as wage income on its delivery date (SC-01, SC-02), labelled "includes future vests after estimated tax".
- This year's figures (the Summary income card, the cash flow totals and the checks) still read the income your client reported.

**Client questionnaire**
- The income question reads "Total annual income before taxes, not counting company stock". Vests are always added beside it, so you are not asked whether the salary includes them.
- Income has a "Stock compensation" chip, with a helper line under the income question. The row works like every other income row: the employer, the owner, and an optional approximate amount per year. You complete the rest: ticker, type and vest dates.
- Their answers create a grant "pending detail", kept out of the figures, and an alert on the opportunity: "Stock pay: detail pending". Complete the grant to include it.
- If your client mentions stock pay in the questionnaire chat or in an "Other income" row, it arrives as a proposal for you, with the same alert. It becomes a grant pending detail only when you confirm it. If an "Other income" row duplicates the grant, delete the row.

**Plan statements**
- Upload a client's plan statement in the grant editor, or with the opportunity's other documents. Proposed grants and tranches, with their delivery dates when the statement shows them, appear in one review next to the document. Check them and press "Confirm all"; nothing is counted until you confirm.
- Clients can also upload their plan statement in the questionnaire's documents step, under "Investment & retirement accounts"; it arrives as a proposal for you to confirm.
- If the client already reported the grant in the questionnaire, confirming the statement completes that grant; no second grant is created.

**Why a score may change**
- Households with complete grants: the Liquidity check may count tax due on vests delivered this year and on upcoming vests. Households with grants pending detail, private grants or proposed grants: no change.

**Help Center**
- The article "How is the Financial Health Score calculated?" is updated at launch: the concentration check reads employer stock held across accounts as one position, and the liquidity check counts tax due on vests within its horizon.

**Existing clients**
- Nothing changes for an existing client until you add employer stock or a grant.

**Known limits**
- Dividend equivalents paid on unvested units are not modelled (SC-27).
- State withholding is only included when you enter its rate.
- Vests are not turned into held shares automatically: when a tranche vests, record the shares kept as a position. Until you do, the shares from that vest are not counted as held anywhere in the analysis.
- ESPP purchases, stock options, RSA, SAR and phantom stock are not modelled; shares already held from them can be marked as employer stock.

## Next

- A 409A value for private-company grants, for information (SC-31).
- Cost basis on a position marked as employer stock (SC-30).
- Shares kept at each tranche, recorded on the tranche.
- Vests turned into held shares, proposed by the system for you to confirm.
- The Social Security estimate including vests.
- Stock options and ESPP (SC-32 to SC-34).
