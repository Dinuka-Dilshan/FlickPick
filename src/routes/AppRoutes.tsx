
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";
import { ROUTES } from "../constants/routes";
import FlickHistory from "../modules/FlickHistory/Pages/FlickHistory";
import PopularMoviesTvs from "../modules/PopularList/Pages/PopularMoviesTvs";
import WatchList from "../modules/WatchList/Pages/WatchList";
import MainLayout from "./MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Search from "../modules/Search/Pages/Search";

const Login = lazy(() => import("../modules/Auth/Pages/Login"));
const SignUp = lazy(() => import("../modules/Auth/Pages/SignUp"));
const VerifyAccount = lazy(() => import("../modules/Auth/Pages/VerifyAccount"));
const TitleDetails = lazy(
  () => import("../modules/TitleDetails/Pages/TitleDetails")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.VERIFY_ACCOUNT} element={<VerifyAccount />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path={ROUTES.DEFAULT}
              element={<Navigate to={ROUTES.POPULAR_MOVIES} />}
            />
            <Route
              path={ROUTES.POPULAR_MOVIES}
              element={<PopularMoviesTvs varient="MOVIES" />}
            />
            <Route
              path={ROUTES.POPULAR_TVS}
              element={<PopularMoviesTvs varient="TVS" />}
            />
            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route
              path={ROUTES.TITILE_DETAILS(":id")}
              element={<TitleDetails />}
            />
            <Route path={ROUTES.WISH_LIST} element={<WatchList />} />
            <Route path={ROUTES.FLICK_HISTORY} element={<FlickHistory />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
