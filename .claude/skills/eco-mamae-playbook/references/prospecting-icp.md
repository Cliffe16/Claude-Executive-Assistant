# 00 – ICP, prospect scoring and client audit (runs before the nine gates)

The nine-gate process (§02) tells a rep how to move one deal. It does not say which prospects deserve a rep's time, or what the existing book is worth. This module fixes that. It runs **first**: score prospects against the ideal customer profile (ICP) before Gate 1, and audit existing clients on a fixed cycle using the same scorecard.

The method is standard B2B practice: define the ICP from the best existing clients, score every account on fit, value, payment health and growth headroom, band the results, then set a play per band. Scores support judgement; they do not replace a site visit or approvals.

Each company keeps its own ICP, segment weights and service catalogue in `companies/<company>.md`. Read that file before scoring. If it doesn't exist, build it first (see "Company profile" below).

## 1. The scorecard (100 points)

| Dimension | Points | What earns the points | Evidence |
|---|---|---|---|
| ICP fit | 25 | Segment priority in the company profile (protected, compliance-driven segments score highest; segments closed by a concession score lowest) | Segment of the account |
| Value | 25 | Monthly billing (clients) or estimated monthly value (prospects): ≥50k = 25, 25–50k = 20, 10–25k = 15, 5–10k = 10, >0 = 5 | AR ageing / invoices; for prospects, the profile's indicative segment value |
| Payment health | 30 | Share of balance over 60 days: <10% = 30, <30% = 22, <50% = 15, <75% = 8, else 0. Override: write-off proposed or legal = 0; not responding ≤ 5; payment promised or WHT certificate pending ≥ 12 | AR ageing, collections ledger |
| Growth headroom | 20 | How many catalogue services the segment can realistically add (from the profile). Halved for an inactive account | Company profile service map |

For **prospects** (no payment history), replace Payment health with **Access & credit risk** (30): named economic buyer and introduction path (§02A) = up to 15; contracting entity identified, no credit-term red flags (§01 disqualifiers) = up to 15.

## 2. Bands and plays

| Band | Rule | Play |
|---|---|---|
| **A – Grow** | Score ≥ 70 and monthly value ≥ KES 10,000 | Account plan, quarterly review, offer the next service from the catalogue, ask for referrals once service is stable (§08 Day 30) |
| **B – Retain & upsell** | Score 50–69 (or ≥70 but small) | Keep service tight; one targeted add-on; formalise contract/SLA if missing |
| **C – Fix terms** | Score 35–49 | Fix the problem first: reconcile disputes, reprice to cost-to-serve, tighten payment terms. No upsell until fixed |
| **D – Recover or exit** | Score < 35 | Collections protocol, provisioning or write-off decision, or a respectful exit. No new scope |
| **Win-back** | Former client: no billing and no balance | Find out why they left before pitching; re-qualify through §02A |

Prospects use the same bands: A = pursue now (Gate 1), B = pursue this quarter, C = nurture with a dated trigger, D = drop.

## 3. Always show strengths and weaknesses

Every account or prospect presented must carry:
- **Strengths:** the concrete reasons it scores well (segment, value, payment record, service fit, access to the decision-maker).
- **Weaknesses:** the concrete reasons it scores badly or risks (ageing, disputes, unknown buyer, concession overlap, small value, data gaps).
- **Recommended service(s):** from the company's catalogue only, marked with the catalogue's readiness status (active / pilot / proposed). Never recommend a service the company isn't licensed or equipped to deliver.
- **Next action · owner · date.**

## 4. Client audit SOP (existing book)

1. **Collect data:** latest AR ageing (and the previous month for trend), collections/response ledger, contract list if available. Note each source's date.
2. **One record per billed site.** Group sites under their managing agent or parent company for the account-level view.
3. **Segment** each account using the profile's rules. List anything unclassified rather than guessing.
4. **Score and band** with the scorecard above. Monthly billing is estimated from the 1–30 bucket (fallback: current bucket) unless invoices are available; say it's an estimate.
5. **Recommend services** per account from the profile's service map.
6. **Report:** portfolio summary by band and segment; A-list with strengths, weaknesses and services; C/D list with the fix or exit play; win-back list; data gaps.
7. **Repeat quarterly** and after any major pricing or service change.

## 5. Prospect identification SOP (new business)

Work from warm to cold:
1. **Expansion inside existing groups:** other buildings managed by the same managing agent, other sites of the same company. Highest conversion, lowest cost.
2. **Win-back:** former clients from the ledger, in priority segments, after learning why they left.
3. **Lookalikes:** businesses that match the A-band profile (segment, area, size) in the profile's priority geographies.
4. **Trigger-based:** new developments near handover, contract expiries, compliance deadlines, new regulations, a competitor's service failure (§06 nurture triggers).

Score each prospect with the scorecard, band it, and only then open a deal at Gate 1. A prospect with no named buyer path cannot be band A.

## 6. Company profile (`companies/<company>.md`)

Must contain: priority segments with fit and growth points; geographies in and out of scope (e.g. concession-closed areas); service catalogue with readiness status and the segments each service fits; data sources for audits; confidentiality notes. Profiles built from internal strategy documents are confidential and stay out of public repositories.
