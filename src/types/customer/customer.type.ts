import { ITabOption } from "@/components/Tab/types";

export interface ICustomerAddress {
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  countryName: string;
  state: string;
  countryCode: string;
  postalCode: string;
  phone: string;
  fax: string;
  addressType: "B" | "S";
  isDefault: boolean;
  recStatus: string;
  rowVersion: string;
  OtherState: string;
}

export interface ICustomerFormValues {
  id: number;
  storeId: string;
  firstname: string;
  lastName: string;
  email: string;
  companyName: string;
  tierId: number;
  password: string;
  confirm_password: string;
  customerRoleId: string;
  isTaxableuser: boolean;
  customerAddress: ICustomerAddress[];
  isRegistered: boolean;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string;
  customerType: string;
  recStatus: string;
  rowVersion: string;
  shippingSameBilling: boolean;
}

export interface ICustomerInfo {
  id?: number;
  storeId?: string;
  firstname?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  isRegistered?: boolean;
  sharedCustomerId?: number;
  isLocked?: boolean;
  navCustomerId?: string;
  customerType?: string;
  isTaxableuser?: boolean;
  recStatus?: string;
  rowVersion?: string;
  isSuperuser?: boolean;
  storeName?: string;
  isUseNet?: boolean;
  customerRoleId?: number;
  isCustomerPersonalization?: boolean;
}

export interface ICountry {
  value: string;
  countryCode: string;
  label: string;
}

export interface IState {
  value: string;
  label: string;
}

