import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  image: string;
  year: string;
  rank: number | string;
  duration: string;
  ratings: string;
};

const MobileMovieCard = ({
  name,
  image,
  year,
  rank,
  duration,
  ratings,
}: Props) => {
  return (
    <Box
      sx={{
        aspectRatio: 2 / 3,
        mb: "0.5rem",
        borderRadius: "8px",
        backgroundColor: "#FFF",
      }}
    >
      <Box
        component="img"
        height="100%"
        width="100%"
        sx={{
          objectFit: "cover",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
        }}
        src={image}
      />

      <Box
        sx={{
          px: "1rem",
          pb: "2rem",
        }}
      >
        <Typography variant="h5">
          <Typography variant="subtitle1" component="span">
            {rank}.
          </Typography>
          {name}
        </Typography>
        <Typography variant="caption">{year}</Typography>
      </Box>
    </Box>
  );
};

export default MobileMovieCard;
