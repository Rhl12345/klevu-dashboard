"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { paginationDetails } from "@/utils/constants";
import { DUMMY_VIEW_HISTORY_DATA, StoreTypeFilter } from "@/utils/Dummy";
import { getFilterOption } from "@/utils/helpers";
import { ColumnFiltersState } from "@tanstack/react-table";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import { PageRoutes } from "@/admin-pages/routes";
import {
  getAllDimensions,
  getAllDimensionsDropDownData,
} from "@/services/dimensions/dimensions.service";
import {
  IDimensionDropDownDataResponse,
  IDimensionItem,
} from "@/types/dimensions/dimension.type";
import TableActionPanel from "@/components/common/TableActionPanel";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import DateCell from "@/components/common/DateCell";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";

const List = () => {
  const [data, setData] = useState<IDimensionItem[]>([]);
  const [dimensionDropDownData, setDimensionDropDownData] = useState<
    IDimensionDropDownDataResponse[]
  >([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState<
    ColumnFiltersState[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<ColumnFiltersState[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "history" | null;
  }>({ isOpen: false, type: null });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "storeName",
      direction: 0,
      priority: 0,
    },
  ]);

  const columns: ITableColumn<IDimensionItem>[] = [
    {
      id: "name",
      header: "NAME",
      accessorKey: "name",
      cell: ({ row }) => {
        return row ? (
          <div className="w-full max-w-md break-words">
            <Link href={PageRoutes.DIMENSIONS.EDIT + row.original.id}>
              {row?.original?.name}
            </Link>
          </div>
        ) : null;
      },
    },
    {
      id: "gender",
      header: "Category",
      accessorKey: "gender",
    },
    {
      id: "productType",
      header: "Product Type",
      accessorKey: "productType",
    },
    {
      id: "subProductType",
      header: "sub product type",
      accessorKey: "subProductType",
    },
    {
      id: "length",
      header: "Length",
      accessorKey: "length",
    },
    {
      id: "width",
      header: "WIDTH",
      accessorKey: "width",
    },
    {
      id: "height",
      header: "HEIGHT",
      accessorKey: "height",
    },
    {
      id: "volume",
      header: "VOLUME",
      accessorKey: "volume",
    },

    {
      id: "createdDate",
      header: "CREATED date",
      accessorKey: "createdDate",
      cell: (props) => {
        const date = props.getValue();
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
      header: "UPDATED DATE",
      accessorKey: "modifiedDate",
      cell: (props) => {
        const date = props.getValue();
        return <DateCell date={date} />;
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
        const value = props.getValue();
        if (value) {
          return <Status type={value} />;
        } else {
          return null;
        }
      },
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "id",
      cell: ({ row }) => {
        const dimension = row?.original;

        return (
          <TableActionPanel
            edit={{
              url: `${PageRoutes.DIMENSIONS.EDIT}${dimension?.id}`,
              show: true,
            }}
            remove={{
              show: true,
              onClick: () => handleOpenModel("delete"),
            }}
            status={{
              status: "active",
              show: true,
              onClick: () => handleOpenModel("activeInactive"),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleOpenModel("history"),
            }}
          />
        );
      },
      enableSorting: false,
    },
  ];

  const handleOpenModel = (type: "delete" | "activeInactive" | "history") => {
    setIsModalOpen({ isOpen: true, type });
  };

  const setPaginationDataFunc = (key: string, value: string | number) => {
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

  const getDimenSionList = async (pageIndex = 1) => {
    try {
      const response = await getAllDimensions({
        args: {
          pageSize: pagination.pageSize,
          pageIndex: pageIndex || pagination.pageIndex,
          sortingOptions,
          filteringOptions,
        },
      });
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
      toast.error(getErrorMessage(error));
    }
  };

  const getDropDownForStores = async () => {
    try {
      const response = await getAllDimensionsDropDownData();
      setDimensionDropDownData(response);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
  };

  useEffect(() => {
    getDropDownForStores();
  }, []);

  const moreFilterOptions = [
    getFilterOption("Name", "id", "checkbox", dimensionDropDownData),
    getFilterOption("Store Type", "storeTypeId", "checkbox", StoreTypeFilter),
    getFilterOption("Created Date", "createdDate", "date", []),
    getFilterOption("Created By", "createdBy", "checkbox", [], true),
    getFilterOption("Updated Date", "modifiedDate", "date", []),
    getFilterOption("Updated By", "modifiedBy", "checkbox", [], true),
    getFilterOption("Status", "recStatus", "radio", []),
  ];

  return (
    <>
      <ListPageHeader
        name={"Add Product Dimension"}
        moduleName={"Product Dimension"}
        navigateUrl={PageRoutes.DIMENSIONS.CREATE}
      />

      <ReactTable
        COLUMNS={columns}
        DATA={data}
        showEditColumns
        showFilter
        checkboxSelection
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={getDimenSionList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        setGlobalFilter={setGlobalFilter}
        moreFilterOption={moreFilterOptions}
        totalCount={pagination.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        selectedRows={selectedRows}
        globalFilter={globalFilter}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />

      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleClose}
        onDelete={() => {}}
      />

      <StatusChangeModel
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleClose}
        onConfirm={() => {}}
        currentRowData={{ recStatus: "inactive", recordName: "Dimension" }}
        title="Change Status"
        message="Do you want to Inactive this Dimension?"
      />

      <ViewHistoryModal
        onClose={handleClose}
        isOpen={isModalOpen.isOpen && isModalOpen.type === "history"}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName="Dimension"
      />
    </>
  );
};

export default List;
