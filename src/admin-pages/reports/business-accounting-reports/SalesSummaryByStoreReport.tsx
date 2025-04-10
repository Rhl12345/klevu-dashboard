"use client";

import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import ChartHeader from "@/components/charts/ChartHeader";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";

import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";

import { IPaginationData } from "@/types/system-log/systemLog.type";
import { ITableColumn } from "@/components/Table/types";
import { ISalesSummaryByStoreValues } from "@/types/sales-summary-by-store-report/salesSummaryByStoreReport.type";
import { IReportsStore } from "@/types/reports/reports";
import { SALES_DATA, STORE_DATA } from "@/mock-data/salesSummaryByStoreReport";

const SalesSummaryByStoreReport = () => {
  const storeData = useMemo<IReportsStore[]>(() => STORE_DATA, []);

  const [loading, setLoading] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: 50,
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

  const COLUMNS: ITableColumn<ISalesSummaryByStoreValues>[] = useMemo(
    () => [
      {
        id: "storeName",
        accessorKey: "storeName",
        header: "STORE NAME",
      },
      {
        id: "subTotal",
        accessorKey: "subTotal",
        header: "SUB-TOTAL ($)",
      },
      {
        id: "coupons",
        accessorKey: "coupons",
        header: "COUPONS ($)",
      },
      {
        id: "shipping",
        accessorKey: "shipping",
        header: "SHIPPING ($)",
      },
      { id: "tax", accessorKey: "tax", header: "TAX ($)" },
      { id: "giftWrap", accessorKey: "giftWrap", header: "GIFT WRAP ($)" },
      { id: "adjustment", accessorKey: "adjustment", header: "ADJUSTMENT ($)" },
      { id: "total", accessorKey: "total", header: "TOTAL ($)" },
    ],
    []
  );

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = {
        data: { success: true, data: "" },
      };
      if (response.data.success) {
        toast.success("Exported successfully");
      } else {
        toast.error(getErrorMessage("Export failed"));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const calculateFooterData = useMemo(() => {
    const data = SALES_DATA;
    if (!data?.length) {
      return null;
    }
    return {
      subTotal: data
        .reduce((sum, row) => sum + (row.subTotal || 0), 0)
        .toFixed(2),
      tax: data.reduce((sum, row) => sum + (row.tax || 0), 0).toFixed(2),
      coupons: data
        .reduce((sum, row) => sum + (row.coupons || 0), 0)
        .toFixed(2),
      shipping: data
        .reduce((sum, row) => sum + (row.shipping || 0), 0)
        .toFixed(2),
      giftWrap: data
        .reduce((sum, row) => sum + (row.giftWrap || 0), 0)
        .toFixed(2),
      adjustment: data
        .reduce((sum, row) => sum + (row.adjustment || 0), 0)
        .toFixed(2),
      total: data.reduce((sum, row) => sum + (row.total || 0), 0).toFixed(2),
    };
  }, []);

  return (
    <>
      <ListPageHeader moduleName={"Sales Summary By Store (Received Orders)"}>
        <Button size="sm" onClick={handleExport} disabled={loading}>
          Export
        </Button>
        <div className="lg:w-48">
          <Dropdown name="storeName" id="storeName" options={storeData} />
        </div>
      </ListPageHeader>

      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          dateFilter={{
            showDateFilter: true,
            startDate: startDate,
            endDate: endDate,
            onStartDateChange: (date: Date) => {
              setStartDate(date);
              // Add your logic here to fetch data based on new date
            },
            onEndDateChange: (date: Date) => {
              setEndDate(date);
              // Add your logic here to fetch data based on new date
            },
          }}
        />
      </div>
      <ReactTable
        DATA={SALES_DATA}
        COLUMNS={COLUMNS}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        displaySearch={false}
        showFilter={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
        noData="No Sales Summary By Store (Received Orders) data available"
        calculateFooter={true}
        footerData={{
          storeName: "TOTAL",
          subTotal: `${calculateFooterData?.subTotal}$`,
          coupons: `${calculateFooterData?.coupons}$`,
          shipping: `${calculateFooterData?.shipping}$`,
          tax: `${calculateFooterData?.tax}$`,
          giftWrap: `${calculateFooterData?.giftWrap}$`,
          adjustment: `${calculateFooterData?.adjustment}$`,
          total: `${calculateFooterData?.total}$`,
        }}
      />
    </>
  );
};

export default SalesSummaryByStoreReport;
