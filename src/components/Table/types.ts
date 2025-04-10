import {
  CellContext,
  ColumnFiltersState,
  HeaderContext,
} from "@tanstack/react-table";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

// Interface for defining a single table column
export interface ITableColumn<T = undefined> {
  id: string; // Unique identifier for the column
  accessorKey: string; // Key to access data in the row
  header?: ((props: HeaderContext<T, any>) => ReactNode) | string; // Custom header component or string
  // header?: any; // Custom header component or string
  cell?: (props: CellContext<T, any>) => ReactNode; // Custom cell component or string
  enableSorting?: boolean; // Indicates if sorting is enabled for the column
  filterFn?: any; // Custom filter function for the column
}

// Interface for React Table properties
export interface IReactTableProps {
  COLUMNS: ITableColumn<any>[]; // Array of column definitions
  DATA: any[]; // Array of data rows to be displayed in the table
  checkboxSelection?: boolean; // Determines if row selection checkboxes are enabled
  hasNextPage?: boolean; // Indicates if a next page exists for pagination
  hasPreviousPage?: boolean; // Indicates if a previous page exists for pagination
  pageIndex?: number; // Current page index (1-based)
  pageSize?: number; // Number of rows displayed per page
  totalCount?: number; // Total number of rows available across all pages
  showPagination?: boolean; // Indicates if pagination is enabled
  totalPages?: number; // Total number of pages available
  globalFilter?: string; // Global search filter value
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>; // Function to update the global search filter
  filteringOptions?: any[];
  setColumnFilteringOptions?: React.Dispatch<React.SetStateAction<any[]>>;
  fetchData?: Function; // Function to fetch data for the table
  setTablePageSize?: (size: number) => void; // Function to set the number of rows per page
  moreFilterOption?: any[]; // Array of filtering options for the table
  columnFilters?: ColumnFiltersState; // Current column filters state
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>; // Function to update column filters
  showEditColumns?: boolean; // Determines if the column editing functionality is enabled
  showMoreFilters?: boolean; // Determines if more filtering options are displayed
  showFilterDirection?: "left" | "right"; // Determines the direction of the filter options
  showFilter?: boolean; // Determines if filtering options are displayed
  sortingOptions?: ISortingOption[]; // Current sorting state for the table
  setSortingOptionHandler?: (column: string, direction: number) => void; // Function to update sorting state
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>; // Function to update selected rows
  selectedRows?: any[]; // Array of currently selected rows
  footer?: boolean; // Determines if the table footer is displayed
  noData?: string; // Custom component or message to display when no data is available
  displaySearch?: "left" | "center" | "right" | boolean; // Position of the search bar in the table
  hasPageSize?: boolean; // Determines if changing the page size is allowed
  containerClassName?: string; // Additional CSS classes for the table container
  tableClassName?: string; // Additional CSS classes for the table element
  tableBodyClassName?: string; // Additional CSS classes for the table body
  headerRowClassName?: string; // Additional CSS classes for header rows
  headerContentClassname?: string; // Additional CSS classes for header content
  headerCellClassName?: string; // Additional CSS classes for header cells
  bodyRowClassName?: string | ((row: any) => string); // Additional CSS classes for body rows
  bodyCellClassName?: string; // Additional CSS classes for body cells
  searchFilterContainerClassName?: string; // Additional CSS classes for the search and filter container
  filterContainerClassName?: string; // Additional CSS classes for the filters containerz
  renderSubComponent?: ({ row }: { row: any }) => React.ReactNode | null;
  shouldRenderSubComponent?: (row: any) => boolean;
  getRowCanExpand?: (row: any) => boolean; // Function to determine if a row can be expanded
  showExportCSV?: boolean; // Determines if the export CSV button is displayed
  onExportCSV?: () => void; // Function to handle export CSV
  onGotoPage?: boolean;
  loading?: boolean;
  calculateFooter?: boolean;
  footerData?: TFooterData; // Updated type for footer data
  isListPage?: boolean;
  usedInsideModal?: boolean;
  useCheckboxSelectionInSubRowOnly?: boolean;
  useCheckboxSelectionInRowOnly?: {
    show: boolean;
    showStatusList: string[];
  };
  checkBoxAction?: () => ReactNode;
}

