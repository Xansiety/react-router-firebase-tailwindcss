import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const signIn = () => {
    setUser(true);
    navigate("/");
  };

  const signOut = () => {
    setUser(false);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
