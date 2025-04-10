export interface IOrderReportValues {
  orderNo: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  orderStatus: string;
  quantity: number;
}

export interface ISyncWithBcValues {
  lastImport: {
    userName: string;
    importDate: string;
    lastOrderNo: string;
  };
  orders: {
    orderNo: string;
    orderDate: string;
  }[];
}

export interface IProductReportValues {
  productName: string;
  size: string;
  color: string;
  quantity: number;
  paid: number;
  base: number;
}

export interface IProductReportProps {
  includeProductArtwork: boolean | undefined;
  startDate: string;
  endDate: string;
  products: IProduct[];
}

export interface IProductVariation {
  color: string;
  size: string;
  quantity: number;
  paid: number;
  base: number;
}

// Define the type for a product
export interface IProduct {
  id: number;
  name: string;
  style: string;
  image: { id: number; url: string; name: string }[];
  quantity: number;
  variations: IProductVariation[]; // This is where variations are defined
  totalQuantity?: number;
  totalPaid?: number;
  totalBase?: number;
  includeProductArtwork?: boolean;
  startDate?: string;
  endDate?: string;
  products?: IProduct[];
}

export interface IProductReportListProps {
  data: IProductReportValues[];
}

export interface ICustomerReportListProps {
  data: IOrderProduct[];
}
export interface ICustomerReportValues {
  totalQuantity: number;
  totalOrders: number;
  orders: IOrder[]; // Assuming IOrder is another interface for order details
}

export interface IOrderProduct {
  productName: string;
  size: string;
  color: string;
  quantity: number;
  paid: number;
}
export interface IOrder {
  orderId: string;
  billingName: string;
  billingEmail: string;
  paymentMethod: string;
  orderDate: string;
  shippingAddress: string;
  products: IOrderProduct[];
}
