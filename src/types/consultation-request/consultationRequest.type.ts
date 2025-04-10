export interface IConsultationRequestCustomer {
  id: number;
  storeLogoUrl: string;
  storeName: string;
  firstname: string;
  lastname: string;
  email: string;
  companyPhone: string;
  submissionDate: string;
  inHandsDate: string;
  productName: string;
  logoUrl: string;
  consultationStatus: string;
  desiredQuantity: number;
  message: string;
  gclid: string;
  shipToMultipleLocations: boolean;
  recStatus:
    | "active"
    | "inactive"
    | "pending"
    | "rejected"
    | "approved"
    | "draft";
}

export interface IModalState {
  isOpen: boolean;
  type:
    | "delete"
    | "activeInactive"
    | "viewHistory"
    | "new"
    | "In Progress"
    | "Approved"
    | "Junk"
    | "Rejected"
    | "view"
    | null;
  selectedRequest: IConsultationRequestCustomer | null;
}

export type IFilterOption = {
  field: string;
  value: string;
  operator: string;
};
