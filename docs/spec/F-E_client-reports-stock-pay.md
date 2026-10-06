# F-E · The client reports stock pay

Decisions: D-023, D-030, D-035, D-036, D-056, D-057, D-076, D-077, D-090, D-092, D-093, D-094, D-096, D-110 · Depends on: F-B · Release: first release (release 2, with F-B, F-C, F-D and F-F), behind the firm setting (D-030, D-043, D-080)

## Context

The questionnaire asks for one gross annual income per person and nothing about stock pay [FACT: questionnaire_map]. Clients know totals, not schedules (A-05), and the value that vests is W-2 wages, so a client asked for income can include it (R-001; SC-01; V38 to V41); the income question therefore asks for income without company stock, and vests are always added beside it (D-094). The Income screen adds every extra income type (pension, business, royalty and others) as a chip that opens a row with owner, amount and frequency, and the client can upload documents in a documents step [FACT: questionnaire_map, 2026-10-05].

## User story

As a client, I want to say that part of my pay comes in company stock, the same way I add any other income, so that my advisor can complete it; as an advisor, I want to know it was reported and that detail is missing.

## Requirements

### Questionnaire

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-E-01 | Where the firm has enabled stock compensation, the Income section shall offer a "Stock compensation" chip among "other current income". | D-030, D-056 | e2e | (F6) |
| AC-E-02 | Where the firm has enabled stock compensation, the system shall label the income question "Total annual income before taxes, not counting company stock". | D-094; SC-01 | e2e | (F6) |
| AC-E-03 | When the client selects the chip, the system shall add a row like every other chip row: the employer in the name field, the owner (one person), and an optional approximate amount with its frequency set to "per year" by default; each selection adds one row, as for other chips. | D-030, D-056, D-076; [FACT: questionnaire_map, 2026-10-05] | e2e | (F6) |
| AC-E-04 | The system shall require the employer in each row and accept an empty amount. | D-030, D-076; A-05 | unit + e2e | (F6) |
| AC-E-05 | Dropped: the income question excludes company stock, so nobody is asked whether it includes vests. | D-094 | | |
| AC-E-06 | If the client adds no stock compensation row, then the system shall continue the questionnaire exactly as today. | D-023 | e2e | (F6) |
| AC-E-19 | The row shall show no upload prompt; a plan statement the client uploads in the documents step enters F-F as a proposal (AC-F-13). | D-057, D-077 | e2e | (F6) |
| AC-E-20 | The system shall never block completing the questionnaire or generating the analysis because a grant is pending detail. | D-035, D-060 | e2e | (F6) |
| AC-E-21 | The system shall add the chip to any Financial Health template the firm uses [ASSUMPTION: A-30]. | D-056, D-060 | e2e | (F6) |
| AC-E-22 | When text in a questionnaire chat or an "Other income" row mentions stock pay, the system shall propose to the advisor a grant with the person and, if named, the employer, advisor-only, through the platform's existing context mechanism. | D-093, D-096, D-110 [ASSUMPTION: A-27] | e2e | (F6) |
| AC-E-23 | While a proposal of AC-E-22 awaits review, the opportunity shall show the alert of AC-E-08. | D-110 | e2e | (F6) |
| AC-E-24 | When the advisor confirms a proposal of AC-E-22, the system shall create a grant pending detail; when the advisor rejects it, nothing is created. | D-090, D-110 | unit | (F6) |
| AC-E-25 | Where the firm has enabled stock compensation, the system shall show under the income question the helper line "Paid partly in company stock? Add it below as Stock compensation." | D-056, D-094 | e2e | (F6) |

