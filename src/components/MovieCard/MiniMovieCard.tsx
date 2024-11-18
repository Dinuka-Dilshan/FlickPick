import { Box, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { SearchMovieResult } from "../../types/apiResponses";

type Props = {
  movie: SearchMovieResult;
  onClick: () => void;
};

const MiniMovieCard = ({ movie, onClick }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    onClick()
    navigate(ROUTES.TITILE_DETAILS(movie.imdbId));
  };
  return (
    <Grid2
      container
      sx={{ borderRadius: "12px", cursor: "pointer" }}
      onClick={clickHandler}
    >
      <Grid2 size={{ xs: 4 }}>
        <Box
          component="img"
          width="100%"
          height="100%"
          sx={{
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          src={movie.posterUrl}
        />
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
