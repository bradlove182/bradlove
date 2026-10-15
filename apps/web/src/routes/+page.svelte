<script lang="ts">
    import Hero from "#lib/components/hero.svelte"
    import Marquee from "#lib/components/marquee.svelte"

    const services = ["Design", "Build", "Scale", "Svelte", "Wordpress", "Figma", "Saas"]
</script>

<Hero />
<Marquee items={services} />
