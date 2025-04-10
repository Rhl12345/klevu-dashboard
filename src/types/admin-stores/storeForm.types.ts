import { FormikProps } from "formik";
import { ICustomerAddress } from "@/types/customer/customer.type";
import {
  IDstFormValues,
  IDthFormValues,
  IEngFormValues,
  IGbpFormValues,
  IPerFormValues,
  IScrFormValues,
} from "./general.type";

export interface ICreateStoreFormValues {
  storeName: string;
  domainTypeId: string;
  payByMethod: number;
}

export type TModalType =
  | "add"
  | "delete"
  | "applyToAll"
  | "edit"
  | "threadInfo"
  | null;

export interface ISetUpTabsProps {
  id?: string | number;
}

export interface IApplyToAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface IModalState {
  isOpen: boolean;
  type: "delete" | "activeInactive" | "createModal" | "edit" | "clone" | null;
}

export interface IStoreEditCreate {
  id?: string | number;
  initialValues?: Record<string, any>;
  storeId: string;
  storeType: string;
  storeName: string;
}

export interface IProductTabProps
  extends Omit<IStoreEditCreate, "id" | "initialValues"> {}

export interface IStoreData {
  id: number;
  image: string;
  name: string;
  domain: string;
  contact: string;
  openDate: string;
  createdTime: string;
  closeDate: string;
  programId: string;
  orders: string;
  product: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  status: string;
  storeCode?: string;
  emailLogo?: string;
}

export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}

export interface IFilterOption {
  filter: string;
  name: string;
}

export interface IStoreFormValues {
  businessName: string;
  businessCategory: string;
  storeDisplayName: string;
  programId: string;
  email: string;
  domainTypeId: string;
  payByMethod: number;
  salesPerson: string;
  teamName: string;
  accessUrl: string;
  storeOwnerFirstName: string;
  storeOwnerLastName: string;
  storeName: string;
  password: string;
  bcCustomerId: string;
  bcLocationCode: string;
  estShipDate: Date;
  followUpDays: string;
  isPasswordProtected: boolean;
  jobTitle: string;
  department: string;
  company: string;
  storeOwnerEmail: string;
  streetAddress: string;
  aptSuite: string;
  zipCode: string;
  storeCity: string;
  storeLogo: string;
  emailLogo: string;
  openStoreDate: Date;
  closeStoreData: Date;
  storeOwnerCountry: string;
  storeOwnerState: string;
  storePhone: string;
  customerAddress: ICustomerAddress[];
}

export interface IBusinessOption {
  value: string;
  label: string;
}

export interface IGeneralTabProps {
  formik: FormikProps<IStoreFormValues>;
}

export interface IGeneralStoreAddressForm extends IGeneralTabProps {
  type: "billing" | "shipping";
  index: number;
  values: ICustomerAddress;
}
export interface IGeneralModalOption {
  modalName: string;
  active: boolean;
}

export interface ILogoData {
  logoNo: string;
  logoFile: string;
  logoType: string;
  dstFile: string;
  sewOut: string;
  sewOutProofFile: string;
  stitchCount: number;
  description: string;
}

export interface IThreadGroupData {
  logoNo: string;
  groupName: string;
  groupDescription: string;
  threadBrand: string;
  threadGroupColorOption: string;
  createdDate: {
    date: string;
    time: string;
  };
  createdBy: string;
  updatedDate: {
    date: string;
    time: string;
  };
  updatedBy: string;
  status: string;
}

export interface IAddProductDecoration {
  isOpen: boolean;
  onClose: () => void;
  formValues:
    | IDthFormValues
    | IDstFormValues
    | IEngFormValues
    | IGbpFormValues
    | IPerFormValues
    | IScrFormValues
    | ILogoData
    | null;
  selectedForm: string;
}

export interface IStoreSetupItem {
  id: number;
  label: string;
  checked: boolean;
}

export interface IAddBusinessModalProps {
  isOpen: IGeneralModalOption;
  onClose: () => void;
  onAdd: (newBusiness: IBusinessOption) => void;
  currentLength: number;
}

export interface IThreadInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IColorAndComment {
  color: string;
  comment: string;
  threadBrand: string;
}
