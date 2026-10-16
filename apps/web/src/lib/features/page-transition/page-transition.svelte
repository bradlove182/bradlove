<script lang="ts">
    import { onNavigate, preloadData } from "$app/navigation"
    import { tick } from "svelte"

    import WordReveal from "#lib/components/word-reveal.svelte"

    import { lotus } from "./lotus.ts"
    import { getPageTransition } from "./page-transition.svelte.ts"

    const EASE = "cubic-bezier(0.65, 0, 0.35, 1)"
    const BLOOM = "cubic-bezier(0.22, 1, 0.36, 1)"
    const STAGGER = 80
    const HOLD = 250

    const transition = getPageTransition()

    let active = $state(false)
    let destination = $state<App.PageData | null>(null)
    let viewport = $state({ width: 0, height: 0 })

    const flower = $derived(lotus(viewport.width, viewport.height))

    let disc = $state<SVGCircleElement>()
    let rings: SVGGElement[] = []
    let label = $state<HTMLElement>()

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const finished = (animations: (Animation | undefined)[]) =>
        Promise.all(animations.map((animation) => animation?.finished))

    const cover = () =>
        finished([
            ...[...rings]
                .reverse()
                .map((ring, index) =>
                    ring.animate(
                        [
                            { transform: "rotate(-24deg) scale(0)" },
                            { transform: "rotate(0deg) scale(1)" },
                        ],
                        { duration: 520, delay: index * STAGGER, easing: BLOOM, fill: "both" },
                    ),
                ),
            disc?.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], {
                duration: 520,
                delay: STAGGER * 2,
                easing: EASE,
                fill: "both",
            }),
        ])

    const uncover = () =>
        finished([
            label?.animate([{ opacity: 1 }, { opacity: 0, filter: "blur(0.5rem)" }], {
                duration: 400,
                easing: EASE,
                fill: "forwards",
            }),
            disc?.animate([{ transform: "scale(1)" }, { transform: "scale(0)" }], {
                duration: 600,
                delay: STAGGER,
                easing: EASE,
                fill: "forwards",
            }),
            ...rings.map((ring, index) =>
                ring.animate(
                    [
                        { transform: "rotate(0deg) scale(1)" },
                        { transform: "rotate(24deg) scale(0)" },
                    ],
                    {
                        duration: 600,
                        delay: STAGGER + index * STAGGER,
                        easing: EASE,
                        fill: "forwards",
                    },
                ),
            ),
        ])

    const reveal = async () => {
        transition.ready = true
        await uncover()

        destination = null
        active = false
    }

    onNavigate(async (navigation) => {
        const to = navigation.to?.url
        if (active || navigation.shallow || !to || to.pathname === navigation.from?.url.pathname)
            return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        active = true
        viewport = { width: window.innerWidth, height: window.innerHeight }
        await tick()

        const covered = cover()
        const result = await preloadData(to.href)
        if (result.type === "loaded" && result.data.title) {
            destination = result.data as App.PageData
        }
        await covered
        await wait(HOLD)

        transition.ready = false
        navigation.complete.then(reveal, reveal)
    })
</script>

{#if active}
    <div aria-hidden="true" class="fixed inset-0 z-100 overflow-hidden">
        <svg class="absolute inset-0 size-full">
            <circle
                bind:this={disc}
                cx={flower.x}
                cy={flower.y}
                r={flower.radius * 1.02}
                class="fill-background"
                style:transform="scale(0)"
                style:transform-box="view-box"
                style:transform-origin={flower.origin}
            />
            {#each flower.rings as petals, index (index)}
                <g
                    bind:this={rings[index]}
                    class="fill-background stroke-foreground"
                    stroke-opacity="0.12"
                    style:transform="scale(0)"
                    style:transform-box="view-box"
                    style:transform-origin={flower.origin}
                >
                    {#each petals as d (d)}
                        <path {d} />
                    {/each}
                </g>
            {/each}
        </svg>
        {#if destination}
            <div
                bind:this={label}
                class="absolute inset-0 flex flex-col justify-end gap-8 px-8 pt-24 pb-8"
            >
                <p
                    class="text-muted-foreground animate-in fade-in slide-in-from-bottom-8 fill-mode-both text-xs tracking-wider uppercase duration-500"
                >
                    (Next)
                </p>
                <p
                    class="text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tighter uppercase"
                >
                    <WordReveal
                        variant="focus"
                        delay={200}
                        duration={650}
                        stagger={16}
                        word={destination.title}
                    />
                </p>
                <p
                    class="animate-in fade-in slide-in-from-bottom-8 fill-mode-both text-muted-foreground max-w-96 text-xs tracking-wider uppercase delay-100 duration-500"
                >
                    {destination.description}
                </p>
            </div>
        {/if}
    </div>
{/if}
