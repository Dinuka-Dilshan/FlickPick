export const QUERY_KEYS = {
  POPULAR_MOVIES_TVS: "POPULAR_MOVIES_TVS",
  SEARCH_MOVIES_TVS: (searchText: string) => `SEARCH_MOVIES_TVS-${searchText}`,
  TITLE_DETAILS: (title: string) => `TITLE_DETAILS-${title}`,
  WATCH_LIST: "WATCH_LIST",
  FLICK_HISTORY: "FLICK_HISTORY",
};
