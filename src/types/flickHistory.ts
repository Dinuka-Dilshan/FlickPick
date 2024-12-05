export type FlickHistoryItem = {
  imdbId: string;
  title: string;
  image: string;
  releaseYear: string;
  watchedOn: number;
  userRating: number;
  type: string;
  note: string;
  runtime: number;
  genre: string[];
};

export type FlickHistoryGetResponse = FlickHistoryItem[];
