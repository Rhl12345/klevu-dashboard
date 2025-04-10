"use client";
import React, { useCallback, useState } from "react";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { messageKeyOptions } from "@/utils/Dummy";
import ChartHeader from "@/components/charts/ChartHeader";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import top100SellingProducts from "@/mock-data/top100SellingProducts.json";
import { ITopSellingList } from "@/types/top-100-selling-products/top100SellingProducts.type";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
const Top100SellingProducts = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [topSellingList, setTopSellingList] = useState<ITopSellingList[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: top100SellingProducts.data.length,
  });
  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const getTopSellingList = useCallback(async () => {
    // API call implementation
    try {
      setTopSellingList(top100SellingProducts.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);
  const COLUMNS: ITableColumn<ITopSellingList>[] = [
    {
      id: "sr_no",
      accessorKey: "sr_no",
      header: "Sr.no.",
    },
    { id: "product_name", accessorKey: "product_name", header: "Product Name" },
    { id: "sku", accessorKey: "sku", header: "Sku" },
    {
      id: "total_quantity",
      accessorKey: "total_quantity",
      header: "Total Quantity",
    },
    { id: "total_order", accessorKey: "total_order", header: "Total Order" },
  ];

  return (
    <>
      <ListPageHeader moduleName="Top 100 selling products">
        <Button
          onClick={() => {
            toast.success("Exported successfully");
          }}
        >
          Export
        </Button>
        <Dropdown
          name="storeName"
          id="storeName"
          options={messageKeyOptions}
          className="lg:w-48"
        />
      </ListPageHeader>
      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent  ">
        <ChartHeader
          title=""
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
        DATA={topSellingList}
        COLUMNS={COLUMNS}
        fetchData={getTopSellingList}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showFilter={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
        displaySearch="left"
        noData="No Top 100 selling products data available"
      />
    </>
  );
};

export default Top100SellingProducts;
