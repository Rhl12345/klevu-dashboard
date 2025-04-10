export interface IContactUsData {
  name: string;
  email: string;
  companyName?: string;
  subject: string;
  country: string;
  state: string;
  address?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  comment?: string;
  createdDate: string;
  status?: string;
  view?: Record<string, unknown>;
}

export interface IStoreOption {
  value: string;
  label: string;
}

export interface IFilterOption {
  name: string;
  options: string[];
  columnName: string;
  type: "checkbox";
}

export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}

export interface IModalState {
  isOpen: boolean;
  type: "view" | null;
}

export interface IContactUSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IContactUsListReport {
  name: string;
  email: string;
  company: string;
  subject: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  phone: string;
  comment: string;
  date: string;
  status: string;
}

export interface IViewContactUsListViewModal {
  name: string;
  email: string;
  subject: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  phone: string;
  comment: string;
  date: string;
  status: string;
  company: string;
}

export interface IContactUSListViewModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalInformation: IContactUsListReport | null;
}

export interface IFilterOptions {
  filter: string;
  name: string;
}
