import { IFieldConfig } from "@/constants/product-database/fields.constant";

export enum PRODUCT_FEEDS {
  PRODUCT_FEED = "product-feed",
  CORE_PRODUCT_FEED = "core-product-feed",
}

export enum STORE_TYPES {
  ECOMMERCE = "ecommerce-store",
  CORPORATE = "corporate-store",
  STORE_BUILDER = "store-builder",
  FORM_BUILDER = "form-builder",
}

export interface IStoreDetail {
  id: string;
  storeName: string;
  displayName: string;
  brandId: number;
  storeType: STORE_TYPES;
  url: string;
  categoryId: string;
}

export interface IStoreBuilderStoreDetails extends IStoreDetail {
  storeBuilderId: string;
  storeBuilderName: string;
}

export interface IFormBuilderStoreDetails extends IStoreDetail {
  formBuilderId: string;
  formBuilderName: string;
}

export interface IDynamicFieldProps {
  fieldConfig: IFieldConfig;
  handleStatusDropdownChange?: (value: string) => void;
}

export type TDynamicFields = Record<string, IFieldConfig>;

export type TCustomDropdownOptions = Record<
  string,
  { label: string; value: string }[]
>;

export interface ICommonFormTabProps {
  type: PRODUCT_FEEDS;
  initialData?: Record<string, any>;
  statusFormField?: TDynamicFields;
  onFormChange?: () => void;
  setIsFormValid?: (isValid: boolean) => void;
  setIsDirty?: (isDirty: boolean) => void;
}

export interface IStoreFormTabProps extends Omit<ICommonFormTabProps, "type"> {
  type: STORE_TYPES;
  storeName: string;
}

export interface ISKUSwap {
  initialData: Record<string, string>;
  productId: string;
  onFormChange?: () => void;
  setIsFormValid?: (isValid: boolean) => void;
  setIsDirty?: (isDirty: boolean) => void;
}
