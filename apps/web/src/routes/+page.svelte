<script lang="ts">
    import { M } from "@bradlove/motion"

    import Hero from "#lib/components/hero.svelte"
    import Marquee from "#lib/components/marquee.svelte"</script>

<svelte:head>
    <title>Creative Web Developer in Cape Town | Bradley Love</title>
</svelte:head>

<Hero />
<Marquee items={["Design", "Build", "Scale", "Svelte", "Wordpress", "Figma", "Saas"]} />
<section class="h-svh px-8 py-64">
    <M.div animation="fade" class="ok">div</M.div>
    <M.span animation="rise" delay={1000} class="text-muted-foreground text-xs tracking-wider uppercase">
        (Hello)
    </M.span>
    <M.p letters="grow" stagger={40} class="text-[clamp(30px,4.2vw,84px)] leading-none tracking-tight">
        I'm Brad. I design and build websites that respond, move, scale and feel good to use. Designed in
        Figma, built in code, made in Cape Town.
    </M.p>
</section>
