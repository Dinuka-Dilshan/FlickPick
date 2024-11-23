import AddIcon from "@mui/icons-material/AddOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { Box, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useAppMutation from "../../services/query/useAppMutation";
import useAppQuery from "../../services/query/useAppQuery";
import { WishListMovie } from "../../types/apiRequests";
import {
  SearchMovieResult,
  WishListItem,
  WishListResponse,
} from "../../types/apiResponses";
import "./style.css";
type Props = {
  movie: SearchMovieResult;
};

const WishListButton = ({ movie }: Props) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useAppQuery<WishListResponse>({
    queryKey: QUERY_KEYS.WISH_LIST,
    url: URLS.WISH_LIST(),
  });

  const isAddedToWishList = useMemo(
    () => data?.some((item) => item.SK.split("#")[1] === movie.imdbId),
    [data, movie.imdbId]
  );

  const { mutate, isPending } = useAppMutation<
    WishListItem,
    Error,
    WishListMovie | undefined
  >({
    url: URLS.WISH_LIST(isAddedToWishList ? movie.imdbId : ""),
    method: isAddedToWishList ? "DELETE" : "POST",
    onSuccess: async (addedItem) => {
      queryClient.setQueryData<WishListResponse>(
        [QUERY_KEYS.WISH_LIST],
        (prev) => {
          if (isAddedToWishList) {
            return prev?.filter(
              (item) => item.SK.split("#")[1] !== movie.imdbId
            );
          }
          return prev ? [...prev, addedItem] : [addedItem];
        }
      );
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    mutate(isAddedToWishList ? undefined : movie);
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
      {isFetching || isPending ? (
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

export default WishListButton;
