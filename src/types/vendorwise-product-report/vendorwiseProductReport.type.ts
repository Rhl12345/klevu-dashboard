export interface IVendorWiseProductReportRequest {
  pageIndex: number;
  pageSize: number;
  sortingOptions: any[];
}

export interface IVendorWiseProductReportResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IVendorWiseProductEntry[];
}

export interface IVendorWiseProductEntry {
  id: number;
  name: string;
  activeProducts: number;
  inActiveProduct: number;
  totalProducts: number;
  gtinMissing: number;
  notReadyToSell: number;
  partiallyReadyToSell: number;
  readyToSell: number;
}
