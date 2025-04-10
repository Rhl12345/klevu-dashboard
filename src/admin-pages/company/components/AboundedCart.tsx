"use client";
import React, { useState, useCallback, useMemo } from "react";

import { ColumnFiltersState } from "@tanstack/react-table";
import { paginationDetails } from "@/utils/constants";
import ReactTable from "@/components/Table/ReactTable";

import TableActionPanel from "@/components/common/TableActionPanel";

import { getFormatDate } from "@/utils/date.util";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import abondonCart from "@/mock-data/abondonCart.json";
import { IAbandonedCartItem, IModalState, ITableCellProps, ITableColumn } from "@/types/company/abandonedCart.type";



const AbandondedCart = () => {
  const [data, setData] = useState(abondonCart as IAbandonedCartItem[]);
  const [modalState, setModalState] = useState<IModalState>({ isOpen: false, type: null, selectedCart: null });
  const [filteringOptions, setColumnFilteringOptions] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "orderStatus",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 1,
  });

  const handleModalOpen = useCallback((
    type: "delete" | "activeInactive" | "viewHistory",
    cart: IAbandonedCartItem  
  ) => {
    setModalState({ isOpen: true, type, selectedCart: cart });
  }, []);

  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null, selectedCart: null });
  };

  const setSortingOptionHandler = useCallback(
    (column: string, direction: number) => {
      setSortingOptions([{ field: column, direction, priority: 0 }]);
    },
    []
  );

  const setPaginationDataFunc = (key: string, value: unknown) => {
    setPaginationData((prev) => ({ ...prev, [key]: value }));
  };

  const ABANDONED_CART_COLUMNS = useMemo<ITableColumn[]>(() => [
    {
      id: "customerId",
      accessorKey: "customerId",
      header: "Customer Id",
    },
    {
      id: "shoppingCartId",
      accessorKey: "shoppingCartId",
      header: "ShoppingCart Id",
    },
    {
      id: "subTotal",
      accessorKey: "subTotal",
      header: "Order Total",
    },
    {
      id: "name",
      accessorKey: "name",
      header: "First Name ",
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email ",
    },

    {
      id: "storeLogoUrl",
      accessorKey: "storeLogoUrl",
      header: "Store Logo",
    },

    {
      id: "storeName",
      accessorKey: "storeName",
      header: "Store Name",
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "Created On",
      cell: ({ row }: ITableCellProps) => {
        return row?.original?.date ? (
          <>
            <div>{getFormatDate(row.original.date).date}</div>
            <div className="text-xs ">
              {getFormatDate(row.original.date).time}
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "vc",
      accessorKey: "vc",
      header: "View Cart",
    },
    {
      id: "sendMail",
      accessorKey: "sendMail",
      header: "sendMail",
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props: { row: { original: IAbandonedCartItem } }) => {
        const cart = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: ``,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", cart)
            }}
            status={{
              show: true,
              status: cart.recStatus,
              onClick: () => handleModalOpen("activeInactive", cart)
            }}
          />
        );
      },
    },
  ], [handleModalOpen]);

  return (
    <>
    
          <ReactTable
            DATA={data}
            COLUMNS={ABANDONED_CART_COLUMNS}
            fetchData={() => {}}
            sortingOptions={sortingOptions}
            setSortingOptionHandler={setSortingOptionHandler}
            pageIndex={paginationData.pageIndex}
            pageSize={paginationData.pageSize}
            setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
            filteringOptions={filteringOptions}
            setColumnFilteringOptions={setColumnFilteringOptions}
            showEditColumns
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            totalCount={paginationData.totalCount}
            hasPreviousPage={paginationData.hasPreviousPage}
            hasNextPage={paginationData.hasNextPage}
            displaySearch="left"
          />
       

      {modalState.isOpen && modalState.type === "delete" && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="abandoned cart"
          onDelete={() => {}}
        />
      )}

      {modalState.isOpen && modalState.type === "activeInactive" && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{ recStatus: "inactive", recordName: "abandoned cart" }}
          title="Change Status"
          message="Do you want to change the status of this abandoned cart?"
        />
      )}
    </>
  );
};

export default AbandondedCart;
