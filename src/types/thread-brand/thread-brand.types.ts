export interface IThreadBrandModelProps {
  isOpen: boolean;
  onClose: () => void;
  editId?: number | null;
  getList: () => void;
}

export interface IThreadBrandFormValues {
  id?: number;
  logoGroupDescriptionId: number | string;
  brandValue: string;
  displayOrder: number | string;
  recStatus?: string;
  rowVersion?: string;
}

export interface IThreadBrandListData {
  id: number;
  brandValue: string;
  displayOrder: number;
  recStatus: string;
  logoGroupDescriptionId: number;
  createdDate: string;
  createdName: string;
  modifiedDate: string;
  modifiedName: string;
}
