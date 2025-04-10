import Link from "next/link";

import { IListPageHeaderProps } from "@/components/CreateAndListPageHeader/types";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { FC } from "react";

/**
 * Props for the ListPageHeader component
 * @interface IListPageHeaderProps
 * @property {string} moduleName - The name of the module to display in the title
 * @property {ReactNode} [children] - Optional child elements to render
 * @property {string} name - The name to use for the "Add New" button
 * @property {string} [navigateUrl] - Optional URL for the "Add New" button
 * @property {string} [className] - Optional additional CSS classes
 * @property {boolean} [showBackButton] - Optional additional CSS classes
 */

const ListPageHeader: FC<IListPageHeaderProps> = ({
  moduleName,
  children,
  name,
  navigateUrl,
  className,
  showBackButton = false,
  usedInsideSection = false,
}) => {
  const titleId = `${name?.toLowerCase()}-list-title`;

  return (
    <>
      <div
        className={`w-full flex lg:flex-row flex-col items-center sm:justify-between justify-end gap-4 xl:px-8 px-4 !leading-10  ${className ?? ""} ${usedInsideSection ? "py-0" : "lg:pt-8 pt-4"}`}
      >
        <div className="flex max-lg:w-full items-center xl:text-md text-lg text-primary-light dark:text-primary-dark font-semibold gap-2">
          {showBackButton && navigateUrl && (
            <Link
              href={navigateUrl}
              className="btn btn-md btn-outline-secondary dark:btn-outline-dark-secondary"
            >
              <Label className="sr-only">Back</Label>
              <SvgIcon name="arrow-left" width={16} height={16} />
            </Link>
          )}
          <h1 id={titleId}>{moduleName}</h1>
        </div>

        <div
          className="flex max-lg:flex-wrap max-lg:w-full justify-end gap-2 lg:!leading-10"
          role="toolbar"
          aria-labelledby={titleId}
        >
          {children}
          {name && navigateUrl && (
            <Link
              href={navigateUrl}
              className="btn btn-sm btn-primary dark:btn-dark-primary flex items-center"
              aria-label={`Add new ${name.toLowerCase()}`}
            >
              {name}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ListPageHeader;
