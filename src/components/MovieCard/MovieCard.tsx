import { Box, styled, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { formatDate } from "date-fns";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { motion } from "framer-motion";
import { createContext, PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import FlickHistoryIcon from "../FlickHistoryButton/RemoveFromHistoryButton";
import MoreButton from "../MoreButton/MoreButton";
import MoviePoster from "./MoviePoster";
import WishListButton from "./WatchListButton/WatchListButton";

const Container = styled(motion.div)({
  cursor: "pointer",
  position: "relative",
});

const ImageContainer = styled(Box)({
  borderRadius: "12px",
  position: "relative",
  aspectRatio: 2 / 3,
  height: "100%",
  width: "100%",
});

const DetailsContainer = styled(Box)({
  padding: "1rem 0.2rem",
  display: "flex",
  gap: 8,
  alignItems: "center",
});

const MovieCardContext = createContext<MovieCardItem | undefined>(undefined);

const useMovieCardContext = () => {
  const context = useContext(MovieCardContext);
  if (!context) {
    throw new Error("useMovieCardContext use within Movie Card");
  }

  return context;
};

export type MovieCardItem = {
  releaseYear?: string;
  title: string;
  posterUrl: string;
  imdbId: string;
  addedOn?: number;
  watchedOn?: number;
  rank?: number;
};

type Props = PropsWithChildren<{
  movie: MovieCardItem;
  imageStyles?: SxProps<Theme>;
  hideWishListButton?: boolean;
  containerStyles?: SxProps<Theme>;
  hideAnimation?: boolean;
}>;

const MovieCard = ({
  movie,
  children,
  imageStyles,
  hideWishListButton,
  containerStyles,
  hideAnimation,
}: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(ROUTES.TITILE_DETAILS(movie.imdbId));
  };
  return (
    <MovieCardContext.Provider value={movie}>
      <Container onClick={clickHandler} sx={containerStyles}>
        {!hideWishListButton && (
          <WishListButton
            watchListItem={{
              addedOn: movie.addedOn || 0,
              imdbId: movie.imdbId,
              posterUrl: movie.posterUrl,
              releaseYear: movie.releaseYear || "",
              title: movie.title,
            }}
          />
        )}
        <ImageContainer>
          <MoviePoster
            image={movie.posterUrl}
            sx={imageStyles}
            hideAnimation={hideAnimation}
          />
        </ImageContainer>
        {children && <DetailsContainer>{children}</DetailsContainer>}
      </Container>
    </MovieCardContext.Provider>
  );
};

MovieCard.ReleaseYear = function MovieCardReleaseYear() {
  const movie = useMovieCardContext();

  return (
    <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
      {movie.releaseYear}
    </Typography>
  );
};

MovieCard.Rank = function MovieCardRank() {
  const movie = useMovieCardContext();

  return (
    <Box>
      <Typography
        sx={{
          color: "#B3B3B3",
          fontSize: "3.5rem",
          fontWeight: 600,
          lineHeight: 0,
        }}
      >
        {movie.rank}
      </Typography>
    </Box>
  );
};

MovieCard.Title = function MovieCardTitle({ sx }: { sx?: SxProps<Theme> }) {
  const movie = useMovieCardContext();

  return (
    <Typography
      sx={{
        color: "#EFEFEF",
        fontSize: "0.9rem",
        ...sx,
      }}
    >
      {movie.title}
    </Typography>
  );
};

MovieCard.AddedOn = function MovieCardAddedOn() {
  const movie = useMovieCardContext();

  if (!movie?.addedOn) {
    return null;
  }

  return (
    <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
      {formatDistanceToNow(new Date(movie.addedOn), {
        addSuffix: true,
      }).replace(/^about /, "")}
    </Typography>
  );
};

MovieCard.watchedOn = function MovieCardWatchedOn() {
  const movie = useMovieCardContext();

  if (!movie.watchedOn) {
    return null;
  }

  return (
    <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
      {formatDate(movie.watchedOn, "do MMM yyyy")}
    </Typography>
  );
};

MovieCard.MovieCardHistoryDetails = function MovieCardHistoryDetails() {
  const movie = useMovieCardContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            color: "#EFEFEF",
            fontSize: "0.9rem",
          }}
        >
          {movie.title}
        </Typography>
        {movie.addedOn && (
          <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
            {formatDate(movie.addedOn, "do MMM yyyy")}
          </Typography>
        )}
      </Box>
      <Box>
        <MoreButton content={<FlickHistoryIcon imdbId={movie.imdbId} />} />
      </Box>
    </Box>
  );
};

MovieCard.TitleContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
});

export default MovieCard;
