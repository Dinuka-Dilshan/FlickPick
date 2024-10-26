import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import { ROUTES } from "../constants/routes";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
