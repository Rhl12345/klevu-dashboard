"use client";
import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";

import { ITableColumn } from "@/components/Table/types";
import CreateModal from "@/admin-pages/email-autoresponders/components/CreateModal";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import EmailTemplateListDummyData from "@/mock-data/emailTemplateListDummy.json";
import CommonListDummyData from "@/mock-data/CommonListData.json";
import { IEmailAutorespondersData } from "@/types/email-autoresponders/emailAutoresponders.type";

const EmailTemplateList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "createModal" | "edit" | null;
  }>({ isOpen: false, type: null });
  const [editId, setEditId] = useState<number | null>(null);
  const [emailTemplateList, setemailTemplateList] = useState<
    IEmailAutorespondersData[]
  >([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "vendorName",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: EmailTemplateListDummyData.emailTemplateListData.length,
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
  const getEmailAutorespondersList = useCallback(async () => {
    // API call implementation
    setemailTemplateList(
      EmailTemplateListDummyData.emailTemplateListData as IEmailAutorespondersData[]
    );
  }, []);
  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "vendorName",
        name: "Name",
        type: "checkbox",
        options: CommonListDummyData.vendorOptions,
      },
      {
        columnName: "createddate",
        name: "Created Date",
        type: "date",
        options: null,
      },
      {
        columnName: "modifieddate",
        name: "Updated Date",
        type: "date",
        options: null,
      },
      {
        columnName: "createdby",
        name: "Created By",
        type: "checkbox",
        options: CommonListDummyData.userNameValues,
        conditionalSearch: true,
      },
      {
        columnName: "modifiedby",
        name: "Updated By",
        type: "checkbox",
        options: CommonListDummyData.userNameValues,
        conditionalSearch: true,
      },
    ],
    []
  );
  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setEditId(null);
  };
  const handleModalOpen = (
    type: "delete" | "activeInactive" | "createModal" | "edit" | null
  ) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const COLUMNS: ITableColumn<IEmailAutorespondersData>[] = [
    {
      id: "label",
      accessorKey: "label",
      header: "LABEL",
      cell: (props) => (
        <Button
          variant="default"
          size="md"
          className="!font-normal"
          onClick={() => {
            setEditId(props.row.original.id);
            handleModalOpen("edit");
          }}
        >
          {props.getValue()}
        </Button>
      ),
    },
    { id: "emailFrom", accessorKey: "emailFrom", header: "EMAIL FROM" },
    { id: "emailCC", accessorKey: "emailCC", header: "EMAIL CC" },
    { id: "emailTo", accessorKey: "emailTo", header: "EMAIL TO" },
    { id: "store", accessorKey: "store", header: "STORE" },
    { id: "subject", accessorKey: "subject", header: "SUBJECT" },
    { id: "emailBCC", accessorKey: "emailBCC", header: "EMAIL BCC" },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "CREATED DATE",
      cell: ({ row }) => {
        return row?.original?.createdDate ? (
          <>
            <div>{getFormatDate(row?.original?.createdDate).date} </div>
            <div className=" text-xs font-normal">
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
      filterFn: "customDateFilter",
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
        const EmailTemplate = props.row.original;
        return (
          <>
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(EmailTemplate.id);
                  handleModalOpen("edit");
                },
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete"),
              }}
              status={{
                show: true,
                status: EmailTemplate.recStatus === "A" ? "active" : "inactive",
                onClick: () => handleModalOpen("activeInactive"),
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <ListPageHeader
        name="Email Autoresponders"
        moduleName="Email Autoresponders"
      >
        <Button
          size="md"
          variant="primary"
          onClick={() => handleModalOpen("createModal")}
        >
          Add Email Autoresponders
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={emailTemplateList}
        COLUMNS={COLUMNS}
        fetchData={getEmailAutorespondersList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        {...paginationData}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        moreFilterOption={moreFilterOption}
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
          recordName: "Email Autoresponders",
        }}
        title="Change Status"
        message="Do you want to change the status of this Email Autoresponders?"
      />
    </>
  );
};

export default EmailTemplateList;
