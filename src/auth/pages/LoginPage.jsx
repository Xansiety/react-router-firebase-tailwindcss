import { Navigate } from "react-router";
import { useUserContext } from "../../hooks/useUserContext";
import { RootLayout } from "../../layout/RootLayout";

export const LoginPage = () => {
  const { user, signIn, signOut } = useUserContext();

   
  return (
    <RootLayout>
      <h1>Login</h1>
      <h2>{user ? "Conectado" : "Desconectado"}</h2>
      {user ? (
        <button className="btn btn-danger" onClick={signOut}>
          Cerrar sesión
        </button>
      ) : (
        <button className="btn btn-primary" onClick={signIn}>
          Iniciar sesión
        </button>
      )}
    </RootLayout>
  );
};
