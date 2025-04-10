import { ErrorMessage, useFormikContext } from "formik";
import { FC, forwardRef, memo, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  ICustomInputProps,
  IDatePickerProps,
} from "@/components/DatePicker/types";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import { Label } from "@/components/Label/Label";

const DatePicker: FC<IDatePickerProps> = ({
  className,
  name,
  defaultDate,
  onChange,
  dateFormat,
  disabledLogo,
  errorMessage,
  label = "",
  asterisk = false,
  isFormik = true,
  ...rest
}) => {
  const formik = useFormikContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    defaultDate ? new Date(defaultDate) : null
  );

  useEffect(() => {
    setSelectedDate(defaultDate ? new Date(defaultDate) : null);
  }, [defaultDate]);

  const onChangeHandler = (date: Date | null) => {
    setSelectedDate(date);
    const formattedDate = date === null ? "" : date;

    if (isFormik) {
      formik.setFieldValue(name, formattedDate);
    } else {
      onChange(formattedDate);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <Label
          htmlFor={name}
          className="inline-flex pr-2 text-quaternary-dark dark:text-quaternary-light align-middle font-semibold text-base"
        >
          {label}
          {asterisk && <span className="text-danger">*</span>}
        </Label>
      )}
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChangeHandler}
        dateFormat={dateFormat ? dateFormat : "MM-dd-yyyy"}
        wrapperClassName="w-full"
        className={`w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark hover:border-gray-light dark:hover:border-gray-dark focus:border-gray-light dark:focus:border-gray-dark focus:ring-0 px-2 py-2 rounded-none  ${className}`}
        customInput={<CustomInput disabledLogo={disabledLogo} />}
        {...rest}
      />
      {name && formik ? (
        <ErrorMessage name={name} component={FormErrorMessage} />
      ) : errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </div>
  );
};

export default memo(DatePicker);

const CustomInput = forwardRef<HTMLButtonElement, ICustomInputProps>(
  ({ value, onClick, disabledLogo, disabled }, ref) => (
    <button
      type="button"
      className={`${disabled ? "!cursor-not-allowed" : ""} w-full h-10 bg-body-light dark:bg-body-dark border text-left border-gray-light dark:border-gray-dark hover:border-gray-light dark:hover:border-gray-dark focus:border-gray-light dark:focus:border-gray-dark focus:ring-0 px-2 py-2 rounded-none text-quaternary-dark dark:text-quaternary-light ${"className"} text-base font-normal`}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
    >
      {value}
      {!disabledLogo && (
        <div className="absolute top-0 right-0 px-3 py-2">
          <svg
            className="h-6 w-6 text-gray-400 bg-body-light dark:bg-body-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  )
);

// Add display name
CustomInput.displayName = "CustomInput";
