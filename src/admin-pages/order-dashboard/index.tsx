"use client";
import React, { useState } from "react";
import OrderByCustomerAndEmployee from "@/admin-pages/order-dashboard/components/OrderByCustomerAndEmployee";
import OrderDetails from "@/admin-pages/order-dashboard/components/OrderDetails";
import OrderSyncedDetails from "@/admin-pages/order-dashboard/components/OrderSyncedDetails";
import StoreTypeTotalOrder from "@/admin-pages/order-dashboard/components/StoreTypeTotalOrder";
import Top5OrderedProducts from "@/admin-pages/order-dashboard/components/Top5OrderedProducts";
import UncapturedOrders from "@/admin-pages/order-dashboard/components/UncapturedOrders";
import BarChart from "@/components/charts/bar-chart/BarChart";
import GeoChart from "@/components/charts/geo-chart/GeoChart";
import PieChart from "@/components/charts/pie-chart/PieChart";
import DateCell from "@/components/common/DateCell";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import { Label } from "@/components/Label/Label";
import ReactTable from "@/components/Table/ReactTable";
import Text from "@/components/Text/Text";
import {
  COUNTRY_DATA,
  REVIEWS_CHART_DATA,
  STORE_DURATON,
} from "@/mock-data/customerDashboard";
import { ITableColumn } from "@/components/Table/types";
import { STORE_OPTIONS } from "@/mock-data/customerDashboard";
import {
  AVERAGE_SALES,
  COUPON_USED,
  CUSTOMER_PROFITABILITY,
  MONTHLY_SALES_DETAILS,
  ORDER_DETAILS,
  ORDER_SYNC_DETAILS,
  TOP_STORE_ORDER_BY_MARKETPLACE,
  TOPCUSTOMERS_DATA,
  TOTAL_ORDERS,
  TOTAL_SALES,
} from "@/mock-data/orderDashboard";
import { getThemeFromLocalStorage } from "@/utils/localStorage.utlis";
import { ItopStoreColumns } from "@/types/order-dashboard/orderDashboard.type";

