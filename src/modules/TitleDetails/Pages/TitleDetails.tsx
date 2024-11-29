import ArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import ArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import { Box, Grid2, Skeleton, Typography } from "@mui/material";
import { format } from "date-fns";
import { useKeenSlider } from "keen-slider/react";
import { useParams } from "react-router-dom";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useAppQuery from "../../../services/query/useAppQuery";
import { MovieDetailsResponse } from "../../../types/apiResponses";
import TitleDetailText from "../TitleDetailText";

const TitleDetails = () => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 10,
    },
  });
  const params = useParams();
  const title = params.id ?? "";
  const { data, isFetching, isError } = useAppQuery<MovieDetailsResponse>({
    queryKey: QUERY_KEYS.TITLE_DETAILS(title),
    url: URLS.TITLE_DETAILS(title),
    enabled: !!title,
  });


  if (isFetching) {
    return (
      <Grid2 container height="100%" rowSpacing={1} columnSpacing={1} mb='2rem'>
        <Grid2 size={{ xs: 12 }} sx={{ height: "10vh" }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ height: 400 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }} sx={{ height: 150 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }} sx={{ height: 150 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: "12px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ height: "10vh" }}>
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
    <Grid2 container rowSpacing={1.2} columnSpacing={1.2} pb="1rem">
      <Grid2 container size={{ xs: 12 }} gap={0}>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#EFEFEF" }}>
            {data?.title}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          gap={1.5}
          display={"flex"}
          alignItems="baseline"
        >
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            {data?.releaseYear}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            |
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#EFEFEF" }}>
            {data?.titleType}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 3.5 }}>
        <MovieCard movie={data} imageStyles={{ height: { lg: "100%" } }} />
      </Grid2>
      <Grid2 size={{ xs: 0, lg: 8.5 }}>
        <Box
          component={"video"}
          autoPlay
          muted
          loop
          src={data?.videoUrls?.[0]}
          sx={{
            borderRadius: "12px",
            width: "100%",
            height: "100%",
            display: { xs: "none", lg: "block" },
            objectFit: "cover",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        />
      </Grid2>
      <Grid2 container size={{ xs: 12, lg: 6 }}>
        <TitleDetailText
          label="IMDB Rating"
          value={`${data.ratings}/10  | ${Intl.NumberFormat("en", {
            notation: "compact",
          }).format(Number(data?.voteCount || 0))} votes`}
        />
        <TitleDetailText
          label="IMDB Rank"
          value={
            <Typography
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1.2}
            >
              {data?.meterRanking?.currentRank}
              {data?.meterRanking?.rankChange?.changeDirection === "DOWN" ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowDownIcon fontSize="medium" color="error" />
                  <Typography color="error">
                    {data?.meterRanking?.rankChange?.difference}
                  </Typography>
                </Box>
              ) : data?.meterRanking?.rankChange?.changeDirection === "UP" ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowUpIcon fontSize="medium" color="success" />
                  <Typography color="success">
                    {data?.meterRanking?.rankChange?.difference}
                  </Typography>
                </Box>
              ) : null}
            </Typography>
          }
        />
        <TitleDetailText size={{ xs: 12 }} value={data?.plot} />
        <TitleDetailText label="Content Rating" value={data.certificate} />
        <TitleDetailText
          label="Release Date"
          value={
            data.releaseDate
              ? format(new Date(data.releaseDate), "dd MMM yyyy")
              : null
          }
        />
        <TitleDetailText label="Runtime" value={data.runtime} />
        <TitleDetailText label="Creator" value={data.creators?.[0]} />
      </Grid2>

      <Grid2 size={{ xs: 12 }} container mt="1rem">
        <Grid2 size={{ xs: 12 }}>
          <Typography sx={{ color: "#EFEFEF" }}>More like this</Typography>
        </Grid2>
        <div ref={sliderRef} className="keen-slider">
          {data?.moreLikeThis?.map((movie) => (
            <div className="keen-slider__slide">
              <MovieCard
                movie={movie}
                hideWishListButton
                key={movie.imdbId}
                containerStyles={{
                  bgcolor: "#2C3032",
                  p: "0.5rem",
                  borderRadius: "12px",
                }}
                hideAnimation
              >
                <MovieCard.TitleContainer>
                  <MovieCard.Title
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100px",
                    }}
                  />
                  <MovieCard.ReleaseYear />
                </MovieCard.TitleContainer>
              </MovieCard>
            </div>
          ))}
        </div>
      </Grid2>
    </Grid2>
  );
};

export default TitleDetails;
