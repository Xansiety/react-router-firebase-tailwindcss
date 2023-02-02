export const ErrorsFirebase = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return { code: "email", message: "Usuario ya registrado" };

    case "auth/invalid-email":
      return { code: "email", message: "Formato email no válido" };

    case "auth/invalid-email-verified":
      return { code: "email", message: "El email no está verificado" };

    case "auth/invalid-password":
      return {
        code: "password",
        message: "Contraseña mínimo 6 carácteres",
      };

    case "auth/user-not-found":
      return { code: "email", message: "Usuario no registrado" };

    case "auth/wrong-password":
      return { code: "password", message: "Contraseña incorrecta" };

    default:
      return { code: "firebase", message: "Error, inténtelo más tarde" };
  }
};
