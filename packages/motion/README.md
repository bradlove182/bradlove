# @bradlove/motion

Scroll-triggered animations for Svelte 5. An `IntersectionObserver` sets `data-animation-state="show" | "hide"` on elements as they enter and leave the viewport. Animations are CSS: use the built-in presets, or style the state yourself with Tailwind.

## Setup

### 1. Add the dependency

```json
// apps/<app>/package.json
{
    "dependencies": {
        "@bradlove/motion": "workspace:*"
    }
}
```

Then run `bun install` from the repo root. Restart the Vite dev server afterwards so it picks up the new package.

Peer dependencies: `svelte` 5, `tailwindcss` 4 and `tw-animate-css`. The `@bradlove/ui` theme already imports `tw-animate-css`.

### 2. Import the CSS

Import `motion.css` in the app's main stylesheet, **after** `tw-animate-css`:

```css
/* src/routes/layout.css */
@import "tailwindcss";
@import "@bradlove/ui/theme.css"; /* brings in tw-animate-css */
@import "@bradlove/motion/motion.css";
```

If you don't use `@bradlove/ui`, import `tw-animate-css` yourself before `motion.css`.

### 3. Wrap the app in `MotionProvider`

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import { MotionProvider } from "@bradlove/motion"

    let { children } = $props()
</script>

<MotionProvider>
    {@render children()}
</MotionProvider>
```

This registers one shared observer for every descendant. The provider is optional: without one, the first component that needs an observer creates it.

## Usage

### `M` components

`M.<tag>` renders that element and animates it when it scrolls into view. Each tag accepts that element's normal HTML attributes.

```svelte
<script lang="ts">
    import { M } from "@bradlove/motion"
</script>

<M.h2 animation="rise">Selected work</M.h2>
<M.div animation="fade" delay={200} class="grid gap-4">...</M.div>
<M.span animation="blur" duration={900} once>(Hello)</M.span>
```

Supported tags: `div`, `span`, `h1`, `h2`, `h3`. To add one, extend `supportedTags` in `src/types.ts`.

| Prop        | Type                                     | Default | Description                                                                     |
| ----------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `animation` | `"fade" \| "rise" \| "blur" \| "scale"` | none    | Preset from `motion.css`. Omit it to style the state yourself (see below).      |
| `delay`     | `number` (ms)                            | `0`     | Delay before entering. Leaving is never delayed.                                |
| `duration`  | `number` (ms)                            | `600`   | Animation duration.                                                             |
| `once`      | `boolean`                                | `false` | Animate in the first time only; the element stays visible after that.           |

### Presets

| Preset  | Effect                     |
| ------- | -------------------------- |
| `fade`  | Opacity                    |
| `rise`  | Opacity plus 32px upward slide |
| `blur`  | Opacity plus 8px blur      |
| `scale` | Opacity plus scale from 95% |

Presets live in the components CSS layer, so any Tailwind or `tw-animate-css` class on the element overrides them:

```svelte
<M.div animation="rise" class="slide-in-from-bottom-24 ease-out">...</M.div>
```

### Custom animations

Leave out `animation` and style `data-animation-state` with Tailwind variants:

```svelte
<M.div
    class="fade-in zoom-in-50 fill-mode-both data-[animation-state=show]:animate-in data-[animation-state=hide]:animate-out">
    ...
</M.div>
```

### Any element: `useMotion`

For elements that `M` doesn't cover, attach the observer directly:

```svelte
<script lang="ts">
    import { useMotion } from "@bradlove/motion"

    const [motion] = useMotion()
</script>

<!-- with a preset -->
<section {@attach motion} data-motion="rise">...</section>

<!-- with your own styles -->
<li {@attach motion} class="fade-in fill-mode-both data-[animation-state=show]:animate-in">...</li>
```

`useMotion()` must be called while a component is being set up (top level of `<script>`). It returns `[attachment, context]`, where the context is the shared `MotionContext`.

## Configuration

### Observer options

Pass `IntersectionObserver` options to the provider. Options are read once, when the provider mounts.

```svelte
<MotionProvider options={{ threshold: 0.25, rootMargin: "0px 0px -10% 0px" }}>
```

The default is `{ threshold: 0.1 }`. Nest another provider to give part of the page different options; everything inside it uses its own observer.

### CSS variables

Set these on an element, or on an ancestor, to tune presets:

| Variable            | Default                          |
| ------------------- | -------------------------------- |
| `--motion-duration` | `600ms`                          |
| `--motion-ease`     | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--motion-delay`    | `0ms` (entering only)            |

```svelte
<section style="--motion-ease: linear">...</section>
```

## Behaviour notes

- **SSR:** elements render on the server with no state. Elements using a preset stay hidden until the observer first reports, then animate in. This only happens when JavaScript is enabled, so content is never lost without it.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, presets drop slide, scale and blur and keep only the fade.
- **Repeat:** elements animate out when they leave the viewport and in again when they return, unless `once` is set.
- **Cleanup:** elements stop being observed when they unmount, and the observer disconnects when its provider is destroyed.
