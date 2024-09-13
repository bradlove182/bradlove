import config from "@repo/ui/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "../../packages/ui/**/*.{html,js,svelte,ts}",
    ],
    presets: [config],
}
