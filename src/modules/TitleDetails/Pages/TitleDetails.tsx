import { useMediaQuery, useTheme } from "@mui/material";
import TitleDetailsDesktop from "../TitleDetailsDesktop";
import TitleDetailsMobile from "../TitleDetailsMobile";

const TitleDetails = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  if (isLg) {
    return <TitleDetailsDesktop />;
  }

  return <TitleDetailsMobile />;
};

export default TitleDetails;
