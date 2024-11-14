import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
