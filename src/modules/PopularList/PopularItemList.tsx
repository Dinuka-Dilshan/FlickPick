import ItemListLayout from "../../components/Layouts/ItemListLayout";
import MovieCard from "../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useAppQuery from "../../services/query/useAppQuery";
import { PopularMovieResponse } from "../../types/apiResponses";

type Props = {
  varient: "TVS" | "MOVIES";
};

const PopularItemList = ({ varient }: Props) => {
  const { data, error, isFetching } = useAppQuery<PopularMovieResponse>({
    queryKey: QUERY_KEYS.POPULAR_MOVIES_TVS(varient),
    url: URLS.POPULAR(varient),
  });

  return (
    <ItemListLayout
      error={error}
      isLoading={isFetching}
      itemList={data || []}
      itemRenderer={(movie) => (
        <MovieCard movie={movie}>
          <MovieCard.Rank />
          <MovieCard.TitleContainer>
            <MovieCard.Title />
            <MovieCard.ReleaseYear />
          </MovieCard.TitleContainer>
        </MovieCard>
      )}
      title={`Top Chart: ${varient === "MOVIES" ? "Movies" : "Tv Shows"}`}
    />
  );
};

export default PopularItemList;
