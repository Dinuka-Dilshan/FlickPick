import { Box, Grid2, Typography } from "@mui/material";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useAppQuery from "../../services/query/useAppQuery";
import { PopularMovieResponse } from "../../types/apiResponses";
import LoadingItemIndicator from "../LoadingItemIndicator/LoadingItemIndicator";
import MovieCard from "../MovieCard/MovieCard";

type Props = {
  varient: "TV" | "MOVIE";
};

const PopularItemList = ({ varient }: Props) => {
  const { data, error, isFetching } = useAppQuery<PopularMovieResponse>({
    queryKey:
      varient === "MOVIE" ? QUERY_KEYS.POPULAR_MOVIES : QUERY_KEYS.POPULAR_TVS,
    url: varient === "MOVIE" ? URLS.POPULAR_MOVIES : URLS.POPULAR_TVS,
  });

  if (error) {
    return <Box>Somthing went wrong! refresh the browser</Box>;
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        Most Popular {varient === "MOVIE" ? "Movies" : "Tv Series"} Today
      </Typography>
      {isFetching ? (
        <LoadingItemIndicator />
      ) : (
        <Grid2 container spacing={1.5} mt={"1rem"}>
          {data?.map?.((movie, index) => (
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
