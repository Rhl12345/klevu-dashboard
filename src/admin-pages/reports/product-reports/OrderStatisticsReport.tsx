"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  IReportsStore,
} from "@/types/reports/reports";
import { getErrorMessage } from "@/utils/common.util";
import ReportsData from "@/mock-data/reports.json";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { CURRENCY_SYMBOLS_BY_CODE, paginationDetails } from "@/utils/constants";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { ColumnFiltersState } from "@tanstack/react-table";
import orderStatisticsReportData from "@/mock-data/orderStatisticsReport.json";
import { getFormatDate } from "@/utils/date.util";
import { IOrderStatistics } from "@/types/order-statistics/orderStatistics.type";
import ChartHeader from "@/components/charts/ChartHeader";

const OrderStatisticsReport = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const storeData = useMemo<IReportsStore[]>(() => ReportsData.storeData, []);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    ColumnFiltersState[]
  >([]);
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [globalFilter, setGlobalFilter] = useState("");

  const [dateRange, setDateRange] = useState({
    startDate: DEFAULT_START_DATE,
    endDate: DEFAULT_END_DATE,
  });

  const setPaginationDataFunc = useCallback(
    (key: keyof typeof paginationDetails, value: number) => {
      setPagination((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    []
  );
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  const handleStoreChange = (newStore: unknown) => {
    const isReportsStore = (value: unknown): value is IReportsStore => {
      return (
        typeof value === "object" &&
        value !== null &&
        "label" in value &&
        "value" in value
      );
    };

    if (isReportsStore(newStore)) {
      setStore({
        label: newStore.label,
        value: newStore.value,
      });
      fetchProductData(newStore.value);
    } else {
      setStore({ label: "", value: "" });
    }
  };
  // Add API integration
  const fetchProductData = async (storeId: string) => {
    setLoading(true);
    try {
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  const handleExport = async () => {
    setLoading(true);
    try {
      const response = {
        data: { success: true, data: "https://www.google.com" },
      };
      if (response.data.success) {
        toast.success("Exported successfully");
        window.open(response.data.data, "_blank");
      } else {
        toast.error(getErrorMessage("Export failed"));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo<ITableColumn<IOrderStatistics>[]>(
    () => [
      {
        id: "day",
        header: "day",
        accessorKey: "day",
        cell: ({ row }) => {
          const value = row.original.day;
          return value ? (
            <>
              <div>{getFormatDate(value).date} </div>
              <div>{getFormatDate(value).time}</div>
            </>
          ) : (
            "-"
          );
        },
      },
      {
        id: "totalOrders",
        header: "TOTAL ORDERS",
        accessorKey: "totalOrders",
        cell: ({ row }) => {
          const value = row.original.totalOrders;
          return value ? <div>{value}</div> : "-";
        },
      },
      {
        id: "subTotal",
        header: `SUB TOTAL (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "subTotal",
        cell: ({ row }) => {
          const value = row.original.subTotal;
          return value ? <div>{Number(value).toFixed(2)}</div> : "0.00";
        },
      },
      {
        id: "tax",
        header: `TAX (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "tax",
        cell: ({ row }) => {
          const value = row.original.tax;
          return value ? <div>{Number(value).toFixed(2)}</div> : "0.00";
        },
      },
      {
        id: "shipping",
        header: `SHIPPING (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "shipping",
        cell: ({ row }) => {
          const value = row.original.shipping;
          return value ? <div>{Number(value).toFixed(2)}</div> : "0.00";
        },
      },
      {
        id: "refund",
        header: `REFUND (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "refund",
        cell: ({ row }) => {
          const value = row.original.refund;
          return value ? (
            <>
              <div>{Number(value).toFixed(2)}</div>
            </>
          ) : (
            "0.00"
          );
        },
      },
      {
        id: "discount",
        header: `DISCOUNT (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "discount",
        cell: ({ row }) => {
          const value = row.original.discount;
          return value ? <div>{Number(value).toFixed(2)}</div> : "0.00";
        },
      },
      {
        id: "adjustmentAmount",
        header: `ADJ. AMOUNT (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "adjustmentAmount",
        cell: ({ row }) => {
          const value = row.original.adjustmentAmount;
          return value ? <div>{Number(value).toFixed(2)}</div> : "0.00";
        },
      },
      {
        id: "total",
        header: `TOTAL (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "total",
        cell: ({ row }) => {
          const value = row.original.total;
          return value ? <div>{Number(value).toFixed(2)}</div> : "0.00";
        },
      },
    ],
    []
  );

  const handleDateChange = (type: "start" | "end") => (date: Date) => {
    setDateRange((prev) => ({
      ...prev,
      [type === "start" ? "startDate" : "endDate"]: date,
    }));
  };

  const calculateFooterData = useMemo(() => {
    const data = orderStatisticsReportData.orderStatisticsReportData;
    return {
      totalOrders: data.reduce((sum, row) => sum + (row.totalOrders || 0), 0),
      subTotal: data
        .reduce((sum, row) => sum + (row.subTotal || 0), 0)
        .toFixed(2),
      tax: data.reduce((sum, row) => sum + (row.tax || 0), 0).toFixed(2),
      shipping: data
        .reduce((sum, row) => sum + (row.shipping || 0), 0)
        .toFixed(2),
      refund: data.reduce((sum, row) => sum + (row.refund || 0), 0).toFixed(2),
      discount: data
        .reduce((sum, row) => sum + (row.discount || 0), 0)
        .toFixed(2),
      adjustmentAmount: data
        .reduce((sum, row) => sum + (row.adjustmentAmount || 0), 0)
        .toFixed(2),
      total: data.reduce((sum, row) => sum + (row.total || 0), 0).toFixed(2),
    };
  }, []);

  useEffect(() => {
    if (storeData.length > 0) {
      handleStoreChange(storeData[0] as IReportsStore);
    }
  }, [storeData]);

  return (
    <>
      <ListPageHeader moduleName={"Order Statistics"}>
        <Button size="sm" onClick={handleExport} disabled={loading}>
          Export
        </Button>
        <Dropdown
          onChange={handleStoreChange}
          defaultValue={store?.value}
          options={storeData}
          className="lg:w-48"
        />
      </ListPageHeader>

      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          dateFilter={{
            showDateFilter: true,
            startDate: DEFAULT_START_DATE,
            endDate: DEFAULT_END_DATE,
            onStartDateChange: handleDateChange("start"),
            onEndDateChange: handleDateChange("end"),
          }}
        />
      </div>
      {/* TODO: Add Low Inventory Report */}
      <ReactTable
        COLUMNS={columns}
        DATA={orderStatisticsReportData.orderStatisticsReportData}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={() => {}}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        totalCount={orderStatisticsReportData.orderStatisticsReportData.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        showFilter={false}
        displaySearch={false}
        calculateFooter={true}
        footerData={{
          day: "TOTAL",
          totalOrders: calculateFooterData.totalOrders,
          subTotal: calculateFooterData.subTotal,
          tax: calculateFooterData.tax,
          shipping: calculateFooterData.shipping,
          refund: calculateFooterData.refund,
          discount: calculateFooterData.discount,
          adjustmentAmount: calculateFooterData.adjustmentAmount,
          total: calculateFooterData.total,
        }}
      />
    </>
  );
};

export default OrderStatisticsReport;
