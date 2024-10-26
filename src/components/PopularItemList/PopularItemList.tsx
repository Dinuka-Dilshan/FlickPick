import { Box, Grid2, Skeleton, Typography } from "@mui/material";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useAppQuery from "../../Query/useAppQuery";
import { PopularMovieResponse } from "../../types/apiResponses";
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
        Most Popular {varient === "MOVIE" ? "Movies" : "Tv series"} Today
      </Typography>
      {isFetching ? (
        <Grid2 container spacing={1.5} mt={"1rem"}>
          {[...Array(25)].map((_, index) => (
            <Grid2 size={{ xs: 12, md: 2 }} key={index}>
              <Skeleton variant="rounded" width="100%" height={300} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Grid2 container spacing={1.5} mt={"1rem"}>
          {data?.map((movie, index) => (
            <Grid2 size={{ xs: 12, md: 2 }} key={index}>
              <MovieCard
                image={movie.posterUrl}
                name={movie.name}
                year={movie.year}
                rank={movie.rank}
                duration={movie.duration}
                ratings={movie.ratings}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default PopularItemList;