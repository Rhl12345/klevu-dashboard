import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";
import { ITableColumn } from "@/components/Table/types";

import { paginationDetails } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";
import { getFormatDate } from "@/utils/date.util";

import { IPaginationData } from "@/types/system-log/systemLog.type";
import { IOrderReportValues } from "@/types/form-builder/formReport.type";
import orderReportData from "@/mock-data/form-builder/form-report/orderReport.json";

const DATA: IOrderReportValues[] =
  (orderReportData && orderReportData?.data) || [];

const OrderReportList = () => {
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  // Memoize handlers
  const setSortingOptionHandler = useCallback(() => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  // Memoize pagination handler
  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationData,
      value: (typeof paginationData)[keyof typeof paginationData]
    ) => {
      setPaginationData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const COLUMNS: ITableColumn<IOrderReportValues>[] = useMemo(
    () => [
      {
        id: "orderNo",
        accessorKey: "orderNo",
        header: "Order No",
      },
      {
        id: "orderDate",
        accessorKey: "orderDate",
        header: "Order Date",
        cell: ({ row }) => {
          const orderDate = row.original.orderDate;
          if (!orderDate) return null;
          const { date, time } = getFormatDate(orderDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "customerName",
        accessorKey: "customerName",
        header: "Customer Name",
      },
      {
        id: "customerEmail",
        accessorKey: "customerEmail",
        header: "Customer Email",
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: "QTY",
      },
      {
        id: "total",
        accessorKey: "total",
        header: "Total ($)",
      },
      {
        id: "paymentStatus",
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => {
          const paymentStatus = row.original.paymentStatus;
          if (!paymentStatus) return null;
          return <Status type={paymentStatus} />;
        },
      },
      {
        id: "fulfillmentStatus",
        accessorKey: "fulfillmentStatus",
        header: "Fulfillment Status",
        cell: ({ row }) => {
          const fulfillmentStatus = row.original.fulfillmentStatus;
          if (!fulfillmentStatus) return null;
          return <Status type={fulfillmentStatus} />;
        },
      },
      {
        id: "orderStatus",
        accessorKey: "orderStatus",
        header: "Order Status",

        cell: ({ row }) => {
          const orderStatus = row.original.orderStatus;
          if (!orderStatus) return null;
          return <Status type={orderStatus} />;
        },
      },
    ],
    []
  );

  // Calculate total amount
  const { totalAmount, totalQTY } = useMemo(() => {
    return DATA.reduce(
      (acc, order: IOrderReportValues) => {
        acc.totalAmount += order.total; // Accumulate total amount
        acc.totalQTY += order.quantity; // Accumulate total quantity
        return acc;
      },
      { totalAmount: 0, totalQTY: 0 } // Initial values
    );
  }, [DATA]);

  const footerData = {
    totalQTY,
    totalAmount: `$${totalAmount.toFixed(2)}`,
  };

  return (
    <>
      <ReactTable
        DATA={DATA}
        COLUMNS={COLUMNS}
        isListPage={false}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showEditColumns={false}
        showFilter={false}
        showMoreFilters={false}
        displaySearch={false}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        calculateFooter={true}
        footerData={{
          customerEmail: "Total",
          quantity: footerData.totalQTY,
          total: footerData.totalAmount,
        }}
      />
    </>
  );
};

export default OrderReportList;
