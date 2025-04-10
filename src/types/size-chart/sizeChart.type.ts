export interface ISizeChartInitalValue {
  sizeChartName: string;
  brandId: string;
  sizeChartView: Record<string, string | number>;
  sizeChartRange: string;
  description: string;
  measurements: string;
  recStatus: string;
  rowVersion: string | null;
}

export interface ICreateEditSizeChart {
  id?: string;
}

export interface IBrandNameOption {
  value: string;
  label: string;
}

export interface ISizeChart {
  SizeChartObj?: {
    distinctX?: never[];
    distinctY?: never[];
    sizeChartViewdata: never[];
  };
  SizeChartDataValues?: any;
  data?: any[];
  ChartId?: never;
  readOnly?: boolean;
}

export interface ISizeChartData {
  [key: string]: string | number;
}

export type TSizeChartModalType =
  | "delete"
  | "edit"
  | "status"
  | "viewHistory"
  | null;

export interface ISizeChartProps {
  measurements: string[];
  sizeChartRange: string[];
  onDataChange?: (data: {
    measurements: string[];
    ranges: string[];
    value: string;
    field: string;
  }) => void;
  isEditable?: boolean;
  data: Record<string, string | number>;
}

export interface IDummyProductSize {
  id: number;
  name: string;
  brandName: string;
  sizeChartRange: string;
  description: string;
  measurements: string;
  toogleDisplay: boolean;
  sizeChartView: string; // This could be a JSON string. Convert to an object type if needed.
  productCount: number;
  createdName: string;
  modifiedName: string;
  productTypeName: string | null;
  recStatus: string;
  createdDate: string; // Use Date if you will parse it as a Date object.
  createdBy: number;
  modifiedDate: string; // Use Date if you will parse it as a Date object.
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface IProductSizeData {
  id: number;
  sizeMasterID: number;
  size: string;
  displayOrder: number;
  recStatus: string;
  createdDate: string; // Use Date if you will parse it as a Date object.
  createdBy: number;
  modifiedDate: string; // Use Date if you will parse it as a Date object.
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface ISortingOption {
  field: string;
  direction: number;
  priority: number;
}
