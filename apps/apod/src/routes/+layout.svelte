<script lang="ts">
    import favicon from "$lib/assets/favicon.svg"
    import { Navigation } from "$lib/components/navigation"
    import "../app.css"

    const { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main class="grid h-full w-full grid-rows-[auto_1fr] overflow-hidden">
    <Navigation />
    <div class="overflow-hidden">
        {@render children?.()}
    </div>
</main>
