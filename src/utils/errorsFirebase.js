export const firebaseErrors = [
  "auth/email-already-in-use",
  "auth/invalid-email",
  "auth/invalid-email-verified",
  "auth/invalid-password",
  "auth/user-not-found",
  "auth/wrong-password",
];

export const ErrorsFirebase = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return { code: "firebase", message: "Usuario ya registrado" };

    case "auth/invalid-email":
      return { code: "firebase", message: "Formato email no válido" };

    case "auth/invalid-email-verified":
      return { code: "firebase", message: "El email no está verificado" };

    case "auth/invalid-password":
      return {
        code: "password",
        message: "Contraseña mínimo 6 carácteres",
      };

    case "auth/user-not-found":
      return { code: "firebase", message: "Usuario no encontrado" };

    case "auth/wrong-password":
      return { code: "firebase", message: "Usuario no encontrado" };

    default:
      return { code: "firebase", message: "Error, inténtelo más tarde" };
  }
};
