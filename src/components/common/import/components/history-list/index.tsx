"use client";
import DateCell from "@/components/common/DateCell";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getImportHistoryList } from "@/services/import/import.service";
import { IExportHistoryProps, IHistoryItem } from "@/types/export/export.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const defaultColumns: ITableColumn<IHistoryItem>[] = [
  {
    id: "start",
    header: "Start Date",
    accessorKey: "start",
    cell: ({ getValue }) => <DateCell date={getValue()} />,
  },
  {
    id: "end",
    header: "End Date",
    accessorKey: "end",
    cell: ({ getValue }) => <DateCell date={getValue()} />,
  },
  {
    id: "importType",
    header: "Import Type",
    accessorKey: "importType",
  },
  {
    id: "recordsSubmitted",
    header: "Records Submitted",
    accessorKey: "recordsSubmitted",
  },
  {
    id: "recordsProcessed",
    header: "Records Processed",
    accessorKey: "recordsProcessed",
  },
  {
    id: "createdBy",
    header: "Created By",
    accessorKey: "createdBy",
  },
  {
    id: "status",
    header: "Upload Status",
    accessorKey: "status",
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "filePath",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        value && (
          <div className="truncate w-32 text-indigo-500 hover:text-indigo-600">
            <Link
              href={`${value}`}
              title={`Download Log File`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-quaternary-dark dark:text-quaternary-light"
            >
              <SvgIcon name="download-01" width={25} height={25} />
            </Link>
          </div>
        )
      );
    },
  },
];

const HistoryList = ({
  columns = defaultColumns,
  ...props
}: IExportHistoryProps) => {
  const [historyList, setHistoryList] = useState<IHistoryItem[]>(
    props.data || []
  );
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const setPaginationDataFunc = (key: string, value: number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const fetchImportHistoryList = async () => {
    try {
      setLoading(true);
      const response = await getImportHistoryList();
      setHistoryList(response.items);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactTable
      loading={loading}
      COLUMNS={columns}
      DATA={props.data || historyList}
      showFilter={false}
      displaySearch={false}
      setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
      fetchData={fetchImportHistoryList}
      hasPreviousPage={paginationData.hasPreviousPage}
      hasNextPage={paginationData.hasNextPage}
      pageIndex={paginationData.pageIndex}
      pageSize={paginationData.pageSize}
      totalCount={props.data?.length || historyList.length}
    />
  );
};

export default HistoryList;
