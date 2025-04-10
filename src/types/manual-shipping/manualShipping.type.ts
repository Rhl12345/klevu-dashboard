import { IOrderDetail } from "@/types/orders/orders.type";

export interface IManualShippingList {
  product_name: string;
  img: string;
  size: string;
  quantity: number;
  price_per_item: number;
  total_price: number;
  shipped_items: string;
  tracking_number: string;
  shipped_on: string;
  shipped_note: string;
  shipped_via: string;
  shipped: string;
}

export interface ManualShippingFormProps {
  isOpen: boolean;
  handleModalClose: () => void;
  rowData: IManualShippingList | null;
}

export interface ManualShippingProps {
  isOpen: boolean;
  handleModalClose: () => void;
  orderDetail: IOrderDetail;
}

export interface ViewOldOrderProps {
  isOpen: boolean;
  handleModalClose: () => void;
  orderDetail: IOrderDetail;
}
