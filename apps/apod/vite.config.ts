import { sveltekit } from "@sveltejs/kit/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
    server: {
        open: true,
    },
    plugins: [tailwindcss(), sveltekit()],
    build: {
        commonjsOptions: {
            include: [/@repo\/ui/, /node_modules/],
        },
    },
})
