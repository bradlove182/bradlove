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
@import "@bradlove/ui/themes/base.css"; /* brings in tw-animate-css */
@import "@bradlove/ui/themes/lime.css";
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

`M.<tag>` renders that element and animates it. Each tag accepts that element's normal HTML attributes. One `animation` prop picks the effect, from three kinds:

```svelte
<script lang="ts">
    import { M } from "@bradlove/motion"
</script>

<M.h2 animation="rise">Selected work</M.h2>
<M.h1 animation="bloom" delay={200}>Bradley</M.h1>
<M.p animation="reveal">A solution that goes above touch and imagination...</M.p>
```

| Kind    | Animations                             | Plays                                                |
| ------- | -------------------------------------- | ---------------------------------------------------- |
| Element | `fade`, `rise`, `blur`, `scale`        | On the whole element, when it enters the viewport    |
| Letters | `bloom`, `grow`, `focus`, `wave`       | Letter by letter, when it enters the viewport        |
| Reveal  | `reveal`                               | Word by word, following the scroll position          |

Supported tags: `div`, `span`, `p`, `h1`, `h2`, `h3`. To add one, extend `supportedTags` in `src/types.ts`. Tags with very large attribute types, such as `a`, make the props type too complex for TypeScript.

| Prop        | Type            | Default                         | Applies to         | Description                                                    |
| ----------- | --------------- | ------------------------------- | ------------------ | -------------------------------------------------------------- |
| `animation` | see above       | none                            | all                | The effect. Omit it to style the state yourself (see below).   |
| `delay`     | `number` (ms)   | `0`                             | element, letters   | Delay before entering; for letters, before the first letter. Leaving is never delayed. |
| `duration`  | `number` (ms)   | `800`, or `1800` per letter     | element, letters   | Animation duration.                                            |
| `stagger`   | `number` (ms)   | `110`                           | letters            | Gap between letters starting.                                  |
| `repeat`    | `boolean`       | `false`                         | element, letters   | Animate out on leaving the viewport and in again on return. Without it, elements animate in once and stay visible. |

Props that don't apply to the chosen animation are type errors, for example `stagger` with `rise` or `delay` with `reveal`.

### Element animations

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

### Letter animations

Letter animations split the element's text into letters and stagger them in. Write the text as normal children; no `text` prop is needed.

```svelte
<M.h1 animation="bloom">Bradley</M.h1>
<M.p animation="grow" stagger={40}>I design and build websites.</M.p>
<M.h2 animation="focus" delay={200}>{title}</M.h2>
```

| Variant | Effect                                                         |
| ------- | -------------------------------------------------------------- |
| `bloom` | Letters scale out of a blur, radiating from the middle letter  |
| `grow`  | Font weight swells from hairline to its final weight           |
| `focus` | Letters drift together out of a wide, blurred spread           |
| `wave`  | Letters spring up on a sine-wave stagger                       |

How it works:

- The server renders plain text, which is good for SEO and avoids a hydration mismatch. The `splitLetters` attachment splits it in the browser before the element is revealed.
- Each original text node moves into a visually hidden label, so screen readers read whole words. The letters are `aria-hidden`.
- Words never break across lines mid-word.
- When the text changes, for example `{title}`, the letters rebuild automatically.
- Text inside nested elements is split too, and the elements are kept.
- `grow` animates `font-weight`, so it needs a variable font.

To use letters on an element `M` doesn't cover:

```svelte
<script lang="ts">
    import { splitLetters, useMotion } from "@bradlove/motion"

    const [motion] = useMotion()
</script>

<blockquote {@attach motion} {@attach splitLetters({ variant: "wave" })} data-motion="wave">...</blockquote>
```

### Scroll reveal

`reveal` splits the element's text into masked words that drop in from above their line, line by line, as the element scrolls through the viewport. Progress follows the scroll position rather than playing once, so scrolling back reverses it. Within a line, each word starts a little after the previous one, left to right, and each line starts partway through the one before.

```svelte
<M.h2 animation="reveal" class="text-center text-7xl leading-none">A solution that goes above touch and imagination...</M.h2>
```

The timing props don't apply. To tune one, use the `scrollReveal` attachment directly:

```svelte
<script lang="ts">
    import { scrollReveal } from "@bradlove/motion"
</script>

<blockquote {@attach scrollReveal({ stagger: 0.15, length: 400 })}>...</blockquote>
```

| Option       | Default  | Description                                                                          |
| ------------ | -------- | ------------------------------------------------------------------------------------ |
| `stagger`    | `0.1`    | Fraction of one word's reveal between words in a line starting.                       |
| `lineOffset` | `0.2`    | Fraction of a line's reveal before the next line starts.                              |
| `offset`     | `100`    | Pixels above the bottom of the viewport the element's top must reach before starting. |
| `length`     | `250`    | Pixels of scrolling, beyond the element's own height, that the whole reveal takes.    |
| `context`    | shared   | `MotionContext` that watches the element so scroll tracking pauses off screen. `M` passes its own. |

