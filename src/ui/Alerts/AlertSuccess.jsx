import { IconInfo } from "../Icons/IconInfo";

export const AlertSuccess = ({link}) => {
  return (
    <div
      className="flex p-4 mb-4 text-xl text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <IconInfo />
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium"> {link}  copied to the clipboard!</span> Please paste in a new tab of your browser.
      </div>
    </div>
  );
};
