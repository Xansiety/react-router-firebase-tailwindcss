import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

export const NavBar = () => {
  const { user, signOut } = useUserContext();
  return (
    <>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={signOut}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <NavLink to="/auth/login">Login</NavLink>
        </>
      )}
    </>
  );
};
