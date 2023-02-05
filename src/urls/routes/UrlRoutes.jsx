import { Routes, Route } from "react-router-dom";
import { HomePage, PerfilPage, TestPage } from "../pages";
import { RedirectLayout } from "../../layout/RedirectLayout";
import { NotFoundPage } from "../pages/NotFoundPage";
export const UrlRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/perfil" element={<PerfilPage />} />
      {/* <Route path="/:nanoid" element={<RedirectLayout />}>
        <Route index element={<NotFoundPage />} />
      </Route> */}
    </Routes>
  );
};
