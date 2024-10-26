export type SearchMovieResult = {
  posterUrl: string;
  name: string;
  year: string;
  imdbUrl: string;
  imdbId: string;
};

export type PopularMovie = {
  posterUrl: string;
  name: string;
  imdbUrl: string;
  year: string;
  duration: string;
  rated: string;
  ratings: string;
  votes: string;
  rank: number;
  imdbId: string;
};

export type SearchMovieResponse = SearchMovieResult[];
export type PopularMovieResponse = PopularMovie[];
