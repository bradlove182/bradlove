<script lang="ts">
    import { goto } from "$app/navigation"
    import { Button } from "@repo/ui"
</script>

<Button onclick={() => goto("/build")}>
    Build Deck
</Button>
