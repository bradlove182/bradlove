# bradlove

Source for [bradlove.dev](https://bradlove.dev), the portfolio of Bradley Love, a creative web developer in Cape Town.

A Bun workspace monorepo: a SvelteKit site deployed to Cloudflare Workers with [Alchemy](https://alchemy.run), plus shared packages.

## Structure

```
apps/
  web/          SvelteKit site (Svelte 5, Tailwind CSS 4)
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

`bun run dev` starts the Alchemy dev stack, which runs the SvelteKit dev server for `apps/web`. To run only the site:

```sh
cd apps/web
bun run dev
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

Type check a workspace with `bun run check` inside `apps/web`, `packages/ui` or `packages/motion`.

## Deployment

The stack in `alchemy.run.ts` builds `apps/web` with the Cloudflare adapter and deploys it as a Cloudflare Worker. The domain depends on the stage:

| Stage        | Domain                       |
| ------------ | ---------------------------- |
| `production` | `bradlove.dev`               |
| `dev`        | `dev.bradlove.dev`           |
| other        | `<stage>.dev.bradlove.dev`   |

## License

The code in this repository is [MIT licensed](LICENSE). The logo, written content and images are © Bradley Love and may not be reused without permission.
