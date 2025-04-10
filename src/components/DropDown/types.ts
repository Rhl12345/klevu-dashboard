import { Key } from "react";
import {
  GroupBase,
  OptionProps,
  PropsValue,
  Props as ReactSelectProps,
} from "react-select";

interface IDropdownProps extends ReactSelectProps {
  asterisk?: boolean;
  errorMessage?: string;
  displayError?: boolean;
  defaultValue?: Key | Key[] | PropsValue<any>;
  filterButtonTitle?: string;
  label?: string;
  labelClassName?: string;
  setShowDropdown?: (val: boolean) => void;
  showDropdown?: boolean;
  error?: boolean;
  errorMessageClassName?: string;
  customFilterDropdown?: boolean;
  customSearchDropdown?: boolean;
  withCheckBox?: boolean;
  hideCheckbox?: boolean;
  options: Array<IOptions>;
  className?: string;
  wrapperClassName?: string;
  isFormikField?: boolean;
}

interface IOptions {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

type TOptionProps<T = unknown, K = false> = OptionProps<
  T,
  false,
  GroupBase<T>
> &
  (K extends true
    ? {
        withCheckBox: boolean;
        icon?: React.ReactNode;
        iconPosition?: "left" | "right";
      }
    : {});

export type { IDropdownProps, TOptionProps, IOptions };
