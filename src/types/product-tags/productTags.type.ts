export interface IProductTagsList {
  id: number;
  image: string;
  name: string;
  storeName: string;
  imagePosition: string;
  createdDate: string;
  createdBy: string;
  updateDate: string;
  updatedBy: string;
  status: string;
}

export interface IProductTagsListColumnType {
  id: number;
  name: string;
  store_name: string;
  charges: number | null;
  created_date: string | null;
  updated_by: string | null;
  recStatus: string;
  updated_date: string | null;
  created_by: string | null;
  image: string;
}

export interface IProductTagsListValues {
  name?: string;
  displayOrder?: string;
  createdBy?: unknown;
  productAttributesTypeStatus?: "active" | "inactive";
  id?: number;
  productAttributesName?: string;
  controlType?: string;
  textPrompt?: string;
  storeName?: string;
  status?: string;
  charges?: number | null;
  position: string;
}

type TIProductTagsListTypeStatus = "active" | "inactive";

export interface IProductTagsListFormValues {
  name?: string;
  displayOrder?: string;
  createdBy?: unknown;
  productAttributesTypeStatus?: TIProductTagsListTypeStatus;
  id?: number;
  productAttributesName?: string;
  controlType?: string;
  textPrompt?: string;
  storeName?: string;
  status?: string;
  charges?: number | null;
  position: string;
  image?: File | null;
  tagType?: string;
}

export interface IProductTagsFormList {
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

export interface IEnhancedICellPropss {
  getValue: () => string;
  row: {
    original: IProductTagsFormList;
  };
}

export interface IModalTypes {
  type: "delete" | "activeInactive" | "createModal" | "edit" | null;
}

export interface IProductTagsProps {
  isOpen: boolean;
  handleModalClose: () => void;
  editId: number | null;
}