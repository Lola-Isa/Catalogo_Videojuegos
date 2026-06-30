import { describe, expect, test } from "@jest/globals";
import { games } from "../../data/games.js";
import { countFavoritesByGenre, toggleFavoriteId } from "../favoriteIds.js";

describe("toggleFavoriteId", () => {
  test("agrega un favorito cuando no existe", () => {
    expect(toggleFavoriteId(["minecraft"], "valorant")).toEqual(["minecraft", "valorant"]);
  });

  test("quita un favorito cuando ya existe", () => {
    expect(toggleFavoriteId(["minecraft", "valorant"], "minecraft")).toEqual(["valorant"]);
  });
});

describe("countFavoritesByGenre", () => {
  test("agrupa favoritos por genero", () => {
    const result = countFavoritesByGenre(games, ["minecraft", "valorant"]);

    expect(result).toEqual({
      Sandbox: 1,
      Shooter: 1,
    });
  });
});
