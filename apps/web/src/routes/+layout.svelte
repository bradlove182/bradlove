<script lang="ts" module>
    export const prerender = true
</script>

<script lang="ts">
    import "./layout.css"
    import favicon from "#lib/assets/favicon.svg"
    import Navigation from "#lib/components/navigation.svelte"
    import PageTransition from "#lib/features/page-transition/page-transition.svelte"
    import {
        PageTransitionContext,
        setPageTransition,
    } from "#lib/features/page-transition/page-transition.svelte.ts"

    import type { LayoutProps } from "./$types"

    let { children }: LayoutProps = $props()

    const transition = setPageTransition(new PageTransitionContext())
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Navigation />
{@render children()}
<PageTransition />
