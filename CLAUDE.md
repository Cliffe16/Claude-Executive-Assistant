# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A file-based workspace for daily Claude Code agents. There is no application code, build, lint, or test tooling — the "state" is plain Markdown that agents read at the start of a task and update as they work. All files are currently empty scaffolding; fill them in rather than assuming content.

## Layout

- `context/` — stable background, read before acting:
  - `about-me.md` — who the user is, role, preferences.
  - `priorities.md` — current goals; use it to decide what matters when triaging.
- `memory/` — running logs that agents append to:
  - `decisions.md` — decisions made and why (append; don't rewrite history).
  - `follow-ups.md` — open items to revisit; remove or mark items once done.
- `deals/` — Eco Mamae sales opportunities, one file per deal (see below).
- `.claude/agents/eco-mamae-sales.md` — the Eco Mamae sales co-pilot subagent.
- `.claude/skills/eco-mamae-playbook/` — the Sales Field Playbook v3.0 as structured reference (`references/` = one file per module).
- `.claude/skills/{qualify,site-visit-prep,crm-note,proposal,objection,handover,roleplay,followup}/` — sales slash commands.
- `.claude/settings.json` — project-level Claude Code settings (empty).
- `install.cmd` — stock Claude Code Windows CMD installer (`install.cmd [stable|latest|VERSION]`). Not project logic; don't modify.

## Working conventions

- Read `context/` before starting a daily task; record outcomes in `memory/`.
- Use absolute dates (YYYY-MM-DD) in `memory/` entries.
- Environment: Windows 11, repo lives under OneDrive — avoid creating large or churny files here.

## Eco Mamae sales agent

A sales co-pilot for Eco Mamae Solutions Ltd (waste management, Nairobi/Kenya), built from the *Sales Field Playbook v3.0, 30 Oct 2026*. It supports reps and managers; it never commits the company to anything.

**Use it** by asking about any Eco Mamae deal (the `eco-mamae-sales` subagent picks it up), or with a command:

| Command | Does |
|---|---|
| `/qualify <prospect>` | Disqualifiers + five-question decision-maker test → GO / NURTURE / DISQUALIFY |
| `/site-visit-prep <site>` | 15-minute visit plan, seven facts, access-ladder questions |
| `/crm-note <prospect> <notes>` | Evidence-based CRM record; updates `deals/<slug>.md` |
| `/proposal <prospect>` | Six-line spec + two scope options + stop-signs (DRAFT for approval) |
| `/objection <what they said>` | Playbook response, scope trade, close |
| `/handover <deal>` | Handover sheet, 30-day plan, blocking gaps |
| `/roleplay <case/drill>` | Claude plays the buyer, then scores the rep /20 |
| `/followup <type> <prospect>` | WhatsApp/email drafts per the follow-up rhythm |

Deal state lives in `deals/` (template `deals/_template.md`, stage rules `deals/README.md`), not in conversation memory. Activity logs are append-only with YYYY-MM-DD dates.

### Rules (never break)
- Never invent prices, tariffs, costs, recycling/recovery %, capacity, start dates or collection windows. Section 05 KES figures are illustrative training numbers, not a price list. Pricing, discounts, free months, deposit waivers, credit terms and bin support need the authorised commercial approver; dates and windows need dispatch/ops sign-off.
- Hazardous, chemical or medical waste (e.g. drums that held acid) is never quoted as general waste: stop, request SDS/documentation, escalate to compliance.
- No personal payments, "appreciation", kickbacks, disguised discounts or side deals: decline, neutral note, escalate to leadership, mark `Disqualified / ethics concern`.
- Incentives benefit the customer organisation only, and are recorded in the signed quotation/contract.
- Stage = evidence, not optimism; don't advance a gate until its exit condition is met. Keep recurring monthly value separate from one-off work.
- A caretaker or site contact is not the decision-maker: identify economic buyer, signatory and veto holder.
- Never attack competitors; compare like for like.
- Service recovery: acknowledge, verify with dispatch, specific update time, close the loop with evidence; don't blame drivers.
- Every output ends with one next action, owner and date.
- Playbook dialogue is composite training material, not real client history.

### Known gaps in the source PDF
The 25-second positioning statement and the four message templates (cold call, intro request, after-visit WhatsApp, proposal email) had no extractable text; several tables (nine gates, CRM stages, scoring rubric) were reconstructed from garbled extraction. Confirm with Sales leadership.
