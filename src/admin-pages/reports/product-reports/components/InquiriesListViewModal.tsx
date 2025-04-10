import React from "react";
import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import {
  IInquiriesListViewModal,
  IInquiriesListViewModalProps,
} from "@/types/reports/reports";
import { ITableColumn } from "@/components/Table/types";
import DateCell from "@/components/common/DateCell";
/**
 * Renders cell content with consistent styling
 * @param value - The value to render in the cell
 * @returns React element or "-" if value is null
 */
const renderCell = (value: string | null) => {
  if (!value) return "-";
  return <div className="font-semibold text-left">{value}</div>;
};

/**
 * Modal component for displaying inquiries in a table format
 */
const InquiriesListViewModal = ({
  showModal,
  setShowModal,
  modalInformation,
}:IInquiriesListViewModalProps) => {
  const INQUIRIES_LIST_COLUMNS: ITableColumn<IInquiriesListViewModal>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => renderCell(row.original.name),
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => renderCell(row.original.email),
    },
    {
      id: "subject",
      header: "Subject",
      accessorKey: "subject",
      cell: ({ row }) => renderCell(row.original.subject),
    },
    {
      id: "address",
      header: "Address",
      accessorKey: "address",
      cell: ({ row }) => renderCell(row.original.address),
    },
    {
      id: "city",
      header: "City",
      accessorKey: "city",
      cell: ({ row }) => renderCell(row.original.city),
    },
    {
      id: "country",
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => renderCell(row.original.country),
    },
    {
      id: "state",
      header: "State",
      accessorKey: "state",
      cell: ({ row }) => renderCell(row.original.state),
    },
    {
      id: "zip",
      header: "Zip Code",
      accessorKey: "zip",
      cell: ({ row }) => renderCell(row.original.zip),
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }) => renderCell(row.original.phone),
    },
    {
      id: "comment",
      header: "Comment",
      accessorKey: "comment",
      cell: ({ row }) => renderCell(row.original.comment),
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Created Date",
      filterFn: "customDateFilter",
      cell: ({ row }) => {
        const date = row.original.date;
        if (!date) return null;

        return <DateCell date={date} />;
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => renderCell(row.original.status),
    },
  ];

  return (
    <Modal
      size="7xl"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      header="View"
      content={
        <ReactTable
          DATA={[modalInformation]}
          COLUMNS={INQUIRIES_LIST_COLUMNS}
          showEditColumns={false}
          checkboxSelection={false}
          showPagination={false}
          showFilter={false}
          showMoreFilters={false}
          displaySearch={false}
        />
      }
    />
  );
};

export default InquiriesListViewModal;
