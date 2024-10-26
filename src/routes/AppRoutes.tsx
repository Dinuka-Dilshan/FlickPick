import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import { ROUTES } from "../constants/routes";
import PopularMovies from "../pages/PopularMovies";
import PopularTvs from "../pages/PopularTvs";
import Search from "../pages/Search";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
