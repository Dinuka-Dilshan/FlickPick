import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Chip, Grid2, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useAppQuery from "../Query/useAppQuery";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import { MovieDetailsResponse } from "../types/apiResponses";

const TitleDetails = () => {
  const params = useParams();
  const title = params.id ?? "";
  const { data, isFetching, isError } = useAppQuery<MovieDetailsResponse>({
    queryKey: QUERY_KEYS.TITLE_DETAILS(title),
    url: URLS.TITLE_DETAILS(title),
    enabled: !!title,
  });

  const commonHeight = "500px";

  if (isFetching) {
    return (
      <Grid2 container height="100%" rowSpacing={1} columnSpacing={1}>
        <Grid2 size={{ xs: 4 }} sx={{ height: "8vh" }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "16px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8 }} sx={{ height: "8vh" }}></Grid2>
        <Grid2 size={{ xs: 4 }} sx={{ height: commonHeight }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "16px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8 }} sx={{ height: commonHeight }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "16px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8 }} sx={{ height: "8vh" }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "16px" }}
          />
        </Grid2>
      </Grid2>
    );
  }

  if (isError || !data) {
    return (
      <Box>
        <Typography>Error</Typography>
      </Box>
    );
  }

  return (
    <Grid2 container rowSpacing={1} columnSpacing={1} height="100%" pb="2rem">
      <Grid2 size={{ xs: 12 }}>
        <Grid2 container justifyContent="space-between">
          <Grid2>
            <Typography variant="h2" fontWeight="bold">
              {data?.title}
            </Typography>
          </Grid2>
          <Grid2>
            <Box display="flex" alignItems="center" gap={1}>
              <FavoriteIcon sx={{ fontSize: "2rem" }} />
              <Box>
                <Typography variant="h5" fontWeight="bold" component={"span"}>
                  {data?.ratings}
                  <Typography component={"span"} fontWeight="bold">
                    /10
                  </Typography>
                </Typography>
                <Typography fontWeight="bold">
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    data.voteCount
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {data?.releaseYear}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            - {data?.certificate} -
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {data?.runtime}
          </Typography>
        </Box>
      </Grid2>

      <Grid2 size={{ xs: 12, lg: 3.5 }} height="100%">
        <Box
          component="img"
          src={data?.posterUrl}
          sx={{
            borderRadius: "16px",
            width: "100%",
            height: commonHeight,
            objectFit: "cover",
            border: "none",
          }}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, lg: 8.5 }} height="100%">
        <Box
          component={"video"}
          autoPlay
          muted
          loop
          src={data?.videoUrls?.[0]}
          sx={{
            borderRadius: "16px",
            width: "100%",
            height: commonHeight,
            display: { xs: "none", lg: "block" },
            objectFit: "cover",
          }}
        />
      </Grid2>
      <Grid2
        size={{ xs: 8 }}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
        order={4}
      >
        {data?.genres?.map((genre, i) => (
          <Chip key={i} label={genre} />
        ))}
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 8 }}>
        <Typography variant="subtitle1">{data?.plot}</Typography>
      </Grid2>
    </Grid2>
  );
};

export default TitleDetails;
