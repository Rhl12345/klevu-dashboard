import React, { useState } from "react";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import storeCategoryList from "@/mock-data/StoreCategoryList.json";
import Status from "@/components/DisplayStatus/Status";
import { ITableColumn } from "@/components/Table/types";
const DEFAULT_SORTING = [
  {
    field: "vendorName",
    direction: 0,
    priority: 0,
  },
];
/**
 * ProductList component displays a list of products with sorting and pagination.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.id - The ID of the product list.
 * @returns {JSX.Element} The rendered ProductList component.
 */
const ProductList = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sortingOptions, setSortingOptions] = useState(DEFAULT_SORTING);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  /**
   * Updates pagination data based on the provided key and value.
   * 
   * @param {string} key - The key of the pagination data to update.
   * @param {any} value - The new value for the pagination data.
   */
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const columns: ITableColumn[] = [
    {
      id: "Image",
      accessorKey: "Image",
      header: "Image",
      cell: (props: any) => {
        return (
          <div className="flex items-center w-10 h-10">
            <Image
              src={props.row.original.Image}
              alt={`${props.row.original.name} logo`}
              aspectRatio="landscape"
              objectFit="fill"
              rounded="sm"
              variant="next"
              className="w-full h-auto object-contain"
              width={40}
              height={30}
            />
          </div>
        );
      },
    },
    {
      id: "Name",
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "SKU",
      accessorKey: "sku",
      header: "SKU",
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: (props) => {
        if (props.getValue() !== undefined) {
          return <Status type={props.getValue()} />;
        } else {
          return "";
        }
      },
    },
  ];
  /**
   * Sets the sorting option for the table.
   * 
   * @param {string} column - The column to sort by.
   * @param {number} direction - The direction of the sort (0 for ascending, 1 for descending).
   */
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  return (
    <div>
      <ReactTable
        COLUMNS={columns}
        DATA={storeCategoryList.productData}
        showFilter={false}
        loading={isLoading}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        isListPage={false}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        totalCount={storeCategoryList.productData.length}
      />
    </div>
  );
};

export default ProductList;
