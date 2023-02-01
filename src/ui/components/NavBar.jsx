import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

export const NavBar = () => {
  const { user, logOutFirebase } = useUserContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutFirebase(); 
  };

  return (
    <>
      {user ? (
        <>
          <NavLink to="/">Inicio</NavLink>
          <button onClick={handleLogOut}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <NavLink to="/auth/login">Login</NavLink>
          <NavLink to="/auth/register">Register</NavLink>
        </>
      )}
    </>
  );
};
