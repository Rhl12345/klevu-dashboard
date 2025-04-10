"use client";

import React, { useMemo, useState, useCallback } from "react";
import { IReportsStore } from "@/types/reports/reports";
import ReportsData from "@/mock-data/reports.json";
import Dropdown from "@/components/DropDown/DropDown";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { ColumnFiltersState } from "@tanstack/react-table";
import brandWiseProduct from "@/mock-data/brandWiseProduct.json";
import Image from "@/components/Image/Image";
import { IBrandWiseProduct } from "@/types/brand-wise-product/brandWiseProduct.type";

const BrandWiseProductReport = () => {
  const [store, setStore] = useState<IReportsStore>({ label: "", value: "" });
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

  const columns = useMemo<ITableColumn<IBrandWiseProduct>[]>(
    () => [
      {
        id: "bandWLogoUrl",
        header: "Brand Logo",
        accessorKey: "bandWLogoUrl",
        enableSorting: false,
        cell: ({ row }) => {
          const value = row?.original?.bandWLogoUrl;
          return (
            <>
              <div className="flex items-center h-20 w-20">
                <Image
                  src={value}
                  alt={`${value} logo`}
                  height={20}
                  width={20}
                  aspectRatio="landscape"
                  objectFit="contain"
                  rounded="sm"
                  variant="next"
                />
              </div>
            </>
          );
        },
      },
      {
        id: "brandName",
        header: "Brand Name",
        accessorKey: "brandName",
        cell: ({ row }) => {
          return <div>{row?.original?.brandName}</div>;
        },
      },
      {
        id: "storeName",
        header: "Store Name",
        accessorKey: "storeName",
        enableSorting: false,
        cell: ({ row }) => {
          const value = row?.original?.storeName;
          return (
            <>
              <div className="flex">
                <div className="h-16 w-16 mr-8 flex items-center justify-center overflow-hidden border">
                  <Image
                    src={row?.original?.storeNameLogo}
                    alt={`${row?.original?.storeName} logo`}
                    height={20}
                    width={20}
                    rounded="sm"
                    variant="next"
                    aspectRatio="landscape"
                    objectFit="contain"
                  />
                </div>
                <div className="flex items-center justify-center">{value}</div>
              </div>
            </>
          );
        },
      },
      {
        id: "activeProduct",
        header: "Active Products",
        accessorKey: "activeProduct",
        cell: ({ row }) => {
          return <div>{row?.original?.activeProduct}</div>;
        },
      },
      {
        id: "inActiveProduct",
        header: "InActive Products",
        accessorKey: "inActiveProduct",
        cell: ({ row }) => {
          return <div>{row?.original?.inActiveProduct}</div>;
        },
      },
      {
        id: "totalProducts",
        header: "Total Products",
        accessorKey: "totalProducts",
        cell: ({ row }) => {
          return <div>{row?.original?.totalProducts}</div>;
        },
      },
      {
        id: "upcGTinMissing",
        header: "UPc / GTIN Missing",
        accessorKey: "upC_GTINMissing",
        cell: ({ row }) => {
          return <div>{row?.original?.upC_GTINMissing}</div>;
        },
      },
      {
        id: "notReadyToSell",
        header: "Not Ready to sell",
        accessorKey: "notReadyToSell",
        cell: ({ row }) => {
          return <div>{row?.original?.notReadyToSell}</div>;
        },
      },
      {
        id: "partiallyReadyToSell",
        header: "Partially Ready to sell",
        accessorKey: "partiallyReadyToSell",
        cell: ({ row }) => {
          return <div>{row?.original?.partiallyReadyToSell}</div>;
        },
      },
      {
        id: "readyToSell",
        header: "Ready to sell",
        accessorKey: "readyToSell",
        cell: ({ row }) => {
          return <div>{row?.original?.readyToSell}</div>;
        },
      },
    ],
    []
  );

  return (
    <>
      <ListPageHeader moduleName={"Brandwise Product Report"}>
        <Dropdown
          defaultValue={store?.value}
          options={storeData}
          className="lg:w-48"
        />
      </ListPageHeader>

      <ReactTable
        COLUMNS={columns}
        DATA={brandWiseProduct.data}
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
        totalCount={brandWiseProduct.data.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        showFilter={false}
      />
    </>
  );
};

export default BrandWiseProductReport;
