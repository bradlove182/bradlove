# @bradlove/web

The SvelteKit site behind [bradlove.dev](https://bradlove.dev). Svelte 5 with runes, Tailwind CSS 4, every page prerendered, and served from a Cloudflare Worker.

## Development

From this directory:

```sh
bun run dev       # Vite dev server, opens the browser
bun run check     # svelte-kit sync + svelte-check
bun run build     # production build to .svelte-kit/cloudflare
bun run preview   # preview the production build
```

From the repo root, `bun run dev` runs this same dev server through the Alchemy dev stack.

## Structure

```
src/
  app.d.ts                  App.PageData: every page returns { title, description }
  lib/
    assets/                 favicon
    components/
      page-transition/      Lotus route transition (overlay, lotus.ts geometry)
      hero.svelte           Home hero with the logo mark
      logo.svelte           12-petal rosette logo
      mandala.svelte        Animated mandala drawing
      marquee.svelte        Scrolling keyword marquee
      navigation.svelte     Header and mobile menu
      page-header.svelte    Shared page heading
      footer.svelte
  routes/
    +layout.svelte          Navigation, MotionProvider, page transition, footer
    +layout.ts              prerender = true
    layout.css              Tailwind, @bradlove/ui theme, @bradlove/motion presets
    +page.svelte            Home
    about/  work/  services/  contact/
```

Imports use the `#lib/*` alias, mapped to `src/lib/*` in `package.json` under `imports`.

## Pages

Each route has a `+page.ts` that returns `title` and `description`. The page transition preloads this data for the destination and shows it on the overlay while the next page loads.

To add a page, create `src/routes/<name>/+page.svelte` and a `+page.ts`:

```ts
import type { PageLoad } from "./$types"

export const load: PageLoad = () => ({
    title: "Name",
    description: "Short tagline",
})
```

Then add it to the links in `navigation.svelte`.

## Page transition

`page-transition.svelte` hooks into `onNavigate`. On each navigation it:

1. Blooms lotus petal rings over the page.
2. Preloads the destination's data and shows its title.
3. Swaps the route while the page is covered.
4. Uncovers the new page.

The transition is skipped for shallow routing, same-path links and `prefers-reduced-motion`.

## Shared packages

| Package            | Used for                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| `@bradlove/ui`     | Theme (`theme.css`), base components (button, navigation menu, popover, sheet), icons, `cn` |
| `@bradlove/motion` | Scroll-triggered animations: `M.*` components, element presets and per-letter text reveals; see [its README](../../packages/motion/README.md) |

## Deployment

Built with `@sveltejs/adapter-cloudflare` and deployed as a Cloudflare Worker by the Alchemy stack at the repo root. See the [root README](../../README.md#deployment).
