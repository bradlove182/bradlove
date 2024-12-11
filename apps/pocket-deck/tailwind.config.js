import path from "node:path"
import config from "@repo/ui/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        path.join(path.dirname(require.resolve("@repo/ui")), "/components/**/*.{html,js,svelte,ts}"),
        path.join(path.dirname(require.resolve("@repo/ui")), "/icons/**/*.{html,js,svelte,ts}"),
        path.join(path.dirname(require.resolve("@repo/ui")), "/themes/**/*.{html,js,svelte,ts}"),
        path.join(path.dirname(require.resolve("@repo/ui")), "/utils/**/*.{html,js,svelte,ts}"),
    ],
    presets: [config],
}
