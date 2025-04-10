import React, { useMemo } from "react";
import { ITableColumn } from "@/components/Table/types";
import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import { getFormatDate } from "@/utils/date.util";

// Interface for single history record data structure
export interface IHistoryRecord {
  updatedDate: string;
  updatedBy: string;
  subRows: {
    rowid: number;
    property: string;
    oldValue: string;
    newValue: string;
  }[];
}

// Props interface for the ViewHistoryModal component
interface IViewHistoryModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Handler for closing the modal
  historyData: IHistoryRecord[]; // Array of history records
  recordName: string; // Name of record being viewed
  columns?: ITableColumn[];
}

const ViewHistoryModal: React.FC<IViewHistoryModalProps> = ({
  isOpen,
  onClose,
  historyData,
  recordName,
  columns,
}) => {
  // Define table columns using useMemo to prevent unnecessary re-renders
  const HISTORY_COLUMNS: ITableColumn<IHistoryRecord>[] = useMemo(
    () => [
      {
        id: "updatedBy",
        header: "Updated By",
        accessorKey: "updatedBy",
        enableSorting: false,
        cell: (info) => info.getValue() || "-",
      },
      {
        id: "updatedDate",
        header: "Updated Date",
        accessorKey: "updatedDate",
        enableSorting: false,
        cell: ({ row }) => {
          const { date, time } = getFormatDate(row?.original?.updatedDate);
          return (
            <>
              <div>{date} </div>
              <div className=" text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "property",
        header: "Property",
        accessorKey: "property",
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      },
      {
        id: "oldValue",
        header: "Old Value",
        accessorKey: "oldValue",
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      },
      {
        id: "newValue",
        header: "New Value",
        accessorKey: "newValue",
        cell: (info) => info.getValue() || "-",
        enableSorting: false,
      },
    ],
    []
  );

  // Function to render the ReactTable component with history data
  const renderTable = () => (
    <ReactTable
      usedInsideModal={true}
      isListPage={false}
      COLUMNS={columns ? columns : HISTORY_COLUMNS}
      DATA={historyData}
      showEditColumns={false}
      showFilter={false}
      showMoreFilters={false}
      displaySearch={false}
      hasPageSize={false}
      totalCount={1}
      // showPagination={false}
      getRowCanExpand={() => true}
    />
  );

  // Render the modal with the history table
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl" // Large size for better readability
      header={`View History - ${recordName}`} // Dynamic header with record name
      content={renderTable()} // Render table as modal content
    />
  );
};

export default ViewHistoryModal;
