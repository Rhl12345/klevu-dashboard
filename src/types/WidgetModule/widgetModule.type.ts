/** Used for basic select components with string values only */
export interface ISelectOption {
  label: string;
  value: string;
}

/** Used for enhanced dropdown components that support both string and numeric values */
export interface IDropdownOption {
  label: string;
  value: string | number;
}

/** Props for the widget module modal component */
export interface IWidgetModuleModalProps {
  isOpen: IModalState;
  onClose: () => void;
  selectedWidgetModule: IWidgetModule | null;
  selectedWidget: string;
  selectedModules: string[];
  handleWidgetChange: (value: string) => void;
  handleModulesChange: (values: string[]) => void;
  moduleOptions: ISelectOption[];
}

/** Represents a widget module configuration */
export interface IWidgetModule {
  id: string | number;
  name: string;
  moduleName: string | string[];
  moduleList: string[];
  rowVersion: string;
  recStatus: IRecordStatus;
  widget?: string;
  modules?: string[];
}

/** Modal state configuration */
export interface IModalState {
  isOpen: boolean;
  type: "delete" | "view" | "viewEdit" | null;
}

/** Record status types */
export type IRecordStatus = "Active" | "Inactive";

export type IFormValues = {
  widget: string;
  modules: string[];
};

export interface IPaginationData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
