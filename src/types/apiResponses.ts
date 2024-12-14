export type SearchMovieItem = {
  imdbId: string;
  posterUrl: string;
  releaseYear: string;
  title: string;
};
export type SearchMovieResponse = SearchMovieItem[];

export type PopularItem = {
  title: string;
  imdbId: string;
  releaseYear: string;
  posterUrl: string;
  rank: number;
};
export type PopularMovieResponse = PopularItem[];

export type TitleDetails = {
  title: string;
  ratings?: string;
  voteCount?: string;
  releaseYear: string;
  certificate?: string;
  runtime?: string;
  runtimeSeconds?: number;
  posterUrl: string;
  videoUrls?: string[];
  genres?: string[];
  plot?: string;
  imdbId: string;
  releaseDate?: string;
  meterRanking?: {
    currentRank: number;
    rankChange: {
      changeDirection: string;
      difference: number;
    };
  };
  userReviewsCout?: number;
  titleType?: string;
  isSeries?: boolean;
  publicationStatus?: string;
  criticReviewsTotal?: number;
  countriesOfOrigin?: string[];
  featuredReviews?: {
    author: string;
    summary: string;
    text: string;
    date: string;
    authorRating: number;
  }[];
  creators?: string[];
  moreLikeThis: {
    posterUrl: string;
    title: string;
    releaseYear: number;
    titleType: string;
    imdbId: string;
  }[];
  isAlreadyWatched: boolean;
};

export type WatchListItem = {
  releaseYear: string;
  title: string;
  posterUrl: string;
  imdbId: string;
  addedOn: number;
};
export type WatchListResponse = WatchListItem[];
