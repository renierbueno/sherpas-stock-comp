# 09 · Enablement · Stock compensation (pilot)

Material for advisors and for Client Success, ready with each release. Advisor screens were not seen (D-034); steps name the places the score article and the client view show [brief; FACT: platform_map]. The guide says what the product shows; it never gives tax advice. 2026-10-06.

## For advisors

### Five-minute guide

1. **Find it.** A client added a Stock compensation row, the opportunity shows "Stock pay: detail pending", or the same alert shows a proposal from the chat or an "Other income" row (see below).
2. **Complete it.** In advisor mode or Data & Assumptions, open the grant. Either upload the plan statement and review what it proposes on one screen, with "Confirm all" when it holds more than one grant (D-090, AC-F-18), or enter the pattern and adjust the tranches. Nothing read from a statement counts until you confirm it. The client's own answers are shown as a guide only.
3. **Check the dates and values.** Each tranche shows "Shares delivered on", prefilled with its vest date; change it when the plan statement or the client's records show a later delivery (D-101). For a tranche already delivered this year, enter "Value at delivery" from the W-2 or the plan statement (D-107). If you have the paystub or plan statement, enter the state withholding rate.
4. **Check the salary on file.** After you confirm or save a grant, the review shows "Salary on file should exclude company stock. If it includes stock that vested, edit it." (D-108). Edit the salary when it includes vests; see "The salary on file" below.
5. **Check the flagged shares.** Confirming a grant flags every held position with the employer's ticker, in any account and from any source (typed, linked or uploaded), and shows "<Company> (<ticker>) held in <accounts> flagged as employer stock." with Undo (D-090, D-092). Each flagged position is set to the grant owner as person and "current employer: yes"; both are editable (D-110). Use Undo if a position is not the client's employer stock.
6. **Then adjust the score**, if you want to: saving any of the above reprocesses the analysis and replaces a manual adjustment.

### The salary on file

The questionnaire's income question reads "Total annual income before taxes, not counting company stock" (D-094). The reported income never contains stock, and every future vest, including this year's, is added beside it. So the salary on file must not include vests, or they count twice.

Edit the salary on file when:

- the household was created before the new income question (existing households);
- the salary came from a W-2, whose wages include vested shares (SC-01);
- the client typed a figure that, by their own account, includes stock.
- the pilot ends for your firm and Sherpas turns the setting off: each household with a grant shows "Income was reported without company stock. Check the salary on file.", because the grants are hidden and the reported income still leaves stock out (D-111).

The line shows every time you confirm or save a grant; it reads nothing and stores nothing. If the salary already excludes stock, nothing needs to change.

### Proposals from the chat or "Other income"

When the client mentions stock pay in an "Anything to add" chat, or names an "Other income" row with words such as RSU, stock or shares, the platform proposes a grant to you, with the person and, if named, the employer (D-093, D-096, AC-E-22). The opportunity shows the "Stock pay: detail pending" alert while it waits. Only you see the proposal.

- **Confirm** it: a grant pending detail is created; complete it as above.
- **Reject** it: nothing is created.
- If an "Other income" row duplicates the grant, delete the row, so the vests are not counted twice.

If a proposal does not appear for a chat that mentions stock pay, read the chat and add the grant by hand [ASSUMPTION: A-27].

### When to change "Shares delivered on"

Income tax falls in the year the shares are delivered, which can be after the vest date (SC-02). Change the date when:

- a tranche vests late in the year and the plan statement shows delivery in the next year;
- a PSU is delivered after the performance result is certified, for example by March 15 after the performance period.

Income, cash, goal and chart lines read the delivery date; Social Security and Medicare read the vest date (SC-03). If the delivery date is not known, leave the vest date.

### Reading the new figures

| You see | It means |
|---|---|
| "Employer stock (<company>): 30% of investable assets, counted as one position across all accounts" | All shares of that company, in every account, added up |
| "<Name>'s pay comes from the same company" | Investments and income depend on one company (FINRA names this risk, R-014) |
| "$150K at target (range $0 to $300K)" | A PSU: the award names a target; the final number of shares is known only at certification (SC-05) |
| "Gap shown is federal only" | State withholding was not entered; the state tax is still estimated and shown |
| "$X after estimated tax ($Y before tax)" | Value on the delivery date at the price on the analysis date, after the tax the platform estimates |
| "delivered on <date>, at its value on delivery" | A tranche delivered earlier this year, valued at the "Value at delivery" you entered; its tax and gap stay in this year's figures until year end, because any shortfall is paid at filing (SC-17) |
| "includes future vests after estimated tax, at the <analysis date> price" | A retirement figure that counts each future vest as wage income on its delivery date |
| "Stock pay reported, not yet included in these figures" | Detail pending; the score does not use it |

