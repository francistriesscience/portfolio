# Generator Usage

This generator owns the content pipeline for the portfolio site.

It reads note source from `apps/generator/contents/notes`, generates note modules into `apps/web/lib/generated`, and renders social preview assets into `apps/generator/public/og/notes`.

## Commands

Run these from `apps/generator` unless noted otherwise.

- `go run ./cmd/generator notes`
  - Regenerates the note TypeScript output only.
- `go run ./cmd/generator ogs`
  - Regenerates the social preview images only.
- `go run ./cmd/generator sync`
  - Runs notes generation and OG generation in sequence.
- `go run ./cmd/generator watch`
  - Watches generator inputs and reruns the full pipeline on change.

Convenience wrappers exist in `apps/generator`:

- `bun run --cwd apps/generator notes`
- `bun run --cwd apps/generator ogs`
- `bun run --cwd apps/generator sync`
- `bun run --cwd apps/generator build`
- `bun run --cwd apps/generator watch`
- `make notes`
- `make ogs`
- `make build`
- `make watch`

## Inputs

- Notes live in `apps/generator/contents/notes/*.mdx`
- OG template lives in `apps/generator/templates/og.html`
- DM Sans font assets live in `apps/generator/public/fonts/dm-sans/`

Each note can include an `og` frontmatter field. If it is present, the generator uses that path for the note card image. If it is missing, the generator falls back to `/og/notes/<slug>.png`.

## Outputs

- Generated note modules:
  - `apps/web/lib/generated/notes.generated.ts`
  - `apps/web/lib/generated/notes/*.ts`
- Social previews:
  - `apps/web/public/og.webp`
  - `apps/generator/public/og/notes/*.png`

## Editing Workflow

1. Edit or add a note in `apps/generator/contents/notes`.
2. Update the note frontmatter, including `og` if you want a custom output path.
3. Run `bun run --cwd apps/generator sync`.
4. Review the generated files in `apps/web/lib/generated` and `apps/generator/public/og/notes`.
5. Upload the PNGs to your image host of choice and update the note `og` frontmatter values to those URLs.
6. Run `bun run --cwd apps/web build` to verify the site.

## Notes

- `bun run dev` at the repository root only starts `apps/web`; it does not run the generator.
- The site does not generate notes or OGs at runtime.
- The generator may install Chromium the first time OGs are rendered if a compatible browser is not already present in the local Playwright cache.
- `apps/web` should stay deploy-only and consume the generated outputs.
- Note PNGs are staging artifacts and are not expected to be served by the web app directly once you switch `og` frontmatter to hosted URLs.
