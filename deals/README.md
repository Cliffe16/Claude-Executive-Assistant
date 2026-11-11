# deals/

One Markdown file per opportunity, e.g. `deals/kilimani-300-unit.md`, copied from [`_template.md`](_template.md). The `eco-mamae-sales` agent and the `/crm-note`, `/qualify`, `/proposal` and `/handover` commands read and update these files. They are the source of truth for deal state.

Rules:
- A stage describes **evidence, not optimism**. Move a deal only when the minimum proof below exists.
- Split one-off work and recurring service into **separate files/opportunities** (e.g. construction clearance vs estate service), and never add their values together.
- Activity log is **append-only** with YYYY-MM-DD dates.
- Ethics concerns: neutral, factual wording only; no personal allegations.
- Training dialogue from the playbook is not a real client. Don't create deal files for playbook cases except as clearly labelled practice (`practice-*.md`).

## Stage definitions (playbook §07)

| Stage | Minimum proof | Don't confuse with… |
|---|---|---|
| New lead | Site and potential buyer identified. | A qualified opportunity. |
| Contacted | Reachable person engaged or correct introduction obtained. | Decision-maker interested. |
| Discovery / site visit | Need, volume and buyer path captured. | Automatic quotation eligibility. |
| Discussion | Active problem, timing and procurement process known. | A verbal yes. |
| Proposal sent | Approved priced scope delivered to buyer. | A likely win without feedback. |
| Negotiation | Specific terms / objections under active review. | Endless chasing. |
| Won | Written acceptance / PO / contract and agreed scope captured. | Service has started successfully. |
| Lost / nurture | Reason and future trigger recorded. | A deleted contact. |

Holding states: **Compliance review** (hazardous/unclassified waste – no pickup scheduled), **Ops feasibility hold** (capacity/window unconfirmed – no start promised), **Disqualified / ethics concern** (escalated to leadership).

## Nine gates (playbook §02)

1 Target → 2 Identify buyer → 3 Connect → 4 Discover → 5 Inspect → 6 Design → 7 Propose → 8 Decide → 9 Mobilise. Exit conditions: see `.claude/skills/eco-mamae-playbook/references/workflow-gates.md`.
