import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useState } from "react";
import { ROUTES } from "../../constants/routes";
import SearchInput from "../SearchInput/SearchInput";
import AppNavLink from "./AppNavLink";
import Logo from "./Logo";
import MobileDrawer from "./MobileDrawer";
import ProfileAvatar from "./ProfileAvatar";

const Wrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "6.7vh",
  backgroundColor: "#000000",
});

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 15,
});

const AppBar = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((p) => !p);

  return (
    <Wrapper
      sx={{
        px: {
          xs: "0.25rem",
          md: "10rem",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        },
      }}
    >
      <AppNavLink to={ROUTES.DEFAULT} text={<Logo />} />
      {isLargeScreen ? (
        <Container>
          <AppNavLink
            to={ROUTES.POPULAR_MOVIES}
            text={<Typography>Movies</Typography>}
          />
          <AppNavLink
            to={ROUTES.POPULAR_TVS}
            text={<Typography>Tvs</Typography>}
          />
          <AppNavLink
            to={ROUTES.WISH_LIST}
            text={<Typography>Wish List</Typography>}
          />
          <SearchInput />
          <ProfileAvatar />
        </Container>
      ) : (
        <IconButton
          edge="start"
          size="large"
          sx={{
            color: "#E7E7E7",
          }}
          onClick={handleOpen}
        >
          <MenuIcon />
        </IconButton>
      )}

      <MobileDrawer handleOpen={handleOpen} isOpen={isOpen} />
    </Wrapper>
  );
};

export default AppBar;
