import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";

import { paginationDetails } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";
import { getFormatDate } from "@/utils/date.util";

import { IPaginationData } from "@/types/system-log/systemLog.type";
import { ISyncWithBcValues } from "@/types/form-builder/formReport.type";

import syncWithBcData from "@/mock-data/form-builder/form-report/syncWithBc.json";

const DATA: ISyncWithBcValues[] = syncWithBcData && syncWithBcData.data;

const SyncWithBcList = () => {
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
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

  const COLUMNS: ITableColumn<ISyncWithBcValues>[] = useMemo(
    () => [
      {
        id: "lastImport",
        accessorKey: "lastImport",
        header: "User Name Of Last Import",
        cell: ({ row }) => {
          const lastImport = row.original.lastImport;
          if (!lastImport) return null;
          return lastImport.userName;
        },
      },
      {
        id: "importDate",
        accessorKey: "importDate",
        header: "Last Order Import Date",
        cell: ({ row }) => {
          const importDate = row.original.lastImport.importDate;
          if (!importDate) return null;
          const { date, time } = getFormatDate(importDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "lastOrderNo",
        accessorKey: "lastOrderNo",
        header: "Last Order No Imported",
        cell: ({ row }) => {
          const lastOrderNo = row.original.lastImport.lastOrderNo;
          if (!lastOrderNo) return null;
          return lastOrderNo;
        },
      },
      {
        id: "orderDate",
        accessorKey: "orderDate",
        header: "Order Date",
        cell: ({ row }) => {
          const orders = row.original.orders;
          if (!orders || orders.length === 0) return null;

          return (
            <div>
              {orders.map((order) => {
                const { date, time } = getFormatDate(order.orderDate);
                return (
                  <div key={order.orderNo}>
                    <div>{date}</div>
                    <div className="text-xs font-normal">{time}</div>
                  </div>
                );
              })}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <ReactTable
        DATA={DATA}
        COLUMNS={COLUMNS}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        showEditColumns={false}
        showFilter={false}
        showMoreFilters={false}
        displaySearch={false}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        isListPage={false}
      />
    </>
  );
};

export default SyncWithBcList;
