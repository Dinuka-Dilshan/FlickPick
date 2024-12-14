import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import HistoryIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import TvIcon from "@mui/icons-material/MovieFilter";
import MovieIcon from "@mui/icons-material/MovieOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Box, styled, Typography } from "@mui/material";
import { cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
const Wrapper = styled(Box)({
  justifyContent: "space-around",
  alignItems: "center",
  height: "7vh",
  background: "#171717",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100vw",
  zIndex: 1000,
  mx: "2rem",
});

const navItems = [
  { icon: <MovieIcon />, route: ROUTES.POPULAR_MOVIES, label: "Top Movies" },
  { icon: <TvIcon />, route: ROUTES.POPULAR_TVS, label: "Top Tvs" },
  { icon: <BookmarkIcon />, route: ROUTES.WISH_LIST, label: "WatchList" },
  { icon: <HistoryIcon />, route: ROUTES.FLICK_HISTORY, label: "History" },
  { icon: <SearchIcon />, route: ROUTES.SEARCH, label: "Search" },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Wrapper
        sx={{
          display: { xs: "flex", lg: "none" },
        }}
      >
        {navItems.map((item, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              py: 5,
            }}
          >
            <Box
              component={"span"}
              key={index}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                }
              }}
              sx={{ m: 0 }}
            >
              {cloneElement(item.icon, {
                sx: {
                  color:
                    location.pathname === item.route ? "#E75480" : "#A0A0A0",
                  mb: "-8px",
                },
              })}
            </Box>
            <Typography
              sx={{
                color: location.pathname === item.route ? "#E75480" : "#A0A0A0",
                fontSize: "0.65rem",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Wrapper>
    </>
  );
};

export default BottomNavBar;
