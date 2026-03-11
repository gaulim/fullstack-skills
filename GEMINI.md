# Gemini CLI Project Instructions

> Read `AGENTS.md` for shared conventions and project overview.

## Gemini CLI Specific Rules

### Workflow
- Follow the conventions defined in `AGENTS.md`
- When developing skills, ensure compatibility with Gemini CLI's extension system
- Test MCP servers with Gemini CLI's MCP integration

### Tool Usage
- Use Gemini CLI's built-in file operations for reading and editing
- Prefer structured output when generating code or documentation

### Skills Integration
- Gemini CLI reads `GEMINI.md` for project-specific instructions
- Shared rules in `AGENTS.md` apply to all development tasks
- Ensure skill definitions include Gemini-compatible metadata

### MCP Development
- Validate MCP server compatibility with Gemini CLI's MCP client
- Test both stdio and SSE transport modes
