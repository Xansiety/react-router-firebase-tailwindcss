import { AuthLayout } from "../../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../hooks/useUserContext";
import { useNavigate } from "react-router"; 
import { Button, FormAlert, FormInputText,Text3XLTitle, FormContainer } from "../../components";
import { useState } from "react";
import { errorsMessages, errorsObject } from "../../utils/ErrorsMessages";
import { ValidateInputOpt } from "../../utils/ValidateInputOpt";
import { BtnLoading } from "../../ui/Buttons/BtnLoading";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerWithEmailPassword } = useUserContext();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const { required, patternEmail, minLength, validateTrim, validateEquals } = ValidateInputOpt();
  const [ apiErrorMessages, setApiErrorMessages ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const onSubmit = async ({ email, password, displayName }) => {
    setIsLoading(true);
    setApiErrorMessages(null);
    try {
      await registerWithEmailPassword({ email, password, displayName }); 
      navigate("/");
    } catch (error) {
      if (errorsMessages.includes(error.code)) {
        const { message } = errorsObject(error.code);
        setApiErrorMessages(message);
      }
      setApiErrorMessages("Oops, something went wrong, try again.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout> 
      <FormContainer>
        <Text3XLTitle text="Join me!" />
        {apiErrorMessages && <FormAlert message={apiErrorMessages} />}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInputText type="text" placeholder="xansiety" labelName="Enter your nickname"
            {...register("displayName", { required })} error={errors.displayName} >
            {errors.displayName && ( <FormAlert message={errors.displayName.message} /> )}
          </FormInputText>

          <FormInputText type="email" placeholder="Email" labelName="Enter your email"
            {...register("email", { required, pattern: patternEmail })} error={errors.email} >
            {errors.email && <FormAlert message={errors.email.message} />}
          </FormInputText>

          <FormInputText type="password" labelName="Enter your password" 
            {...register("password", { required, minLength, validate: validateTrim, })} error={errors.password} >
            {errors.password && <FormAlert message={errors.password.message} />}
          </FormInputText>

          <FormInputText type="password" labelName="Repeat your password" 
            {...register("password2", { required, minLength, validate: validateEquals(getValues, "password") })} error={errors.password2} >
            {errors.password2 && <FormAlert message={errors.password2.message} />}
          </FormInputText> 
          { !isLoading  ? <Button type="submit" text="Register" /> :  <BtnLoading /> }       
        </form>
      </FormContainer>  
    </AuthLayout>
  );
};
