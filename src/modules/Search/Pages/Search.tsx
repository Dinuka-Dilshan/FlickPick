import { Box, Grid2, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import LoadingItemIndicator from "../../../components/LoadingItemIndicator/LoadingItemIndicator";
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

  const { data, isFetching } = useAppQuery<
    SearchMovieItem,
    Error,
    SearchMovieResponse
  >({
    queryKey: QUERY_KEYS.SEARCH_MOVIES_TVS(debouncedSearchText, exact),
    url: URLS.SEARCH(debouncedSearchText, exact),
    enabled: debouncedSearchText.length > 3,
  });

  return (
    <Box>
      {isLargeScreen ? (
        <Typography sx={{ color: "#E7E7E7" }}>
          Show results for{" "}
          <span style={{ fontWeight: "bold" }}>"{searchText}"</span>
        </Typography>
      ) : (
        <SearchInput />
      )}

      <LoadingItemIndicator
        isLoading={isFetching}
        itemCount={10}
        itemsPerRow={{
          xs: 2,
          md: 3,
          lg: 5,
        }}
        itemHeight={{ xs: 250, md: 300, lg: 350 }}
      />
      {!isFetching && (
        <Grid2 container spacing={1.5} mt={"1rem"}>
          {data?.map((movie, index) => (
            <Grid2 size={{ xs: 6, md: 4, lg: 12 / 5 }} key={index}>
              <MovieCard movie={movie}>
                <MovieCard.TitleContainer>
                  <MovieCard.Title />
                  <MovieCard.ReleaseYear />
                </MovieCard.TitleContainer>
              </MovieCard>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default Search;
