# Portfolio

Personal portfolio monorepo for `francistries.science`.

The main app lives in `apps/web` and is built with Next.js. It includes the landing pages, projects, and a notes section powered by local MDX files from `apps/web/contents/notes`.

## Stack

- Bun workspaces
- Turborepo
- Next.js App Router
- Tailwind CSS
- OpenNext for Cloudflare deployment
- MDX note content generated into TypeScript before build

## Project Structure

```text
.
├── apps/
│   └── web/
│       ├── app/                 # Next.js routes
│       ├── components/          # UI and page components
│       ├── contents/notes/      # Source MDX notes
│       ├── lib/generated/notes/ # Generated note modules
│       └── scripts/             # Local build helpers
└── packages/                    # Shared packages
```

## Notes Workflow

Notes are authored as `.mdx` files in:

```text
apps/web/contents/notes
```

Each note needs frontmatter such as:

```md
---
title: Example Note
description: Short summary
date: 2026-04-19
tags:
  - Example
draft: false
---
```

### Generate Notes

Generate the note modules locally with:

```bash
bun run --cwd apps/web generate:notes
```

This reads every `.mdx` file in `apps/web/contents/notes` and generates:

- one TypeScript file per note in `apps/web/lib/generated/notes/`
- an index file at `apps/web/lib/generated/notes.generated.ts`

Example:

```text
apps/web/contents/notes/my-note.mdx
-> apps/web/lib/generated/notes/my-note.ts
```

### Why This Exists

The notes are generated ahead of time so production does not need to read MDX files from the filesystem at runtime. This is important for the Cloudflare/OpenNext deployment target.

### Recommended Note Editing Flow

1. Add or edit a note in `apps/web/contents/notes`.
2. Run `bun run --cwd apps/web generate:notes`.
3. Review the generated files in `apps/web/lib/generated/notes/`.
4. Run `bun run --cwd apps/web build` to verify the site.
5. Commit both the source `.mdx` file and the generated TypeScript output.

## Notes

- If notes change, regenerate them before pushing.
- Generated note files are part of the deployable app output and should stay in sync with the source MDX files.
- If you later decide to stop generating during CI, this README still supports a local-first generation workflow.
