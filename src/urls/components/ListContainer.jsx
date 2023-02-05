import { ListItem } from "./ListItem";

export const ListContainer = ({ data, path, loading, handleDeleteDoc, handleEditDoc,handleCopyToClipboard }) => {
  return (
    <div className="w-full max-w-xl2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          My favorite sites
        </h5>
      </div>
      <div className="flow-root w-full">
        <ul
          role="list"
          className=" flex flex-col divide-y divide-gray-200 dark:divide-gray-700"
        >
          {data.map((item) => (
            <li className="py-3 sm:py-4 " key={item.nanoid}>
              <ListItem
                item={item}
                loading={loading}
                path={path}
                handleDeleteDoc={handleDeleteDoc}
                handleEditDoc={handleEditDoc}
                handleCopyToClipboard={handleCopyToClipboard}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
