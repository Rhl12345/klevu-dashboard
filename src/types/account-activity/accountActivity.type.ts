export interface ISortOption {
  field: string;
  direction: number;
  priority: number;
}

export interface IPaginationData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IAccountActivityData {
  user: string;
  browser: string;
  logdate: string;
  type: string;
  ipAddress: string;
  location: string;
}

export interface ICellProps {
  row: {
    original: IAccountActivityData;
  };
}

export interface ITypeOptions {
  value: string;
  label: string;
}

export interface IProfileAccountActivityData {
  user: string;
  browser: string;
  date: string;
  time: string;
  activity: string;
  ipAddress: string;
  location: string;
}
