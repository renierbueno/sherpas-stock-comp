# F-F · Upload a plan statement and confirm the extracted tranches

Decisions: D-037, D-042, D-057, D-080, D-090, D-091, D-101, D-108 · Depends on: F-B · Release: first release (release 2, with F-B, F-C, F-D and F-E), behind the firm setting (D-030, D-043, D-080)

## Context

Grant detail lives in documents and plan portals (V01, V29), and aggregators do not pass unvested grants (R-013). The platform already extracts data from uploaded documents [web: https://sherpaswealth.com/data-extraction, accessed 2026-10-05]; whether it reads equity plan statements is an assumption (riskiest assumption 1) [ASSUMPTION: A-15].

## User story

As an advisor, I want to upload a client's plan statement and confirm the grants it proposes, so that I complete the detail without typing every tranche.

## Requirements

| ID | Requirement (EARS) | From | Test |
|---|---|---|---|
| AC-F-01 | Where the firm has enabled stock compensation, the grant editor shall let the advisor upload a plan statement. | D-042 | component F-F |
| AC-F-02 | When a statement is uploaded, the system shall propose one grant per grant found, with its tranches, with status "proposed". | D-042 | unit F-F, component F-F |
| AC-F-03 | While a grant is proposed, the system shall leave it out of every figure. | D-042 | unit F-F, component F-F |
| AC-F-04 | The system shall show the uploaded document next to the proposed values. | D-042 (advisor review) | component F-F |
| AC-F-05 | The system shall let the advisor edit any proposed field before confirming. | D-042 | component F-F |
| AC-F-06 | When the advisor confirms a proposed grant, the system shall mark it complete and reprocess the analysis. | D-042; [brief] | unit F-F, component F-F |
| AC-F-07 | When the advisor rejects a proposed grant, the system shall discard it and change nothing else. | D-042 | unit F-F, component F-F |
| AC-F-08 | If the extraction finds no grant, then the system shall show "No grants found in this document. Enter them by hand." | D-042; D-030 (manual route stays) | unit F-F, component F-F |
| AC-F-09 | If a proposed grant has the same employer, grant date and type (RSU or PSU) as an existing grant, then the system shall show both and let the advisor choose which to keep. | D-042, D-115 | unit F-F, component F-F |
| AC-F-10 | Where the statement shows past vests, the system shall propose them as past tranches with the prompt of AC-B-12. | D-028, D-037 | unit F-F, component F-F |
| AC-F-11 | The system shall not create held positions from a statement. | D-037 (no automatic conversion) | unit F-F |
| AC-F-12 | The system shall label every proposed value "Extracted from <document>, not confirmed". | D-042 | component F-F |
| AC-F-13 | When the client uploads a plan statement in the questionnaire's documents step, the system shall process it as in AC-F-02 to AC-F-12, as a proposal the advisor confirms. | D-057; [FACT: questionnaire_map, 2026-10-05, uploads go to the opportunity's context] | unit F-F, component F-F |
| AC-F-14 | When the advisor confirms a proposed grant with the same owner and employer as a grant pending detail, the system shall complete that pending grant with the confirmed values instead of adding a second grant, keeping the client's estimate and the date it was reported; further proposals from the same statement are added as new grants. | D-078 | unit F-F, component F-F |
| AC-F-15 | A plan statement the advisor uploads to the opportunity's documents, outside the grant editor, shall be processed as in AC-F-02 to AC-F-12. | D-079; [FACT: questionnaire_map, 2026-10-05, uploads go to the opportunity's context] | spec only (see index) |
| AC-F-16 | When the statement shows a delivery or release date for a tranche, the system shall propose it as the tranche's delivery date; otherwise it shall propose the vest date. | D-101 [ASSUMPTION: A-59]; SC-02 | unit F-F, component F-F |
| AC-F-17 | When the advisor confirms a proposed grant or saves a grant, the review shall show "Salary on file should exclude stock compensation. If it includes vested stock compensation, edit it." | D-108; SC-01 | component F-B |
| AC-F-18 | Where a statement yields more than one proposed grant, the review shall offer "Confirm all", which confirms every proposed grant of that statement as AC-F-06 does. | D-090 | unit F-F, component F-F |

## Edge cases

| ID | Case | Expected | Covered by |
|---|---|---|---|
| EC-F-01 | Statement with three grants (two RSU, one PSU) | Three proposed grants | AC-F-02 |
| EC-F-02 | Statement already entered by hand | Both shown; advisor chooses | AC-F-09 |
| EC-F-03 | Unreadable scan, or not a plan statement | "No grants found"; manual route | AC-F-08 |
| EC-F-04 | Advisor uploads and leaves without confirming | Proposed grant stays out of the figures; the grant stays pending | AC-F-03; F-E (AC-E-08) |
| EC-F-05 | PSU without a stated payout range | Default 0% to 200%, editable | F-B (AC-B-17) |
| EC-F-06 | Statement lists shares withheld at past vests | Shown with the past tranches for the advisor to record held positions | AC-F-10, AC-F-11 |
| EC-F-07 | The client reported the grant in the questionnaire; the advisor then uploads its plan statement | The confirmed proposal completes the pending grant; the alert and the pending line go away | AC-F-14; F-E (AC-E-09, AC-E-10) |
| EC-F-08 | Two pending grants with the same employer, one per spouse | Each confirmed proposal completes the pending grant of its own owner | AC-F-14 |

## Instrumentation

| ID | Event (EARS) | Feeds | Test |
|---|---|---|---|
| EV-F-01 | When a statement is uploaded, the system shall record whether any grant was found. | M-03 | unit F-F |
| EV-F-02 | When a proposed grant is confirmed, the system shall record how many fields the advisor changed. | M-03 | unit F-F |
| EV-F-03 | When a proposed grant is rejected, the system shall record it. | M-03 | unit F-F |

## Simulator tests (relations)

- A proposed grant changes no figure until it is confirmed.
- Confirming a proposed grant gives the same figures as entering the same tranches by hand.

## Out of scope

- Client confirmation of extracted values: the advisor confirms (D-042).
- How extraction works and its accuracy: engineering and the riskiest assumption 1 test (`07_success_criteria.md`).

## Owned by engineering

Plan and tasks: to be written by engineering from this spec. The prototype PR is a reference implementation, not the plan. In the prototype, extraction is SIMULATED.
