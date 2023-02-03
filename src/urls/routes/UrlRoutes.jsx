import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, PerfilPage, TestPage  } from "../pages";
export const UrlRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />  
      <Route path="/test" element={<TestPage />} />  
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
