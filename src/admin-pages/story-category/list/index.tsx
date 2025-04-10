"use client";
import React, { useState, useCallback, useMemo } from "react";

import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import ReactTable from "@/components/Table/ReactTable";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";

import { RecStatusValuebyName, paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";

import { IMoreFilterOption } from "@/types/common/common.type";
import storyCategoryData from "@/mock-data/storyCategoryList.json";
import StoryCategoryModal from "@/admin-pages/story-category/components/StoryCategoryModal";
import { IStoryCategoryValues, MODAL_TYPES } from "@/types/story-category/storyCategory.type";
import { ITableColumn } from "@/components/Table/types";

const DATA = storyCategoryData.data;

const MESSAGES = {
  DELETE_TITLE: "Delete",
  DELETE_ITEM: "Story Category",
  ADD_BUTTON: "Add Story Category",
} as const;

const StoryCategoryList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null;
    selectedStoryCategory: IStoryCategoryValues | null;
    editId: number | null;
  }>({
    isOpen: false,
    type: null,
    selectedStoryCategory: null,
    editId: null,
  });

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

  const moreFilterOption: IMoreFilterOption[] = useMemo(() => [
    {
      columnName: "createdby",
      name: "Created By",
      type: "checkbox",
      options: storyCategoryData.USER_NAME_OPTIONS,
      conditionalSearch: true,
    },
    {
      columnName: "createddate",
      name: "Created Date",
      type: "date",
      options: null,
    },
    {
      columnName: "modifiedby",
      name: "Updated By",
      type: "checkbox",
      options: storyCategoryData.USER_NAME_OPTIONS,
      conditionalSearch: true,
    },
    {
      columnName: "modifieddate",
      name: "Updated Date",
      type: "date",
      options: null,
    },
  ], [storyCategoryData,]);

  const setPaginationDataFunc = (
    key: keyof typeof paginationData,
    value: (typeof paginationData)[keyof typeof paginationData]
  ) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setSortingOptionHandler = useCallback(() => {
    setSortingOptions([]);
  }, []);

  // Modal handling functions
  const handleModalOpen = useCallback(
    (
      type: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES] | null,
      storyCategory?: IStoryCategoryValues
    ) => {
      setModalState((prevState) => ({
        ...prevState,
        isOpen: true,
        type,
        selectedStoryCategory: storyCategory || null,
        editId: storyCategory ? storyCategory.id : null,
      }));
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, type: null, selectedStoryCategory: null, editId: null });
  }, []);

  const COLUMNS: ITableColumn<IStoryCategoryValues>[] = useMemo(
    () => [
      {
        id: "category",
        accessorKey: "category",
        header: "CATEGORY",
        cell: ({ row, getValue }) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setModalState((prevState) => ({
                ...prevState,
                editId: row.original.id,
              }));
              handleModalOpen(MODAL_TYPES.EDIT, row.original);
            }}
          >
            {getValue()}
          </div>
        ),
      },
      {
        id: "slug",
        accessorKey: "slug",
        header: "SLUG",
        cell: ({ row, getValue }) => (
          <div>{getValue()}</div>
        ),
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
      {
        id: "createdby",
        accessorKey: "createdBy",
        header: "CREATED BY",
        cell: ({ row, getValue }) => (
          <div>{getValue()}</div>
        ),
      },
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
      {
        id: "modifiedby",
        accessorKey: "modifiedBy",
        header: "UPDATED BY",
        cell: ({ row, getValue }) => (
          <div>{getValue()}</div>
        ),
      },
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
          const storyCategory = row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setModalState((prevState) => ({
                    ...prevState,
                    editId: storyCategory.id,
                  }));
                  handleModalOpen(MODAL_TYPES.EDIT, storyCategory);
                },
              }}
              remove={{
                show: true,
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.DELETE, storyCategory),
              }}
              status={{
                show: true,
                status:
                  storyCategory.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen(MODAL_TYPES.ACTIVE_INACTIVE, storyCategory),
              }}
            />
          );
        },
      },
    ],
    [handleModalOpen]
  );

  const handleSubmit = useCallback((values: IStoryCategoryValues) => {
    handleModalClose();
  }, [handleModalClose]);

  return (
    <div>
      <ListPageHeader name={"Story Category"} moduleName={"Story Category"}>
        <Button
          variant="primary"
          onClick={() => handleModalOpen(MODAL_TYPES.CREATE)}
        >
          {MESSAGES.ADD_BUTTON}
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
          title={MESSAGES.DELETE_TITLE}
          itemName={MESSAGES.DELETE_ITEM}
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
              modalState.selectedStoryCategory?.recStatus === RecStatusValuebyName.Active ? "active" : "inactive",
            quantityName: "story category",
            recordName: "story category",
          }}
          title={`${modalState.selectedStoryCategory?.recStatus === RecStatusValuebyName.Active ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${modalState.selectedStoryCategory?.recStatus === RecStatusValuebyName.Active ? "inactive" : "active"} this story category?`}
        />
      )}

      {modalState.isOpen &&
        (modalState.type === MODAL_TYPES.CREATE ||
          modalState.type === MODAL_TYPES.EDIT) && (
          <StoryCategoryModal
            isOpen={modalState.isOpen}
            onClose={handleModalClose}
            editId={modalState.editId}
            onSubmit={handleSubmit}
          />
        )}
    </div>
  );
};

export default StoryCategoryList;
