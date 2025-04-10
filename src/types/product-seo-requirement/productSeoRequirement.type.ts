import { TSortDirection } from "@/types/Common/common.type";
import { FormikErrors, FormikTouched } from "formik";

export interface IProductSeoRequirementReadinessDetail {
  id: number;
  name: string | null;
  fieldPercentage: number;
  rowVersion: string;
  recStatus: string;
}

export interface IProductSeoRequirement {
  id: number;
  name: string;
  storeName: string;
  percentage: number;
  readinessDetail: IProductSeoRequirementReadinessDetail[];
  createdName: string;
  modifiedName: string;
  storeid: number;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface IProductSeoRequirementList {
  items: IProductSeoRequirement[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IProductSeoRequirementFilter {
  pageIndex?: number;
  pageSize?: number;
  sortingOptions?: Array<{
    field: string;
    direction: number;
    priority: number;
  }>;
  filteringOptions?: Array<any>;
}

export interface ISortOption {
  field: string;
  direction: TSortDirection;
  priority: number;
}

export interface IProductSeoRequirementFormValues
  extends Pick<IProductSeoRequirement, "name" | "storeName" | "id"> {
  percentage: string;
  readinessStatus: string;
}

export interface IFieldData {
  id: string;
  fieldName: string;
  percentage: string;
  fieldId: number;
}

export interface IFieldPercentagesFormProps {
  maxPercentage: number;
  readinessDetail: IProductSeoRequirementReadinessDetail[];
}

export interface IRequirementFormProps {
  values: Omit<IProductSeoRequirementFormValues, "id">;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<
    Omit<IProductSeoRequirementFormValues, "id">
  >>;
  touched: FormikTouched<Omit<IProductSeoRequirementFormValues, "id">>;
  errors: FormikErrors<Omit<IProductSeoRequirementFormValues, "id">>;
  readinessDetail: IProductSeoRequirementReadinessDetail[];
  id?: string;
}

export interface IRequirementListActionModalsProps {
  isOpen: boolean;
  type: string | null;
  requirement: IProductSeoRequirement | null;
  handleModalClose: () => void;
  handleDelete: () => Promise<void>;
  handleStatusChange: () => Promise<void>;
  isProductRequirement: boolean;
}

export interface IModelState {
  isOpen: boolean;
  type: string | null;
  requirement: IProductSeoRequirement | null;
}
