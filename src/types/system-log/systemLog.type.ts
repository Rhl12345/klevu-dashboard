export interface ISystemLogValues {
  id: number;
  event: string;
  user: string;
  userId: number;
  moduleId: number;
  module: string;
  page: string;
  date: string;
  browser: null;
  location: string;
  ipAddress: string;
  macAddress: string;
  systemLogId: string;
}

export interface IPaginationData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
