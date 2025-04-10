interface IShippingChargeItem {
  createdName: string;
  modifiedName: string;
  storeName: string;
  id: number;
  orderTotalMin: number;
  orderTotalMax: number;
  charge: number;
  storeId: number;
  isPercentage: boolean | null;
  recStatus: string;
  createdDate: string | null;
  createdBy: number | null;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string | null;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}

interface IShippingChargesData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IShippingChargeItem[];
}

interface IModalOpenState {
  isOpen: boolean;
  type: "add" | "edit" | "delete" | "activeInactive" | null;
}

interface ICreateShippingCostProps {
  shippingChargeData?: IShippingChargeItem;
  isModalOpen: IModalOpenState;
  handleClose: () => void;
}

interface ICreateShippingCostValues {
  charge: string;
  orderTotalMin: string;
  orderTotalMax: string;
  storeId: string;
  recStatus: boolean;
}

export type {
  IShippingChargeItem,
  IShippingChargesData,
  IModalOpenState,
  ICreateShippingCostValues,
  ICreateShippingCostProps,
};
