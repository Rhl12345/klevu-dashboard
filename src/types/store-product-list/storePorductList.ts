import { IStoreDetail } from "@/types/products-database/productDatabase.type";

export interface IStoreProductList {
  id: number;
  storeId: number;
  productImage: string[];
  count: number;
  ourSKU: string;
  vendorSKU: string;
  name: string;
  recStatus: string;
  upc: string;
  quantity: number | null;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  category: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  createdName: string;
  modifiedName: string;
  vendorName: string;
  brandName: string;
  isDiscontinue: boolean;
  discontinueDate: string | null;
  publishDate: string | null;
  seName: string;
  isPreview: boolean;
  subRows: IStoreProductList[] | null;
  gender: string;
}

export interface IStoreProductListTableCellProps {
  row: {
    original: IStoreProductList;
  };
  getValue: () => any;
}

export interface IStoreProductListResponse {
  items: IStoreProductList[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IProductVariant {
  id: number;
  productId: number;
  productImage: string;
  ourSKU: string;
  name: string;
  recStatus: string;
  upc: string;
  quantity: number;
  price: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string | null;
  modifiedBy: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
  displayOrderSize: number;
  displayOrderColor: number;
  attributeOptionColor: string;
}

export interface IStoreListProductVariantTableCellProps {
  row: {
    original: IProductVariant;
  };
  getValue: () => any;
}

export const STORE_LIST_TABS = [
  { id: 1, label: "All", recordCount: 0 },
  { id: 2, label: "Active", recordCount: 0 },
  { id: 3, label: "Inactive", recordCount: 0 },
  { id: 4, label: "Draft", recordCount: 0 },
  { id: 5, label: "Discontinued", recordCount: 0 },
];

export interface IStoreListPageProps {
  storeDetails: IStoreDetail;
}

export interface IProductVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IStoreProductList;
}
