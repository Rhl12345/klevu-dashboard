//===================> Common interfaces and types Start <===================
export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface ICommonChartDropdown {
  dropdownOptions: ISelectOption[];
  onStoreChange: (value: { label: string; value: string | number }) => void;
  selectedOption: string;
  showDropdown: boolean;
}

export interface ICommonChartDateFilter {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  showDateFilter: boolean;
}

export interface ICommonChartProps {
  title?: string;
  dateRange?: string;
  className?: string;
  showTooltip?: boolean;
  storeName?: string;
  children?: React.ReactNode;
  dropdownFilter?: ICommonChartDropdown;
  dateFilter?: ICommonChartDateFilter;
}

export interface ICommonAxisProps {
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export type TTooltipFormatter = (
  value: number,
  name: string,
  props: Record<string, any>
) => React.ReactNode;

//===================> Common interfaces and types End <===================

//===================> Geo Chart Types and Interfaces Start <===================
export interface IGeoChartData extends Record<string, any> {
  location: string;
  value: number;
}

export interface IGeoChartProps extends ICommonChartProps {
  data: IGeoChartData[];
  region?: string;
  header?: string[];
  displayMode?: "regions" | "auto" | "markers" | "text";
  colors?: string[];
  datalessRegionColor?: string;
  theme?: "light" | "dark";
}
// =========Geo Chart Types and Interfaces End <===================

// =========Scatter Chart Types and Interfaces Start=========
export interface IScatterChartData extends Record<string, any> {
  x: number;
  y: number;
}

export interface IScatterChartProps
  extends ICommonChartProps,
    ICommonAxisProps {
  data: IScatterChartData[];
  tooltipFormatter?: TTooltipFormatter;
  defaultColor?: string;
}
// =========Scatter Chart Types and Interfaces End=========

// =========Line Chart Types and Interfaces Start=========
export interface ILineChartData extends Record<string, any> {
  name: string;
  value: number;
}

export interface ILineChartProps extends ICommonChartProps, ICommonAxisProps {
  data: ILineChartData[];
  tooltipFormatter?: TTooltipFormatter;
  lineColor?: string;
  xDataKey?: string;
  lineDataKey?: string;
}
// =========Line Chart Types and Interfaces End <===================

// =========Radial Bar Chart Types and Interfaces Start <===================
export interface IRadialBarData extends Record<string, any> {
  name: string;
  value: number;
}

export interface IRadialBarChartProps extends ICommonChartProps {
  data: IRadialBarData[];
  tooltipFormatter?: TTooltipFormatter;
  innerRadius?: number | string;
  outerRadius?: number | string;
  barSize?: number;
  startAngle?: number;
  endAngle?: number;
  minAngle?: number;
  dataKey?: string;
  background?: boolean;
}
// =========Radial Bar Chart Types and Interfaces End <===================

// =========Pie Chart Types and Interfaces Start <===================
export interface IPieChartData extends Record<string, any> {
  name: string;
  value: number;
}

export interface IPieChartProps extends ICommonChartProps {
  data: IPieChartData[];
  showLabels?: boolean;
  centerLabel?: {
    text: string;
    value: string | number;
  };
  tooltipFormatter?: TTooltipFormatter;
}

export interface ICustomLabelProps {
  viewBox?: {
    cx: number;
    cy: number;
  };
  text?: string;
  value?: string | number;
}
// =========Pie Chart Types and Interfaces End <===================

// =========Bar Chart Types and Interfaces Start <===================
interface IBarChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface IBarChartProps extends ICommonChartProps, ICommonAxisProps {
  data: IBarChartData[];
  tooltipFormatter?: TTooltipFormatter;
  barColor?: string;
  xDataKey?: string;
}
// =========Bar Chart Types and Interfaces End <===================
