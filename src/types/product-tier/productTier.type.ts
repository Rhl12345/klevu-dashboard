import { FormikProps } from "formik";

export interface IProductTierEntry {
  id: number;
  storeId: number;
  storeName: string;
  tier: number;
  tierName: string;
  tierValue: number;
  recStatus: 'A' | 'I';
  createdDate: string;
  createdBy: number;
  createdName: string;
  modifiedDate: string | null;
  modifiedBy: number | null;
  modifiedName: string;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface IStoreOption {
    value: string;
    label: string;
}

export interface IProductTierListResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IProductTierEntry[];
}

export interface IProductTierFormProps {
    formik: FormikProps<any>;
}

export interface IProductTierFormValues {
  storeName: string;
  tierName: string;
  tier: string;
}

export interface IProductTierListRequest {
  pageIndex: number;
  pageSize: number;
  sortingOptions: {
    field: string;
    direction: number;
    priority: number;
  }[];
  filteringOptions: any[];
}

export interface IFilterOption {
    field: string;
    operator: string;
    value: string | number;
}


const IMODAL_TYPES = {
    DELETE: 'delete',
    ACTIVE_INACTIVE: 'activeInactive',
    VIEW_HISTORY: 'viewHistory'
  } as const;
  
export type IModalType = typeof IMODAL_TYPES[keyof typeof IMODAL_TYPES];

export interface IEditTierFormValues {
  tierName: string;
  tierValue: number;
}

export interface IEditTierModalProps {
    editTier: IEditTierFormValues | null;
    isOpen: boolean;
    onClose: () => void;
}

export interface ITierRangeType {
    id: number;
    storeId: number;
    tierName: string;
    tierValue: number;
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

export interface ICreateEditProductTierProps {
    id?: string;
  }
