import AddIcon from "@mui/icons-material/AddOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { Box, Tooltip } from "@mui/material";
import useMutateWatchList from "../../../hooks/useMutateWatchList";
import { Movie } from "../../../types/movie";
import "./style.css";
type Props = {
  movie: Movie;
};

const WatchListButton = ({ movie }: Props) => {
  const { handleAddRemove, isAddedToWishList, isLoading } = useMutateWatchList({
    movie,
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
        bgcolor: isAddedToWishList
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
          {isAddedToWishList ? (
            <DoneIcon sx={{ color: "#FFF" }} />
          ) : (
            <AddIcon sx={{ color: "#FFF" }} />
          )}
        </Tooltip>
      )}
    </Box>
  );
};

export default WatchListButton;
