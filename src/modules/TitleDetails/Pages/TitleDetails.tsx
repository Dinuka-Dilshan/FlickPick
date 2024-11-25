import ArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import ArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import { Box, Chip, Grid2, Skeleton, Typography } from "@mui/material";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { MovieDetailsResponse } from "../../../types/apiResponses";
import TitleDetailText from "../TitleDetailText";
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
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8 }} sx={{ height: "8vh" }}></Grid2>
        <Grid2 size={{ xs: 4 }} sx={{ height: commonHeight }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8 }} sx={{ height: commonHeight }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8 }} sx={{ height: "8vh" }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
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
    <Grid2 container rowSpacing={1} columnSpacing={1} pb="1rem">
      <Grid2 size={{ xs: 12, lg: 3.5 }} order={{ xs: 1, lg: 2 }}>
        <MovieCard
          movie={data}
          imageStyles={{ height: { lg: commonHeight } }}
        />
      </Grid2>
      <Grid2 size={{ xs: 0, lg: 8.5 }} height="100%" order={{ xs: 1, lg: 3 }}>
        <Box
          component={"video"}
          autoPlay
          muted
          loop
          src={data?.videoUrls?.[0]}
          sx={{
            borderRadius: "12px",
            width: "100%",
            height: commonHeight,
            display: { xs: "none", lg: "block" },
            objectFit: "cover",
          }}
        />
      </Grid2>
      <Grid2 container size={{ xs: 12 }} order={{ xs: 1, lg: 1 }}>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#EFEFEF" }}>
            {data?.title}
          </Typography>
        </Grid2>
        <Grid2
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent="space-between"
          size={{ xs: 12 }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "#B3B3B3" }}
            >
              {data?.releaseYear}
            </Typography>
            {data?.ratings && (
              <Chip
                variant="filled"
                color="success"
                size="small"
                label={
                  <Typography
                    fontWeight="bold"
                    component={"span"}
                    sx={{ color: "#B3B3B3", fontSize: "0.9rem" }}
                  >
                    {data?.ratings}
                    /10
                  </Typography>
                }
              />
            )}
            {data?.certificate && (
              <Chip
                variant="filled"
                color="secondary"
                size="small"
                label={
                  <Typography
                    fontWeight="bold"
                    component={"span"}
                    sx={{ color: "#B3B3B3", fontSize: "0.9rem" }}
                  >
                    {data?.certificate}
                  </Typography>
                }
              />
            )}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Chip
              variant="filled"
              sx={{ bgcolor: "#fff" }}
              size="small"
              label={
                <Typography
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  #{data?.meterRanking?.currentRank}
                  {data?.meterRanking?.rankChange?.changeDirection ===
                  "DOWN" ? (
                    <ArrowDownIcon fontSize="small" color="error" />
                  ) : data?.meterRanking?.rankChange?.changeDirection ===
                    "UP" ? (
                    <ArrowUpIcon fontSize="small" color="success" />
                  ) : null}
                </Typography>
              }
            />
          </Box>
        </Grid2>
      </Grid2>
      <Grid2 container size={{ xs: 12, lg: 6 }} order={{ xs: 1, lg: 4 }}>
        <TitleDetailText
          chips
          value={
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              py="0.85rem"
              sx={{ overflowX: { xs: "scroll", lg: "auto" } }}
            >
              {data?.genres?.map((genre, i) => (
                <Chip
                  size="small"
                  sx={{ bgcolor: "#fff" }}
                  key={i}
                  label={<Typography variant="caption">{genre}</Typography>}
                />
              ))}
            </Box>
          }
        />
        <TitleDetailText
          value={data?.plot}
          showDivider={{ bottom: false, top: false }}
          valueFontStyles={{ fontWeight: "normal" }}
        />
        <TitleDetailText
          label="Release Date"
          value={
            data.releaseDate
              ? format(new Date(data.releaseDate), "dd MMM yyyy")
              : null
          }
          showDivider={{ bottom: false, top: true }}
        />
        <TitleDetailText
          label="Runtime"
          value={data.runtime}
          showDivider={{ bottom: false, top: true }}
        />
        <TitleDetailText
          label="IMDB Rating"
          value={`${data.ratings}/10 from  ${Intl.NumberFormat("en", {
            notation: "compact",
          }).format(Number(data?.voteCount || 0))} votes`}
          showDivider={{ bottom: false, top: true }}
        />
        <TitleDetailText
          label="Creator"
          value={data.creators?.join(",")}
          showDivider={{ bottom: false, top: true }}
        />
      </Grid2>
    </Grid2>
  );
};

export default TitleDetails;
