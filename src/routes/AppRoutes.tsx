import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Login from "../modules/Auth/Pages/Login";
import SignUp from "../modules/Auth/Pages/SignUp";
import VerifyAccount from "../modules/Auth/Pages/VerifyAccount";
import PopularMoviesTvs from "../modules/PopularList/Pages/PopularMoviesTvs";
import Search from "../modules/Search/Pages/Search";
import TitleDetails from "../modules/TitleDetails/Pages/TitleDetails";
import WatchList from "../modules/WatchList/Pages/WatchList";
import MainLayout from "./MainLayout";
import ProtectedRoute from "./ProtectedRoute";

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
            <Route
              path={ROUTES.POPULAR_MOVIES}
              element={<PopularMoviesTvs varient="MOVIE" />}
            />
            <Route
              path={ROUTES.POPULAR_TVS}
              element={<PopularMoviesTvs varient="TV" />}
            />
            <Route path={ROUTES.SEARCH} element={<Search />} />
            <Route
              path={ROUTES.TITILE_DETAILS(":id")}
              element={<TitleDetails />}
            />
            <Route path={ROUTES.WISH_LIST} element={<WatchList />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
