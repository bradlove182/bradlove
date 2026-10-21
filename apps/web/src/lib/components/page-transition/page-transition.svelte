<script lang="ts">
    import { onNavigate, preloadData } from "$app/navigation"
    import { tick } from "svelte"

    import { M } from "@bradlove/motion"

    import { lotus } from "./lotus.ts"

    const EASE = "cubic-bezier(0.65, 0, 0.35, 1)"
    const BLOOM = "cubic-bezier(0.22, 1, 0.36, 1)"
    const STAGGER = 80
    const HOLD = 250
    const PRELOAD_TIMEOUT = 3000

    let active = $state(false)
    let destination = $state<App.PageData | null>(null)
    let viewport = $state({ width: 0, height: 0 })

    const flower = $derived(lotus(viewport.width, viewport.height))

    let disc = $state<SVGCircleElement>()
    let rings: SVGGElement[] = []
    let label = $state<HTMLElement>()

    let phase: "idle" | "covering" | "uncovering" = "idle"
    /** Incremented per navigation; only the latest one may reveal. */
    let run = 0
    let covered: Promise<unknown> = Promise.resolve()
    let leaving: Animation[] = []

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const finished = (animations: (Animation | undefined)[]) =>
        Promise.all(animations.map((animation) => animation?.finished))

    /** Destination title and description, or null if slow or unavailable. */
    const preload = async (href: string): Promise<App.PageData | null> => {
        const result = await Promise.race([
            preloadData(href).catch(() => null),
            wait(PRELOAD_TIMEOUT).then(() => null),
        ])
        return result?.type === "loaded" && result.data.title ? (result.data as App.PageData) : null
    }

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

    // fill "both" so a reversed uncover holds the covered frame instead of snapping to scale(0).
    const uncover = () =>
        [
            label?.animate([{ opacity: 1 }, { opacity: 0, filter: "blur(0.5rem)" }], {
                duration: 400,
                easing: EASE,
                fill: "both",
            }),
            disc?.animate([{ transform: "scale(1)" }, { transform: "scale(0)" }], {
                duration: 600,
                delay: STAGGER,
                easing: EASE,
                fill: "both",
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
                        fill: "both",
                    },
                ),
            ),
        ].filter((animation) => animation !== undefined)

    const open = async () => {
        active = true
        viewport = { width: window.innerWidth, height: window.innerHeight }
        await tick()
        return cover()
    }

    /**
     * Plays an in-progress uncover backwards until the page is covered again. The reversed
     * animations are kept: the browser has already auto-removed the cover animations they replaced,
     * so they are what holds the covered frame.
     */
    const recover = () => {
        leaving.forEach((animation) => animation.reverse())
        return finished(leaving)
    }

    const reveal = async (id: number) => {
        if (id !== run) return
        phase = "uncovering"
        leaving = uncover()
        await finished(leaving)
        if (id !== run) return

        phase = "idle"
        leaving = []
        destination = null
        active = false
    }

    onNavigate(async (navigation) => {
        const to = navigation.to?.url
        if (navigation.shallow || !to || to.pathname === navigation.from?.url.pathname) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const id = ++run
        if (phase === "idle") covered = open()
        else if (phase === "uncovering") covered = recover()
        phase = "covering"

        const data = await preload(to.href)
        if (id !== run) return
        destination = data

        await covered
        await wait(HOLD)
        if (id !== run) return

        navigation.complete.then(
            () => reveal(id),
            () => reveal(id),
        )
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
                <M.p
                    animation="rise"
                    duration={500}
                    class="text-accent font-mono text-xs tracking-wider uppercase"
                >
                    (Next)
                </M.p>
                <M.p
                    letters="focus"
                    delay={200}
                    duration={650}
                    stagger={16}
                    class="font-heading text-[clamp(1rem,10vw,14rem)] leading-none font-bold tracking-tighter uppercase"
                >
                    {destination.title}
                </M.p>
                <M.p
                    animation="rise"
                    delay={100}
                    duration={500}
                    class="text-muted-foreground max-w-96 font-mono text-xs tracking-wider uppercase"
                >
                    {destination.description}
                </M.p>
            </div>
        {/if}
    </div>
{/if}
