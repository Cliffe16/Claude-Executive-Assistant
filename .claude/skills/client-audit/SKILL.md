---
name: client-audit
description: Audit a company's existing client book against its ICP - score every account on fit, value, payment health and growth headroom, band it (Grow / Retain & upsell / Fix terms / Recover or exit / Win-back), and present each with strengths, weaknesses and recommended alternative services. Use for Zoa Taka, Eco Mamae or any company with a profile in companies/.
argument-hint: <company> [path to AR ageing / client list]
---

# /client-audit

Request: $ARGUMENTS

1. Read `../eco-mamae-playbook/references/prospecting-icp.md` (the SOP and scorecard) and the company profile `companies/<company>.md` plus `companies/<company>.profile.json`. If there's no profile, stop and build one first from the company's strategy documents (ask the user where they are). Profiles are confidential: never write them anywhere that is committed or published.
2. **Get the data.** Use the sources listed in the profile unless the user gives newer ones. Note each source's date; flag anything older than 90 days.
   - Excel ageing reports: convert with `powershell -File scripts/xlsx2txt.ps1 -Path <xlsx> -OutDir <scratch dir>` (one text file per sheet).
   - Score with `node scripts/score_clients.js --profile companies/<company>.profile.json --ageing <latest.txt> [--ageing <older.txt>] [--schedule <collections ledger.txt>] [--crm <CRM customer master.txt>] --out audits/<YYYY-MM-DD>-<company>/`. With `--crm`, sub-segments listed in the profile's `crmSubSegmentMap` override the name rules, and CRM status (active/dormant/churned) is added to each account; check the CRM's labels before trusting them.
   - Other formats: apply the same scorecard by hand and say so.
3. **Check the result before reporting:** list the largest accounts left in the catch-all segment and fix the profile rules if any are obviously misclassified, then rerun. Sanity-check the biggest monthly-billing estimates against the raw rows (two invoices in the current bucket can double an estimate).
4. **Report** (save as `audits/<YYYY-MM-DD>-<company>/report.md`; the `audits/` folder is git-ignored):
   - Data sources and dates; what the monthly figure is (an estimate: median of the 1–30 bucket across the ageing snapshots).
   - Portfolio summary: accounts, billing and balance by band and by segment; concentration (top 10 share of billing).
   - **A – Grow:** each account with **Strengths**, **Weaknesses**, **Recommended services** (from the catalogue, with readiness status) and **Next action · owner · date**.
   - **B – Retain & upsell:** top accounts by value, same format, shorter.
   - **C – Fix terms / D – Recover or exit:** the fix or exit play per account, following the company's escalation protocol. No upsell here.
   - **Account groups:** managing agents and multi-site companies, with expansion potential.
   - **Win-back:** former clients in priority segments, with "find out why they left" as the first step.
   - **Data gaps** that limit the audit.
5. Rules: recommend only services the profile marks active or pilot (say which); never quote prices (use `[KES – pending commercial approval]`); treat legal/penalty claims from marketing notes as unverified; collections actions follow the company's escalation protocol and approval limits; keep client data out of anything public.
6. End with one next action · owner · date.
