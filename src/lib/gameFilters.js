export function normalizeText(value) {
  return value.toString().trim().toLowerCase();
}

export function filterGames(games, selectedGenre = "all", searchTerm = "") {
  const normalizedSearch = normalizeText(searchTerm);

  return games.filter((game) => {
    const matchesGenre = selectedGenre === "all" || game.genre === selectedGenre;
    const searchableText = normalizeText(`${game.name} ${game.genre}`);
    const matchesSearch = searchableText.includes(normalizedSearch);

    return matchesGenre && matchesSearch;
  });
}

export function getFavoriteGames(games, favoriteIds) {
  const ids = new Set(favoriteIds);
  return games.filter((game) => ids.has(game.id));
}
