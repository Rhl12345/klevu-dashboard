import { ChangeEvent, CSSProperties, ReactNode } from "react";

export interface IBaseInputComponentType {
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  defaultValue?: string | number | boolean | readonly string[];
  label?: ReactNode;
  name?: string;
  displayError?: boolean;
  disabled?: boolean;
  asterisk?: boolean;
  placeholder?: string;
  error?: boolean;
  formik?: boolean;
  showTooltip?: boolean;
  tooltip?: ReactNode;
  [props: string]: any;
}

export interface IAutoSuggestionProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: any;
  autoSuggestion: true;
  suggestions?: string[];
}

export interface INormalProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  autoSuggestion?: false | undefined;
  suggestions?: string[];
}

export type IInputComponentType = IBaseInputComponentType &
  (IAutoSuggestionProps | INormalProps);

export interface IInputNumberComponentType {
  // type: "text" | "number" | "email" | "password";
  className?: string;
  defaultValue?: string | number;
  label?: string;
  value?: string | number;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  displayError?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  [props: string]: any; // Allowing other props
  formik?: boolean;
  errorMessage?: string;
  asterisk?: boolean;
  labelClassName?: string;
  allowNegative?: boolean;
}

export interface IOTPInputProps {
  length: number;
  name: string;
  onChangeOTP?: (otp: string) => any;
  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;
  value: string;
  setValue: (value: string) => any;
  style?: CSSProperties;
  className?: string;
  inputStyle?: CSSProperties;
  inputClassName?: string;
}

export interface ISingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}
