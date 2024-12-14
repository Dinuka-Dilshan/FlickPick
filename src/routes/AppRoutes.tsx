import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "../components/FullScreenLoader/FullScreenLoader";
import { ROUTES } from "../constants/routes";

// Lazy loading routes
const MainLayout = lazy(() => import("./MainLayout"));
const Login = lazy(() => import("../modules/Auth/Pages/Login"));
const SignUp = lazy(() => import("../modules/Auth/Pages/SignUp"));
const VerifyAccount = lazy(() => import("../modules/Auth/Pages/VerifyAccount"));
const PopularMoviesTvs = lazy(
  () => import("../modules/PopularList/Pages/PopularMoviesTvs")
);
const Search = lazy(() => import("../modules/Search/Pages/Search"));
const TitleDetails = lazy(
  () => import("../modules/TitleDetails/Pages/TitleDetails")
);
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const WatchList = lazy(() => import("../modules/WatchList/Pages/WatchList"));
const FlickHistory = lazy(
  () => import("../modules/FlickHistory/Pages/FlickHistory")
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
