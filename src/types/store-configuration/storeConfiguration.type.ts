interface ICustomScript {
  googleFontLink: string;
  fontFamilyName: string;
  customHeadScript: string;
  googleVerificationCode: string;
  customBodyScript: string;
  customFooterScript: string;
}

interface ISocialMediaLinks {
  facebookLink: string;
  twitterLink: string;
  pinterestLink: string;
  instagramLink: string;
  linkedinLink: string;
  youtubeLink: string;
}

interface IGoogleTags {
  twitterTag: {
    enabled: boolean;
    tagId: string;
  };
  dcTag: {
    enabled: boolean;
    tagCode: string;
  };
}

interface ICreateStoreConfiguration {
  id?: string;
}

interface IStoreConfigurationForm {
  // Store Info
  storeTypeId: string | number;
  name: string;
  code: string;
  url: string;
  navCode: string;
  prefix: string;
  parentstoreid?: number;
  billToCustomer?: string;
  brandId?: number[];
  blockCountryList?: string[];
  orderPlaceCountryList: string[];
  justInDays: number;
  storeLogo?: string;
  favIcon?: string;
  emailLogo?: string;

  // Login Type
  generalLogin: boolean;
  thirdPartyLogin: boolean;
  bothLogin: boolean;
  onlyGuestLogin: boolean;

  // Payment Options
  paymentOption: {
    [key: string]: {
      valBool: boolean;
    };
  };

  // Punch Out Message
  punchoutMessage?: string;

  // Shipping Charges
  shippingChargeType: string | number;
  shippingServiceId?: number[];
  shippingMethodId?: number[];
  isFreeShipping: boolean;
  generalAmount: string;

  // Toggle Configurations
  isLandingPage: boolean;
  isSeoMarketing: boolean;
  isBlogPage: boolean;
  isAttributeSaparateProduct: boolean;
  isQuantityDiscount: boolean;
  isAllowToReuseApprovedLogo: boolean;
  isProductReadinessAllow: boolean;
  isSeoReadinessAllow: boolean;
  checkOutRequiredThirdPartyLogin: boolean;
  isCustomerRegistrationApprovalRequired: boolean;
  isReviewMaster: boolean;
  isOrganizationName: boolean;
  IsGA4: boolean;
  isPriceSync: boolean;
  IsAddToCartRequiredForStore: boolean;
  IsLoginRequiredForStore: boolean;
  isAllowEmployeeLogin: boolean;
  isBrandDiscount: boolean;
  isLogoCustomization: boolean;
  isGiftCardValidatebyEmail: boolean;
  isAllowZeroPriceProduct: boolean;
  isAllowDropShip: boolean;
  isCreateLeadonAccountCreate: boolean;
  isCreateLeadonApproval: boolean;
  isAddToCartPriceGroup: boolean;

  // Logo Related
  isFirstLogoFree: boolean;
  firstLogoCharge: string;
  secondLogoCharge: string;

  // Domain Based Login
  domainBasedLogin: boolean;
  domainBasedLoginDesc?: string;

  // Sew Out
  isSewOutEnable: boolean;
  sewOutCharges?: number;

  // Logo Setup
  isLogoSetupCharges: boolean;
  logoSetupCharges?: string;

  // Line Personalization
  isLinepersonalization: boolean;
  firstLineCharges?: number;
  secondLineCharges?: number;

  // Small Run
  isSmallRun: boolean;
  smallRunLimit?: number;
  smallRunFeesCharges?: number;

  // Custom Scripts
  googleFontLink: string;
  fontFamilyName: string;
  customHeadScript: string;
  googleVerificationCode: string;
  customBodyScript: string;
  customFooterScript: string;
}

