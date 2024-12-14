import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import useAppMutation from "../services/query/useAppMutation";
import useAppQuery from "../services/query/useAppQuery";
import { WatchListItem, WatchListResponse } from "../types/apiResponses";
import { Movie } from "../types/movie";

const useMutateWatchList = ({
  watchListItem,
}: {
  watchListItem?: WatchListItem;
}) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useAppQuery<WatchListResponse>({
    queryKey: QUERY_KEYS.WATCH_LIST,
    url: URLS.WATCH_LIST(),
  });

  const isAddedToWishList = useMemo(
    () =>
      watchListItem
        ? data?.some((item) => item.imdbId === watchListItem.imdbId)
        : false,
    [data, watchListItem]
  );

  const { mutate, isPending } = useAppMutation<
    undefined,
    Error,
    Movie | undefined
  >({
    url: URLS.WATCH_LIST(isAddedToWishList ? watchListItem?.imdbId : ""),
    method: isAddedToWishList ? "DELETE" : "POST",
    onSuccess: async () => {
      queryClient.setQueryData<WatchListResponse>(
        [QUERY_KEYS.WATCH_LIST],
        (prev) => {
          if (isAddedToWishList) {
            return prev?.filter(
              (item) => item.imdbId !== watchListItem?.imdbId
            );
          }

          if (!watchListItem) {
            return prev;
          }
          watchListItem.addedOn = Date.now();
          return prev ? [watchListItem, ...prev] : [watchListItem];
        }
      );
    },
  });

  return {
    isLoading: isFetching || isPending,
    isAddedToWishList,
    handleAddRemove: () => {
      mutate(isAddedToWishList ? undefined : watchListItem);
    },
  };
};

export default useMutateWatchList;
