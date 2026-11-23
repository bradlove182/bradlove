import { defineConfig } from "@playwright/test"

const baseURL = process.env.STUDIO_URL ?? "https://proto.bradlove.dev"
// Bypass a local negative DNS cache without bypassing the deployed hostname or TLS.
const resolveIP = process.env.STUDIO_RESOLVE_IP

export default defineConfig({
    testDir: "./tests",
    testMatch: "**/*.browser.ts",
    workers: 1,
    use: {
        baseURL,
        browserName: "chromium",
        headless: true,
        launchOptions:
            resolveIP === undefined
                ? undefined
                : {
                      args: [`--host-resolver-rules=MAP ${new URL(baseURL).hostname} ${resolveIP}`],
                  },
    },
})
