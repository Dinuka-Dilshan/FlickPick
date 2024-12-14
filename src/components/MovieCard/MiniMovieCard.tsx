import { Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { MovieCardItem } from "./MovieCard";
import MoviePoster from "./MoviePoster";
import WishListButton from "./WatchListButton/WatchListButton";

type Props = {
  movie: MovieCardItem;
  onClick?: () => void;
};

const MiniMovieCard = ({ movie, onClick }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    onClick?.();
    navigate(ROUTES.TITILE_DETAILS(movie.imdbId));
  };
  return (
    <Grid2
      container
      sx={{ borderRadius: "12px", cursor: "pointer", position: "relative" }}
      onClick={clickHandler}
    >
      <WishListButton
        watchListItem={{
          addedOn: movie.addedOn || 0,
          imdbId: movie.imdbId,
          posterUrl: movie.posterUrl,
          releaseYear: movie.releaseYear || "",
          title: movie.title,
        }}
      />
      <Grid2 size={{ xs: 4 }}>
        <MoviePoster image={movie.posterUrl} sx={{ aspectRatio: 2 / 3 }} />
      </Grid2>
      <Grid2 size={{ xs: 8 }} sx={{ p: "1rem" }}>
        <Typography sx={{ color: "#EFEFEF", fontSize: "1rem" }}>
          {movie.title}
        </Typography>
        <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
          {movie.releaseYear}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default MiniMovieCard;
