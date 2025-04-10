import { FormikProps } from "formik";

export interface IDiscountTable {
  id: string;
  quantityName: string;
  storeName: string;
  brandName: string;
  vendorName: string;
  createdDate: string;
  createdName: string;
  modifiedDate: string | null;
  modifiedName: string | null;
  recStatus: "A" | "I";
  default: boolean;
  isBundle: boolean;
  storeId: number;
  brandId: number;
  vendorId: number;
}

export interface IDiscountTableList {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  items: IDiscountTable[];
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IDiscountTableFormValues {
  id?: string;
  storeId: number;
  brandId: number;
  vendorId: number;
  quantityName: string;
  recStatus: "A" | "I";
  isBundle: boolean;
  default: boolean;
}

export interface IDropdownOption {
  label: string;
  value: number | string;
}

export interface IDiscountTableDetails {
  id: string;
  quantity: number;
  discount: number;
  recStatus: "A" | "I";
}

export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}

export interface IFilterOption {
  columnName: string;
  value: string | string[];
}

export interface FormikRenderProps
  extends FormikProps<IDiscountTableFormValues> {
  validateForm: () => Promise<Record<string, string>>;
}

export interface CloneFormValues {
  quantityName: string;
}

export interface CloneData {
  id: string | number;
  quantityName: string;
}

export interface CloneProps {
  openCloneModal: boolean;
  setOpenCloneModal: (value: boolean) => void;
  cloneData: CloneData;
  fetchListData: () => Promise<void>;
}
