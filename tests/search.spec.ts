import { test, expect, Locator, Page } from "@playwright/test";

async function openWithShortcut(page: Page, shortcut: string) {
  await page.keyboard.press(shortcut);
  await expect(page.getByRole("dialog")).toBeVisible();
}

test.describe("Search modal", () => {
  test.describe("Search files", () => {
    let searchModal: Locator;
    let searchInput: Locator;

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await openWithShortcut(page, "Control+p");

      searchModal = page.getByRole("dialog");
      searchInput = searchModal.getByLabel(/search files/i);

      await expect(searchModal).toBeVisible();
      await expect(searchInput).toHaveValue("");
    });

    test("Should filter files and open selected file", async ({ page }) => {
      await searchInput.fill("cv-creator.tsx");

      const cvCreatorLink = searchModal.getByRole("link", {
        name: "cv-creator.tsx",
      });

      await expect(cvCreatorLink).toBeVisible();
      await cvCreatorLink.click();

      await expect(page).toHaveURL(/\/cv-creator$/);
      await expect(searchModal).not.toBeVisible();
    });

    test("Should navigate list using ArrowDown and ArrowUp", async ({
      page,
    }) => {
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowUp");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("ArrowDown");

      await page.keyboard.press("Enter");

      await expect(page).toHaveURL(/\/about$/);
      await expect(searchModal).not.toBeVisible();
    });

    test("Should show empty state when no files match", async () => {
      await searchInput.fill("non-existing-file");
      await expect(
        searchModal.getByText("No matching files found"),
      ).toBeVisible();
    });
  });

  test.describe("Command palette", () => {
    let searchModal: Locator;
    let searchInput: Locator;

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await openWithShortcut(page, "Control+Shift+P");

      searchModal = page.getByRole("dialog");
      searchInput = searchModal.getByLabel(/command input/i);

      await expect(searchModal).toBeVisible();
      await expect(searchInput).toHaveValue(">");
    });

    test("Should copy email address on 'Contact: Copy Email Address'", async ({
      page,
      browserName,
    }) => {
      if (browserName === "chromium") {
        await page
          .context()
          .grantPermissions(["clipboard-read", "clipboard-write"]);
      }

      await searchInput.fill(">Copy Email");

      const copyCommand = searchModal.getByRole("button", {
        name: /Contact: Copy Email Address/i,
      });
      await expect(copyCommand).toBeVisible();
      await copyCommand.click();

      await expect(searchModal).not.toBeVisible();
      await expect(page.getByText("Email copied!")).toBeVisible();
    });

    test("Should download CV file on 'File: Download CV (.pdf)'", async ({
      page,
    }) => {
      await searchInput.fill(">Download CV");

      const downloadCommand = searchModal.getByRole("button", {
        name: /File: Download CV \(\.pdf\)/i,
      });
      await expect(downloadCommand).toBeVisible();

      const downloadPromise = page.waitForEvent("download");
      await downloadCommand.click();
      const download = await downloadPromise;

      expect(download.suggestedFilename()).toBe("CV_Michał_Dobosz.pdf");

      await expect(searchModal).not.toBeVisible();
      await expect(page.getByText("CV downloaded!")).toBeVisible();
    });

    test("Should open GitHub profile in new tab on 'Social: Open GitHub Profile'", async ({
      page,
    }) => {
      await searchInput.fill(">GitHub");

      const githubCommand = searchModal.getByRole("button", {
        name: /Social: Open GitHub Profile/i,
      });
      await expect(githubCommand).toBeVisible();

      const popupPromise = page.waitForEvent("popup");
      await githubCommand.click();
      const popup = await popupPromise;

      expect(popup.url()).toContain("github.com/Romedix1");

      await popup.close();
      await expect(searchModal).not.toBeVisible();
    });

    test("Should open LinkedIn profile in new tab on 'Social: Open LinkedIn'", async ({
      page,
    }) => {
      await searchInput.fill(">LinkedIn");

      const linkedinCommand = searchModal.getByRole("button", {
        name: /Social: Open LinkedIn/i,
      });
      await expect(linkedinCommand).toBeVisible();

      const popupPromise = page.waitForEvent("popup");
      await linkedinCommand.click();
      const popup = await popupPromise;

      expect(popup.url()).toContain("linkedin.com");

      await popup.close();
      await expect(searchModal).not.toBeVisible();
    });

    test("Should reload window on 'Developer: Reload Window'", async () => {
      await searchInput.fill(">Reload");

      const reloadCommand = searchModal.getByRole("button", {
        name: /Developer: Reload Window/i,
      });

      await expect(reloadCommand).toBeVisible();

      await reloadCommand.click();
      await expect(searchModal).not.toBeVisible();
    });

    test("Should execute command using keyboard navigation (Enter)", async ({
      page,
      browserName,
    }) => {
      if (browserName === "chromium") {
        await page
          .context()
          .grantPermissions(["clipboard-read", "clipboard-write"]);
      }

      await page.keyboard.press("Enter");

      await expect(searchModal).not.toBeVisible();
      await expect(page.getByText("Email copied!")).toBeVisible();
    });

    test("Should show empty state when no commands match query", async () => {
      await searchInput.fill(">nonexistentcommand");
      await expect(searchModal.getByText("No commands found")).toBeVisible();
    });

    test("Should close modal on Escape and click outside", async ({ page }) => {
      await page.keyboard.press("Escape");
      await expect(searchModal).not.toBeVisible();

      await openWithShortcut(page, "Control+Shift+P");
      await expect(searchModal).toBeVisible();

      await page.mouse.click(10, 10);
      await expect(searchModal).not.toBeVisible();
    });
  });

  test.describe("UI triggers", () => {
    test("Should open search files from homepage button", async ({ page }) => {
      await page.goto("/");
      await page.getByTestId("home-search-btn").click();

      const modal = page.getByRole("dialog");

      await expect(modal).toBeVisible();
      await expect(
        modal.getByRole("textbox", { name: /search files/i }),
      ).toHaveValue("");
    });

    test("Should open command palette from homepage button", async ({
      page,
    }) => {
      await page.goto("/");
      await page.getByTestId("home-palette-btn").click();

      const modal = page.getByRole("dialog");

      await expect(modal).toBeVisible();
      await expect(
        modal.getByRole("textbox", { name: /command input/i }),
      ).toHaveValue(">");
    });
  });
});
