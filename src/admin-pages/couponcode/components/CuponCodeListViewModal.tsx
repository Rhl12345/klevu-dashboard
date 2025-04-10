import React, { useCallback, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import { paginationDetails } from "@/utils/constants";
import { ITableColumn } from "@/components/Table/types";
import {
  IInquiriesListViewModal,
  IInquiriesListViewModalProps,
} from "@/types/promotions/promotions.type";

const renderCell = (value: string | number | null) => {
  return value && <div className="font-semibold text-left">{value}</div>;
};

const CuponCodeListViewModal = ({
  showModal,
  setShowModal,
  modalInformation,
}: IInquiriesListViewModalProps) => {
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [inquiriesList, setInquiriesList] = useState<IInquiriesListViewModal[]>(
    []
  );

  const setPaginationDataFunc = (key: string, value: number) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getInquiriesList = useCallback(
    async (pageIndex = 1) => {
      try {
        const fetchedData = modalInformation;

        const totalItems = fetchedData?.length || 0;

        const startIndex = (pageIndex - 1) * paginationData.pageSize;
        const endIndex = startIndex + paginationData.pageSize;

        const paginatedData = fetchedData?.slice(startIndex, endIndex);

        setInquiriesList(paginatedData);
        setPaginationData((prevState) => ({
          ...prevState,
          pageIndex,
          totalCount: totalItems,
        }));
      } catch (error) {
        console.error("Error fetching inquiries list:", error);
      }
    },
    [modalInformation, paginationData.pageSize]
  );

  const INQUIRIES_LIST_COLUMNS: ITableColumn<IInquiriesListViewModal>[] = [
    {
      id: "productName",
      header: "Product Name",
      accessorKey: "productName",
      cell: ({ row }) => renderCell(row.original.productName),
    },
    {
      id: "sku",
      header: "SKU",
      accessorKey: "sku",
      cell: ({ row }) => renderCell(row.original.sku),
    },
    {
      id: "srno",
      header: "Sr. No",
      accessorKey: "srno",
      cell: ({ row }) => renderCell(row.original.srno),
    },
    {
      id: "storeName",
      header: "Store Name",
      accessorKey: "storeName",
      cell: ({ row }) => renderCell(row.original.storeName),
    },
    {
      id: "totalQuantity",
      header: "Total Quantity",
      accessorKey: "totalQuantity",
      cell: ({ row }) => renderCell(row.original.totalQuantity),
    },
  ];

  return (
    <Modal
      size="8xl"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      header="View Orders"
      content={
        <ReactTable
          DATA={inquiriesList}
          COLUMNS={INQUIRIES_LIST_COLUMNS}
          fetchData={getInquiriesList}
          pageIndex={paginationData.pageIndex}
          pageSize={paginationData.pageSize}
          setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
          totalCount={paginationData.totalCount}
          hasPreviousPage={paginationData.pageIndex > 1}
          showMoreFilters={false}
          showEditColumns={false}
          displaySearch={false}
          showFilter={false}
          usedInsideModal
        />
      }
    />
  );
};

export default CuponCodeListViewModal;
