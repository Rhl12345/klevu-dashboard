"use client";
import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import { getFormatDate } from "@/utils/date.util";

import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";

import { ITableColumn } from "@/components/Table/types";
import paymentTypeData from "@/mock-data/paymentTypeList.json";
import { moreFilterOption } from "@/mock-data/paymentType";
import { IPaymentTypeValues } from "@/types/payment-types/paymentTypes.type";
import PaymentTypeModal from "@/admin-pages/payment-types/components/PaymentTypeModal";

const DATA = paymentTypeData.data;
const MODAL_TYPES = {
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  ACTIVE_INACTIVE: "activeInactive",
} as const;

const PaymentTypesListPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedPaymentType, setSelectedPaymentType] =
    useState<IPaymentTypeValues | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null;
  }>({ isOpen: false, type: null });

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  // 1. Add type safety for sorting options
  const [sortingOptions, setSortingOptions] = useState<
    Array<{
      field: string;
      direction: number;
      priority: number;
    }>
  >([]);

  // 2. Add type safety for filtering options
  const [filteringOptions, setColumnFilteringOptions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string | number | boolean;
    }>
  >([]);

  const setPaginationDataFunc = (
    key: keyof typeof paginationData,
    value: (typeof paginationData)[keyof typeof paginationData]
  ) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setSortingOptionHandler = (column: string, direction: number) => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error("Failed to sort data");
    }
  };

  // Modal handling functions
  const handleModalOpen = useCallback(
    (
      type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null,
      paymentType?: IPaymentTypeValues
    ) => {
      setModalState({ isOpen: true, type });
      setSelectedPaymentType(paymentType || null);
      if (type === MODAL_TYPES.EDIT && paymentType) {
        setEditId(paymentType.id);
      }
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null });
    setEditId(null);
    setSelectedPaymentType(null);
  }, []);

  const COLUMNS: ITableColumn<IPaymentTypeValues>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "NAME",
        cell: ({ row, getValue }) => (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditId(row.original.id);
                handleModalOpen(MODAL_TYPES.EDIT, row.original);
              }}
            >
              {getValue()}
            </div>
          </>
        ),
      },

      {
        id: "createddate",
        accessorKey: "createddate",
        header: "CREATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const createdDate = row.original.createddate;
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
      { id: "createdName", accessorKey: "createdName", header: "CREATED BY" },
      {
        id: "modifieddate",
        accessorKey: "modifieddate",
        header: "UPDATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const modifiedDate = row.original.modifieddate;
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
      { id: "modifiedName", accessorKey: "modifiedName", header: "UPDATED BY" },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "STATUS",
        filterFn: "arrIncludesSome",
        cell: ({ row }) => {
          const recStatus = row.original.recStatus;
          if (!recStatus) return null;
          return <Status type={recStatus} />;
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const paymentOption = row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(row.original.id);
                  handleModalOpen(MODAL_TYPES.EDIT, paymentOption);
                },
              }}
              remove={{
                show: true,
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.DELETE, paymentOption),
              }}
              status={{
                show: true,
                status:
                  paymentOption.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.ACTIVE_INACTIVE, paymentOption),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const handleSubmit = (values: IPaymentTypeValues) => {
    handleModalClose();
  };

  return (
    <div>
      <ListPageHeader name={"Payment Types"} moduleName={"Payment Types"}>
        <Button
          variant="primary"
          onClick={() =>
            setModalState({ isOpen: true, type: MODAL_TYPES.CREATE })
          }
        >
          Add Payment Type
        </Button>
      </ListPageHeader>
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
      />

      {modalState.isOpen && modalState.type === MODAL_TYPES.DELETE && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Payment Type"
          onDelete={() => {}}
        />
      )}
      {modalState.isOpen && modalState.type === MODAL_TYPES.ACTIVE_INACTIVE && (
        <StatusChangeModel
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus:
              selectedPaymentType?.recStatus === "A" ? "active" : "inactive",
            quantityName: "payment type",
            recordName: "payment type",
          }}
          title={`${selectedPaymentType?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedPaymentType?.recStatus === "A" ? "inactive" : "active"} this payment type?`}
        />
      )}

      {modalState.isOpen &&
        (modalState.type === MODAL_TYPES.CREATE ||
          modalState.type === MODAL_TYPES.EDIT) && (
          <PaymentTypeModal
            isOpen={modalState.isOpen}
            onClose={handleModalClose}
            editId={editId}
            onSubmit={handleSubmit}
          />
        )}
    </div>
  );
};

export default PaymentTypesListPage;
