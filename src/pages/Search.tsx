import { Box, Grid2, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useAppQuery from "../Query/useAppQuery";
import LoadingItemIndicator from "../components/LoadingItemIndicator/LoadingItemIndicator";
import MovieCard from "../components/MovieCard/MovieCard";
import { QUERY_KEYS } from "../constants/queryKeys";
import { URLS } from "../constants/urls";
import useDebounceValue from "../hooks/useDebounceValue";
import { SearchMovieResponse } from "../types/apiResponses";

const Search = () => {
  const [params] = useSearchParams();
  const searchText = params.get("searchText") ?? "";

  const debouncedSearchText = useDebounceValue({
    delay: 500,
    value: searchText,
  });

  const { data, isFetching } = useAppQuery<SearchMovieResponse>({
    queryKey: QUERY_KEYS.SEARCH_MOVIES_TVS(debouncedSearchText),
    url: URLS.SEARCH(debouncedSearchText),
    enabled: debouncedSearchText.length > 3,
  });

  return (
    <Box>
      <Typography variant="h5">
        Show results for{" "}
        <span style={{ fontWeight: "bold" }}>"{searchText}"</span>
      </Typography>
      {isFetching ? (
        <LoadingItemIndicator />
      ) : (
        <Grid2 container spacing={1.5} mt={"1rem"}>
          {data?.map((movie, index) => (
            <Grid2 size={{ xs: 12, md: 2 }} key={index}>
              <MovieCard
                image={movie.posterUrl}
                name={movie.name}
                year={movie.year}
                rank={""}
                duration={""}
                ratings={""}
                imdbId={movie.imdbId}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default Search;
