export interface ICustomeGiftCard {
    customerName: string;
    storeName: string;
    createdName: string;
    modifiedName: string;
    emailTo: string;
    initialAmount: number | string;
    availableAmount: number | string;
    createdDate: string;
    modifiedDate: string;
    balance: number | string;
    id: number;
    storeID: number;
    serialNumber: string;
    customerID: number;
    orderNumber: number | string;    
    recStatus: string;
  }

  export interface IGiftCardFormValues {
    storeName: string;
    recipientName: string;
    emailTo: string;
    serialNumber: string;
    orderNumber: string | number;
    initialAmount: string | number;
    balance: string | number;
    status: string;
  }


  export interface IEditGiftCardModalProps {
    editGiftCard: ICustomeGiftCard;
    selectedStore: string;
    isOpen: boolean;
    onClose: () => void;
    setGiftCardList: (list: ICustomeGiftCard[]) => void;
  }



  // Gift Card Response
  export interface IGiftCardResponse {
    items: ICustomeGiftCard[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }

  export interface IGiftCardPayload {
    pageIndex: number;
    pageSize: number;
    selectedStore?: string;
  }

  export interface IGiftCardFormFields {
    id: string;
    label: string;
    placeholder: string;
    required?: boolean;
  }