---
name: handover
description: Build the Eco Mamae sales-to-operations handover for a won deal - mandatory handover sheet, first-30-days plan and a list of gaps that block activation.
argument-hint: <won deal name or deals/ file>
---

# /handover

Deal: $ARGUMENTS

1. Read `../eco-mamae-playbook/SKILL.md`, `references/handover-retention.md` and `references/crm.md`. Read `deals/<slug>.md`.
2. Check the deal is really **Won** (written acceptance / PO / contract and agreed scope captured). If not, say what's missing and stop.
3. Output:

### Handover sheet
The eight fields (Contract & scope · Site logistics · Waste details · Route readiness · Contacts · Billing · Proof & quality · Activation), filled from the deal file. Anything missing → `MISSING`.

### Blocking gaps
Gaps that must be closed before the first collection (ops sign-off, receiving facility, eTIMS details, deposit approval, escalation contact, etc.), each with owner.

### First 30 days
Day 0 / Days 1–3 / Day 7 / Day 14 / Day 30 with actual dates calculated from the first collection date (YYYY-MM-DD), and who does each.

### Reminders
Contact the client after actual delivery, not before. The <5% missed-collection target is internal, not a guarantee. Ask for a referral only at Day 30 if service is stable.

### Next action
One action · owner · date.

4. Offer to add the handover status and 30-day dates to the deal file.
