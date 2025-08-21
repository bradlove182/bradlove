import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    server: {
        open: true,
    },
    plugins: [sveltekit(), tailwindcss()],
    build: {
        commonjsOptions: {
            include: [/@repo\/ui/, /node_modules/],
        },
    },
})
