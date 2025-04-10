"use client";
import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Image from "@/components/Image/Image";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import TableActionPanel from "@/components/common/TableActionPanel";
import StatusChangeModel from "@/components/Modal/StatusModal";
import DeleteModal from "@/components/Modal/DeleteModal";

import { IGiftCardValues } from "@/types/gift-cards/giftCards.type";
import { IPaginationData } from "@/types/account-activity/accountActivity.type";

import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";
import { getErrorMessage } from "@/utils/common.util";
import { getFormatDate } from "@/utils/date.util";

import giftCards from "@/mock-data/giftCards.json";
import { moreFilterOption } from "@/mock-data/giftCards";
import GiftCardModal from "@/admin-pages/gift-card/components/GiftCardModal";

const giftCardData = giftCards && giftCards.data;
const MODAL_TYPES = {
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  ACTIVE_INACTIVE: "activeInactive",
} as const;

const GiftCardList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null;
  }>({ isOpen: false, type: null });
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedGiftCard, setSelectedGiftCard] =
    useState<IGiftCardValues | null>(null);
  const [paginationData, setPaginationData] = useState<IPaginationData>({
    ...paginationDetails,
    totalCount: giftCardData.length,
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

  // Memoize handlers
  const setSortingOptionHandler = useCallback(() => {
    try {
      setSortingOptions([]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  // Memoize pagination handler
  const setPaginationDataFunc = useCallback(
    (
      key: keyof typeof paginationData,
      value: (typeof paginationData)[keyof typeof paginationData]
    ) => {
      setPaginationData((prev: IPaginationData) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Modal handling functions
  const handleModalOpen = useCallback(
    (
      type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null,
      giftCard?: IGiftCardValues
    ) => {
      setModalState({ isOpen: true, type });
      setSelectedGiftCard(giftCard || null);
      if (type === MODAL_TYPES.EDIT && giftCard) {
        setEditId(giftCard.id.toString());
      }
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null });
    setEditId(null);
    setSelectedGiftCard(null);
  }, []);

  const handleSubmit = (values: IGiftCardValues) => {
    handleModalClose();
  };

  const COLUMNS: ITableColumn<IGiftCardValues>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
        cell: ({ row, getValue }) => (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditId(row.original.id.toString());
                handleModalOpen(MODAL_TYPES.EDIT, row.original);
              }}
            >
              {getValue()}
            </div>
          </>
        ),
      },
      {
        id: "image",
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
          const image = row.original.image || "";
          return (
            <div className="w-24">
              <Image src={image} alt="Gift Card" />
            </div>
          );
        },
      },
      {
        id: "ourSku",
        accessorKey: "ourSku",
        header: "Our SKU",
      },
      {
        id: "endDate",
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }: { row: { original: IGiftCardValues } }) => {
          const endDate = row.original.endDate;
          if (!endDate) return null;
          const { date, time } = getFormatDate(endDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      {
        id: "salePrice",
        accessorKey: "salePrice",
        header: "Sale Price",
      },
      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: "Created Date",
        cell: ({ row }: { row: { original: IGiftCardValues } }) => {
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
      {
        id: "createdBy",
        accessorKey: "createdBy",
        header: "Created By",
      },
      {
        id: "updatedDate",
        accessorKey: "updatedDate",
        header: "Updated Date",
        cell: ({ row }: { row: { original: IGiftCardValues } }) => {
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
        accessorKey: "updatedBy",
        header: "Updated By",
      },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "Status",
        cell: ({ row }: { row: { original: IGiftCardValues } }) => {
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
          const giftCard = row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(giftCard.id.toString());
                  handleModalOpen(MODAL_TYPES.EDIT, giftCard);
                },
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen(MODAL_TYPES.DELETE, giftCard),
              }}
              status={{
                show: true,
                status:
                  giftCard.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.ACTIVE_INACTIVE, giftCard),
              }}
            />
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <ListPageHeader name={"Gift Card"} moduleName={"Gift Card"}>
        <Button
          variant="primary"
          aria-label="Add Gift Card"
          onClick={() => handleModalOpen(MODAL_TYPES.CREATE)}
        >
          Add Gift Card
        </Button>
      </ListPageHeader>
      <ReactTable
        DATA={giftCardData}
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
          itemName="Gift Card"
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
              selectedGiftCard?.recStatus === "A" ? "active" : "inactive",
            quantityName: "gift card",
            recordName: "gift card",
          }}
          title={`${selectedGiftCard?.recStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedGiftCard?.recStatus === "A" ? "inactive" : "active"} this gift card?`}
        />
      )}

      {modalState.isOpen &&
        (modalState.type === MODAL_TYPES.CREATE ||
          modalState.type === MODAL_TYPES.EDIT) && (
          <GiftCardModal
            isOpen={modalState.isOpen}
            onClose={handleModalClose}
            editId={editId}
            onSubmit={handleSubmit}
          />
        )}
    </>
  );
};

export default GiftCardList;
