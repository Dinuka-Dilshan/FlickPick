const BASE_URL = import.meta.env.VITE_BASE_URL;

export const URLS = {
  POPULAR: (type: "MOVIES" | "TVS") => `${BASE_URL}/top/${type.toLowerCase()}`,
  SEARCH: (searchText: string, exact?: boolean) =>
    `${BASE_URL}/search?searchText=${searchText}${exact ? "&exact=true" : ""}`,
  TITLE_DETAILS: (title: string) => `${BASE_URL}/title/${title}`,
  WATCH_LIST: (imdbId?: string) =>
    imdbId ? `${BASE_URL}/watchlist?imdbId=${imdbId}` : `${BASE_URL}/watchlist`,
  FLICK_HISTORY: (imdbId?: string) =>
    `${BASE_URL}/flickhistory${imdbId ? `?imdbId=${imdbId}` : ""}`,
};
