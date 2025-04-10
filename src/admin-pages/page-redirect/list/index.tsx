"use client";
import { useCallback, useMemo, useState } from "react";

import { PageRoutes } from "@/admin-pages/routes";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Dropdown from "@/components/DropDown/DropDown";
import DeleteModal from "@/components/Modal/DeleteModal";
import ReactTable from "@/components/Table/ReactTable";
import { IReactTableProps, ITableColumn } from "@/components/Table/types";
import PageRedirect from "@/mock-data/pageRedirect.json";
import {
  IPageRedirect,
  TPageRedirectModalType,
} from "@/types/page-redirect/pageRedirect.type";
import { getErrorMessage } from "@/utils/common.util";
import { paginationDetails } from "@/utils/constants";
import { getFormatDate } from "@/utils/date.util";
import { storeOptions } from "@/utils/Dummy";
import { ColumnFiltersState } from "@tanstack/react-table";
import { toast } from "react-toastify";

import { pageRedirectOptions } from "@/utils/Dummy";

/**
 * PageRedirectListPage Component
 * @component
 * @description Handles the listing of page redirects
 * @returns {React.ReactElement} Rendered form component
 */

const PageRedirectListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: TPageRedirectModalType;
  }>({ isOpen: false, type: null });
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [pageRedirectList, setPageRedirectList] = useState<IPageRedirect[]>([]);

  const [sortingOptions, setSortingOptions] = useState<
    IReactTableProps["sortingOptions"]
  >([]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
    totalCount: 15,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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
    type: TPageRedirectModalType,
    pageRedirect: IPageRedirect
  ) => {
    setIsModalOpen({ isOpen: true, type });
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "name",
        name: "Name",
        type: "checkbox",
        options: pageRedirectOptions,
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
        options: PageRedirect.userNameOptions,
        conditionalSearch: true,
      },
    ],
    [pageRedirectOptions, PageRedirect.userNameOptions]
  );

  const COLUMNS: ITableColumn<IPageRedirect>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Brand Name",
      cell: (props: any) => (
        <div className="whitespace-pre">{props.getValue()}</div>
      ),
    },
    { id: "oldUrl", accessorKey: "oldUrl", header: "Old URL" },
    { id: "newUrl", accessorKey: "newUrl", header: "New URL" },
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
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const pageRedirect = row.original;
        return (
          <TableActionPanel
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", pageRedirect),
            }}
            edit={{
              show: true,
              url: `${PageRoutes.PAGE_REDIRECT.EDIT}${pageRedirect.id}`,
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
        setPageRedirectList(PageRedirect.pageRedirects);
        toast.success("Successfully fetched page redirect list");
      } catch (error) {
        getErrorMessage(error, "Failed to fetch page redirect list");
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
    setIsModalOpen({ isOpen: false, type: null });
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
      <ListPageHeader
        name={"Add Page Redirect"}
        moduleName={"Page Redirect"}
        navigateUrl={PageRoutes.PAGE_REDIRECT.CREATE}
      >
        <div className="flex gap-2">
          <Dropdown
            options={storeOptions}
            name="storeId"
            id="storeId"
            defaultValue={storeOptions[0].value}
          />
        </div>
      </ListPageHeader>

      <ReactTable
        DATA={pageRedirectList}
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
        showMoreFilters={false}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
        loading={isLoading}
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
    </>
  );
};

export default PageRedirectListPage;
