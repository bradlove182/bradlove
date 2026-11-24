<script lang="ts">
    import { onMount } from "svelte"

    import { getControlPlaneHealth } from "../lib/control-plane.remote"

    type HealthState = "checking" | "healthy" | "unavailable"

    let health = $state<HealthState>("checking")

    onMount(() => {
        let active = true

        void getControlPlaneHealth().then(
            (result) => {
                if (active) health = result.status
            },
            () => {
                if (active) health = "unavailable"
            },
        )

        return () => {
            active = false
        }
    })
</script>

<svelte:head>
    <title>Studio | Bradley Love</title>
    <meta
        name="description"
        content="A shared workspace for publishing, reviewing, and sharing immutable prototypes."
    />
</svelte:head>

<main>
    <section aria-labelledby="studio-title">
        <p class="eyebrow">Bradley Love / Prototype workspace</p>
        <h1 id="studio-title">Studio</h1>
        <p class="introduction">Publish, review, and share immutable prototypes.</p>

        <aside class="health" aria-labelledby="health-title">
            <div class="health-heading">
                <span
                    class:healthy={health === "healthy"}
                    class:unavailable={health === "unavailable"}
                    aria-hidden="true"
                ></span>
                <h2 id="health-title">Control plane</h2>
            </div>
            <p class="health-status" role="status">
                {#if health === "checking"}
                    Checking control plane health
                {:else if health === "healthy"}
                    Control plane is healthy
                {:else}
                    Control plane is unavailable
                {/if}
            </p>
            {#if health === "unavailable"}
                <p class="health-detail">Try again shortly.</p>
            {/if}
        </aside>
    </section>
</main>

<style>
    :global(:root) {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #f3f0e8;
        background: #151714;
        font-synthesis: none;
    }

    :global(body) {
        margin: 0;
        min-width: 320px;
    }

    main {
        display: grid;
        min-height: 100svh;
        place-items: center;
        padding: 2rem;
        box-sizing: border-box;
    }

    section {
        width: min(100%, 64rem);
    }

    .eyebrow {
        margin: 0 0 2rem;
        color: #b7bbaa;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    h1 {
        margin: 0;
        font-size: clamp(5rem, 18vw, 13rem);
        font-weight: 500;
        letter-spacing: -0.075em;
        line-height: 0.85;
    }

    .introduction {
        max-width: 32rem;
        margin: 2.5rem 0 0;
        color: #d5d7ca;
        font-size: clamp(1.125rem, 2vw, 1.5rem);
        line-height: 1.5;
    }

    .health {
        max-width: 32rem;
        margin-top: clamp(4rem, 10vh, 7rem);
        padding-top: 1.5rem;
        border-top: 1px solid #3b3e36;
    }

    .health-heading {
        display: flex;
        align-items: center;
        gap: 0.625rem;
    }

    .health-heading span {
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        background: #b7bbaa;
    }

    .health-heading span.healthy {
        background: #a6d189;
    }

    .health-heading span.unavailable {
        background: #ed8796;
    }

    h2 {
        margin: 0;
        color: #b7bbaa;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .health-status {
        margin: 1rem 0 0;
        font-size: 1.125rem;
        font-weight: 500;
    }

    .health-detail {
        margin: 0.5rem 0 0;
        color: #b7bbaa;
        line-height: 1.5;
    }
</style>
