import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FormAlert, FormInputText } from "../../components";
import { useUserContext } from "../../hooks/useUserContext";
import { RootLayout } from "../../layout/RootLayout";
import { ErrorsFirebase, FormValidate } from "../../utils";

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const { loginWithEmailAndPassword, signInWithGoogle } = useUserContext();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { required, patternEmail, minLength, validateTrim } = FormValidate();

  const onSubmit = async ({ email, password, displayName }) => {
    try {
      await loginWithEmailAndPassword({ email, password, displayName });
      console.log("Usuario registrado");
      navigate("/");
    } catch (error) {
      console.error(error)
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };
 
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      return navigate("/");
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <RootLayout>
      <h1>Login</h1>
      {errors.firebase && <FormAlert message={errors.firebase.message} />}
      <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText type="email" placeholder="Email" {...register("email", { required, pattern: patternEmail })} >
            {errors.email && <FormAlert message={errors.email.message} />} 
          </FormInputText>         
          <FormInputText type="password" placeholder="Contraseña" {...register("password", { required, minLength, validate: validateTrim })} >
            {errors.password && <span>{errors.password.message}</span>}
          </FormInputText>  
        <button type="submit">Login</button> |
        <button type="button" onClick={handleGoogleLogin}>
          Login con Google
        </button>
      </form>
    </RootLayout>
  );
};
