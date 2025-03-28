import { Box, Tooltip } from "@mui/material";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import useMutateWatchList from "../../../hooks/useMutateWatchList";
import { WatchListItem } from "../../../types/apiResponses";
import "./style.css";

type Props = {
  watchListItem: WatchListItem;
  isAddedToWatchList: boolean;
  keyToInvalidate?: string;
  onAddToWatchListChange?: (operation: "Added" | "Deleted") => void;
};

const WatchListButton = ({
  watchListItem,
  isAddedToWatchList,
  keyToInvalidate,
  onAddToWatchListChange,
}: Props) => {
  const { handleAddRemove, isLoading } = useMutateWatchList({
    watchListItem,
    isAddedToWatchList,
    keyToInvalidate,
    onAddToWatchListChange,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    handleAddRemove();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 950,
        bgcolor: isAddedToWatchList
          ? "rgba(255, 215, 0, 0.9)"
          : "rgba(64, 64, 64, 0.8)",
        borderTopLeftRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "0.5rem 0.25rem",
        borderBottomRightRadius: "12px",
      }}
    >
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <Tooltip title="Add to Wishlist">
          <span>
            {isAddedToWatchList ? (
              <MdBookmarkAdded size={20} style={{ color: "#FFF" }} />
            ) : (
              <MdBookmarkAdd size={20} style={{ color: "#FFF" }} />
            )}
          </span>
        </Tooltip>
      )}
    </Box>
  );
};

export default WatchListButton;
