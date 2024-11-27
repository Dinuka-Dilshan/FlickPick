import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
