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
</style>