### Explaining the retirement figures

Each future vest enters the projection as wage income on its delivery date, after estimated tax, and the projection treats it as it treats salary: part is spent and part is saved, by the household's own pattern; it is not counted as cash saved in full (D-106). Every figure read from the projection carries the label "includes future vests after estimated tax, at the <analysis date> price", with "at target" when PSUs are included. Retirement & Goals also lists the vests after estimated tax and which ones arrive before each goal.

What to say when the client asks:

- The figures assume the vests arrive as scheduled, at today's price and today's tax rules.
- Unvested shares are lost if the client leaves the company (SC-04); the figures would then drop.
- This year's income card and cash flow totals show the salary only; vests sit on their own line below the totals (D-107).

### Talking with the client

The analysis states facts and gaps; the advice is yours (D-041). Lines the report uses, and that you can say as they are:

- "About 30% of your investments is in your employer's stock, and your salary comes from the same company."
- "Tax on the March vest may be about $10,000 more than what is withheld."
- "Your vests before the home purchase add up to about $80,000 after estimated tax, at the price on the analysis date."

What the analysis does not do: tell the client to sell, hold or exercise, or give a tax plan.

### Known limits, to mention when asked

- **Bonuses and the $1 million threshold.** Estimated federal withholding is 22% on vests and 37% on vest income above $1 million per person and employer in a year (SC-14). The law counts bonuses and other supplemental pay toward the $1 million too (SC-15); the product counts vests only, so for a client near that line the withholding may read low and the gap high (D-102). You can edit the line before sharing.
- **Social Security and Medicare for two high earners.** The product shows Social Security and Medicare on each vest, not included in the gap (D-103). For a married couple each below $200,000 with their own employer but above $250,000 combined, some Additional Medicare Tax is owed at filing that no employer withholds (SC-23, SC-24); the gap reads low by that amount. A client with two employers above the Social Security wage base may get a refund at filing (SC-25); it is not shown.
- **Dividend equivalents.** Payments on unvested units are not modelled (D-105).

### FAQ

- **Why did my client's score go down?** Their employer stock is now counted as one position, or tax on upcoming vests is counted in near-term commitments. View more names which.
- **Why didn't it move?** The grant is pending detail, belongs to a private company, or has not been confirmed from a statement.
- **The client has options or ESPP.** Not modelled yet; flag any shares already held as employer stock by hand.
- **A tranche was delivered.** Record the shares kept as a position; after its delivery date the grant counts future tranches only. A tranche delivered this year keeps its tax and gap until year end. Until you record the shares, they are not counted anywhere in the analysis.
- **Do the retirement figures include vests?** Yes, as wage income on each delivery date; see "Explaining the retirement figures".
- **An existing client has stock pay.** Add it in Data & Assumptions, and check the salary on file; nothing changes for them until you do.

## For Client Success · pilot playbook

| When | What | Who |
|---|---|---|
| Before | Pick 3 to 5 firms, ideally with corporate or tech clients; Sherpas turns the setting on for them (only Sherpas changes it in the first release, D-111); agree targets (`07_success_criteria.md`) | Product, Client Success |
| Before | Each pilot advisor tags past opportunities with or without stock pay (baseline for M-01) | Advisors, Client Success |
| Week 0 | Share this guide; a 20-minute walkthrough per firm, covering "Confirm all", the flagged shares with Undo, the salary line and proposals | Client Success |
| Weekly | Fill the readout (`07`): metrics, grouped advisor corrections, decision | Product |
| Every two weeks | Continue, change or stop, logged as a decision; on stop, Sherpas turns the setting off and advisors check the salary of each household with a grant (AC-G-19) | Product, with Sherpas |

Support notes: questions about a moved score go to View more first; questions about tax figures are answered with the labels and known limits above, never with tax advice.
