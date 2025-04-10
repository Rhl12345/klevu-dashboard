// Define the interface for a coupon cod


export type ITabs = "all" | "active" | "scheduled" | "expired" | "inactive";

export interface ICouponCodeList {
  id: number;
  name: string;
  status: string;
  storeName: string;
  storeImage: string;
  discountCode: string;
  createdName: string;
  modifiedName: string;
  couponUsedCount: number;
  startdate: string;
  enddate: string;
  starttimne: string;
  endTime: string;
  storeid: number;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  viewOrders: string;
}

export interface IRangeDetail {
  rangeFrom: number;
  rangeTo: number;
  discountValue: number;
  valuePercentage: number;
  usePercentage: boolean;
}

export interface IRangeDetailErrors {
  rangeFrom?: string;
  rangeTo?: string;
  discountValue?: string;
}

export interface IFormErrors {
  [key: string]: any;
}

export interface ICouponFormValues {
  discountName: string;
  store: string;
  discountCode: string;
  promotionType:
    | "isPercentage"
    | "isFixedAmount"
    | "isFreeShipping"
    | "isRange";
  rangeDetails: IRangeDetail[];
  appliesTo: "isAllProduct" | "isBrand" | "isCategory" | "isSpecificProduct";
  minimumRequirements:
    | "isNoneMinimum"
    | "isAmountMinimum"
    | "isQuantityMinimum";
  customerEligibility: "isEveryone" | "SpecificCustomers";
  isLimitNoOfTimes: boolean;
  isLimitOneUser: boolean;
  startDate: string;
  endDate: string;
  discountValue: string;
  selectedBrands: string[];
  selectedCategories: string[];
  selectedProducts: string[];
  minimumPurchaseAmount: string;
  minimumQuantity: string;
  selectedCustomers: string[];
  totalUsageLimit: string;
}

export interface ICouponCodePayload {
  pageIndex: number;
  pageSize: number;
  sortingOptions: any;
  filteringOptions?: any[];
  status?: string;
  store?: string;
}

export interface IInquiriesListViewModal {
  productName:string;
  sku: string;
  srno: string | number;
  storeName: string;
  totalQuantity: number
}

export interface IInquiriesListViewModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  modalInformation: IInquiriesListViewModal[];
}
