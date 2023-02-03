import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FormAlert, FormInputText } from "../../components";
import { useUserContext } from "../../hooks/useUserContext";
import { RootLayout } from "../../layout/RootLayout";
import { firebaseErrors, ErrorsFirebase, FormValidate } from "../../utils";
import { useState } from "react";
import { GoogleIcon } from "../../components/icons/GoogleIcon";

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

        <button onClick={handleGoogleLogin} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
          <GoogleIcon />
          Sign in with Google
        </button>

      </form>
    </RootLayout>
  );
};
