"use client";
import React, { useMemo, useState } from "react";

import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";

import { RecStatusValuebyName } from "@/utils/constants";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";

import { ITableColumn } from "@/components/Table/types";
import { IShippingCarrierValues } from "@/types/shipping-carrier/shippingCarrier.type";
import shippingCarrierData from "@/mock-data/shippingCarrierList.json";
import { moreFilterOption } from "@/mock-data/shippingCarrier";
import ShippingCarrierModal from "@/admin-pages/shipping-carrier/components/ShippingCarrierModal";
import { toast } from "react-toastify";

const DATA = shippingCarrierData.data;

const MODAL_TYPES = {
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  ACTIVE_INACTIVE: "activeInactive",
} as const;

const ShippingCarrierList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "create" | "edit" | "delete" | "activeInactive" | null;
  }>({ isOpen: false, type: null });
  const [selectedShippingCarrier, setSelectedShippingCarrier] =
    useState<IShippingCarrierValues | null>(null);

  const [sortingOptions, setSortingOptions] = useState([]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    ITableColumn[]
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
    setSortingOptions([]);
  };

  const COLUMNS: ITableColumn<IShippingCarrierValues>[] = useMemo(
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
        id: "userName",
        header: "USER NAME",
        accessorKey: "userName",
      },
      {
        id: "clientKey",
        header: "CLIENT KEY",
        accessorKey: "clientKey",
      },
      {
        id: "secretKey",
        header: "SECRET KEY",
        accessorKey: "secretKey",
      },
      {
        id: "token",
        header: "TOKEN",
        accessorKey: "token",
      },
      {
        id: "url",
        header: "URL",
        accessorKey: "url",
      },
      {
        id: "createddate",
        accessorKey: "createddate",
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
        accessorKey: "modifieddate",
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
        cell: (props: { row: { original: IShippingCarrierValues } }) => {
          const shippingCarrier = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(shippingCarrier.id);
                  handleModalOpen(MODAL_TYPES.EDIT, shippingCarrier);
                },
              }}
              remove={{
                show: true,
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.DELETE, shippingCarrier),
              }}
              status={{
                show: true,
                status:
                  shippingCarrier.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",

                onClick: () =>
                  handleModalOpen(MODAL_TYPES.ACTIVE_INACTIVE, shippingCarrier),
              }}
            />
          );
        },
      },
    ],
    []
  );

  // Modal handling functions

  const handleModalOpen = (
    type: "create" | "edit" | "delete" | "activeInactive" | null,
    shippingCarrier: IShippingCarrierValues
  ) => {
    setSelectedShippingCarrier(shippingCarrier);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedShippingCarrier(null);
    setEditId(null);
  };

  const handleSubmit = (values: IShippingCarrierValues) => {
    try {
      // If editing

      if (editId) {
        // Update your data here
        toast.success("Shipping carrier updated successfully");
      } else {
        // Create new record
        toast.success("Shipping carrier created successfully");
      }
      // Close modal and reset
      handleModalClose();
    } catch (error) {}
  };

  return (
    <>
      <ListPageHeader
        name={"Shipping Carriers"}
        moduleName={"Shipping Carriers"}
      >
        <Button
          variant="primary"
          onClick={() => setIsModalOpen({ isOpen: true, type: "create" })}
        >
          Add Shipping Carrier
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

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Shipping Carrier"
          onDelete={() => {}}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus:
              selectedShippingCarrier?.recStatus === "A"
                ? "active"
                : "inactive",
            quantityName: "shipping carrier",

            recordName: "shipping carrier",
          }}
          title={`${selectedShippingCarrier?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedShippingCarrier?.recStatus === "A" ? "inactive" : "active"} this shipping carrier?`}
        />
      )}

      {isModalOpen.isOpen &&
        (isModalOpen.type === MODAL_TYPES.CREATE ||
          isModalOpen.type === MODAL_TYPES.EDIT) && (
          <ShippingCarrierModal
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            editId={editId}
            onSubmit={handleSubmit}
          />
        )}
    </>
  );
};

export default ShippingCarrierList;
