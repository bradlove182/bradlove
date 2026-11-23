# bradlove

Source for [bradlove.dev](https://bradlove.dev), the portfolio of Bradley Love, a creative web developer in Cape Town.

A Bun workspace monorepo: SvelteKit sites deployed to Cloudflare Workers with [Alchemy](https://alchemy.run), plus shared packages.

## Structure

```
apps/
  web/          Portfolio SvelteKit site (Svelte 5, Tailwind CSS 4)
  studio/       Prototype Studio SvelteKit app and deployed-browser smoke test
packages/
  ui/           Shared components, theme and icons (shadcn-svelte, bits-ui)
  motion/       Scroll-triggered animations (M components, presets, MotionProvider)
  core/         Shared Effect schemas
infra/          Alchemy resources: Cloudflare Worker, domains and stages
alchemy.run.ts  Alchemy stack entry point
```

Packages are consumed from source through `workspace:*`; there is no build step. See [`packages/motion/README.md`](packages/motion/README.md) for how to use the motion package.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) with Svelte 5 runes
- [Tailwind CSS 4](https://tailwindcss.com) and [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)
- [shadcn-svelte](https://shadcn-svelte.com) and [bits-ui](https://bits-ui.com)
- [Effect](https://effect.website) for schemas and infrastructure code
- [Alchemy](https://alchemy.run) with Cloudflare Workers for infrastructure and deploys
- [Bun](https://bun.sh) for the package manager, workspaces and runtime
- [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for linting and formatting

## Getting started

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

`bun run dev` starts the Alchemy dev stack, which runs the SvelteKit dev servers for `apps/web` and `apps/studio`. To run only one app:

```sh
bun --filter @bradlove/web dev
bun --filter @bradlove/studio dev
```

## Scripts

Run from the repo root:

| Script             | Description                                    |
| ------------------ | ---------------------------------------------- |
| `bun run dev`      | Start the Alchemy dev stack                    |
| `bun run build`    | Build every workspace that has a build script  |
| `bun run lint`     | Lint with oxlint (`lint:fix` to apply fixes)   |
| `bun run fmt`      | Format with oxfmt (`fmt:check` to verify only) |
| `bun run test`     | Run tests with Bun                             |
| `bun --filter @bradlove/studio test:deployed` | Smoke-test the deployed Studio in Chromium |

Type check a workspace with `bun run check` inside `apps/web`, `apps/studio`, `packages/ui` or `packages/motion`.

## Deployment

The stack in `alchemy.run.ts` builds `apps/web` and `apps/studio` with the Cloudflare adapter and deploys them as separate Cloudflare Workers. Their domains depend on the stage:

| Stage        | Portfolio domain             | Studio domain                     |
| ------------ | ---------------------------- | --------------------------------- |
| `production` | `bradlove.dev`               | `proto.bradlove.dev`              |
| `dev`        | `dev.bradlove.dev`           | `proto.dev.bradlove.dev`          |
| other        | `<stage>.dev.bradlove.dev`   | `proto-<stage>.dev.bradlove.dev`  |

After installing Chromium with `bunx playwright install chromium`, run the deployed Studio smoke test with:

```sh
bun --filter @bradlove/studio test:deployed
```

The test targets production by default. Set `STUDIO_URL` to test another deployed stage.

## License

The code in this repository is [MIT licensed](LICENSE). The logo, written content and images are © Bradley Love and may not be reused without permission.
