import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { getLoggedInUserFromLocalStrorage } from "../utils/localStorage";

const ProtectedRoute = () => {
  const user = getLoggedInUserFromLocalStrorage();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
