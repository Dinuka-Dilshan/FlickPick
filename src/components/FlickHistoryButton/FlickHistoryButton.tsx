import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useAppMutation from "../../services/query/useAppMutation";
import { TitleDetails } from "../../types/apiResponses";
import {
  FlickHistoryGetResponse,
  FlickHistoryItem,
} from "../../types/flickHistory";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

type Props = {
  movie: TitleDetails;
};

const FlickHistoryButton = ({ movie }: Props) => {
  const [isWatched, setIsWatched] = useState(movie.isAlreadyWatched);
  const queryClient = useQueryClient();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { mutate, isPending } = useAppMutation<FlickHistoryItem | undefined>({
    url: URLS.FLICK_HISTORY(isWatched ? movie.imdbId : ""),
    method: isWatched ? "DELETE" : "POST",
    onSuccess: async () => {
      queryClient.setQueryData<FlickHistoryGetResponse>(
        [QUERY_KEYS.FLICK_HISTORY],
        (prev) => {
          if (isWatched) {
            return {
              historyItems:
                prev?.historyItems?.filter(
                  (item) => item.imdbId !== movie?.imdbId
                ) || [],
              lastEvaluatedKey: prev?.lastEvaluatedKey,
            };
          }

          if (!movie) {
            return prev;
          }

          const historyItem: FlickHistoryItem = {
            genre: movie.genres || [],
            image: movie.posterUrl,
            imdbId: movie.imdbId,
            runtime: movie.runtimeSeconds || 1,
            title: movie.title,
            addedOn: Date.now(),
            type: movie.titleType || "",
          };

          return {
            historyItems: prev
              ? [historyItem, ...prev.historyItems]
              : [historyItem],
            lastEvaluatedKey: prev?.lastEvaluatedKey,
          };
        }
      );
      queryClient.setQueryData<TitleDetails>(
        [QUERY_KEYS.TITLE_DETAILS(movie.imdbId)],
        (prev) => {
          if (!prev) return;
          return { ...prev, isAlreadyWatched: !isWatched };
        }
      );
      setIsWatched((p) => !p);
    },
  });

  const handleMutate = () => {
    mutate(
      isWatched
        ? undefined
        : {
            imdbId: movie.imdbId,
            genre: movie.genres || [],
            image: movie.posterUrl,
            title: movie.title,
            type: movie.titleType || "",
            addedOn: Date.now(),
            runtime: movie.runtimeSeconds || 0,
          }
    );
  };

  const handleClick = () => {
    if (isWatched) {
      setIsConfirmationOpen((p) => !p);
    } else {
      handleMutate();
    }
  };

  const handleAccept = () => {
    handleMutate();
    setIsConfirmationOpen((p) => !p);
  };

  return (
    <Button
      disabled={isPending}
      fullWidth
      sx={{
        textTransform: "none",
        bgcolor: isWatched ? "#2A2C31" : "",
        color: isWatched ? "#00dd82" : "",
      }}
      variant="outlined"
      onClick={handleClick}
    >
      {!isPending && (
        <MdOutlineDone
          size={20}
          color="inherit"
          style={{ marginRight: "0.2rem" }}
        />
      )}
      {isPending ? (isWatched ? "Removing..." : "Adding...") : "Watched"}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        onCancel={() => setIsConfirmationOpen(false)}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleAccept}
        subtitle="This movie will no longer appear in your Flick History. Proceed with removal?"
        title="Confirm Removal"
      />
    </Button>
  );
};

export default FlickHistoryButton;
