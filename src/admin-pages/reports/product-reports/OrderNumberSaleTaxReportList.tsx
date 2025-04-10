"use client";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";
import orderStatusTaxReport from "@/mock-data/orderStatusTaxReport.json";
import { IPaginationData } from "@/types/system-log/systemLog.type";
import { IOrderStateTaxReport } from "@/types/order-state-tax-report/orderStateTax.type";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import { messageKeyOptions } from "@/utils/Dummy";
import ChartHeader from "@/components/charts/ChartHeader";

const COLUMNS: ITableColumn[] = [
  {
    id: "orderNumber",
    accessorKey: "orderNumber",
    header: "order Number",
  },
  {
    id: "state",
    accessorKey: "state",
    header: "state",
  },
  {
    id: "orderTax",
    accessorKey: "orderTax",
    header: "order Tax",
  },
  { id: "orderTotal", accessorKey: "orderTotal", header: "order Total" },
];

const OrderNumberSaleTaxReport = () => {
  const [productAttributesList, setProductAttributesList] = useState<
    IOrderStateTaxReport[]
  >([]);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState(
    messageKeyOptions[0].label
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: orderStatusTaxReport.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  const [filteringOptions, setColumnFilteringOptions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string | number | boolean;
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

  const totalOrderTax = productAttributesList.reduce(
    (total, value) => total + (value?.orderTax || 0),
    0
  );

  const totalOrderAmount = productAttributesList.reduce(
    (total, value) => total + value?.orderTotal,
    0
  );

  const getProductAttributesListList = useCallback(
    async (pageIndex = 1) => {
      try {
        const fetchedData = orderStatusTaxReport;
        const totalItems = fetchedData?.length || 0;

        const startIndex = (pageIndex - 1) * paginationData.pageSize;
        const endIndex = startIndex + paginationData.pageSize;

        const paginatedData = fetchedData.slice(startIndex, endIndex);

        setProductAttributesList(paginatedData);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex,
          totalCount: totalItems,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  return (
    <>
      <ListPageHeader moduleName={"Order number sales tax report"}>
        <Button
          onClick={() => {
            toast.success("Exported successfully");
          }}
        >
          Export
        </Button>
        <Dropdown
          defaultValue={messageKeyOptions[0].value}
          name="storeName"
          id="storeName"
          options={messageKeyOptions}
          onChange={(e: any) => setSelectedStore(e.label)}
          className="lg:w-48"
        />
      </ListPageHeader>
      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          title={`Tax report for: ${selectedStore}`}
          dateFilter={{
            showDateFilter: true,
            startDate: startDate,
            endDate: endDate,
            onStartDateChange: (date: Date) => {
              setStartDate(date);
            },
            onEndDateChange: (date: Date) => {
              setEndDate(date);
            },
          }}
        />
      </div>

      <ReactTable
        DATA={productAttributesList}
        COLUMNS={COLUMNS}
        fetchData={getProductAttributesListList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns={false}
        showFilter={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        showExportCSV
        onExportCSV={() => {}}
        calculateFooter={true}
        footerData={{
          orderNumber: "TOTAL",
          orderTax: `$${totalOrderTax}`,
          orderTotal: `$${totalOrderAmount}`,
        }}
        displaySearch={false}
      />
    </>
  );
};

export default OrderNumberSaleTaxReport;
