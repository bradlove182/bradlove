<script lang="ts">
    import "./layout.css"
    import favicon from "#lib/assets/favicon.svg"
    import Footer from "#lib/components/footer.svelte"
    import Navigation from "#lib/components/navigation.svelte"
    import PageTransition from "#lib/components/page-transition/page-transition.svelte"
    import {
        PageTransitionContext,
        setPageTransition,
    } from "#lib/components/page-transition/page-transition.svelte.ts"

    import type { LayoutProps } from "./$types"

    let { children }: LayoutProps = $props()

    setPageTransition(new PageTransitionContext())
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Web Design and Development Projects | Bradley Love</title>
</svelte:head>

<Navigation />
{@render children()}
<Footer />
<PageTransition />
