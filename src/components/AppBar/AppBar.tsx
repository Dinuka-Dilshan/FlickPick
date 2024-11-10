import { Box, styled, Typography } from "@mui/material";
import { ROUTES } from "../../constants/routes";
import ProfileAvatar from "./ProfileAvatar";
import SearchInput from "../SearchInput/SearchInput";
import AppNavLink from "./AppNavLink";
import Logo from "./Logo";

const Wrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid",
  borderColor: "#E8EAEE",
  height: "8vh",
});

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1.5,
});

const AppBar = () => {
  return (
    <Wrapper sx={{ px: { xs: "0.5rem", md: "10rem" } }}>
      <AppNavLink to={ROUTES.DEFAULT} text={<Logo />} />
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
    </Wrapper>
  );
};

export default AppBar;
