export interface ICreateModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
  editId: number | null;
}

export interface INavSkuMappingFormValues {
  id: number | null;
  storeName: string;
  currentSku: string;
  bcSku: string;
}

export interface INavSkuMappingData {
  id: number | null;
  currentSku: string;
  bcSku: string;
  storeName: string;
  createdDate: string | null;
  updatedBy: string | null;
  recStatus: string;
  updatedDate: string | null;
  createdBy: string | null;
}
export interface IDropdownOption {
  label: string;
  value: string | null;
}
