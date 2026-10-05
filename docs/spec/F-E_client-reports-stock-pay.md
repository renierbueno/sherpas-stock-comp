# F-E · The client reports stock pay

Decisions: D-023, D-028, D-030, D-031, D-032, D-035, D-036 · Depends on: F-B · Release: after F-B, behind the firm setting (D-030, D-043)

## Context

The questionnaire asks for one gross annual income per person and nothing about stock pay [FACT: questionnaire_map]. Clients know totals, not schedules (A-05), and the value that vests is W-2 wages, so it may already be inside the income they report (R-001; V38 to V41). The questionnaire already branches with a yes/no for pension and annuity [FACT: questionnaire_map].

## User story

As a client, I want to say that part of my pay comes in company stock with what I know, so that my advisor can complete it; as an advisor, I want to know it was reported and that detail is missing.

## Requirements

### Questionnaire

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-E-01 | Where the firm has enabled stock compensation, the Income section shall ask, right after the gross income question, "Does part of your pay come in company stock, such as RSUs?" (yes or no). | D-030, D-032 | e2e | (F6) |
| AC-E-02 | When the answer is yes, the system shall ask which person (client, co-client, or both) and open one row per person. | D-031; [FACT: questionnaire_map, every answer belongs to someone] | e2e | (F6) |
| AC-E-03 | The system shall ask in each row: employer, ticker if listed (security search), type (RSU, PSU, other, not sure), approximate value of unvested stock, how often it vests (monthly, quarterly, every six months, yearly, not sure). | D-030, D-031 | e2e | (F6) |
| AC-E-04 | The system shall require the employer in each row and accept "not sure" or empty for every other field. | D-030; A-05 | unit + e2e | (F6) |
| AC-E-05 | The system shall ask in each row "Does the gross income you entered include stock that vested this year?" (yes, no, not sure). | D-028 | e2e | (F6) |
| AC-E-06 | When the answer to AC-E-01 is no, the system shall continue the questionnaire exactly as today. | D-023 | e2e | (F6) |

### What it creates

| ID | Requirement (EARS) | From | Verify | Test |
|---|---|---|---|---|
| AC-E-07 | When the questionnaire is submitted with a row, the system shall create a grant for that person with status "pending detail" and source "questionnaire". | D-035, D-030 | unit | (F6) |
| AC-E-08 | While a grant is pending detail, the opportunity shall show the alert "Stock pay: detail pending". | D-036; [FACT: captures/questionnaire/02-opportunity, automatic alerts] | e2e | (F6) |
| AC-E-09 | When no grant of the household is pending detail, the system shall remove the alert. | D-036 | unit | (F6) |
| AC-E-10 | While a grant is pending detail, the analysis shall show "<Name> reported pay in <company> stock. It is not yet included in these figures." | D-035 | e2e | (F6) |
| AC-E-11 | Where the answer to AC-E-05 is yes, the system shall add no income for tranches dated in the current year, and from the next year use as salary the reported income minus the current year's vest value. | D-028, D-051 | unit | (F6) |
| AC-E-12 | Where the answer to AC-E-05 is no, the system shall add every future tranche, including those of the current year, beside the reported salary. | D-028 | unit | (F6) |
| AC-E-13 | Where the answer to AC-E-05 is "not sure", the system shall keep the grant pending detail and show the advisor "Check whether the reported income includes stock that vested this year." | D-028, D-035, D-051 | unit + e2e | (F6) |
| AC-E-14 | The grant editor shall show the client's answers labelled "Client estimate, not used in the figures". | D-035 | e2e | (F6) |
| AC-E-15 | In advisor mode, the stock-pay block shall open the full grant editor of F-B. | D-036 | e2e | (F6) |
| AC-E-16 | Where the type is "other", the system shall show the advisor "This type is not modelled in this version; flag any shares already held as employer stock." | D-024 | e2e | (F6) |
| AC-E-17 | When a held position has the ticker given for an employer, the system shall suggest to the advisor flagging it as employer stock. | D-024, D-031, D-051 | e2e | (F6) |
| AC-E-18 | The system shall flag a suggested position only after the advisor confirms. | D-042, D-051 | unit | (F6) |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-E-01 | Firm has not enabled stock compensation | No question; questionnaire as today | AC-G-01 |
| EC-E-02 | The client and the co-client both have stock pay, same employer | Two rows, two grants, one employer | AC-E-02, AC-E-07 |
| EC-E-03 | Client knows only the employer | Saved; grant pending; alert | AC-E-04, AC-E-07, AC-E-08 |
| EC-E-04 | Client answers "not sure" to the income question | Grant stays pending even after the tranches are complete, until the advisor answers it | AC-E-13 |
| EC-E-05 | Client's employer is private | No ticker; grant pending; then private handling | AC-E-03; F-B (AC-B-18 to AC-B-21) |
| EC-E-06 | Client reports ESPP or options as "other" | Recorded; advisor notice; held shares can be flagged | AC-E-16; F-A |
| EC-E-07 | Firm uses the "benefit plan income" block instead of the income questions | Placement unknown | out: asked in `02` (fields of that block not visible) |
| EC-E-08 | Advisor fills the questionnaire in advisor mode | Full editor instead of the client rows | AC-E-15 |
| EC-E-09 | Client says yes, advisor finds no grant (misunderstanding) | Advisor deletes the grant; alert removed | AC-E-09; F-B |

## Instrumentation

| ID | Event (EARS) | Feeds | Verify | Test |
|---|---|---|---|---|
| EV-E-01 | When the stock-pay question is answered, the system shall record the answer with the firm. | M-06 | unit | (F6) |
| EV-E-02 | When a questionnaire is completed, the system shall keep the stock-pay answer with the completion it already stores. | GR-01; [FACT: questionnaire_map, progress stored per section] | unit | (F6) |
| EV-E-03 | When the alert "Stock pay: detail pending" is raised or removed, the system shall record the time. | M-02 | unit | (F6) |

## Simulator tests (relations)

- With "income includes vests", the household's total income for the current year equals the reported income.
- With "not sure", no score figure changes.

## Out of scope

- Document upload from the client questionnaire (D-042, not chosen).
- Asking the client for tranche dates or terms (D-030).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan.
