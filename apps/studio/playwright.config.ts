import { defineConfig } from "@playwright/test"

const baseURL = process.env.STUDIO_URL ?? "https://proto.dev.bradlove.dev"

export default defineConfig({
    testDir: "./tests",
    testMatch: "**/*.browser.ts",
    workers: 1,
    use: {
        baseURL,
        browserName: "chromium",
        headless: true,
    },
})
