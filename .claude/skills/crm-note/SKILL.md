---
name: crm-note
description: Turn an Eco Mamae rep's rough meeting notes into a strong evidence-based CRM record - stage with proof, buyer map, risks, next action with owner and date - and update the deal file in deals/.
argument-hint: <prospect name> + paste rough notes
---

# /crm-note

Input: $ARGUMENTS

1. Read `../eco-mamae-playbook/SKILL.md`, `references/crm.md`, `references/workflow-gates.md` and `references/buying-committee.md`. Read `deals/<slug>.md` if it exists, plus `deals/README.md`.
2. Write the record:

### Strong note (2–3 lines)
In the playbook's "strong" style: facts, numbers, names/roles, dates, next step. No "good meeting", "interested", "follow up later".

### Stage
Proposed stage + the minimum proof that supports it. If the evidence doesn't meet the stage the rep claimed, say so and give the correct stage. Use holding states where they apply (Compliance review, Ops feasibility hold, Disqualified / ethics concern).

### Buyer map
Daily user · Operational champion · Economic buyer · Procurement/finance · Signatory/veto – name/role or `UNKNOWN`.

### Required fields
Fill the playbook's coaching-record fields (who uses service, economic buyer & signatory, influencer/introducer, decision path & date, customer-facing incentive, approval status, next agreed action).

### Value
Recurring monthly and one-off **separately**. Only use figures that are approved; otherwise `pending approval`.

### Gaps & red flags
Missing facts from the seven facts and five decision-maker questions; any rule triggers (hazardous waste, ethics, credit terms, unconfirmed dates/windows).

### Next action
One action · owner · date.

3. Show the diff you'd make to `deals/<slug>.md` (create from `deals/_template.md` if new), then write it. Append to the activity log with today's date (YYYY-MM-DD); never rewrite earlier log entries. For ethics concerns keep the note neutral and factual.
