---
name: create-github-pull-request-from-specification
description: "Create a GitHub Pull Request for DaiGumms/PersonalPortfolioSite using the .github/PULL_REQUEST_TEMPLATE.md template."
applyTo: "**"
---

# Create GitHub Pull Request

Create a Pull Request for `DaiGumms/PersonalPortfolioSite` targeting `master` (default) or another specified base branch.

## PR Template

Template location: `.github/PULL_REQUEST_TEMPLATE.md`

The template has these sections — populate all that apply:

```
## Summary
<!-- What this PR does and why -->

## Changes
<!-- Bullet list of key changes -->

## Type of change
- [ ] Bug fix
- [ ] New feature / section
- [ ] Content update (copy, images, data)
- [ ] Style / UI change
- [ ] Refactor
- [ ] Dependency update
- [ ] CI / config change

## Checklist
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` completes without errors
- [ ] Tested in both light and dark mode
- [ ] Tested on mobile viewport
- [ ] No hardcoded hex colours — Tailwind semantic classes used throughout
- [ ] New components follow existing conventions
- [ ] If adding a new section: imported and added to `src/app/page.tsx`
- [ ] If adding secrets or env vars: `apphosting.yaml` updated and Firebase Secret Manager updated

## Screenshots / recordings
<!-- Before/after screenshots for visual changes (light + dark) -->

## Related issues
<!-- Closes #123 -->
```

## Process

1. **Load MCP tools** — call `tool_search_tool_regex` with `^mcp_github_` before using any GitHub tool.
2. **Check for an existing PR** on the current branch using `mcp_github_list_pull_requests` (filter by `head` branch). If one exists, skip to step 5.
3. **Create a draft PR** using `mcp_github_create_pull_request` with `draft: true` targeting the base branch (default: `master`).
4. **Analyse changes** by reading the PR diff/files via `mcp_github_pull_request_read` to understand what changed.
5. **Populate the template** — build the PR body using `.github/PULL_REQUEST_TEMPLATE.md` sections, filling in Summary, Changes, ticking the correct Type of change boxes, and adding Related issues.
6. **Update the PR** — use `mcp_github_update_pull_request` to set the final title and populated body, then set `draft: false` to mark it ready for review.
7. **Assign the author** — use `mcp_github_get_me` to get the current username, then use `mcp_github_update_pull_request` to assign it.
8. **Return the PR URL** to the user.

## Requirements

- One PR per feature branch — do not create duplicates.
- Title must be concise and descriptive (no template prefix needed).
- All checklist items in the template must be present in the PR body (unchecked by default; David ticks them manually).
- Always link related issues using `Closes #<number>` if known.
- Never force-push or reset the branch without explicit confirmation from David.
