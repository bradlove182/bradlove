import { expect, test } from "@playwright/test"

test("a visitor can open the deployed Studio landing page", async ({ page }) => {
    const response = await page.goto("/")

    expect(response?.ok()).toBe(true)
    await expect(page).toHaveTitle("Studio | Bradley Love")
    await expect(page.getByRole("heading", { level: 1, name: "Studio" })).toBeVisible()
    await expect(page.getByText("Publish, review, and share immutable prototypes.")).toBeVisible()
})

test("a visitor can see that the control plane is healthy", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("status")).toHaveText("Control plane is healthy")
})

test("a visitor sees a generic status when the control plane is unavailable", async ({ page }) => {
    const internalDetail = "postgres://admin:secret@internal-database:5432/control-plane"

    await page.route("**/health", (route) =>
        route.fulfill({
            status: 503,
            contentType: "application/json",
            headers: {
                "access-control-allow-origin": "*",
            },
            body: JSON.stringify({ error: internalDetail }),
        }),
    )
    await page.goto("/")

    await expect(page.getByRole("status")).toHaveText("Control plane is unavailable")
    await expect(page.getByText("Try again shortly.")).toBeVisible()
    await expect(page.locator("body")).not.toContainText(internalDetail)
})
