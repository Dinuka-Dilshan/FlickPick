import PopularItemList from "../PopularItemList";

const PopularMoviesTvs = ({ varient }: { varient: "TV" | "MOVIE" }) => (
  <PopularItemList varient={varient} />
);

export default PopularMoviesTvs;
