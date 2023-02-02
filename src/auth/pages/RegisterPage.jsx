import { RootLayout } from "../../layout/RootLayout";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../hooks/useUserContext";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerWithEmailPassword } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      displayName: "test",
      email: "test@test.com",
      password: "123456",
      password2: "123456",
    },
  });

  const onSubmit = async ({ email, password, displayName }) => {
    try {
      await registerWithEmailPassword({ email, password, displayName });
      console.log("Usuario registrado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "Usuario ya registrado",
          });
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Formato email no válido",
          });
          break;
        case "auth/weak-password":
          setError("password", {
            message: "La contraseña debe tener al menos 6 caracteres",
          });
          break;
        default:
          console.log("Ocurrio un error en el server");
          setError("Ocurrio un error en el server");
      }
    }
  };

  return (
    <RootLayout>
      <h1>Registrarme</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          autoComplete="off"
          {...register("displayName", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        />
        {errors.displayName && <span>{errors.displayName.message}</span>}
        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...register("email", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Por favor ingresa un email valido", // JS only: <p>error message</p> TS only support string
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="off"
          {...register("password", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
            validate: {
              removeBlankSpaces: (v) => {
                if (!v.trim()) {
                  return "No se permiten espacios en blanco";
                }
                return true;
              },
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          placeholder="Confirmar contraseña"
          autoComplete="off"
          {...register("password2", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
            validate: {
              matchesPreviousPassword: (v) =>
                v === getValues("password") || "Las contraseñas no coinciden",
            },
          })}
        />
        {errors.password2 && <span>{errors.password2.message}</span>}
        <button type="submit">Registrarme</button>
      </form>
    </RootLayout>
  );
};
