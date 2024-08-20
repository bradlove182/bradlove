<script lang="ts">
    import { Button, Card } from "@repo/ui"
    import { Hero } from "$lib/components/hero"
</script>

<Hero />
<div class="grid grid-cols-2 gap-2">
    <Card>
        <Card.Header>
            <Card.Title>Sprint-Based Svelte and SvelteKit Development</Card.Title>
        </Card.Header>
        <Card.Content>
            <Card.Description>
                A nimble web development service employing two-week sprints to deliver top-notch websites and apps using Svelte and SvelteKit
            </Card.Description>
        </Card.Content>
        <Card.Footer>
            <Button>Book your first sprint</Button>
        </Card.Footer>
    </Card>
    <Card>
        <Card.Header>
            <Card.Title>SvelteKit Consulting Services</Card.Title>
        </Card.Header>
        <Card.Content>
            <Card.Description>
                A nimble web development service employing two-week sprints to deliver top-notch websites and apps using Svelte and SvelteKit
            </Card.Description>
        </Card.Content>
        <Card.Footer>
            <Button>Book your first sprint</Button>
        </Card.Footer>
    </Card>
</div>
