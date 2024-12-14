import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CheckOutIcon from "@mui/icons-material/CheckOutlined";
import ArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import ArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import {
  Box,
  Button,
  Divider,
  Grid2,
  SxProps,
  Theme,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { format } from "date-fns";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import MoviePoster from "../../components/MovieCard/MoviePoster";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useMutateWatchList from "../../hooks/useMutateWatchList";
import useAppQuery from "../../services/query/useAppQuery";
import { TitleDetails } from "../../types/apiResponses";
import Loader from "./Loader";
import MoreLikeThis from "./MoreLikeThis";

const Text = ({
  value,
  sx,
  varient,
  props,
}: {
  value?: string;
  sx?: SxProps<Theme>;
  varient?: "subtitle" | "header";
  props?: TypographyOwnProps;
}) => (
  <Typography
    variant={varient === "header" ? "h5" : "subtitle1"}
    sx={{ color: "#EFEFEF", ...sx }}
    {...props}
  >
    {value}
  </Typography>
);

const VerticalDivider = () => (
  <Typography variant="subtitle1" sx={{ color: "#5E5E5E" }}>
    |
  </Typography>
);

const DetailsItem = ({
  title,
  value,
  component,
  showImdb,
  halfWidth,
  containerSx,
  largeContentText,
}: {
  title: string;
  value?: string;
  component?: ReactNode;
  showImdb?: boolean;
  halfWidth?: boolean;
  containerSx?: SxProps<Theme>;
  largeContentText?: boolean;
}) => {
  if (!value && !component) return null;
  return (
    <Grid2
      size={{ xs: halfWidth ? 6 : 12 }}
      alignContent={"center"}
      bgcolor="#2C3032"
      borderRadius="12px"
      p="0.5rem 1rem"
      sx={containerSx}
    >
      <Box display="flex" justifyContent="space-between">
        <Text value={title} />
        {showImdb && (
          <svg
            id="home_img"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="28"
            viewBox="0 0 64 32"
            version="1.1"
          >
            <g fill="#F5C518">
              <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
            </g>
            <g
              transform="translate(8.000000, 7.000000)"
              fill="#000000"
              fill-rule="nonzero"
            >
              <polygon points="0 18 5 18 5 0 0 0"></polygon>
              <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
              <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
              <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
            </g>
          </svg>
        )}
      </Box>
      {value && (
        <Text
          value={value}
          sx={{ fontSize: largeContentText ? "1.5rem" : "" }}
        />
      )}
      {component}
    </Grid2>
  );
};

const TitleDetailsDesktop = () => {
  const params = useParams();
  const title = params.id ?? "";
  const { data, isFetching, isError } = useAppQuery<TitleDetails>({
    queryKey: QUERY_KEYS.TITLE_DETAILS(title),
    url: URLS.TITLE_DETAILS(title),
    enabled: !!title,
  });

  const { handleAddRemove, isAddedToWishList, isLoading } = useMutateWatchList({
    watchListItem: {
      addedOn: 0,
      imdbId: data?.imdbId || "",
      posterUrl: data?.posterUrl || "",
      releaseYear: data?.releaseYear ||"",
      title: data?.title || "",
    },
  });

  if (isFetching) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <Box>
        <Typography>Error</Typography>
      </Box>
    );
  }

  const allLast4Available =
    !!data.releaseDate &&
    !!data?.creators?.[0] &&
    !!data.runtime &&
    !!data?.certificate;

  return (
    <Grid2 container columnSpacing={2} rowSpacing={1} mb="2rem">
      <Grid2 container size={{ xs: 12 }} gap={0}>
        <Grid2 size={{ xs: 12 }}>
          <Text
            sx={{ letterSpacing: 2 }}
            value={data?.title}
            varient="header"
          />
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          gap={1.5}
          display={"flex"}
          alignItems="baseline"
        >
          <Text value={data?.releaseYear} />
          <VerticalDivider />
          <Text value={data?.titleType} />
          <VerticalDivider />
          <Text value={data?.runtime} />
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 3 }} height={450}>
        <MoviePoster image={data.posterUrl} />
      </Grid2>
      <Grid2 size={{ xs: 6.75 }} height={450}>
        <Box
          component={"video"}
          autoPlay
          muted
          loop
          controls
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
      <Grid2 size={{ xs: 2.25 }} container>
        <DetailsItem
          title="Rating"
          showImdb
          component={
            <Box display="flex" alignItems="baseline" gap={1}>
              {data.ratings && (
                <Text
                  sx={{ fontSize: "1.5rem" }}
                  value={`${data.ratings} /10`}
                />
              )}
              <Text
                value={
                  data.ratings
                    ? `${Intl.NumberFormat("en", {
                        notation: "compact",
                      }).format(Number(data?.voteCount || 0))}`
                    : "Not Released Yet"
                }
              />
            </Box>
          }
        />
        <DetailsItem
          showImdb
          title="Today Rank"
          component={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Text
                sx={{ fontSize: "1.5rem" }}
                value={`${data.meterRanking?.currentRank}`}
              />
              {data?.meterRanking?.rankChange?.changeDirection === "DOWN" ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowDownIcon color="error" />
                  <Typography color="error" variant="h6">
                    {data?.meterRanking?.rankChange?.difference}
                  </Typography>
                </Box>
              ) : data?.meterRanking?.rankChange?.changeDirection === "UP" ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ArrowUpIcon color="success" />
                  <Typography color="success" variant="h6">
                    {data?.meterRanking?.rankChange?.difference}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          }
        />
        <DetailsItem
          largeContentText
          title="Release Date"
          value={
            data.releaseDate
              ? format(new Date(data.releaseDate), "dd MMM yyyy")
              : ""
          }
        />

        <DetailsItem
          largeContentText
          title="Creator"
          value={data?.creators?.[0]}
        />
        <DetailsItem
          largeContentText
          title="Runtime"
          value={data.runtime}
          halfWidth={allLast4Available}
        />
        <DetailsItem
          largeContentText
          title="Content"
          value={data?.certificate}
          halfWidth={allLast4Available}
        />
      </Grid2>
      <Grid2 size={{ xs: 3 }} container mt="0.5rem">
        <DetailsItem title="" value={data.plot} />
      </Grid2>
      <Grid2 size={{ xs: 6.75 }} container mt="0.5rem">
        <DetailsItem
          title=""
          component={
            <Box p=" 0.25rem 0.5rem">
              <Text value="Featured review" />
              <Text
                sx={{ fontWeight: "bold", mt: "1rem" }}
                value={data.featuredReviews?.[0]?.summary}
              />
              <Text value={data.featuredReviews?.[0]?.text?.slice(0, 180)} />
              <Text
                sx={{ fontWeight: "bold", mt: "1rem" }}
                value={data.featuredReviews?.[0]?.author}
              />
            </Box>
          }
        />
      </Grid2>

      <Grid2
        size={{ xs: 2.25 }}
        container
        justifyContent={"space-around"}
        mt="0.5rem"
      >
        <DetailsItem
          title=""
          component={
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 6, lg: 12 }}>
                <Button
                  color="info"
                  fullWidth
                  sx={{ textTransform: "none" }}
                  variant="outlined"
                >
                  <CheckOutIcon color="inherit" sx={{ mr: "0.2rem" }} /> Watched
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 6, lg: 12 }}>
                <Button
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    bgcolor: isAddedToWishList ? "#2A2C31" : "",
                  }}
                  variant="outlined"
                  onClick={handleAddRemove}
                >
                  <BookmarkIcon color="inherit" sx={{ mr: "0.2rem" }} />
                  {isLoading
                    ? isAddedToWishList
                      ? "Removing..."
                      : "Adding..."
                    : "Want to watch"}
                </Button>
              </Grid2>
            </Grid2>
          }
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }} mt="1.5rem">
        <Divider sx={{ bgcolor: "#2C3032", height: "2px" }} />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Text value="More like this" sx={{ fontSize: "1.2rem" }} />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <MoreLikeThis itemsPerView={8.5} moreLikeThis={data.moreLikeThis} />
      </Grid2>
    </Grid2>
  );
};

export default TitleDetailsDesktop;
