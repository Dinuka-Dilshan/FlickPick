import { Box, Grid2, Typography } from "@mui/material";
import { formatDistanceToNow, intervalToDuration } from "date-fns";
import { useMemo } from "react";
import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MoviePoster from "../../../components/MovieCard/MoviePoster";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { FlickHistoryGetResponse } from "../../../types/flickHistory";
import { findMostFrequent } from "../../../utils/stats";
const FlickHistory = () => {
  const { data, isFetching, error } = useAppQuery<FlickHistoryGetResponse>({
    queryKey: QUERY_KEYS.FLICK_HISTORY,
    url: URLS.FLICK_HISTORY(),
  });

  const movies = useMemo(
    () => data?.filter((item) => item.type === "Movie"),
    [data]
  );
  const tvs = useMemo(
    () => data?.filter((item) => item.type !== "Movie"),
    [data]
  );
  const duration = useMemo(
    () =>
      intervalToDuration({
        end:
          (data?.reduce((total, item) => item.runtime + total, 0) || 0) * 1000,
        start: 0,
      }),
    [data]
  );
  const favGenre = useMemo(
    () =>
      findMostFrequent(data?.flatMap((item) => item.genre) || []).mostFrequent,
    [data]
  );

  console.log(duration);

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2
          size={{ xs: 6 }}
          gap={1.5}
          display={"flex"}
          alignItems="baseline"
          bgcolor="#2C3032"
          p="0.75rem"
          borderRadius="12px"
          flexDirection="column"
        >
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            Total Movies
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            {movies?.length}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 6 }}
          gap={1.5}
          display={"flex"}
          alignItems="baseline"
          bgcolor="#2C3032"
          p="0.75rem"
          borderRadius="12px"
          flexDirection="column"
        >
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            Total Tvs
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            {tvs?.length}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 6 }}
          gap={1.5}
          display={"flex"}
          alignItems="baseline"
          bgcolor="#2C3032"
          p="0.75rem"
          borderRadius="12px"
          flexDirection="column"
        >
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            Total Watch Time
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            {duration.months ? `${duration.months}m ` : ""}
            {duration.days ? `${duration.days}d ` : ""}
            {`${duration.hours || 0}h ${duration.minutes || 0}min`}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 6 }}
          gap={1.5}
          display={"flex"}
          alignItems="baseline"
          bgcolor="#2C3032"
          p="0.75rem"
          borderRadius="12px"
          flexDirection="column"
        >
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            Your Fav Genre
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            {favGenre}
          </Typography>
        </Grid2>
      </Grid2>
      <ItemListLayout
        error={error}
        isLoading={isFetching}
        itemList={data || []}
        itemRenderer={(movie) => (
          <Box>
            <MoviePoster image={movie.image} />
            <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
              {movie?.title}
            </Typography>
            {movie?.watchedOn && (
              <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
                Watched{" "}
                {formatDistanceToNow(new Date(movie?.watchedOn), {
                  addSuffix: true,
                }).replace(/^about /, "")}
              </Typography>
            )}
          </Box>
        )}
      />
    </>
  );
};

export default FlickHistory;
