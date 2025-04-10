"use client";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";
import revenueSummaryData from "@/mock-data/revenueSummaryData.json";
import { IPaginationData } from "@/types/system-log/systemLog.type";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import { messageKeyOptions } from "@/utils/Dummy";
import ChartHeader from "@/components/charts/ChartHeader";
import { IRevenueSummary } from "@/types/revenue-summary/revenueSummary.type";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const ReactTable = dynamic(() => import("@/components/Table/ReactTable"), {
  loading: () => <Loader />,
  ssr: false,
});

const COLUMNS: ITableColumn[] = [
  {
    id: "srno",
    accessorKey: "srno",
    header: "srno",
  },
  {
    id: "month",
    accessorKey: "month",
    header: "Month",
  },
  {
    id: "total_orders",
    accessorKey: "total_orders",
    header: "total Orders",
  },
  { id: "subtotal", accessorKey: "subtotal", header: "subtotal ($)" },
  { id: "tax", accessorKey: "tax", header: "tax ($)" },
  { id: "shipping", accessorKey: "shipping", header: "shipping ($)" },
  { id: "refund", accessorKey: "refund", header: "refund ($)" },
  { id: "discount", accessorKey: "discount", header: "discount ($)" },
  { id: "adj_amount", accessorKey: "adj_amount", header: "ADJ. AMOUNT ($)" },
  { id: "total", accessorKey: "total", header: "total ($)" },
];

const RevenueSummary = () => {
  const [productAttributesList, setProductAttributesList] = useState<
    IRevenueSummary[]
  >([]);

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [dropdownStoreValue, setDropdownStoreValue] = useState(
    messageKeyOptions[0].label
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: revenueSummaryData.length,
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

  const {
    total_orders,
    subtotal,
    totalTaxAmount,
    shipping,
    refund,
    discount,
    adj_amount,
    total,
  } = productAttributesList.reduce(
    (acc, value) => {
      acc.total_orders += value?.total_orders || 0;
      acc.subtotal += value?.subtotal || 0;
      acc.totalTaxAmount += value?.tax || 0;
      acc.shipping += value?.shipping || 0;
      acc.refund += value?.refund || 0;
      acc.discount += value?.discount || 0;
      acc.adj_amount += value?.adj_amount || 0;
      acc.total += value?.total || 0;
      return acc;
    },
    {
      total_orders: 0,
      subtotal: 0,
      totalTaxAmount: 0,
      shipping: 0,
      refund: 0,
      discount: 0,
      adj_amount: 0,
      total: 0,
    }
  );

  const getProductAttributesListList = useCallback(
    async (pageIndex = 1) => {
      try {
        const fetchedData = revenueSummaryData;
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
      <ListPageHeader moduleName={"Revenue Summary"}>
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
          onChange={(e: any) => setDropdownStoreValue(e.label)}
          className="lg:w-48"
        />
      </ListPageHeader>
      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          title={`Revenue Summary report for: ${dropdownStoreValue}`}
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
        // Enables the footer calculation for totals
        calculateFooter={true}
        // Footer data, displaying totals with conditional currency formatting
        footerData={{
          srno: "TOTAL", // Label for the footer row
          // Ensuring numeric values are formatted properly
          total_orders: `${total_orders}`,
          subtotal: `$${subtotal.toFixed(2)}`,
          tax: `$${totalTaxAmount.toFixed(2)}`,
          shipping: `$${shipping.toFixed(2)}`,
          refund: `$${refund.toFixed(2)}`,
          discount: `$${discount.toFixed(2)}`,
          adj_amount: `$${adj_amount.toFixed(2)}`,
          total: `$${total.toFixed(2)}`,
        }}
        displaySearch={false}
      />
    </>
  );
};

export default RevenueSummary;
