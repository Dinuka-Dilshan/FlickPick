const BASE_URL = import.meta.env.VITE_BASE_URL;

export const URLS = {
  POPULAR_TVS: `${BASE_URL}/toptvs`,
  POPULAR_MOVIES: `${BASE_URL}/topmovies`,
  SEARCH: (searchText: string) => `${BASE_URL}/search?searchText=${searchText}`,
  TITLE_DETAILS: (title: string) => `${BASE_URL}/title/${title}`,
  WATCH_LIST: (imdbId?: string) =>
    imdbId ? `${BASE_URL}/watchlist?imdbId=${imdbId}` : `${BASE_URL}/watchlist`,
  FLICK_HISTORY: (imdbId?: string) =>
    `${BASE_URL}/flickhistory${imdbId ? `?imdbId=${imdbId}` : ""}`,
};
