import { useKeenSlider } from "keen-slider/react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Movie } from "../../types/movie";

type Props = {
  movie: Movie;
  itemsPerView: number;
};

const MoreLikeThis = ({ itemsPerView, movie }: Props) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: itemsPerView,
      spacing: 10,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {movie?.moreLikeThis?.map((movie) => (
        <div className="keen-slider__slide" key={movie.imdbId}>
          <MovieCard
            movie={movie}
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
        </div>
      ))}
    </div>
  );
};

export default MoreLikeThis;
