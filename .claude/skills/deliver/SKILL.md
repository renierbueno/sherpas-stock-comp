---
name: deliver
description: Use to order and write what Sherpas will read or watch: the deliverables (Notion page, Miro board, README, PR) in product-process order ending with the spec, and the video script in the brief's order. Fixes the order, what each medium carries, and the wording rules for a reader with no access to the repo. Not for taking product decisions (decide), writing requirements (spec) or auditing a phase (check).
---

# Deliver

Goal: the exercise reads as real product work. The deliverables show the work in the order a product manager does it and end with the spec engineering receives; the video answers what the brief asks; nothing needs the repo to be understood. The three orders and their tables live in `docs/11_storyline.md` (D-083).

## Input

- `docs/11_storyline.md`, `docs/00_brief.md`, and the files each stage names there.
- The Miro board (Renier's account until the upload, D-011, D-085); the Notion page (one upload at the end, D-011, D-084).

## Orders

- **A · Deliverables, product order:** context and problem, research, discovery, options and decisions, how we will know, launch, what the change touches, the spec (last, with the prototype as reference implementation), then how the work was done. Notion one page per stage; Miro one area per stage, left to right, cards that point to the file with the detail (D-085); README lists the stages with their files.
- **B · Video, brief order:** what we propose, why, what is left out, the process [brief], with the deliverables shown only as support. Most time on what the feature does, walked in the platform's flow order. Script in `private/` until Renier says otherwise.
- **C · Follow-up session:** prepared in `private/` only.

## Steps

1. **Fit check.** Every line of the brief maps to a stage of A and a part of B; a line with none is a gap to raise.
2. **Write for a reader without the repo.** First the plain statement, then the code in brackets; every claim keeps its evidence tag; short cards, no em dashes, `[Company]` instead of angle brackets on Miro. Never cite the call or the JD (`CLAUDE.local.md`).
3. **Dry run.** Show Renier one stage in one medium before the rest.
4. **Keep in step.** When a stage's source file changes, its Notion page, Miro area and README line change in the same step, or are marked stale in `11_storyline.md`.

## Output

`docs/11_storyline.md` kept current; the board arranged in order A; the Notion draft and README in order A; the video script in order B.

## Done when

- Every brief line maps to a stage of A and a part of B.
- Notion, Miro and README follow order A, the spec last; the video script follows order B.
- No bare code and no untagged claim in anything Sherpas reads.
- Renier saw the dry run.

## Next

The step that owns each stage's content (D-081); `/check F7` before delivery.
