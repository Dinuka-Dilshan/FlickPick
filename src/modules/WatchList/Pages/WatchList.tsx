import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { WatchListResponse } from "../../../types/apiResponses";
import { Movie } from "../../../types/movie";

const WatchList = () => {
  const { data, isFetching, error } = useAppQuery<WatchListResponse>({
    url: URLS.WATCH_LIST(),
    queryKey: QUERY_KEYS.WATCH_LIST,
  });

  return (
    <ItemListLayout<Movie>
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
    />
  );
};

export default WatchList;
