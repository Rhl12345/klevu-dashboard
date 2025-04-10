export interface IStoryCategoryValues {
    id: number;
    category: string;
    parentCategoryId: number;
    slug: string;
    recStatus: string;
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    modifiedBy: string;
  }
  
export interface IStoryCategoryModal {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  onSubmit: (values: IStoryCategoryValues) => void;
}

export enum MODAL_TYPES {
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
  ACTIVE_INACTIVE = "activeInactive",
}