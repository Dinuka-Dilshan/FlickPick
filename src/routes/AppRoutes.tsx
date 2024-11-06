import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
const Login = lazy(() => import("../pages/Login"));
const PopularMovies = lazy(() => import("../pages/PopularMovies"));
const PopularTvs = lazy(() => import("../pages/PopularTvs"));
const Search = lazy(() => import("../pages/Search"));
const TitleDetails = lazy(() => import("../pages/TitleDetails"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path={ROUTES.DEFAULT}
              element={<Navigate to={ROUTES.POPULAR_MOVIES} />}
            />
            <Route path={ROUTES.POPULAR_MOVIES} element={<PopularMovies />} />
            <Route path={ROUTES.POPULAR_TVS} element={<PopularTvs />} />
            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route
              path={ROUTES.TITILE_DETAILS(":id")}
              element={<TitleDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
