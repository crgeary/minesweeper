import { test, expect } from "@playwright/test";

test("loads with default 9x9 game", async ({ page }) => {
  await page.goto("/");

  const minefield = await page.getByTestId("minefield");
  const cells = await minefield.evaluate((e) => e.querySelectorAll("button"));

  expect(cells.length).toBe(81);
});
