import { Box, Grid2, Typography } from "@mui/material";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useAuth } from "../../hooks/useAuth";
import useAppQuery from "../../services/query/useAppQuery";
import { getPopularMoviesTvs } from "../../services/s3";
import { PopularMovie } from "../../types/apiResponses";
import LoadingItemIndicator from "../LoadingItemIndicator/LoadingItemIndicator";
import MovieCard from "../MovieCard/MovieCard";

type Props = {
  varient: "TV" | "MOVIE";
};

const PopularItemList = ({ varient }: Props) => {
  const { user } = useAuth();
  const { data, error, isFetching } = useAppQuery<{
    movies: PopularMovie[];
    tvs: PopularMovie[];
  }>({
    queryKey: QUERY_KEYS.POPULAR_MOVIES_TVS,
    queryFn: () => getPopularMoviesTvs(user?.idToken as string),
  });

  if (error) {
    return <Box>Somthing went wrong! refresh the browser</Box>;
  }

  const list = varient === "MOVIE" ? data?.movies : data?.tvs;

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        Most Popular {varient === "MOVIE" ? "Movies" : "Tv Series"} Today
      </Typography>
      {isFetching ? (
        <LoadingItemIndicator />
      ) : (
        <Grid2 container spacing={1.5} mt={"1rem"}>
          {list?.map?.((movie, index) => (
            <Grid2 size={{ xs: 6, md: 4, lg: 3 }} key={index}>
              <MovieCard
                image={movie.posterUrl}
                name={movie.title}
                year={movie.releaseYear}
                rank={movie.rank}
                duration={movie.runtime}
                ratings={movie.ratings}
                imdbId={movie.imdbId}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default PopularItemList;
