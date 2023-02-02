import { RootLayout } from "../../layout/RootLayout";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../hooks/useUserContext";
import { useNavigate } from "react-router";
import { errorsFirebase } from "../../utils/errorsFirebase";
import { FormAlert } from "../../components/forms/FormAlert";
import { formValidate } from "../../utils/formValidate";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerWithEmailPassword } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const onSubmit = async ({ email, password, displayName }) => {
    try {
      await registerWithEmailPassword({ email, password, displayName });
      console.log("Usuario registrado");
      navigate("/");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <RootLayout>
      <h1>Registrarme</h1>
      {errors.firebase && <FormAlert message={errors.firebase.message} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <input
            type="text"
            placeholder="Nombre de usuario"
            autoComplete="off"
            {...register("displayName", {
              required,
            })}
          />
          {errors.displayName && (
            <FormAlert message={errors.displayName.message} />
          )}
        </p>

        <p>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            {...register("email", {
              required,
              patternEmail,
            })}
          />
          {errors.email && <FormAlert message={errors.email.message} />}
        </p>

        <p>
          <input
            type="password"
            placeholder="Contraseña"
            autoComplete="off"
            {...register("password", {
              required,
              minLength,
              validate: validateTrim,
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </p>

        <p>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            autoComplete="off"
            {...register("password2", {
              required,
              minLength,
              validate: validateEquals(getValues, "password"),
            })}
          />
          {errors.password2 && <FormAlert message={errors.password2.message} />}
        </p>

        <button type="submit">Registrarme</button>
      </form>
    </RootLayout>
  );
};
