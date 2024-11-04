export type SearchMovieResult = {
  posterUrl: string;
  title: string;
  releaseYear: string;
  imdbUrl: string;
  imdbId: string;
};

export type PopularMovie = {
  posterUrl: string;
  title: string;
  imdbUrl: string;
  releaseYear: string;
  runtime: string;
  certificate: string;
  ratings: string;
  voteCount: string;
  rank: number;
  imdbId: string;
};

export type MovieDetails = {
  title: string;
  ratings: number;
  voteCount: number;
  releaseYear: number;
  certificate: string;
  runtime: string;
  posterUrl: string;
  videoUrls: string[];
  genres: string[];
  plot: string;
  rank: string;
};

export type SearchMovieResponse = SearchMovieResult[];
export type PopularMovieResponse = PopularMovie[];
export type MovieDetailsResponse = MovieDetails;
