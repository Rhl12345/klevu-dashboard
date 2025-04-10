"use client";
import { useCallback, useMemo, useState } from "react";

import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import DeleteModal from "@/components/Modal/DeleteModal";
import ReactTable from "@/components/Table/ReactTable";
import { IReactTableProps, ITableColumn } from "@/components/Table/types";
import TableActionPanel from "@/components/common/TableActionPanel";
import messagesList from "@/mock-data/messagesList.json";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";

import MessagesModal from "@/admin-pages/messages/components/MessagesModal";
import Status from "@/components/DisplayStatus/Status";
import StatusChangeModel from "@/components/Modal/StatusModal";
import {
  IMessage,
  TMessageModalType,
  TMessageStatus,
} from "@/types/global-messages/messages.type";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import { messageOptions } from "@/utils/Dummy";

/**

/**
 * PageRedirectListPage Component
 * @component
 * @description Handles the listing of page redirects
 * @returns {React.ReactElement} Rendered form component
 */

const MessagesList = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: TMessageModalType;
    editId: number | null;
  }>({ isOpen: false, type: null, editId: null });

  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [messageList, setMessageList] = useState<IMessage[]>(
    messagesList.messages
  );
  const [sortingOptions, setSortingOptions] = useState<
    IReactTableProps["sortingOptions"]
  >([]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: messagesList.messages.length,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Modal handling functions
  const handleModalOpen = (
    type: TMessageModalType,
    message: IMessage | null
  ) => {
    setIsModalOpen({ isOpen: true, type, editId: message?.id || null });
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "name",
        name: "Name",
        type: "checkbox",
        options: messageOptions,
      },
      {
        columnName: "oldUrl",
        name: "Old URL",
        type: "checkbox",
        options: null,
      },
      {
        columnName: "createddate",
        name: "Created Date",
        type: "date",
        options: null,
      },
      {
        columnName: "createdby",
        name: "Created By",
        type: "checkbox",
        options: messagesList.userNameOptions,
        conditionalSearch: true,
      },
    ],
    [messageOptions, messagesList.userNameOptions]
  );

  const COLUMNS: ITableColumn<IMessage>[] = [
    {
      id: "message",
      accessorKey: "message",
      header: "Message",
      cell: ({ getValue }) => (
        <div className="whitespace-pre">{getValue()}</div>
      ),
    },
    { id: "messagekey", accessorKey: "messagekey", header: "Message Key" },
    { id: "store", accessorKey: "store", header: "Store" },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "Created Date",
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
    { id: "createdBy", accessorKey: "createdBy", header: "Created By" },
    {
      id: "updatedDate",
      accessorKey: "updatedDate",
      header: "Updated Date",
      cell: ({ row }) => {
        const modifiedDate = row.original.updatedDate;
        if (!modifiedDate) return null;
        const { date, time } = getFormatDate(modifiedDate);
        return (
          <>
            <div>{date} </div>
            <div className="text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    { id: "updatedBy", accessorKey: "updatedBy", header: "Updated By" },
    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
      filterFn: "arrIncludesSome",
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? <Status type={value} /> : null;
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: (props) => {
        const message = props.row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              onClick: () => handleModalOpen("edit", message),
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", message),
            }}
            status={{
              show: true,
              status: message.recStatus as TMessageStatus,
              onClick: () => handleModalOpen("status", message),
            }}
          />
        );
      },
    },
  ];

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const fetchPageRedirectList = useCallback(
    async (pageIndex = 1) => {
      setIsLoading(true);
      try {
        setMessageList(messagesList.messages);
        toast.success("Messages list fetched successfully");
      } catch (error) {
        toast.error(getErrorMessage(error, "Error fetching messages list"));
      } finally {
        setIsLoading(false);
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null, editId: null });
  };

  const handleDelete = useCallback(
    async () => {
      // ... implementation
    },
    [
      /* dependencies */
    ]
  );

  const memoizedColumns = useMemo(() => COLUMNS, []);

  return (
    <>
      <ListPageHeader name={"Add Messages"} moduleName={"Messages"}>
        <Button
          variant="primary"
          onClick={() => handleModalOpen("create", null)}
        >
          Add Messages
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={messageList}
        COLUMNS={memoizedColumns}
        fetchData={fetchPageRedirectList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        displaySearch="left"
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        showEditColumns
        showFilter
        showMoreFilters={true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
        loading={isLoading}
      />

      {isModalOpen.isOpen &&
        (isModalOpen.type === "edit" || isModalOpen.type === "create") && (
          <MessagesModal
            isOpen={isModalOpen.isOpen}
            handleModalClose={handleModalClose}
            editId={isModalOpen.editId}
          />
        )}

      {isModalOpen.isOpen && isModalOpen.type === "status" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus: "inactive",
            quantityName: "Message",
            recordName: "Message",
          }}
          title="Change Status"
          message="Do you want to change the status of this Message ?"
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Message"
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default MessagesList;
