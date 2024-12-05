import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { FlickHistoryGetResponse } from "../../../types/flickHistory";

const FlickHistory = () => {
  const { data, isFetching, error } = useAppQuery<FlickHistoryGetResponse>({
    queryKey: QUERY_KEYS.FLICK_HISTORY,
    url: URLS.FLICK_HISTORY(),
  });
  return (
    <ItemListLayout
      error={error}
      isLoading={isFetching}
      itemList={data || []}
      itemRenderer={(movie) => (
        <MovieCard
          movie={{ ...movie, posterUrl: movie.image,  }}
          hideWishListButton
        >
          <MovieCard.TitleContainer>
            <MovieCard.Title />
            <MovieCard.watchedOn />
          </MovieCard.TitleContainer>
        </MovieCard>
      )}
      title={"Flick History"}
    />
  );
};

export default FlickHistory;
