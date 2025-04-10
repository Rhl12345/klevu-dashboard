import { ITabOption } from "@/components/Tab/types";
import { IDropdownOption, IMoreFilterOption } from "@/types/common/common.type";
import { ICouponCodeList } from "@/types/promotions/promotions.type";

// Add dummy store options
export const storeOptions: IDropdownOption[] = [
  { value: "store1", label: "Store One" },
  { value: "store2", label: "Store Two" },
  { value: "store3", label: "Store Three" },
  { value: "store4", label: "Store Four" },
];

// First, convert the tabItems to the format expected by the Tab component
export const tabOptions: ITabOption[] = [
  { id: 0, label: "All", recordCount: 0 },
  { id: 1, label: "Active", recordCount: 0 },
  { id: 2, label: "Scheduled", recordCount: 0 },
  { id: 3, label: "Expired", recordCount: 0 },
  { id: 4, label: "Inactive", recordCount: 0 },
];

export const userNameValues: IDropdownOption[] = [
  {
    value: "133",
    label: "Aakash  Chaudhary",
  },
  {
    value: "93",
    label: "Alex Alutto",
  },
  {
    value: "82",
    label: "Alex Dumais",
  },
  {
    value: "47",
    label: "Alex Pohl",
  },
  {
    value: "40",
    label: "Alexis Bernard",
  },
  {
    value: "24",
    label: "Allysa Beaton",
  },
  {
    value: "4",
    label: "Alpesh Prajapati",
  },
  {
    value: "44",
    label: "Amanda Rosenberg",
  },
];

export const moreFilterOption: IMoreFilterOption[] = [
  {
    columnName: "discountName",
    name: "Discount Name",
    type: "checkbox",
    options: [],
  },
  {
    columnName: "store",
    name: "Store",
    type: "checkbox",
    options: [],
  },
  {
    columnName: "modifieddate",
    name: "Updated Date",
    type: "date",
    options: null,
  },
  {
    columnName: "createdby",
    name: "Created By",
    type: "checkbox",
    options: userNameValues,
    conditionalSearch: true,
  },
  {
    columnName: "modifiedby",
    name: "Updated By",
    type: "checkbox",
    options: userNameValues,
    conditionalSearch: true,
  },
];

