"use client";
import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";

import { RecStatusValuebyName, paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { getErrorMessage } from "@/utils/common.util";

import shippingMethodData from "@/mock-data/shippingMethodList.json";
import { MODAL_TYPES, moreFilterOption } from "@/mock-data/shippingMethod";
import ShippingMethodModal from "@/admin-pages/shipping-method/components/ShippingMethodModal";
import { IShippingMethodValues } from "@/types/shipping-method/shippingMethod.type";
import { ITableColumn } from "@/components/Table/types";

const DATA = shippingMethodData.data;

const ShippingMethodList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<IShippingMethodValues | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null;
  }>({ isOpen: false, type: null });

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

  const setPaginationDataFunc = (
    key: keyof typeof paginationData,
    value: (typeof paginationData)[keyof typeof paginationData]
  ) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setSortingOptionHandler = () => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Modal handling functions
  const handleModalOpen = useCallback(
    (
      type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null,
      shippingMethod?: IShippingMethodValues
    ) => {
      setModalState({ isOpen: true, type });
      setSelectedShippingMethod(shippingMethod || null);
      if (type === MODAL_TYPES.EDIT && shippingMethod) {
        setEditId(shippingMethod.id);
      }
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null });
    setEditId(null);
    setSelectedShippingMethod(null);
  }, []);

  const COLUMNS: ITableColumn<IShippingMethodValues>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "NAME",
        cell: ({ row, getValue }) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setEditId(row.original.id);
              handleModalOpen(MODAL_TYPES.EDIT, row.original);
            }}
          >
            {getValue()}
          </div>
        ),
      },
      {
        id: "shippingVia",
        header: "SHIPPING VIA",
        accessorKey: "shippingVia",
      },
      {
        id: "charges",
        header: "CHARGES ($)",
        accessorKey: "charges",
      },
      {
        id: "createddate",
        accessorKey: "createdDate",
        header: "CREATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const createdDate = row.original.createdDate;
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
        accessorKey: "modifiedDate",
        header: "UPDATED DATE",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const modifiedDate = row.original.modifiedDate;
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
          const shippingMethod = row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(shippingMethod.id);
                  handleModalOpen(MODAL_TYPES.EDIT, shippingMethod);
                },
              }}
              remove={{
                show: true,
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.DELETE, shippingMethod),
              }}
              status={{
                show: true,
                status:
                  shippingMethod.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.ACTIVE_INACTIVE, shippingMethod),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const handleSubmit = (values: IShippingMethodValues) => {
    handleModalClose();
  };

  return (
    <div>
      <ListPageHeader name={"Shipping Methods"} moduleName={"Shipping Methods"}>
        <Button
          variant="primary"
          onClick={() => handleModalOpen(MODAL_TYPES.CREATE)}
        >
          Add Shipping Method
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
          itemName="Shipping Method"
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
              selectedShippingMethod?.recStatus === "A" ? "active" : "inactive",
            quantityName: "shipping method",
            recordName: "shipping method",
          }}
          title={`${selectedShippingMethod?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedShippingMethod?.recStatus === "A" ? "inactive" : "active"} this shipping method?`}
        />
      )}

      {modalState.isOpen &&
        (modalState.type === MODAL_TYPES.CREATE ||
          modalState.type === MODAL_TYPES.EDIT) && (
          <ShippingMethodModal
            isOpen={modalState.isOpen}
            onClose={handleModalClose}
            editId={editId}
            onSubmit={handleSubmit}
          />
        )}
    </div>
  );
};

export default ShippingMethodList;
