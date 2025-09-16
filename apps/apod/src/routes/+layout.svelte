<script lang="ts">
    import favicon from "$lib/assets/favicon.svg"
    import { Navigation } from "$lib/components/navigation"
    import { useImage } from "$lib/hooks/data"
    import "../app.css"

    const { children } = $props()

    useImage()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main class="grid h-dvh max-h-dvh min-h-dvh w-full overflow-hidden">
    <Navigation />
    <div class="min-h-0">
        {@render children?.()}
    </div>
</main>
