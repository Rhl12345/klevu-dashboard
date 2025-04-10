/**
 * @file index.tsx
 * @description List component for displaying and managing discount tables.
 * Implements a data table with filtering, sorting, and CRUD operations.
 *
 * @component DiscountTableListing
 * @requires React
 * @requires ReactTable - Table component
 * @requires DeleteModal - Delete confirmation
 * @requires StatusChangeModal - Status management
 * @requires Clone - Cloning functionality
 *
 * Features:
 * - Paginated table display
 * - Sorting and filtering
 * - Status management
 * - Clone functionality
 * - View history
 * - Bulk selection
 *
 * @typedef {Object} IDiscountTableList
 * @property {number} pageIndex - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} totalCount - Total items count
 * @property {IDiscountTable[]} items - Table data
 */

"use client";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getFormatDate } from "@/utils/date.util";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import TableActionPanel from "@/components/common/TableActionPanel";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import Status from "@/components/DisplayStatus/Status";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModal from "@/components/Modal/StatusModal";
import { getErrorMessage } from "@/utils/common.util";
import { PageRoutes } from "@/admin-pages/routes";
import Clone from "../components/Clone";
import {
  IDiscountTable,
  IDiscountTableList,
  ISortingOption,
  IFilterOption,
  CloneData,
} from "@/types/discount-table/discountTable.type";
import {
  getDiscountTableList,
  deleteDiscountTable,
  updateDiscountTableStatus,
} from "@/services/discount-table/discountTable.service";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import Loading from "@/app/loading";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";

const INITIAL_SORTING_OPTIONS: ISortingOption[] = [
  { field: "quantityName", direction: 0, priority: 0 },
];

const DiscountTableListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<IDiscountTable[]>([]);
  const [sortingOptions, setSortingOptions] = useState<ISortingOption[]>(
    INITIAL_SORTING_OPTIONS
  );
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: "delete" | "activeInactive" | "viewHistory" | "clone" | null;
  }>({
    isOpen: false,
    type: null,
  });
  const [selectedDiscountTable, setSelectedDiscountTable] =
    useState<IDiscountTable | null>(null);

  const [discountTableData, setDiscountTableData] =
    useState<IDiscountTableList>({
      pageIndex: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      totalCount: 0,
      items: [],
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    });

  const fetchDiscountTableData = useCallback(
    async (pageIndex?: number) => {
      setIsLoading(true);
      try {
        const data = await getDiscountTableList({
          pageIndex: pageIndex || discountTableData.pageIndex,
          pageSize: discountTableData.pageSize,
          sortingOptions,
          filteringOptions,
        });
        setDiscountTableData(data);
      } catch (error) {
        toast.error(getErrorMessage(error, "Error fetching discount tables"));
      } finally {
        setIsLoading(false);
      }
    },
    [
      sortingOptions,
      filteringOptions,
      discountTableData.pageSize,
      discountTableData.pageIndex,
    ]
  );

  const handleDelete = async () => {
    if (!selectedDiscountTable) return;
    setIsLoading(true);
    try {
      await deleteDiscountTable(selectedDiscountTable.id);
      toast.success("Discount table deleted successfully");
      handleModalClose();
      fetchDiscountTableData();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete discount table"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedDiscountTable) return;
    setIsLoading(true);
    try {
      await updateDiscountTableStatus(
        selectedDiscountTable.id,
        selectedDiscountTable.recStatus === "A" ? "I" : "A"
      );
      toast.success("Status updated successfully");
      handleModalClose();
      fetchDiscountTableData();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update status"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory" | "clone",
    discountTable: IDiscountTable
  ) => {
    setSelectedDiscountTable(discountTable);
    setIsModalOpen({ isOpen: true, type });
  };

  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedDiscountTable(null);
  };

  const COLUMNS: ITableColumn<IDiscountTable>[] = [
    {
      id: "quantityName",
      header: "Quantity Name",
      accessorKey: "quantityName",
      cell: ({ getValue, row }: CellContext<IDiscountTable, string>) => (
        <Link
          href={`${PageRoutes.DISCOUNT_TABLES.EDIT}${row?.original?.id}`}
          className="font-medium"
        >
          {getValue()}
        </Link>
      ),
    },
    {
      id: "storeName",
      header: "Store Name",
      accessorKey: "storeName",
      cell: ({ getValue }: CellContext<IDiscountTable, string>) => (
        <div className="whitespace-pre">{getValue()}</div>
      ),
    },
    {
      id: "brandName",
      header: "Brand Name",
      accessorKey: "brandName",
      cell: ({ getValue }: CellContext<IDiscountTable, string>) => (
        <div>{getValue()}</div>
      ),
    },
    {
      id: "vendorName",
      header: "Vendor Name",
      accessorKey: "vendorName",
      cell: ({ getValue }: CellContext<IDiscountTable, string>) => (
        <div>{getValue()}</div>
      ),
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
      cell: ({ getValue }: CellContext<IDiscountTable, string>) => (
        <div>
          {getValue() ? (
            <>
              <div>{getFormatDate(getValue()).date}</div>
              <div className=" text-xs font-normal">
                {getFormatDate(getValue()).time}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      id: "createdName",
      header: "Created By",
      accessorKey: "createdName",
      cell: ({ getValue }: CellContext<IDiscountTable, string>) => (
        <div>{getValue() || "-"}</div>
      ),
    },
    {
      id: "modifiedDate",
      header: "Modified Date",
      accessorKey: "modifiedDate",
      cell: ({ getValue }: CellContext<IDiscountTable, string | null>) => (
        <div>
          {getValue() ? (
            <>
              <div>{getFormatDate(getValue()).date}</div>
              <div className=" text-xs font-normal">
                {getFormatDate(getValue()).time}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      id: "modifiedName",
      header: "Modified By",
      accessorKey: "modifiedName",
      cell: ({ getValue }: CellContext<IDiscountTable, string | null>) => (
        <div>{getValue() || "-"}</div>
      ),
    },
    {
      id: "default",
      header: "Default",
      accessorKey: "default",
      cell: ({ getValue }: CellContext<IDiscountTable, boolean>) => (
        <div>
          {getValue() ? (
            <SvgIcon
              name="SuccessCheckmark"
              className="w-6 h-6 text-green-500"
            />
          ) : (
            <SvgIcon name="CrossIcon" className="w-6 h-6 text-red-500" />
          )}
        </div>
      ),
    },
    {
      id: "recStatus",
      header: "Status",
      accessorKey: "recStatus",
      cell: ({
        getValue,
      }: CellContext<IDiscountTable, "active" | "inactive">) => (
        <Status type={getValue()} />
      ),
    },
    {
      id: "action",
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: CellContext<IDiscountTable, any>) => {
        const discountTable = row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.DISCOUNT_TABLES.EDIT}${discountTable.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", discountTable),
            }}
            status={{
              show: true,
              status: discountTable.recStatus === "A" ? "active" : "inactive",
              onClick: () => handleModalOpen("activeInactive", discountTable),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleModalOpen("viewHistory", discountTable),
            }}
            clone={{
              show: true,
              onClick: () => handleModalOpen("clone", discountTable),
            }}
          />
        );
      },
    },
  ];

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "quantityName",
        name: "Quantity Name",
        type: "checkbox",
        options: Array.from(
          new Set(
            discountTableData?.items?.map((item: IDiscountTable) => ({
              value: item.id.toString(),
              label: item.quantityName,
            })) || []
          )
        ),
      },
      {
        columnName: "createdDate",
        name: "Created Date",
        type: "date",
        options: null,
      },
      // {
      //   columnName: "recStatus",
      //   name: "Status",
      //   type: "radio",
      //   options: STATUS_VALUES,
      // },
    ],
    [discountTableData]
  );

  return (
    <div>
      {isLoading && <Loading />}
      <ListPageHeader
        name="Add Discount Tables"
        moduleName="Discount Tables"
        navigateUrl={PageRoutes.DISCOUNT_TABLES.CREATE}
      />

      <ReactTable
        COLUMNS={COLUMNS}
        DATA={discountTableData.items}
        fetchData={fetchDiscountTableData}
        hasNextPage={discountTableData.hasNextPage}
        hasPreviousPage={discountTableData.hasPreviousPage}
        pageIndex={discountTableData.pageIndex}
        pageSize={discountTableData.pageSize}
        checkboxSelection
        setTablePageSize={(size) =>
          setDiscountTableData({ ...discountTableData, pageSize: size })
        }
        totalCount={discountTableData.totalCount}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={(column, direction) =>
          setSortingOptions([
            { field: column, direction: direction, priority: 0 },
          ])
        }
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        setColumnFilteringOptions={setColumnFilteringOptions}
        filteringOptions={filteringOptions}
        moreFilterOption={moreFilterOption}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Discount Table"
        onDelete={handleDelete}
      />

      {/* Active/Inactive Modal */}
      <StatusChangeModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={handleStatusChange}
        currentRowData={{
          recStatus:
            selectedDiscountTable?.recStatus === "A" ? "active" : "inactive",
          recordName: "discount table",
        }}
        title="Change Status"
        message="Do you want to change the status of this discount table?"
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName={selectedDiscountTable?.quantityName || ""}
      />

      {/* Clone Modal */}
      <Clone
        openCloneModal={isModalOpen.isOpen && isModalOpen.type === "clone"}
        setOpenCloneModal={() => handleModalClose()}
        cloneData={selectedDiscountTable as CloneData}
        fetchListData={fetchDiscountTableData}
      />
    </div>
  );
};

export default DiscountTableListing;
