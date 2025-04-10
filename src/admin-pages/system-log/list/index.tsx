"use client";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";

import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { getErrorMessage } from "@/utils/common.util";

import { moreFilterOption } from "@/mock-data/systemLog";
import systemLogData from "@/mock-data/systemLog.json";
import { ISystemLogValues } from "@/types/system-log/systemLog.type";
import { IPaginationData } from "@/types/system-log/systemLog.type";

const myLogData = systemLogData.myLogData;

const SystemLogList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: systemLogData.myLogData.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  const [filteringOptions, setColumnFilteringOptions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string | number | boolean;
    }>
  >([]);

  // Memoize handlers
  const setSortingOptionHandler = useCallback(() => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  // Memoize pagination handler
  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationData,
      value: (typeof paginationData)[keyof typeof paginationData]
    ) => {
      setPaginationData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const COLUMNS: ITableColumn<ISystemLogValues>[] = useMemo(
    () => [
      {
        id: "page",
        accessorKey: "page",
        header: "PAGE",
      },
      {
        id: "module",
        accessorKey: "module",
        header: "MODULE NAME",
      },
      {
        id: "event",
        accessorKey: "event",
        header: "EVENT",
      },
      { id: "user", accessorKey: "user", header: "CREATED BY" },
      {
        id: "date",
        accessorKey: "date",
        header: "CREATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const createdDate = row.original.date;
          if (!createdDate) return null;

          const { date, time } = getFormatDate(createdDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },

      { id: "ipAddress", accessorKey: "ipAddress", header: "IP ADDRESS" },
    ],
    []
  );

  return (
    <div>
      <ListPageHeader name={"System Log"} moduleName={"System Log"} />
      <ReactTable
        DATA={myLogData}
        COLUMNS={COLUMNS}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
        showExportCSV
        onExportCSV={() => {}}
      />
    </div>
  );
};

export default SystemLogList;
