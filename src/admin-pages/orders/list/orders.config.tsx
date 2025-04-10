import Badge from "@/components/Badge/Badge";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import { DateTimeFormat } from "@/utils/helpers";

interface IOrdersColumn extends ITableColumn {
  accessorKey: TOrdersColummsKeys;
  id: TOrdersColummsKeys;
}

export type TOrdersColummsKeys =
  | "viewItems"
  | "orderStatus"
  | "bcStatus"
  | "order"
  | "storeName"
  | "date"
  | "customerBillingInfo"
  | "total"
  | "paymentType"
  | "paymentStatus"
  | "fulfillmentStatus"
  | "items"
  | "shippingMethod";

export const ORDERS_COLUMNS: IOrdersColumn[] = [
  {
    id: "viewItems",
    header: "",
    accessorKey: "viewItems",
    filterFn: "arrIncludesSome",
    enableSorting: false,
    cell: (props: any) => null,
  },
  {
    id: "orderStatus",
    header: "Order Status",
    accessorKey: "orderStatus",
    cell: (props: any) => (
      <Badge size="small" variant="blue">
        {props.getValue() || "-"}
      </Badge>
    ),
    filterFn: "arrIncludesSome",
  },
  {
    id: "bcStatus",
    header: "BC Status",
    accessorKey: "bcStatus",
    cell: (props: any) => (
      <Badge size="small" variant="red">
        {props.getValue() || "-"}
      </Badge>
    ),
    filterFn: "arrIncludesSome",
  },
  {
    id: "order",
    header: "Order",
    accessorKey: "order",
    cell: (props: any) => <Text size="lg">{props.getValue() || "-"}</Text>,
    filterFn: "includesString",
  },
  {
    id: "storeName",
    header: "Store Name",
    accessorKey: "storeName",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
    filterFn: "arrIncludesSome",
  },
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    filterFn: "customDateFilter",
    cell: (props: any) => (
      <div>
        {props.getValue() ? (
          <>
            <div>{DateTimeFormat(props.getValue()).date}</div>
            <div className="">{DateTimeFormat(props.getValue()).time}</div>
          </>
        ) : (
          "-"
        )}
      </div>
    ),
  },
  {
    id: "customerBillingInfo",
    header: "Customer Billing Name / ZipCode",
    accessorKey: "customerBillingInfo",
    filterFn: "arrIncludesSome",
    cell: (props: any) => {
      const address = props.getValue() as {
        firstName: string;
        lastName: string;
        city: string;
        state: string;
        pincode: string;
        streetAddress1: string;
        streetAddress2: string;
      };

      const formattedAddress = `${address.firstName} ${address.lastName} ${address.streetAddress1} ${address.streetAddress2} ${address.city} ${address.state} ${address.pincode}`;

      return <div>{formattedAddress || "-"}</div>;
    },
  },
  {
    id: "total",
    header: "Total",
    accessorKey: "total",
    filterFn: "arrIncludesSome",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
  {
    id: "paymentType",
    header: "Payment Type",
    accessorKey: "paymentType",
    filterFn: "arrIncludesSome",
    cell: (props: any) => (
      <Badge size="small" variant="blue">
        {props.getValue() || "-"}
      </Badge>
    ),
  },
  {
    id: "paymentStatus",
    header: "Payment Status",
    accessorKey: "paymentStatus",
    filterFn: "arrIncludesSome",
    cell: (props: any) => (
      <Badge size="small" variant="blue">
        {props.getValue() || "-"}
      </Badge>
    ),
  },

  {
    id: "fulfillmentStatus",
    header: "Fulfillment Status",
    accessorKey: "fulfillmentStatus",
    filterFn: "arrIncludesSome",
    cell: (props: any) => (
      <Badge size="small" variant="blue">
        {props.getValue() || "-"}
      </Badge>
    ),
  },
  {
    id: "items",
    header: "Items",
    accessorKey: "items",
    filterFn: "arrIncludesSome",
    cell: (props: any) => (
      <div>{props.getValue()?.length + " items" || "-"}</div>
    ),
  },
  {
    id: "shippingMethod",
    header: "Shipping Method",
    accessorKey: "shippingMethod",
    filterFn: "arrIncludesSome",
    cell: (props: any) => <div>{props.getValue() || "-"}</div>,
  },
];

export const ORDERS_TABS = [
  {
    id: 0,
    label: "New",
    value: "new",
    componentname: "NewOrders",
  },
  {
    id: 1,
    label: "Phone Order",
    value: "phoneOrder",
    componentname: "PhoneOrders",
  },
  {
    id: 2,
    label: "Pending in BC",
    value: "pendingInBC",
    componentname: "PendingInBCOrders",
  },
  {
    id: 3,
    label: "Shipped",
    value: "shipped",
    componentname: "ShippedOrders",
  },
  {
    id: 4,
    label: "Logos Not Received",
    value: "logosNotReceived",
    componentname: "LogosNotReceivedOrders",
  },
  {
    id: 5,
    label: "Logos Received",
    value: "logosReceived",
    componentname: "LogosReceivedOrders",
  },
  {
    id: 6,
    label: "Sent to Art Locker",
    value: "sentToArtLocker",
    componentname: "SentToArtLockerOrders",
  },
  {
    id: 7,
    label: "Production Files Received",
    value: "productionFilesReceived",
    componentname: "ProductionFilesReceivedOrders",
  },
  {
    id: 8,
    label: "All",
    value: "all",
    componentname: "AllOrders",
  },
] as const;
