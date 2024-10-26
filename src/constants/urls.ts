export const URLS = {
  POPULAR_TVS: "http://192.168.8.189:5000/toptvs",
  POPULAR_MOVIES: "http://192.168.8.189:5000/topmovies",
  SEARCH: (searchText: string) =>
    `http://192.168.8.189:5000/search?searchText=${searchText}`,
  TITLE_DETAILS: (title: string) => `http://192.168.8.189:5000/title/${title}`,
};
