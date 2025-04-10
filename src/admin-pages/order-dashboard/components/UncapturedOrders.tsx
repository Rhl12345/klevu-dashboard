import React, { useCallback, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import uncapturedOrders from "@/mock-data/order-deshboard/uncapturedOrders.json";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import { IUncapturedOrders } from "@/types/order-deshboard/uncapturedOrders.type";
import Status from "@/components/DisplayStatus/Status";
import { getFormatDate } from "@/utils/date.util";
import Link from "next/link";
import { Label } from "@/components/Label/Label";
import Text from "@/components/Text/Text";
import { ICommonSendProps } from "@/types/order-deshboard/orderByCustomerAndEmployee.type";
const UncapturedOrders = ({
  selectedStore,
  selectedDuration,
}: ICommonSendProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uncapturedOrdersList, setUncapturedOrdersList] = useState<
    IUncapturedOrders[]
  >([]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: uncapturedOrders.data.length,
  });

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getUncapturedOrdersList = useCallback(async () => {
    // API call implementation
    setUncapturedOrdersList(uncapturedOrders.data);
  }, []);
  const COLUMNS: ITableColumn<IUncapturedOrders>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: "#",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <>
            <div>{row.original.id + 1}.</div>
          </>
        );
      },
    },
    {
      id: "store_name",
      accessorKey: "store_name",
      header: "store Name",
    },
    {
      id: "order",
      accessorKey: "order",
      header: "order",
      cell: ({ row }) => {
        return (
          <>
            <Link href={`/admin/Order/orders/edit/${row.original.order}`}>
              #{row.original.order}
            </Link>
          </>
        );
      },
    },
    {
      id: "order_date",
      accessorKey: "order_date",
      header: "order date",
      cell: ({ row }) => {
        return row?.original?.order_date ? (
          <>
            <div>{getFormatDate(row?.original?.order_date).date} </div>
            <div className=" text-xs font-normal">
              {getFormatDate(row?.original?.order_date).time}
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "customer_name",
      accessorKey: "customer_name",
      header: "customer name",
    },
    {
      id: "email",
      accessorKey: "email",
      header: "email",
    },
    { id: "order_total", accessorKey: "order_total", header: "order total($)" },
    {
      id: "status",
      accessorKey: "status",
      header: "status",
      cell: ({ row }) => <Status type={row.original.status} />,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label size="large">
          Uncaptured Orders
        </Label>
        <Text size="sm">
          Store: {selectedStore.label}({selectedDuration.label})
        </Text>
      </div>
      <ReactTable
        DATA={uncapturedOrdersList}
        COLUMNS={COLUMNS}
        fetchData={getUncapturedOrdersList}
        {...paginationData}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        loading={isLoading}
        showFilter={false}
        displaySearch={false}
        isListPage={false}
        usedInsideModal={true}
      />
    </>
  );
};

export default UncapturedOrders;
