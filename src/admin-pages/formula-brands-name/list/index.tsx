"use client";
import Link from "next/link";
import { useCallback, useState } from "react";

import { PageRoutes } from "@/admin-pages/routes";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";
import ReactTable from "@/components/Table/ReactTable";
import { IReactTableProps, ITableColumn } from "@/components/Table/types";
import TableActionPanel from "@/components/common/TableActionPanel";
import FormulaBrandName from "@/mock-data/formulaBrandname.json";
import {
  IFormulaBrandName,
  TFormulaBrandNameModalType,
  TFormulaBrandNameStatus,
} from "@/types/formula-brand-names/formulaBrandName.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { ColumnFiltersState } from "@tanstack/react-table";
import { toast } from "react-toastify";

import { storeOptions } from "@/utils/Dummy";

const FormulaBrandsNameListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: TFormulaBrandNameModalType;
  }>({ isOpen: false, type: null });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedFormulaBrandName, setSelectedFormulaBrandName] =
    useState<IFormulaBrandName | null>(null);
  const [formulaBrandNameList, setFormulaBrandNameList] = useState<any[]>([]);

  const [sortingOptions, setSortingOptions] = useState<
    IReactTableProps["sortingOptions"]
  >([]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 50,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Modal handling functions
  const handleModalOpen = (
    type: TFormulaBrandNameModalType,
    vendor: IFormulaBrandName
  ) => {
    setSelectedFormulaBrandName(vendor);
    setIsModalOpen({ isOpen: true, type: type as TFormulaBrandNameModalType });
  };

  const MORE_FILTER_OPTION = [
    {
      columnName: "name",
      name: "Name",
      type: "checkbox",
      options: storeOptions,
    },
    {
      columnName: "storeName",
      name: "Store Name",
      type: "radio",
      options: storeOptions,
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
      options: FormulaBrandName.userNameOptions,
      conditionalSearch: true,
    },
    {
      columnName: "modifiedby",
      name: "Updated By",
      type: "checkbox",
      options: FormulaBrandName.userNameOptions,
      conditionalSearch: true,
    },
  ];

  const COLUMNS: ITableColumn<IFormulaBrandName>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Brand Name",
      cell: ({ row }) => (
        <>
          <Link
            href={`${PageRoutes.BRAND_NAME_FORMULA.EDIT}${row.original.id}`}
          >
            <div className="whitespace-pre">{row.original.name}</div>
          </Link>
        </>
      ),
    },
    { id: "storeName", accessorKey: "storeName", header: "Store Name" },
    { id: "splitName", accessorKey: "splitName", header: "Split Name" },
    {
      id: "brandReplace",
      accessorKey: "brandReplace",
      header: "Brand Replace",
    },
    {
      id: "replaceCharacter",
      accessorKey: "replaceCharacter",
      header: "Replace Character",
    },
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
            <div>{date} </div>
            <div className="text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    { id: "createdBy", accessorKey: "createdBy", header: "Created By" },
    {
      id: "modifiedDate",
      accessorKey: "modifiedDate",
      header: "Updated Date",
      filterFn: "customDateFilter",
      cell: ({ row }) => {
        const modifiedDate = row.original.modifiedDate;
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

    { id: "modifiedBy", accessorKey: "modifiedBy", header: "Updated By" },
    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
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
        const formulaBrandName = row.original as IFormulaBrandName;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.BRAND_NAME_FORMULA.EDIT}${formulaBrandName.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", formulaBrandName),
            }}
            status={{
              show: true,
              status: formulaBrandName.recStatus as TFormulaBrandNameStatus,
              onClick: () => handleModalOpen("status", formulaBrandName),
            }}
            // viewHistory={{
            //   show: true,
            //   onClick: () => handleModalOpen("viewHistory", formulaBrandName),
            // }}
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

  const fetchFormulaBrandNameList = useCallback(
    async (pageIndex = 1) => {
      try {
        setFormulaBrandNameList(FormulaBrandName.formulaBrandNames);
        toast.success("Brand name formula list fetched successfully");
      } catch (error) {
        getErrorMessage(error, "Failed to fetch brand name formula list");
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
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedFormulaBrandName(null);
  };

  const handleDelete = async () => {};

  return (
    <>
      <ListPageHeader
        name={"Add Brand Name Formula"}
        moduleName={"Brand Name Formula"}
        navigateUrl={PageRoutes.BRAND_NAME_FORMULA.CREATE}
      />

      <ReactTable
        DATA={formulaBrandNameList}
        COLUMNS={COLUMNS}
        fetchData={fetchFormulaBrandNameList}
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
        checkboxSelection
        showEditColumns
        showFilter
        showMoreFilters
        showFilterDirection="left"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={MORE_FILTER_OPTION}
      />

      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Vendor"
          onDelete={handleDelete}
        />
      )}

      {isModalOpen.isOpen && isModalOpen.type === "status" && (
        <StatusChangeModel
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{
            recStatus: "inactive",
            quantityName: "brand name formula",
            recordName: "brand name formula",
          }}
          title="Change Status"
          message="Do you want to change the status of this brand name formula ?"
        />
      )}
    </>
  );
};

export default FormulaBrandsNameListPage;
