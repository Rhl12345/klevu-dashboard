export interface IOrderStateTaxReport {
  orderNumber: number;
  state: string;
  orderTax: number;
  orderTotal: number;
}

export interface IPaginationData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
