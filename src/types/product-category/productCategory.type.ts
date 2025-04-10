export interface ICategory {
  categoryName: string;
  parentCategory: string;
  description: string;
  status: string;
}

export interface IStore {
  storeTypeId: number;
  storeType: string;
  storeList: {
    storeId: number;
    storeName: string;
    storeImagePath: string;
    recStatus: string;
    isActive: boolean;
  }[];
}

export interface IProductCategory {
  id: number;
  parentCategoryId?: number;
  name: string;
  description: string | null;
  collectionImageURl: string | null;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  createdName?: string;
  modifiedDate: string | null;
  modifiedBy: number | null;
  modifiedName?: string;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
  productCount: number;
  subRows: IProductCategory[];
}

export interface IProductCategoryList {
  items: IProductCategory[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IProductWithCategoryList {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IProductWithCategory[];
}

export interface IProductWithCategory {
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
  modifiedDate: string | null;
  modifiedBy: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  lastNavSyncDate: string | null;
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
  subRows: IProductWithCategory[] | null;
  storeNames: string;
  gender: string;
}
