import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import SearchDrawer from "../components/SearchDrawer/SearchDrawer";

const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          px: { xs: "0.5rem", md: "5rem" },
          pt: "1rem",
          backgroundColor: "#2D2D2D",
          minHeight: "92vh",
        }}
      >
        <Outlet />
        <SearchDrawer />
      </Box>
    </>
  );
};

export default MainLayout;
