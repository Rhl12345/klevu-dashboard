// Type for default input properties
interface ICheckboxHTMLProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

// Enhanced Checkbox Props with additional customizations
export interface ICheckboxProps extends ICheckboxHTMLProps {
  inputSize?: "small" | "medium" | "large"; // Checkbox size variants
  wrapperClassName?: string; // Custom className for outer wrapper div
  checkboxClassName?: string; // Custom className for checkbox input
  id: string; // Unique identifier for the checkbox
  label?: string; // Label text
  labelClassName?: string; // Custom className for label
  asterisk?: boolean; // Whether to show an asterisk
  error?: boolean;
  errorMessage?: string;
}
