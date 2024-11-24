import { Movie, WatchListMovie } from "./movie";

export type SearchMovieResponse = Movie[];
export type PopularMovieResponse = {
  movies: Movie[];
  tvs: Movie[];
};
export type MovieDetailsResponse = Movie;
export type WatchListResponse = WatchListMovie[];
