# fullstack-skills

A **Claude Code plugin** that provides reusable skills, agents, and MCP tools for fullstack development.

## Quick Start

### Install as a Plugin

```bash
claude plugin add /path/to/fullstack-skills
```

### Install Dependencies

```bash
npm install
```

### Verify TypeScript

```bash
npm run build
```

## What's Included

### Skills (`skills/`)

Reusable skill definitions that Claude loads on demand. Each skill is a directory containing a `SKILL.md` with YAML frontmatter.

| Skill | Description |
|-------|-------------|
| `example` | Reference skill showing the standard SKILL.md format |

Invoke a skill: `/fullstack-skills:skill-name`

### Agents (`agents/`)

Specialized subagents for focused task delegation. Each agent is a `.md` file with frontmatter defining its name, description, and allowed tools.

| Agent | Description |
|-------|-------------|
| `example-agent` | Reference agent showing the standard definition format |

### Commands (`commands/`)

Slash commands that users can invoke directly.

| Command | Description |
|---------|-------------|
| `/hello` | Greet the user and display plugin info |

### MCP Servers (`mcp/`)

MCP (Model Context Protocol) tool servers that extend Claude's capabilities. Configured in `.mcp.json`.

| Server | Tools | Description |
|--------|-------|-------------|
| `fullstack-skills-example` | `echo`, `plugin-info` | Example server demonstrating the MCP pattern |

### Hooks (`hooks/`)

Event handlers that respond to Claude Code lifecycle events (PreToolUse, PostToolUse, Stop, etc.).

## Plugin Structure

```
fullstack-skills/
├── .claude-plugin/
│   └── plugin.json         # Plugin manifest (name, version, description)
├── skills/                 # Agent skills (auto-discovered)
│   └── skill-name/
│       ├── SKILL.md        # Skill definition (required)
│       ├── scripts/        # Executable scripts
│       ├── references/     # Docs loaded as needed
│       └── assets/         # Templates, icons, fonts
├── agents/                 # Subagent definitions (.md)
├── commands/               # Slash commands (.md)
├── hooks/                  # Event handler configs (.json)
├── scripts/                # Hook and utility scripts
├── mcp/                    # MCP server implementations (.ts)
├── lib/                    # Shared library code (.ts)
├── templates/              # Fullstack project templates
├── evals/                  # Skill test cases and benchmarks
├── tests/                  # Unit tests
├── .mcp.json               # MCP server definitions
├── AGENTS.md               # Shared agent instructions
├── CLAUDE.md               # Claude Code config
└── GEMINI.md               # Gemini CLI config
```

> Component directories (`skills/`, `agents/`, `commands/`, `hooks/`) must be at plugin root, not inside `.claude-plugin/`.

## Creating a New Skill

1. Create a directory: `skills/my-skill/`
2. Add `SKILL.md` with frontmatter:

```yaml
---
name: my-skill
description: |
  What this skill does and when to trigger it.
  Include specific user phrases like "create a REST API" or "scaffold a Next.js app".
version: 1.0.0
---

# My Skill

Instructions for Claude go here.
```

3. (Optional) Add `scripts/`, `references/`, or `assets/` subdirectories
4. Add test cases to `evals/evals.json`

Skills use a 3-level loading system:
- **Metadata** (name + description) -- always in context
- **SKILL.md body** -- loaded when skill triggers (keep under 500 lines)
- **Bundled resources** -- loaded as needed

## Creating a New Agent

Create a `.md` file in `agents/`:

```yaml
---
name: my-agent
description: What this agent does and when to spawn it.
tools:
  - Read
  - Glob
  - Grep
---

# My Agent

Role, instructions, constraints, and response format.
```

## Adding an MCP Server

1. Create the server in `mcp/my-server.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";

const server = new McpServer({ name: "my-server", version: "0.1.0" });

server.registerTool("my-tool", {
  title: "My Tool",
  description: "What this tool does.",
  inputSchema: z.object({ input: z.string() }),
}, async ({ input }) => ({
  content: [{ type: "text", text: `Result: ${input}` }],
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

2. Register in `.mcp.json`:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["tsx", "${CLAUDE_PLUGIN_ROOT}/mcp/my-server.ts"]
    }
  }
}
```

3. Test locally: `claude mcp add my-server -- npx tsx mcp/my-server.ts`

## Development

```bash
npm run build       # Compile TypeScript
npm run dev         # Watch mode
npm run lint        # Lint
npm test            # Run tests
```

### Conventions

- **Language**: TypeScript (ESM, strict mode)
- **Runtime**: Node.js >= 20
- **File naming**: kebab-case
- **Git branches**: `feat/`, `fix/`, `docs/`, `refactor/` prefixes
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)

See [AGENTS.md](./AGENTS.md) for full development guidelines.

## Requirements

- Node.js >= 20.0.0
- Claude Code (for plugin integration)

## License

[MIT](./LICENSE)
