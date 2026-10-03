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
- Assumption carried forward: the household's RSU income at vest is already in the W-2 wages a client reports, so it could be counted twice if also entered as a separate RSU income. [ASSUMPTION: confirm against how the questionnaire asks for income, F1]
