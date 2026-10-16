<script lang="ts">
    import Hero from "#lib/components/hero.svelte"
    import Marquee from "#lib/components/marquee.svelte"
</script>

<svelte:head>
    <title>Creative Web Developer in Cape Town | Bradley Love</title>
</svelte:head>

<Hero />
<Marquee items={["Design", "Build", "Scale", "Svelte", "Wordpress", "Figma", "Saas"]} />
