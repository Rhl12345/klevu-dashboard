// Type for default input properties
type iRadioHTMLProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

// Enhanced RadioGroup Props with additional customizations
export type iRadioGroupProps = iRadioHTMLProps & {
  label?: string; // Label for the radio button
  description?: string; // Description for the radio button
  wrapperClassName?: string; // Custom className for outer wrapper div
  labelDescriptionWrapperClassName?: string; // Custom className for label and description wrapper
  labelClassName?: string; // Custom className for label
  descriptionClassName?: string; // Custom className for description
  radioClassName?: string; // Custom className for the radio input
};
