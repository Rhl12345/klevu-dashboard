// Status Component Props interface
export interface StatusProps {
  type: string;
  className?: string;
  [props: string]: any; // Allowing other props
}

export interface IMoreFilterOption {
  columnName: string;
  name: string;
  type: string;
  options: any;
  conditionalSearch?: boolean;
}

export interface IDropdownOption {
  value: string;
  label: string;
  isMulti?: boolean;
}
export type TSortDirection = -1 | 0 | 1;

export type TTheme = "light" | "dark";

export interface IDropdownPositionOptions {
  label: string;
  value: string;
}

export interface ICheckBoxAction {
  selectedFlatRows: any[];
  attributeClone?: {
    show: boolean;
    onClick: () => void;
  };
  cloneMultiple?: {
    show: boolean;
    onClick: () => void;
  };
  productDiscontinue?: {
    show: boolean;
    onClick: () => void;
  };
}
