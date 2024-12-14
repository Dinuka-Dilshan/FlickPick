import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { CircularProgress, IconButton } from "@mui/material";
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

const FlickHistoryIcon = ({ imdbId }: Props) => {
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
      {isPending ? (
        <CircularProgress size="20px" sx={{ color: "#B3B3B3" }} />
      ) : (
        <IconButton disabled={isPending} onClick={handleClick}>
          <DeleteIcon sx={{ color: "#B3B3B3" }} fontSize="small" />
        </IconButton>
      )}

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
    </>
  );
};

export default FlickHistoryIcon;
