import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { IProductTableProptype, IProductTableProps } from "@/types/company/product-table";
import { paginationDetails } from "@/utils/constants";
import React, { useCallback, useState } from "react";

const ProductTable= ({
  api,
  companyId,
  customerId,
  columnHeaderDate,
  columnHeaderCount,
  columnHide,
  accessorDate,
  columnNameDate,
  accessorViewCount,
  columnNameCount,
}:IProductTableProps) => {
  const [data, setData] = useState<IProductTableProptype[]>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "orderStatus",
      direction: 0,
      priority: 0,
    },
    {
      field: "order",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const COLUMNS: ITableColumn<IProductTableProptype>[] = [
    {
      id: "image",
      accessorKey: "image",
      header: "Image",
    },
    {
      id: "sku",
      accessorKey: "ourSKU",
      header: "sku",
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Title",
    },
    {
      id: "status",
      accessorKey: "recStatus",
      header: "Status ",
    },
    {
      id: "productCount",
      accessorKey: "productCount",
      header: "Quantity ",
    },

    {
      id: "ourcost",
      accessorKey: "ourcost",
      header: "Estimated Cost",
    },

    {
      id: "salePrice",
      accessorKey: "salePrice",
      header: "Default List Price",
    },
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
    },
  ];

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getDataList = useCallback(
    (pageIndex = 1) => {
      const startIndex = (pageIndex - 1) * paginationData.pageSize;
      const endIndex = startIndex + paginationData.pageSize;
      const paginatedData = data.slice(startIndex, endIndex);

      setPaginationData((prevState: any) => ({
        ...prevState,
        pageIndex: pageIndex,
        totalCount: data.length,
        totalPages: Math.ceil(data.length / paginationData.pageSize),
        hasPreviousPage: pageIndex > 1,
        hasNextPage: endIndex < data.length,
      }));
    },
    [data, paginationData.pageSize]
  );

  return (
   
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={data}
        fetchData={getDataList}
        sortingOptions={sortingOptions}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        displaySearch={false}
        showFilter={false}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        setSortingOptionHandler={setSortingOptionHandler}
        hasNextPage={paginationData.hasNextPage}
        isListPage={false}
      />
  );
};

export default ProductTable;
