import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  text: string | ReactNode;
};

const AppNavLink = ({ to, text }: Props) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: "none",
        backgroundColor: isActive ? "#EBEBEB" : "",
        borderRadius: "8px",
        padding: "0.2rem 0.5rem",
        color: isActive ? "#5B5B5B" : "",
      })}
    >
      {text}
    </NavLink>
  );
};

export default AppNavLink;
