export interface IFixChargesProps {
  isOpen: boolean;
  handleModalClose: () => void;
  editId: number | null;
}

export interface IFixChargeFormValues {
  label: string;
  subject: string;
  emailBody: string;
}

export interface ICellProps {
  getValue: () => string | number | boolean | null;
  row: {
    original: {
      id: string;
      created_date?: string;
      updated_date?: string;
      recStatus: string;
    };
  };
}

export interface IInitialValues {
  name: string;
  charges: string | number | null;
  storeName: string;
  isAPIAvailable: boolean;
}

export interface IDropdownOption {
  value: string;
  label: string;
}

export interface IFixChargeFormList {
  id: number;
  name: string;
  store_name: string;
  charges: number | null;
  created_date: string | null;
  updated_by: string | null;
  recStatus: string;
  updated_date: string | null;
  created_by: string | null;
}

export interface IModalType {
  type: "delete" | "activeInactive" | "createModal" | "edit" | null;
}

export interface IModalState {
  isOpen: boolean;
  type: IModalType["type"];
}

// Improve cell props type safety
export interface IEnhancedICellProps {
  getValue: () => string;
  row: {
    original: IFixChargeFormList;
  };
}
