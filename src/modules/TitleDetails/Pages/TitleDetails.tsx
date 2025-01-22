import { useMediaQuery, useTheme } from "@mui/material";
import { lazy } from "react";
const TitleDetailsMobile = lazy(() => import("../TitleDetailsMobile"));
const TitleDetailsDesktop = lazy(() => import("../TitleDetailsDesktop"));

const TitleDetails = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  if (isLg) {
    return <TitleDetailsDesktop />;
  }

  return <TitleDetailsMobile />;
};

export default TitleDetails;
