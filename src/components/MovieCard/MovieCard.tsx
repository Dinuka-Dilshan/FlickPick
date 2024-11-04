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
        cursor: "pointer",
      }}
      onClick={clickHandler}
    >
      <Box
        height="100%"
        width="100%"
        sx={{
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <Box
          component="img"
          height="100%"
          width="100%"
          sx={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
          src={image}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bgcolor: "primary.main",
            p: "0.5rem",
            borderTopLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          <Typography sx={{ color: "#fff" }} fontWeight={"bold"}>
            #{rank}
          </Typography>
        </Box>
      </Box>
      <Typography>{name} </Typography>
      <Typography variant="caption">{year}</Typography>
    </Box>
  );
};

export default MovieCard;
