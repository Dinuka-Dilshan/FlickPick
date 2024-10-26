export const QUERY_KEYS = {
  POPULAR_TVS: "POPULAR_TVS",
  POPULAR_MOVIES: "POPULAR_MOVIES",
  SEARCH_MOVIES_TVS: (searchText: string) => `SEARCH_MOVIES_TVS-${searchText}`,
};
