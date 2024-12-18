import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import HistoryIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import TvIcon from "@mui/icons-material/MovieFilter";
import MovieIcon from "@mui/icons-material/MovieOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ROUTES } from "../../constants/routes";

export default [
  {
    route: ROUTES.POPULAR_MOVIES,
    labelDesktop: "Top Movies",
    labelMobile: "Top Movies",
    icon: <MovieIcon />,
  },
  {
    route: ROUTES.POPULAR_TVS,
    labelDesktop: "Top TVs",
    labelMobile: "Top TVs",
    icon: <TvIcon />,
  },
  {
    route: ROUTES.WISH_LIST,
    labelDesktop: "Watchlist",
    labelMobile: "Watchlist",
    icon: <BookmarkIcon />,
  },
  {
    route: ROUTES.FLICK_HISTORY,
    labelDesktop: "History",
    labelMobile: "History",
    icon: <HistoryIcon />,
  },
  {
    icon: <SearchIcon />,
    route: ROUTES.SEARCH,
    labelDesktop: "Search",
    labelMobile: "Search",
    hideOnDesktop: true,
  },
];
