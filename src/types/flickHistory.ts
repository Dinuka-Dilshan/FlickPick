export type FlickHistoryItem = {
  imdbId: string;
  title: string;
  image: string;
  addedOn: number;
  type: string;
  runtime: number;
  genre: string[];
};

export type FlickHistoryGetResponse = {
  historyItems: FlickHistoryItem[];
  lastEvaluatedKey?: {
    PK?: string;
    SK?: string;
  };
};
