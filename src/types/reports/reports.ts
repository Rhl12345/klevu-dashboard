import { PageRoutes } from "@/admin-pages/routes";
import { IPieChartData } from "@/types/charts/charts.type";

export interface IReportsStore {
  label: string;
  value: string;
}

export const DEFAULT_START_DATE = new Date("2024-01-01");
export const DEFAULT_END_DATE = new Date("2024-06-30");

export interface IDateChangeHandler {
  (date: Date): void;
}

export interface IReportSection {
  title: string;
  links: Array<{
    href: string;
    label: string;
  }>;
}

export interface ICommonPieChartProps {
  store: IReportsStore;
  title: string;
  centerLabelText: string;
  centerLabelValue: number;
  data: IPieChartData[];
  showTooltip: boolean;
  showDateFilter: boolean;
  showLabels: boolean;
}

export interface ICommonBarChartProps {
  store: IReportsStore;
  title: string;
  data: IPieChartData[];
  showTooltip: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  showDateFilter: boolean;
}

export interface IChartData {
  total: number;
  data: Array<{
    name: string;
    value: number;
  }>;
}
export interface IOrderItem {
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  ourCost: number;
  profit: number;
  isOrderHeader?: boolean;
  isTotal?: boolean;
  isOrder?: boolean;
}

export interface IOrderTotals {
  quantity: number;
  unitCost: number;
  totalCost: number;
  ourCost: number;
  profit: number;
}

export interface IOrder {
  orderId: string;
  orderTotal: number;
  orderCost: number;
  shippingCost: number;
  shipping: number;
  profit: number;
  items: IOrderItem[];
  totals: IOrderTotals;
}

export interface IOrderTableRow extends IOrderItem {
  isOrderHeader?: boolean;
  isTotal?: boolean;
  orderId?: string;
  orderTotal?: number;
  orderCost?: number;
  shippingCost?: number;
  shipping?: number;
}
export interface ICommonLineChartProps {
  store?: { label: string; value: string };
  title: string;
  data: Array<{ name: string; value: number }>;
  showTooltip?: boolean;
  showDateFilter?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  lineColor?: string;
  dateRange?: string;
  className?: string;
}
export interface ICommonScatterChartProps {
  store?: { label: string; value: string };
  title: string;
  data: Array<{ x: number; y: number; label?: string }>;
  showTooltip?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showDateFilter?: boolean;
  defaultColor?: string;
}

export const REPORT_SECTIONS: IReportSection[] = [
  {
    title: "Product",
    links: [
      {
        href: PageRoutes.REPORTS.ITEM_SALE_BY_MARKETS,
        label: "Item sales by market",
      },
      {
        href: `${PageRoutes.REPORTS.LIST}/product-summary`,
        label: "Product Summary",
      },
      {
        href: PageRoutes.REPORTS.COMPARATIVE_SALES_REPORT,
        label: "Comparative sales by time period",
      },
      {
        href: PageRoutes.REPORTS.TOP_100_SELLING_PRODUCTS,
        label: "Top 100 selling products",
      },
      {
        href: `${PageRoutes.REPORTS.LOW_INVENTORY}`,
        label: "Low inventory",
      },

      {
        href: `${PageRoutes.REPORTS.BRAND_WISE_PRODUCT_REPORT}`,
        label: "Brandwise Product Report",
      },
      {
        href: PageRoutes.REPORTS.VENDORWISE_PRODUCT_REPORT,
        label: "Vendorwise Product Report",
      },
      {
        href: PageRoutes.REPORTS.PRODUCT_STATUS_REPORT,
        label: "Product Status Report",
      },
      {
        href: PageRoutes.REPORTS.PRODUCT_LISTING_REPORT,
        label: "Product Listing Report",
      },
      {
        href: PageRoutes.REPORTS.PRODUCT_CALCULATION_REPORT,
        label: "Product Calculation Report",
      },
    ],
  },
  {
    title: "Order",
    links: [
      {
        href: `${PageRoutes.REPORTS.ORDER_BENEFICIAL_REPORT}`,
        label: "Order beneficial report",
      },
      {
        href: PageRoutes.REPORTS.ORDER_STATE_TAX_REPORT,
        label: "Order state tax report",
      },
      {
        href: PageRoutes.REPORTS.ORDER_NUMBER_SALE_TAX_REPORT,
        label: "Order number sales tax report",
      },
      {
        href: `${PageRoutes.REPORTS.ORDER_STATISTICS}`,
        label: "Order statistics",
      },
    ],
  },
];

export interface IInquiriesListReport {
  name: string;
  email: string;
  subject: string;
  date: string;
  reply: string;
}

export interface IInquiriesListViewModal {
  name: string;
  email: string;
  subject: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  phone: string;
  comment: string;
  date: string;
  status: string;
}
export interface IInquiriesListReplyModalModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalInformation: IInquiriesListReport | null;
}

export interface IInquiriesListViewModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalInformation: IInquiriesListReport | null;
}
