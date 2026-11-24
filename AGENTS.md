# AGENTS.md

## Working in this repo

- Use Bun, not npm, pnpm, or yarn. Install from the root with `bun install`.
- Create a dedicated branch and pull request for each issue. Do not commit directly to `main`.
- `bun install` runs `effect-tsgo patch --typescript --oxlint` through `prepare`. Avoid `--ignore-scripts` when setting up the toolchain.
- Dependency versions are centralized in the root Bun catalogs. Svelte workspaces intentionally use `catalog:ts6`; do not silently align them with the root TypeScript 7 catalog.

## Ticket verification gate

- Before closing an implementation ticket or starting any ticket blocked by it, pass its acceptance tests at every affected public seam, `bun run test`, affected package `check` scripts, and `bun run lint`.
- Run any browser, integration, or preview suite not covered by those commands explicitly. Record the commands and results in the ticket or its closing comment.
- Never treat unrun or failing checks as passing. Dependent work remains blocked until the gate passes.
- New implementation tickets must include user-observable acceptance criteria and this verification gate.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start Alchemy dev, which launches the `apps/web` and `apps/studio` Vite servers. |
| `bun --filter @bradlove/web dev` | Run only the web app. |
| `bun --filter @bradlove/studio dev` | Run only the Studio app. |
| `bun run build` | Run every workspace build; currently this builds the web and Studio apps. |
| `bun --filter @bradlove/web build` | Build only the web app. |
| `bun --filter @bradlove/studio build` | Build only the Studio app. |
| `bun run lint` | Run type-aware oxlint with the Effect TSGo preset. |
| `bun run fmt` | Format with oxfmt, including import and Tailwind-class sorting. |
| `bun run fmt:check` | Check formatting without writing. |
| `bun run test` | Run Bun tests. |
| `bun test path/to/file.test.ts` | Run one test file. |
| `bun --filter @bradlove/studio test:deployed` | Smoke-test the deployed Studio in Chromium. |

There is no root typecheck script. Run checks for affected packages:

```sh
bun --filter @bradlove/web check
bun --filter @bradlove/studio check
bun --filter @bradlove/ui check
bun --filter @bradlove/motion check
```

`@bradlove/core` has no `check` script. No Bun test files currently exist. The Studio browser smoke test targets `https://proto.dev.bradlove.dev` by default; set `STUDIO_URL` to override it.

## Architecture

- `apps/web` is the portfolio SvelteKit/Cloudflare application. Routes and the global layout live under `src/routes`; app-specific components and data live under `src/lib`.
- `apps/studio` is the separate prototype Studio SvelteKit/Cloudflare application. Its deployed Chromium smoke test lives in `tests/deployed.browser.ts` and runs through Playwright, not Bun.
- Packages under `packages/` are consumed directly from TypeScript/Svelte source through `workspace:*` and package export maps. Do not add `dist` imports or package build steps.
- Svelte runes mode is forced for project files in `apps/web/vite.config.ts` and `apps/studio/vite.config.ts`. Use Svelte 5 runes rather than legacy reactive statements.
- `apps/web/src/routes/+layout.ts` and `apps/studio/src/routes/+layout.ts` set `prerender = true`; new routes inherit this unless they override it.
- Tailwind 4 uses the Vite plugin and CSS-first imports/plugins in `src/routes/layout.css`, not a separate Tailwind config.
- Use the existing aliases: `#lib/*` inside `apps/web` and `#ui/*` inside `packages/ui`.
- Read `packages/motion/README.md` before changing motion behavior. CSS import order matters, and `M` intentionally supports only the tags in `packages/motion/src/types.ts`; use attachments for other elements.

## Infrastructure and deployment

- `alchemy.run.ts` is the stack entry point; resources belong in `infra/`. Extend the existing stack rather than creating an isolated one.
- `infra/web.ts` builds `apps/web`, deploys `.svelte-kit/cloudflare/_worker.js`, and serves the remaining build output as Worker assets. `infra/studio.ts` does the same for `apps/studio` through a separate Worker.
- Keep `NODE_ENV=development` in the Alchemy dev command: the Alchemy CLI otherwise passes `NODE_ENV=production` to Vite.
- Stage domains are resolved in `infra/dns.ts`: production uses `bradlove.dev`, dev uses `dev.bradlove.dev`, and other stages use `<stage>.dev.bradlove.dev`. Studio uses `getSubdomain("proto")`. Use its helpers for subdomains instead of hardcoding preview-domain rules.
- Deploy only to the `dev` stage for issue verification until release. The dev stage must mirror the production infrastructure; do not deploy to production for testing.

## Style

- Use oxfmt, not Prettier: four-space indentation, no semicolons, sorted imports, and sorted Tailwind classes.
- The root TypeScript config enables strict checks including `noUncheckedIndexedAccess`. Effect language-service diagnostics are warnings; address them rather than disabling the plugin.

## Agent skills

### Issue tracker

Issues and specs are tracked in GitHub Issues for `bradlove182/bradlove`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default canonical triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: use the root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
