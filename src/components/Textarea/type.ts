import { ChangeEvent, ReactNode } from "react";

export interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: "none" | "vertical" | "horizontal" | "both";
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  defaultValue?: string | number;
  label?: ReactNode;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  displayError?: boolean;
  disabled?: boolean;
  asterisk?: boolean;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  isFormikField?: boolean;
  [key: string]: any;
}
