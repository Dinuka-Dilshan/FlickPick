export const QUERY_KEYS = {
  POPULAR_MOVIES_TVS: (varient: "MOVIES" | "TVS") =>
    `POPULAR_MOVIES_TVS${varient}`,
  SEARCH_MOVIES_TVS: (searchText: string, exact?: boolean) =>
    `SEARCH_MOVIES_TVS-${searchText}-${exact}`,
  TITLE_DETAILS: (title: string) => `TITLE_DETAILS-${title}`,
  WATCH_LIST: "WATCH_LIST",
  FLICK_HISTORY: `FLICK_HISTORY`,
};
