import { Grid2 } from "@mui/material";
import MoviePoster from "../../components/MovieCard/MoviePoster";
import { getImageURL } from "../../utils/image";

type Props = {
  poster: string;
  images?: string[];
};

const ImageCollection = ({ images, poster }: Props) => {
  return (
    <Grid2 container spacing={0.8} height={"100%"}>
      <Grid2 size={{ xs: 6 }} height={"100%"}>
        <MoviePoster
          image={poster}
          containerSx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
      </Grid2>
      <Grid2 size={{ xs: 6 }} height={"100%"} container spacing={0.8}>
        <Grid2 size={{ xs: 6 }} height={"49%"}>
          <MoviePoster
            image={getImageURL(images?.[0] || "",500) || ""}
            containerSx={{ borderRadius: 0 }}
            sx={{ borderRadius: 0 }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }} height={"49%"}>
          <MoviePoster
             image={getImageURL(images?.[1] || "",500) || ""}
            containerSx={{ borderRadius: 0, borderTopRightRadius: "16px" }}
            sx={{ borderRadius: 0, borderTopRightRadius: "16px" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }} height={"49%"}>
          <MoviePoster
             image={getImageURL(images?.[2] || "",500) || ""}
            containerSx={{ borderRadius: 0, borderBottomRightRadius: "16px" }}
            sx={{ borderRadius: 0 }}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default ImageCollection;
