export interface IProductStatusEntry {
  id: number;
  name: string;
  productStatus: string;
  gtinMissing: string;
  notReadyToSell: string;
  partiallyReadyToSell: string;
  readyToSell: string;
}

export interface IProductStatusReportRequest {
  pageIndex: number;
  pageSize: number;
  sortingOptions: Array<{ field: string; direction: number; priority: number }>;
}

export interface IProductStatusReportResponse {
  items: IProductStatusEntry[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
