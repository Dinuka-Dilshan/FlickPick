import {
  Avatar,
  Box,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useState } from "react";
import { ROUTES } from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import SearchInput from "../SearchInput/SearchInput";
import AppBarRoutes from "./AppBarRoutes";
import AppNavLink from "./AppNavLink";
import BottomNavBar from "./BottomNavBar";
import Logo from "./Logo";
import MobileDrawer from "./MobileDrawer";
import ProfileAvatar from "./ProfileAvatar";


const Wrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  background: "#171717", // Uniform dark grey
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds depth without overwhelming,
  position: "sticky",
  top: 0,
  zIndex: 1000,
});

const Container = styled(Box)({
  display: "flex",
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 2,
});

const AppBar = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((p) => !p);

  return (
    <Wrapper
      sx={{
        px: {
          xs: "0.3rem",
          md: "5rem",
        },
        height: {
          xs: "7vh",
          md: "8vh",
        },
      }}
    >
      <Box sx={{ flex: 1, display: "flex" }}>
        <AppNavLink to={ROUTES.DEFAULT} text={<Logo />} />
      </Box>
      {isLargeScreen ? (
        <>
          <Box sx={{ flex: 1 }}>
            <SearchInput />
          </Box>
          <Container>
            {AppBarRoutes.filter((r) => !r.hideOnDesktop).map((route) => (
              <AppNavLink
                key={route.route}
                to={route.route}
                text={
                  <Typography fontSize={"0.9rem"}>
                    {route.labelDesktop}
                  </Typography>
                }
              />
            ))}
            <Box sx={{ ml: "1rem" }}>
              <ProfileAvatar />
            </Box>
          </Container>
        </>
      ) : (
        <>
          <IconButton
            edge="start"
            size="large"
            sx={{
              color: "#E7E7E7",
            }}
            onClick={handleOpen}
          >
            <Avatar
              src={user?.picture}
              sx={{
                width: 32,
                height: 32,
              }}
            />
          </IconButton>
          <BottomNavBar />
          <MobileDrawer handleOpen={handleOpen} isOpen={isOpen} />
        </>
      )}
    </Wrapper>
  );
};

export default AppBar;
