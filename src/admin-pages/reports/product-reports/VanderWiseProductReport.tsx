"use client";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { useCallback, useState, useMemo } from "react";
import { fetchVendorWiseProductReport } from "@/services/vendorwise-product-report/vendorwiseProductReport.service";
import { IVendorWiseProductEntry } from "@/types/vendorwise-product-report/vendorwiseProductReport.type";
import Loader from "@/components/common/Loader";
import Text from "@/components/Text/Text";

const COLUMN_HEADERS = {
    VENDOR_NAME: "Vendor Name",
    ACTIVE_PRODUCTS: "Active Products",
    INACTIVE_PRODUCTS: "Inactive Products",
    TOTAL_PRODUCTS: "Total Products",
    GTIN_MISSING: "GTIN Missing",
    NOT_READY_TO_SELL: "Not Ready to Sell",
    PARTIALLY_READY_TO_SELL: "Partially Ready to Sell",
    READY_TO_SELL: "Ready to Sell",
};

const VendorWiseProductReport = () => {
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [vendorWiseProductList, setVendorWiseProductList] = useState<IVendorWiseProductEntry[]>([]);

  const updatePaginationData = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: COLUMN_HEADERS.VENDOR_NAME,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.name}</Text>
        ),
      },
      {
        id: "activeProducts",
        accessorKey: "activeProducts",
        header: COLUMN_HEADERS.ACTIVE_PRODUCTS,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.activeProducts}</Text>
        ),
      },
      {
        id: "inActiveProduct",
        accessorKey: "inActiveProduct",
        header: COLUMN_HEADERS.INACTIVE_PRODUCTS,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.inActiveProduct}</Text>
        ),
      },
      {
        id: "totalProducts",
        accessorKey: "totalProducts",
        header: COLUMN_HEADERS.TOTAL_PRODUCTS,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.totalProducts}</Text>
        ),
      },
      {
        id: "gtinMissing",
        accessorKey: "gtinMissing",
        header: COLUMN_HEADERS.GTIN_MISSING,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.gtinMissing}</Text>
        ),
      },
      {
        id: "notReadyToSell",
        accessorKey: "notReadyToSell",
        header: COLUMN_HEADERS.NOT_READY_TO_SELL,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.notReadyToSell}</Text>
        ),
      },
      {
        id: "partiallyReadyToSell",
        accessorKey: "partiallyReadyToSell",
        header: COLUMN_HEADERS.PARTIALLY_READY_TO_SELL,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.partiallyReadyToSell}</Text>
        ),
      },
      {
        id: "readyToSell",
        accessorKey: "readyToSell",
        header: COLUMN_HEADERS.READY_TO_SELL,
        cell: (props: { row: { original: any } }) => (
          <Text size="sm">{props.row.original.readyToSell}</Text>
        ),
      },
    ],
    []
  );

  const getVendorWiseProductReport = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await fetchVendorWiseProductReport({
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
        });

        setVendorWiseProductList(response.items);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          hasPreviousPage: response.hasPreviousPage,
          hasNextPage: response.hasNextPage,
        }));
      } catch (error) {
        setError("Failed to fetch vendor-wise product report");
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize, sortingOptions]
  );

  return (
    <div>
      <ListPageHeader
        name={"Add Vendor"}
        moduleName={"Vendor Wise Product Report"}
      />

      {isLoading && <Loader />}
      {error && <Text>{error}</Text>}

      <ReactTable
        DATA={vendorWiseProductList}
        COLUMNS={COLUMNS}
        fetchData={getVendorWiseProductReport}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          updatePaginationData("pageSize", value);
        }}
        checkboxSelection={false}
        showFilter={false}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />
    </div>
  );
};

export default VendorWiseProductReport;
