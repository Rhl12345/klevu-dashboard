import { ITableColumn } from "@/components/Table/types";

interface ICustomerLogoColumn extends ITableColumn {
  accessorKey: TCustomerLogoColumnsKeys;
  id: TCustomerLogoColumnsKeys;
}

export type TCustomerLogoColumnsKeys =
  | "status"
  | "logo"
  | "logoNumber"
  | "logoLocation"
  | "notes"
  | "prodUrl"
  | "sewOutUrl"
  | "runSheetUrl"
  | "logoStatus"
  | "uploadDate"
  | "approvedDate";

export const CUSTOMER_LOGO_COLUMNS: ICustomerLogoColumn[] = [
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "logo",
    header: "Logo",
    accessorKey: "logo", 
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "logoNumber",
    header: "Logo Number",
    accessorKey: "logoNumber",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "logoLocation",
    header: "Logo Location",
    accessorKey: "logoLocation",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "notes",
    header: "Notes",
    accessorKey: "notes",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "prodUrl",
    header: "Prod URL",
    accessorKey: "prodUrl",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "sewOutUrl",
    header: "Sew out URL", 
    accessorKey: "sewOutUrl",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "runSheetUrl",
    header: "Run Sheet URL",
    accessorKey: "runSheetUrl",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "logoStatus",
    header: "Logo Status",
    accessorKey: "logoStatus",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "uploadDate",
    header: "Upload Date",
    accessorKey: "uploadDate",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "approvedDate",
    header: "Approved Date",
    accessorKey: "approvedDate",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
];
