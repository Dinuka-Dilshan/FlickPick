import { useMediaQuery, useTheme } from "@mui/material";
import SearchDesktop from "./SearchDesktop";
import SearchMobile from "./SearchMobile";

const Search = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (isLargeScreen) {
    return <SearchDesktop />;
  }

  return <SearchMobile />;
};

export default Search;
