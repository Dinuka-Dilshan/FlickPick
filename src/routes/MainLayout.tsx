import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";

const MainLayout = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div style={{ marginTop: 70 }}>
      <AppBar />
      <Box
        sx={{
          px: { xs: "0.75rem", md: "5rem" },
          pt: "1rem",
          backgroundColor: "#1F1F1F",
          minHeight: "92vh",
          mb: !isLargeScreen ? "12vh" : "",
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
};

export default MainLayout;
