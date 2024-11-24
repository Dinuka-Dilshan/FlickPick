import { Box, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import MoviePoster from "../../components/MovieCard/MoviePoster";
import WatchListButton from "../../components/MovieCard/WatchListButton/WatchListButton";
import { WatchListMovie } from "../../types/movie";
type Props = {
  movie: WatchListMovie;
};

const WatchListItem = ({ movie }: Props) => {
  return (
    <Box sx={{ position: "relative" }}>
      <MoviePoster image={movie.posterUrl} />
      <WatchListButton movie={movie} />
      <Typography
        sx={{ color: "#EFEFEF", fontSize: "0.9rem", textOverflow: "ellipsis" }}
      >
        {movie.title}
      </Typography>
      <Typography sx={{ color: "#B3B3B3", fontSize: "0.75rem" }}>
        {formatDistanceToNow(new Date(movie.addedOn), {
          addSuffix: true,
        }).replace(/^about /, "")}
      </Typography>
    </Box>
  );
};

export default WatchListItem;
