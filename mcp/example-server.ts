/**
 * Example MCP Server for fullstack-skills plugin.
 *
 * Demonstrates the standard pattern for creating MCP servers:
 * - McpServer initialization with name/version
 * - Tool registration with Zod input schemas
 * - Stdio transport for Claude Code integration
 *
 * Run: npx tsx mcp/example-server.ts
 * Add to Claude: claude mcp add example-server -- npx tsx mcp/example-server.ts
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";

const server = new McpServer({
  name: "fullstack-skills-example",
  version: "0.1.0",
});

// Example tool: echo back input with metadata
server.registerTool(
  "echo",
  {
    title: "Echo",
    description:
      "Echo back the input text with a timestamp. Useful for testing MCP connectivity.",
    inputSchema: z.object({
      text: z.string().describe("Text to echo back"),
    }),
  },
  async ({ text }) => ({
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            echo: text,
            timestamp: new Date().toISOString(),
            server: "fullstack-skills-example",
          },
          null,
          2
        ),
      },
    ],
  })
);

// Example tool: list plugin structure
server.registerTool(
  "plugin-info",
  {
    title: "Plugin Info",
    description:
      "Return information about the fullstack-skills plugin structure.",
    inputSchema: z.object({}),
  },
  async () => ({
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            name: "fullstack-skills",
            version: "0.1.0",
            components: {
              skills: "skills/    — Agent skills (SKILL.md)",
              agents: "agents/    — Subagent definitions (.md)",
              commands: "commands/  — Slash commands (.md)",
              hooks: "hooks/     — Event handler configs (.json)",
              mcp: "mcp/       — MCP server implementations (.ts)",
            },
          },
          null,
          2
        ),
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("fullstack-skills example MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
