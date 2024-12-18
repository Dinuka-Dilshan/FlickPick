import { Box, styled, Typography } from "@mui/material";
import { cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBarRoutes from "./AppBarRoutes";

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

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrapper
      sx={{
        display: { xs: "flex", lg: "none" },
        px:'0.75rem'
      }}
    >
      {AppBarRoutes.map((item, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            py: 5,
            gap:0.5
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
                color: location.pathname === item.route ? "#E75480" : "#FFF",
                mb: "-8px",
              },
            })}
          </Box>
          <Typography
            sx={{
              color: location.pathname === item.route ? "#E75480" : "#FFF",
              fontSize: "0.65rem",
            }}
          >
            {item.labelMobile}
          </Typography>
        </Box>
      ))}
    </Wrapper>
  );
};

export default BottomNavBar;
