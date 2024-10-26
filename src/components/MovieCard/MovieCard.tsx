import { useMediaQuery, useTheme } from "@mui/material";
import DesktopMovieCard from "./DesktopMovieCard";
import MobileMovieCard from "./MobileMovieCard";

type Props = {
  name: string;
  image: string;
  year: string;
  rank: number | string;
  duration: string;
  ratings: string;
};

const MovieCard = (props: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktop ? (
    <DesktopMovieCard {...props} />
  ) : (
    <MobileMovieCard {...props} />
  );
};

export default MovieCard;
