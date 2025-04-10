export interface IOrderHistory {
  id: number;
  orderNo: string;
  orderDateTime: string;
  customer: string;
  qty: number;
  total: number;
  paymentStatus: string;
  fulfillmentStatus: string;
}