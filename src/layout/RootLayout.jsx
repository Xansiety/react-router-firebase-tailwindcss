import { NavBar } from "../ui/components/NavBar";

export const RootLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">{children}</div>
    </>
  );
};
