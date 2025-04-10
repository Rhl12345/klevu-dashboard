import { ITableColumn } from "@/components/Table/types";

interface IOrderDetailsColumn extends ITableColumn {
  accessorKey: TOrderDetailsColummsKeys;
  id: TOrderDetailsColummsKeys;
}

export type TOrderDetailsColummsKeys =
  | "productName"
  | "productPrice"
  | "productStatus"
  | "productTotal";

export const ORDER_DETAILS_COLUMNS: IOrderDetailsColumn[] = [
  {
    id: "productName",
    header: "Product Name",
    accessorKey: "productName",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "productPrice",
    header: "Price",
    accessorKey: "productPrice",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "productTotal",
    header: "Total Price",
    accessorKey: "productTotal",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "productStatus",
    header: "Status",
    accessorKey: "productStatus",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
];
