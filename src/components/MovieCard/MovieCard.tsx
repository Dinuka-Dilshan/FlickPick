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
        cursor: "pointer",
      }}
      onClick={clickHandler}
    >
      <Box
        height="100%"
        width="100%"
        sx={{
          borderRadius: "12px",
          position: "relative",
          aspectRatio: 2 / 3,
        }}
      >
        <Box
          component="img"
          height="100%"
          width="100%"
          sx={{
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow:
              "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          src={image}
        />
      </Box>
      <Box sx={{ px: "0.2rem", display: "flex", gap: 1, alignItems: "center" }}>
        <Box>
          <Typography
            sx={{ color: "#B3B3B3", fontSize: "3.5rem", fontWeight: 600 }}
          >
            {rank}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ color: "#EFEFEF", fontSize: "0.9rem" }}>
            {name}
          </Typography>
          <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
            {year}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieCard;
