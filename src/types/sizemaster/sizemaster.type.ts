import { FormikProps } from "formik";

// Define the type for size master entries
export interface ISizeMasterEntry {
  size: string[];
  createdName: string;
  modifiedName: string;
  id: number;
  productType: string;
  displayOrder: number;
  recStatus: "A" | "I"; // Seems to be either Active or Inactive
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface ISizeEntry {
  sizeName: string;
  displayOrder: string;
  status: "A" | "I";
}

export interface IFormValues {
  productType: string;
  displayOrder: string;
  status: string;
  sizes: ISizeEntry[];
}

export interface ISizeModalValues {
  sizeName: string;
  displayOrder: number;
  status: "A" | "I";
}

export interface ISizeMasterFormValues {
  productType: string;
  displayOrder: string;
  status: string;
  sizes: ISizeModalValues[];
}

export interface ISizeMasterPayload {
  pageIndex: number;
  pageSize: number;
  sortingOptions: any;
  filteringOptions?: any[];
}

export interface IAddSizeModalProps {
  editSize: ISizeModalValues | null;
  isOpen: boolean;
  onClose: () => void;
}
export interface IProductSizeFormProps {
  formik: FormikProps<ISizeMasterFormValues>;
  statusOptions: { value: string; label: string }[];
}

export interface ISizeTableProps {
  sizes: ISizeModalValues[];
  onEdit: (size: ISizeModalValues) => void;
  onRemove: (index: number) => void;
}
