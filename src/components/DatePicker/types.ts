import { MouseEventHandler } from "react";

export interface IRangeDatePickerProps {
  className?: string;
  name: string;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  onChange?: any;
  dateFormat?: string;
  disabledLogo?: boolean;
}

export interface ICustomInputProps {
  value?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabledLogo?: boolean;
  disabled?: boolean;
}

export interface IDatePickerProps {
  className?: string;
  name: string;
  defaultDate?: Date | null;
  onChange?: any;
  dateFormat?: string;
  disabledLogo?: boolean;
  disabled?: boolean;
  label?: string;
  errorMessage?: string;
  asterisk?: boolean;
  isFormik?: boolean;
  minDate?: Date;
  popperClassName?: string;
}
