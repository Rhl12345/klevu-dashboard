import React, { useMemo, useState } from "react";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import Status from "@/components/DisplayStatus/Status";
import CommonLineChart from "@/admin-pages/reports/components/CommonLineChart";
import { ITableColumn } from "@/components/Table/types";
import { ILifeCycle } from "@/types/company/company.type";
import { paginationDetails } from "@/utils/constants";
import lifeCycle from "@/mock-data/lifeCycle.json";
import { toast } from "react-toastify";
import { getFormatDate } from "@/utils/date.util";
import { STORE_OPTIONS } from "@/utils/Dummy";

import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
/**
 * Lifecycle Component
 * Displays lifecycle data with filtering, chart visualization and tabular view
 * @returns {JSX.Element} Lifecycle component
 */
const Lifecycle = () => {
  // State management
  const [lifeCycleData, setLifeCycleData] = useState<ILifeCycle[]>(
    lifeCycle.orders
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: lifeCycle.orders.length,
  });

  // Handlers
  /**
   * Handles date range changes for the lifecycle data
   * @param {string} type - Type of date change ('start' or 'end')
   * @returns {(date: Date) => void} Date change handler
   */

  const handlePaginationChange = (key: string, value: number | string) => {
    try {
      setPaginationData((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    } catch (error) {
      toast.error("Pagination update failed");
      // Add error handling logic
    }
  };

  // Table columns configuration
  const COLUMNS = useMemo<ITableColumn<ILifeCycle>[]>(
    () => [
      {
        id: "Order Date",
        accessorKey: "OrderDate",
        header: "Order Date",
        cell: ({ row }) => {
          return row?.original?.OrderDate ? (
            <>
              <div>{getFormatDate(row.original.OrderDate).date}</div>
              <div className=" text-xs ">
                {getFormatDate(row.original.OrderDate).time}
              </div>
            </>
          ) : null;
        },
      },
      {
        id: "Orders Amount",
        accessorKey: "OrdersAmount",
        header: "Orders Amount",
      },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "Status",
        cell: (props) => {
          const value = props.getValue();
          return value ? <Status type={value} /> : "";
        },
      },
      {
        id: "Customer Name",
        accessorKey: "CustomerName",
        header: "Customer Name",
      },
    ],
    []
  );

  // Render methods
  const renderHeader = () => (
    <ContentPageHeader name="Catalog Changes">
      <div className="flex gap-2">
        <div>
          <Dropdown
            options={STORE_OPTIONS}
            placeholder="Select...."
            className="w-60"
          />
        </div>
      </div>
    </ContentPageHeader>
  );

  const renderChart = () => (
    <div className="ga-4 lg:gap-6 lg:pt-6 lg:px-6 pt-4 px-4">
      <CommonLineChart
        title="Lifecycle"
        data={lifeCycle.allTimeAverageOrders.data}
        showTooltip={true}
        xAxisLabel="Orders Amount"
        yAxisLabel=""
        showDateFilter={true}
      />
    </div>
  );

  const renderTable = () => (
    <ReactTable
      COLUMNS={COLUMNS}
      DATA={lifeCycleData}
      pageIndex={paginationData.pageIndex}
      totalCount={paginationData.totalCount}
      setTablePageSize={(value) => handlePaginationChange("pageSize", value)}
      pageSize={paginationData.pageSize}
      loading={isLoading}
      showFilter={false}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      hasPreviousPage={paginationData.hasPreviousPage}
      hasNextPage={paginationData.hasNextPage}
      isListPage={false}
    />
  );

  return (
    <>
      <div className="w-full lg:py-8 xl:px-8 py-4 px-4">
        <div className="border border-gray-light dark:border-gray-dark">
          {renderHeader()}
          {renderChart()}
          {renderTable()}
        </div>
      </div>
    </>
  );
};

export default Lifecycle;
