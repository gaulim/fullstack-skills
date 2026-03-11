---
name: example
description: |
  Example skill demonstrating the standard SKILL.md format for the fullstack-skills plugin.
  Use this as a reference when creating new skills. Trigger when the user asks
  "show me an example skill", "how to write a skill", or "skill template".
version: 1.0.0
---

# Example Skill

This is a reference skill showing the correct structure. Use it as a starting point for new skills.

## What This Skill Does

Demonstrates the standard pattern for fullstack-skills plugin skills:
- YAML frontmatter with required `name` and `description` fields
- Markdown body with instructions (keep under 500 lines)
- Optional bundled resources in `scripts/`, `references/`, `assets/`

## How to Create a New Skill

1. Create a directory under `skills/` with a kebab-case name
2. Add a `SKILL.md` file with YAML frontmatter
3. Write instructions in the markdown body
4. Add test cases to `evals/evals.json`

## Skill Directory Structure

```
skills/my-skill/
├── SKILL.md           # Required: skill definition
├── scripts/           # Optional: executable scripts for deterministic tasks
├── references/        # Optional: docs loaded into context as needed
└── assets/            # Optional: templates, icons, fonts
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Skill identifier (kebab-case) |
| `description` | Yes | When/why to use this skill. Primary trigger mechanism. |
| `version` | No | Semantic version |
| `disable-model-invocation` | No | Prevent auto-triggering (user-only invocation) |

## Tips

- Description is the primary trigger mechanism. Be specific and include concrete user phrases.
- Keep SKILL.md body under 500 lines. For large references, split into `references/` files.
- Scripts in `scripts/` handle deterministic/repetitive tasks without loading into context.
- Write skills to be agent-agnostic where possible.