const OrderDashboard = () => {
  const [selectedStore, setSelectedStore] = useState({
    label: "All Stores",
    value: "all",
  });
  const [selectedDuration, setSelectedDuration] = useState({
    label: "Last 24 Hours",
    value: "24h",
  });
  const customerColumns: ITableColumn[] = [
    { id: "index", header: "#", accessorKey: "id" },
    { id: "name", header: "MarketPlace", accessorKey: "marketplace" },
    { id: "profit", header: "Of Orders", accessorKey: "ofOrders" },
  ];
  const topStoreColumns: ITableColumn<ItopStoreColumns>[] = [
    {
      id: "customerName",
      header: "Customer Name",
      accessorKey: "customerName",
    },
    { id: "orderNumber", header: "Order Number", accessorKey: "orderNumber" },
    { id: "orderNote", header: "Order Note", accessorKey: "orderNote" },
    {
      id: "orderisCancelled",
      header: "Order is Cancel",
      accessorKey: "orderisCancelled",
    },
    { id: "totalItems", header: "Total Items", accessorKey: "totalItems" },
    { id: "subTotal", header: "Sub Total", accessorKey: "subTotal" },
    { id: "total", header: "Total", accessorKey: "total" },
    {
      id: "orderDate",
      header: "Order Date",
      accessorKey: "orderDate",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8 py-8 w-full pb-0">
        {/* Header Filters */}
        <div className="flex flex-wrap justify-end z-20 gap-4 lg:gap-6">
          <div className="flex flex-wrap gap-4 justify-end">
            <div className="w-60">
              <Dropdown
                options={STORE_OPTIONS}
                value={selectedStore}
                onChange={(value: any) => setSelectedStore(value)}
              />
            </div>
            <div className="w-60">
              <Dropdown
                options={STORE_DURATON}
                value={selectedDuration}
                onChange={(value: any) => setSelectedDuration(value)}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 lg:w-4/5 mx-auto">
          {/* Orders Sync Details */}
          <div className="border border-b border-gray-light dark:border-gray-dark">
            <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
              <Label className="!p-0" size="large">
                Orders Sync Details
              </Label>
              <Text className="text-xs font-normal">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
            </div>

            <div className="flex flex-col gap-2 p-4">
              <Text className="text-xs font-normal">
                Total Order: <strong>{ORDER_SYNC_DETAILS.totalOrder}</strong>
              </Text>
              <Text className="text-xs font-normal">
                Synced Order: <strong>{ORDER_SYNC_DETAILS.syncedOrder}</strong>
              </Text>
              <Text className="text-xs font-normal">
                Not Synced Order:
                <strong>{ORDER_SYNC_DETAILS.notSyncedOrder}</strong>
              </Text>
            </div>
          </div>
          {/* Order Detail */}
          <div className="border border-b border-gray-light dark:border-gray-dark">
            <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
              <Label className="!p-0" size="large">
                Order Detail
              </Label>
              <Text className="text-xs font-normal">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <Text className="text-xs font-normal">New Orders:<strong> {ORDER_DETAILS.newOrder}</strong></Text>
              <Text className="text-xs font-normal">Pending Orders:<strong> {ORDER_DETAILS.pendingOrder}</strong></Text>
              <Text className="text-xs font-normal">All Orders:<strong> {ORDER_DETAILS.allOrder}</strong></Text>
            </div>
          </div>
          {/* Monthly Sales Details */}
          <div className="border border-b border-gray-light dark:border-gray-dark">
            <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
              <Label size="large">Monthly Sales Details</Label>
              <Text className="text-xs font-normal">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <Text className="text-xs font-normal">Total Orders:<strong> {MONTHLY_SALES_DETAILS.totalOrders}</strong></Text>
              <Text className="text-xs font-normal">Order Amount:<strong> {MONTHLY_SALES_DETAILS.orderAmount}</strong></Text>
              <Text className="text-xs font-normal">
                Total Revenue (Captured):<strong> {MONTHLY_SALES_DETAILS.totalRevenue}</strong>
              </Text>
            </div>
          </div>
          {/*  Product Detail*/}
          <div className="border border-b border-gray-light dark:border-gray-dark">
            <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
              <Label size="large">Product Detail</Label>
              <Text className="text-xs font-normal">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <Text className="text-xs font-normal">Total Products:<strong> {ORDER_DETAILS.newOrder}</strong></Text>
              <Text className="text-xs font-normal">Active Products:<strong> {ORDER_DETAILS.pendingOrder}</strong></Text>
              <Text className="text-xs font-normal">InActive Products:<strong> {ORDER_DETAILS.allOrder}</strong></Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Total Orders */}
          <div className="border border-gray-light dark:border-gray-dark p-4 xl:col-span-3 col-span-12 md:col-span-6">
            <Label size="large">Total Orders</Label>
            <div className="space-y-2 mt-2">
              <Text size="sm">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
              <Text className="text-green-500">
                Total Order: {TOTAL_ORDERS.totalOrder}
              </Text>
            </div>
          </div>
          {/* Total Sales */}
          <div className="border border-gray-light dark:border-gray-dark p-4 xl:col-span-3 col-span-12 md:col-span-6">
            <Label size="large">Total Sales</Label>
            <div className="space-y-2 mt-2">
              <Text size="sm">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
              <Text className="text-green-500">
                Total Sales: ${TOTAL_SALES.totalSales}
              </Text>
            </div>
          </div>
          {/* Average Sales */}
          <div className="border border-gray-light dark:border-gray-dark p-4 xl:col-span-3 col-span-12 md:col-span-6">
            <Label size="large">Average Sales</Label>
            <div className="space-y-2 mt-2">
              <Text size="sm">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
              <Text className="text-green-500">
                Average Sales: ${AVERAGE_SALES.averageSales}
              </Text>
            </div>
          </div>
          {/* Coupon used */}
          <div className="border border-gray-light dark:border-gray-dark p-4 xl:col-span-3 col-span-12 md:col-span-6">
            <Label size="large">Coupon Used</Label>
            <div className="space-y-2 mt-2">
              <Text size="sm">
                Store: {selectedStore.label}({selectedDuration.label})
              </Text>
              <Text className="text-green-500">
                Coupon Used: ${COUPON_USED.couponUsed}
              </Text>
            </div>
          </div>
        </div>

        {/* charts Section */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Total Orders By Status */}
          <div className="xl:col-span-4 col-span-12">
            <PieChart
              title="Total Orders By Status"
              data={REVIEWS_CHART_DATA}
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
              showTooltip={true}
              showLabels={false}
              centerLabel={{
                text: "",
                value: "",
              }}
              className="h-full"
              tooltipFormatter={(value, name) => [`${value} reviews`, name]}
            />
          </div>
          {/* Top Coupon */}
          <div className="xl:col-span-4 col-span-12">
            <PieChart
              title="Top Coupon"
              data={REVIEWS_CHART_DATA}
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
              showTooltip={true}
              showLabels={false}
              centerLabel={{
                text: "",
                value: "",
              }}
              className="h-full"
              tooltipFormatter={(value, name) => [`${value} reviews`, name]}
            />
          </div>
          {/* Paying Customer Vs Non-Paying Customer */}
          <div className="xl:col-span-4 col-span-12">
            <PieChart
              title="Paying Customer Vs Non-Paying Customer"
              data={REVIEWS_CHART_DATA}
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
              showTooltip={true}
              showLabels={false}
              centerLabel={{
                text: "",
                value: "",
              }}
              className="h-full"
              tooltipFormatter={(value, name) => [`${value} reviews`, name]}
            />
          </div>
        </div>

        {/* Customer Profitability */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="xl:col-span-6 col-span-12">
            <GeoChart
              title="Order By State"
              data={COUNTRY_DATA}
              region="US"
              className="h-full"
              theme={getThemeFromLocalStorage()}
            />
          </div>
          <div className="xl:col-span-6 col-span-12">
            <div className="border border-gray-light dark:border-gray-dark">
              <BarChart
                title="Total Sales By Revenue"
                data={CUSTOMER_PROFITABILITY.data}
                xAxisLabel=""
                yAxisLabel=""
                storeName={`${selectedStore.label} (${selectedDuration.label})`}
                showTooltip={true}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="border border-gray-light dark:border-gray-dark xl:col-span-3 col-span-12">
            <ContentHeader name="Top 5 Store Order By MarketPlace" />
            <ReactTable
              isListPage={false}
              COLUMNS={customerColumns}
              DATA={TOPCUSTOMERS_DATA}
              totalCount={TOPCUSTOMERS_DATA.length}
              noData="No data found as of now."
              showEditColumns={false}
              showFilter={false}
              showPagination={false}
            />
          </div>
          <div className="border border-gray-light dark:border-gray-dark xl:col-span-9 col-span-12">
            <ContentHeader name="Top 5 Store Order By MarketPlace" />
            <ReactTable
              isListPage={false}
              COLUMNS={topStoreColumns}
              DATA={TOP_STORE_ORDER_BY_MARKETPLACE}
              totalCount={TOP_STORE_ORDER_BY_MARKETPLACE.length}
              noData="No data found as of now."
              showEditColumns={false}
              showFilter={false}
              showPagination={false}
            />
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="xl:col-span-3 col-span-12">
            <OrderDetails
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
            />
          </div>
          <div className="xl:col-span-3 col-span-12">
            <OrderSyncedDetails
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
            />
          </div>
          <div className="xl:col-span-3 col-span-12">
            <StoreTypeTotalOrder
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
            />
          </div>
          <div className="xl:col-span-3 col-span-12">
            <Top5OrderedProducts
              storeName={`${selectedStore.label} (${selectedDuration.label})`}
            />
          </div>
          <div className="grid col-span-12 border border-gray-light dark:border-gray-dark w-full lg:p-6 p-4 gap-4 lg:gap-6">
            <UncapturedOrders
              selectedStore={selectedStore}
              selectedDuration={selectedDuration}
            />
          </div>
          <div className="grid col-span-12 border border-gray-light dark:border-gray-dark w-full lg:p-6 p-4 gap-4 lg:gap-6">
            <OrderByCustomerAndEmployee
              selectedStore={selectedStore}
              selectedDuration={selectedDuration}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDashboard;
