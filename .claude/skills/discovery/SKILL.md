---
name: discovery
description: Use in phase F2, after research, to test the case's assumptions about advisors and clients with stock compensation. Builds an assumption list, reads real public voices, writes SIMULATED personas and interview snapshots, and synthesises what is validated, invalidated or unknown, with the weight of each source. Not for US facts (research) or for Sherpas facts (the platform, the brief, or a question to Sherpas).
---

# Discovery

Goal: F3 decides on evidence whose weight is stated. Real voices outrank simulated ones; nothing simulated is presented as real. Adapted from jinjin1's `create-interview-snapshots` and `synthesize-snapshots` (output formats only, credited in `NOTICE`); the evidence weights and the SIMULATED rules are this case's (D-019).

## Input

- `docs/05_business_lens.md`, `docs/data_model.md` and `docs/questionnaire_map.md` ("Where stock compensation would fit"), the "Assumption carried forward" lines in `docs/research.md`: the assumptions to test.
- `docs/research.md`: facts the personas and interview guides must respect.
- Real public voices gathered in F2 (raw notes outside git; quotes with URL and date).

## Evidence weight

| Weight | Source | Can it validate? |
|---|---|---|
| High | Real interview (named or anonymised, with consent) | Yes |
| Medium | Real public voice: a post, review or press quote with URL and date | Yes, if two or more independent voices agree; one alone is "signal" |
| Low | SIMULATED persona or interview | Never; it only generates hypotheses and interview questions |

## Filtering public voices (D-021)

Every public item (post, comment, review, press quote) gets two labels before it can count as evidence.

**Who speaks**
- **P1 verified professional:** identity or role checked by the platform (G2 "Validated Reviewer" with a job title in financial services) or named in press with firm and role.
- **P2 self-declared professional:** says they are an advisor, CFP, CPA or work at an RIA, with content consistent with that (professional vocabulary, talks about "my client").
- **E lived experience:** describes their own situation with concrete detail (amounts, dates, what they did).
- **N no stated basis:** generic advice, jokes, slogans, or no sign of knowledge or experience.

**What kind of claim**
- **R rule:** a statement about tax, law or plan mechanics. Checked against `research.md`: consistent (cite `R-NNN`), contradicts (a misconception; record it as evidence of confusion, never as a fact), or not covered (goes to research, not used).
- **B behaviour:** what the person or their client did, uses, or struggles with. This is what discovery is after.
- **O opinion:** what someone thinks others should do. Counts only as sentiment, never as evidence for an assumption.

**Rules:** N items and O claims are excluded from the evidence (kept in raw notes only). An assumption is validated only by B or R-consistent items from two independent speakers, at least one P1, P2 or E. Upvotes are noted but never replace these rules. Machine-translated text is never quoted as verbatim: the original wording is used, or the item is paraphrased and marked "paraphrase".

## Steps

1. **Assumptions.** List each assumption once in `synthesis.md` with an ID (`A-01`…), its source file and the decision it changes in F3. Drop any that no F3 decision depends on.
2. **Interview guide.** For each assumption, the question that would test it, and who answers (advisor or client). Ask about past behaviour ("the last time a client had RSUs, what did you do?"), not opinions about a future feature.
3. **Real voices.** Label each item with the filter above. Copy into `voices.md` only items that pass it, read in full on the page: verbatim (or marked paraphrase), under 40 words, speaker label, claim label, URL, date, theme, and the assumptions it touches. No search-snippet quotes.
4. **Personas (SIMULATED).** In `personas.md`: two advisor and three client personas. Each states what it is built from (`R-NNN`, a voice number) so its traits are traceable, and what it cannot tell us.
5. **Snapshots (SIMULATED).** One per persona in `snapshots/<persona-id>.md`, using the template below, answering the interview guide. Every quote is marked "(SIMULATED)".
6. **Synthesis.** In `synthesis.md`: the assumption table (ID · assumption · status validated / invalidated / unknown · evidence with weight · what F3 should do with it); patterns across voices, each citing at least two real voices or marked "signal"; contradicting evidence searched for and stated; and "What F3 needs" (open items for decision).
7. Open items that only Sherpas can answer go to `docs/02_open_questions.md`, after the D-020 check.

## Snapshot template

```markdown
# SIMULATED · Interview snapshot: <persona name>
SIMULATED: not a real person or interview. Built from <R-NNN, voice numbers>. Generates hypotheses only.

- **Persona:** <role, segment, equity situation>
- **Tests assumptions:** <A-NN, …>

## Memorable quote (SIMULATED)
> "…"

## Stories
### <title>
- **Context:** <when, trigger>
- **What happened:** <concrete steps>
- **Workaround / pain:** <…>

## Answers to the guide
| Assumption | Answer (SIMULATED) | Consistent with real voices? (voice #) |
|---|---|---|

## Opportunities
- <need in the user's words: "I want to … but … because …">

## What this cannot tell us
- <limits>
```

## Output (fixed paths)

`docs/discovery/synthesis.md`, `docs/discovery/voices.md`, `docs/discovery/personas.md`, `docs/discovery/snapshots/<persona-id>.md`; updates to `docs/02_open_questions.md`.

## Done when

- Every simulated file has SIMULATED in its title and first line.
- Every assumption from `05_business_lens.md` and the "would fit" sections has a status, evidence and weight, or is dropped with a reason.
- No assumption is "validated" on SIMULATED material alone.
- Every US fact cites an `R-NNN`; every real quote has URL and date and was read in full.
- Contradicting evidence is stated, or its absence is.
- "What F3 needs" lists the decisions F3 must take and the evidence for each.
- The dry run showed one snapshot to Renier before the rest were written.

## Next

`/check F2`, then F3 (`decide`).
