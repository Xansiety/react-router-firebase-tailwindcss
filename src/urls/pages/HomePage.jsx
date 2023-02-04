import { useEffect, useState } from "react";
import { Text3XLTitle } from "../../components";
import { RootLayout } from "../../layout/RootLayout";
import { useDatabaseURLS } from "../hooks/useDatabaseURLS";
import { AlertDanger, IconSend, IconTrash, ButtonOutline } from "../../ui";

export const HomePage = () => {
  const { data, error, loading, loadUrls, createUrl, deleteUrl } =
    useDatabaseURLS();
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
    await createUrl(url);
    setUrl("");
  };

  const handleDeleteDoc = async (nanoid) => {
    console.log("handleDelete fn called");
    console.log({ nanoid });
    await deleteUrl(nanoid);
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
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <ButtonOutline
          type="submit"
          color="blue"
          loading={loading.creatingUrls}
        >
          <IconSend />
        </ButtonOutline>
      </form>

      {data.length <= 0 ? (
        <AlertDanger />
      ) : (
        data.map((item) => (
          <div key={item.nanoid}>
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
            <hr />
          </div>
        ))
      )}
    </RootLayout>
  );
};
