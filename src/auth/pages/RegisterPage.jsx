import { RootLayout } from "../../layout/RootLayout";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../hooks/useUserContext";
import { useNavigate } from "react-router";
import { firebaseErrors, ErrorsFirebase, FormValidate } from "../../utils";
import { FormAlert, FormInputText } from "../../components";
import { useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerWithEmailPassword } = useUserContext();
  const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm();
  const { required, patternEmail, minLength, validateTrim, validateEquals } = FormValidate();
  const [ apiErrorMessages, setApiErrorMessages ] = useState(null);


  const onSubmit = async ({ email, password, displayName }) => {
    setApiErrorMessages(null);
    try {
      await registerWithEmailPassword({ email, password, displayName });
      console.log("Usuario registrado");
      navigate("/");
    } catch (error) {
      if (firebaseErrors.includes(error.code)) {
        const { message } = ErrorsFirebase(error.code);
        setApiErrorMessages(message);
      }
    }
  };

  return (
    <RootLayout>
      <h1>Registrarme</h1>
      {apiErrorMessages && <FormAlert message={apiErrorMessages} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          type="text"
          placeholder="Nombre de usuario"
          {...register("displayName", { required })}
        >
          {errors.displayName && (
            <FormAlert message={errors.displayName.message} />
          )}
        </FormInputText>

        <FormInputText
          type="email"
          placeholder="Email"
          {...register("email", { required, pattern: patternEmail })}
        >
          {errors.email && <FormAlert message={errors.email.message} />}
        </FormInputText>

        <FormInputText
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
        >
          {errors.password && <span>{errors.password.message}</span>}
        </FormInputText>

        <FormInputText
          type="password"
          placeholder="Confirmar contraseña"
          {...register("password2", {
            required,
            minLength,
            validate: validateEquals(getValues, "password"),
          })}
        >
          {errors.password2 && <FormAlert message={errors.password2.message} />}
        </FormInputText>

        <button type="submit">Registrarme</button>
      </form>
    </RootLayout>
  );
};
