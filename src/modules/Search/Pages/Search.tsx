import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ItemListLayout from "../../../components/Layouts/ItemListLayout";
import MovieCard from "../../../components/MovieCard/MovieCard";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { URLS } from "../../../constants/urls";
import useDebounceValue from "../../../hooks/useDebounceValue";
import useAppQuery from "../../../services/query/useAppQuery";
import {
  SearchMovieItem,
  SearchMovieResponse,
} from "../../../types/apiResponses";

const Search = () => {
  const [params] = useSearchParams();
  const searchText = params.get("searchText") ?? "";
  const exact = params.get("exact") === "true" ? true : false;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const debouncedSearchText = useDebounceValue({
    delay: 1000,
    value: searchText,
  });

  const { data, isFetching, error } = useAppQuery<
    SearchMovieItem,
    Error,
    SearchMovieResponse
  >({
    queryKey: QUERY_KEYS.SEARCH_MOVIES_TVS(debouncedSearchText, exact),
    url: URLS.SEARCH(debouncedSearchText, exact),
    enabled: debouncedSearchText.length > 3,
  });

  return (
    <ItemListLayout
      title={
        isLargeScreen ? (
          <Typography sx={{ color: "#E7E7E7" }}>
            Show results for{" "}
            <span style={{ fontWeight: "bold" }}>"{searchText}"</span>
          </Typography>
        ) : (
          <SearchInput />
        )
      }
      emptyMessage={{
        show: true,
        actionLabel: "",
        message:
          "Oops! It seems we couldn't find any matches. Maybe the movie you're looking for is still in production? 🎥🍿",
        action: () => null,
      }}
      error={error}
      isLoading={isFetching}
      itemRenderer={(movie) => (
        <MovieCard movie={movie}>
          <MovieCard.TitleContainer>
            <MovieCard.Title />
            <MovieCard.ReleaseYear />
          </MovieCard.TitleContainer>
        </MovieCard>
      )}
      itemList={data}
    />
  );
};

export default Search;
