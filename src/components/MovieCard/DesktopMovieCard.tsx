import { Box, Typography } from "@mui/material";

type Props = {
  name: string;
  image: string;
  year: string;
  rank: number | string;
  duration: string;
  ratings: string;
};

const DesktopMovieCard = ({
  name,
  image,
  year,
  rank,
}: Props) => {
  return (
    <Box
      sx={{
        aspectRatio: 2 / 3,
        mb: 0,
      }}
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

export default DesktopMovieCard;
