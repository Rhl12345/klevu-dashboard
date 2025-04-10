import { SketchPickerProps } from "react-color";

type ColorPickerPropWithInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> &
  SketchPickerProps;

interface IColorPickerProps extends ColorPickerPropWithInput {
  displayError?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  inputClassName?: string;
  label?: string;
  errorMessageClassName?: string;
  defaultColor?: string;
  transformCss?: string;
  isFormik?: boolean;
  sideLabel?: boolean;
  onChange?: SketchPickerProps["onChange"];
  isDisabled?: boolean;
}

export type { IColorPickerProps, SketchPickerProps };
