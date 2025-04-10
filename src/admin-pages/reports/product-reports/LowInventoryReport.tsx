"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { IReportsStore } from "@/types/reports/reports";
import { getErrorMessage } from "@/utils/common.util";
import ReportsData from "@/mock-data/reports.json";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import lowInventory from "@/mock-data/lowInventory.json";
import { paginationDetails } from "@/utils/constants";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ILowInventoryData } from "@/types/low-inventory/lowInventory.type";

const LowInventoryReport = () => {
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
  // Better type guard
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

  const columns = useMemo<ITableColumn<ILowInventoryData>[]>(
    () => [
      {
        id: "srNo",
        header: "SR NO.",
        accessorKey: "srno",
        cell: ({ row }) => {
          const value = row?.original?.srno;
          return value ? value : "-";
        },
      },
      {
        id: "productName",
        header: "PRODUCT NAME",
        accessorKey: "productName",
        cell: ({ row }) => {
          const value = row?.original?.productName;
          return value ? value : "-";
        },
      },
      {
        id: "sku",
        header: "SKU",
        accessorKey: "sku",
        cell: ({ row }) => {
          const value = row?.original?.sku;
          return value ? value : "-";
        },
      },
      {
        id: "storeName",
        header: "STORE NAME",
        accessorKey: "storeName",
        cell: ({ row }) => {
          const value = row?.original?.storeName;
          return value ? value : "-";
        },
      },
      {
        id: "totalQuantity",
        header: "QUANTITY",
        accessorKey: "totalQuantity",
        cell: ({ row }) => {
          const value = row?.original?.totalQuantity;
          return value ? value : 0;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (storeData.length > 0) {
      handleStoreChange(storeData[0] as IReportsStore);
    }
  }, [storeData]);

  return (
    <>
      <ListPageHeader moduleName={"Low Inventory"}>
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

      {/* TODO: Add Low Inventory Report */}
      <ReactTable
        COLUMNS={columns}
        DATA={lowInventory.lowInventoryReportData}
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
        totalCount={lowInventory.lowInventoryReportData.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        showFilter={false}
        displaySearch={false}
      />
    </>
  );
};

export default LowInventoryReport;
