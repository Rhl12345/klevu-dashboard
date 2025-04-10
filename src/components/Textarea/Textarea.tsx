import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { Label } from "@/components/Label/Label";
import { ITextareaProps } from "@/components/Textarea/type";
import { ErrorMessage, Field } from "formik";
import { twMerge } from "tailwind-merge";

export const Textarea = ({
  name = "",
  value,
  placeholder,
  label,
  rows = 3,
  cols,
  disabled = false,
  required = false,
  resize = "vertical",
  className = "",
  wrapperClassName = "",
  labelClassName = "",
  asterisk = false,
  isFormikField = false,
  displayError = true,
  error,
  errorMessage,
  id,
  ...props
}: ITextareaProps) => {
  const resizeStyles = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  }[resize];

  const defaultInputClasses = twMerge(
    "block w-full",
    "bg-body-light dark:bg-body-dark",
    "border border-gray-light dark:border-gray-dark",
    "hover:border-gray-light dark:hover:border-gray-dark",
    "focus:ring-0 focus:shadow-none",
    "py-3 px-3",
    "rounded-none",
    "dropDownElem_unique",
    "text-quaternary-dark dark:text-quaternary-light",
    "placeholder-quaternary-dark dark:placeholder-quaternary-light",
    disabled &&
      "opacity-90 border-gray-light dark:border-gray-dark cursor-not-allowed",
    error && "border-red-500 hover:border-red-500 focus:border-red-500",
    resizeStyles,
    className
  );

  const textareaProps: ITextareaProps = {
    rows: rows,
    cols: cols,
    placeholder,
    value,
    id,
    name,
    maxLength: props?.maxLength || 255,
    ...props,
    className: defaultInputClasses,
    autoComplete: props?.autoComplete || "off",
    disabled,
  };

  return (
    <div className={twMerge("flex flex-col gap-2", wrapperClassName)}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
          {asterisk && <span className="text-rose-500">*</span>}
        </Label>
      )}
      {isFormikField ? (
        <Field {...textareaProps} as="textarea" />
      ) : (
        <textarea {...textareaProps} />
      )}
      {displayError && isFormikField ? (
        <ErrorMessage name={name} component={FormErrorMessage} />
      ) : errorMessage ? (
        <div className="text-danger"> {errorMessage} </div>
      ) : null}
    </div>
  );
};
