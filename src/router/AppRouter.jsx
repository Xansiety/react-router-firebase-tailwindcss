import { Route, Routes } from "react-router";
import { AuthRoutes } from "../auth";
import { RequiereAuth } from "../components/auth/RequiereAuth";
import { useUserContext } from "../hooks/useUserContext";
import { UrlRoutes } from "../urls";
import { RedirectLayout } from "../layout/RedirectLayout"; 

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
      <Route path="/:nanoid" element={<RedirectLayout />} />
    </Routes>
  );
};

export default AppRouter;
