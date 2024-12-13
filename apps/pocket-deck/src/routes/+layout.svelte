<script lang="ts">
    import "../app.css"

    const { children } = $props()
</script>

<main class="grid space-y-16">
    {@render children()}
</main>
