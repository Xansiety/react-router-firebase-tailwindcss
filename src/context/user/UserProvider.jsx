import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "@firebase/auth";
import { useEffect, useState } from "react";
import { FirebaseAuth } from "../../config/firebase";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider(); //google provider para poder ingresar

  const [user, setUser] = useState(false);

  //! Revisar el estado de la autentificacion
  useEffect(() => {
    //! Para poder estar pendiente de cuando el usuario cambia en su estado
    //! la funcion regresa un observable
    const unsuscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log(user)
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        setUser({
          uid,
          email,
          displayName,
          photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  const registerWithEmailPassword = async ({ displayName, email, password }) => {
    await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    await updateProfile(FirebaseAuth.currentUser, { displayName });
  };

  const loginWithEmailAndPassword = ({ email, password }) => signInWithEmailAndPassword(FirebaseAuth, email, password);

  const signInWithGoogle = () => (signInWithPopup(FirebaseAuth, googleProvider));

  const logOutFirebase = () =>  FirebaseAuth.signOut();

  return (
    <UserContext.Provider
      value={{
        user,
        registerWithEmailPassword,
        loginWithEmailAndPassword,
        signInWithGoogle,
        logOutFirebase,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
