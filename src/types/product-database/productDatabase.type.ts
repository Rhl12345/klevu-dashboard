import { ITabOption } from "@/components/Tab/types";

export interface IProductDatabaseList {
  id: number;
  productImage: string[];
  count: number;
  ourSKU: string;
  vendorSKU: string;
  name: string;
  recStatus: string;
  ourcost: number;
  salePrice: number;
  imap: number;
  msrp: number;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  location: string | null;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  createdName: string;
  modifiedName: string;
  vendorName: string;
  brandName: string;
  productTypeId: number;
  isCloned: boolean;
  subRows: [] | null;
}

export interface IProductDatabaseListCellProps {
  row: {
    original: IProductDatabaseList;
  };
  getValue: () => any;
}

export interface IProductById {
  id: number;
  productImage: string;
  productId: number;
  ourSKU: string;
  name: string;
  recStatus: string;
  upc: string;
  price: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: null;
  modifiedBy: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  displayOrderSize: number;
  displayOrderColor: number;
  attributeOptionColor: string;
  subRows: [];
}

export interface IProductByIdCellProps {
  row: {
    original: IProductById;
  };
  getValue: () => any;
}

export const PRODUCT_LIST_TABS: ITabOption[] = [
  { id: 0, label: "All" },
  { id: 1, label: "Active" },
  { id: 2, label: "Inactive" },
  { id: 3, label: "Draft" },
] as const;

export interface IProductVariantTableProps {
  openProductModal: boolean;
  setOpenProductModal: (value: boolean) => void;
}
