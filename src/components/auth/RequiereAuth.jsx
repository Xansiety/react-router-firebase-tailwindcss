import { Navigate } from "react-router";
import { useUserContext } from "../../hooks/useUserContext";

export const RequiereAuth = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
