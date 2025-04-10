export interface ISalesSummaryByStoreValues {
  page: string;
  module: string;
  event: string;
}

// Types
export interface ISalesSummaryData {
  storeName: string;
  subTotal: number;
  coupons: number;
  shipping: number;
  tax: number;
  giftWrap: number;
  adjustment: number;
  total: number;
}

export interface ISalesSummaryColumn {
  key: keyof ISalesSummaryData;
  label: string;
  sortable: boolean;
  align?: "left" | "right";
}

export interface IReportsStore {
  label: string;
  value: string;
}

export interface ISalesSummaryByStoreReportProps {
  initialStore?: IReportsStore;
  onExport?: () => Promise<void>;
}
