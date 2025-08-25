<script lang="ts">

    const { data } = $props()
</script>

{#await data.image}
    <p>Loading...</p>
{:then { data: image, error }}
    {#if image}
        <img src={image.url} alt={image.title} />
    {:else if error}
        <p>Error: {error.message}</p>
    {/if}
{/await}
