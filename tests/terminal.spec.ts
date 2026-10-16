import { test, expect, Locator, Page } from "@playwright/test";

async function toggleTerminalWithShortcut(page: Page) {
  await expect(async () => {
    await page.keyboard.press("Control+Backquote");
    await expect(page.getByTestId("terminal-container")).toBeVisible({
      timeout: 500,
    });
  }).toPass({ timeout: 5000 });
}

async function runCommand(input: Locator, command: string) {
  await input.fill(command);
  await input.press("Enter");
}

test.describe("Terminal", () => {
  let terminalContainer: Locator;
  let terminalInput: Locator;

  test.describe("Commands execution", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await toggleTerminalWithShortcut(page);

      terminalContainer = page.getByTestId("terminal-container");
      terminalInput = page.getByTestId("terminal-input");

      await expect(terminalContainer).toBeVisible();
      await expect(terminalInput).toHaveValue("");
    });

    test("Should type 'help' and show all available commands", async () => {
      await runCommand(terminalInput, "help");

      const expectedCommands = [
        "help",
        "whoami",
        "skills",
        "contact",
        "projects",
        "clear",
        "date",
        "echo",
        "sudo",
      ];

      for (const command of expectedCommands) {
        await expect(terminalContainer).toContainText(command);
      }
    });

    test("Should execute 'whoami' command", async () => {
      await runCommand(terminalInput, "whoami");

      await expect(
        terminalContainer.getByText(/Michał - Full-stack developer/i),
      ).toBeVisible();
    });

    test("Should execute 'skills' command", async () => {
      await runCommand(terminalInput, "skills");

      await expect(terminalContainer.getByText(/Tech Stack:/i)).toBeVisible();
      await expect(
        terminalContainer.getByText(/Next\.js, React, TypeScript/i),
      ).toBeVisible();
    });

    test("Should execute 'contact' command and display links", async () => {
      await runCommand(terminalInput, "contact");

      await expect(
        terminalContainer.getByRole("link", {
          name: "doboszmichal4@gmail.com",
        }),
      ).toBeVisible();
      await expect(
        terminalContainer.getByRole("link", { name: /linkedin\.com/i }),
      ).toBeVisible();
      await expect(
        terminalContainer.getByRole("link", { name: "github.com/Romedix1" }),
      ).toBeVisible();
    });

    test("Should execute 'projects' command", async () => {
      await runCommand(terminalInput, "projects");

      await expect(terminalContainer.getByText("Blackwall Tech")).toBeVisible();
      await expect(terminalContainer.getByText("CV Creator")).toBeVisible();
    });

    test("Should execute 'echo' command with arguments", async () => {
      await runCommand(terminalInput, "echo Playwright test");

      await expect(
        terminalContainer.getByText("Playwright test", { exact: true }),
      ).toBeVisible();
    });

    test("Should execute 'sudo' command and show permission denied", async () => {
      await runCommand(terminalInput, "sudo rm -rf /");

      await expect(
        terminalContainer.getByText(
          "permission denied. This incident will be reported",
        ),
      ).toBeVisible();
    });

    test("Should show error for unknown command", async () => {
      await runCommand(terminalInput, "unknowncommand");

      await expect(
        terminalContainer.getByText("unknowncommand: command not found"),
      ).toBeVisible();
    });

    test("Should clear terminal history on 'clear' command", async () => {
      await runCommand(terminalInput, "whoami");
      await expect(
        terminalContainer.getByText(/Michał - Full-stack developer/i),
      ).toBeVisible();

      await runCommand(terminalInput, "clear");

      await expect(
        terminalContainer.getByText(/Michał - Full-stack developer/i),
      ).not.toBeVisible();
    });

    test("Should navigate history using ArrowUp and ArrowDown", async ({
      page,
    }) => {
      await runCommand(terminalInput, "whoami");
      await runCommand(terminalInput, "skills");

      await page.keyboard.press("ArrowUp");
      await expect(terminalInput).toHaveValue("skills");

      await page.keyboard.press("ArrowUp");
      await expect(terminalInput).toHaveValue("whoami");

      await page.keyboard.press("ArrowDown");
      await expect(terminalInput).toHaveValue("skills");

      await page.keyboard.press("ArrowDown");
      await expect(terminalInput).toHaveValue("");
    });
  });

  test.describe("UI triggers", () => {
    test("Should open terminal from homepage button", async ({ page }) => {
      await page.goto("/");
      await page.getByTestId("home-terminal-btn").click();

      const container = page.getByTestId("terminal-container");
      await expect(container).toBeVisible();

      const input = page.getByTestId("terminal-input");
      await expect(input).toBeVisible();
      await expect(input).toHaveValue("");
    });

    test("Should close terminal using close button", async ({ page }) => {
      await page.goto("/");
      await page.getByTestId("home-terminal-btn").click();

      const container = page.getByTestId("terminal-container");
      await expect(container).toBeVisible();

      await page.getByTestId("terminal-close-btn").click();
      await expect(container).not.toBeVisible();
    });

    test("Should toggle terminal using shortcut", async ({ page }) => {
      await page.goto("/");
      await toggleTerminalWithShortcut(page);

      const container = page.getByTestId("terminal-container");
      await expect(container).toBeVisible();

      await page.keyboard.press("Control+Backquote");
      await expect(container).not.toBeVisible();
    });
  });
});
