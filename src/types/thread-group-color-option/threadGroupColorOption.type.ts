export interface IThreadGroupColorOption {
  id: number;
  groupColorValue: string;
  threadBrandName: string;
  displayOrder: string;
  createdDate: string | null;
  updatedBy: string | null;
  recStatus: "A" | "I";
  updatedDate: string | null;
  createdBy: string | null;
}

export interface IThreadGroupColorOptionFormValues {
  id: number | null;
  threadBrandName: string;
  groupColorValue: string;
  displayOrder: string;
}

export interface IDropdownOption {
  label: string;
  value: string | null;
}
export interface ICreateModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
  editId: number | null;
}
