import { IReportsStore } from "@/types/sales-summary-by-store-report/salesSummaryByStoreReport.type";

export const STORE_DATA: IReportsStore[] = [
  { label: "24 On Tour", value: "24-on-tour" },
  { label: "Bacardi", value: "bacardi" },
  { label: "Bacardi Grey Goose", value: "bacardi-grey-goose" },
  { label: "Boston Beer", value: "boston-beer" },
  { label: "Corporate Gear", value: "corporate-gear" },
];

export const SALES_DATA = [
  {
    storeName: "24 On Tour",
    subTotal: 1250.0,
    coupons: 50.0,
    shipping: 35.0,
    tax: 123.75,
    giftWrap: 10.0,
    adjustment: 25.0,
    total: 1358.75,
  },
  {
    storeName: "Bacardi",
    subTotal: 2100.5,
    coupons: 100.0,
    shipping: 45.0,
    tax: 204.55,
    giftWrap: 15.0,
    adjustment: 0.0,
    total: 2250.05,
  },
  {
    storeName: "Bacardi Grey Goose",
    subTotal: 1500.0,
    coupons: 75.0,
    shipping: 30.0,
    tax: 157.5,
    giftWrap: 12.0,
    adjustment: 30.0,
    total: 1664.5,
  },
  {
    storeName: "Boston Beer",
    subTotal: 1800.0,
    coupons: 90.0,
    shipping: 40.0,
    tax: 189.0,
    giftWrap: 14.0,
    adjustment: 40.0,
    total: 2005.0,
  },
  {
    storeName: "Corporate Gear",
    subTotal: 1000.0,
    coupons: 50.0,
    shipping: 25.0,
    tax: 105.0,
    giftWrap: 10.0,
    adjustment: 25.0,
    total: 1110.0,
  },
  // ... more entries
];
