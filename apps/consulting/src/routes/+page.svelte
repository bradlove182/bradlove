<script lang="ts">
    import { AnimatePresence, Button, Card, Pill } from "@repo/ui"
</script>

<svelte:head>
    <title>DRVN</title>
</svelte:head>

<section class="animate-slide-up container rounded-2xl min-h-[calc(100vh-106px)] w-full grid items-center px-16">
    <div class="grid gap-6 max-w-2xl">
        <Pill>Limited Availability</Pill>
        <h1 class="text-7xl font-semibold leading-none tracking-tight">
            Accelerate Your <a href="https://svelte.dev/" target="_blank">Svelte</a> Development
        </h1>
        <p class="text-muted-foreground text-lg">Experience the power of sprint-driven development and real-time expert consulting for your Svelte and SvelteKit projects.</p>
        <div class="flex gap-4">
            <Button>Start your first sprint</Button>
            <Button variant="outline">Book a call</Button>
        </div>
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
