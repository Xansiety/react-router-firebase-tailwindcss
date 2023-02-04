export const errorsMessages = [
  "auth/email-already-in-use",
  "auth/invalid-email",
  "auth/invalid-email-verified",
  "auth/invalid-password",
  "auth/user-not-found",
  "auth/wrong-password",
];

export const errorsObject = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return {
        code: "firebase",
        message: "The access data does not match our records.",
      };

    case "auth/invalid-email":
      return { code: "firebase", message: "Invalid email format." };

    case "auth/invalid-email-verified":
      return { code: "firebase", message: "Email is not verified." };

    case "auth/invalid-password":
      return {
        code: "password",
        message: "Password too weak, please enter another one.",
      };

    case "auth/user-not-found":
      return {
        code: "firebase",
        message: "Incorrect Email/Password, try again.",
      };

    case "auth/wrong-password":
      return {
        code: "firebase",
        message: "Incorrect Email/Password, try again.",
      };

    default:
      return { code: "firebase", message: "Server error, try again." };
  }
};
