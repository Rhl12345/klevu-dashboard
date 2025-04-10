export interface IGroupDescriptionValues {
  id: number;
  isMultipleSelect?: boolean;
  recStatus?: string;
  descriptionValue: string;
  displayOrder: string | number;
}

export interface IAddGroupDescriptionModal {
  isOpen: boolean;
  descriptionValue: string;
  displayOrder: string | number;
  onClose: () => void;
  editId: number | null;
  onSubmit: (values: IGroupDescriptionValues) => void;
}
