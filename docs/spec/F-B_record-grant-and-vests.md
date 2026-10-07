# F-B · Record a grant and its vests

Decisions: D-024, D-025, D-026, D-027, D-029, D-036, D-037, D-045, D-050, D-080, D-101, D-107, D-109, D-110 · Depends on: none (F-A for the exposure context lines) · Release: first release (release 2, with F-C, F-D, F-E and F-F), behind the firm setting (D-030, D-043, D-080)

## Context

An unvested RSU or PSU is neither an asset nor income yet; it becomes wages and shares on each vest date, and a PSU's share count is known only at certification (R-001, R-002, R-011; SC-01, SC-04, SC-05). The questionnaire has no place for it: only workarounds such as a generic future income, which loses shares, price and schedule [FACT: questionnaire_map]. The platform's type lists already name a stock compensation asset category with an RSU sub-type, with no grant, schedule or tax logic behind it [FACT: data_model, 2026-10-05]; this feature fills that slot (D-058). Real schedules include cliffs, unequal and back-loaded tranches (R-009, R-010; SC-06).

## User story

As an advisor, I want to record a client's RSU or PSU grant with its vesting schedule, so that the analysis sees what arrives, when, and for how much.

## Requirements

### Grant

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-B-01 | Where the firm has enabled stock compensation, the system shall let the advisor add a grant in advisor mode and in Data & Assumptions. | D-030, D-036; [brief] Data & Assumptions | unit F-B, component F-B |
| AC-B-02 | The system shall assign each grant to one person of the household, never joint. | D-026; [FACT: data_model, every element has an owner] | unit F-B |
| AC-B-03 | The system shall offer RSU and PSU as grant types. | D-024 | component F-B |
| AC-B-04 | The system shall record for each grant its employer, grant date and units (target units for a PSU). | D-027, D-031; R-002; SC-05, SC-28 | unit F-B |
| AC-B-05 | When the advisor saves a grant, the system shall reprocess the analysis. | [brief] saving in Data & Assumptions reprocesses | component F-B |
| AC-B-06 | If the analysis has a manual score adjustment, then the system shall show "Saving reprocesses the analysis and replaces your manual score adjustment." before the advisor saves a grant. | D-033; [brief] | component F-A, component F-B |

### Schedule

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-B-07 | When the advisor enters a pattern (length, frequency, cliff), the system shall generate the dated tranches. | D-027; R-009; SC-06 | unit F-B, component F-B |
| AC-B-08 | The system shall let the advisor edit the date and units of each tranche. | D-027; R-010; SC-06 | component F-B |
| AC-B-09 | The system shall let the advisor add and delete tranches. | D-027 | component F-B |
| AC-B-10 | If the units of all tranches differ from the grant's units, then the system shall show "Tranches add up to <n> of <m> units." without blocking the save. | D-027 | unit F-B, component F-B |
| AC-B-11 | If a tranche's delivery date is on or before the analysis date, then the system shall leave it out of the grant's figures, except the current year's tax figures of AC-C-31. | D-028, D-037, D-107 | unit F-B |
| AC-B-12 | If a tranche's delivery date is on or before the analysis date, then the system shall show "Vested on <vest date>: record the shares kept as a held position." | D-028, D-037, D-110 | unit F-B, component F-B |
| AC-B-13 | When the advisor marks a tranche as forfeited, the system shall remove it from the grant's figures. | D-026; R-002; SC-04 | unit F-B |
| AC-B-14 | The system shall let the advisor record, per tranche, the shares kept after withholding and their cost basis. | Next (D-080); D-029; R-011; SC-18, SC-30 | component F-B |
| AC-B-32 | The system shall record, per tranche, a delivery date, prefilled with the tranche's vest date and editable by the advisor, labelled "Shares delivered on". | D-101; SC-02, SC-03 | unit F-B, component F-B |
| AC-B-33 | The system shall let the advisor enter, per delivered tranche, its value at delivery, with the helper text "From the W-2 or the plan statement". | D-107 [ASSUMPTION: A-58] | spec only (see index) |
| AC-B-15 | Dropped: shares kept are not estimated; they are recorded when known (AC-B-14). | D-050 | |

### PSU

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-B-16 | Where the grant is a PSU, the system shall record its performance condition and the end of its performance period. | D-027; R-002, R-011; SC-05 | component F-B |
| AC-B-17 | Where the grant is a PSU, the system shall record its payout range, 0% to 200% of target unless the advisor changes it. | D-027; R-002 (sample agreements); SC-05 | unit F-B |

### Private employer

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-B-18 | Where the employer is private, the system shall let the advisor save an RSU grant without vest dates. | D-025; R-011 (double trigger); SC-08 | unit F-B, component F-B |
| AC-B-19 | Where the employer is private, with or without vest dates, the system shall show the grant as "Awaiting a liquidity event". | D-025, D-068 | unit F-B, component F-B |
| AC-B-20 | Where the employer is private, the system shall let the advisor enter the latest 409A value and its date. | Next (D-080); D-025; R-017; SC-31 | component F-B |
| AC-B-21 | Where a 409A value is entered, the system shall show "409A value <$> per share as of <date>, for information only; not counted in the figures." | Next (D-080); D-025; R-017; SC-31 | unit F-B, component F-B |

