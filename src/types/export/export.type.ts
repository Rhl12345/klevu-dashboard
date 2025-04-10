import { ITableColumn } from "@/components/Table/types";
import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";
import { FormikHelpers, FormikValues } from "formik";
import { ObjectSchema } from "yup";
import { IDropdownOption } from "@/types/discount-table/discountTable.type";

interface IHistoryItem {
  id: number;
  logId: string;
  status: string;
  message: string;
  page: string;
  importType: string;
  createdBy: string;
  filePath: string | null;
  start: string;
  end: string;
  browser: string;
  location: string | null;
  ipAddress: string;
  macAddress: string;
  recordsSubmitted: number;
  type: string;
  recordsProcessed: number;
}

interface IHistoryList {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IHistoryItem[];
}

interface IExportHistoryProps {
  columns?: ITableColumn<IHistoryItem>[];
  data?: IHistoryItem[];
}

interface IExportFormValues {
  brand: string[];
  vendor: string[];
  exportType: string;
  status: string;
}

interface ICoreProductFeedFormValues extends IExportFormValues {
  productDisContinue: string;
  optionProductStatus: string;
  optionProductDiscontinue: string;
  productSubType: string;
}

interface ICreateExportProps {
  type: PRODUCT_FEEDS | STORE_TYPES;
  initialValues: ICoreProductFeedFormValues;
  validationSchema: ObjectSchema<FormikValues>;
  onSubmit: (
    values: ICoreProductFeedFormValues,
    formikHelpers: FormikHelpers<ICoreProductFeedFormValues>
  ) => void | Promise<any>;
  checkBoxFields?: Record<string, string[]>;
  exportTypeOptions: IDropdownOption[];
  brandOptions: IDropdownOption[];
  vendorOptions: IDropdownOption[];
  statusOptions: IDropdownOption[];
}

interface ICreateImportProps {
  type: PRODUCT_FEEDS | STORE_TYPES;
  initialValues: IProductFeedImportFormValues;
  validationSchema?: ObjectSchema<FormikValues>;
  onSubmit: (values: IProductFeedImportFormValues) => void | Promise<any>;
  brandOptions: IDropdownOption[];
  vendorOptions: IDropdownOption[];
  statusOptions: IDropdownOption[];
  exportTypeOptions: IDropdownOption[];
}

interface IProductFeedImportFormValues {
  exportType: string;
  file: File | undefined;
  productImage: File | undefined;
  brand: string[];
  vendor: string[];
  status: string;
}

type TProductFeedImport = Pick<
  IProductFeedImportFormValues,
  "exportType" | "file" | "productImage"
>;

export type {
  IHistoryItem,
  IHistoryList,
  IExportHistoryProps,
  IExportFormValues,
  ICreateExportProps,
  ICoreProductFeedFormValues,
  ICreateImportProps,
  IProductFeedImportFormValues,
  TProductFeedImport,
};
