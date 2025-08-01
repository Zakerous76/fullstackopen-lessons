const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2025"
      )
    ).toBeVisible();
  });

  test("user can log in with correct credentials", async ({ page }) => {
    await loginWith(page, "mluukkai", "salainen");
    await expect(page.getByText("logged-in", { exact: false })).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "mluukkai", "wrong");

    await expect(page.getByText("Wrong Credentials")).toBeVisible();

    const errorDiv = page.locator(".error");
    await expect(errorDiv).toContainText("Wrong Credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(
      page.getByText("Matti Luukkainen logged-in")
    ).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.goto("/");
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "another note by playwright");
      });

      test("importance can be changed", async ({ page }) => {
        await page
          .getByRole("button", { name: "make 'not important'" })
          .click();
        await expect(page.getByText("make important")).toBeVisible();
      });
    });
    describe("and several notes exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("first on can be made nonimportant", async ({ page }) => {
        const listItem = await page.locator("li.note", {
          hasText: "first note",
        });
        const toggleButton = listItem.getByRole("button");
        await toggleButton.click();

        await expect(toggleButton).toHaveText("make 'not important'");
      });

      test("importance can be changed", async ({ page }) => {
        const listItem = await page.locator("li.note", {
          hasText: "second note",
        });
        const toggleButton = listItem.getByRole("button");
        await toggleButton.click();

        await expect(toggleButton).toHaveText("make 'not important'");
      });
    });
  });
});
