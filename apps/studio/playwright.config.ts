import { resolve } from "node:path"

import { defineConfig } from "@playwright/test"

const local = process.env.STUDIO_LOCAL === "1"
const baseURL = local
    ? "http://localhost:5173"
    : (process.env.STUDIO_URL ?? "https://proto.dev.bradlove.dev")

export default defineConfig({
    testDir: "./tests",
    testMatch: "**/*.browser.ts",
    workers: 1,
    use: {
        baseURL,
        browserName: "chromium",
        headless: true,
    },
    webServer: local
        ? {
              command: "bun alchemy dev --include ControlPlane --include StudioDev",
              cwd: resolve(import.meta.dirname, "../.."),
              url: baseURL,
              reuseExistingServer: !process.env.CI,
          }
        : undefined,
})
