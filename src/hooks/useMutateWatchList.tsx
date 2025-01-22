import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import useAppMutation from "../services/query/useAppMutation";
import useAppQuery from "../services/query/useAppQuery";
import { WatchListItem, WatchListResponse } from "../types/apiResponses";

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
        ? data?.watchListItems?.some(
            (item) => item.imdbId === watchListItem.imdbId
          )
        : false,
    [data, watchListItem]
  );

  const { mutate, isPending } = useAppMutation<
    undefined,
    Error,
    WatchListItem | undefined
  >({
    url: URLS.WATCH_LIST(isAddedToWishList ? watchListItem?.imdbId : ""),
    method: isAddedToWishList ? "DELETE" : "POST",
    onSuccess: async () => {
      queryClient.setQueryData<WatchListResponse>(
        [QUERY_KEYS.WATCH_LIST],
        (prev) => {
          if (isAddedToWishList) {
            return {
              watchListItems:
                prev?.watchListItems?.filter(
                  (item) => item.imdbId !== watchListItem?.imdbId
                ) || [],
              lastEvaluatedKey: prev?.lastEvaluatedKey,
            };
          }

          if (!watchListItem) {
            return prev;
          }
          watchListItem.addedOn = Date.now();
          return {
            watchListItems: prev?.watchListItems
              ? [watchListItem, ...prev.watchListItems]
              : [watchListItem],
            lastEvaluatedKey: prev?.lastEvaluatedKey,
          };
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
