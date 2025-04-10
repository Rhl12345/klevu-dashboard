"use client";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { useCallback, useState, useMemo } from "react";
import { fetchProductStatusReport } from "@/services/product-status-report/productStatusReport.service";
import { IProductStatusEntry, IProductStatusReportRequest } from "@/types/product-status-report/productStatusReport.type";
import Loader from "@/components/common/Loader";
import Text from "@/components/Text/Text";
import Status from "@/components/DisplayStatus/Status";
import { toast } from 'react-toastify';

const COLUMN_HEADERS = {
    PRODUCT_NAME: "Product Name",
    GTIN_MISSING: "GTIN Missing",
    NOT_READY_TO_SELL: "Not Ready to Sell",
    PARTIALLY_READY_TO_SELL: "Partially Ready to Sell",
    READY_TO_SELL: "Ready to Sell",
};

const ProductStatusReport = () => {
  const [sortingOptions, setSortingOptions] = useState<IProductStatusReportRequest['sortingOptions']>([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [productStatusEntries, setProductStatusEntries] = useState<IProductStatusEntry[]>([]);

  const updatePaginationData = (key: keyof typeof paginationData, value: any) => {
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
        header: COLUMN_HEADERS.PRODUCT_NAME,
        cell: (props: { row: { original: IProductStatusEntry } }) => (
          <Text size="sm">{props.row.original.name}</Text>
        ),
      },
      {
        id: "productStatus",
        accessorKey: "productStatus",
        header: "Status",
        cell: (props: { row: { original: IProductStatusEntry } }) => (
          <Status
            type={props.row.original.productStatus === "A" ? "active" : "inactive"}
          />
        ),
      },
      {
        id: "gtinMissing",
        accessorKey: "gtinMissing",
        header: COLUMN_HEADERS.GTIN_MISSING,
        cell: (props: { row: { original: IProductStatusEntry } }) => (
          <Text size="sm">{props.row.original.gtinMissing}</Text>
        ),
      },
      {
        id: "notReadyToSell",
        accessorKey: "notReadyToSell",
        header: COLUMN_HEADERS.NOT_READY_TO_SELL,
        cell: (props: { row: { original: IProductStatusEntry } }) => (
          <Text size="sm">{props.row.original.notReadyToSell}</Text>
        ),
      },
      {
        id: "partiallyReadyToSell",
        accessorKey: "partiallyReadyToSell",
        header: COLUMN_HEADERS.PARTIALLY_READY_TO_SELL,
        cell: (props: { row: { original: IProductStatusEntry } }) => (
          <Text size="sm">{props.row.original.partiallyReadyToSell}</Text>
        ),
      },
      {
        id: "readyToSell",
        accessorKey: "readyToSell",
        header: COLUMN_HEADERS.READY_TO_SELL,
        cell: (props: { row: { original: IProductStatusEntry } }) => (
          <Text size="sm">{props.row.original.readyToSell}</Text>
        ),
      },
    ],
    []
  );

  const fetchProductStatusReportData = useCallback(
    async (pageIndex = 1): Promise<void> => {
      try {
        setErrorMessage(null);
        setIsLoading(true);
        const response = await fetchProductStatusReport({
          pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
        });

        setProductStatusEntries(response.items);
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
        setErrorMessage("Failed to fetch product status report");
        toast.error("Failed to fetch product status report");
      } finally {
        setIsLoading(false);
      }
    },
    [paginationData.pageSize, sortingOptions]
  );

  return (
    <div>
      <ListPageHeader
        name={"Add Product"}
        moduleName={"Product Status Report"}
      />

      {isLoading && <Loader />}
      {errorMessage && <Text>{errorMessage}</Text>}

      <ReactTable
        DATA={productStatusEntries}
        COLUMNS={COLUMNS}
        fetchData={fetchProductStatusReportData}
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

export default ProductStatusReport;
