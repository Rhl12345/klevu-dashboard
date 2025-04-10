"use client";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import accountActivityDummyData from "@/mock-data/accountActivity.json";
import { getFormatDate } from "@/utils/date.util";
import { useState } from "react";

import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import {
  IAccountActivityData,
  IPaginationData,
  ISortOption,
} from "@/types/account-activity/accountActivity.type";
import { paginationDetails } from "@/utils/constants";
const COLUMNS: ITableColumn<IAccountActivityData>[] = [
  {
    id: "user",
    header: "User",
    accessorKey: "user",
  },
  {
    id: "browser",
    header: "Browser",
    accessorKey: "browser",
  },
  {
    id: "logdate",
    header: "Date",
    accessorKey: "logdate",
    cell: ({ row }) => {
      return row?.original?.logdate ? (
        <>
          <div>{getFormatDate(row?.original?.logdate).date} </div>
          <div className=" text-xs font-normal">
            {getFormatDate(row?.original?.logdate).time}
          </div>
        </>
      ) : null;
    },
  },
  {
    id: "activity",
    header: "Activity",
    accessorKey: "type",
  },
  {
    id: "ipAddress",
    header: "IP Address",
    accessorKey: "ipAddress",
  },
  {
    id: "location",
    header: "Location",
    accessorKey: "location",
  },
];

const AccountActivity = () => {
  const [accountActivityData, setAccountActivityData] = useState(
    accountActivityDummyData
  );
  const [sortingOptions, setSortingOptions] = useState<ISortOption[]>([
    { field: "name", direction: 0, priority: 0 },
    { field: "email", direction: 0, priority: 0 },
    { field: "revenue", direction: 0, priority: 0 },
  ]);
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: 50,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    Record<string, unknown>[]
  >([]);

  return (
    <>
      <ListPageHeader
        moduleName="Account Activity"
        name="accountActivityList"
        navigateUrl=""
      />
      <ReactTable
        DATA={accountActivityData.accountActivityData}
        COLUMNS={COLUMNS}
        sortingOptions={sortingOptions}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        showExportCSV
        onExportCSV={() => {}}
      />
    </>
  );
};

export default AccountActivity;
