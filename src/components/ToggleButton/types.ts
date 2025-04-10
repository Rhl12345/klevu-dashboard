export interface iToggleButtonProps {
  /** Size of the toggle button */
  size?: "medium" | "small";
  /** Initial value of the toggle */
  defaultValue?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Name attribute for the input element */
  name?: string;
  /** ID attribute for the input element */
  id?: string;
  /** Callback function when toggle state changes */
  onChange?: (value: boolean) => void;
  /** Text to display when toggle is on */
  on?: string;
  /** Text to display when toggle is off */
  off?: string;
  /** Label text for the toggle button */
  label?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
  /** Whether to display an asterisk */
  asterisk?: boolean;

  isInline?: boolean;

  wrapperClassName?: string;
}
