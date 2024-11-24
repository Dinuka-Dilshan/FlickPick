import { styled } from "@mui/system";

type Props = {
  image: string;
};

const Image = styled("img")({
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  height: "100%",
  width: "100%",
  aspectRatio: 2 / 3,
});

const MoviePoster = ({ image }: Props) => {
  return <Image src={image} />;
};

export default MoviePoster;
