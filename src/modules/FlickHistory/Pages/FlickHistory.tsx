import { useNavigate } from "react-router-dom";
import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { ROUTES } from "../../../constants/routes";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { FlickHistoryGetResponse } from "../../../types/flickHistory";

const FlickHistory = () => {
  const navigate = useNavigate();
  const { data, isFetching, error } = useAppQuery<FlickHistoryGetResponse>({
    queryKey: QUERY_KEYS.FLICK_HISTORY,
    url: URLS.FLICK_HISTORY(),
  });

  return (
    <ItemListLayout
      error={error}
      isLoading={isFetching}
      itemList={data || []}
      title="Flick History"
      itemRenderer={(movie) => (
        <MovieCard
          hideWishListButton
          movie={{
            posterUrl: movie.image,
            addedOn: movie.addedOn,
            imdbId: movie.imdbId,
            title: movie.title,
          }}
        >
          <MovieCard.MovieCardHistoryDetails />
        </MovieCard>
      )}
      emptyMessage={{
        show: true,
        actionLabel: "Explore the Top Chart",
        message:
          "Your History is emptier than a popcorn bucket after movie night.",
        action: () => navigate(ROUTES.POPULAR_MOVIES),
      }}
    />
  );
};

export default FlickHistory;
