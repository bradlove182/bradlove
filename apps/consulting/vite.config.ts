import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
    server: {
        open: true,
    },
    plugins: [sveltekit()],
    build: {
        commonjsOptions: {
            include: [/@repo\/ui/, /node_modules/],
        },
    },
})
