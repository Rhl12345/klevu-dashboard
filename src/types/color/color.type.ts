interface ICreateColorProps {
  colorData: IColorItem | null;
  setData: (val: any) => void;
  openModal: {
    isOpen: boolean;
    type: "add" | "edit" | "delete" | "activeInactive" | null;
  };
  handleClose: () => void;
}

interface IColorItem {
  createdName: string;
  modifiedName: string;
  id: number;
  name: string;
  hexCode: string;
  borderColor: string;
  textColor: string;
  displayOrder: number | null;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

type TColorFormValues = Pick<
  IColorItem,
  | "name"
  | "hexCode"
  | "borderColor"
  | "textColor"
  | "displayOrder"
  | "recStatus"
>;

interface IColorsDataResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IColorItem[];
}

export type {
  ICreateColorProps,
  IColorItem,
  IColorsDataResponse,
  TColorFormValues,
};
