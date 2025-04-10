"use client";
import React, { useCallback, useState } from "react";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import { ITableColumn } from "@/components/Table/types";
import ReactTable from "@/components/Table/ReactTable";
import { IProductListingReport } from "@/types/product-listing-report/productListingReport.type";
import { paginationDetails } from "@/utils/constants";
import productListingReportDummayData from "@/mock-data/productListingReportDummayData.json";
import Image from "@/components/Image/Image";
const ProductListingReport = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [productListingReportList, setProductListingReportList] = useState<
    IProductListingReport[]
  >([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: productListingReportDummayData.data.length,
  });
  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const getproductListingReportList = useCallback(async () => {
    // API call implementation
    try {
      setProductListingReportList(productListingReportDummayData.data);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const COLUMNS: ITableColumn<IProductListingReport>[] = [
    {
      id: "brand_name",
      accessorKey: "brand_name",
      header: "Brand Name",
      cell: ({ row }) => {
        const brandName = row.original;
        return (
          <div className="flex items-center gap-4">
            <Image
              src={brandName.img}
              alt="static image"
              width={100}
              height={100}
              className="w-16 h-16 bg-body-light dark:bg-body-dark rounded-full"
            />
            <div>{brandName.brand_name}</div>
          </div>
        );
      },
    },
    { id: "vendor_name", accessorKey: "vendor_name", header: "Vendor Name" },
    {
      id: "total_products",
      accessorKey: "total_products",
      header: "Total Products",
      enableSorting: false,
    },
    {
      id: "corporate_gear",
      accessorKey: "corporate_gear",
      header: "Corporate Gear",
      enableSorting: false,
    },
  ];

  return (
    <>
      <ListPageHeader
        moduleName="Product Listing Report"
        navigateUrl={PageRoutes.REPORTS.LIST}
      />
      <ReactTable
        DATA={productListingReportList}
        COLUMNS={COLUMNS}
        fetchData={getproductListingReportList}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showFilter={true}
        showMoreFilters={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
        displaySearch="left"
        noData="No Product Listing Report data available"
      />
    </>
  );
};

export default ProductListingReport;
