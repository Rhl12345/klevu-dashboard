import Status from "@/components/DisplayStatus/Status";
import { ITableColumn } from "@/components/Table/types";

interface IOrderColumn extends ITableColumn {
  accessorKey: TOrderColumnsKeys;
  id: TOrderColumnsKeys;
}

export type TOrderColumnsKeys =
  | "orderId"
  | "status"
  | "date"
  | "subTotal"
  | "discountAmt"
  | "shipping"
  | "tax"
  | "adjAmount"
  | "total";

export const ORDER_COLUMNS: IOrderColumn[] = [
  {
    id: "orderId",
    header: "Order",
    accessorKey: "orderId",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "status",
    header: "Status", 
    accessorKey: "status",
    cell: (props: any) => <Status type={props.getValue()} />,
  },
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "subTotal",
    header: "Sub Total ($)",
    accessorKey: "subTotal",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "discountAmt", 
    header: "Discount Amt ($)",
    accessorKey: "discountAmt",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "shipping",
    header: "Shipping ($)",
    accessorKey: "shipping",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "tax",
    header: "Tax ($)",
    accessorKey: "tax",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "adjAmount",
    header: "Adj. Amount ($)",
    accessorKey: "adjAmount",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
  {
    id: "total",
    header: "Total ($)",
    accessorKey: "total",
    cell: (props: any) => <div>{props.getValue()}</div>,
  },
];
