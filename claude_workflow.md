Here's the full boilerplate, built around the `CLAUDE.md` you attached. I haven't created anything.

## 1. Project init

```bash
mkdir daily-agents && cd daily-agents
git init

mkdir -p .claude/{agents,commands,skills} \
         context inbox outputs/{daily,weekly} memory logs templates

touch CLAUDE.md .claude/settings.json .gitignore \
      context/{about-me,priorities}.md \
      memory/{decisions,follow-ups}.md

claude        # start a session in the repo; run /init only if you want it to draft a CLAUDE.md for you
```

# Startup Routine

Read all files in context/ — this is your foundation
Read MEMORY.md — this is what you've learned over time
Use both to shape every task

# Memory System

When I correct you or you learn something new, update the relevant section in MEMORY.md:

- **Voice** — tone, phrasing, writing corrections
- **Process** — how I want tasks done
- **People** — who people are, relationships
- **Projects** — active work, current tasks, status
- **Output** — formats, naming, delivery preferences
- **Tools** — which tools to use and how

Keep MEMORY.md current. When something changes, update it in place — replace outdated info, don't just append below it. The file should always reflect the latest state.

## 2. Structure

```
daily-agents/
├── CLAUDE.md                      # project memory (yours, already written)
├── .gitignore
├── .claude/
│   ├── settings.json              # permissions + hooks (shared)
│   ├── settings.local.json        # personal overrides (gitignored)
│   ├── agents/
│   │   ├── inbox-triage.md
│   │   ├── daily-planner.md
│   │   ├── research-digest.md
│   │   └── weekly-reviewer.md
│   ├── commands/
│   │   ├── morning.md
│   │   ├── eod.md
│   │   ├── weekly.md
│   │   └── new-agent.md
│   └── skills/
│       └── daily-note-format/
│           └── SKILL.md
├── context/                       # you edit, agents read
│   ├── about-me.md
│   └── priorities.md
├── inbox/                         # raw drops
├── outputs/
│   ├── daily/2026-10-29.md
│   └── weekly/2026-W44.md
├── memory/                        # agents append only
│   ├── decisions.md
│   └── follow-ups.md
├── logs/
└── templates/
    ├── agent.md
    ├── command.md
    ├── skill.md
    ├── daily-output.md
    └── weekly-output.md
```

