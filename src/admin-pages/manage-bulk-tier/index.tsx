"use client";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import ManageBulkTier from "@/mock-data/Managebulktier.json";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";

import { getFormatDate } from "@/utils/date.util";

import BulkTierForm from "@/admin-pages/manage-bulk-tier/components/BulkTierForm";
import { ITableColumn } from "@/components/Table/types";
import {
  IFilteringOption,
  IManageBulkTier,
} from "@/types/customer/manage-bulk-tier/manageBulkTier.type";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";

const BULK_TIER_COLUMNS: ITableColumn<IManageBulkTier>[] = [
  {
    id: "storeName",
    header: "Store Name",
    accessorKey: "storeName",
    filterFn: "includesString",
  },
  {
    id: "companyName",
    header: " Company Name",
    accessorKey: "companyName",
    filterFn: "includesString",
  },
  {
    id: "customerNumber",
    header: " Customer Number (BC Id)",
    accessorKey: "customerNumber",
    filterFn: "includesString",
  },
  {
    id: "customerName",
    header: "Customer Name",
    accessorKey: "customerName",
    filterFn: "includesString",
  },
  {
    id: "currentTier",
    header: "Current Tier",
    accessorKey: "currentTier",
  },
  {
    id: "oldTier",
    header: "Old Tier",
    accessorKey: "oldTier",
  },
  {
    id: "createdDate",
    header: "Created Date",
    accessorKey: "createdDate",
    filterFn: "customDateFilter",
    cell: (props) => (
      <div>
        {props.getValue() ? (
          <>
            <div>{getFormatDate(props.getValue()).date} </div>
            <div className=" text-xs ">
              {getFormatDate(props.getValue()).time}
            </div>
          </>
        ) : (
          "-"
        )}
      </div>
    ),
  },
  {
    id: "createdBy",
    header: "Created By",
    accessorKey: "createdBy",
    filterFn: "customDateFilter",
  },
  {
    id: "modifiedBy",
    header: "Updated By",
    accessorKey: "modifiedBy",
    filterFn: "customDateFilter",
    cell: (props: CellContext<IManageBulkTier, string>) => (
      <div>
        {props.getValue() ? (
          <>
            <div>{getFormatDate(props.getValue()).date} </div>
            <div className="text-xs">
              {getFormatDate(props.getValue()).time}
            </div>
          </>
        ) : (
          "-"
        )}
      </div>
    ),
  },
  {
    id: "updatedBy",
    header: "Updated By",
    accessorKey: "updatedBy",
    enableSorting: true,
    filterFn: undefined,
  },
  {
    id: "recStatus",
    header: "Status",
    accessorKey: "recStatus",
    filterFn: "arrIncludesSome",
    cell: (props: CellContext<IManageBulkTier, string>) => (
      <Status
        type={
          props.getValue() === "Active"
            ? RecStatusValuebyName.Active
            : RecStatusValuebyName.Inactive
        }
      />
    ),
  },
];

const ManageBulkTierPage = () => {
  const [bulkTierList, setBulkTierList] = useState<IManageBulkTier[]>(
    ManageBulkTier.customers
  );
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: bulkTierList.length,
  });

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "vendorName",
      direction: 0,
      priority: 0,
    },
  ]);
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
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const moreFilterOption: IFilteringOption[] = [
    {
      columnName: "customerName",
      name: "Name",
      type: "checkbox",
      options: [],
    },
    {
      columnName: "createdDate",
      name: "Created Date",
      type: "date",
      options: null,
    },
    {
      columnName: "recStatus",
      name: "Status",
      type: "select",
      options: [],
    },
    {
      columnName: "createdby",
      name: "Created By",
      type: "checkbox",
      options: [],
      conditionalSearch: true,
    },
    {
      columnName: "modifiedby",
      name: "Updated By",
      type: "checkbox",
      options: [],
      conditionalSearch: true,
    },
  ];

  return (
    <>
      <ListPageHeader moduleName="Manage Bulk Tier" name="Manage Bulk Tier" />
      <BulkTierForm />

      <ReactTable
        DATA={bulkTierList}
        COLUMNS={BULK_TIER_COLUMNS}
        fetchData={() => {}}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection={false}
        showEditColumns
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
      />
    </>
  );
};

export default ManageBulkTierPage;
