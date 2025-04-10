"use client";

import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import React, { useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import MyTabs from "@/components/Tab/Tab";
import { ITabOption } from "@/components/Tab/types";
import ReactTable from "@/components/Table/ReactTable";
import { toast } from "react-toastify";
import { ORDERS_COLUMNS as COLUMNS, ORDERS_TABS } from "./orders.config";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import {
  getOrders,
  IGetOrdersOutput,
} from "@/services/order/getOrders.service";
import { ISortingOption } from "@/components/Table/types";
import { ColumnFiltersState } from "@tanstack/react-table";
import Dropdown from "@/components/DropDown/DropDown";
import { STORE_TYPES, STORES } from "./orders.static";
import OrderDetailsTable from "./components/OrderDetailsTable";
import Link from "next/link";
import Text from "@/components/Text/Text";
import { IOrder } from "@/types/company/company.type";
import OrderModal from "./components/OrderModal";
type IOrdersData = IGetOrdersOutput;

const PAGE = {
  title: "Order List",
  initial: {
    pageIndex: 1,
    pageSize: 25,
  },
};

const OrdersList = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [orderData, setOrderData] = useState<IOrdersData>({
    pageIndex: PAGE.initial.pageIndex,
    pageSize: PAGE.initial.pageSize,
    totalCount: 0,
    items: [],
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orderItemsToShow, setOrderItemsToShow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  const fetchData = async ({
    pageIndex,
    pageSize,
    activeSort,
    activeFilters,
  }: {
    pageIndex: number;
    pageSize: number;
    activeSort: ISortingOption[];
    activeFilters: ColumnFiltersState;
  }) => {
    try {
      setIsLoading(true);
      const response = await getOrders({
        pageIndex: pageIndex,
        pageSize: pageSize,
        activeSort: activeSort,
        activeFilters: activeFilters,
      });

      setOrderData(response);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const memoizedColumns = useMemo(
    () =>
      COLUMNS.map((column) => {
        if (column.id === "viewItems") {
          return {
            ...column,
            cell: (props: any) => {
              return (
                <SvgIcon
                  name="PlusIcon"
                  width={24}
                  height={24}
                  onClick={() => {
                    setOrderItemsToShow(props.row.original.order);
                  }}
                />
              );
            },
          };
        }

        if (column.id === "order") {
          return {
            ...column,
            cell: (props: any) => {
              return (
                <Link
                  href={`${PageRoutes.ORDERS.EDIT.replace(":orderId", props.getValue())}`}
                >
                  {props.getValue()}
                </Link>
              );
            },
          };
        }

        if (column.id === "customerBillingInfo") {
          return {
            ...column,
            cell: (props: any) => {
              const userName = props.getValue() as {
                firstName: string;
                lastName: string;
              };
              const orderItemsCount = props.row.original?.items?.length;
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

              return (
                <React.Fragment>
                  <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-1 w-[65%]">
                      <Text
                        size="sm"
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedOrder(props.row.original.order)
                        }
                      >
                        {userName.firstName} {userName.lastName}
                      </Text>
                      <span>{formattedAddress || "-"}</span>
                    </div>
                    <div className="w-[35%]">
                      <Text size="sm">Total {orderItemsCount} items</Text>
                    </div>
                  </div>
                </React.Fragment>
              );
            },
          };
        }
        return column;
      }),
    []
  );

  React.useEffect(() => {
    fetchData({
      pageIndex: PAGE.initial.pageIndex,
      pageSize: PAGE.initial.pageSize,
      activeSort: [],
      activeFilters: [],
    });
  }, []);

  return (
    <React.Fragment>
      <ListPageHeader moduleName={PAGE.title} name={PAGE.title}>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => console.log("Export")}
        >
          <span>Export</span>
        </Button>
        <Dropdown
          aria-label="Select a store type"
          defaultValue="ecommerce-store"
          id="store-select-type"
          onChange={(e) => console.log("e", e)}
          options={STORE_TYPES}
        />
        <Dropdown
          aria-label="Select a store"
          defaultValue=""
          id="store-select"
          className="w-40"
          // customSearchDropdown={true}
          onChange={(e) => console.log("e", e)}
          options={STORES}
          placeholder="Select..."
        />
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => console.log("Bulk Cancel")}
        >
          <span>Bulk Cancel</span>
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => console.log("Sync with BC")}
        >
          <span>Sync with BC</span>
        </Button>
      </ListPageHeader>

      <MyTabs
        options={ORDERS_TABS}
        activeTab={activeTab}
        onTabClick={(index: number) => setActiveTab(index)}
      />

      <ReactTable COLUMNS={memoizedColumns} DATA={orderData.items} />

      {orderItemsToShow && (
        <OrderDetailsTable
          onClose={() => setOrderItemsToShow(null)}
          orderId={orderItemsToShow}
        />
      )}
      {selectedOrder && (
        <OrderModal
          onClose={() => setSelectedOrder(null)}
          orderId={selectedOrder}
        />
      )}
    </React.Fragment>
  );
};

export default OrdersList;