// Interface for Pagination properties
export interface IPaginationProps {
  totalCount?: number; // Total number of rows
  pageIndex?: number; // Current page index
  totalPages?: number; // Total number of pages
  pageSize?: number; // Number of rows per page
  setTablePageSize?: (value: number) => void; // Function to set the number of rows per page
  hasPreviousPage?: boolean; // Indicates if there is a previous page
  hasNextPage?: boolean; // Indicates if there is a next page
  fetchData?: Function; // Function to fetch data for a specific page
  hasPageSize?: boolean; // Whether to allow changing the page size
  onGotoPage?: boolean;
}

// Interface for Sorting Option properties
export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}

// Interface for Dropdown properties
export interface IDropdownProps {
  options: IOption[]; // Array of dropdown options
  onChangeHandler: (value: number) => void; // Function to handle selection changes
  value: number; // Currently selected value
}

// Interface for a single dropdown option
export interface IOption {
  id: number; // Unique identifier for the option
  period: string; // Label for the option
  value: number; // Value for the option
}

// Interface for Table Search properties
export interface ITableSearchProps {
  globalFilter?: string;
  setGlobalFilter?: (value: React.SetStateAction<string>) => void;
  fetchData?: Function;
  pageSize?: number;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setColumnFilteringOptions?: React.Dispatch<
    React.SetStateAction<IFilteringOption[]>
  >;
}

// Interface for a table column with visibility control
export interface IColumn extends ITableColumn {
  isVisible?: boolean; // Whether the column is visible
  disableShowHide?: boolean; // Whether to disable show/hide toggle for the column
  getToggleHiddenProps?: () => void; // Function to get properties for toggling visibility
}

// Interface for editing table columns
export interface IEditColumnProps {
  allColumns: IColumn[]; // Array of all columns
  columns: IColumn[]; // Array of currently visible columns
  changeColumnFormat: (newColumnsOrder: IColumn[]) => void; // Function to update column order
  saveFilterOptionsHandler: () => void; // Function to save filter options
  setHiddenColumns?: (columns: string[]) => void; // Function to set hidden columns
}

// Interface for a single filter option
export interface IFilterOption {
  id: string;
  label: string;
  type: "select" | "date";
  value: any[] | null;
  isRadio?: boolean;
  conditionalSearch?: boolean;
}

// Interface for Filter Dropdown properties
export interface IFilterDropdownProps {
  filterOption: IFilterOption; // Filter option details
  selectedFilters: Record<any, any>; // Current selected filter values
  handleCheckboxChange: (filterId: string, option: string) => void; // Function to handle checkbox selection
  handleInputChange: (filterId: string, newValue: any) => void; // Function to handle input changes
  dateRange: [Date | null, Date | null]; // Current date range for date filters
  setDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >; // Function to update the date range
  resetFilters: (filterId?: string) => void;
}

export interface IFilteringOption {
  field: string;
  operator: number;
  value: string;
  type: "moreFilter" | "search";
}

export interface IDropdownCustomFilterProps {
  name: string;
  type: string;
  [key: string]: any; // Allow any other props
}

export interface ICheckboxGroupProps {
  label?: string;
  name: string;
  options?: IDropdownOption[];
  align?: "vertical" | "horizontal";
  [key: string]: any;
}

export interface IDropdownOption {
  value: string | number;
  label: string;
}

export interface IDatePickerMoreFilterProps {
  name: string;
  mainFilter?: any[];
  setMainFilter?: Dispatch<SetStateAction<any[]>>;
  columnName?: string;
  conditionalSearch?: boolean;
  setmainColumnFilter?: Dispatch<SetStateAction<any>>;
  openDropdown: boolean;
  applyMoreFilter?: (columnName: string) => void;
  setShow?: Dispatch<SetStateAction<any>>;
  [key: string]: any;
}

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
}

export interface IMoreFilterProps {
  filteringOptions?: IFilteringOption[] | null;
  setColumnFilteringOptions?: (options: any) => void;
  moreFilterOption?: any[];
}

export type TFooterData = {
  [key: string]: string | number | React.ReactNode;
};

export interface IDraggableReactTableProps extends IReactTableProps {
  setData: Dispatch<SetStateAction<any>>;
}
