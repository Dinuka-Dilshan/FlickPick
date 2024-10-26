import { Box, Typography } from "@mui/material";
import { ROUTES } from "../../constants/routes";
import ProfileAvatar from "../Avatar/Avatar";
import SearchInput from "../SearchInput/SearchInput";
import AppNavLink from "./AppNavLink";

const AppBar = () => {
  return (
    <Box
      sx={{
        px: { xs: "0.5rem", md: "4rem" },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "#E8EAEE",
        height: "8vh",
      }}
    >
      <AppNavLink
        to={ROUTES.DEFAULT}
        text={
          <Typography
            sx={{
              fontWeight: 700,
              color: "primary.main",
              fontSize: "1.5rem",
            }}
          >
            <span style={{ color: "#1A1A1A" }}>Flick</span>Pick
          </Typography>
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <AppNavLink
          to={ROUTES.POPULAR_MOVIES}
          text={<Typography>Movies</Typography>}
        />
        <AppNavLink
          to={ROUTES.POPULAR_TVS}
          text={<Typography>Tvs</Typography>}
        />
        <SearchInput />
        <ProfileAvatar src="data:image/jpeg;base64,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" />
      </Box>
    </Box>
  );
};

export default AppBar;
