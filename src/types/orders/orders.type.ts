export interface IOrderJourney {
  id: number;
  createdName: string;
  status: string;
  orderNumber: number;
  logStatusId: number;
  logDescription: string;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: number | null;
  rowVersion: string | null;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface IOrderJourneyCellProps {
  row: {
    original: IOrderJourney;
  };
  getValue: () => any;
}

export interface IOrderDetail {
  orderNumber: number;
  orderDate: string;
  customerId: number;
  storeId: number;
  storeName: string;
  storeLogo: string;
  shippingTackingNumber: string | null;
  shippedVIA: string | null;
  shippedVIAID: number;
  shippedOn: string | null;
  refenceOrderID: string;
  isPhoneOrder: boolean;
  orderStatus: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  channel: string;
  orderNotes: string;
  internalNotes: string;
  shippedNotes: string | null;
  orderDocumnets: string[];
  tags: string;
  subTotal: number;
  total: number;
  taxType: string;
  tax: number;
  shippingType: string;
  shipping: number;
  feeType: string;
  fee: number;
  othersType: string;
  others: number;
  discountsType: string;
  discounts: number;
  additionalCost: number;
  isPrintedSlip: boolean;
  isPrinted: boolean;
  billingEqualsShipping: boolean;
  orderSubType: string;
  previousOrderId: number;
  nextOrderId: number;
  totalItems: number;
  isBlockIpAddress: boolean;
  isNavError: boolean;
  navErrorDate: string;
  navErrorDesc: string | null;
  isNavImport: boolean;
  navImportDate: string;
  isNavShipped: boolean;
  navShippedDate: string;
  adjAmount: number;
  endUserName: string;
  decorationDate: string;
  authorizeDate: string;
  inHandDate: string;
  transactionId: string;
  transactionType: string;
  paymentMethod: string;
  smallRunFee: number;
  logoSetupFee: number;
  navCustomerID: string;
  navOrderStatus: string;
  navDocumentNumber: string;
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  empSourceName: string;
  empSourceMedium: string;
  couponCode: string;
  lineFinalTotal: number;
  referrer: string;
  customFieldTotal: number;
  storeCredit: number;
  empSalesRap: string;
  salesRepName: string;
  cardProcessingFees: number;
  orderProofingStatus: string;
  authorizationCode: string;
  navEmpId: number;
  shippingAddress: IOrderDetailAddress;
  billingAddress: IOrderDetailAddress;
}

export interface IOrderDetailAddress {
  orderId: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  company: string;
  suite: string;
  phone: string;
  fax: string | null;
  countryCode: string;
  stateCode: string;
  addressType: string;
}

export interface ICustomerNotes {
  createdDate: string;
  subRows: ICustomerNotesRow[];
}

export interface ICustomerNotesRow {
  id: number;
  orderNumber: number;
  createdName: string | null;
  title: string;
  description: string;
  createdTime: string;
  createdDateDisplay: string;
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

export interface IOrderLogo {
  customerLogoId: number;
  logo: string;
  logoName: string;
  logoNumber: string;
  logoSize: string | null;
  embroideryColor: string | null;
  customerLogoXPentonesViewModels: [];
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
  sewOutUrl: string;
  dstUrl: string;
}

export interface IOrderLogoCellProps {
  row: {
    original: IOrderLogo;
  };
  getValue: () => any;
}

export interface OrderAddressModalProps {
  type: string;
  orderDetail: IOrderDetail;
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
}

export interface IOrderLineItem {
  id: number;
  orderShoppingCartItemsId: number;
  attributeOptionId: number;
  colorImage: string;
  color: string;
  productName: string;
  productId: number;
  sku: string;
  attributeOptionValue: string;
  seName: string;
  unitPrice: number;
  displayOrderSize: number | null;
  availableQty: number;
  qty: number;
  shippedQty: number;
  estimateCost: number;
  estimateCostPerQty: number;
  price: number;
  subTotal: number;
  isItemCancel: boolean;
  createdName: string;
  modifiedName: string;
  recStatus: string;
  createdDate: string;
  createdBy: string | null;
  modifiedDate: string | null;
  modifiedBy: string | null;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
  shoppingCartLogoPersonViewModels?: IShoppingCartLogoPersonViewModel[];
  shoppingCartLineSizeListViewModel?: IShoppingCartLineSizeListViewModel[];
  displayLineAttributeOptions?: ILineAttributeOptions[];
  itemNotes: string | null;
}

export interface ILineAttributeOptions {
  attributeOptionName: string;
  linePersonalizeDetails?: ILinePersonalizeDetails[];
}

export interface ILinePersonalizeDetails {
  font: string;
  color: string;
  location: string;
  line1Text: string;
  line2Text: string;
}
export interface IShoppingCartLogoPersonViewModel {
  id: number;
  customerLogoId: number;
  logoNumber: string;
  approvedDate: string | null;
  logoStatus: string | null;
  prodURL: string | null;
  sewOutURL: string | null;
  runSheetURL: string | null;
  itemDecorationID: number;
  finalLogoNumber: string;
  logoSize: string;
  logoColor: string;
  rowVersion: string;
  logoImagePath: string;
  logoPrice: number;
  logoLocation: string;
  logoName: string;
  logoPositionImage: string;
  isSewOut: boolean;
  sewOutAmount: number;
  status: string;
  unitLogoPrice: number;
  logoNotes: string | null;
  logoUniqeId: string | null;
  decorationType: string | null;
}

export interface IShoppingCartLineSizeListViewModel {
  id: number;
  sizeId: number;
  sizeName: string;
  qty: number;
  price: number;
  orderedshoppingcartlineonepersonviewmodel: IOrderedShoppingCartLinePersonViewModel[];
  orderedshoppingcartlinetwopersonviewmodel: IOrderedShoppingCartLinePersonViewModel[];
}

export interface IOrderedShoppingCartLinePersonViewModel {
  id: number;
  cartLinePersonId: number;
  linePrice: number;
  lineqty: string;
  lineabovelogo: number;
  lineindividually: number;
  lineNumber: number;
  linetext: string;
  linetotal: number;
  linefont: string;
  linecolor: string;
  sku: string | null;
  size: string | null;
  name: string | null;
  parentId: number;
  personalizeLocation: string;
}
