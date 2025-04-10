import { STORE_TYPES } from "../products-database/productDatabase.type";

interface IBundleSubRow {
  id: number;
  masterProductId: number;
  masterProductAttributeCombinationId: number;
  productImage: string | null;
  name: string;
  ourSKU: string;
  upc: string;
  recStatus: string;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  color: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  bundleProductId: number;
}

interface IBundleItem {
  id: number;
  storeId: number;
  storeImage: string;
  productImage: string | null;
  count: number;
  ourSKU: string;
  name: string;
  recStatus: string;
  upc: string | null;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  categoryId: number;
  category: string | null;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  createdName: string;
  modifiedName: string;
  subRows: IBundleSubRow[];
}

interface IBundleProductTabItem {
  id: number;
  storeId: number;
  productImage: string[];
  count: number;
  ourSKU: string;
  vendorSKU: string;
  name: string;
  recStatus: string;
  upc: string;
  quantity: number;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  category: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  createdName: string;
  modifiedName: string;
  vendorName: string;
  brandName: string;
  subRows: IBundleProductTabSubRow[];
  lastNavSyncDate: string | null;
  navSyncStatus: string;
  gender: string;
}

interface IBundleProductTabSubRow {
  id: number;
  name: string;
  productImage: string;
  productId: number;
  quantity: number;
}

interface IBundleResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IBundleItem[];
}
interface IStoreListBundleTableCellProps {
  row: {
    original: IBundleItem;
  };
  getValue: () => any;
}

interface IBundleProductTabTableCellProps {
  row: {
    original: IBundleProductTabItem;
  };
  getValue: () => any;
}

interface IBundleProductTableCellProps {
  row: {
    original: IBundleSubRow;
  };
  getValue: () => any;
}

interface IBundleDetails {
  id: number;
  storeId: number;
  brandId: number;
  vendorId: number;
  name: string;
  isNameDifferentfromERP: boolean;
  nameInERP: string;
  isERPNameDifferent: boolean;
  erpItemId: number;
  vendorSKU: string | null;
  ourSKU: string;
  producttypeId: number;
  companionProduct: string | null;
  taxCode: string;
  categoryId: number;
  category: string;
  description: string;
  shortDescription: string;
  length: number;
  width: number;
  height: number;
  volume: number;
  weightInLBS: number;
  shipWeightinLBS: number;
  isBundle: boolean;
  dimensionTemplateId: number;
  newUrl: string;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  isGiftWrap: boolean;
  giftWrapPrice: number;
  callForPrice: boolean;
  isEnableMAP: boolean;
  quantityDiscountTemplate: number;
  ecomSafetyQty: number;
  sizeChartId: number;
  sizeChartDescription: string | null;
  isEnableLogolocation: boolean;
  personalizedCategoryId: number;
  isNewProduct: boolean;
  isAssembleProduct: boolean;
  isDropShipProduct: boolean;
  isSaleProduct: boolean;
  isrestrictedProduct: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isbestSellar: boolean;
  isPriceQuote: boolean;
  isGiftSet: boolean;
  isCommingSoon: boolean;
  isNoCoupan: boolean;
  isSepateShip: boolean;
  isSampleProduct: boolean;
  recStatus: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  rowVersion: string;
  createdByName: string | null;
  modifiedByName: string | null;
  createdDate: string;
  createdBy: number | null;
  modifiedDate: string;
  modifiedBy: string | null;
  seName: string;
  isSENameChanged: boolean;
}

interface IEditBundleProps {
  storeType: STORE_TYPES;
  storeName: string;
  bundleId: string;
  initialData: IBundleDetails;
}

interface IBundleCommonFormProps {
  initialData?: IBundleDetails | null;
  onFormChange?: () => void;
  setIsFormValid?: (isValid: boolean) => void;
  storeType?: STORE_TYPES;
  onClose?: () => void;
  setIsDirty?: (isDirty: boolean) => void;
}

export type {
  IBundleCommonFormProps,
  IBundleDetails,
  IBundleItem,
  IBundleProductTabItem,
  IBundleProductTableCellProps,
  IBundleProductTabTableCellProps,
  IBundleResponse,
  IBundleSubRow,
  IEditBundleProps,
  IStoreListBundleTableCellProps,
};
