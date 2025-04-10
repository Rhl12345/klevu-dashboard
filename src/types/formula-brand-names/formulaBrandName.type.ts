export interface IFormulaBrandName {
  id: number;
  name: string;
  storeName: string;
  splitName: string;
  brandReplace: string;
  replaceCharacter: string;
  createdDate: string | null;
  createdBy: string | null;
  modifiedDate: string | null;
  modifiedBy: string | null;
  recStatus: string;
}

export interface IFormulaBrandNamePaginatedResponse {
  /** Current page number (1-based) */
  pageIndex: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items across all pages */
  totalCount: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a previous page available */
  hasPreviousPage: boolean;
  /** Whether there is a next page available */
  hasNextPage: boolean;
  /** Array of vendor items for the current page */
  items: IFormulaBrandName[];
}

export interface IFormulaBrandNameForm {
  storeId: string;
  brandName: string;
  splitName: string;
  brandReplace: string;
  replaceCharacter: string;
  recStatus: string;
  isDefault: boolean;
}

export interface IDropdownOption {
  value: string;
  label: string;
}

export interface IFormulaBrandNameFormProps {
  id?: string;
  onSubmit: (values: IFormulaBrandNameForm) => Promise<void>;
  isLoading?: boolean;
}

export interface IEditFormulaBrandNameProps {
  id?: string;
}

export type TFormulaBrandNameStatus = "active" | "inactive";

export type TFormulaBrandNameModalType =
  | "delete"
  | "edit"
  | "status"
  | "viewHistory"
  | null;
