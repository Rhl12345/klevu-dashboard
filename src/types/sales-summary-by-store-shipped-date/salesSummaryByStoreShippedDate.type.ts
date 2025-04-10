export interface ISalesSummaryByStoreShippedDate {
  id: number;
  orderId: string;
  websiteName: string;
  shippedDate: string;
  totalSales: number;
  transactions: number;
  unitsSold: number;
  orderStatus: string;
}
