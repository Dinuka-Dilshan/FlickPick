import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import { ROUTES } from "../constants/routes";
import PopularMovies from "../pages/PopularMovies";
import PopularTvs from "../pages/PopularTvs";
import Search from "../pages/Search";
import TitleDetails from "../pages/TitleDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
