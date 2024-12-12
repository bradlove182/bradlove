<script lang="ts">
    import "../app.css"

    const { children } = $props()
</script>

<main class="p-8">
    {@render children()}
</main>
