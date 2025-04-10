import {
  PRODUCT_FEEDS,
  STORE_TYPES,
} from "@/types/products-database/productDatabase.type";

export interface IProductPricing {
  msrp: number;
  ourCost: number;
  salePrice: number;
  isImapEnabled: boolean;
  imap: number;
  callForPrice: boolean;
}

export interface IProduct {
  productName: string;
  description: string;
  status: string;
  vendorSku: string;
  sku: string;
  brand: string; // Brand ID
  vendor: string; // Vendor ID
  productType: string;
  shortDescription: string;
  longDescription: string;
  specifications: string;
  features: string;
  volume: number;
  length: number;
  width: number;
  height: number;
  taxCode: string;
  hasDifferentErpName: boolean;
  differentErpName: string;
  hasExistingErpId: boolean;
  erpItemId: string;
  weight: number;
  shipWeight: number;
  searchDimensionTemplate: string;
  companionProduct: string;
  imageUrl: string;
  pageRedirectionUrl: string;
  seName: string;
  updatedBy?: string;
  updatedAt?: string;
  productReadiness?: number;
  seoReadiness?: number;
}

export interface ICoreProduct extends IProduct {
  category: string;
  gender: string;
}

export interface IProductFeed extends IProduct, IProductPricing {}

export interface IAllProductData
  extends IProduct,
    IProductPricing,
    ICoreProduct {}

export interface IEditProductProps {
  type: PRODUCT_FEEDS;
  initialData: Record<string, any>;
  productId: string;
}

export interface IEditStoreProductProps {
  storeType: STORE_TYPES;
  storeName: string;
  initialData: Record<string, any>;
  productId: string;
}
export interface IProductSideBar
  extends Pick<
    IAllProductData,
    | "productName"
    | "vendorSku"
    | "sku"
    | "imageUrl"
    | "updatedBy"
    | "updatedAt"
    | "productReadiness"
    | "seoReadiness"
  > {
  productId: string;
}

export interface IAttributesDropdown {
  label: string;
  value: string;
}

export interface IAttributeOption {
  value: string;
  suffix: string;
  seasonalSKU?: string;
  displayOrder: number;
  isActive: boolean;
  isDiscontinued: boolean;
}

export interface IAttributeMedia {
  url: string;
  file: File | null;
  name: string;
  displayOrder: number;
}

export interface IAttributeImageOption extends IAttributeOption {
  media: Array<IAttributeMedia>;
  swatch: {
    url: string;
    file: File | null;
  } | null;
  facetColor: string[];
  id: string;
}

export interface IAttributeCombination {
  id: string;
  variant: string;
  sku: string;
  minQuantity: number;
  multipleQuantity: number;
  isActive: boolean;
  subRows?: IAttributeCombination[];
  additionalPrice: number;
  upcGtin: string;
  imageUrl: string;
}

export interface IAttribute {
  name: string;
  id: string;
  isRequired: boolean;
  options: IAttributeOption[];
  variationId?: string;
}

export interface ILogoLocation {
  id: number | null;
  name: string;
  imageUrl: string;
  threeDImageURL: string;
  threeDLogoLocationClass: string;
  price: number;
  cost: number;
  logoLocationDetailId: number;
  brandGuidelines: boolean;
  recStatus: string;
  createdDate: string | null;
  createdBy: number | null;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string | null;
  location: string | null;
  ipAddress: string | null;
}

export interface ILogoLocationCellProps {
  row: {
    original: ILogoLocation;
  };
  getValue: () => any;
}
export interface IVendorSku {
  id: number;
  vendorId: string;
  vendorName: string;
  vendorSku: string | null;
  referenceName: string | null;
  ourSubSku: string | null;
  mpn: string | null;
  isDefaultVendor: boolean;
  subRows?: (Omit<IVendorSku, "vendorId"> & { parentId: number })[];
}

export interface IProductSizeChart {
  id: number;
  name: string;
  brandId: number;
  sizeChartRange: string;
  description: string;
  measurements: string;
  toogleDisplay: boolean;
  sizeChartView: string;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface ISizeChartTableProps {
  sizeChartObj: {
    distinctX: string[];
    distinctY: string[];
    sizeChartViewdata: any; // Define specific type when available
  };
  data: any; // Define specific type when available
  chartId: string;
}

export interface ISizeChartState {
  distinctX: string[];
  distinctY: string[];
  sizeChartViewdata: any[]; // Replace 'any' with proper type
}

export interface ISizeChartFormValues {
  sizeChartTemplateDescription: string;
}

export interface ISizeChartDropDownOption {
  value: string;
  label: string;
}

export interface IFutureInventory {
  date: string;
  quantity: number;
}

export interface IProductInventoryData {
  imageUrl: string;
  variant: string;
  sku: string;
  quantity: number;
  vendor: string;
  id: number;
  parent?: number;
  futureInventory?: IFutureInventory[];
  subRows?: IProductInventoryData[];
}

export interface IPricingDiscount {
  createdName: string;
  modifiedName: string;
  id: number;
  parentId: number;
  lowQuantity: number;
  highQuantity: number;
  discountPercent: number;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}
export interface IStoreBundle {
  typeId: number;
  type: string;
  list: {
    id: number;
    name: string;
    imageUrl: string;
    recStatus: string;
    isActive: boolean;
  }[];
}

export interface IDiscontinuedSku {
  store: string;
  storeLogo: string;
  sku1: string;
  sku2: string;
  sku3: string;
  productId: string;
}
