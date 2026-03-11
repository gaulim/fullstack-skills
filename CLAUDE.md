# Claude Code Project Instructions

> Read `AGENTS.md` for shared conventions and project overview.

## Claude Code Specific Rules

### Tool Usage
- Use dedicated tools (Read, Edit, Write, Glob, Grep) over Bash equivalents
- Use Agent tool for complex multi-step research tasks
- Use MCP tools when interacting with external services

### Workflow
- Follow PDCA methodology when developing features
- Run `/pdca plan` before starting new features
- Use gap-detector after implementation for verification
- Use code-analyzer for quality checks

### Skills Integration
- This repo develops skills compatible with Claude Code's skill system
- Skill files use `.md` format with frontmatter hooks
- Test skills by loading them in the local `.claude/` configuration

### MCP Development
- Test MCP servers locally with `claude mcp add` before committing
- Validate tool schemas against Claude's tool use specification
