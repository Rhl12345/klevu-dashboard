import { ICheckboxProps } from "@/components/Checkbox/types";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { Label } from "@/components/Label/Label";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { twMerge } from "tailwind-merge";

const Checkbox = ({
  inputSize = "medium",
  label,
  wrapperClassName = "",
  labelClassName,
  checkboxClassName,
  asterisk = false,
  id,
  error,
  errorMessage,
  ...props
}: ICheckboxProps) => {
  // Size styles for the checkbox
  const sizeStyles = {
    small: "w-4 h-4",

    medium: "w-5 h-5",
    large: "w-6 h-6",
  }[inputSize];

  // Base styles for the checkbox input
  const baseStyles =
    "peer cursor-pointer transition-all appearance-none rounded-none border border-gray-light dark:border-gray-dark checked:bg-primary-light checked:dark:bg-gray-dark checked:border-primary-light";

  return (
    <div
      className={twMerge(
        "flex items-center gap-x-2 relative",
        wrapperClassName
      )}
    >
      <div className="flex items-start relative">
        <input
          type="checkbox"
          {...(id && {
            id: id,
            "data-testid": id,
            "aria-describedby": `${id}-description`,
          })}
          className={twMerge(baseStyles, sizeStyles, checkboxClassName)}
          {...props}
        />
        <div className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <>
            <SvgIcon
              name="SuccessCheckmark"
              width={14}
              height={14}
              className={
                inputSize === "small"
                  ? "size-4"
                  : inputSize === "medium"
                    ? "size-5"
                    : "size-6"
              }
            />
          </>
        </div>
      </div>
      {label && (
        <Label
          {...(id && {
            htmlFor: id,
          })}
          className={twMerge(
            // Done: As Discussed with Krunal on 12-02-2025
            "text-base",
            labelClassName
          )}
        >
          {label}
          {asterisk && <span className="text-danger">*</span>}
        </Label>
      )}
      {error && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </div>
  );
};

export default Checkbox;
