import { FC, useEffect, useState, forwardRef, memo } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, useFormikContext } from "formik";

import {
  IRangeDatePickerProps,
  ICustomInputProps,
} from "@/components/DatePicker/types";
import FormErrorMessage from "@/components/FormErrorMessage/FormErrorMessage";
import SvgIcon from "@/components/SvgIcons/SvgIcon";

const DatePicker: FC<IRangeDatePickerProps> = ({
  className,
  name,
  defaultStartDate,
  defaultEndDate,
  onChange,
  dateFormat,
  disabledLogo,
  ...rest
}) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    defaultStartDate ? new Date(defaultStartDate) : null,
    defaultEndDate ? new Date(defaultEndDate) : null,
  ]);

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    setDateRange([
      defaultStartDate ? new Date(defaultStartDate) : null,
      defaultEndDate ? new Date(defaultEndDate) : null,
    ]);
  }, [defaultStartDate, defaultEndDate]);

  const { setFieldValue } = useFormikContext();

  const onChangeHandler = (date: any) => {
    setDateRange(date);
    date = date === null ? "" : date;

    if (onChange instanceof Function) {
      onChange(date);
    } else if (setFieldValue instanceof Function) {
      setFieldValue(name, date);
    }
  };

  return (
    <>
      <div className="relative mb-2">
        <ReactDatePicker
          dateFormat={dateFormat ? dateFormat : "MM _ dd _ yyyy"}
          wrapperClassName="w-full"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={onChangeHandler}
          className={`w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark hover:border-gray-light dark:hover:border-gray-dark focus:border-gray-light dark:focus:border-gray-dark focus:ring-0 px-2 py-2 rounded-md ${className}`}
          customInput={<CustomInput disabledLogo={disabledLogo} />}
          placeholderText="Select Date Range"
          {...rest}
        />
      </div>
      {name && <ErrorMessage name={name} component={FormErrorMessage} />}
    </>
  );
};

export default memo(DatePicker);

const CustomInput = forwardRef<HTMLButtonElement, ICustomInputProps>(
  ({ value, onClick, disabledLogo }, ref) => (
    <button
      type="button"
      className={`w-full h-10 pl-10 bg-body-light dark:bg-body-dark border text-left border-gray-light dark:border-gray-dark hover:border-gray-light dark:hover:border-gray-dark focus:border-gray-light dark:focus:border-gray-dark focus:ring-0 px-2 py-2 rounded-none ${"className"}`}
      onClick={onClick}
      ref={ref}
    >
      {value?.replaceAll("-", " to ").replaceAll("_", "-")}
      {!disabledLogo && (
        <div className="absolute h-10 mt-0 left-0 top-0 flex items-center z-10">
          <SvgIcon
            name="SearchIcon"
            className="h-4 pl-4 fill-quaternary-dark dark:fill-quaternary-light"
          />
        </div>
      )}
    </button>
  )
);

// Add display name
CustomInput.displayName = "CustomInput";
