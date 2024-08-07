<script lang="ts">
    import "../app.css"
    import { ModeWatcher as ThemeWatcher } from "mode-watcher"
    import Navigation from "$lib/navigation/Navigation.svelte"
</script>

<ThemeWatcher />
<Navigation />
<main class="container">
    <slot />
</main>
