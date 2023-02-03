import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button, FormAlert, FormContainer, FormInputText, Text3XLTitle } from "../../components";
import { useUserContext } from "../../hooks/useUserContext";
import { AuthLayout } from "../../layout/AuthLayout";
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
    <AuthLayout>
      <FormContainer>
        <Text3XLTitle text="Sign In" />
        {apiErrorMessages && <FormAlert message={apiErrorMessages} />}
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputText type="email" placeholder="example@xyz.com" labelName="Your email" error={errors.email} {...register("email", { required, pattern: patternEmail })} >
              {errors.email && <FormAlert message={errors.email.message} />} 
            </FormInputText>         
            <FormInputText type="password" labelName="Enter your password" error={errors.password} {...register("password", { required, minLength, validate: validateTrim })} >
              {errors.password && <FormAlert message={errors.password.message} /> }
            </FormInputText>  

            <Button type="submit" text="Login" />   
            <button type="button" onClick={handleGoogleLogin}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 inline-flex transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <GoogleIcon />  Sign in with Google
              </span>
          </button> 
      </form>
      </FormContainer>
      
      
    </AuthLayout>
  );
};
