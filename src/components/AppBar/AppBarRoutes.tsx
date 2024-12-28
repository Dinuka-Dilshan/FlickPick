import { IoTv } from "react-icons/io5";
import { MdFolder, MdMovie, MdOutlineBookmark, MdSearch } from "react-icons/md";
import { ROUTES } from "../../constants/routes";
export default [
  {
    route: ROUTES.POPULAR_MOVIES,
    labelDesktop: "Top Movies",
    labelMobile: "Top Movies",
    icon: (
      <MdMovie
        color="#FFF"
        size={25}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    route: ROUTES.POPULAR_TVS,
    labelDesktop: "Top TVs",
    labelMobile: "Top TVs",
    icon: (
      <IoTv
        color="#FFF"
        size={25}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    route: ROUTES.WISH_LIST,
    labelDesktop: "Watchlist",
    labelMobile: "Watchlist",
    icon: (
      <MdOutlineBookmark
        color="#FFF"
        size={25}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    route: ROUTES.FLICK_HISTORY,
    labelDesktop: "History",
    labelMobile: "History",
    icon: (
      <MdFolder
        color="#FFF"
        size={25}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
  },
  {
    icon: (
      <MdSearch
        color="#FFF"
        size={25}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ),
    route: ROUTES.SEARCH,
    labelDesktop: "Search",
    labelMobile: "Search",
    hideOnDesktop: true,
  },
];