export interface ICustomer {
  name: string;
  countryName: string | null;
  stateName: string | null;
  storeLogo: string[];
  storeEmailLogo: string[];
  storeName: string;
  createdName: string;
  modifiedName: string;
  orders: number;
  revenue: number;
  tags: string[];
  sessions: number;
  lastactive: string | null;
  customerName: string | null;
  count: number;
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string | null;
  jobTitle: string | null;
  companyId: number;
  tierId: number;
  isRegistered: number;
  storeId: number;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string | null;
  isSuperuser: boolean;
  customerType: string | null;
  isTaxableuser: boolean;
  industryId: number;
  customerRoleId: number;
  birthDate: string | null;
  gender: string | null;
  isForceAdminForResetPassword: boolean;
  resetPasswordRequestDate: string | null;
  resetPasswordChangedDate: string | null;
  forgotPasswordResetToken: string | null;
  klaviyoProfileId: string | null;
  isUseNet: boolean;
  customerLastActiveDate: string | null;
  memberFrom: number;
  memberTo: number;
  organizationId: number;
  primaryColor: string | null;
  mascotId: number | null;
  teamGender: string | null;
  timeOfYearPurchase: string | null;
  position: string | null;
  organizationName: string | null;
  primarySport: number;
  isCustomerPersonalization: boolean | null;
  leadUrl: string | null;
  sessionId: string;
  isTaxExemptStatus: boolean;
  recStatus: string;
  createdDate: string;
  createdBy: number | null;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface ICustomerCommonTableProps {
  API: any;
  id: string;
  companyId: string;
  columnHeaderDate: string;
  columnHeaderCount: string;
  accessorDate: string;
  columnNameDate: string;
  accessorViewCount: string;
  columnNameCount: string;
}

export const PRODUCT_TAB_OPTIONS = [
  { id: 0, label: "Purchased" },
  { id: 1, label: "Cart" },
  { id: 2, label: "Viewed" },
  { id: 3, label: "WishList" },
] as const;

export type ProductTabType = "purchased" | "cart" | "viewed" | "wishlist";

export interface ProductTab {
  id: ProductTabType;
  label: string;
}

export const PRODUCT_TABS: ITabOption[] = [
  { id: 0, label: "Purchased" },
  { id: 1, label: "Cart" },
  { id: 2, label: "Viewed" },
  { id: 3, label: "WishList" },
] as const;

export enum CustomerTabId {
  PERSONAL_DETAILS = 0,
  ORDERS = 1,
  PRODUCTS = 2,
  CUSTOM_LOGO = 3,
  CREDIT_INFO = 4,
  TIER_MANAGEMENT = 5,
  CONSULTATION_REQUEST = 6,
  NOTES = 7,
  PAYMENT_OPTIONS = 8,
  ABANDONED_CART = 9,
  EMAIL_LOG = 10,
  ACTIVITIES = 11,
  LIFE_CYCLE = 12,
  CUSTOMER_GIFT_CARD = 13,
}

// Create a type-safe tab configuration
export const tabOptions: ITabOption[] = [
  {
    id: CustomerTabId.PERSONAL_DETAILS,

    label: "Personal Details",
    icon: "Avatar",
  },
  {
    id: CustomerTabId.PRODUCTS,
    label: "Products",
    icon: "archive-box",
  },
  {
    id: CustomerTabId.CUSTOM_LOGO,
    label: "Custom Logo",
    icon: "store",
  },
  {
    id: CustomerTabId.CREDIT_INFO,
    label: "Credit Info",
    icon: "CopyIcon",
  },
  {
    id: CustomerTabId.TIER_MANAGEMENT,
    label: "Tier Management",
    icon: "document-invoice",
  },
  {
    id: CustomerTabId.CONSULTATION_REQUEST,
    label: "Consultation Request",
    icon: "document-invoice",
  },
  { id: CustomerTabId.NOTES, label: "Notes", icon: "Notes" },
  {
    id: CustomerTabId.PAYMENT_OPTIONS,
    label: "Payment Options",
    icon: "credit-card-01",
  },
  {
    id: CustomerTabId.ABANDONED_CART,
    label: "Abandoned Cart",
    icon: "shopping-cart-alert",
  },
  {
    id: CustomerTabId.EMAIL_LOG,
    label: "Email Log",
    icon: "mail-01",
  },
  {
    id: CustomerTabId.ACTIVITIES,
    label: "Activities",
    icon: "CopyIcon",
  },
  {
    id: CustomerTabId.LIFE_CYCLE,
    label: "Life Cycle",
    icon: "store",
  },
  {
    id: CustomerTabId.CUSTOMER_GIFT_CARD,
    label: "Customer Gift Card",
    icon: "gift-01",
  },
] as const;

export interface IAddressProps {
  customerInfo: {
    id?: number;
    customerAddress?: any[];
    companyName?: string;
  };
  setShippingAddressModal: (
    value: boolean | ((prev: boolean) => boolean)
  ) => void;
  setBillingAddressModal: (
    value: boolean | ((prev: boolean) => boolean)
  ) => void;
  getCustomerData: () => void;
  setEditAddressModalData: (data: any) => void;
}

export interface IPantone {
  pentonesCode: string;
  colorCode: string;
}

export interface ICustomLogo {
  customerLogoId: number;
  logo: string;
  logoName: string;
  logoNumber: string;
  logoSize: string;
  embroideryColor: string;
  customerLogoXPentonesViewModels: IPantone[];
  productType: string;
  logoLocation: string;
  logoLocationImage: string;
  uploadDate: string;
  approvedDate: string;
  status: string;
  approvedLogo: string;
  orderedCartLogoDetailId: number;
  rowVersion: string;
  orderShoppingCartItemsId: number;
  itemDecorationType: string;
  itemDecorationID: number;
  productId: number;
  logoStatus: string;
  prodURL: string;
  sewOutURL: string;
  runSheetURL: string;
  logoNotes: string;
  decorationTypeId: number;
  decorationTypeName: string;
  sewOutUrl: string | null;
  dstUrl: string | null;
}

export interface IEditCustomLogoProps {
  editCustomLogo: boolean;
  setEditCustomLogo: (value: boolean) => void;
  customLogo: ICustomLogo;
  onSuccess?: () => void;
}

export interface ICustomLogoFormValues {
  logoPosition: string;
  decorationType: string;
  logo: File | null;
  logoName?: string;
}

export interface IDropdownOption {
  value: string;
  label: string;
}

// Store option type for dropdown
export interface IStoreOption {
  label: string;
  value: number | string;
  icon?: string;
  storeEmailLogo?: string;
}

// Filtering option type
export interface IFilterOption {
  name: string;
  columnName: string;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  type: "checkbox" | "date" | "text" | "number";
  conditionalSearch?: boolean;
}

// Sorting option type
export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}

