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
- `.claude/settings.json` — project-level Claude Code settings (empty).
- `install.cmd` — stock Claude Code Windows CMD installer (`install.cmd [stable|latest|VERSION]`). Not project logic; don't modify.

## Working conventions

- Read `context/` before starting a daily task; record outcomes in `memory/`.
- Use absolute dates (YYYY-MM-DD) in `memory/` entries.
- Environment: Windows 11, repo lives under OneDrive — avoid creating large or churny files here.
