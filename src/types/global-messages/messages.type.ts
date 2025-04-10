import { FormikErrors, FormikTouched } from "formik";

export interface IMessage {
  id: number;
  message: string;
  messagekey: string;
  store: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  recStatus: string;
}

export interface IMessageFormValues {
  message: string;
  messageKey: string;
  storeName: string;
  status: string;
}

export interface IMessageModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
  editId: number | null;
}

export interface IDropdownOption {
  label: string;
  value: number;
}

export interface IMessageFormFieldsProps {
  values: IMessageFormValues;
  errors: FormikErrors<IMessageFormValues>;
  touched: FormikTouched<IMessageFormValues>;
  setFieldValue: (field: string, value: any) => void;
}

export type TMessageStatus = "active" | "inactive";

export type TMessageModalType = "delete" | "edit" | "status" | "create" | null;