### What it creates

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-E-07 | When the questionnaire is submitted with a row, the system shall create a grant for that person with status "pending detail" and source "questionnaire". | D-035, D-030 | unit | (F6) |
| AC-E-08 | While a grant is pending detail, the opportunity shall show the alert "Stock pay: detail pending". | D-036; [FACT: captures/questionnaire/02-opportunity, automatic alerts] | e2e | (F6) |
| AC-E-09 | When no grant of the household is pending detail, the system shall remove the alert. | D-036 | unit | (F6) |
| AC-E-10 | While a grant is pending detail, the analysis shall show "<Name> reported pay in <company> stock. It is not yet included in these figures." | D-035 | e2e | (F6) |
| AC-E-11 | Dropped: there is no answer to subtract from; vests are always added beside the reported income (AC-E-12). | D-094 | | |
| AC-E-12 | The system shall add every future tranche, including those of the current year, beside the reported income, which excludes company stock. | D-028, D-094; SC-01 | unit | (F6) |
| AC-E-13 | Dropped: there is no income question to leave unanswered. | D-094 | | |
| AC-E-14 | The grant editor shall show the client's answers labelled "Client estimate, not used in the figures". | D-035 | e2e | (F6) |
| AC-E-15 | In advisor mode, the stock-pay block shall open the full grant editor of F-B. | D-036 | e2e | (F6) |
| AC-E-16 | In the grant editor of a grant reported from the questionnaire, the system shall show the advisor "Only RSU and PSU are modelled in this version. If this stock pay is ESPP or options, delete the grant and flag any shares already held as employer stock." | D-024, D-076 | e2e | (F6) |
| AC-E-17 | When the advisor confirms a grant, the system shall flag every held position with the grant's employer ticker, whatever its source (typed, linked or uploaded), and show the advisor "<Company> (<ticker>) held in <accounts> flagged as employer stock." with Undo. | D-024, D-070, D-090, D-092 | e2e | (F6) |
| AC-E-18 | The system shall set each position flagged by AC-E-17 to the grant owner as person and "current employer: yes", both editable by the advisor. | D-090, D-110 | unit | (F6) |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-E-01 | Firm has not enabled stock compensation | No question; questionnaire as today | AC-G-01 |
| EC-E-02 | The client and the co-client both have stock pay, same employer | Two rows (one per owner), two grants, one employer | AC-E-03, AC-E-07 |
| EC-E-03 | Client gives only the employer, no amount | Saved; grant pending; alert | AC-E-04, AC-E-07, AC-E-08 |
| EC-E-04 | Dropped: there is no income question to answer "not sure" to | - | D-094 |
| EC-E-05 | Client's employer is private | Reported like any employer; the advisor records it as private | AC-E-03; F-B (AC-B-18 to AC-B-21) |
| EC-E-06 | The client's stock pay is ESPP or options | Reported as stock compensation; the advisor sees the notice, deletes the grant and flags held shares | AC-E-16; F-A |
| EC-E-07 | Firm uses the "benefit plan income" block instead of the income questions | The chip goes in that block too | [ASSUMPTION: A-24], `02` (D-059) |
| EC-E-08 | Advisor fills the questionnaire in advisor mode | Full editor instead of the client rows | AC-E-15 |
| EC-E-09 | Client says yes, advisor finds no grant (misunderstanding) | Advisor deletes the grant; alert removed | AC-E-09; F-B |

## Instrumentation

| ID | Event (EARS) | Feeds | Verify | Test |
|---|---|---|---|---|
| EV-E-01 | When a stock compensation row is added or removed, the system shall record it with the firm. | M-06 | unit | (F6) |
| EV-E-02 | When a questionnaire is completed, the system shall keep the stock-pay answer with the completion it already stores. | GR-01; [FACT: questionnaire_map, progress stored per section] | unit | (F6) |
| EV-E-03 | When the alert "Stock pay: detail pending" is raised or removed, the system shall record the time. | M-02 | unit | (F6) |

## Simulator tests (relations)

- With "income includes vests", the household's total income for the current year equals the reported income.
- With "not sure", no score figure changes.

## Out of scope

- Counting a client's upload before the advisor confirms it (D-042, D-057).
- Asking the client for tranche dates or terms (D-030).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
