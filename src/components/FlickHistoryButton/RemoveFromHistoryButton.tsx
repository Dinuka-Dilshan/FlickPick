import { Button, CircularProgress, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useAppMutation from "../../services/query/useAppMutation";
import { FlickHistoryGetResponse } from "../../types/flickHistory";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

type Props = {
  imdbId: string;
};

const RemoveButton = ({ imdbId }: Props) => {
  const queryClient = useQueryClient();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { mutate, isPending } = useAppMutation({
    url: URLS.FLICK_HISTORY(imdbId),
    method: "DELETE",
    onSuccess: async () => {
      queryClient.setQueryData<FlickHistoryGetResponse>(
        [QUERY_KEYS.FLICK_HISTORY],
        (prev) => prev?.filter((item) => item.imdbId !== imdbId)
      );
    },
  });

  const handleMutate = () => mutate(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsConfirmationOpen((p) => !p);
  };

  const handleAccept = () => {
    handleMutate();
    setIsConfirmationOpen((p) => !p);
  };

  return (
    <>
      <Button
        size="small"
        fullWidth
        disabled={isPending}
        onClick={handleClick}
        sx={{ textTransform: "none" }}
      >
        {isPending && (
          <CircularProgress size="20px" sx={{ color: "#B3B3B3" }} />
        )}
        <Typography sx={{ color: "#fff" }}>
          {isPending ? "Removing" : "Remove From History"}
        </Typography>
      </Button>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        cancelButtonText="Cancel"
        confirmButtonText="Remove"
        onCancel={() => setIsConfirmationOpen(false)}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleAccept}
        subtitle="This movie will no longer appear in your Flick History. Proceed with removal?"
        title="Confirm Removal"
      />
    </>
  );
};

export default RemoveButton;
