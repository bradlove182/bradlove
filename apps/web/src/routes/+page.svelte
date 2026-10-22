<script lang="ts">
    import Hero from "#lib/components/home/hero.svelte"
    import Statement from "#lib/components/home/statement.svelte"
    import Work from "#lib/components/home/work.svelte"
    import Marquee from "#lib/components/marquee.svelte"
</script>

<svelte:head>
    <title>Frontend / AI Engineer in Cape Town | Bradley Love</title>
</svelte:head>

<Hero />
<Marquee items={["Build", "Scale", "Motion", "CMS", "E-Commerce", "Svelte", "Saas", "AI"]} />
<Statement />
<Work />
