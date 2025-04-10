"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import { PageRoutes } from "@/admin-pages/routes";
import Link from "next/link";
import { ORDER_COLUMNS } from "@/admin-pages/orders/list/components/order.config";
import { getOrdersByCustomer } from "@/services/order/getOrdersByCustomer.service";
import orderData from "@/mock-data/order.json";

const PAGE = {
  initial: {
    pageIndex: 1,
    pageSize: 25,
  },
};

const Order = ({ customerId }: { customerId: string }) => {
  const [orderItems, setOrderItems] = useState<any>({
    pageIndex: PAGE.initial.pageIndex,
    pageSize: PAGE.initial.pageSize,
    totalCount: orderData.data.length,
    items: orderData.data,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const getOrderItems = async () => {
    const response = await getOrdersByCustomer(customerId);
    setOrderItems(response);
  };

  const memoizedOrderColumns = useMemo(
    () =>
      ORDER_COLUMNS.map((column) => {
        if (column.id === "orderId") {
          return {
            ...column,
            cell: (props: any) => {
              return (
                <React.Fragment>
                  <Link
                    href={`${PageRoutes.ORDERS.EDIT.replace(":orderId", props.getValue())}`}
                  >
                    {props.getValue()}
                  </Link>
                </React.Fragment>
              );
            },
          };
        }

        return column;
      }),
    []
  );

  useEffect(() => {
    getOrderItems();
  }, [customerId]);

  return (
    <div className="w-full border border-gray-light dark:border-gray-dark p-4 lg:p-6">
      <ReactTable
        COLUMNS={memoizedOrderColumns}
        DATA={orderItems.items}
        usedInsideModal={true}
        showFilter={false}
      />
    </div>
  );
};

export default Order;
