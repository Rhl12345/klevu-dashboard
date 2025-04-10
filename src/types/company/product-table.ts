
export interface IProductTableProps {
  api?: string;
  companyId?: string;
  customerId?: string;
  columnHeaderDate?: string;
  columnHeaderCount?: string;
  columnHide?: boolean;
  accessorDate?: string;
  columnNameDate?: string;
  accessorViewCount?: string;
  columnNameCount?: string;
}
export type IFilterOption = {
    field: string;
    value: string;
    operator: string;
  };
  export interface IProductTableProptype {
    api: string;
    companyId: string;
    customerId: string;
    columnHeaderDate: string;
    columnHeaderCount: string;
  }