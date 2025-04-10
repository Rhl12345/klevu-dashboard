"use client";
import React, { useCallback, useState } from "react";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import Dropdown from "@/components/DropDown/DropDown";
import { messageKeyOptions } from "@/utils/Dummy";
import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import { PRODUCT_DUMMY_LIST } from "@/mock-data/productCalculationReportList";
import { ITableColumn } from "@/components/Table/types";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { IproductCalculationReportList } from "@/types/product-calculation-report/productCalculationReportList.type";
const ProductCalculationReportList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [productCalculationList, setProductCalculationList] = useState<
    IproductCalculationReportList[]
  >([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: PRODUCT_DUMMY_LIST.length,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const setPaginationDataFunc = (key: string, value: string | number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const getProductCalculationList = useCallback(async () => {
    // API call implementation
    try {
      setProductCalculationList(PRODUCT_DUMMY_LIST);
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const COLUMNS: ITableColumn<IproductCalculationReportList>[] = [
    {
      id: "product_name",
      accessorKey: "product_name",
      header: "PRODUCT NAME",
      enableSorting: false,
    },
    { id: "sku", accessorKey: "sku", header: "SKU", enableSorting: false },
    {
      id: "boston_beer",
      accessorKey: "boston_beer",
      header: "Boston Beer",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.boston_beer}
              width={24}
              height={24}
              className={`${value.boston_beer === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "bacardi_grey_goose",
      accessorKey: "bacardi_grey_goose",
      header: "Bacardi Grey Goose",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.bacardi_grey_goose}
              width={24}
              height={24}
              className={`${value.bacardi_grey_goose === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "cyxtera",
      accessorKey: "cyxtera",
      header: "cyxtera",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.cyxtera}
              width={24}
              height={24}
              className={`${value.cyxtera === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "simpliSafe",
      accessorKey: "simpliSafe",
      header: "simpliSafe",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.simpliSafe}
              width={24}
              height={24}
              className={`${value.simpliSafe === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "the_home_depot",
      accessorKey: "the_home_depot",
      header: "the home depot",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.the_home_depot}
              width={24}
              height={24}
              className={`${value.the_home_depot === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "unit1",
      accessorKey: "unit1",
      header: "unit1",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.unit1}
              width={24}
              height={24}
              className={`${value.unit1 === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "USAA_alpha_healthy_points",
      accessorKey: "USAA_alpha_healthy_points",
      header: "USAA alpha healthy points",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.USAA_alpha_healthy_points}
              width={24}
              height={24}
              className={`${value.USAA_alpha_healthy_points === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "Usaa_Claims_Apparel",
      accessorKey: "Usaa_Claims_Apparel",
      header: "Usaa Claims Apparel",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.Usaa_Claims_Apparel}
              width={24}
              height={24}
              className={`${value.Usaa_Claims_Apparel === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "Usaa_Healthy_Points",
      accessorKey: "Usaa_Healthy_Points",
      header: "Usaa Healthy Points",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.Usaa_Healthy_Points}
              width={24}
              height={24}
              className={`${value.Usaa_Healthy_Points === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "Usaa_Punchout",
      accessorKey: "Usaa_Punchout",
      header: "Usaa Punchout",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.Usaa_Punchout}
              width={24}
              height={24}
              className={`${value.Usaa_Punchout === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "Porsche",
      accessorKey: "Porsche",
      header: "Porsche",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.Porsche}
              width={24}
              height={24}
              className={`${value.Porsche === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "Skadden_Holiday_Store",
      accessorKey: "Skadden_Holiday_Store",
      header: "Skadden Holiday Store",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.Skadden_Holiday_Store}
              width={24}
              height={24}
              className={`${value.Skadden_Holiday_Store === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "Stryker",
      accessorKey: "Stryker",
      header: "Stryker",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.Stryker}
              width={24}
              height={24}
              className={`${value.Stryker === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
    {
      id: "USAA_NEO_Shirts",
      accessorKey: "USAA_NEO_Shirts",
      header: "USAA NEO Shirts",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <>
            <SvgIcon
              name={value.USAA_NEO_Shirts}
              width={24}
              height={24}
              className={`${value.USAA_NEO_Shirts === "CrossIcon" ? "text-red-500" : "text-green-500"} font-bold"`}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <ListPageHeader
        moduleName="Product Calculation Report"
        navigateUrl={PageRoutes.REPORTS.LIST}
      >
        <Dropdown
          name="storeName"
          id="storeName"
          options={messageKeyOptions}
          className="lg:w-48"
        />
      </ListPageHeader>
      <ReactTable
        DATA={productCalculationList}
        COLUMNS={COLUMNS}
        fetchData={getProductCalculationList}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        displaySearch="left"
        showFilter={true}
        showMoreFilters={false}
        showEditColumns={true}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        totalCount={paginationData.totalCount}
        noData="No Product Calculation Report data available"
      />
    </>
  );
};

export default ProductCalculationReportList;