interface IStoreType {
  id: number;
  name: string;
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

interface IStore {
  createdName: string;
  modifiedName: string;
  ofProducts: number;
  storeTypeName: string;
  id: number;
  storeTypeId: number;
  storeType: IStoreType;
  name: string;
  code: string;
  url: string;
  navCode: string;
  prefix: string;
  logoUrl: string;
  isLandingPage: boolean;
  isBlogPage: boolean;
  isReviewMaster: boolean;
  isSeoMarketing: boolean;
  isAttributeSaparateProduct: boolean;
  attributeid: number;
  isQuantityDiscount: boolean;
  isFirstLogoFree: boolean;
  isLinepersonalization: boolean;
  firstLineCharges: number;
  secondLineCharges: number;
  isSmallRun: boolean;
  smallRunLimit: number;
  smallRunFeesCharges: number;
  isLogoSetupCharges: boolean;
  logoSetupCharges: number;
  isProductReadinessAllow: boolean;
  isSeoReadinessAllow: boolean;
  shippingChargeType: number;
  isFreeShipping: boolean;
  generalAmount: number;
  punchoutMessage: string | null;
  checkOutRequiredThirdPartyLogin: boolean;
  domainBasedLogin: boolean;
  domainBasedLoginDesc: string | null;
  generalLogin: boolean;
  thirdPartyLogin: boolean;
  bothLogin: boolean;
  onlyGuestLogin: boolean;
  isBrandStore: boolean;
  storeBrandId: number;
  parentstoreid: number;
  billToCustomer: string | null;
  favicon: string | null;
  isCustomerRegistrationApprovalRequired: boolean;
  isAllowToReuseApprovedLogo: boolean;
  isLoginRequiredForStore: boolean;
  isSewOutEnable: boolean;
  sewOutCharges: number;
  isCustomerLogoApproval: boolean;
  isOrganizationName: boolean;
  codeName: string;
  navLocationCode: string | null;
  storeDisplayOrder: number;
  isGA4: boolean;
  isPriceSync: boolean;
  emailLogo: string;
  isAddToCartRequiredForStore: boolean | null;
  isAllowEmployeeLogin: boolean;
  firstLogoCharge: number | null;
  secondLogoCharge: number | null;
  isBrandDiscount: boolean | null;
  isLogoCustomization: boolean;
  isPersonalization: boolean;
  isGiftCardValidatebyEmail: boolean;
  isStoreLive: boolean;
  isAllowZeroPriceProduct: boolean;
  isAllowDropShip: boolean;
  isCreateLeadonApproval: boolean;
  isCreateLeadonAccountCreate: boolean;
  isAddToCartPriceGroup: boolean;
  justInDays: number;
  adminApiUrl: string;
  frontApiUrl: string;
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

interface IStoreResponse {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: IStore[];
}

interface IStoreDropDownData {
  value: string;
  label: string;
}

interface IHeaderAnnouncementRow {
  isVisible: boolean;
  leftSideText: string;
  rightSideText: string;
  textColor: string;
  backGroundColor: string;
}

interface IHeaderTemplate {
  id: number;
  header_bg_color: string;
  header_text_color: string;
  first_icon: boolean;
  second_icon: boolean;
  third_icon: boolean;
  forth_icon: boolean;
  fifth_icon: boolean;
  announcementRow: IHeaderAnnouncementRow[];
  [key: string]: any;
}

interface IGeneralSetting {
  emailAddress: string;
  phoneNumber: string;
  companyAddress: string;
  customCSS: string;
  footerContent: string;
}

interface IStoreTemplateConfig {
  templateID: number;
  breadCrumbTemplateId: number;
  bannertype: string;
  cartPageTemplateId: number;
  promotionalText1: string;
  promotionalText2: string;
  someKey: string;
  [key: string]: any;
}

interface IStoreComponent {
  Component: string;
  name: string;
  options?: { value: string; label: string }[];
  title?: string;
  conditionalRender?: string;
  conditionalValue?: string;
}

export type {
  IStore,
  IStoreDropDownData,
  ICreateStoreConfiguration,
  IStoreResponse,
  IStoreConfigurationForm,
  IHeaderAnnouncementRow,
  IHeaderTemplate,
  IStoreTemplateConfig,
  IGoogleTags,
  ISocialMediaLinks,
  ICustomScript,
  IStoreComponent,
  IGeneralSetting,
};

export enum StoreConfigurationTab {
  PRODUCT_LISTING = "productListing",
  PRODUCT_DETAIL = "productDetail",
  MY_ACCOUNT_PAGE = "myAccountPage",
  CART_PAGE = "cartPage",
}

export const StoreConfigurationPages = [
  { value: StoreConfigurationTab.PRODUCT_LISTING, label: "Product Listing" },
  { value: StoreConfigurationTab.PRODUCT_DETAIL, label: "Product Detail" },
  { value: StoreConfigurationTab.MY_ACCOUNT_PAGE, label: "My Account Page" },
  { value: StoreConfigurationTab.CART_PAGE, label: "Cart Page" },
];
