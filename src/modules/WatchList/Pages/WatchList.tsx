import { useNavigate } from "react-router-dom";
import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { ROUTES } from "../../../constants/routes";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { WatchListItem, WatchListResponse } from "../../../types/apiResponses";

const WatchList = () => {
  const { data, isFetching, error } = useAppQuery<WatchListResponse>({
    url: URLS.WATCH_LIST(),
    queryKey: QUERY_KEYS.WATCH_LIST,
  });
  const navigate = useNavigate();

  return (
    <ItemListLayout<WatchListItem>
      error={error}
      isLoading={isFetching}
      itemList={data || []}
      itemRenderer={(movie) => (
        <MovieCard movie={movie}>
          <MovieCard.TitleContainer>
            <MovieCard.Title />
            <MovieCard.AddedOn />
          </MovieCard.TitleContainer>
        </MovieCard>
      )}
      title=" Your WatchList"
      emptyMessage={{
        show: true,
        actionLabel: "Explore the Top Chart",
        message:
          "Your watchlist is emptier than a popcorn bucket after movie night.",
        action: () => navigate(ROUTES.POPULAR_MOVIES),
      }}
    />
  );
};

export default WatchList;
