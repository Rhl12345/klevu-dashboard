/** Supported vendor status options */
export enum IBrandStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface IModalState {
  isOpen: boolean;
  type: "delete" | "activeInactive" | "viewHistory" | null;
}

type ModalType = {
  type: "delete" | "activeInactive" | "viewHistory";
  data: IBrandList;
};

export interface IBrandFormValues {
  /** Unique identifier for the brand. Defaults to 0 if not provided */
  id: number;
  /** Name of the brand */
  name: string;
  /** URL for the colored version of the brand logo */
  colorLogoUrl: string;
  /** URL for the black and white version of the brand logo */
  bandWLogoUrl: string;
  /** URL for the product brand logo */
  productBrandLogo: string;
  /** Additional notes or description for the brand */
  notes: string;
  /** Array of vendor IDs associated with the brand */
  vendorId: number[];
  /** Current vendor status */
  resStatus: string;
  /** Array of initial files for the color logo */
  colorLogoInitialFiles: string[];
  /** Array of initial files for the bandW logo */
  bandWLogoInitialFiles: string[];
  /** Array of initial files for the product brand logo */
  productBrandLogoInitialFiles: string[];
}

export interface IVendorItem {
  label: string;
  value: number;
}

export interface IBrandStatistics {
  activeUPC: number;
  missingUPC: number;
  drafts: number;
  totalProduct: number;
}

export interface BrandListResponse {
  success: boolean;
  data: {
    items: IBrandFormValues[];
    totalCount: number;
  };
}

export interface IStatisticsResponse {
  success: boolean;
  data: IBrandStatistics;
}

export interface IStore {
  storeName: string;
  storeImagePath: string;
}

export interface IStoreType {
  storeType: string;
  storeList: IStore[];
}

export interface IBrandStatistics {
  activeUPC: number;
  missingUPC: number;
  drafts: number;
  totalProduct: number;
}

export interface ISidebarStoreListProps {
  storeType: IStoreType[];
}

export interface IStoreSearchEvent {
  target: {
    value: string;
  };
}

export interface ICatalogData {
  vendorName: string;
  createdName: string;
  modifiedName: string;
  id: number;
  vendorId: number | string;
  brandId: number;
  catalogName: string;
  startDate: string;
  endDate: string | null;
  releasedDate: string;
  uploadCatalogURL: string;
  displayInFront: boolean;
  uploadCatalogName: string | null;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  isBrand?: boolean;
}

export interface ICatalogProps {
  vendorId?: number[];
  brandId?: number;
  isAddMode?: boolean;
  id?: number;
}

export interface IBrandList {
  id: number;
  name: string;
  productCount: number;
  createdName: string;
  modifiedName: string;
  vendorName: string[];
  vendorId: number[];
  colorLogoUrl: string;
  bandWLogoUrl: string;
  productBrandLogo: string | null;
  notes: string;
  recStatus: "active" | "inactive" | "removed"; // Active, Inactive, Removed
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion?: string;
  location?: string;
  ipAddress?: string;
  macAddress?: string;
}

export interface ICatalogFormValues {
  id: number;
  brandId: number;
  displayInFront: boolean;
  vendorId: string;
  catalogName: string;
  startDate: string;
  rowVersion: string;
  releasedDate: string;
  uploadCatalogURL: string;
  uploadCatalogName: string;
  isBrand: boolean;
  recStatus: string;
}

export interface ICatalogListProps {
  catalogData: ICatalogData[];
  onEdit: (id: number) => void;
  onDelete: (catalog: ICatalogData) => void;
  paginationData: {
    totalCount: number;
    pageSize: number;
    pageIndex: number;
  };
}
