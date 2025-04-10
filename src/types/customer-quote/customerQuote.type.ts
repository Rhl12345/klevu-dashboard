export interface IAddCustomerQuoteProps {
  initialQuoteData?: {
    storeId: string;
    searchBy: string;
    customerName: string;
    products: any[];
    expiryDate: string | null;
  };
  quoteId?: number;
}

export interface ICustomerQuoteViewProps {
  quoteNumber: string;
  customerName: string;
  billingAddress: IAddress;
  shippingAddress: IAddress;
  products: Array<{
    name: string;
    options: string;
    sku: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
}

export interface ICustomerDetailsProps {
  customerName: string;
  billingAddress: IAddress;
  shippingAddress: IAddress;
}
export interface IAddNewProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export interface IProductTableProps {
  products: any[];
  onQuantityChange: (index: number, value: string) => void;
  onPriceChange: (index: number, value: string) => void;
  onNotesChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  total: string;
}

export interface IUserInfoProps {
  customerInfo: {
    name: string;
    email: string;
    billingAddress: {
      name: string;
      street: string;
      city: string;
      zipCode: string;
      country: string;
      phone: string;
    };
    shippingAddress: {
      name: string;
      street: string;
      additionalStreet?: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      phone: string;
    };
  };
}

export interface IAddExistingProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IAddress {
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  state?: string;
}