Words are positioned from scroll events, but a `MotionContext` watcher attaches the scroll listener only while the element is on screen, and runs one final update as it leaves so a fast scroll never strands words midway.

Notes:

- Text is split the same way as letter animations: screen readers get whole words, nested elements are kept, and changing text rebuilds the words.
- Lines are worked out from where words wrap, and re-measured when the element resizes or fonts finish loading.
- Words are clipped to their line, so the reveal works at any `line-height`, including `leading-none`.
- With `prefers-reduced-motion: reduce`, words are shown in place.

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

### Visibility callbacks: `context.watch`

For behaviour that should only run while an element is on screen, such as scroll listeners, use `watch` instead of the attachment. It calls back whenever any part of the element enters or leaves the viewport (widened by the provider's `rootMargin`), for as long as it's watched, and returns a function that stops watching. It uses its own observer with a threshold of 0, so even elements taller than the viewport are reported.

```svelte
<script lang="ts">
    import { useMotion } from "@bradlove/motion"
    import type { Attachment } from "svelte/attachments"

    const [, motion] = useMotion()

    const track: Attachment<HTMLElement> = (element) =>
        motion.watch(element, (visible) => {
            if (visible) startListening()
            else stopListening()
        })
</script>

<section {@attach track}>...</section>
```

### Cursor follower: `CursorFollow`

Eases an element after the cursor, such as a hover preview image. It sits beside the cursor on whichever side has more room, springs across when that changes, and tilts with its speed. Motion is time-based, so it moves at the same speed on 60Hz and high-refresh screens. With `prefers-reduced-motion: reduce` it snaps to the cursor with no easing or tilt.

```svelte
<script lang="ts">
    import { CursorFollow } from "@bradlove/motion"

    const preview = new CursorFollow({ gap: 32 })
    let visible = $state(false)
</script>

<ul
    onpointerenter={(event) => {
        preview.jump(event)
        visible = true
    }}
    onpointermove={preview.move}
    onpointerleave={() => (visible = false)}>
    ...
</ul>

<div {@attach preview.attach} class="pointer-events-none fixed top-0 left-0" style:opacity={visible ? 1 : 0}>
    <img src="..." alt="" />
</div>
```

The element must be `position: fixed` at the top left; `CursorFollow` sets its `translate` and `rotate`, so animate other properties (opacity, scale) yourself. Call `jump` while the element is hidden so it appears at the cursor instead of flying in from its last position.

| Option          | Default | Description                                                                 |
| --------------- | ------- | --------------------------------------------------------------------------- |
| `follow`        | `0.1`   | Fraction of the remaining distance covered per 60fps frame. Lower trails further behind. |
| `tilt`          | `0.4`   | Degrees of tilt per pixel of movement per frame.                            |
| `maxTilt`       | `12`    | Largest tilt, in degrees.                                                   |
| `gap`           | `32`    | Pixels between the cursor and the element's nearest edge.                   |
| `swapStiffness` | `0.008` | How hard the element is pulled across when it swaps sides. Lower is slower. |
| `swapDamping`   | `0.86`  | Fraction of swap speed kept each frame (0 to 1). Higher overshoots more.    |
| `deadZone`      | `0.08`  | Fraction of the viewport width either side of centre the cursor must cross before swapping sides. |

### Frame rate meter: `FrameRate`

A debug overlay showing frames per second, the worst frame time in the last half second, and a graph of the last 120 frame times. The white line marks 60fps; bars are green up to 20ms, yellow up to 34ms and red beyond. It only renders in development (`import.meta.env.DEV`), and is dropped from production builds, so it's safe to leave in a layout.

```svelte
<FrameRate position="bottom-right" />
```

`position` is `"top-left"`, `"top-right"`, `"bottom-left"` (default) or `"bottom-right"`. It ignores the pointer, so it never blocks clicks.

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
| `--motion-duration` | `800ms`, or `1800ms` per letter  |
| `--motion-ease`     | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--motion-delay`    | `0ms` (entering only)            |

```svelte
<section style="--motion-ease: linear">...</section>
```

## Behaviour notes

- **SSR:** elements render on the server with no state. Elements using a preset stay hidden until the observer first reports, then animate in. This only happens when JavaScript is enabled, so content is never lost without it.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, presets drop slide, scale and blur and keep only the fade.
- **Once by default:** elements animate in the first time they enter the viewport and then stop being observed. Set `repeat` (or `data-motion-repeat` when using `useMotion` directly) to animate out on leaving and in again on return.
- **Cleanup:** elements stop being observed when they unmount, and the observer disconnects when its provider is destroyed.
