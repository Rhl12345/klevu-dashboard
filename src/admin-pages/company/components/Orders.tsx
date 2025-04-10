"use client";
import React, { useState, useMemo, useCallback } from "react";

import ReactTable from "@/components/Table/ReactTable";
import { paginationDetails } from "@/utils/constants";
import Status from "@/components/DisplayStatus/Status";

import { getFormatDate } from "@/utils/date.util";
import {
  IModalType,
  IOrder,
  TableCellProps,
} from "@/types/company/company.type";
import { ITableColumn } from "@/components/Table/types";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import ordersData from "@/mock-data/orders.json";
import { IFilterOption } from "@/types/consultation.type";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import OrderProductModal from "@/admin-pages/company/components/OrderProductModal";
import Button from "@/components/Button/Button";

const Orders = () => {
  const [orderList] = useState<IOrder[]>(ordersData as IOrder[]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: IModalType;
    order: IOrder | null;
  }>({
    isOpen: false,
    type: null,
    order: null,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "orderStatus",
      direction: 0,
      priority: 0,
    },
    {
      field: "order",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: ordersData.length, // Use actual length from mock data
  });

  const COLUMNS: ITableColumn<IOrder>[] = useMemo(
    () => [
      {
        id: "id",
        header: "",
        accessorKey: "id",
        enableSorting: false,
        cell: () => {
          return (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setModalState({
                  isOpen: true,
                  type: "productVariant",
                  order: null,
                });
              }}
            >
              <SvgIcon name="PlusIcon" />
            </Button>
          );
        },
      },
      {
        id: "orderStatus",
        accessorKey: "orderStatus",
        header: "Order Status",
        cell: (props) => {
          const value = props.getValue();
          return value !== undefined ? <Status type={value} /> : "";
        },
      },
      {
        id: "order",
        accessorKey: "order",
        header: "Order",
      },
      {
        id: "date",
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          const modifiedDate = row.original.date;
          if (!modifiedDate) return null;

          const { date, time } = getFormatDate(modifiedDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "customerName",
        accessorKey: "customerName",
        header: "CustomerName /Zipcode",
      },
      {
        id: "total",
        accessorKey: "total",
        header: "Total ($)",
      },
      {
        id: "paymentType",
        accessorKey: "paymentType",
        header: "Payment Type",
      },
      {
        id: "paymentStatus",
        accessorKey: "paymentStatus",
        cell: (props: TableCellProps) => {
          const value = props.getValue();
          return value !== undefined ? <Status type={value} /> : "";
        },
        header: "Payment Status",
      },
      {
        id: "fulfillmentStatus",
        accessorKey: "fulfillmentStatus",
        header: "Fulfillment Status",
        cell: (props: TableCellProps) => {
          const value = props.getValue();
          return value !== undefined ? <Status type={value} /> : "";
        },
      },
      {
        id: "items",
        accessorKey: "items",
        header: "Items",
      },
      {
        id: "deliveryStatus",
        accessorKey: "deliveryStatus",
        header: "Delivery Method",
        cell: (props: TableCellProps) => {
          const value = props.getValue();
          return value !== undefined ? <Status type={value} /> : "";
        },
      },
    ],
    []
  );

  const setSortingOptionHandler = useCallback(
    (column: string, direction: number) => {
      setSortingOptions([
        {
          field: column,
          direction: direction,
          priority: 0,
        },
      ]);
    },
    []
  );

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalOpen = useCallback((type: IModalType, order: IOrder) => {
    setModalState({ isOpen: true, type, order });
  }, []);

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null, order: null });
  }, []);

  return (
    <>
      <ReactTable
        DATA={orderList}
        COLUMNS={COLUMNS}
        fetchData={() => {}}
        sortingOptions={sortingOptions}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        totalCount={paginationData.totalCount}
        displaySearch="left"
        hasPreviousPage={paginationData.hasPreviousPage}
        setSortingOptionHandler={setSortingOptionHandler}
        hasNextPage={paginationData.hasNextPage}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <DeleteModal
        isOpen={modalState.isOpen && modalState.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Order"
        onDelete={() => {}}
      />

      <StatusModal
        isOpen={modalState.isOpen && modalState.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={{ recStatus: "active", recordName: "orders" }}
        title="Change Status"
        message="Do you want to change the status of this orders?"
      />
      {/* Product Variant Modal */}
      {modalState.isOpen && modalState.type === "productVariant" && (
        <OrderProductModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Orders;
