import { describe, expect, test } from "@jest/globals";
import { games } from "../../data/games.js";
import { filterGames, getFavoriteGames } from "../gameFilters.js";

describe("filterGames", () => {
  test("encuentra juegos por nombre sin importar mayusculas", () => {
    const result = filterGames(games, "all", "minecraft");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Minecraft");
  });

  test("filtra juegos por genero", () => {
    const result = filterGames(games, "Shooter", "");

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((game) => game.genre === "Shooter")).toBe(true);
  });
});

describe("getFavoriteGames", () => {
  test("devuelve solo los juegos marcados como favoritos", () => {
    const result = getFavoriteGames(games, ["minecraft", "valorant"]);

    expect(result.map((game) => game.name)).toEqual(["Minecraft", "Valorant"]);
  });
});
