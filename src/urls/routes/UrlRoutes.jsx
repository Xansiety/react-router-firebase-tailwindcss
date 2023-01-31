import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, TestPage  } from "../pages";
export const UrlRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />  
      <Route path="/test" element={<TestPage />} />  
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
