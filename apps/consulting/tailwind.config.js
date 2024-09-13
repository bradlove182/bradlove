import path from "node:path"
import config from "@repo/ui/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        path.join(path.dirname(require.resolve("@repo/ui")), "**/*.{html,js,svelte,ts}"),
    ],
    presets: [config],
}
