import MovieCard from "../../components/MovieCard/MovieCard";
import Slider from "../../components/Slider/Slider";
import { TitleDetails } from "../../types/apiResponses";

type Props = {
  moreLikeThis: TitleDetails["moreLikeThis"];
  itemsPerView: number;
};

const MoreLikeThis = ({ itemsPerView, moreLikeThis }: Props) => {
  return (
    <Slider<TitleDetails["moreLikeThis"][0]>
      list={moreLikeThis}
      itemsPerView={itemsPerView}
      itemRenderer={(movie) => (
        <MovieCard
          movie={{
            imdbId: movie.imdbId,
            posterUrl: movie.posterUrl,
            title: movie.title,
            releaseYear: movie.releaseYear.toString(),
          }}
          hideWishListButton
          key={movie.imdbId}
          containerStyles={{
            bgcolor: "#2C3032",
            p: "0.5rem",
            borderRadius: "12px",
          }}
          hideAnimation
        >
          <MovieCard.TitleContainer>
            <MovieCard.Title
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100px",
              }}
            />
            <MovieCard.ReleaseYear />
          </MovieCard.TitleContainer>
        </MovieCard>
      )}
      getId={(movie) => movie.imdbId}
    />
  );
};

export default MoreLikeThis;