## 3. Settings: `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write(outputs/**)",
      "Edit(outputs/**)",
      "Edit(memory/**)",
      "Write(logs/**)",
      "WebSearch",
      "WebFetch"
    ],
    "deny": [
      "Write(context/**)",
      "Edit(context/**)",
      "Bash(rm:*)",
      "Read(.env*)"
    ]
  },
  "hooks": {
    "SubagentStop": [
      {
        "hooks": [
          { "type": "command", "command": "echo \"$(date -Iseconds) subagent finished\" >> logs/runs.log" }
        ]
      }
    ]
  }
}
```

`.gitignore`:
```
.claude/settings.local.json
logs/
inbox/*
!inbox/.gitkeep
```

## 4. Agent format: `.claude/agents/<name>.md`

One file per agent. Frontmatter fields: `name`, `description` (this decides when Claude delegates, so be specific), `tools` (optional allowlist), `model` (optional).

```markdown
---
name: daily-planner
description: Builds today's plan from priorities and open follow-ups. Use when the user runs /morning or asks "what should I do today".
tools: Read, Write, Glob, Grep
model: sonnet
---

You are my daily planner.

## Inputs (read in this order)
1. context/about-me.md
2. context/priorities.md
3. memory/follow-ups.md
4. Latest triage notes in outputs/daily/ (if any)

## Process
1. List open follow-ups that are due today or overdue.
2. Pick at most 3 priorities that move the top items in priorities.md.
3. Slot them into a realistic day (Africa/Nairobi time).
4. Flag anything blocked or missing as `TODO(ask):`.

## Output
Write to `outputs/daily/YYYY-MM-DD.md` using `templates/daily-output.md`.

## Rules
- Max 3 priorities. Say what you dropped and why.
- Never edit context/. Append new open items to memory/follow-ups.md.
- Drafts only; never send or publish.

## Return to caller
Two sentences: the file path and the top priority.
```

## 5. Command format: `.claude/commands/<name>.md`

The filename becomes the slash command. `$ARGUMENTS` receives what you type after it.

```markdown
---
description: Morning routine: triage the inbox, then plan the day
argument-hint: [optional focus area]
allowed-tools: Read, Write, Task
---


4. Reply with the top 3 priorities and any `TODO(ask):` items, nothing else.
```

`/new-agent` scaffolds new agents from the template:
description: Scaffold a new agent from the template
argument-hint: <agent-name> <one-line purpose>
---

Create `.claude/agents/$1.md` from `templates/agent.md`.
Purpose: $ARGUMENTS

## 6. Skill format: `.claude/skills/<name>/SKILL.md`

Skills load on demand, so use them for procedures several agents share.

```markdown
---
name: daily-note-format
description: Formatting rules for daily and weekly output files. Use whenever writing to outputs/.
---

# Daily note format

1. Start with frontmatter (date, agent, status).
2. Sections in this order: Priorities, Schedule, Follow-ups, Notes.
3. Actions are `- [ ]` checklists with an owner and due date.
4. Unknowns are written as `TODO(ask): <question>`.

See `templates/daily-output.md` for the blank version.
```

A skill folder can also hold helper scripts or reference files next to `SKILL.md`.

## 7. Context files (you write, agents read)

`context/about-me.md`
```markdown
# About me
- Role: <what you do>
- Businesses/projects: <list>
- Working hours: 08:00 to 18:00 EAT
- Communication style: concise, bullet points, no filler
- Constraints: <travel, family, recurring commitments>
```

`context/priorities.md`
```markdown
---
updated: 2026-10-29
---
# Priorities
## This quarter
1. <outcome>
2. <outcome>

## This week
- [ ] <item>

## Not now (parked)
- <item>
```

## 8. Memory files (agents append only)

`memory/follow-ups.md`
```markdown
# Follow-ups
<!-- Append only. Close items by adding a line, never by deleting. -->
- [ ] 2026-10-29 | owner: me | due: 2026-11-02 | Call transporter about quote | src: inbox/notes.md
- [x] 2026-10-27 | owner: me | closed: 2026-10-29 | Send invoice
```

`memory/decisions.md`
```markdown
# Decisions log
<!-- Append only. -->
## 2026-10-29: <short title>
- Decision: <what>
- Why: <reason>
- Revisit: <date or trigger>
```

## 9. Output templates

`templates/daily-output.md` (the format of `outputs/daily/YYYY-MM-DD.md`)
```markdown
---
date: 2026-10-29
agent: daily-planner
status: draft        # draft | final
---
# Daily plan: 2026-10-29

## Priorities (max 3)
1. **<priority>**: <why it matters today>
2. ...

## Schedule
| Time | Block | Notes |
|---|---|---|
| 08:30 | <deep work> | |

## Follow-ups due
- [ ] <item> (due <date>)

## Inbox triage
- **Actions:** <n> | **Reference:** <n> | **Discarded:** <n>

## Notes
TODO(ask): <anything you couldn't resolve>
```

`templates/weekly-output.md` (the format of `outputs/weekly/YYYY-Www.md`)
```markdown
---
date: 2026-10-30
agent: weekly-reviewer
status: draft
week: 2026-W44
---
# Week 2026-W44

## Done
- <win>

## Slipped (and why)
- <item>: <reason>

## Decisions made
- <link to memory/decisions.md entry>

## Next week: proposed priorities
1. ...

## Priority changes to approve
- [ ] <proposed edit to context/priorities.md> (you apply it, since agents can't edit context/)
```

`templates/agent.md`, the blank for `/new-agent`
```markdown
---
name: <kebab-case-name>
description: <what it does>. Use when <trigger>.
tools: Read, Write
model: sonnet
---

You are <role>.

## Inputs
## Process
## Output
Write to `<path>` using `templates/<format>.md`.
## Rules
## Return to caller
```

## 10. Suggested build order

1. Fill `context/about-me.md` and `context/priorities.md`. Every agent depends on them.
2. Add `templates/daily-output.md` and `settings.json`.
3. Write `daily-planner` and `/morning`, then run it for a week before adding more agents.
4. Add `inbox-triage`, `/eod`, then `weekly-reviewer` and `/weekly`.
5. Use `/new-agent` for every agent after that, so the roster in `CLAUDE.md` stays accurate.

Later, you can run `/morning` automatically on weekdays with a scheduled task.Fill every section. Keep `tools` to the minimum needed.
Then add a row to the Agent roster table in CLAUDE.md.
```

```markdown
---
1. Use the `inbox-triage` subagent on everything in `inbox/`.
2. Then use the `daily-planner` subagent, passing it the triage result.
3. Confirm `outputs/daily/$(date +%F).md` exists and matches the template.

