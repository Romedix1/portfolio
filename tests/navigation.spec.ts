import { test, expect, Page } from "@playwright/test";

type OpenPageAndCheckHeaderParams = {
  page: Page;
  link: string;
  url: string;
  header: string | RegExp;
};

async function OpenPageAndCheckHeader({
  page,
  link,
  url,
  header,
}: OpenPageAndCheckHeaderParams) {
  await page.goto("/");

  await page.getByRole("link", { name: link }).click();

  await expect(page).toHaveURL(new RegExp(`/${url}$`));

  await expect(page.getByRole("heading", { name: header })).toBeVisible();
}

test.describe("Navigation", () => {
  test("Should correctly open about.md page", async ({ page }) => {
    await OpenPageAndCheckHeader({
      page,
      link: "about.md",
      url: "about",
      header: /About Me/i,
    });
  });

  test("Should correctly open contact.md page", async ({ page }) => {
    await OpenPageAndCheckHeader({
      page,
      link: "contact.md",
      url: "contact",
      header: /Contact/i,
    });
  });

  test("Should correctly open cv-creator.tsx page", async ({ page }) => {
    await OpenPageAndCheckHeader({
      page,
      link: "cv-creator.tsx",
      url: "cv-creator",
      header: /Cv Creator/i,
    });
  });

  test("Should correctly open blackwall-tech.tsx page", async ({ page }) => {
    await OpenPageAndCheckHeader({
      page,
      link: "blackwall-tech.tsx",
      url: "blackwall-tech",
      header: /Blackwall Tech/i,
    });
  });

  test("Should correctly show 404 page", async ({ page }) => {
    await page.goto("/notfound");

    await expect(page).toHaveURL(/\/notfound$/);

    await expect(
      page.getByRole("heading", { name: "404: File Not Found" }),
    ).toBeVisible();

    await page.getByRole("link", { name: /Return to root/i }).click();
    await expect(page).toHaveURL(new RegExp(`/$`));
  });
});
