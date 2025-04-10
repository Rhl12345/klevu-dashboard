export interface ICartItem {
  thumbNail: string;
  productName: string;
  sku: string;
  color?: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface IAbandonedCart {
  id: string;
  storeLogoUrl: string;
  storeName: string;
  name: string;
  email: string;
  customerId: string;
  shoppingCartId: string;
  subTotal: number;
  createdDate: string;
  cartItems: ICartItem[];
}

export interface IViewAbandonedShoppingCartProps {
  selectedCart: IAbandonedCart | null;
  setIsModalOpen: (value: boolean) => void;  // Changed to function type
  isModalOpen: boolean;
}
export interface IEmailAbandonedShoppingModelProps {
  isEmailModalOpen: boolean;
  setIsEmailModalOpen: (value: boolean) => void;
  
}

export interface IFilterOption {
  filter: string;
  name: string;
}
 export interface IAbandonedCartItem {
  customerId: string;
  shoppingCartId: string;
  subTotal: number;
  name: string;
  email: string;
  storeName: string;
  storeLogoUrl: string;
  createdDate: string;
};