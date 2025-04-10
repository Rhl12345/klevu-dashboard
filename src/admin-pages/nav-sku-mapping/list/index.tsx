"use client";
import React, { useCallback, useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import Button from "@/components/Button/Button";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { paginationDetails, RecStatusValuebyName } from "@/utils/constants";

import { ITableColumn } from "@/components/Table/types";
import CreateModal from "@/admin-pages/nav-sku-mapping/components/CreateModal";
import Status from "@/components/DisplayStatus/Status";
import { getFormatDate } from "@/utils/date.util";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import { INavSkuMappingData } from "@/types/nav-sku-mapping/navSkuMapping.type";
import NavSkuMappingDummyList from "@/mock-data/navSkuMappingDummyList.json";
import CommonListDummyData from "@/mock-data/CommonListData.json";

const NavSkuMappingList = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "createModal" | "edit" | null;
  }>({ isOpen: false, type: null });
  const [editId, setEditId] = useState<number | null>(null);
  const [navSkuMappingList, setNavSkuMappingList] = useState<
    INavSkuMappingData[]
  >([]);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "vendorName",
      direction: 0,
      priority: 0,
    },
    {
      field: "recStatus",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: NavSkuMappingDummyList.navSkuMappingData.length,
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
  const getNavSkuMappingList = useCallback(async () => {
    // API call implementation
    setNavSkuMappingList(NavSkuMappingDummyList.navSkuMappingData);
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
  const handleModalOpen = (
    type: "delete" | "activeInactive" | "createModal" | "edit" | null
  ) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setEditId(null);
  };

  const moreFilterOption = [
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
  ];
  const COLUMNS: ITableColumn<INavSkuMappingData>[] = [
    {
      id: "currentSku",
      accessorKey: "currentSku",
      header: "CURRENT SKU",
      cell: (props) => (
        <div
          className="cursor-pointer"
          onClick={() => {
            setEditId(props.row.original.id);
            handleModalOpen("edit");
          }}
        >
          <div className="whitespace-pre">{props.getValue()}</div>
        </div>
      ),
    },
    { id: "bcSku", accessorKey: "bcSku", header: "BC SKU" },
    { id: "storeName", accessorKey: "storeName", header: "STORE NAME" },

    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: "CREATED DATE",
      cell: ({ getValue }) => {
        return getValue() ? (
          <>
            <div>{getFormatDate(getValue()).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(getValue()).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    { id: "createdBy", accessorKey: "createdBy", header: "CREATED BY" },
    {
      id: "updatedDate",
      accessorKey: "updatedDate",
      header: "UPDATED DATE",
      filterFn: "customDateFilter",
      cell: ({ getValue }) => {
        return getValue() ? (
          <>
            <div>{getFormatDate(getValue()).date} </div>
            <div className="text-xs font-normal">
              {getFormatDate(getValue()).time}
            </div>
          </>
        ) : (
          ""
        );
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
        const NavSkuMapping = props.row.original;
        return (
          <>
            <TableActionPanel
              edit={{
                show: true,
                onClick: () => {
                  setEditId(NavSkuMapping.id);
                  handleModalOpen("createModal");
                },
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete"),
              }}
              status={{
                show: true,
                status: NavSkuMapping.recStatus === "A" ? "active" : "inactive",
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
      <ListPageHeader name="BC SKU Mapping" moduleName="BC SKU Mapping">
        <Button
          size="md"
          variant="primary"
          onClick={() => handleModalOpen("createModal")}
        >
          Add BC SKU Mapping
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={navSkuMappingList}
        COLUMNS={COLUMNS}
        fetchData={getNavSkuMappingList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        {...paginationData}
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
          recordName: "BC SKU Mapping",
        }}
        title="Change Status"
        message="Do you want to change the status of this BC SKU Mapping?"
      />
    </>
  );
};

export default NavSkuMappingList;
