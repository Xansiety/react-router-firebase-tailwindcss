import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FormAlert, FormInputText } from "../../components";
import { useUserContext } from "../../hooks/useUserContext";
import { RootLayout } from "../../layout/RootLayout";
import { firebaseErrors, ErrorsFirebase, FormValidate } from "../../utils";
import { useState } from "react";

export const LoginPage = () => {
  const navigate = useNavigate(); 
  const { loginWithEmailAndPassword, signInWithGoogle } = useUserContext();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { required, patternEmail, minLength, validateTrim } = FormValidate();
  const [ apiErrorMessages, setApiErrorMessages ] = useState(null);

  const onSubmit = async ({ email, password, displayName }) => {
    setApiErrorMessages(null);
    try {
      await loginWithEmailAndPassword({ email, password, displayName });
      console.log("Usuario registrado");
      navigate("/");
    } catch (error) {
      if (firebaseErrors.includes(error.code)) {
        const { message } = ErrorsFirebase(error.code);
        setApiErrorMessages(message);
      }
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
      {apiErrorMessages && <FormAlert message={apiErrorMessages} />}
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
