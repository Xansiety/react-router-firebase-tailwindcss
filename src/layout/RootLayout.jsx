import { NavBar } from "../ui/components/NavBar";

export const RootLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
