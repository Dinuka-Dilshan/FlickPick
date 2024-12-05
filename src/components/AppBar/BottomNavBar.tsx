import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import HistoryIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import MovieIcon from "@mui/icons-material/MovieOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/SmartDisplayOutlined";
import { Box, IconButton, styled } from "@mui/material";
import { cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Wrapper = styled(Box)({
  justifyContent: "space-around",
  alignItems: "center",
  height: "7.5vh",
  background: "#171717",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100vw",
  zIndex: 1000,
});

const navItems = [
  { icon: <MovieIcon />, route: ROUTES.POPULAR_MOVIES },
  { icon: <TvIcon />, route: ROUTES.POPULAR_TVS },
  { icon: <BookmarkIcon />, route: ROUTES.WISH_LIST },
  { icon: <HistoryIcon />, route: ROUTES.FLICK_HISTORY },
  { icon: <SearchIcon />, route: ROUTES.SEARCH },
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
          <IconButton
            key={index}
            onClick={() => {
              if (item.route) {
                navigate(item.route);
              }
            }}
            size="medium"
          >
            {cloneElement(item.icon, {
              sx: {
                color: location.pathname === item.route ? "#E75480" : "#A0A0A0",
              },
            })}
          </IconButton>
        ))}
      </Wrapper>
    </>
  );
};

export default BottomNavBar;
