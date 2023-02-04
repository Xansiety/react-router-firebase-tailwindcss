import { useEffect, useState } from "react";
import { Text3XLTitle } from "../../components";
import { RootLayout } from "../../layout/RootLayout";
import { useDatabaseURLS } from "../hooks/useDatabaseURLS";
import {
  AlertDanger,
  IconSend,
  IconTrash,
  ButtonOutline,
  IconPencil,
} from "../../ui";

export const HomePage = () => {
  const { data, error, loading, loadUrls, createUrl, deleteUrl, updateUrl } =
    useDatabaseURLS();
  const [nanoid, setNanoid] = useState(undefined);
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log("useEffect loadUrls called");
    loadUrls();
  }, []);

  if (loading.loadingUrls) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ url }); 
    if (nanoid) {
      await updateUrl(nanoid, url);
      setNanoid("");
      setUrl("");
    } else {
      await createUrl(url);
      setUrl("");
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
    setUrl(newOrigin.origin);
    setNanoid(newOrigin.nanoid);
  };

  return (
    <RootLayout>
      <Text3XLTitle text="Home" />

      <form
        onSubmit={handleSubmit}
        className="flex justify-center align-center"
      >
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <ButtonOutline
          type="submit"
          color="blue"
          loading={loading.creatingUrls || loading?.[nanoid]}
        >
          <IconSend />
        </ButtonOutline>
      </form>

      {data.length <= 0 ? (
        <AlertDanger />
      ) : (
        data.map((item) => (
          <div key={item.nanoid} className="mt-8">
            <h1>{item.nanoid}</h1>
            <h2>{item.origin}</h2>
            <h3>{item.uid}</h3>
            <ButtonOutline
              loading={loading[item.nanoid]}
              type="button"
              color="red"
              onClick={() => handleDeleteDoc(item.nanoid)}
            >
              <IconTrash />
            </ButtonOutline>

            <ButtonOutline
              loading={loading[item.nanoid]}
              type="button"
              color="green"
              onClick={() => handleEditDoc(item)}
            >
              <IconPencil />
            </ButtonOutline>
            <hr />
          </div>
        ))
      )}
    </RootLayout>
  );
};
