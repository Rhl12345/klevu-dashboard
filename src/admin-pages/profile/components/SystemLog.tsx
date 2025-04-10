import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import ContentPageHeader from "@/components/CreateAndListPageHeader/ContentPageHeader";
import { SYSTEM_LOG_DATA } from "@/mock-data/accountActivity";
import React, { useMemo } from "react";

const SystemLog = () => {
  const COLUMNS = useMemo<ITableColumn[]>(
    () => [
      {
        id: "page",
        header: "Page",
        accessorKey: "page",
      },
      {
        id: "module_name",
        header: "Module Name",
        accessorKey: "module",
        cell: ({ row }: { row: { original: any } }) => (
          <Text size="xs">{row.original.module}</Text>
        ),
      },
      {
        id: "event",
        header: "Event",
        accessorKey: "event",
        cell: ({ row }: { row: { original: any } }) => (
          <Text size="xs">{row.original.event}</Text>
        ),
      },
      {
        id: "user",
        header: "Created By",
        accessorKey: "user",
      },
      {
        id: "date",
        header: "Date",
        accessorKey: "date",
        cell: ({ row }: { row: { original: any } }) => (
          <Text size="xs">{row.original.time}</Text>
        ),
      },
      {
        id: "ip_address",
        header: "IP Address",
        accessorKey: "ipAddress",
      },
    ],
    []
  );

  return (
    <div className="w-full flex flex-col gap-4 lg:px-8 px-4 py-4 lg:py-8">
      <div className="w-full bg-body-light dark:bg-body-dark border border-gray-light dark:border-gray-dark">
        <ContentPageHeader name="System Log" />
        <ReactTable
          COLUMNS={COLUMNS}
          DATA={SYSTEM_LOG_DATA}
          pageSize={25}
          isListPage={false}
          totalCount={SYSTEM_LOG_DATA.length}
          showExportCSV={false}
          displaySearch="left"
        />
      </div>
    </div>
  );
};

export default SystemLog;
