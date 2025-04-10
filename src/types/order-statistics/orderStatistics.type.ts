export interface IOrderStatistics {
  day: string;
  totalOrders: number;
  subTotal: number;
  tax: number;
  shipping: number;
  refund: number;

  discount: number;
  adjustmentAmount: number;
  total: number;
}
