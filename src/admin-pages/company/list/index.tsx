"use client";
import React, { useCallback, useState, useMemo } from "react";
import Link from "next/link";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import ReactTable from "@/components/Table/ReactTable";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import Button from "@/components/Button/Button";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";

import { PageRoutes } from "@/admin-pages/routes";
import { ITableColumn } from "@/components/Table/types";
import { getFormatDate } from "@/utils/date.util";
import { ICompany, ModalState } from "@/types/company/company.type";
import { paginationDetails } from "@/utils/constants";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import { dropdownOptions, companyData } from "@/mock-data/company.json";

const MORE_FILTER_OPTIONS = [
  {
    name: "Customer BC ID",
    options: [],
    columnName: "navCustomerId",
    type: "checkbox",
    conditionalSearch: true,
  },
  {
    name: "Customer E-Mail",
    columnName: "email",
    type: "select",
    options: [],
    conditionalSearch: true,
  },
  {
    name: "Last Active Date",
    columnName: "lastactive",
    options: [],
    type: "date",
  },
  {
    name: "Created Date",
    columnName: "createddate",
    options: [],
    type: "date",
  },
  {
    name: "Updated Date",
    columnName: "modifiedDate",
    options: [],
    type: "date",
  },
  {
    name: "Status",
    columnName: "recStatus",
    options: [],
    type: "select",
    conditionalSearch: true,
  },
];

/**
 * CompanyListPage Component
 *
 * Displays a list of companies with filtering, sorting, and CRUD operations.
 * Includes features for:
 * - Company listing with pagination
 * - Filtering and sorting
 * - Status management
 * - Delete operations
 */
const CompanyListPage = () => {
  const [data, setData] = useState<ICompany[]>(companyData as ICompany[]);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    selectedCompany: null,
  });
  const [filteringOptions, setColumnFilteringOptions] =
    useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "orderStatus",
      direction: 0,
      priority: 0,
    },
    {
      field: "order",
      direction: 0,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 1,
  });

  const router = useRouter();

  const setSortingOptionHandler = useCallback(
    (column: string, direction: number) => {
      setSortingOptions([
        {
          field: column,
          direction: direction,
          priority: 0,
        },
      ]);
    },
    []
  );
  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null, selectedCompany: null });
  };

  const handleModalOpen = useCallback(
    (type: "delete" | "activeInactive" | "viewHistory", company: ICompany) => {
      setModalState({ isOpen: true, type, selectedCompany: company });
    },
    []
  );

  const handleDelete = async () => {
    try {
      // Delete operation
      handleModalClose();
      // Show success toast
    } catch (error) {
      // Show error toast
    }
  };

  const COLUMNS = useMemo<ITableColumn<ICompany>[]>(
    () => [
      {
        id: "companyName",
        accessorKey: "companyName",
        header: "Company Name",
        cell: (props) => (
          <>
            <Link href={`${PageRoutes.COMPANY.EDIT}${props.row.original.id}`}>
              <div className="whitespace-pre">{props.getValue()}</div>
            </Link>
          </>
        ),
      },
      {
        id: "revenue",
        accessorKey: "revenue",
        header: "Revenue($)",
      },
      {
        id: "orders",
        accessorKey: "orders",
        header: "Orders ",
      },
      {
        id: "lastActive",
        accessorKey: "lastActive",
        header: "Last Active ",
        cell: ({ row }) => {
          return row?.original?.lastActive ? (
            <>
              <div>{getFormatDate(row?.original?.lastActive).date}</div>
              <div className="text-xs ">
                {getFormatDate(row?.original?.lastActive).time}
              </div>
            </>
          ) : (
            ""
          );
        },
      },

      {
        id: "recStatus",
        accessorKey: "recStatus",
        header: "Status",
        cell: (props) => {
          if (props.getValue() !== undefined) {
            return <Status type={props.getValue()} />;
          } else {
            return "";
          }
        },
      },
      {
        id: "action",
        accessorKey: "action",
        header: "Action",
        cell: (props: {
          row: {
            original: ICompany;
          };
        }) => {
          const company = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.COMPANY.EDIT}${company.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", company),
              }}
              status={{
                show: true,
                status: company.recStatus,
                onClick: () => handleModalOpen("activeInactive", company),
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
      <ListPageHeader name={"company"} moduleName={"Company"}>
        <Dropdown
          aria-label="Select a flavor"
          defaultValue="Bacardi"
          id="flavor-select"
          label=""
          className="w-60"
          options={dropdownOptions}
        />
        <Button
          size="sm"
          variant="primary"
          onClick={() => router.push("/admin/customer/company/create")}
        >
          Create Company
        </Button>
      </ListPageHeader>

      <ReactTable
        DATA={data}
        COLUMNS={COLUMNS}
        fetchData={() => {}}
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
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={MORE_FILTER_OPTIONS}
      />

      {modalState.isOpen && modalState.type === "delete" && (
        <DeleteModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          title="Delete"
          itemName="Vendor"
          onDelete={handleDelete}
        />
      )}

      {modalState.isOpen && modalState.type === "activeInactive" && (
        <StatusModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={() => {}}
          currentRowData={{ recStatus: "inactive", recordName: "company" }}
          title="Change Status"
          message="Do you want to change the status of this company?"
        />
      )}
    </>
  );
};

export default CompanyListPage;
