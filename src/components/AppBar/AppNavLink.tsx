import { useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  text: string | ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const AppNavLink = ({ to, text, onClick, style }: Props) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        backgroundColor: isActive ? "#0A84FF" : "",
        borderRadius: "8px",
        padding: `${isLargeScreen ? "0.2rem" : "0.5rem"} 0.5rem`,
        color: "#E7E7E7",
        ...style,
      })}
      onClick={onClick}
    >
      {text}
    </NavLink>
  );
};

export default AppNavLink;
