import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          px: { xs: "0.5rem", md: "10rem" },
          pt: "1rem",
          backgroundColor: "#F2F2F2",
          minHeight: "92vh",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
