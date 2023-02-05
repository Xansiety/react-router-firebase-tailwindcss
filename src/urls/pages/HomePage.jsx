import { useEffect, useState } from "react";
import { FormAlert, FormInputText, Text3XLTitle } from "../../components";
import { RootLayout } from "../../layout/RootLayout";
import { useDatabaseURLS } from "../hooks/useDatabaseURLS";
import { AlertDanger, IconSend, ButtonOutline } from "../../ui";
import { useForm } from "react-hook-form";
import { ValidateInputOpt } from "../../utils/ValidateInputOpt";
import { errorsMessages, errorsObject } from "../../utils/ErrorsMessages";
import { ListContainer } from "../components/ListContainer"; 
import { AlertSuccess } from "../../ui/Alerts/AlertSuccess";

export const HomePage = () => {
  const { data, error, loading, loadUrls, createUrl, deleteUrl, updateUrl } = useDatabaseURLS();
  const { register, resetField, setValue, handleSubmit, formState: { errors } } = useForm();
  const [apiErrorMessages, setApiErrorMessages] = useState(null);
  const { required, patternUrl } = ValidateInputOpt();
  const [nanoid, setNanoid] = useState(undefined);
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState(null);
  const path = window.location.href;


  useEffect(() => {
    console.log("useEffect loadUrls called");
    loadUrls();
  }, []);

  if (loading.loadingUrls) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const onSubmitUrl = async ({ url }) => {
    try {
      if (nanoid) {
        await updateUrl(nanoid, url);
        setNanoid(undefined);
      } else {
        await createUrl(url);
      }
      resetField("url");
    } catch (error) {
      console.log(error);
      if (errorsMessages.includes(error.code)) {
        const { message } = errorsObject(error.code);
        setApiErrorMessages(message);
      } else {
        setApiErrorMessages(error.message);
      }
    }
  };

  const handleDeleteDoc = async (nanoid) => {
    console.log("handleDelete fn called");
    console.log({ nanoid });
    await deleteUrl(nanoid);
  };

  const handleEditDoc = async (newOrigin) => {
    console.log("handleEdit fn called");
    console.log({ newOrigin });
    //register a value to the input field
    setValue("url", newOrigin.origin);
    setNanoid(newOrigin.nanoid);
  };

  //Use clipboard API to copy the url to the clipboard
  const handleCopyToClipboard = async (nanoid) => {
    try {
      await navigator.clipboard.writeText(path + nanoid);
      setCopied(true);
      setLink(path + nanoid);
      console.log('Copied!')
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <RootLayout>
      <Text3XLTitle text="Home" />
      {apiErrorMessages && <FormAlert message={apiErrorMessages} />}
      <form onSubmit={handleSubmit(onSubmitUrl)} className="flex justify-between  flex-col md:flex-row" >
        <div className="w-full">
          <FormInputText type="text" placeholder="example@xyz.com" error={errors.url}
            {...register("url", { required, pattern: patternUrl })} >
            {errors.url && <FormAlert message={errors.url.message} />}
          </FormInputText>
        </div>
        <div>
          <ButtonOutline type="submit" color="blue" loading={loading.creatingUrls || loading?.[nanoid]}>
            <IconSend />
          </ButtonOutline>
        </div>
      </form> 
      {data.length <= 0 ? ( <AlertDanger /> ) : (
        <>
          { copied && <AlertSuccess link={link} />  }
          <ListContainer
            data={data}
            path={path}
            handleDeleteDoc={handleDeleteDoc}
            handleEditDoc={handleEditDoc}
            handleCopyToClipboard={handleCopyToClipboard}
            loading={loading}
          />
        </>
         
      )}
    </RootLayout>
  );
};
