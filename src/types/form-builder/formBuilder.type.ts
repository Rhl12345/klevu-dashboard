import { ReactNode } from "react";
import { IDropdownOption } from "@/types/common/common.type";

// Add this enum to your types file
export enum FORM_TYPE {
  REQUEST = "requestForm",
  FILLED_UP = "filledUpForm",
}

export enum ADDRESS_TYPE {
  BILLING = "billing",
  SHIPPING = "shipping",
}
export interface IAddress {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface IFormBuilderValues {
  id: string | number;
  parentStoreId: number;
  name: string;
  url: string;
  formType: string;
  openDate: string | null;
  closeDate: string | null;
  publishDate: string | null;
  storeCode: string;
  customerContact: string;
  formLength: number;
  masterFormId: number;
  createdName: string;
  modifiedName: string;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
}

export interface IPaginationData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IFormBuilderMoreFilterOption {
  name: string;
  options: IDropdownOption[];
  type: string;
}

export interface IFormField {
  name: keyof ISetupFormValues;
  label: string;
  options: {
    type?: "input" | "dropdown";
    asterisk?: boolean;
    options?: { label: string; value: string }[];
  };
}

export interface IFormBuilderCloneModal {
  isOpen: boolean;
  onClose: () => void;
  editId: number | null;
  onSubmit: (values: IFormBuilderValues) => void;
  formbuilderData: IFormBuilderValues[];
}

export interface ISetupFormValues {
  id: string | number;
  rowVersion: string;
  name: string;
  parentStoreId: number;
  parentStore: string;
  url: string;
  programId: string | null;
  email: string;
  storeCode: string;
  formLength: number;
  formType: string;
  payBusinessMethodId: string;
  ccEmail: string;
  bccEmail: string;
  isReceiveEmail: boolean;
  openDate: string;
  closeDate: string;
  pdfPath: string;
  imagePath: string;
  embroideryPDF: string;
  laserFile: string;
  screenPrint: string;
  golfBallsLogo: string;
  embroideryDSTFile: string;
  isUseTemplate: boolean;
  formLogoPath: string;
  emailLogo: string;
  navCustomerId: string;
  navLocationCode: string;
  protectedPassword: string;
  isPasswordProtected: boolean;
  isSubmitOrder: boolean;
  showPrice: boolean;
  formProductId: string;
  publishDate: string;
  importProductSku: string;
  BCCustomerID: string;

  // Payment Information Initialvalues
  shippingMethodId: number;
  shippingCharges: number;
  shippingServiceId: string[];
  ExtraShippingMethodId: number[];
  // end

  shipSameasBilling: boolean;
  noEndDate: boolean;
  productLimitCount: number;
  shippingAddresses: IShippingAddress[];
}

export interface IShippingAddress {
  id: number;
  shipFirstName: string;
  shipLastName: string;
  shipCompany: string;
  shipAddress1: string;
  shipAddress2: string;
  shipCity: string;
  shipState: string;
  shipZipcode: string;
  shipCountry: string;
  shipPhone: string;
  shipEmail: string;
  formType: string;
  payBusinessMethodId: string;
  addressTitle: string;
}

export interface IPaymentInfoData {
  shippingMethodId: number;
  shippingCharges: number;
  shippingServiceId: string[];
  ExtraShippingMethodId: number[];
}

export interface IShippingMethod {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
}

export interface IStoreData {
  id: number;
  storeName: string;
  storeCode: string;
  storeType: string;
  storeStatus: string;
  storeLogo: string;
  storeBanner: string;
  emailLogo: string;
  navCustomerId: string;
  navLocationCode: string;
  protectedPassword: string;
  isPasswordProtected: boolean;
  isSubmitOrder: boolean;
  showPrice: boolean;
  formProductId: string;
  publishDate: string;
  importProductSku: string;
  formLength: number;
  formType: string;
  payBusinessMethodId: string;
  ccEmail: string;
  bccEmail: string;
  isReceiveEmail: boolean;
  openDate: string;
  closeDate: string;
  pdfPath: string;
  imagePath: string;
  embroideryPDF: string;
  laserFile: string;
  screenPrint: string;
  golfBallsLogo: string;
  embroideryDSTFile: string;
  isUseTemplate: boolean;
  formLogoPath: string;
  url?: string;
}

export interface IFormSetupProps {
  isAddMode: boolean;
  activeTab: number;
  setActiveTab: (values: number) => void;
  setFormSubmit: (values: IFormSetupRef) => void;
  setUseHandleSubmit: (values: boolean) => void;
  setFormType?: any;
  initialValues?: ISetupFormValues;

  setInitialValues?: (values: ISetupFormValues) => void;
  setSpecificFormData?: (values: ISetupFormValues) => void;
  setPaymentInfoData?: (values: IPaymentInfoData) => void;
  setInitialShippingMethod?: (values: IShippingMethod[]) => void;
  setCurrentStoreData?: (values: IStoreData) => void;
  setParentStore?: (values: IStoreData) => void;
  setShowPassword?: (values: boolean) => void;
  setTabState?: (values: boolean) => void;
  setIndex?: (values: number) => void;
  setFormRef?: (values: IFormSetupRef) => void;
  setIsAddMode?: (values: boolean) => void;
  index: number;
  id: string | number;
  storeName: string;
}

export interface IFormSetupRef {
  submitForm: () => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  getValues: () => ISetupFormValues;
  setValues: (values: ISetupFormValues) => void;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: any) => void;
}

export interface ITabConfig {
  label: string;
  component: ReactNode;
  id: string | number;
  storeName: string;
  tabsDisabled: boolean;
}

export interface IFormBuilderTabsProps {
  id: string | number;
  initialValues?: {
    storeName?: string;

    domainTypeId?: string;
    payByMethod?: number;
  };
  tabContent: ReactNode[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  formType: string;
}

export interface IFormShippingAddressInfoProps {
  countries: any[];
  states: any[];
  type: string;
  index: number;
  remove: (index: number) => void;
  insert: <T>(index: number, value: T) => void;

  push: (item: any) => void;
}

export interface IFormTypeSectionProps {
  payBusinessMethodIdStringOptions: { value: number; label: string }[];
}

// Form Theme Configuration
export interface IContactSectionProps {
  values: any;
  setFieldValue: any;
  errors: any;
}

export interface IColorpickerSectionProps {
  values: any;
  setFieldValue: any;
}

export interface ICardRadioGroupSectionProps {
  values: any;
  setFieldValue: any;
}
