export type SearchMovieResult = {
  posterUrl: string;
  name: string;
  year: string;
  imdbUrl: string;
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
};

export type SearchMovieResponse = SearchMovieResult[];
export type PopularMovieResponse = PopularMovie[];
