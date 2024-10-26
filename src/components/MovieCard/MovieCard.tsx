import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

type Props = {
  name: string;
  image: string;
  year: string;
  rank: number | string;
  duration: string;
  ratings: string;
  imdbId: string;
};

const MovieCard = ({ name, image, year, rank, imdbId }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(ROUTES.TITILE_DETAILS(imdbId));
  };
  return (
    <Box
      sx={{
        aspectRatio: 2 / 3,
        mb: 0,
      }}
      onClick={clickHandler}
    >
      <Box
        component="img"
        height="100%"
        width="100%"
        sx={{
          objectFit: "cover",
          borderRadius: { xs: "0", md: "8px" },
        }}
        src={image}
      />
      <Typography fontWeight={"bold"}>#{rank}</Typography>
      <Typography>{name} </Typography>
      <Typography variant="caption">{year}</Typography>
    </Box>
  );
};

export default MovieCard;
