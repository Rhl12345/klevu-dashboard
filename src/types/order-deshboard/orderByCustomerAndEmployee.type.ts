export interface IOrderByCustomerAndEmployee {
  storeLogo: string;
  storeName: string;
  customerName: string;
  customerEmail: string;
  totalOrders: number;
  orderTotal: number;
}

export interface IStoreNameProps {
  storeName: string;
}

export interface IStoreOption {
  label: string;
  value: string;
}

export interface ICommonSendProps {
  selectedStore: IStoreOption;
  selectedDuration: IStoreOption;
}
