export const QUERY_KEYS = {
  POPULAR_MOVIES_TVS: "POPULAR_MOVIES_TVS",
  SEARCH_MOVIES_TVS: (searchText: string) => `SEARCH_MOVIES_TVS-${searchText}`,
  TITLE_DETAILS: (title: string) => `TITLE_DETAILS-${title}`,
};
