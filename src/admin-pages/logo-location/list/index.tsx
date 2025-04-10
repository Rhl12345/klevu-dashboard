"use client";
import { PageRoutes } from "@/admin-pages/routes";
import DateCell from "@/components/common/DateCell";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import Modal from "@/components/Modal/Modal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getAll } from "@/services/logo-location/logoLocation.service";
import storeConfiguration from "@/services/store-configuration/storeConfiguration.service";
import { ILogoLocationListItem } from "@/types/logo-location/logo-location.type";
import { IStoreDropDownData } from "@/types/store-configuration/storeConfiguration.type";
import { paginationDetails } from "@/utils/constants";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
import { getFilterOption } from "@/utils/helpers";
import { ColumnFiltersState } from "@tanstack/react-table";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const List = () => {
  const [data, setData] = useState<ILogoLocationListItem[]>([]);
  const [store, setStore] = useState<IStoreDropDownData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    ColumnFiltersState[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | null;
  }>({ isOpen: false, type: null });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "gender",
      direction: 0,
      priority: 0,
    },
    {
      field: "productType",
      direction: 0,
      priority: 0,
    },
  ]);

  const moreFilterOptions = [
    getFilterOption("Gender", "categoryId", "checkbox", store, true),
    getFilterOption("Created Date", "createdDate", "date", [], false),
    getFilterOption("Created By", "createdBy", "checkbox", [], false),
    getFilterOption("Status", "recStatus", "radio", [], false),
  ];

  const columns: ITableColumn<ILogoLocationListItem>[] = [
    {
      id: "gender",
      header: "Category",
      accessorKey: "gender",
      cell: ({ row }) => {
        return row ? (
          <div>
            <Link href={PageRoutes.LOGO_LOCATION.EDIT + row.original.id}>
              {row?.original?.gender}
            </Link>
          </div>
        ) : (
          ""
        );
      },
    },
    {
      id: "productType",
      header: "PRODUCT TYPE",
      accessorKey: "productType",
    },
    {
      id: "subProductType",
      header: "SUB PRODUCT TYPE",
      accessorKey: "subProductType",
    },
    {
      id: "logoLocations",
      header: "LOGO LOCATIONS",
      accessorKey: "logoLocations",
    },
    {
      id: "createdDate",
      header: "CREATED date",
      accessorKey: "createdDate",
      cell: ({ row }) => {
        const date = row?.original?.createdDate;
        return <DateCell date={date} />;
      },
    },
    {
      id: "createdBy",
      header: "Created By",
      accessorKey: "createdName",
    },
    {
      id: "updatedDate",
      header: "UPDATED date",
      accessorKey: "modifiedDate",
      cell: ({ row }) => {
        const date = row?.original?.modifiedDate;
        return <DateCell date={date || ""} />;
      },
    },
    {
      id: "updatedBy",
      header: "Updated By",
      accessorKey: "modifiedName",
    },
    {
      id: "recStatus",
      header: "Status",
      accessorKey: "recStatus",
      cell: (props) => {
        if (props.getValue() !== undefined) {
          return <Status type={props.getValue()} />;
        } else {
          return null;
        }
      },
    },
    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: { original: ILogoLocationListItem } }) => {
        const logo = row?.original;
        return (
          <TableActionPanel
            edit={{
              url: `${PageRoutes.LOGO_LOCATION.EDIT}${logo?.id}`,
              show: true,
            }}
            status={{
              status: "active",
              show: true,
              onClick: () => handleOpenModal("activeInactive"),
            }}
            remove={{
              show: true,
              onClick: () => handleOpenModal("delete"),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleOpenModal("viewHistory"),
            }}
          />
        );
      },
    },
  ];

  const handleOpenModal = (
    type: "delete" | "activeInactive" | "viewHistory"
  ) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const getLogoLocationList = async () => {
    try {
      const response = await getAll();
      setData(response.items);
      setPagination((prevState) => ({
        ...prevState,
        pageIndex: response.pageIndex,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        hasPreviousPage: response.hasPreviousPage,
        hasNextPage: response.hasNextPage,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getDropDownForStores = async () => {
    try {
      const response = await storeConfiguration.getDropDownValues();
      setStore(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setPaginationDataFunc = (key: string, value: any) => {
    setPagination((prevState) => ({
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

  const handleClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };

  useEffect(() => {
    getDropDownForStores();
  }, []);

  return (
    <>
      <ListPageHeader
        name={"Add Logo Location"}
        moduleName={"Logo Locations"}
        navigateUrl={PageRoutes.LOGO_LOCATION.CREATE}
      />
      <ReactTable
        showFilter
        COLUMNS={columns}
        DATA={data}
        showEditColumns
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={getLogoLocationList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        setGlobalFilter={setGlobalFilter}
        moreFilterOption={moreFilterOptions}
        totalCount={pagination.totalCount}
        selectedRows={selectedRows}
        globalFilter={globalFilter}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal isOpen onClose={handleClose} onDelete={() => {}} />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={true}
          onClose={handleClose}
          onConfirm={() => {}}
          currentRowData={{ recStatus: "inactive", recordName: "logo" }}
          message="Do you want inactive this logo"
        />
      )}

      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName="logo"
      />
    </>
  );
};

export default List;
