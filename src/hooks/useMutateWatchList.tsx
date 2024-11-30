import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import useAppMutation from "../services/query/useAppMutation";
import useAppQuery from "../services/query/useAppQuery";
import { WatchListResponse } from "../types/apiResponses";
import { Movie } from "../types/movie";

const useMutateWatchList = ({ movie }: { movie?: Movie }) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useAppQuery<WatchListResponse>({
    queryKey: QUERY_KEYS.WATCH_LIST,
    url: URLS.WATCH_LIST(),
  });

  const isAddedToWishList = useMemo(
    () => (movie ? data?.some((item) => item.imdbId === movie.imdbId) : false),
    [data, movie]
  );

  const { mutate, isPending } = useAppMutation<Movie, Error, Movie | undefined>(
    {
      url: URLS.WATCH_LIST(isAddedToWishList ? movie?.imdbId : ""),
      method: isAddedToWishList ? "DELETE" : "POST",
      onSuccess: async (addedItem) => {
        queryClient.setQueryData<WatchListResponse>(
          [QUERY_KEYS.WATCH_LIST],
          (prev) => {
            if (isAddedToWishList) {
              return prev?.filter((item) => item.imdbId !== movie?.imdbId);
            }
            return prev ? [...prev, addedItem] : [addedItem];
          }
        );
      },
    }
  );

  return {
    isLoading: isFetching || isPending,
    isAddedToWishList,
    handleAddRemove: () => {
      mutate(isAddedToWishList ? undefined : movie);
    },
  };
};

export default useMutateWatchList;
