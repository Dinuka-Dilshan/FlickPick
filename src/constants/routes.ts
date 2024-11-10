export const ROUTES = {
  DEFAULT: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  POPULAR_MOVIES: "/movies",
  POPULAR_TVS: "/tvs",
  SEARCH: "/search",
  TITILE_DETAILS: (title: string) => `/title/${title}`,
  VERIFY_ACCOUNT: "/verify",
};