// Table cell props type
export interface ITableCellProps {
  row: {
    original: ICustomer;
  };
  getValue: () => any;
}

export interface ICustomLogoTableCellProps {
  row: {
    original: ICustomLogo;
  };
  getValue: () => any;
}

export const MORE_FILTER_OPTIONS: IFilterOption[] = [
  {
    name: "Customer BC ID",
    options: [],
    columnName: "navCustomerId",
    type: "checkbox",
    conditionalSearch: true,
  },
  {
    name: "Last Active Date",
    columnName: "lastactive",
    options: [],
    type: "date",
  },
  {
    name: "Created Date",
    columnName: "createddate",
    options: [],
    type: "date",
  },
  {
    name: "Updated Date",
    columnName: "modifiedDate",
    options: [],
    type: "date",
  },
];

export const COMMON_TABLE_SORTING_OPTIONS = [
  {
    field: "name",
    direction: 0,
    priority: 0,
  },
  {
    field: "category",
    direction: 0,
    priority: 0,
  },
  {
    field: "ourcost",
    direction: 0,
    priority: 0,
  },
  {
    field: "salePrice",
    direction: 0,
    priority: 0,
  },
  {
    field: "productCount",
    direction: 0,
    priority: 0,
  },
  {
    field: "ourSKU",
    direction: 0,
    priority: 0,
  },
];

export interface IActiveInactiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  isActive: boolean;
  onConfirm: () => void;
}

export interface IResetPasswordModalProps {
  setShowResetPassword: (value: boolean | ((prev: boolean) => boolean)) => void;
  showResetPassword: boolean;
  customerInfo: ICustomerInfo;
}

export interface IEditCustomerProps {
  id: string;
}
export interface IConsultationRequestTableCellProps {
  row: {
    original: IConsultationRequest;
  };
  getValue: () => any;
}

export interface IConsultationRequest {
  id: number;
  productId: number;
  productName: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  phone: string;
  contactMethod: number;
  desiredQuantity: string;
  inHandsDate: string;
  logoUrl: string;
  message: string;
  recStatus: string;
  gclid: string;
  submissionDate: string;
  color: string;
  productAttributeOptionId: number;
  storeid: number;
  storeName: string;
  storeLogoUrl: string;
  url: string;
  status: string;
}

export interface ICreditInfo {
  creditAmount: number;
  balanceAmount: number;
  reason: string;
  createdBy: string;
  createdDate: string;
}

export interface ICreditInfoTableCellProps {
  row: {
    original: ICreditInfo;
  };
  getValue: () => any;
}

export interface INotes {
  id: number;
  customerId: number;
  notes: string;
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

export interface IEmailLog {
  id: number;
  name: string;
  toEmail: string;
  status: string;
  clicked: boolean;
  opened: boolean;
  emailCount: number;
  sentAt: string;
  customerId: number;
  recStatus: string | null;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}
export interface IEmailLogTableCellProps {
  row: {
    original: IEmailLog;
  };
  getValue: () => any;
}

export interface IResendEmailProps {
  showResetEmailModel: boolean;
  setShowResetEmailModel: (value: boolean) => void;
  emailDataId: number;
}
export interface ISideBarProps {
  customerInfo: ICustomerInfo;
  setShowEdit: (value: boolean | ((prev: boolean) => boolean)) => void;
  StoreData: () => { isLinepersonalization?: boolean };
  getCustomerData?: () => void;
}

export interface ICustomerGiftCardForm {
  customerName: string;
  emailTo: string;
  serialNumber: string;
  orderNumber: string;
  initialAmount: string;
  balance: string;
  createdDate: string;
}