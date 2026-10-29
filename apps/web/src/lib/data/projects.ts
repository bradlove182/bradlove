export interface Project {
    slug: string
    title: string
    client: string
    year: number
    services: string[]
    summary: string
    image: string
}

const placeholder = (seed: string) => `https://picsum.photos/seed/${seed}/1600/1200`

export const projects: Project[] = [
    {
        slug: "atlas",
        title: "Atlas",
        client: "Atlas Logistics",
        year: 2026,
        services: ["SaaS", "Svelte", "AI"],
        summary: "Fleet dashboard that turns live tracking data into dispatch decisions.",
        image: placeholder("atlas"),
    },
    {
        slug: "fynbos",
        title: "Fynbos",
        client: "Fynbos Botanicals",
        year: 2025,
        services: ["E-Commerce", "CMS"],
        summary: "Storefront rebuild with a headless CMS the team actually enjoys using.",
        image: placeholder("fynbos"),
    },
    {
        slug: "tidewater",
        title: "Tidewater",
        client: "Tidewater Studio",
        year: 2025,
        services: ["Build", "Motion"],
        summary: "Portfolio site for an architecture studio, built around scroll-driven motion.",
        image: placeholder("tidewater"),
    },
    {
        slug: "kestrel",
        title: "Kestrel",
        client: "Kestrel Finance",
        year: 2024,
        services: ["SaaS", "Scale"],
        summary: "Customer portal migration that cut page loads from seconds to milliseconds.",
        image: placeholder("kestrel"),
    },
]
