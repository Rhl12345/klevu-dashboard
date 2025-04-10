import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { ITableColumn } from "@/components/Table/types";
import Status from "@/components/DisplayStatus/Status";

import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";

import {
  IFormShareReportValues,
  IShareReportListProps,
} from "@/types/form-builder/formShareReport.type";
import shareReportData from "@/mock-data/form-builder/shareReport.json";

const DATA = shareReportData.data;

const ShareReportList = ({ handleEdit }: IShareReportListProps) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [paginationData, setPaginationData] = useState({
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

  const [filteringOptions, setColumnFilteringOptions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string | number | boolean;
    }>
  >([]);

  const setSortingOptionHandler = () => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const COLUMNS: ITableColumn<IFormShareReportValues>[] = useMemo(
    () => [
      {
        id: "name",
        header: " Name",
        accessorKey: "name",
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
      },
      {
        id: "sentDate",
        header: "Sent Date",
        accessorKey: "sentDate",
        cell: ({ row }) => {
          const sentDate = row.original.sentDate;
          if (!sentDate) return null;

          const { date, time } = getFormatDate(sentDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },

      {
        id: "sentBy",
        header: "Sent By",
        accessorKey: "sentBy",
      },
      {
        id: "updatedDate",
        header: "Updated Date",
        accessorKey: "updatedDate",
        cell: ({ row }) => {
          const updatedDate = row.original.updatedDate;
          if (!updatedDate) return null;

          const { date, time } = getFormatDate(updatedDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "updatedBy",
        header: "Updated By",
        accessorKey: "updatedBy",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "recStatus",
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? <Status type={value} /> : null;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props) => {
          const shareReport = props.row.original;
          return (
            <Button
              variant="default"
              size="sm"
              onClick={() => handleEdit(shareReport.id.toString())}
              icon={<SvgIcon name="Edit" />}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <ReactTable
        DATA={DATA}
        COLUMNS={COLUMNS}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        setTablePageSize={(value) => {
          setPaginationData((prevState) => ({
            ...prevState,
            pageSize: value,
          }));
        }}
        showFilter={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />
    </div>
  );
};

export default ShareReportList;
