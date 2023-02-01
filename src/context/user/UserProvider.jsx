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

  const registerWithEmailPassword = async ({
    displayName,
    email,
    password,
  }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const { uid, photoURL } = response.user; //  //console.log(response)
      //!Actualizar el display name en firebase
      await updateProfile(FirebaseAuth.currentUser, { displayName });
      return {
        ok: true,
        uid,
        photoURL,
        email,
        displayName,
      };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        ok: false,
        errorCode,
        errorMessage,
      };
    }
  };

  const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const { uid, photoURL, displayName } = response.user;
      return {
        ok: true,
        uid,
        photoURL,
        email,
        displayName,
      };
    } catch (error) {
      //console.error(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        ok: false,
        errorCode,
        errorMessage,
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(FirebaseAuth, googleProvider); //esperamos el popup de la autentificación que use el usuario
      // const credentials = GoogleAuthProvider.credentialFromResult(result);
      // //console.log(credentials)
      const { displayName, email, photoURL, uid } = result.user;
      return {
        ok: true,
        displayName,
        email,
        photoURL,
        uid,
      };
    } catch (error) {
      //console.error(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        ok: false,
        errorCode,
        errorMessage,
      };
    }
  };

  const logOutFirebase = async () => {
    return await FirebaseAuth.signOut();
  };

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
