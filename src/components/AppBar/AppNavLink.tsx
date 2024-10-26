import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

type Props = {
  to: keyof typeof ROUTES;
  text: string | ReactNode;
};

const AppNavLink = ({ to, text }: Props) => {
  return (
    <NavLink
      to={ROUTES[to]}
      style={({ isActive }) => ({
        textDecoration: "none",
        backgroundColor: isActive ? "#EBEBEB" : "",
        borderRadius: "8px",
        padding: "0.2rem 0.5rem",
        color: isActive ? "#5B5B5B" : "",
      })}
    >
      <Typography>{text}</Typography>
    </NavLink>
  );
};

export default AppNavLink;
