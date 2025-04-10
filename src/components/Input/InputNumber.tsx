import { ErrorMessage } from "formik";

import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { IInputNumberComponentType } from "@/components/Input/types";
import { Label } from "@/components/Label/Label";
import { NumericFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";

const InputNumber = ({
  className,
  disabled = false,
  displayError = false,
  formik = true,
  errorMessage,
  asterisk = false,
  label,
  error,
  labelClassName,
  wrapperClassName,
  allowNegative = false,
  ...res
}: IInputNumberComponentType) => {
  const defaultInputClasses = twMerge(
    "block w-full",
    "bg-body-light dark:bg-body-dark",
    "placeholder-quaternary-dark-60 dark:placeholder-quaternary-light-60",
    "border border-gray-light dark:border-gray-dark",
    "hover:border-gray-light dark:hover:border-gray-dark",
    "text-base font-normal text-quaternary-dark dark:text-quaternary-light placeholder:text-quaternary-dark dark:placeholder:text-quaternary-light",
    "focus:ring-0 focus:shadow-none",
    "py-2 px-2",
    "rounded-none",
    "dropDownElem_unique",
    "focus:outline-none focus:ring-2 focus:shadow-none focus:outline-none focus:ring-gray-pointer dark:focus:ring-gray-pointer focus:border-gray-light dark:focus:border-gray-dark !rounded-none",
    disabled &&
      "opacity-90 border-gray-light dark:border-gray-dark cursor-not-allowed",
    error && "border-red-500 hover:border-red-500 focus:border-red-500",
    className
  );
  return (
    <div className={twMerge("flex flex-col gap-2", wrapperClassName)}>
      {label && (
        <Label htmlFor={res.name} className={labelClassName}>
          {label}
          {asterisk && <span className="text-danger">*</span>}
        </Label>
      )}
      <NumericFormat
        {...res}
        className={defaultInputClasses}
        disabled={disabled}
        allowNegative={allowNegative}
      />

      {displayError === true && formik ? (
        <ErrorMessage name={res.name || ""} component={FormErrorMessage} />
      ) : errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </div>
  );
};

export default InputNumber;
