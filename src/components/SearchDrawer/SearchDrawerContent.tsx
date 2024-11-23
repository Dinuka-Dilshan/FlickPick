import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid2, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { URLS } from "../../constants/urls";
import useDebounceValue from "../../hooks/useDebounceValue";
import useAppQuery from "../../services/query/useAppQuery";
import { SearchMovieResponse } from "../../types/apiResponses";
import LoadingItemIndicator from "../LoadingItemIndicator/LoadingItemIndicator";
import MiniMovieCard from "../MovieCard/MiniMovieCard";

type Props = {
  onDrawerClose: () => void;
};

const SearchDrawerContent = ({ onDrawerClose }: Props) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounceValue({
    delay: 1000,
    value: searchText,
  });
  const { data, isFetching } = useAppQuery<SearchMovieResponse, Error>({
    queryKey: QUERY_KEYS.SEARCH_MOVIES_TVS(debouncedSearchText),
    url: URLS.SEARCH(debouncedSearchText),
    enabled: debouncedSearchText.length > 3,
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSearchText(e.target.value);

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", p: "1rem" }}>
      <TextField
        fullWidth
        value={searchText}
        autoFocus
        sx={{
          p: 0,
          margin: 0,
          "& .Mui-focused.MuiAutocomplete-input": {
            color: "blue",
          },
        }}
        autoComplete="off"
        size="small"
        onChange={handleOnChange}
        placeholder="Search Movie or Tv Show Name"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#E7E7E7" }} />
              </InputAdornment>
            ),
            sx: {
              color: "#E7E7E7",
            },
          },
        }}
      />
      <LoadingItemIndicator
        isLoading={isFetching}
        itemCount={10}
        itemsPerRow={{ xs: 1 }}
        itemHeight={{ xs: 100 }}
      />
      <Grid2 container spacing={1.5} mt="1rem">
        {data?.map((movie) => (
          <Grid2 key={movie.imdbId} size={{ xs: 12 }}>
            <MiniMovieCard movie={movie} onClick={onDrawerClose} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default SearchDrawerContent;
