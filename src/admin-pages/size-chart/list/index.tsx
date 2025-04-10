"use client";
import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { ISortingOption } from "@/types/contact-us/contactUs.type";
import {
  IDummyProductSize,
  TSizeChartModalType,
} from "@/types/size-chart/sizeChart.type";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { ColumnFiltersState } from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";
import { sizeCharts } from "@/mock-data/size-charts/sizeCharts.json";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";

const SizeChartListing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: TSizeChartModalType;
  }>({ isOpen: false, type: null });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [ProductTypeOption, setProductTypeOption] = useState([]);
  const [sizeChartData, setSizeChartData] =
    useState<IDummyProductSize[]>(sizeCharts);

  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
    {
      field: "brandName",
      direction: 0,
      priority: 0,
    },
    {
      field: "productCount",
      direction: 0,
      priority: 0,
    },
    {
      field: "createdDate",
      direction: 0,
      priority: 0,
    },
    {
      field: "createdBy",
      direction: 0,
      priority: 0,
    },
    {
      field: "modifiedDate",
      direction: 0,
      priority: 0,
    },
    {
      field: "modifiedName",
      direction: 0,
      priority: 0,
    },
    {
      field: "recStatus",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: sizeChartData.length,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Modal handling functions
  const handleModalOpen = () => {};

  const userNameValues = [
    {
      value: "133",
      label: "Aakash  Chaudhary",
    },
    {
      value: "93",
      label: "Alex Alutto",
    },
    {
      value: "82",
      label: "Alex Dumais",
    },
    {
      value: "47",
      label: "Alex Pohl",
    },
    {
      value: "40",
      label: "Alexis Bernard",
    },
    {
      value: "24",
      label: "Allysa Beaton",
    },
    {
      value: "4",
      label: "Alpesh Prajapati",
    },
    {
      value: "44",
      label: "Amanda Rosenberg",
    },
  ];

  const moreFilterOptions = [
    {
      name: "Name",
      columnName: "Name",
      options: ProductTypeOption,
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Brand",
      columnName: "brandName",
      options: ProductTypeOption,
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Created By",
      columnName: "createdBy",
      options: userNameValues,
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Created Date",
      columnName: "createddate",
      options: [],
      type: "date",
    },
    {
      name: "Updated By",
      columnName: "modifiedBy",
      options: userNameValues,
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Updated Date",
      columnName: "modifiedDate",
      options: [],
      type: "date",
    },
    {
      name: "Status",
      columnName: "Status",
      options: [],
      type: "checkbox",
    },
  ];

  const COLUMNS: ITableColumn<IDummyProductSize>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => {
        const name = row?.original?.name;
        return name ? (
          <Link href={`${PageRoutes.SIZE_CHART.EDIT}${row?.original?.id}`}>
            <div className="whitespace-pre">{name}</div>
          </Link>
        ) : null;
      },
    },
    {
      id: "brandName",
      accessorKey: "brandName",
      header: "BRAND",
      cell: ({ row }) => {
        const brandName = row?.original?.brandName;
        return brandName ? (
          <div
            className="w-full flex justify-start items-center group"
            style={{ width: "100px" }}
          >
            <div>{brandName}</div>
          </div>
        ) : null;
      },
    },
    {
      id: "productCount",
      header: "PRODUCTS",
      accessorKey: "productCount",
      cell: ({ row }) => {
        const productCount = row?.original?.productCount;
        return productCount ? (
          <div
            className="w-full flex justify-start items-center group"
            style={{ width: "150px" }}
          >
            <div>{row?.original?.productCount}</div>
          </div>
        ) : null;
      },
    },
    {
      id: "createdDate",
      header: "CREATED DATE",
      accessorKey: "createdDate",
      cell: ({ row }) => {
        const createdDate = row?.original?.createdDate;
        return createdDate ? (
          <>
            <div>{getFormatDate(createdDate).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(createdDate).time}
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "createdBy",
      header: "CREATED BY",
      accessorKey: "createdName",
      cell: ({ row }) => {
        const createdName = row?.original?.createdName;
        return createdName ? <div>{createdName} </div> : null;
      },
    },
    {
      id: "modifiedDate",
      accessorKey: "modifiedDate",
      header: "UPDATED DATE",
      filterFn: "customDateFilter",
      cell: ({ row }) => {
        const modifiedDate = row?.original?.modifiedDate;
        return modifiedDate ? (
          <>
            <div>{getFormatDate(modifiedDate).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(modifiedDate).time}
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "modifiedName",
      accessorKey: "modifiedName",
      header: "UPDATED BY",
      filterFn: "customDateFilter",
      cell: ({ row }) => {
        const modifiedName = row?.original?.modifiedName;
        return modifiedName ? <div>{modifiedName}</div> : null;
      },
    },
    {
      id: "recStatus",
      header: "STATUS",
      accessorKey: "recStatus",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const recStatus = row?.original?.recStatus;
        return recStatus ? <Status type={recStatus} /> : null;
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const id = row?.original?.id;
        return id ? (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.SIZE_CHART.EDIT}${id}`,
            }}
            remove={{
              show: true,
              onClick: () => {
                setIsModalOpen({ isOpen: true, type: "delete" });
              },
            }}
            status={{
              show: true,
              status: "active",
              onClick: () => {
                setIsModalOpen({ isOpen: true, type: "status" });
              },
            }}
            viewHistory={{
              show: true,
              onClick: () => {
                setIsModalOpen({ isOpen: true, type: "viewHistory" });
              },
            }}
          />
        ) : null;
      },
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

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };

  const handleDelete = () => {};

  const getSizeMasterData = () => {};

  return (
    <>
      <ListPageHeader
        moduleName={"Size Chart"}
        name={"Add Size Chart"}
        navigateUrl={PageRoutes.SIZE_CHART.CREATE}
      />

      <ReactTable
        DATA={sizeChartData}
        COLUMNS={COLUMNS}
        fetchData={getSizeMasterData}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        // checkboxSelection
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOptions}
      />

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Vendor"
          onDelete={handleDelete}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "status" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus: "inactive",
            quantityName: "brand name formula",
            recordName: "brand name formula",
          }}
          title="Change Status"
          message="Do you want to change the status of this brand name formula ?"
        />
      )}
    </>
  );
};

export default SizeChartListing;
