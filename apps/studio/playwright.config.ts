import { resolve } from "node:path"

import { defineConfig } from "@playwright/test"

const local = process.env.STUDIO_LOCAL === "1"
const baseURL = local
    ? "http://127.0.0.1:5173"
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
        ? [
              {
                  command: "bun run dev",
                  cwd: resolve(import.meta.dirname, "../control-plane"),
                  env: {
                      PORT: "3001",
                  },
                  url: "http://127.0.0.1:3001/health",
                  reuseExistingServer: !process.env.CI,
              },
              {
                  command: "bun run dev --host 127.0.0.1 --port 5173",
                  url: baseURL,
                  reuseExistingServer: !process.env.CI,
              },
          ]
        : undefined,
})
