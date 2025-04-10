import Button from "@/components/Button/Button";
import Collapsible from "@/components/Collapsible/Collapsible";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import Link from "next/link";
import React from "react";

/**
 * Props for the TableActionPanel component
 * @typedef {Object} TableActionPanelProps
 * @property {Object} [edit] - Edit action configuration
 * @property {boolean} edit.show - Whether to show the edit action
 * @property {string} [edit.url] - URL for edit link navigation
 * @property {() => void} [edit.onClick] - Click handler for edit button
 * @property {Object} [clone] - Clone action configuration
 * @property {boolean} clone.show - Whether to show the clone action
 * @property {() => void} clone.onClick - Click handler for clone button
 * @property {Object} [viewHistory] - View history action configuration
 * @property {boolean} viewHistory.show - Whether to show the view history action
 * @property {() => void} viewHistory.onClick - Click handler for view history button
 * @property {Object} [remove] - Remove action configuration
 * @property {boolean} remove.show - Whether to show the remove action
 * @property {() => void} remove.onClick - Click handler for remove button
 * @property {Object} [status] - Status action configuration
 * @property {boolean} status.show - Whether to show the status action
 * @property {('active'|'inactive'|'pending'|'rejected'|'approved'|'draft')} status.status - Current status
 * @property {() => void} status.onClick - Click handler for status button
 * @property {React.ReactNode} [extraAction] - Additional action elements to render
 */

type TConditionalInterface =
  | { url: string; onClick?: undefined; show: boolean }
  | { url?: undefined; onClick: () => void; show: boolean };
interface TableActionPanelProps {
  edit?: TConditionalInterface;
  clone?: {
    show: boolean;
    onClick: () => void;
  };
  viewHistory?: {
    show: boolean;
    onClick: () => void;
  };
  remove?: {
    show: boolean;
    onClick: () => void;
  };
  status?: {
    show: boolean;
    status:
      | "active"
      | "inactive"
      | "pending"
      | "rejected"
      | "approved"
      | "draft";
    onClick: () => void;
  };
  extraAction?: React.ReactNode;
  collapsible?: boolean;
}

const TableActionPanel: React.FC<TableActionPanelProps> = ({
  edit,
  clone,
  viewHistory,
  remove,
  status,
  extraAction,
  collapsible = true,
}) => {
  return (
    <div className="flex gap-2 items-center">
      {edit?.show ? (
        edit.url ? (
          <Link href={edit.url!}>
            <label className="sr-only">Edit</label>
            <SvgIcon name="Edit" />
          </Link>
        ) : (
          <Button
            variant="default"
            size="sm"
            type="button"
            onClick={edit.onClick}
            icon={<SvgIcon name="Edit" />}
          />
        )
      ) : null}

      {collapsible && (
        <Collapsible
          trigger={<SvgIcon name="EllipsisVertical" />}
          contentClassName="z-10 absolute top-10 right-0"
        >
          <div className="z-10 flex flex-col bg-body-light dark:bg-dark-body-bg border border-gray-light dark:border-gray-dark  rounded-none p-0 w-36 text-left overflow-hidden relative">
            {/* Status Change Button */}
            {status?.show && (
              <Button
                variant="default"
                size="sm"
                type="button"
                onClick={status.onClick}
                className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
                icon={<SvgIcon name="EyeClosed" width={24} height={24} />}
              >
                {status.status === "active" ? "Inactive" : "Active"}
              </Button>
            )}

            {/* Clone Button - Optional */}
            {clone?.show && (
              <Button
                variant="default"
                size="sm"
                type="button"
                onClick={clone.onClick}
                icon={<SvgIcon name="CopyIcon" width={24} height={24} />}
                className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
              >
                Clone
              </Button>
            )}

            {/* View History Button */}
            {viewHistory?.show && (
              <Button
                variant="default"
                size="sm"
                type="button"
                onClick={viewHistory.onClick}
                icon={<SvgIcon name="HistoryIcon" width={24} height={24} />}
                className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
              >
                View History
              </Button>
            )}

            {/* Remove Button */}
            {remove?.show && (
              <Button
                variant="default"
                size="sm"
                type="button"
                onClick={remove.onClick}
                icon={<SvgIcon name="Trash" width={24} height={24} />}
                className={`!px-3 !py-2 w-full hover:bg-gray-default dark:hover:bg-gray-dark hover:text-primary-light dark:hover:text-primary-dark border-b !border-gray-light dark:!border-gray-dark last:border-b-0`}
              >
                Delete
              </Button>
            )}
            {extraAction}
          </div>
        </Collapsible>
      )}
    </div>
  );
};

export default TableActionPanel;
