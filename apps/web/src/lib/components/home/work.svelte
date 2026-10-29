<script lang="ts">
    import { CursorFollow, M } from "@bradlove/motion"
    import { Button } from "@bradlove/ui/components/base/button/index.js"
    import { RiArrowRightLine } from "@bradlove/ui/icons/index.js"

    import { projects } from "#lib/data/projects.ts"

    const preview = new CursorFollow()

    let active = $state<number | null>(null)

    function show(index: number, event: PointerEvent) {
        if (active === null) preview.jump(event)
        active = index
    }
</script>

<section class="flex flex-col gap-8 px-8 py-40">
    <div class="flex justify-between gap-4">
        <M.span animation="rise" class="text-accent font-mono text-xs uppercase">
            Selected Work ({projects.length.toString().padStart(2, "0")})
        </M.span>
        <M.div animation="rise" delay={30}>
            <Button
                href="/work"
                class="text-muted-foreground tracking-wider uppercase"
                variant="link"
            >
                View all work
            </Button>
        </M.div>
    </div>
    <ul class="border-t" onpointermove={preview.move} onpointerleave={() => (active = null)}>
        {#each projects as project, index (project.slug)}
            <li class="border-b">
                <M.div animation="rise">
                    <a
                        href="/work"
                        class="group grid grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-4 py-[4vw] md:grid-cols-[4rem_1fr_auto]"
                        onpointerenter={(event) => show(index, event)}
                        onfocus={() => (active = index)}
                        onblur={() => (active = null)}
                    >
                        <span
                            aria-hidden={true}
                            class="text-muted-foreground group-hover:text-accent col-start-1 col-end-1 transform-gpu self-end font-mono text-xs transition-transform duration-500 group-hover:translate-x-4"
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                            class="font-heading group-hover:text-accent col-start-2 col-end-2 transform-gpu text-[clamp(28px,5vw,88px)] leading-none font-bold transition-all duration-500 group-hover:translate-x-4"
                        >
                            {project.title}
                        </span>
                        <span
                            class="text-muted-foreground col-start-2 col-end-2 font-mono text-xs tracking-wider uppercase transition-transform duration-500 group-hover:translate-x-4"
                        >
                            {project.services.join(" / ")}
                        </span>
                        <span
                            class="text-muted-foreground col-start-3 col-end-3 row-start-1 hidden self-end text-right font-mono text-xs md:block"
                        >
                            {project.year}
                        </span>
                        <div
                            class="text-muted-foreground col-start-3 col-end-3 flex -translate-x-4 items-center gap-2 text-right text-xs tracking-wider uppercase opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                        >
                            View Project
                            <RiArrowRightLine class="size-3" />
                        </div>
                    </a>
                </M.div>
            </li>
        {/each}
    </ul>
</section>

<div
    aria-hidden="true"
    class="pointer-events-none fixed top-0 left-0 z-5 hidden aspect-4/3 w-[clamp(200px,24vw,420px)] overflow-hidden transition-[opacity,scale] duration-500 ease-out md:block"
    style:opacity={active === null ? 0 : 1}
    style:scale={active === null ? 0.9 : 1}
    {@attach preview.attach}
>
    {#each projects as project, index (project.slug)}
        <img
            src={project.image}
            alt=""
            class="absolute inset-0 size-full object-cover transition-opacity duration-300"
            style:opacity={active === index ? 1 : 0}
        />
    {/each}
</div>
