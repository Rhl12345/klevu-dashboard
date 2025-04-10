import Link from "next/link";
import { useCallback } from "react";

import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ToolTip from "@/components/Tooltip/Tooltip";

import { ICreatePageHeaderProps } from "@/components/CreateAndListPageHeader/types";

/**
 * CreatePageHeader - A reusable header component for create/edit pages
 * @component
 * @param {Object} props
 * @param {string} props.module - The title/module name to display
 * @param {string} [props.navigateUrl] - The navigateUrl for the cancel button link
 * @param {string} [props.saveButtonName="Save"] - Text for the save button
 * @param {string} [props.cancelButtonName="Cancel"] - Text for the cancel button
 * @param {Function} [props.validateForm] - Form validation function
 * @param {string} [props.toolTipMessage] - Tooltip message to display
 * @param {"button" | "submit" | "reset"} [props.buttonType="button"] - Type of the save button
 * @param {Function} [props.onSubmit] - Function to call when form is submitted
 * @property {ReactNode} [children] - Optional child elements to render
 */

const CreatePageHeader: React.FC<ICreatePageHeaderProps> = ({
  module,
  navigateUrl = "",
  saveButtonName = "Save",
  cancelButtonName = "Cancel",
  validateForm,
  toolTipMessage,
  buttonType = "button",
  borderShow = true,
  children,
  onSubmit,
  showBackButton = true,
  showCancelButton = true,
}) => {
  const handleValidation = useCallback(async () => {
    try {
      if (validateForm instanceof Function) {
        await validateForm();
      }
      if (onSubmit instanceof Function) {
        await onSubmit();
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  }, [validateForm, onSubmit]);

  return (
    <>
      <div
        className={`flex flex-wrap gap-4 items-center justify-between lg:px-8 px-4 lg:py-8 py-4 ${borderShow ? "border-b border-gray-light dark:border-gray-dark" : ""}`}
        role="banner"
      >
        <div className="flex items-center xl:text-md text-lg text-primary-light dark:text-primary-dark font-semibold gap-2 !leading-10">
          {showBackButton && (
            <Link
              href={navigateUrl}
              className="btn btn-md btn-outline-secondary dark:btn-outline-dark-secondary !px-2.5 !py-2 max-lg:p-1 !border-gray-light dark:!border-gray-dark"
            >
              <Label className="sr-only">Back</Label>
              <SvgIcon name="arrow-left" width={16} height={16} />
            </Link>
          )}
          <h1 className="max-lg:text-md">
            {module}
            {toolTipMessage && (
              <ToolTip
                id={`${module}-tooltip`}
                className="uppercase tracking-wide font-bold"
              >
                {toolTipMessage}
              </ToolTip>
            )}
          </h1>
        </div>
        <div className={"flex gap-2 max-lg:justify-end max-md:w-full lg:!leading-10"}>
          {navigateUrl && showCancelButton && (
            <Link
              className={
                "btn btn-outline-secondary dark:btn-outline-dark-secondary btn-sm"
              }
              href={navigateUrl}
              aria-label={cancelButtonName}
            >
              {cancelButtonName}
            </Link>
          )}
          {children}

          {validateForm || onSubmit ? (
            <Button
              type={buttonType}
              onMouseDown={handleValidation}
              variant="primary"
              aria-label={saveButtonName}
            >
              {saveButtonName}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CreatePageHeader;
