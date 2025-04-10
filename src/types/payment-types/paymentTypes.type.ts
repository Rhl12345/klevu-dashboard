export interface IPaymentTypeValues {
  id: number;
  name: string;
  isMultipleSelect: boolean;
  recStatus: string;
  createddate: string;
  modifieddate: string;
}

export interface IPaymentTypeModal {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  onSubmit: (values: IPaymentTypeValues) => void;
}

export interface IPaymentTypeState {
  isOpen: boolean;
  type: "create" | "edit" | "delete" | "activeInactive" | null;
}
export interface IFormField {
  name: string;
  label: string;
  options?: { type?: string; asterisk?: boolean };
}
