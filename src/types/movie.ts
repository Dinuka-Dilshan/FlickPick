export type Movie = {
  posterUrl: string;
  title: string;
  imdbId: string;
  releaseYear: string;
  runtime?: string;
  certificate?: string;
  ratings?: string;
  voteCount?: string;
  rank?: number;
  imdbUrl?: string;
  videoUrls?: string[];
  genres?: string[];
  plot?: string;
};

export type WatchListMovie = Pick<
  Movie,
  "imdbId" | "posterUrl" | "title" | "releaseYear"
> & { addedOn: number };
