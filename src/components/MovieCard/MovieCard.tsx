import { Box, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Movie } from "../../types/movie";
import MoviePoster from "./MoviePoster";
import WishListButton from "./WatchListButton/WatchListButton";

type Props = {
  movie: Movie;
};

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

const TitleYearContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
});

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(ROUTES.TITILE_DETAILS(movie.imdbId));
  };
  return (
    <Container onClick={clickHandler}>
      <WishListButton movie={movie} />
      <ImageContainer>
        <MoviePoster image={movie.posterUrl} />
      </ImageContainer>
      <Box sx={{ px: "0.2rem", display: "flex", gap: 1, alignItems: "center" }}>
        <Box>
          <Typography
            sx={{ color: "#B3B3B3", fontSize: "3.5rem", fontWeight: 600 }}
          >
            {movie.rank}
          </Typography>
        </Box>
        <TitleYearContainer>
          <Typography sx={{ color: "#EFEFEF", fontSize: "0.9rem" }}>
            {movie.title}
          </Typography>
          <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
            {movie.releaseYear}
          </Typography>
        </TitleYearContainer>
      </Box>
    </Container>
  );
};

export default MovieCard;
