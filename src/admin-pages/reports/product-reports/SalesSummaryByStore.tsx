"use client";
import React, { useCallback, useState } from "react";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import { IPaginationData } from "@/types/system-log/systemLog.type";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Button from "@/components/Button/Button";
import { PageRoutes } from "@/admin-pages/routes";
import { messageKeyOptions } from "@/utils/Dummy";
import ChartHeader from "@/components/charts/ChartHeader";
import salesSummaryByStoreShippedDate from "@/mock-data/salesSummaryByStoreShippedDate.json";
import Dropdown from "@/components/DropDown/DropDown";
import { getFormatDate } from "@/utils/date.util";
import { ISalesSummaryByStoreShippedDate } from "@/types/sales-summary-by-store-shipped-date/salesSummaryByStoreShippedDate.type";
import ReactTable from "@/components/Table/ReactTable";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";

const COLUMNS: ITableColumn[] = [
  { id: "websiteName", accessorKey: "websiteName", header: "store name" },
  {
    id: "orderId",
    accessorKey: "orderId",
    header: "order number",
  },
  {
    id: "shippedDate",
    accessorKey: "shippedDate",
    header: "shipped Date",
    filterFn: "shippedDate",
    cell: ({ row }: any) => {
      const { date, time } = getFormatDate(row?.original?.shippedDate);
      return row?.original?.shippedDate ? (
        <>
          <div>{date} </div>
          <div className="text-xs font-normal">{time}</div>
        </>
      ) : (
        ""
      );
    },
  },
  {
    id: "orderStatus",
    accessorKey: "orderStatus",
    header: "order Status",
  },
  { id: "totalSales", accessorKey: "totalSales", header: "total Sales ($)" },
  { id: "transactions", accessorKey: "transactions", header: "transactions" },
  { id: "unitsSold", accessorKey: "unitsSold", header: "units Sold" },
];

const SalesSummaryByStoreShippedDate = () => {
  const [salesSummaryByStoreList, setSalesSummaryByStoreListList] = useState<
    ISalesSummaryByStoreShippedDate[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: salesSummaryByStoreShippedDate.length,
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

  const totalSales = salesSummaryByStoreList.reduce(
    (acc, nxt) => acc + (nxt.totalSales || 0),
    0
  );

  const getProductAttributesListList = useCallback(
    async (pageIndex = 1) => {
      try {
        setIsLoading(true);
        const fetchedData = salesSummaryByStoreShippedDate;
        const totalItems = fetchedData?.length || 0;
        const startIndex = (pageIndex - 1) * paginationData.pageSize;
        const endIndex = startIndex + paginationData.pageSize;
        const paginatedData = fetchedData.slice(startIndex, endIndex);
        setSalesSummaryByStoreListList(paginatedData);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex,
          totalCount: totalItems,
        }));
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
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
      <ListPageHeader
        moduleName={"Sales Summary By Store (Shipped Date)"}
        navigateUrl={PageRoutes.REPORTS.LIST}
        showBackButton={true}
      >
        <Button>Export</Button>
        <Dropdown
          className="lg:w-48"
          defaultValue={messageKeyOptions[0].value}
          name="storeName"
          id="storeName"
          options={messageKeyOptions}
        />
      </ListPageHeader>
      <div className="border border-b-0 border-gray-light dark:border-gray-dark xl:mx-8 mx-4 xl:mt-8 mt-4 border-b-transparent ">
        <ChartHeader title="Sales Summary By Store (Shipped Date)" />
      </div>

      <ReactTable
        DATA={salesSummaryByStoreList}
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
          websiteName: "TOTAL",
          totalSales: `$${totalSales.toFixed(2)}`,
        }}
        displaySearch={false}
        noData="No Categories data available"
        loading={isLoading}
      />
    </>
  );
};

export default SalesSummaryByStoreShippedDate;
