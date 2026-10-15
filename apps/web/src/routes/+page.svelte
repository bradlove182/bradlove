<script lang="ts">
    import Hero from "#lib/components/hero.svelte"
    import Marquee from "#lib/components/marquee.svelte"

    const services = ["Design", "Build", "Scale", "Svelte", "Wordpress", "Figma", "Saas"]
</script>

<svelte:head>
    <title>Bradley Love - Creative Developer</title>
</svelte:head>

<Hero />
<Marquee items={services} />
