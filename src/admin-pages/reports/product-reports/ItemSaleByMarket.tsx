"use client";
import React, { useCallback, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import { ColumnFiltersState } from "@tanstack/react-table";
import itemSaleByMarketListDummayData from "@/mock-data/itemSaleByMarketListDummayData.json";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import ChartHeader from "@/components/charts/ChartHeader";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import { messageKeyOptions } from "@/utils/Dummy";
import { IitemSaleByMarketList } from "@/types/Item-sale-by-market-list/itemSaleByMarketList.type";
const ItemSaleByMarketList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [itemSaleByMarketList, setItemSaleByMarketList] = useState<
    IitemSaleByMarketList[]
  >([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: itemSaleByMarketListDummayData.data.length,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const getNavSkuMappingList = useCallback(async () => {
    // API call implementation
    try {
      setItemSaleByMarketList(itemSaleByMarketListDummayData.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  const COLUMNS: ITableColumn<IitemSaleByMarketList>[] = [
    {
      id: "productName",
      accessorKey: "productName",
      header: "PRODUCT NAME",
    },
    { id: "SKU", accessorKey: "SKU", header: "SKU" },
    { id: "unitSold", accessorKey: "unitSold", header: "UNIT SOLD" },
    {
      id: "shippingCost",
      accessorKey: "shippingCost",
      header: "SHIPPING COST ($)",
    },
    { id: "salesTax", accessorKey: "salesTax", header: "SALES TAX ($)" },
    { id: "revenue", accessorKey: "revenue", header: "REVENUE ($)" },
  ];

  return (
    <>
      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader
          title="Summary for sales on"
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
        DATA={itemSaleByMarketList}
        COLUMNS={COLUMNS}
        fetchData={getNavSkuMappingList}
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
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
        noData="No Item Sale By Market data available"
      />
    </>
  );
};

export default ItemSaleByMarketList;
