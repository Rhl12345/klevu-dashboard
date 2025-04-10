"use client";

import React, { useMemo, useState } from "react";

import AddGroupDescriptionModal from "@/admin-pages/group-description/components/AddGroupDescriptionModal";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import TableActionPanel from "@/components/common/TableActionPanel";

import GroupDescription from "@/mock-data/GroupDescription.json";
import { getFormatDate } from "@/utils/date.util";

import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";

import Status from "@/components/DisplayStatus/Status";
import { ITableColumn } from "@/components/Table/types";
import { IGroupDescriptionValues } from "@/types/group-description/groupDescription.type";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";

const DATA = GroupDescription.data;

const GroupDescriptionListPage: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const [selectedGroupDescription, setSelectedGroupDescription] =
    useState<IGroupDescriptionValues | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "create" | "edit" | "delete" | "activeInactive" | null;
  }>({ isOpen: false, type: null });

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: DATA.length,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<
    {
      field: string;
      operator: string;
      value: string | number | boolean;
    }[]
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
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  //   Modal handling functions
  const handleModalOpen = (
    type: "create" | "edit" | "delete" | "activeInactive" | null,
    GroupDescription: IGroupDescriptionValues
  ) => {
    setIsModalOpen({ isOpen: true, type });
    setSelectedGroupDescription(GroupDescription);
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setEditId(null);
    setSelectedGroupDescription(null);
  };

  const COLUMNS = useMemo<ITableColumn<IGroupDescriptionValues>[]>(
    () => [
      {
        id: "descriptionValue",
        header: "Description",
        accessorKey: "descriptionValue",
        enableSorting: false,
        cell: (props) => (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditId(props.row.original.id);
                handleModalOpen("edit", props.row.original);
              }}
            >
              <div className="whitespace-pre">{props.getValue()}</div>
            </div>
          </>
        ),
      },
      {
        id: "displayOrder",
        header: "Display Order",
        accessorKey: "displayOrder",
        enableSorting: true,
      },
      {
        id: "createdDate",
        header: "CREATED DATE",
        accessorKey: "createdDate",
        filterFn: "customDateFilter",
        cell: (props) => {
          return props.getValue() ? (
            <>
              <div>{getFormatDate(props.getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(props.getValue()).time}
              </div>
            </>
          ) : (
            "-"
          );
        },
      },
      {
        id: "createdBy",
        accessorKey: "createdBy",
        header: "CREATED BY",
        enableSorting: true,
      },
      {
        id: "modifiedDate",
        header: "UPDATED DATE",
        accessorKey: "modifiedDate",
        filterFn: "customDateFilter",
        cell: (props) => {
          return props.getValue() ? (
            <>
              <div>{getFormatDate(props.getValue()).date} </div>
              <div className="text-xs font-normal">
                {getFormatDate(props.getValue()).time}
              </div>
            </>
          ) : (
            "-"
          );
        },
        enableSorting: true,
      },
      {
        id: "modifiedBy",
        header: "UPDATED BY",
        accessorKey: "modifiedBy",
        enableSorting: true,
      },
      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "STATUS",
        filterFn: "arrIncludesSome",
        cell: (props) => {
          if (props.getValue() !== undefined) {
            return <Status type={props.getValue()} />;
          } else {
            return "";
          }
        },
        enableSorting: true,
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "action",
        enableSorting: false,
        cell: (props) => {
          const GroupDescription = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(props.row.original.id);
                  handleModalOpen("edit", GroupDescription);
                },
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", GroupDescription),
              }}
              status={{
                show: true,
                status:
                  GroupDescription.recStatus === RecStatusValuebyName.Active
                    ? "active"
                    : "inactive",
                onClick: () =>
                  handleModalOpen("activeInactive", GroupDescription),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const handleSubmit = (values: IGroupDescriptionValues) => {
    try {
      // If editing
      if (editId) {
        // Update your data here
        toast.success("Group Description updated successfully");
      } else {
        // Create new record
        toast.success("Group Description created successfully");
      }
      // Close modal and reset
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <ListPageHeader
        name={"Group Description"}
        moduleName={"Group Description"}
      >
        <Button
          variant="primary"
          onClick={() => setIsModalOpen({ isOpen: true, type: "create" })}
        >
          Add Group Description
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
        checkboxSelection={false}
        showFilter={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
      />

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Group Description"
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
              selectedGroupDescription?.recStatus === "A"
                ? "active"
                : "inactive",
            quantityName: "Group Description",
            recordName: "Group Description",
          }}
          title="Change Status"
          message="Do you want to change the status of thisGroup Description ?"
        />
      )}

      {isModalOpen.isOpen &&
        (isModalOpen.type === "create" || isModalOpen.type === "edit") && (
          <AddGroupDescriptionModal
            isOpen={isModalOpen.isOpen}
            onClose={handleModalClose}
            editId={editId}
            onSubmit={handleSubmit}
            descriptionValue={selectedGroupDescription?.descriptionValue || ""}
            displayOrder={selectedGroupDescription?.displayOrder || ""}
          />
        )}
    </>
  );
};

export default GroupDescriptionListPage;
