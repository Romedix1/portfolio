import { test, expect } from "@playwright/test";

test.describe("Tabs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Should open multiple tabs and switch between them", async ({
    page,
  }) => {
    const fileBar = page.getByTestId("file-bar-container");
    const sidebar = page.locator("aside");

    await sidebar.getByRole("link", { name: "about.md" }).click();
    await expect(page).toHaveURL(/\/about$/);

    const aboutTab = fileBar.getByRole("link", { name: "about.md" });

    await expect(aboutTab).toBeVisible();
    await expect(aboutTab).toHaveAttribute("aria-current", "page");

    await sidebar.getByRole("link", { name: "contact.md" }).click();
    await expect(page).toHaveURL(/\/contact$/);

    const contactTab = fileBar.getByRole("link", { name: "contact.md" });

    await expect(contactTab).toBeVisible();
    await expect(contactTab).toHaveAttribute("aria-current", "page");

    await expect(fileBar.getByRole("link")).toHaveCount(2);

    await aboutTab.click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(contactTab).not.toHaveAttribute("aria-current", "page");
    await expect(aboutTab).toHaveAttribute("aria-current", "page");
  });

  test("Should close a tab and redirect to home when active tab is closed", async ({
    page,
  }) => {
    const fileBar = page.getByTestId("file-bar-container");
    const sidebar = page.locator("aside");

    await sidebar.getByRole("link", { name: "about.md" }).click();

    const aboutTab = fileBar.getByRole("link", { name: "about.md" });

    await aboutTab.getByTestId("tab-close-btn").click();

    await expect(aboutTab).not.toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Should persist open tabs across page reload", async ({ page }) => {
    const fileBar = page.getByTestId("file-bar-container");
    const sidebar = page.locator("aside");

    await sidebar.getByRole("link", { name: "about.md" }).click();
    await sidebar.getByRole("link", { name: "cv-creator.tsx" }).click();

    await expect(page).toHaveURL(/\/cv-creator$/);
    await expect(fileBar.getByRole("link")).toHaveCount(2);

    await page.reload();

    await expect(fileBar.getByRole("link")).toHaveCount(2);
    await expect(fileBar.getByRole("link", { name: "about.md" })).toBeVisible();
    await expect(
      fileBar.getByRole("link", { name: "cv-creator.tsx" }),
    ).toBeVisible();
  });
});
