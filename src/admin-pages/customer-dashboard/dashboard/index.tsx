"use client";
import React, { useState } from "react";
import Dropdown from "@/components/DropDown/DropDown";
import Text from "@/components/Text/Text";
import ReactTable from "@/components/Table/ReactTable";
import GeoChart from "@/components/charts/geo-chart/GeoChart";
import { ITableColumn } from "@/components/Table/types";
import PieChart from "@/components/charts/pie-chart/PieChart";
import {
  COMPANY_STATS,
  FREQUENT_CUSTOMERS_DATA,
  REVENUE_STATS,
  REVIEWS_DATA,
  REVIEWS_CHART_DATA,
  STORE_DURATON,
  STORE_OPTIONS,
  TOP_CUSTOMERS_DATA,
  COUNTRY_DATA,
} from "@/mock-data/customerDashboard";
import Status from "@/components/DisplayStatus/Status";
import { getThemeFromLocalStorage } from "@/utils/localStorage.utlis";
import { Label } from "@/components/Label/Label";
import ContentHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";

const CustomerDashboard = () => {
  // State for filters
  const [selectedStore, setSelectedStore] = useState({
    label: "All Stores",
    value: "all",
  });
  const [selectedDuration, setSelectedDuration] = useState({
    label: "Last 24 Hours",
    value: "24h",
  });

  // Add this mock data

  // Table columns configuration
  const reviewColumns: ITableColumn[] = [
    { id: "productName", header: "Product Name", accessorKey: "productName" },
    { id: "storeName", header: "Store Name", accessorKey: "storeName" },
    {
      id: "time",
      header: "Time",
      accessorKey: "time",
      cell: ({ row }: { row: { original: any } }) => {
        let dateTime = row.original.time.split(" ");
        return (
          <>
            <div>{dateTime[0]}</div>
            <div className="text-xs font-normal">{dateTime[1]}</div>
          </>
        );
      },
    },
    { id: "reviewer", header: "Reviewer", accessorKey: "reviewer" },
    { id: "review", header: "Review", accessorKey: "review" },
    { id: "rating", header: "Rating", accessorKey: "rating" },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: any } }) => (
        <Status type={row.original.status === "Approved" ? "Approved" : "P"} />
      ),
    },
  ];

  const customerColumns: ITableColumn[] = [
    { id: "index", header: "#", accessorKey: "id" },
    { id: "name", header: "Customer Name", accessorKey: "name" },
    { id: "profit", header: "Total Profit ($)", accessorKey: "profit" },
  ];

  const frequentCustomerColumns: ITableColumn[] = [
    { id: "name", header: "Customer Name", accessorKey: "name" },
    { id: "email", header: "Customer Email", accessorKey: "email" },
    { id: "tags", header: "Customer Tags", accessorKey: "tags" },
    {
      id: "lastOrderDate",
      header: "Last Order Date",
      accessorKey: "lastOrderDate",
    },
    { id: "orderCount", header: "Order Count", accessorKey: "orderCount" },
    { id: "totalSpent", header: "Total Spent ($)", accessorKey: "totalSpent" },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: any } }) => (
        <Status type={row.original.status === "Active" ? "A" : "I"} />
      ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto flex flex-col gap-4 lg:gap-8">
      {/* Header Filters */}
      <div className="flex flex-wrap sm:justify-between sm:items-center top-0 z-20 gap-4 lg:gap-6">
        <div className="flex flex-wrap justify-between items-center grow"></div>
        <div className="flex flex-wrap gap-4 lg:gap-6 justify-end">
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
      <div className="grid grid-cols-12 gap-6 max-w-full mx-auto gap-4 lg:gap-6">
        {/* Company Stats */}
        <div className="border border-gray-light dark:border-gray-dark  xl:col-span-3 col-span-12 md:col-span-6">
          <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">

          <Label size="large">Company</Label>
          <div className="space-y-2 mt-2">
            <Text className="text-xs font-normal">
              Store: {selectedStore.label}({selectedDuration.label})
            </Text>
            </div>
          </div>
            <div className="flex flex-col gap-2 p-4">    
            <Text>Active: {COMPANY_STATS.active}</Text>
            <Text>Inactive: {COMPANY_STATS.inactive}</Text>
            <Text>Total: {COMPANY_STATS.total}</Text>
          </div>
        </div>

        {/* Revenue Stats */}

        <div className="border border-gray-light dark:border-gray-dark  xl:col-span-3 col-span-12 md:col-span-6">
          <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
            <Label className="!p-0" size="large">Ecommerce Revenue</Label>
            <Text className="text-xs font-normal">
              Store: {selectedStore.label}({selectedDuration.label})
            </Text>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <Text>Order Total: ${REVENUE_STATS.ecommerce.orderTotal}</Text>
            <Text>Revenue: ${REVENUE_STATS.ecommerce.revenue}</Text>
          </div>
        </div>
        <div className="border border-gray-light dark:border-gray-dark  xl:col-span-3 col-span-12 md:col-span-6">
          <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
            <Label className="!p-0" size="large">Corporate Store Revenue</Label>
            <Text className="text-xs font-normal">
              Store: {selectedStore.label}({selectedDuration.label})
            </Text>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <Text>Order Total: ${REVENUE_STATS.corporateStore.orderTotal}</Text>
            <Text>Revenue: ${REVENUE_STATS.corporateStore.revenue}</Text>
          </div>
        </div>
        <div className="border border-gray-light dark:border-gray-dark  xl:col-span-3 col-span-12 md:col-span-6">
            <div className="flex flex-col gap-1 border-b border-gray-light dark:border-gray-dark w-full !px-4 !py-2">
            <Label className="!p-0" size="large">Store Builder Revenue</Label>
            <Text className="text-xs font-normal">
              Store: {selectedStore.label}({selectedDuration.label})
            </Text>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <Text>Order Total: ${REVENUE_STATS.storeBuilder.orderTotal}</Text>
            <Text>Revenue: ${REVENUE_STATS.storeBuilder.revenue}</Text>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        <div className="xl:col-span-4 col-span-12">
          <PieChart
            title="Reviews Distribution"
            data={REVIEWS_CHART_DATA}
            showTooltip={true}
            showLabels={false}
            centerLabel={{
              text: "Total Reviews",
              value: "1,100",
            }}
            className="h-full"
            tooltipFormatter={(value, name) => [`${value} reviews`, name]}
          />
        </div>
        <div className="xl:col-span-8 col-span-12">
          <div className="border border-gray-light dark:border-gray-dark">
            <ContentHeader name="Latest Reviews" />

            <ReactTable
              COLUMNS={reviewColumns}
              DATA={REVIEWS_DATA}
              totalCount={REVIEWS_DATA.length}
              noData="No data found as of now."
              isListPage={false}
              showEditColumns={false}
              showFilter={false}
              showPagination={false}
            />
          </div>
        </div>
      </div>

      {/* Customer Profitability */}
      <div className="grid grid-cols-12 gap-4 lg:gap-6">
        <div className="xl:col-span-6 col-span-12">
          <GeoChart
            title="Customer By State"
            data={COUNTRY_DATA}
            region="US"
            className="h-full"
            theme={getThemeFromLocalStorage()}
          />
        </div>
        <div className="xl:col-span-6 col-span-12">
          <div className="border border-gray-light dark:border-gray-dark">
            <ContentHeader name="Top Customer By Profitability" />
            <ReactTable
              isListPage={false}
              COLUMNS={customerColumns}
              DATA={TOP_CUSTOMERS_DATA}
              totalCount={TOP_CUSTOMERS_DATA.length}
              noData="No data found as of now."
              showEditColumns={false}
              showFilter={false}
              showPagination={false}
            />
          </div>
        </div>
      </div>

      {/* Frequent Customers */}
      <div className="border border-gray-light dark:border-gray-dark">
        <ContentHeader name="Which are the customers who buy most frequently on the site?" />
        <div className="max-h-[400px] overflow-y-auto">
          <ReactTable
            COLUMNS={frequentCustomerColumns}
            DATA={FREQUENT_CUSTOMERS_DATA}
            noData="No data found"
            totalCount={FREQUENT_CUSTOMERS_DATA.length}
            isListPage={false}
            showEditColumns={false}
            showFilter={false}
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
