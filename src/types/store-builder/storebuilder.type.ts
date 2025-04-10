export interface IFeesData {
  id: number;
  storeId: number;
  name: string;
  type: string;
  amount: number;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: null;
  rowVersion: null;
  location: null;
  ipAddress: null;
  macAddress: null;
}

export interface ICouponData {
  storeId: number;
  name: string;
  type: number;
  amount: number;
  couponCodes: string;
  couponCodeUsedOnes: string;
  recStatus: string;
  id: number;
  rowVersion: string | null;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}

export interface IFeesModalProps {
  openFeesModal: boolean;
  setOpenFeesModal: (openFeesModal: boolean) => void;
  feesData: IFeesData[];
  setFeesData: (feesData: IFeesData[]) => void;
  storeID: number;
  FeesEditData: null | IFeesData;
  setFeesEditData: (FeesEditData: IFeesData | null) => void;
  isAddMode: boolean;
}

export interface ICouponModalProps {
  openCouponModal: boolean;
  setOpenCouponModal: (openCouponModal: boolean) => void;
  couponData: ICouponData[];
  setCouponData: (couponData: ICouponData[]) => void;
  storeID: number;
  couponEditData: null | ICouponData;
  setCouponEditData: (couponEditData: ICouponData | null) => void;
  isAddMode: boolean;
}

export interface IFeesListProps {
  feesData: IFeesData[];
  setFeesData: (feesData: IFeesData[]) => void;
  setOpenFeesModal: (openFeesModal: boolean) => void;
  openFeesModal: boolean;
  storeID: number;
}

export interface ICouponListProps {
  couponData: ICouponData[];
  setCouponData: (couponData: ICouponData[]) => void;
  openCouponModal: boolean;
  setOpenCouponModal: (openCouponModal: boolean) => void;
  storeID: number;
}

export interface ICouponListCellProps {
  row: {
    original: ICouponData;
  };
  getValue: () => any;
}

export interface IFeesListCellProps {
  row: {
    original: IFeesData;
  };
  getValue: () => any;
}
