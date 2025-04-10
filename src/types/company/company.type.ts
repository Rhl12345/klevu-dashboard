export interface IUsers {
    id: number;
    customerName: string;
    storeLogoUrl: string;
    isRegistered: string;
    customerType: string;
    email: string;
    tags: string;
    revenue: string;
    orders: number;
    sessions: number;
    lastActive: string;
    recStatus: "active" | "inactive"
  }
  export  interface ICompanyFormValues {
    corporateName: string;
    departmentName: string;
    address1: string;
    address2?: string;
    suite?: string;
    city: string;
    countryName: string;
    countryCode: string;
    zipCode: string;
    state: string;
    OtherState?: string;
    webSite: string;
    email: string;
    phone: string;
    fax?: string;
  }
  export interface ICompany {
    id: number;
    companyName: string;
    stores: string;
    storeLogoUrl: string;
    revenue: string;
    orders: number;
    lastActive: string;
    recStatus: "active" | "inactive";
  }
  export interface IUser {
    id: number;
    customerName: string;
    storeLogoUrl: string;
    isRegistered: 'Yes' | 'No';
    customerType: 'Premium' | 'Standard' | 'Basic';
    email: string;
    tags: string[];
    revenue: number;
    orders: number;
    sessions: number;
    lastActive: Date;
    recStatus: "active" | "inactive";
    
  }
  
  
  export interface IConsultationRequestData {
    id: number;
    submissionDate: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    inHandsDate: string;
    storeLogoUrl: string;
    storeName: string;
    productName: string;
    logoUrl: string;
    desiredQuantity: number;
    message: string;
    status: string;
    recStatus: "active" | "inactive" | "pending" | "rejected" | "approved" | "draft";
    gclid: string;
  }
  export interface IConsultationRequest extends IConsultationRequestData {
    /** Creation timestamp */
    storeLogoUrl: string;
    /** User who created the record */
    createdby: string | null;
    /** Last modification timestamp */
    modifieddate: string;
    /** User who last modified the record */
    modifiedby: string | null;
    /** Row version for concurrency control */
    status: string;

    action: string;

    recStatus: "active" | "inactive" | "pending" | "rejected" | "approved" | "draft";
  }
  export interface ICustomLogoData {
    id: number;
    logoName: string;
    logo: string;
    decorationType: string;
    clientStatus: string;
    lastActive: string;
    recStatus: "active" | "inactive";
  }
  export interface IOrder {
    id: number;
    orderStatus: string;
    order: string;
    date: string;
    customerName: string;
    total: number;
    paymentType: string;
    paymentStatus: string;
    fulfillmentStatus: string;
    items: number;
    deliveryStatus: string;
    recStatus: "active" | "inactive" | "pending" | "rejected" | "approved" | "draft";
  }
 
export   interface ModalState {
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
    selectedCompany: ICompany | null;
  }
  export interface ITableCellProps {
    row: {
      original: any;
      getValue: () => any;
    };
  }
  export  type IModalType = "delete" | "activeInactive" | "viewHistory" |"productVariant"| null;

   export type TableCellProps = {
    getValue: () => any;
    row: {
      original: IOrder;
    };
  };
  export interface ILifeCycle {
    OrderDate: string;
    OrdersAmount: number;
    recStatus: string;
    CustomerName: string;
  }
  export interface IDateRange {
    startDate: Date;
    endDate: Date;
  }
  
  export interface IPaginationState {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  }
  export interface ICompanyDetails {
    companyName: string;
    email: string;
    status: string;
  }
  