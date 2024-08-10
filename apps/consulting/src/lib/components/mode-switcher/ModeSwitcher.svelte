<script lang="ts">
    import { IconMoon, IconSun } from "@repo/ui/icons"
    import { Button } from "@repo/ui"
    import { mode, toggleMode } from "mode-watcher"
</script>

<Button variant="ghost" size="icon" on:click={() => toggleMode()}>
    {#if $mode === "dark"}
        <IconMoon />
    {:else}
        <IconSun />
    {/if}
</Button>
