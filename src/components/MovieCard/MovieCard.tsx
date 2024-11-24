import { Box, styled, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { createContext, PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Movie } from "../../types/movie";
import MoviePoster from "./MoviePoster";
import WishListButton from "./WatchListButton/WatchListButton";

const Container = styled(Box)({
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
  gap: 1,
  alignItems: "center",
});

const MovieCardContext = createContext<Movie | undefined>(undefined);

const useMovieCardContext = () => {
  const context = useContext(MovieCardContext);
  if (!context) {
    throw new Error("useMovieCardContext use within Movie Card");
  }

  return context;
};

const MovieCard = ({
  movie,
  children,
}: PropsWithChildren<{
  movie: Movie;
}>) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(ROUTES.TITILE_DETAILS(movie.imdbId));
  };
  return (
    <MovieCardContext.Provider value={movie}>
      <Container onClick={clickHandler}>
        <WishListButton movie={movie} />
        <ImageContainer>
          <MoviePoster image={movie.posterUrl} />
        </ImageContainer>
        <DetailsContainer>{children}</DetailsContainer>
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

MovieCard.Title = function MovieCardTitle() {
  const movie = useMovieCardContext();

  return (
    <Typography sx={{ color: "#EFEFEF", fontSize: "0.9rem" }}>
      {movie.title}
    </Typography>
  );
};

MovieCard.AddedOn = function MovieCardAddedOn() {
  const movie = useMovieCardContext();

  return (
    <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
      {formatDistanceToNow(new Date(movie?.addedOn || Date.now()), {
        addSuffix: true,
      }).replace(/^about /, "")}
    </Typography>
  );
};

MovieCard.TitleContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
});

export default MovieCard;
