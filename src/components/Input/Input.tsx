import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { IInputComponentType } from "@/components/Input/types";
import { Label } from "@/components/Label/Label";
import { ErrorMessage, Field } from "formik";
import { twMerge } from "tailwind-merge";
import { useState, ChangeEvent } from "react";

const Input = ({
  className = "",
  wrapperClassName = "",
  name = "",
  defaultValue = "",
  displayError = true,
  disabled,

  label,
  labelClassName = "",
  error,
  errorMessage,
  asterisk = false,
  formik = true,
  autoSuggestion = false,
  suggestions = [],
  onChange,
  value,
  ...res
}: IInputComponentType) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setInputValue(value);

    // Only show suggestions if there's input value
    if (value.trim()) {
      setShowSuggestions(true);
      // Filter suggestions based on input
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      // Hide suggestions if input is empty
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }

    // Call the original onChange if provided
    onChange?.(e);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // setInputValue(suggestion);

    setShowSuggestions(false);

    // Simulate an input change event
    const simulatedEvent = {
      target: { value: suggestion, name },
    } as ChangeEvent<HTMLInputElement>;
    onChange?.(simulatedEvent);
  };

  const inputProps: any = {
    type: res.type || "text",
    name,
    maxLength: res.maxLength || 255,
    ...res,
    className: defaultInputClasses,
    autoComplete: res.autoComplete || "new-password",
    disabled,
    ...(defaultValue && {
      defaultValue: defaultValue,
    }),
    ...(value && {
      value: value,
    }),
    ...(onChange && {
      onChange: handleInputChange,
    }),
  };

  return (
    <div className={twMerge("flex flex-col gap-2 relative", wrapperClassName)}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
          {asterisk && <span className="text-danger pl-1">*</span>}
        </Label>
      )}

      {formik ? <Field {...inputProps} id={name} /> : <input {...inputProps} />}
      {!defaultValue && displayError === true && formik ? (
        <ErrorMessage name={name} component={FormErrorMessage} />
      ) : errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
      {autoSuggestion && showSuggestions && (
        <ul className="absolute top-[77px] left-0 z-10 w-full mt-1 border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark max-h-60 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-3 py-2 cursor-pointer text-gray-500 italic bg-body-light dark:bg-body-dark"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500 italic bg-body-light dark:bg-body-dark">
              No Match Found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Input;
