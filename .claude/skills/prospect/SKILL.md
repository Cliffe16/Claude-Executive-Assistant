---
name: prospect
description: Identify and rank new prospects for a company against its ICP before any deal enters the nine-gate process - expansion inside existing account groups, win-backs, lookalikes and trigger-based leads - each scored, banded and presented with strengths, weaknesses and the services to lead with.
argument-hint: <company> [segment / area / list of names or a file]
---

# /prospect

Request: $ARGUMENTS

1. Read `../eco-mamae-playbook/references/prospecting-icp.md`, the company profile `companies/<company>.md`, and the latest audit in `audits/` for that company if one exists (it supplies account groups and win-backs). Also read `../eco-mamae-playbook/references/positioning.md` (disqualifiers) and `buying-committee.md` (access).
2. **Build the candidate list, warm to cold:**
   1. Expansion inside existing groups (other sites of the same managing agent or company).
   2. Win-backs from the audit, priority segments first.
   3. Names or files the user provides.
   4. Lookalikes of the A-band clients in the profile's priority segments and geographies. If you research named companies on the web, cite the source for each and mark anything unverified. Never invent a company, contact or fact.
   5. Trigger-based leads (handovers, contract expiries, new regulations, competitor failures).
   Exclude anything in a closed or out-of-scope market in the profile (e.g. concession-covered household collection).
3. **Score each prospect** with the prospect version of the scorecard: ICP fit (25), estimated value from the profile's indicative segment values (25), access & credit risk (30), growth headroom (20). Unknowns score zero and are listed as questions.
4. **Present** in a table ranked by score, then for each band-A and band-B prospect:
   - **Strengths** and **Weaknesses** (concrete, evidence-based)
   - **Lead service** and **follow-on services** from the catalogue, with readiness status
   - **Who to reach** (role, and name only if known from a real source) and the access-ladder step to start with
   - **Next action · owner · date**
   Band C: the nurture trigger and date. Band D: one line on why it was dropped.
5. Offer to open deal files (`deals/<slug>.md`) for band-A prospects only; they then start at Gate 1.
6. Rules: no prices, no promised dates, no claims the company can't evidence, no disparaging competitors, no personal data beyond business roles.
7. End with one next action · owner · date.
