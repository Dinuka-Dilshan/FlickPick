import { useQueryClient } from "@tanstack/react-query";
import { URLS } from "../constants/urls";
import useAppMutation from "../services/query/useAppMutation";
import { WatchListItem } from "../types/apiResponses";

type Props = {
  watchListItem?: WatchListItem;
  isAddedToWatchList: boolean;
  keyToInvalidate?: string;
  onAddToWatchListChange?: (operation: "Added" | "Deleted") => void;
};

const useMutateWatchList = ({
  watchListItem,
  isAddedToWatchList,
  keyToInvalidate,
  onAddToWatchListChange,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useAppMutation<
    undefined,
    Error,
    WatchListItem | undefined
  >({
    url: URLS.WATCH_LIST(isAddedToWatchList ? watchListItem?.imdbId : ""),
    method: isAddedToWatchList ? "DELETE" : "POST",
    onSuccess: async () => {
      if (keyToInvalidate) {
        queryClient.invalidateQueries({
          queryKey: [keyToInvalidate],
        });
      }
      onAddToWatchListChange?.(isAddedToWatchList ? "Deleted" : "Added");
    },
  });

  return {
    isLoading: isPending,
    handleAddRemove: () => {
      mutate(isAddedToWatchList ? undefined : watchListItem);
    },
  };
};

export default useMutateWatchList;
