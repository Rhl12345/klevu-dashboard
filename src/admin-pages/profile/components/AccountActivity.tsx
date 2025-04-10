import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import { ACCOUNT_ACTIVITY_DATA } from "@/mock-data/accountActivity";
import { IProfileAccountActivityData } from "@/types/account-activity/accountActivity.type";
import React from "react";

const AccountActivity = () => {
  // Define columns
  const TABLE_COLUMNS: ITableColumn<IProfileAccountActivityData>[] = [
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
      id: "createdAt",
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }: { row: { original: IProfileAccountActivityData } }) => (
        <div>
          <div>{row.original.date}</div>
          <div>{row.original.time}</div>
        </div>
      ),
    },
    {
      id: "activity",
      header: "Activity",
      accessorKey: "activity",
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

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-8 lg:px-8 px-4 py-4 lg:py-8">
      <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
        <ContentPageHeader name="Account Activity" />
        <ReactTable
          COLUMNS={TABLE_COLUMNS}
          DATA={ACCOUNT_ACTIVITY_DATA}
          pageSize={25}
          isListPage={false}
          totalCount={ACCOUNT_ACTIVITY_DATA.length}
          showExportCSV={false}
          displaySearch="left"
        />
      </div>
    </div>
  );
};

export default AccountActivity;
