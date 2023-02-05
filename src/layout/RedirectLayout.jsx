import { Outlet, useParams } from "react-router";
import { useDatabaseURLS } from "../urls/hooks/useDatabaseURLS";
import { useEffect, useState } from "react";
import { Text3XLTitle } from "../components";
import { AuthLayout } from "./AuthLayout";

export const RedirectLayout = () => {
  const { searchUrl } = useDatabaseURLS();
  const { nanoid } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchUrl(nanoid)
      .then((docSnap) => {
        if (docSnap.exists()) {
          window.location.href = docSnap.data().origin;
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Text3XLTitle text="Please wait, " />;
  }

  return (
    <AuthLayout>
      <div className="mx-auto container">
        <Outlet />
      </div>
    </AuthLayout>
  );
};
