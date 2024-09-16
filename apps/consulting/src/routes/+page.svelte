<script lang="ts">
    import { AnimatePresence, Button, Card, Pill } from "@repo/ui"
</script>

<svelte:head>
    <title>DRVN</title>
</svelte:head>

<section class="animate-slide-up container rounded-2xl min-h-[calc(100vh-106px)] w-full grid items-center px-16 relative    ">
    <div class="grid gap-6 max-w-2xl">
        <Pill>Limited Availability</Pill>
        <h1 class="text-7xl font-semibold leading-none tracking-tight">
            Accelerate Your <a href="https://svelte.dev/" target="_blank">Svelte</a> Development
        </h1>
        <p class="text-muted-foreground text-lg">
            Experience the power of sprint-driven development and real-time expert consulting for your Svelte and SvelteKit projects.
        </p>
        <div class="flex gap-4">
            <Button>Start your first sprint</Button>
            <Button variant="outline">Book a call</Button>
        </div>
    </div>
    <div class="h-[80vh] w-[80vh] rounded-full grid items-center absolute right-16 md:right-0 -z-10 top-1/2 -translate-y-1/2">
        <Pill class="row-start-1 col-start-1 justify-self-center px-0 py-0 bg-gradient-to-br from-transparent to-secondary shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-[20vh] h-[20vh] p-[4vh]">
                <path d="M416.9 93.1c-41.1-58.9-122.4-76.3-181.2-38.9L132.5 120c-28.2 17.7-47.6 46.5-53.5 79.3-4.9 27.3-.6 55.5 12.3 80-8.8 13.4-14.9 28.5-17.7 44.2-5.9 33.4 1.8 67.8 21.6 95.4 41.2 58.9 122.4 76.3 181.2 38.9L379.6 392c28.2-17.7 47.6-46.5 53.5-79.3 4.9-27.3.6-55.5-12.3-80 8.8-13.4 14.9-28.4 17.7-44.2 5.8-33.4-1.9-67.8-21.6-95.4" style="fill:#ff3e00" />
                <path d="M225.6 424.5c-33.3 8.6-68.4-4.4-88-32.6-11.9-16.6-16.5-37.3-13-57.4.6-3.3 1.4-6.5 2.5-9.6l1.9-5.9 5.3 3.9c12.2 9 25.9 15.8 40.4 20.2l3.8 1.2-.4 3.8c-.5 5.4 1 10.9 4.2 15.3 5.9 8.5 16.5 12.4 26.5 9.8 2.2-.6 4.4-1.5 6.3-2.8l103.2-65.8c5.1-3.2 8.6-8.4 9.7-14.4 1.1-6.1-.3-12.3-3.9-17.3-5.9-8.5-16.5-12.4-26.5-9.8-2.2.6-4.4 1.5-6.3 2.8L252 291c-6.5 4.1-13.5 7.2-21 9.2-33.3 8.6-68.4-4.4-88-32.6-11.9-16.6-16.5-37.3-13-57.4 3.5-19.7 15.2-37 32.2-47.7l103.2-65.8c6.5-4.1 13.5-7.2 21-9.2 33.3-8.6 68.4 4.4 88 32.6 11.9 16.6 16.5 37.3 13 57.4-.6 3.3-1.4 6.5-2.5 9.6L383 193l-5.3-3.9c-12.2-9-25.9-15.8-40.4-20.2l-3.8-1.2.4-3.8c.5-5.4-1-10.9-4.2-15.3-5.9-8.5-16.5-12.4-26.5-9.8-2.2.6-4.4 1.5-6.3 2.8l-103.2 65.8c-5.1 3.2-8.6 8.4-9.7 14.4-1.1 6.1.3 12.3 3.9 17.3 5.9 8.5 16.5 12.4 26.5 9.8 2.2-.6 4.4-1.5 6.3-2.8L260 221c6.5-4.1 13.5-7.2 21-9.2 33.3-8.6 68.4 4.4 88 32.6 11.9 16.6 16.5 37.3 13 57.4-3.5 19.7-15.2 37-32.2 47.7l-103.2 65.8c-6.5 4.1-13.6 7.2-21 9.2" style="fill:#fff" />
            </svg>
        </Pill>
        <div class="h-full w-full bg-gradient-conic absolute from-background via-transparent to-background from-0% to-60%" />
        {#each Array(3) as _, index}
            {@const size = `calc(90% - ${index * 24}%)`}
            <div style="height: {size}; width: {size};" class="row-start-1 col-start-1 justify-self-center -z-20">
                <Pill class="size-full px-0 py-0 bg-gradient-to-br from-transparent to-secondary shadow-2xl">
                </Pill>
            </div>
        {/each}
    </div>
</section>
<AnimatePresence tag="section" class="container grid" animations="animate-slide-up">
    <h2 class="text-5xl tracking-tight font-semibold mb-3 leading-tight">
        Sprint-Driven <br />Svelte Development
    </h2>
    <p class="mb-12 text-muted-foreground max-w-lg text-lg">
        Harness the power of focused, time-boxed sprints to rapidly build and iterate on your Svelte projects.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card class="grid grid-rows-[min-content_1fr_min-content]">
            <Card.Header>
                <Card.Title class="text-xl">
                    2-Week Sprints
                </Card.Title>
            </Card.Header>
            <Card.Content>
                <Card.Description>
                    Our agile development process is built around 2-week sprints, allowing for rapid progress and frequent feedback.
                    Each sprint delivers a set of completed features, ensuring your project moves forward at an impressive pace.
                </Card.Description>
            </Card.Content>
            <Card.Footer class="gap-2">
                <Button>Book your first sprint</Button>
                <Button variant="ghost">What's a sprint?</Button>
            </Card.Footer>
        </Card>
        <Card class="grid grid-rows-[min-content_1fr_min-content]">
            <Card.Header>
                <Card.Title class="text-xl">
                    Consulting Services
                </Card.Title>
            </Card.Header>
            <Card.Content>
                <Card.Description>
                    Our expert Svelte consultants are available to guide you through complex challenges, provide code reviews, and offer strategic advice.
                    With our consulting services, you'll have on-demand access to deep Svelte expertise throughout your development process.
                </Card.Description>
            </Card.Content>
            <Card.Footer class="gap-2">
                <Button>Book a call</Button>
                <Button variant="ghost">Explore options</Button>
            </Card.Footer>
        </Card>
    </div>
</AnimatePresence>
<AnimatePresence tag="section" class="container grid" animations="animate-slide-up">
    <h2 class="text-5xl tracking-tight font-semibold mb-3 leading-tight text-center">
        Comprehensive <br />Svelte & SvelteKit Consulting
    </h2>
    <p class="mb-12 text-muted-foreground max-w-lg mx-auto text-lg text-center">
        Expert guidance and support for your projects, available in real-time and asynchronously to fit your needs.
    </p>
</AnimatePresence>
