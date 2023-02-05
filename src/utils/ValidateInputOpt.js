export const ValidateInputOpt = (getValues, fieldKey) => {
  return {
    required: {
      value: true,
      message: "Required field",
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Invalid format email",
    },
    patternUrl: {
      value:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      message: "Invalid format url",
    },
    minLength: {
      value: 6,
      message: "Min length 6 characters",
    },
    validateTrim: {
      removeBlankSpaces: (v) => {
        if (!v.trim()) {
          return "Please, remove blank spaces";
        }
        return true;
      },
    },
    validateEquals(getValues, fieldKey) {
      return {
        matchesPreviousPassword: (v) =>
          v === getValues(fieldKey) || "Passwords should match!",
      };
    },
  };
};
