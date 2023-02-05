import { LoadingSpinner } from "../Loaders";

export const ButtonOutline = ({
  type,
  color = "red",
  loading,
  children,
  onClick,
}) => {
  if (loading) return <LoadingSpinner />;

  const classButtonDynamic = `ml-4 text-${color}-700 rounded-full  hover:text-white border border-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-${color}-500 dark:text-${color}-500 dark:hover:text-white dark:hover:bg-${color}-600 dark:focus:ring-${color}-900 md`;

  return (
    <button type={type} onClick={onClick} className={classButtonDynamic}>
      {children}
    </button>
  );
};
