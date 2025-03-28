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
  isAddedToWatchList: boolean;
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
  creators?: string[];
  moreLikeThis: {
    posterUrl: string;
    title: string;
    releaseYear: number;
    titleType: string;
    imdbId: string;
  }[];
  isAlreadyWatched: boolean;
  cast: { id: string; name: string; image: string }[];
  episodes?: number;
  seasons?: number;
  images?: string[];
};

export type WatchListItem = {
  releaseYear: string;
  title: string;
  posterUrl: string;
  imdbId: string;
  addedOn: number;
};
export type WatchListResponse = {
  watchListItems: WatchListItem[];
  lastEvaluatedKey?: {
    PK?: string;
    SK?: string;
  };
};
