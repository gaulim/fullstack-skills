# Fullstack Skills Plugin - Shared Agent Instructions

> This file contains shared instructions for all AI coding agents (Claude Code, Gemini CLI, etc.).
> Agent-specific configurations are in `CLAUDE.md` and `GEMINI.md`.

## Project Overview

This repository is a **Claude Code plugin** that provides:
- **Agent Skills**: Reusable skill definitions (SKILL.md) for AI coding assistants
- **Agents**: Subagent definitions for specialized tasks
- **MCP Servers**: Tool integrations for extending agent capabilities
- **Fullstack Templates**: End-to-end project scaffolding and patterns

Plugin namespace: `fullstack-skills` — skills are invoked as `/fullstack-skills:skill-name`.

## Repository Structure

```
fullstack-skills/
├── .claude-plugin/        # Plugin metadata (required for Claude Code plugin)
│   └── plugin.json            # Plugin manifest (name, version, description, paths)
├── skills/                # Agent skills (auto-discovered)
│   └── example-skill/
│       ├── SKILL.md           # Skill definition (required)
│       ├── scripts/           # Executable scripts for deterministic tasks
│       ├── references/        # Docs loaded into context as needed
│       └── assets/            # Templates, icons, fonts
├── agents/                # Subagent definitions (.md files)
├── commands/              # Slash commands (.md files)
├── hooks/                 # Hook configurations (.json)
├── scripts/               # Hook and utility scripts
├── mcp/                   # MCP server implementations (TypeScript)
├── .mcp.json              # MCP server definitions for plugin consumers
├── lib/                   # Shared library code (TypeScript)
├── templates/             # Fullstack project templates
├── evals/                 # Skill test cases and benchmarks
│   └── evals.json             # Test prompts and assertions
├── docs/                  # Documentation
├── tests/                 # Unit tests for lib/ and mcp/
├── settings.json          # Default plugin settings
├── AGENTS.md              # Shared agent instructions (this file)
├── CLAUDE.md              # Claude Code specific config
└── GEMINI.md              # Gemini CLI specific config
```

**Important**: `commands/`, `agents/`, `skills/`, `hooks/` must be at plugin root — NOT inside `.claude-plugin/`. Only `plugin.json` goes in `.claude-plugin/`.

## Development Conventions

### Language & Runtime
- Primary language: TypeScript
- Runtime: Node.js (LTS)
- Package manager: npm

### Code Style
- Use ESM (import/export), not CommonJS
- Prefer `const` over `let`, avoid `var`
- Use TypeScript strict mode
- File naming: kebab-case (e.g., `my-helper.ts`)
- Directory naming: kebab-case
- Skill files: `SKILL.md` (uppercase, markdown with YAML frontmatter)

### Git Conventions
- Branch naming: `feat/`, `fix/`, `docs/`, `refactor/` prefixes
- Commit messages: conventional commits (feat:, fix:, docs:, chore:, refactor:)
- Always create feature branches, never commit directly to main

### Skill Development
- Each skill is a **directory** in `skills/` containing a `SKILL.md` file (not a TypeScript module)
- `SKILL.md` uses YAML frontmatter for metadata and markdown body for instructions:
  ```yaml
  ---
  name: skill-name
  description: When and why to use this skill. Include specific trigger phrases.
  version: 1.0.0
  ---
  ```
- Required frontmatter: `name`, `description`
- Optional frontmatter: `version`, `disable-model-invocation`
- Description is the primary trigger mechanism — be specific and include concrete user phrases that should activate the skill (e.g., "Use when the user asks to 'create a hook', 'add a PreToolUse hook'")
- Skills use a 3-level loading system:
  1. **Metadata** (name + description) — always in context (~100 words)
  2. **SKILL.md body** — loaded when skill triggers (keep under 500 lines)
  3. **Bundled resources** (scripts/, references/, assets/) — loaded as needed
- For large reference docs (300+ lines), split into separate files in `references/` with a table of contents
- Scripts in `scripts/` handle deterministic/repetitive tasks without loading into context
- Write skills to be agent-agnostic where possible; agent-specific behavior goes in CLAUDE.md/GEMINI.md

### Agent Development
- Each agent is a `.md` file in `agents/`
- Agents are specialized subagents that can be spawned for focused tasks
- Agent `.md` files use YAML frontmatter for metadata and markdown body for instructions:
  ```yaml
  ---
  name: agent-name
  description: When and why to spawn this agent. Include task types it handles.
  tools:
    - Read
    - Glob
    - Grep
  ---
  ```
- Required frontmatter: `name`, `description`, `tools`
- The `tools` field restricts which tools the subagent can access
- Define the agent's role, behavioral constraints, and expected response format in the body
- Keep agents focused on a single responsibility

### MCP Server Development
- MCP server implementations live in `mcp/` (TypeScript)
- Plugin consumers configure MCP servers via `.mcp.json` at plugin root
- Follow the MCP specification for tool definitions
- Include JSON Schema for all tool parameters
- Provide both stdio and HTTP transport options where applicable

### Hook Development
- Hook configurations live in `hooks/` as JSON files
- Hooks respond to events: PreToolUse, PostToolUse, Stop, etc.
- Hook scripts live in `scripts/` and are referenced from hook config
- Use `${CLAUDE_PLUGIN_ROOT}` variable for paths in hook commands

## Quality Standards
- All public APIs must have TypeScript types
- Write tests for core logic
- Test skills with eval prompts in `evals/`
- Document breaking changes in CHANGELOG.md
- Keep dependencies minimal

## Key Principles
1. **Agent-agnostic first**: Design skills and tools to work across multiple AI agents
2. **Composable**: Skills and MCP tools should be independently usable
3. **Type-safe**: Leverage TypeScript for reliability
4. **Minimal**: Only include what's necessary; avoid bloat
