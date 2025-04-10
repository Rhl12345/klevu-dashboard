export interface IPrimarySelectGroup {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
}

export interface IPrimarySelectGroupProduct {
  id: number;
  storeId: number;
  productImage: string[];
  count: number;
  ourSKU: string;
  vendorSKU: string;
  name: string;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  category: string;
  gender: string;
  subRows?: IPrimarySelectGroupVariant[];
  recStatus: string;
}

export interface IPrimarySelectGroupVariant {
  id: number;
  name: string;
  productImage: string;
  productId: number;
  quantity: number;
}

export interface IPrimarySelectGroupListRequest {
  pageIndex?: number;
  pageSize?: number;
  sortingOptions: {
    field: string;
    direction: number;
    priority: number;
  }[];
  filteringOptions?: Array<{
    field: string;
    operator: string;
    value: string | number;
  }>;
}

export interface IPrimarySelectGroupResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IPrimarySelectGroupProduct[];
}
export interface IBrandPrimarySelectionProps {
  addedBrandData: IPrimarySelectGroupProduct[];
  setAddedBrandData: (data: IPrimarySelectGroupProduct[]) => void;
  storeName?: string;
  id?: string;
}

export interface IProductPrimarySelectionProps {
  addedProductData: IPrimarySelectGroupProduct[];
  setAddedProductData: (data: IPrimarySelectGroupProduct[]) => void;
  storeName?: string;
  id?: string;
}