// Apply the type to the coupon code array
export const couponCode: ICouponCodeList[] = [
  {
    id: 90,
    name: "BBTAKE10",
    status: "E",
    storeName: "Boston Beer",
    storeImage: "/storagemedia/1/store/logo_14.gif",
    discountCode: "BBTAKE10",
    createdName: "Tejas Daftary",
    modifiedName: "Anand Kumar",
    couponUsedCount: 0,
    startdate: "2023-11-03T01:00:00",
    enddate: "2024-01-31T13:00:00",
    starttimne: "1:0",
    endTime: "13:0",
    storeid: 14,
    recStatus: "A",
    createdDate: "2023-08-07T03:11:13.1243068",
    createdBy: 81,
    modifiedDate: "2024-03-06T08:31:59.8331746",
    modifiedBy: 159,
    rowVersion: "kAxN5Lc93Ag=",
    location: "RI",
    ipAddress: "27.54.168.197",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 88,
    name: "Bm",
    status: "E",
    storeName: "Bacardi",
    storeImage: "/storagemedia/1/store/logo_15.png",
    discountCode: "1111111",
    createdName: "Bhargav Yadav",
    modifiedName: "Aryan  Singh",
    couponUsedCount: 0,
    startdate: "2023-08-03T04:30:00",
    enddate: "2023-08-31T04:30:00",
    starttimne: "4:30",
    endTime: "4:30",
    storeid: 15,
    recStatus: "I",
    createdDate: "2023-08-03T05:39:28.3028246",
    createdBy: 65,
    modifiedDate: "2023-08-28T08:57:44.0068627",
    modifiedBy: 76,
    rowVersion: "OA7N16Sn2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 78,
    name: "CgDateNotStarted",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "25e9e7",
    createdName: "Divyesh Shah",
    modifiedName: "Bhargav Yadav",
    couponUsedCount: 1,
    startdate: "2023-07-07T00:56:00",
    enddate: "2023-08-31T03:30:00",
    starttimne: "0:56",
    endTime: "3:30",
    storeid: 5,
    recStatus: "I",
    createdDate: "2023-06-30T01:07:57.2730606",
    createdBy: 66,
    modifiedDate: "2023-08-03T05:53:04.9875673",
    modifiedBy: 65,
    rowVersion: "khLd5+WT2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 86,
    name: "CGPK15",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "CGPK15",
    createdName: "Tejas Daftary",
    modifiedName: " ",
    couponUsedCount: 2,
    startdate: "2023-07-26T00:00:00",
    enddate: "2023-07-31T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-07-26T08:44:34.2826498",
    createdBy: 81,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "1vJ0ibSN2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 5,
    name: "CGTestFixed Amount$20All ProductsMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "5309b6",
    createdName: "Priya Chitlangia",
    modifiedName: "Chandan Kumar",
    couponUsedCount: 0,
    startdate: "2023-06-08T00:00:00",
    enddate: "2023-06-24T04:00:00",
    starttimne: "0:0",
    endTime: "4:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:00:33.8020052",
    createdBy: 70,
    modifiedDate: "2023-07-14T11:12:15.6505186",
    modifiedBy: 67,
    rowVersion: "WFZJLluE2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 12,
    name: "CGTestFixed Amount$20BrandsMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "eac4bf",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-08T00:00:00",
    enddate: "2023-06-09T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:12:40.9385069",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "dfl8RhFo2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 16,
    name: "CGTestFixed Amount$20CategoryMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "30dc90",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-08T00:00:00",
    enddate: "2023-06-09T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:24:03.3600779",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "+T0+3RJo2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 22,
    name: "CGTestFixed Amount$20Specific ProductsMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "69ed13",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-08T05:30:00",
    enddate: "2023-06-09T05:30:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:47:46.5168215",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "EbuCLRZo2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 61,
    name: "CGTestFixedAmount23AllProductsMRMinimumQuantityofItemsCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "5a8584",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-07-01T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T10:41:50.7924885",
    createdBy: 70,
    modifiedDate: "2023-06-20T08:11:09.1434267",
    modifiedBy: 70,
    rowVersion: "aPBt52Vx2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 48,
    name: "CGTestFixedAmount25AllBrandsMRNoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "d05f22",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-07-01T00:00:00",
    enddate: "2023-08-05T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T09:38:45.6355955",
    createdBy: 70,
    modifiedDate: "2023-06-20T08:14:29.5912464",
    modifiedBy: 70,
    rowVersion: "U9nnXmZx2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 64,
    name: "CGTestFixedAmount43AllProductsMRMinimumQuantityofItemsLimitToNumberOfUsePerCustomerNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "f50b2b",
    createdName: "Priya Chitlangia",
    modifiedName: "Bhargav Yadav",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-30T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T10:51:38.5234556",
    createdBy: 70,
    modifiedDate: "2023-08-29T06:13:09.6103402",
    modifiedBy: 65,
    rowVersion: "+2qdBFeo2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 51,
    name: "CGTestFixedAmount44AllCategoryMRNoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "0e2979",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-15T05:30:00",
    enddate: "2023-07-29T05:30:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T09:57:01.9771392",
    createdBy: 70,
    modifiedDate: "2023-06-20T08:13:56.4996297",
    modifiedBy: 70,
    rowVersion: "I3guS2Zx2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 19,
    name: "CGTestFixedAmount70ProductsMRNoneSpecificCustomersAmountNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "eff9d3",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-23T00:00:00",
    enddate: "2023-06-30T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:32:26.9059472",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "pD5hCRRo2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 58,
    name: "CGTestFixedAmount84SpecificProductsMRNoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "d12a2b",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-30T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T10:31:42.2393642",
    createdBy: 70,
    modifiedDate: "2023-06-20T08:13:30.8705668",
    modifiedBy: 70,
    rowVersion: "wsjnO2Zx2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 26,
    name: "CGTestFixedAmount90ProductNinimum QuantityOfItemsLimitToOneUsePerCustomerNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "0df2ef",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-07-01T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T07:23:38.2945056",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "LTYgcHFt2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 25,
    name: "CGTestFixedAmount90ProductsMRMinimumQuantityOfItemsLimitToOneUsePerCustomerNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "CGTestFixedAmount65",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-07-01T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T07:01:19.200357",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "37T2UW5t2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 21,
    name: "CGTestFixedAmount90ProductsMRMkinimumPurchaseAmountEveryMonthNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "84e1be",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-28T00:00:00",
    enddate: "2023-06-30T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:40:41.6982161",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "gY1MMBVo2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 59,
    name: "CGTestFixedAmount94AllProductsMRMinimuPurchaseAmountCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "1a09a9",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-07-01T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T10:37:24.7073629",
    createdBy: 70,
    modifiedDate: "2023-06-20T08:11:54.4229106",
    modifiedBy: 70,
    rowVersion: "AgtrAmZx2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 10,
    name: "CGTestFree Shipping$20BrandsMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "398a33",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-08T05:30:00",
    enddate: "2023-08-16T05:30:00",
    starttimne: "0:0",
    endTime: "5:30",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:11:49.4355538",
    createdBy: 70,
    modifiedDate: "2023-06-21T11:05:25.6192178",
    modifiedBy: 70,
    rowVersion: "90Vjakdy2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 17,
    name: "CGTestFree Shipping$20CategoryMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "eb4236",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-08T00:00:00",
    enddate: "2023-07-01T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:25:28.2101728",
    createdBy: 70,
    modifiedDate: "2023-06-21T11:01:40.8100935",
    modifiedBy: 70,
    rowVersion: "cR9k5EZy2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 23,
    name: "CGTestFree Shipping$20Specific ProductsMRnoneCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "4b86cf",
    createdName: "Priya Chitlangia",
    modifiedName: "Priya Chitlangia",
    couponUsedCount: 0,
    startdate: "2023-06-08T00:00:00",
    enddate: "2023-07-01T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-08T11:57:49.5509095",
    createdBy: 70,
    modifiedDate: "2023-06-21T11:19:16.5142831",
    modifiedBy: 70,
    rowVersion: "e86jWUly2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 27,
    name: "CGTestFree ShippingAll ProductsMinimum purchase amount($)CustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "8af9c4",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-16T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T07:39:08.878833",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "bxDMmnNt2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 45,
    name: "CGTestFree ShippingAll ProductsMinimum purchase amount($)Specific CustomersNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "5e5700",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-16T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T09:15:51.7966286",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "wgybHYFt2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 31,
    name: "CGTestFree ShippingAll ProductsMinimum quantity of itemsCustomerAllNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "020cb5",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-16T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T07:51:09.2414924",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "w64qSHVt2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 50,
    name: "CGTestFree ShippingAll ProductsMinimum quantity of itemsSpecific CustomersNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "38c447",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-16T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T09:56:08.7469179",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "CnU4voZt2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
  {
    id: 51,
    name: "CGTestFree ShippingAll ProductsMinimum quantity of itemsSpecific CustomersNoSchedule",
    status: "E",
    storeName: "Corporate Gear",
    storeImage: "/storagemedia/1/store/logo_5.svg",
    discountCode: "38c447",
    createdName: "Priya Chitlangia",
    modifiedName: " ",
    couponUsedCount: 0,
    startdate: "2023-06-15T00:00:00",
    enddate: "2023-06-16T00:00:00",
    starttimne: "0:0",
    endTime: "0:0",
    storeid: 5,
    recStatus: "A",
    createdDate: "2023-06-15T09:56:08.7469179",
    createdBy: 70,
    modifiedDate: null,
    modifiedBy: null,
    rowVersion: "CnU4voZt2wg=",
    location: "RI",
    ipAddress: "127.0.0.0",
    macAddress: "00-00-00-00-00-00",
    viewOrders: "View Orders",
  },
];

export const popUpTableData = [
  {
    srno: 1,
    productName: "Protein Shake",
    sku: "SNK-001",
    storeName: "HealthyLife",
    totalQuantity: 10,
  },
  {
    srno: 2,
    productName: "Energy Bars",
    sku: "SNK-002",
    storeName: "ParsonsKellogg",
    totalQuantity: 4,
  },
  {
    srno: 3,
    productName: "Granola Mix",
    sku: "SNK-003",
    storeName: "FitBites",
    totalQuantity: 8,
  },
  {
    srno: 4,
    productName: "Organic Almonds",
    sku: "SNK-004",
    storeName: "GreenGrocers",
    totalQuantity: 12,
  },
  {
    srno: 5,
    productName: "Vegan Cookies",
    sku: "SNK-005",
    storeName: "SweetTreats",
    totalQuantity: 6,
  },
  {
    srno: 6,
    productName: "Fruit Chips",
    sku: "SNK-006",
    storeName: "NatureBites",
    totalQuantity: 15,
  },
  {
    srno: 7,
    productName: "Chia Seeds",
    sku: "SNK-007",
    storeName: "HealthStore",
    totalQuantity: 9,
  },
  {
    srno: 8,
    productName: "Nut Butter",
    sku: "SNK-008",
    storeName: "WellnessMarket",
    totalQuantity: 7,
  },
  {
    srno: 9,
    productName: "Rice Cakes",
    sku: "SNK-009",
    storeName: "SnackCorner",
    totalQuantity: 5,
  },
  {
    srno: 10,
    productName: "Dried Mango",
    sku: "SNK-010",
    storeName: "TropicalFoods",
    totalQuantity: 11,
  },
  {
    srno: 11,
    productName: "Quinoa Chips",
    sku: "SNK-011",
    storeName: "FitBites",
    totalQuantity: 14,
  },
  {
    srno: 12,
    productName: "Peanut Butter Cups",
    sku: "SNK-012",
    storeName: "ChocoHeaven",
    totalQuantity: 3,
  },
  {
    srno: 13,
    productName: "Seaweed Snacks",
    sku: "SNK-013",
    storeName: "OceanBites",
    totalQuantity: 8,
  },
  {
    srno: 14,
    productName: "Dark Chocolate",
    sku: "SNK-014",
    storeName: "ChocoHeaven",
    totalQuantity: 10,
  },
  {
    srno: 15,
    productName: "Kale Chips",
    sku: "SNK-015",
    storeName: "NatureBites",
    totalQuantity: 7,
  },
  {
    srno: 16,
    productName: "Pumpkin Seeds",
    sku: "SNK-016",
    storeName: "GreenGrocers",
    totalQuantity: 5,
  },
  {
    srno: 17,
    productName: "Mixed Nuts",
    sku: "SNK-017",
    storeName: "WellnessMarket",
    totalQuantity: 11,
  },
  {
    srno: 18,
    productName: "Coconut Chips",
    sku: "SNK-018",
    storeName: "TropicalFoods",
    totalQuantity: 6,
  },
  {
    srno: 19,
    productName: "Berry Mix",
    sku: "SNK-019",
    storeName: "HealthyLife",
    totalQuantity: 9,
  },
  {
    srno: 20,
    productName: "Gluten-Free Crackers",
    sku: "SNK-020",
    storeName: "SnackCorner",
    totalQuantity: 4,
  },
  {
    srno: 21,
    productName: "Cashew Butter",
    sku: "SNK-021",
    storeName: "WellnessMarket",
    totalQuantity: 8,
  },
  {
    srno: 22,
    productName: "Protein Chips",
    sku: "SNK-022",
    storeName: "FitBites",
    totalQuantity: 10,
  },
  {
    srno: 23,
    productName: "Soy Jerky",
    sku: "SNK-023",
    storeName: "PlantPower",
    totalQuantity: 6,
  },
  {
    srno: 24,
    productName: "Organic Popcorn",
    sku: "SNK-024",
    storeName: "GreenGrocers",
    totalQuantity: 12,
  },
  {
    srno: 25,
    productName: "Mushroom Chips",
    sku: "SNK-025",
    storeName: "NatureBites",
    totalQuantity: 5,
  },
  {
    srno: 26,
    productName: "Hemp Seeds",
    sku: "SNK-026",
    storeName: "HealthStore",
    totalQuantity: 7,
  },
  {
    srno: 27,
    productName: "Dried Strawberries",
    sku: "SNK-027",
    storeName: "TropicalFoods",
    totalQuantity: 9,
  },
  {
    srno: 28,
    productName: "Avocado Chips",
    sku: "SNK-028",
    storeName: "FitBites",
    totalQuantity: 4,
  },
  {
    srno: 29,
    productName: "Flaxseed Crackers",
    sku: "SNK-029",
    storeName: "GreenGrocers",
    totalQuantity: 8,
  },
  {
    srno: 30,
    productName: "Dried Pineapple",
    sku: "SNK-030",
    storeName: "TropicalFoods",
    totalQuantity: 10,
  },
  {
    srno: 31,
    productName: "Matcha Energy Bites",
    sku: "SNK-031",
    storeName: "WellnessMarket",
    totalQuantity: 6,
  },
  {
    srno: 32,
    productName: "Cranberry Trail Mix",
    sku: "SNK-032",
    storeName: "HealthyLife",
    totalQuantity: 12,
  },
  {
    srno: 33,
    productName: "Almond Butter",
    sku: "SNK-033",
    storeName: "FitBites",
    totalQuantity: 7,
  },
  {
    srno: 34,
    productName: "Vegan Protein Bars",
    sku: "SNK-034",
    storeName: "PlantPower",
    totalQuantity: 10,
  },
  {
    srno: 35,
    productName: "Gluten-Free Brownies",
    sku: "SNK-035",
    storeName: "SweetTreats",
    totalQuantity: 9,
  },
  {
    srno: 36,
    productName: "Chia Pudding Mix",
    sku: "SNK-036",
    storeName: "HealthStore",
    totalQuantity: 8,
  },
  {
    srno: 37,
    productName: "Peanut Crunch Bars",
    sku: "SNK-037",
    storeName: "SnackCorner",
    totalQuantity: 6,
  },
  {
    srno: 38,
    productName: "Organic Date Rolls",
    sku: "SNK-038",
    storeName: "GreenGrocers",
    totalQuantity: 11,
  },
  {
    srno: 39,
    productName: "Cashew Clusters",
    sku: "SNK-039",
    storeName: "FitBites",
    totalQuantity: 5,
  },
  {
    srno: 40,
    productName: "Pistachio Mix",
    sku: "SNK-040",
    storeName: "WellnessMarket",
    totalQuantity: 13,
  },
  {
    srno: 41,
    productName: "Berry Bliss Bars",
    sku: "SNK-041",
    storeName: "HealthyLife",
    totalQuantity: 9,
  },
  {
    srno: 42,
    productName: "Coconut Protein Balls",
    sku: "SNK-042",
    storeName: "TropicalFoods",
    totalQuantity: 4,
  },
  {
    srno: 43,
    productName: "Dark Chocolate Almonds",
    sku: "SNK-043",
    storeName: "ChocoHeaven",
    totalQuantity: 10,
  },
  {
    srno: 44,
    productName: "Sunflower Seeds",
    sku: "SNK-044",
    storeName: "GreenGrocers",
    totalQuantity: 6,
  },
  {
    srno: 45,
    productName: "Walnut Clusters",
    sku: "SNK-045",
    storeName: "HealthStore",
    totalQuantity: 8,
  },
  {
    srno: 46,
    productName: "Hazelnut Spread",
    sku: "SNK-046",
    storeName: "WellnessMarket",
    totalQuantity: 7,
  },
  {
    srno: 47,
    productName: "Lentil Chips",
    sku: "SNK-047",
    storeName: "FitBites",
    totalQuantity: 10,
  },
  {
    srno: 48,
    productName: "Pineapple Coconut Bars",
    sku: "SNK-048",
    storeName: "TropicalFoods",
    totalQuantity: 5,
  },
  {
    srno: 49,
    productName: "Mango Cashew Mix",
    sku: "SNK-049",
    storeName: "SnackCorner",
    totalQuantity: 11,
  },
  {
    srno: 50,
    productName: "Pumpkin Spice Bites",
    sku: "SNK-050",
    storeName: "SweetTreats",
    totalQuantity: 8,
  },
];
