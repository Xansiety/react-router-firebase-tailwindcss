import { IconTrash, IconPencil, ButtonOutline, IconBrowser } from "../../ui";

export const ListItem = ({
  item,
  path,
  loading,
  handleDeleteDoc,
  handleEditDoc,
  handleCopyToClipboard
}) => {
  return (
    <div className="flex items-start  flex-col md:flex-row">
      <div className="flex-1 min-w-0">
        <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
          {path + item.nanoid}
        </p>
        <p className="text-md overflow-wrap: normal; word-break: normal; text-gray-500 dark:text-gray-400">
          {item.origin}
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
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

        <ButtonOutline
          loading={loading[item.nanoid]}
          type="button"
          color="blue"
          onClick={() => handleCopyToClipboard(item.nanoid)}
        >
          <IconBrowser />
        </ButtonOutline>
      </div>
    </div>
  );
};
