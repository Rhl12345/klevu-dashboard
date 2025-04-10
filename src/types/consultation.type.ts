import { IConsultationRequestData } from "@/types/company/company.type";

export type IFilterOption = {
  field: string;
  value: string;
  operator: string;
};

export interface IModalState {
  isOpen: boolean;
  type: "delete" | "activeInactive" | "viewHistory" | "new" | "In Progress" | "Approved" | "Junk" | "Rejected" | null;
  selectedRequest: IConsultationRequestData | null;
}

export interface ITableCellProps {
  row: {
    original: IConsultationRequestData;
    getValue: () => any;
  };
} 
export type TModalType =
  | "delete"
  | "activeInactive"
  | "viewHistory"
  | "productVariant"
  | null;
