import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
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
import AppNavLink from "./AppNavLink";
import Logo from "./Logo";
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
  const { logout, isLoading, user } = useAuth();
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
      {isLargeScreen && (
        <Container>
          <AppNavLink
            to={ROUTES.POPULAR_MOVIES}
            text={<Typography>Movies</Typography>}
          />
          <AppNavLink
            to={ROUTES.POPULAR_TVS}
            text={<Typography>Tvs</Typography>}
          />
          <SearchInput />
          <ProfileAvatar />
        </Container>
      )}

      {!isLargeScreen && (
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

      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={handleOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "75vw",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            bgcolor: "#2D2D2D",
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "#2D2D2D",
            height: "100%",
            p: "2rem",
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid2 container gap={1.5} mb="1rem">
            <Grid2
              size={{ xs: 2 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar sx={{ width: "32px", height: "32px" }} />
            </Grid2>
            <Grid2
              size={{ xs: 9 }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography
                fontSize="0.75rem"
                fontWeight="bold"
                sx={{ color: "#EFEFEF" }}
              >
                {user?.name}
              </Typography>
              <Typography
                fontSize="0.75rem"
                component="span"
                sx={{ color: "#EFEFEF" }}
              >
                {user?.email}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Divider />
            </Grid2>
          </Grid2>
          <AppNavLink
            to={ROUTES.POPULAR_MOVIES}
            text={<Typography>Movies</Typography>}
            onClick={handleOpen}
          />
          <AppNavLink
            to={ROUTES.POPULAR_TVS}
            text={<Typography>Tvs</Typography>}
            onClick={handleOpen}
          />
          <Button
            disabled={isLoading}
            onClick={logout}
            size="medium"
            startIcon={<LogoutOutlinedIcon />}
            sx={{ textTransform: "none", px: "1rem", marginTop: "auto" }}
            variant="contained"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Wrapper>
  );
};

export default AppBar;
