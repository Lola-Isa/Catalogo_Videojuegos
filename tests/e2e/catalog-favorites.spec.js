import { expect, test } from "@playwright/test";

test("permite buscar un juego y guardarlo como favorito local", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Buscar juego...").fill("Minecraft");
  await expect(page.getByRole("heading", { name: "Minecraft" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Valorant" })).toBeHidden();

  await page
    .locator("[data-game-card]", { has: page.getByRole("heading", { name: "Minecraft" }) })
    .getByRole("button", { name: "Agregar a favoritos" })
    .click();

  await expect(page.getByLabel("Juegos favoritos")).toContainText("Minecraft");
  await expect(page.getByText("Todavia no agregaste favoritos.")).toBeHidden();
});
