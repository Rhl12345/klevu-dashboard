import React, { useMemo } from "react";

import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";

import { getFormatDate } from "@/utils/date.util";
import ordersDummyData from "@/mock-data/ordersDummyData.json";

import { IOrderHistory } from "@/types/order-history/orderHistory.type";

const OrderHistoryViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tabId: number) => void;
}) => {
  const COLUMNS: ITableColumn<IOrderHistory>[] = useMemo(
    () => [
      { id: "orderNo", accessorKey: "orderNo", header: "Order No" },
      {
        id: "orderDateTime",
        accessorKey: "orderDateTime",
        header: "Order DateTime",
        cell: (props) => {
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
        cell: ({ row }) => {
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
        cell: ({ row }) => {
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
      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-semibold">
              Order History
            </Text>

            <Button
              variant="default"
              size="lg"
              onClick={() => handleTabChange(7)}
              className="underline"
            >
              Edit
            </Button>
          </div>

          <ReactTable
            DATA={ordersDummyData}
            COLUMNS={COLUMNS}
            isListPage={true}
            showFilter={false}
            usedInsideModal={true}
            showPagination={false}
            loading={false}
            showEditColumns={false}
            showMoreFilters={false}
            displaySearch={false}
          />
        </div>
      </div>
    </>
  );
};

export default OrderHistoryViewSection;
