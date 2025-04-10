import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import ordersDummyData from "@/mock-data/ordersDummyData.json";
import { IPaginationState } from "@/types/special-request/specialRequest.type";
import { getErrorMessage } from "@/utils/common.util";
import { IOrderHistory } from "@/types/order-history/orderHistory.type";
import Status from "@/components/DisplayStatus/Status";

const OrderHistory = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [orderHistoryList, setOrderHistoryList] = useState<IOrderHistory[]>([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "customerReview",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState<IPaginationState>({
    ...paginationDetails,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);

  // Fetch Order History with Correct Pagination
  const getOrderHistory = useCallback(() => {
    try {
      const start = paginationData.pageIndex * paginationData.pageSize;
      const end = start + paginationData.pageSize;
      const slicedData = ordersDummyData.slice(start, end);

      setOrderHistoryList(slicedData);
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }, [paginationData.pageIndex, paginationData.pageSize]);

  // Fetch data when pagination or sorting changes
  useEffect(() => {
    if (
      paginationData.pageIndex > 0 &&
      ordersDummyData.length <= paginationData.pageSize
    ) {
      setPaginationDataFunc("pageIndex", 0);
    }
    getOrderHistory();
  }, [paginationData.pageIndex, paginationData.pageSize]);

  // Log whenever data updates
  useEffect(() => {}, [orderHistoryList]);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const COLUMNS: ITableColumn<IOrderHistory>[] = useMemo(
    () => [
      { id: "orderNo", accessorKey: "orderNo", header: "Order No" },
      {
        id: "orderDateTime",
        accessorKey: "orderDateTime",
        header: "Order DateTime",
        cell: (props: { getValue: () => string }) => {
          const { time, date } = getFormatDate(props.getValue());
          return (
            <div>
              {props.getValue() ? (
                <>
                  <div>{date}</div>
                  <div className="text-xs font-normal">{time}</div>
                </>
              ) : (
                "-"
              )}
            </div>
          );
        },
      },
      { id: "customer", accessorKey: "customer", header: "Customer" },
      { id: "qty", accessorKey: "qty", header: "Qty" },
      { id: "total", accessorKey: "total", header: "Total" },
      {
        id: "paymentStatus",
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }: any) => {
          return (
            <Status
              type={
                row?.original?.paymentStatus === "Authorized"
                  ? "Authorized"
                  : "Captured"
              }
            />
          );
        },
      },
      {
        id: "fulfillmentStatus",
        accessorKey: "fulfillmentStatus",
        header: "Fulfillment Status",
        cell: ({ row }: any) => {
          return (
            <Status
              type={
                row?.original?.fulfillmentStatus === "Unfulfilled"
                  ? "Unfulfilled"
                  : "I"
              }
            />
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <ReactTable
        DATA={orderHistoryList}
        COLUMNS={COLUMNS}
        fetchData={getOrderHistory}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.pageIndex > 0}
        hasNextPage={
          ordersDummyData.length >
          (paginationData.pageIndex + 1) * paginationData.pageSize
        }
        usedInsideModal
      />
    </>
  );
};

export default OrderHistory;
