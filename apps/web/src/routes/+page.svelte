<script lang="ts">
    import Hero from "#lib/components/home/hero.svelte"
    import Statement from "#lib/components/home/statement.svelte"
    import Marquee from "#lib/components/marquee.svelte"
</script>

<svelte:head>
    <title>Creative Web Developer in Cape Town | Bradley Love</title>
</svelte:head>

<Hero />
<Marquee items={["Design", "Build", "Scale", "UI/UX", "CMS", "E-Commerce", "Svelte", "Saas"]} />
<Statement />
