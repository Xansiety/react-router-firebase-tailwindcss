import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth";
import { RequiereAuth } from "../components/RequiereAuth";
import { useUserContext } from "../hooks/useUserContext";
import { UrlRoutes } from "../urls";

const AppRouter = () => {
  const { user } = useUserContext();

  // estado inicial del usuario
  if (user === false) {
    return <p>Cargando...</p>;
  }

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route
        path="/*"
        element={
          <RequiereAuth>
            <UrlRoutes />
          </RequiereAuth>
        }
      />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRouter;
