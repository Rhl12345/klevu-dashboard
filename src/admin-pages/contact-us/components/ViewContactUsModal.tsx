import React, { memo, useCallback, useMemo } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import { ITableColumn } from "@/components/Table/types";
import DateCell from "@/components/common/DateCell";
import {
  IContactUSListViewModalProps,
  IContactUsListReport,
} from "@/types/contact-us/contactUs.type";
import Text from "@/components/Text/Text";

const renderCell = (value: string | null) => {
  if (!value) return "-";
  return <Text size="sm">{value}</Text>;
};

const ViewContactUsModal = ({
  showModal,
  setShowModal,
  modalInformation,
}: IContactUSListViewModalProps) => {
  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);
  const tableData = useMemo(() => [modalInformation], [modalInformation]);
  const COLUMNS: ITableColumn<IContactUsListReport>[] = [
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
      id: "company",
      header: "Company Name",
      accessorKey: "company",
      cell: ({ row }) => renderCell(row.original.company),
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

        return date ? <DateCell date={date} /> : renderCell(null);
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
      onClose={handleClose}
      header="View"
      content={
        <ReactTable
          usedInsideModal={true}
          isListPage={false}
          DATA={tableData}
          COLUMNS={COLUMNS}
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

export default memo(ViewContactUsModal);
