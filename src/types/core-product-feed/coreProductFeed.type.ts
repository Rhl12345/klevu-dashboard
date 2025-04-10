import { IFilteringOption, ISortingOption } from "@/components/Table/types";
import { SetStateAction } from "react";

export interface IGetProductsRequest {
  pageIndex?: number;
  pageSize?: number;
  globalFilter?: string;
  sortingOptions?: ISortingOption[];
  filteringOptions?: IFilteringOption[];
}

export interface IMasterProduct {
  id: number;
  productImage: string[];
  count: number;
  ourSKU: string;
  vendorSKU: string;
  vendorName: string;
  brandName: string;
  category: string;
  name: string;
  recStatus: string;
  ourcost: number;
  salePrice: number;
  imap: number;
  msrp: number;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  lastNavSyncDate: string;
  navSyncStatus: string;
  isCloned: boolean;
  rowVersion: string;
  createdName: string;
  modifiedName: string;
  storeLogoUrl: string[];
  storeId: number[];
  quantity: number | null;
  isDiscontinue: boolean;
  discontinueDate: string | null;
  subRows: any | null;
  storeNames: string;
  gender: string;
}

export interface IAttributeCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IMultipleCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IAttributeRecord {
  colorName: string;
  imagePath: string;
  sku: string;
  subRows: {
    id: number;
    name: string;
  }[];
}

export interface IAttributeCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAttributeClone: () => void;
}

export interface IMultipleCloneModalFormValues {
  storeName: string;
  storeImagePath: string;
  emailLogo: string;
}

export interface IGetProductsResponse {
  data: IMasterProduct[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  draftCount: number;
  discontinuedCount: number;
  syncedCount: number;
  resyncCount: number;
  syncPendingCount: number;
  colorDiscontinueCount: number;
}

export type TNavSyncStatus = "R" | "P" | "S";

export type TRecStatus = "A" | "I";

export type TModalType =
  | "delete"
  | "activeInactive"
  | "viewHistory"
  | "productVariant"
  | "productDiscontinue"
  | "multipleClone"
  | "attributeClone"
  | null;

export interface IModalState {
  isOpen: boolean;
  type: TModalType;
}

export interface IInventoryOption {
  label: string;
  value: string | number;
}

export interface IProductListHeaderProps {
  onExport: () => void;
  onImport: () => void;
  onManualBrand: () => void;
  onClone: () => void;
  onCreateListing: () => void;
  onAdd: () => void;
  onSync: () => void;
  inventoryOptions: IInventoryOption[];
  setSelectedStoreInventory: React.Dispatch<SetStateAction<string>>;
}

export interface IProductListResponse {
  items: IMasterProduct[];

  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
