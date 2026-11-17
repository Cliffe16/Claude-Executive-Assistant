---
name: qualify
description: Qualify an Eco Mamae prospect - run the playbook disqualifiers and five-question decision-maker test, then recommend go, nurture or disqualify with reasons. Use when a rep asks whether a site or lead is worth pursuing.
argument-hint: <prospect name or description, or deals/ file>
---

# /qualify

Prospect: $ARGUMENTS

0. If the prospect hasn't been scored against the company's ICP yet, do that first (`../eco-mamae-playbook/references/prospecting-icp.md`, company profile in `companies/`) and include the score, band, strengths and weaknesses at the top of the output.
1. Read `../eco-mamae-playbook/SKILL.md` (non-negotiables), then `references/positioning.md`, `references/buying-committee.md` and `references/workflow-gates.md` from that skill. If `deals/<slug>.md` exists for this prospect, read it.
2. If the prospect matches a playbook practice case, say which one (`references/field-cases.md`).
3. Produce:

### Segment & likely pain
Segment from the positioning table, what usually hurts, who usually decides / what wins.

### Disqualifier check
Table of the five disqualifiers (No decision access · Unworkable scope · Bad economics · Commercial integrity · Payment warning) → **Clear / Risk / Triggered / Unknown**, with one line of evidence each.

### Five-question decision-maker test
| # | Question | Answer | Status (Known / Partial / Unknown) |
Use the playbook's five questions. Never treat a caretaker, guard or engineer as the buyer.

### Gate position
Current gate (1–9) and the exit condition still unmet.

### Verdict: GO / NURTURE / DISQUALIFY
- **GO** – no disqualifier triggered and a named approver or verified introduction path exists (or is clearly obtainable next).
- **NURTURE** – real fit but timing, occupancy or buyer access isn't there yet. State the trigger and the date to re-contact.
- **DISQUALIFY** – any integrity issue, or a scope/economics/payment problem with no workable fix. Ethics concerns → `Disqualified / ethics concern`, neutral note, escalate to leadership.
Give 2–4 reasons. If the opportunity should be split (e.g. one-off construction clearance + recurring service), say so and qualify each.

### Questions to ask next
3–5 questions, in the playbook's words where possible. Unless the approver and decision date are already known, include the crucial qualification question: "Suppose the proposal solves the site problem and the budget works: who else must approve it before we can begin, and when would that decision happen?"

### Next action
One action · owner · date.

4. Offer to create or update `deals/<slug>.md` from `deals/_template.md`.
