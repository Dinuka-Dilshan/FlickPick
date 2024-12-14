export type FlickHistoryItem = {
  imdbId: string;
  title: string;
  image: string;
  addedOn: number;
  type: string;
  runtime: number;
  genre: string[];
};

export type FlickHistoryGetResponse = FlickHistoryItem[];
