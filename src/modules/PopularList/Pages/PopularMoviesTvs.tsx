import PopularItemList from "../PopularItemList";

const PopularMoviesTvs = ({ varient }: { varient: "TVS" | "MOVIES" }) => (
  <PopularItemList varient={varient} />
);

export default PopularMoviesTvs;
