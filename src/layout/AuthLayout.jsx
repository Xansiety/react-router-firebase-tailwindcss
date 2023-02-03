import { NavBar } from "../ui/components/NavBar";

export const AuthLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="w-96 mx-auto mt-10">{children}</div>
    </>
  );
};
