import { expect, test } from "@playwright/test"

test("a visitor can open the deployed Studio landing page", async ({ page }) => {
    const response = await page.goto("/")

    expect(response?.ok()).toBe(true)
    await expect(page).toHaveTitle("Studio | Bradley Love")
    await expect(page.getByRole("heading", { level: 1, name: "Studio" })).toBeVisible()
    await expect(page.getByText("Publish, review, and share immutable prototypes.")).toBeVisible()
})
