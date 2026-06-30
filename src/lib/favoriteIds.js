export function toggleFavoriteId(favoriteIds, gameId) {
  const ids = new Set(favoriteIds);

  if (ids.has(gameId)) {
    ids.delete(gameId);
  } else {
    ids.add(gameId);
  }

  return Array.from(ids);
}

export function countFavoritesByGenre(games, favoriteIds) {
  const ids = new Set(favoriteIds);

  return games.reduce((totals, game) => {
    if (!ids.has(game.id)) {
      return totals;
    }

    return {
      ...totals,
      [game.genre]: (totals[game.genre] || 0) + 1,
    };
  }, {});
}
