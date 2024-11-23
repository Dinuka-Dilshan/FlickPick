import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import { ROUTES } from "../constants/routes";
import Login from "../pages/Login";
import PopularMovies from "../pages/PopularMovies";
import PopularTvs from "../pages/PopularTvs";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import TitleDetails from "../pages/TitleDetails";
import VerifyAccount from "../pages/VerifyAccount";
import WishList from "../pages/WishList";
import ProtectedRoute from "./ProtectedRoute";

// const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
// const Login = lazy(() => import("../pages/Login"));
// const PopularMovies = lazy(() => import("../pages/PopularMovies"));
// const PopularTvs = lazy(() => import("../pages/PopularTvs"));
// const Search = lazy(() => import("../pages/Search"));
// const TitleDetails = lazy(() => import("../pages/TitleDetails"));
// const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
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
            <Route path={ROUTES.POPULAR_MOVIES} element={<PopularMovies />} />
            <Route path={ROUTES.POPULAR_TVS} element={<PopularTvs />} />
            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route
              path={ROUTES.TITILE_DETAILS(":id")}
              element={<TitleDetails />}
            />
            <Route path={ROUTES.WISH_LIST} element={<WishList />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
