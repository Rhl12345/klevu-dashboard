export interface ISpecialRequestDataModal {
  handleShowModal: () => void;
  modalInformation: IUserRequestDetails | undefined;
  isOpen: boolean;
  showSubmitButton?: boolean;
}

export interface IUserRequestDetails {
  countryName: string;
  stateName: string;
  storeName: string;
  createdName: string;
  modifiedName: string;
  id: number;
  storeID: number;
  first_name: string | null;
  last_name: string | null;
  email: string ;
  phone: string ;
  inHandDate: string ;
  shipFirstName: string ;
  shipLastName: string ;
  shipAddress1: string ;
  shipZipCode: string ;
  shipCity: string;
  shipStateId: number;
  shipCountryId: number;
  requestGiveAway: boolean;
  eventName: string;
  targetAudience: string;
  reason: string;
  budget: number;
  quantity: number;
  color: string;
  ideas: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  specialRequest: string;
  logo: string;
  beforeInHandDate: string;
  organizationName: string;
  itemName: string;
  shipAddress2: string;
  reasonForGiveAwayPurpose: string;
  additionalCommentsOrRequest: string;
  ideasParticularItemsOfInterest: string;
  isDesiredBrandingUnitiLogo: boolean;
  isDesiredBrandingOtherExistingLogo: boolean;
  isDesiredBrandingNewLogoOrGraphic: boolean;
  isBeforeInHand: boolean;
  message: string;
  sport: string;
  brandPreference: string;
  gender: string | null;
  city: string | null;
  state: string | null;
  organizationType: string | null;
  mascot: string | null;
  toNumber: string | null;
  fromNumber: string | null;
  purchaseMonth: string | null;
  isCustomization: boolean | null;
  aboutRequestType: string | null;
  teamNeedsMessage: string | null;
  teamStoreNeedsMessage: string | null;
  needTeamStore: boolean | null;
  shipStateName: string | null;
  recStatus: string;
  created_date: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}

export interface IFieldConfig {
  label: string;
  value: string | number | boolean | null;
  type: "text" | "date" | "boolean" | "address" | "image";
}

// Add form field type
export type IFormFieldName = string; // You could make this more specific by listing all possible field names

export interface ISortingOption {
  field: string;
  direction: 0 | 1 | -1; // Better type safety for direction
  priority: number;
}

export interface IPaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IFormValues {
  [key: string]: string | number | boolean | null;
}
