import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Box sx={{ px: "4rem", pt: "1rem" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
