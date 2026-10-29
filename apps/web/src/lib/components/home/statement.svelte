<script lang="ts">
    import { M } from "@bradlove/motion"
    import * as Card from "@bradlove/ui/base/card/index.ts"
</script>

<section class="grid grid-cols-2 gap-8 px-8 py-40">
    <div class="flex flex-col gap-4">
        <M.span animation="rise" class="text-accent font-mono text-xs tracking-wider uppercase">
            What I Do
        </M.span>
        <M.p
            animation="highlight"
            class="font-heading max-w-5xl text-[clamp(2rem,1.5rem+4vw,5.5rem)] leading-[1.05] tracking-tight"
        >
            Solutions that move, respond and feel good.
        </M.p>
    </div>
    <div class="grid grid-cols-1 gap-4">
        <Card.Root class="bg-transparent">
            <Card.Header>
                <Card.Title>Websites</Card.Title>
            </Card.Header>
        </Card.Root>
        <Card.Root class="bg-transparent">
            <Card.Header>
                <Card.Title>Websites</Card.Title>
            </Card.Header>
        </Card.Root>
        <Card.Root class="bg-transparent">
            <Card.Header>
                <Card.Title>Websites</Card.Title>
            </Card.Header>
        </Card.Root>
        <Card.Root class="bg-transparent">
            <Card.Header>
                <Card.Title>Websites</Card.Title>
            </Card.Header>
        </Card.Root>
    </div>
</section>
