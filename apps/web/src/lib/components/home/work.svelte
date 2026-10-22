<script lang="ts">
    import { CursorFollow, M } from "@bradlove/motion"
    import { RiArrowRightLine } from "@bradlove/ui/icons/index.js"

    import { projects } from "./projects.ts"

    const preview = new CursorFollow()

    let active = $state<number | null>(null)

    function show(index: number, event: PointerEvent) {
        if (active === null) preview.jump(event)
        active = index
    }
</script>

<section class="flex flex-col gap-8 px-8 py-40">
    <div class="flex flex-col gap-4">
        <M.span animation="rise" duration={800} class="text-accent font-mono text-xs uppercase">
            Selected Work (04)
        </M.span>
    </div>
    <ul class="border-t" onpointermove={preview.move} onpointerleave={() => (active = null)}>
        {#each projects as project, index (project.slug)}
            <li class="border-b">
                <M.div animation="rise" duration={800}>
                    <a
                        href="/work"
                        class="group grid min-h-[40vh] grid-cols-[auto_1fr_auto] items-center gap-8 py-8 md:grid-cols-[4rem_1fr_6rem_auto]"
                        onpointerenter={(event) => show(index, event)}
                        onfocus={() => (active = index)}
                        onblur={() => (active = null)}
                    >
                        <span
                            class="text-muted-foreground group-hover:text-accent font-mono text-xs"
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                            class="flex flex-col gap-3 transition-transform duration-500 group-hover:translate-x-4"
                        >
                            <span
                                class="font-heading group-hover:text-accent text-[clamp(28px,5vw,88px)] leading-none font-bold lowercase transition-colors"
                            >
                                {project.title}
                            </span>
                            <span
                                class="text-muted-foreground font-mono text-xs tracking-wider uppercase"
                            >
                                {project.services.join(" / ")}
                            </span>
                        </span>
                        <span class="text-muted-foreground hidden font-mono text-xs md:block">
                            {project.year}
                        </span>
                        <RiArrowRightLine
                            class="text-accent size-8 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        />
                    </a>
                </M.div>
            </li>
        {/each}
    </ul>
</section>

<div
    {@attach preview.attach}
    aria-hidden="true"
    class="pointer-events-none fixed top-0 left-0 z-5 hidden aspect-4/3 w-[clamp(200px,24vw,420px)] overflow-hidden transition-[opacity,scale] duration-500 ease-out md:block"
    style:opacity={active === null ? 0 : 1}
    style:scale={active === null ? 0.9 : 1}
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
