"use client";
import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";

import { ITableColumn } from "@/components/Table/types";
import CreateModal from "@/admin-pages/thread-group-color-option/components/CreateModal";
import Status from "@/components/DisplayStatus/Status";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import ThreadGroupColorOptionData from "@/mock-data/threadGroupColorOption.json";
import { IThreadGroupColorOption } from "@/types/thread-group-color-option/threadGroupColorOption.type";

const ThreadGroupColorOptionList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [threadGroupColorOptionList, setThreadGroupColorOptionList] = useState<
    IThreadGroupColorOption[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "createModal" | "edit" | null;
  }>({ isOpen: false, type: null });

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: ThreadGroupColorOptionData.threadData.length,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    { filter: string; name: string }[]
  >([]);
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getThreadGroupColorOptionList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // API call implementation
      setThreadGroupColorOptionList(ThreadGroupColorOptionData.threadData as IThreadGroupColorOption[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleModalOpen = useCallback(
    (type: "delete" | "activeInactive" | "createModal" | "edit" | null) => {
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setEditId(null);
  };
  const COLUMNS: ITableColumn<IThreadGroupColorOption>[] = useMemo(
    () => [
      {
        id: "groupColorValue",
        accessorKey: "groupColorValue",
        header: "Group Color Value",
        cell: (props) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setEditId(props.row.original.id);
              handleModalOpen("edit");
            }}
          >
            <div className="whitespace-pre">
              {props.row.original.groupColorValue}
            </div>
          </div>
        ),
      },
      {
        id: "threadBrandName",
        accessorKey: "threadBrandName",
        header: "Thread Brand Name",
      },
      {
        id: "displayOrder",
        accessorKey: "displayOrder",
        header: "Display Order",
      },

      {
        id: "createdDate",
        accessorKey: "createdDate",
        header: "CREATED DATE",
        cell: ({ row }) => {
          return row?.original?.createdDate ? (
            <>
              <div>{getFormatDate(row?.original?.createdDate).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(row?.original?.createdDate).time}
              </div>
            </>
          ) : null;
        },
      },
      { id: "createdBy", accessorKey: "createdBy", header: "CREATED BY" },
      {
        id: "updatedDate",
        accessorKey: "updatedDate",
        header: "UPDATED DATE",
        cell: ({ row }) => {
          return row?.original?.updatedDate ? (
            <>
              <div>{getFormatDate(row?.original?.updatedDate).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(row?.original?.updatedDate).time}
              </div>
            </>
          ) : null;
        },
      },
      { id: "updatedBy", accessorKey: "updatedBy", header: "UPDATED BY" },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "STATUS",
        filterFn: "arrIncludesSome",
        cell: (props) => (
          <Status
            type={
              props.getValue() === "A"
                ? RecStatusValuebyName.Active
                : RecStatusValuebyName.Inactive
            }
          />
        ),
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props) => {
          const threadGroupColorOptionList = props.row.original;
          return (
            <>
              <TableActionPanel
                edit={{
                  show: true,
                  onClick: () => {
                    setEditId(threadGroupColorOptionList.id);
                    handleModalOpen("edit");
                  },
                }}
                remove={{
                  show: true,
                  onClick: () => handleModalOpen("delete"),
                }}
                status={{
                  show: true,
                  status:
                    threadGroupColorOptionList.recStatus === "A"
                      ? "active"
                      : "inactive",
                  onClick: () => handleModalOpen("activeInactive"),
                }}
              />
            </>
          );
        },
      },
    ],
    [threadGroupColorOptionList]
  );

  return (
    <>
      <ListPageHeader
        name="Thread Group Color Option"
        moduleName="Thread Group Color Option"
      >
        <Button
          size="md"
          onClick={() => setIsModalOpen({ isOpen: true, type: "createModal" })}
        >
          Add Thread Group Color Option
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={threadGroupColorOptionList}
        COLUMNS={COLUMNS}
        fetchData={getThreadGroupColorOptionList}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        {...paginationData}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showFilter={false}
        displaySearch={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        loading={isLoading}
      />

      <CreateModal
        isOpen={
          isModalOpen.isOpen &&
          (isModalOpen.type === "createModal" || isModalOpen.type === "edit")
        }
        handleModalClose={handleModalClose}
        editId={editId}
      />
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        onDelete={() => {}}
      />

      <StatusModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={{
          recStatus: "inactive",
          recordName: "Thread Group Color Option",
        }}
        title="Change Status"
        message="Do you want to change the status of this Thread Group Color Option?"
      />
    </>
  );
};

export default ThreadGroupColorOptionList;