### What the analysis shows

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-B-22 | The system shall leave unvested tranches out of current net worth. | D-026 | unit F-B |
| AC-B-23 | While a household has a complete grant of a listed employer, the analysis shall list each future tranche with its delivery date, units and value at the <analysis date> price. | D-038 (vest calendar as data), D-045, D-110 | unit F-B, component F-B |
| AC-B-24 | Where a tranche is a performance unit tranche, the list shall show its value at target followed by "(range $<min> to $<max>)". | D-045 | unit F-B, component F-B |
| AC-B-25 | The system shall not send reminders or notifications for vest dates. | D-038 | spec only (see index) |
| AC-B-26 | If the household has no grant, then the system shall show no grant section in the analysis. | D-023 | unit F-B, component F-B |
| AC-B-27 | The analysis shall show grants in the Assets & Investments section, in a block "Stock compensation not yet vested (not in net worth)" after the asset totals, holding the tranche list (AC-B-23), "Awaiting a liquidity event" (AC-B-19) and the pending line (AC-E-10). | D-026, D-060 | component F-B |

### Completeness, price and storage

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-B-28 | The system shall mark a grant complete when it has an owner, a type, a listed employer with a ticker, its units, at least one tranche with date and units that is either future or delivered in the current tax year, and PSU terms for a PSU. | D-035, D-060, D-094, D-109 | unit F-B |
| AC-B-29 | Dropped: the advisor is not asked whether the salary includes vests; the income question excludes stock compensation and the grant review shows the line of AC-F-17. | D-094, D-108 | |
| AC-B-30 | If the employer's ticker has no market price, then the system shall leave the grant out of every figure and show the advisor "Price not available for <ticker>: grant not counted." | [brief] missing data; D-060 | unit F-B, component F-B |
| AC-B-31 | The system shall store a grant as an element of the platform's stock compensation asset category, sub-type RSU, and a PSU as an RSU with its performance terms; unvested value stays out of net worth (AC-B-22). | D-058, D-026 | unit F-B |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-B-01 | Four years, quarterly, one-year cliff | 13 tranches: the first at month 12 with a quarter of the units, then 12 quarterly | AC-B-07 |
| EC-B-02 | Unequal tranches (10/20/35/35) | Generated even, edited by the advisor | AC-B-07, AC-B-08 |
| EC-B-03 | Grant already partly vested | Past tranches out of the figures, with the prompt to record held shares | AC-B-11, AC-B-12 |
| EC-B-04 | All tranches delivered | Tranches delivered this year keep their tax and gap until year end; after that the grant contributes nothing; prompts only | AC-B-11, AC-B-12, AC-B-28, AC-C-31 |
| EC-B-05 | Tranches do not add up to the grant's units | Notice, save allowed | AC-B-10 |
| EC-B-06 | Two grants from the same employer (new-hire and refresh) | Two grants; their tranches add up in every figure | AC-B-04; F-A (AC-A-16) |
| EC-B-07 | The client and the co-client each have a grant | One grant per person; never joint | AC-B-02 |
| EC-B-08 | PSU with a payout range other than 0% to 200% | The advisor's range is used | AC-B-17 |
| EC-B-09 | Private employer, time condition met, no liquidity event | "Awaiting a liquidity event"; no dates; out of the figures | AC-B-18, AC-B-19, AC-G-05 |
| EC-B-10 | Private employer goes public | The advisor marks the employer listed and adds the ticker; the grant enters the figures on reprocessing | AC-B-04, AC-B-05 |
| EC-B-11 | Client leaves the employer | The advisor marks the remaining tranches forfeited | AC-B-13 |
| EC-B-12 | Saving a grant after a manual score adjustment | Warning before the save; the adjustment is replaced | AC-B-06 |
| EC-B-13 | Known edge case. Dividend equivalents paid on unvested units | Not modelled: they are wages of the year paid, so that year's tax and gap read slightly low for employers that pay them | out: D-041, D-105 [ASSUMPTION: A-50]; SC-27 |
| EC-B-14 | ESPP purchases, unexercised options, RSA, SAR, phantom stock | Not offered as grant types; shares already held can be flagged (F-A) | out: D-024, D-041 |
| EC-B-15 | A tranche vests after the analysis date and the analysis is reopened months later | Shown as vested with the prompt; no automatic conversion | AC-B-11, AC-B-12; D-037 (conversion next) |
| EC-B-16 | PSU certified at the end of its period | The advisor edits the tranche units and sets the range to 100% | AC-B-08, AC-B-17 |
| EC-B-17 | Grant entered by the advisor for an existing household, whose salary was collected before the income question excluded stock compensation | The review shows the line of AC-F-17; the advisor edits the salary if it includes vests | AC-F-17; D-108 |
| EC-B-18 | Delivery date not known | The vest date is used for both taxes | AC-B-32 |
| EC-B-19 | Delivered shares later appear in a linked or uploaded account | Counted once, as a held position: the tranche left the figures on its date, and the employer flag applies whatever the source [ASSUMPTION: A-60] | AC-B-11; D-092 |

## Instrumentation

| ID | Event (EARS) | Feeds | Test |
|---|---|---|---|
| EV-B-01 | When a grant is created, the system shall record the firm, the household, the type and the source (advisor, questionnaire, extraction). | M-02, M-06 | unit F-B |
| EV-B-02 | When a grant changes from pending detail to complete, the system shall record the time since it was reported. | M-02 | unit F-B, unit F-F |
| EV-B-03 | When the advisor edits generated tranches, the system shall record how many tranches were changed. | M-03 (with F-F) | unit F-B |

## Simulator tests (relations)

- A household with a grant and the same household without it have the same current net worth.
- A private grant, or a grant with every tranche in the past, changes no score figure.
- Forfeiting a tranche never raises any figure that counts future vests.

## Out of scope

- Turning a tranche into a held position on its vest date: next, the system proposes and the advisor confirms (D-037).
- Dividend equivalents; gain or loss on sale (D-041, later).
- ESPP, options, RSA, SAR and phantom stock as grant types (D-024, D-041).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
