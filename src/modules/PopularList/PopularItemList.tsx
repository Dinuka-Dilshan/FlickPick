import ItemListLayout from "../../components/Layouts/ItemListLayout";
import MovieCard from "../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../constants/queryKeys";
import useAuth from "../../hooks/useAuth";
import useAppQuery from "../../services/query/useAppQuery";
import { getPopularMoviesTvs } from "../../services/s3";
import { PopularMovieResponse } from "../../types/apiResponses";
type Props = {
  varient: "TV" | "MOVIE";
};

const PopularItemList = ({ varient }: Props) => {
  const { user } = useAuth();
  const { data, error, isFetching } = useAppQuery<PopularMovieResponse>({
    queryKey: QUERY_KEYS.POPULAR_MOVIES_TVS,
    queryFn: () => getPopularMoviesTvs(user?.idToken as string),
  });

  const list = varient === "MOVIE" ? data?.movies : data?.tvs;

  return (
    <ItemListLayout
      error={error}
      isLoading={isFetching}
      itemList={list || []}
      itemRenderer={(movie) => (
        <MovieCard movie={movie}>
          <MovieCard.Rank />
          <MovieCard.TitleContainer>
            <MovieCard.Title />
            <MovieCard.ReleaseYear />
          </MovieCard.TitleContainer>
        </MovieCard>
      )}
      title={`Top Chart: ${varient === "MOVIE" ? "Movies" : "Tv Shows"}`}
    />
  );
};

export default PopularItemList;
