import ArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import ArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import {
  Box,
  Button,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { useParams } from "react-router-dom";
import AddToFlickHistory from "../../components/FlickHistoryButton/FlickHistoryButton";
import MovieCard from "../../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useMutateWatchList from "../../hooks/useMutateWatchList";
import useAppQuery from "../../services/query/useAppQuery";
import { TitleDetails } from "../../types/apiResponses";
import Cast from "./Cast";
import Loader from "./Loader";
import MoreLikeThis from "./MoreLikeThis";
import TitleDetailText from "./TitleDetailText";

const TitleDetailsMobile = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
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
      releaseYear: data?.releaseYear || "",
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
      <Grid2 size={{ xs: 12, lg: 2.75 }} height="400">
        <MovieCard hideWishListButton movie={data} isAddedToWatchList={false} />
      </Grid2>
      <Grid2 size={{ xs: 0, lg: 6.25 }}>
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
      <Grid2 container size={{ xs: 12, lg: 3 }}>
        <TitleDetailText
          label="IMDB Rating"
          value={
            data.ratings
              ? `${data.ratings}/10  | ${Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(Number(data?.voteCount || 0))}`
              : "Not Released Yet"
          }
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
        <TitleDetailText
          label="Genere"
          value={data?.genres?.slice(0, 2)?.join(", ")}
        />
        <TitleDetailText label="Content Rating" value={data.certificate} />
        <TitleDetailText
          label="Release Date"
          value={
            data.releaseDate
              ? format(new Date(data.releaseDate), "dd MMM yyyy")
              : null
          }
        />
        <TitleDetailText label="Runtime" value={data?.runtime} />
        <TitleDetailText label="Creator" value={data?.creators?.[0]} />
        <TitleDetailText label="No of Seasons" value={data?.seasons} />
      </Grid2>

      <Grid2 size={{ xs: 12 }} sx={{ display: { lg: "none" } }} container>
        <Grid2 size={{ xs: 6, lg: 12 }}>
          <AddToFlickHistory movie={data} />
        </Grid2>
        <Grid2 size={{ xs: 6, lg: 12 }}>
          <Button
            disabled={isLoading}
            fullWidth
            sx={{
              textTransform: "none",
              bgcolor: isAddedToWishList ? "#2A2C31" : "",
              color: isAddedToWishList ? "#00dd82" : "",
            }}
            variant="outlined"
            onClick={handleAddRemove}
          >
            {!isLoading &&
              (isAddedToWishList ? (
                <MdBookmarkAdded
                  color="inherit"
                  size={20}
                  style={{ marginRight: "0.2rem" }}
                />
              ) : (
                <MdBookmarkAdd
                  color="inherit"
                  size={20}
                  style={{ marginRight: "0.2rem" }}
                />
              ))}
            {isLoading
              ? isAddedToWishList
                ? "Removing..."
                : "Adding..."
              : "Want to watch"}
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12 }} container mt="1rem">
        <Grid2 size={{ xs: 12 }}>
          <Typography sx={{ color: "#EFEFEF" }}>Top cast</Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Cast itemsPerView={isMd ? 6.5 : 2.5} cast={data.cast} />
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12 }} container mt="0rem">
        <Grid2 size={{ xs: 12 }}>
          <Typography sx={{ color: "#EFEFEF" }}>More like this</Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <MoreLikeThis
            itemsPerView={isMd ? 6.5 : 2.5}
            moreLikeThis={data.moreLikeThis}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default TitleDetailsMobile;
