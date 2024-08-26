<script lang="ts">
    import { AnimatePresence, Button, Card } from "@repo/ui"
</script>

<svelte:head>
    <title>DRVN</title>
</svelte:head>

<section class="animate-slide-up container rounded-2xl min-h-[calc(80vh-62px)] w-full grid grid-cols-2 items-center justify-center px-16">
    <div class="grid gap-6 max-w-2xl">
        <h1 class="text-7xl font-semibold leading-none tracking-tight">
            Sprint driven development
        </h1>
        <p class="text-muted-foreground text-lg max-w-96">Our sprint-based approach offers adaptability with predictable results and no long term contracts.</p>
        <div class="flex gap-4">
            <Button>Start your first sprint</Button>
            <Button variant="outline">Book a call</Button>
        </div>
    </div>
</section>
<AnimatePresence tag="section" class="container grid" animations="animate-slide-up">
    <Card>
        <Card.Header class="p-12">
            <Card.Title class="text-4xl">How does it work?</Card.Title>
        </Card.Header>
        <Card.Content class="grid grid-cols-3 gap-12 md:gap-20 p-12 pt-0">
            <div class="flex flex-col space-y-1.5">
                <Card.Title>No long term contracts</Card.Title>
                <Card.Description>
                    Scale up and down as your business needs change.
                </Card.Description>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Card.Title>Pause or cancel anytime</Card.Title>
                <Card.Description>
                    Try us out for a sprint without risk. Not feeling we're a good fit? No hard feelings if you need to cancel.
                </Card.Description>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Card.Title>Fixed, predictable pricing</Card.Title>
                <Card.Description>
                    Fixed price two weeks sprint. No surprise bills.
                </Card.Description>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Card.Title>No hourly billing</Card.Title>
                <Card.Description>
                    We don't nickel and dime you for every 5 minute task or email. Our focus is on shipping, not maximizing hours.
                </Card.Description>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Card.Title>Focus on shipping</Card.Title>
                <Card.Description>
                    Our goal is to deliver tangible, meaningful outcomes each sprint, not just churn hours.
                </Card.Description>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Card.Title>Accelerated development</Card.Title>
                <Card.Description>
                    Sprints foster accountability, focus, and fast iterations. You get working software delivered on a regular cadence.
                </Card.Description>
            </div>
        </Card.Content>
    </Card>
</AnimatePresence>
<AnimatePresence tag="section" class="container grid grid-cols-1 md:grid-cols-2 gap-4" animations="animate-slide-up">
    <Card class="grid grid-rows-[min-content_1fr_min-content]">
        <Card.Header>
            <Card.Title>Sprint-Based Development</Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col space-y-1.5">
            <Card.Description class="max-w-96">
                A nimble web development service employing two-week sprints to deliver top-notch websites and apps using Svelte and SvelteKit
            </Card.Description>
        </Card.Content>
        <Card.Footer class="gap-2">
            <Button>Book your first sprint</Button>
            <Button variant="ghost">What's a sprint?</Button>
        </Card.Footer>
    </Card>
    <Card class="grid grid-rows-[min-content_1fr_min-content]">
        <Card.Header>
            <Card.Title>Consulting Services</Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col space-y-1.5">
            <Card.Description class="max-w-96">
                Choose Asynchronous Consulting for ongoing support, 1-Hour Real-Time Consulting for
                immediate problem-solving.
            </Card.Description>
        </Card.Content>
        <Card.Footer class="gap-2">
            <Button>Book a call</Button>
            <Button variant="ghost">Explore options</Button>
        </Card.Footer>
    </Card>
</AnimatePresence>
