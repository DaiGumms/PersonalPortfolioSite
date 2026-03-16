---
name: create-github-issue-from-specification
description: "Create a GitHub Issue (bug report or feature request) from a specification or description, using the correct .github/ISSUE_TEMPLATE template."
applyTo: "**"
---

# Create GitHub Issue from Specification

Create a GitHub Issue for `DaiGumms/PersonalPortfolioSite` based on the provided specification or description.

## Templates Available

Choose the correct template based on the nature of the issue:

| Template        | Path                                         | Use for                                  | Auto-label    |
| --------------- | -------------------------------------------- | ---------------------------------------- | ------------- |
| Bug Report      | `.github/ISSUE_TEMPLATE/bug_report.yml`      | Broken behaviour, visual defects, errors | `bug`         |
| Feature Request | `.github/ISSUE_TEMPLATE/feature_request.yml` | New features, improvements, enhancements | `enhancement` |

> Blank issues are disabled (`config.yml`). Always use one of the two templates above.

## Process

1. **Load MCP tools** — call `tool_search_tool_regex` with `^mcp_github_` before using any GitHub tool.
2. **Determine template** — identify whether this is a bug or a feature request.
3. **Check for duplicates** — use `mcp_github_search_issues` with `repo:DaiGumms/PersonalPortfolioSite` before creating.
4. **Create the issue** — use `mcp_github_issue_write` with the correct title prefix and label.
5. If a matching issue already exists, add context via `mcp_github_add_issue_comment` instead.

## Issue Content by Template

### Bug Report (`bug_report.yml`)

- **Title prefix:** `[Bug]: <short description>`
- **Labels:** `bug`
- **Required fields to address in the body:**
  - Describe the bug (clear and concise)
  - Steps to reproduce (numbered list)
  - Expected behaviour
  - Screenshots / recordings (if applicable)
  - Browser (Chrome / Firefox / Safari / Edge / Other)
  - Device type (Desktop / Mobile / Tablet)
  - Additional context

### Feature Request (`feature_request.yml`)

- **Title prefix:** `[Feature]: <short description>`
- **Labels:** `enhancement`
- **Required fields to address in the body:**
  - What problem does this solve?
  - Describe the solution you'd like
  - Area of the site (Hero / About / Leadership / Projects / Community / Contact / Resume / Navigation / Theme / AI Summary Tool / Performance / Accessibility / Other)
  - Alternatives considered
  - Additional context / mockups

## Requirements

- One issue per specification — do not split into multiple issues unless explicitly asked.
- Use the exact title prefix format (`[Bug]:` or `[Feature]:`) to match template defaults.
- Always verify against existing issues before creation.
- Never create an issue without confirming there is no duplicate.
