"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import ReactTable from "@/components/Table/ReactTable";
import Modal from "@/components/Modal/Modal";
import Status from "@/components/DisplayStatus/Status";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import TableActionPanel from "@/components/common/TableActionPanel";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusChangeModel from "@/components/Modal/StatusModal";

import { paginationDetails } from "@/utils/constants";
import { PageRoutes } from "@/admin-pages/routes";
import { getFormatDate } from "@/utils/date.util";

import { deleteVendor, getVendorList } from "@/services/vendor/vendor.service";

import vendorMockData from "@/mock-data/Vendor.json";

import { ITableColumn } from "@/components/Table/types";
import {
  IVendorFormValues,
  IVendorItem,
  IVendorModalType,
  IVendorStatus,
  IViewHistory,
} from "@/types/vendor/vendor.type";
import { getErrorMessage } from "@/utils/common.util";

// Move these to the top of the file
const DEFAULT_SORTING = [
  {
    field: "vendorName",
    direction: 0,
    priority: 0,
  },
];

const VendorListPage = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [vendorList, setVendorList] = useState<IVendorItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: IVendorModalType | null;
  }>({ isOpen: false, type: null });

  const [selectedVendor, setSelectedVendor] =
    useState<IVendorFormValues | null>(null);

  // Add loading states for better UX
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sortingOptions, setSortingOptions] = useState(DEFAULT_SORTING);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [filteringOptions, setColumnFilteringOptions] = useState<any[]>([]);

  const setPaginationDataFunc = (key: string, value: any) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const moreFilterOption = useMemo(
    () => [
      {
        columnName: "vendorName",
        name: "Name",
        type: "checkbox",
        options: vendorMockData.vendorNameOptions,
      },
      {
        columnName: "createddate",
        name: "Created Date",
        type: "date",
        options: null,
        filterFn: "customDateFilter",
      },
      {
        columnName: "modifieddate",
        name: "Updated Date",
        type: "date",
        options: null,
        filterFn: "customDateFilter",
      },
      {
        columnName: "createdby",
        name: "Created By",
        type: "checkbox",
        options: vendorMockData.userNameOptions,
        conditionalSearch: true,
      },
      {
        columnName: "modifiedby",
        name: "Updated By",
        type: "checkbox",
        options: vendorMockData.userNameOptions,
        conditionalSearch: true,
      },
      {
        columnName: "vendorStatus",
        name: "Status",
        type: "radio",
        options: vendorMockData.vendorStatusOptions,
      },
    ],
    [vendorMockData.vendorNameOptions, vendorMockData.userNameOptions]
  );

  const VENDOR_TABLE_COLUMNS: ITableColumn<IVendorItem>[] = useMemo(
    () => [
      {
        id: "vendorName",
        accessorKey: "vendorName",
        header: "Name",
        cell: ({ row, getValue }) => (
          <Link href={`${PageRoutes.VENDOR.EDIT}${row.original.id}`}>
            {getValue()}
          </Link>
        ),
      },
      { id: "vendorBCID", accessorKey: "vendorBCID", header: "BC Vendor ID" },
      {
        id: "createddate",
        accessorKey: "createddate",
        header: "Created Date",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const createdDate = row.original.createddate;
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
      { id: "createdby", accessorKey: "createdby", header: "Created By" },
      {
        id: "modifieddate",
        accessorKey: "modifieddate",
        header: "Updated Date",
        filterFn: "customDateFilter",
        cell: ({ row }) => {
          const modifiedDate = row.original.modifieddate;
          if (!modifiedDate) return null;

          const { date, time } = getFormatDate(modifiedDate);
          return (
            <>
              <div>{date}</div>
              <div className="text-xs font-normal">{time}</div>
            </>
          );
        },
      },
      { id: "modifiedby", accessorKey: "modifiedby", header: "Updated By" },
      {
        id: "vendorStatus",
        accessorKey: "vendorStatus",
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
          const vendor = props.row.original;
          return (
            <TableActionPanel
              edit={{
                show: true,
                url: `${PageRoutes.VENDOR.EDIT}${vendor.id}`,
              }}
              remove={{
                show: true,
                onClick: () => handleModalOpen("delete", vendor),
              }}
              status={{
                show: true,
                status: vendor.vendorStatus as IVendorStatus,
                onClick: () => handleModalOpen("activeInactive", vendor),
              }}
              viewHistory={{
                show: true,
                onClick: () => handleModalOpen("viewHistory", vendor),
              }}
            />
          );
        },
      },
    ],
    []
  );

  const setSortingOptionHandler = (column: string, direction: number) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  // Memoize handlers that don't need frequent updates
  const handleModalOpen = useCallback(
    (
      type: "delete" | "activeInactive" | "viewHistory",
      vendor: IVendorFormValues
    ) => {
      setSelectedVendor(vendor);
      setIsModalOpen({ isOpen: true, type });
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedVendor(null);
  }, []);

  const fetchVendorList = useCallback(
    async (pageIndex = 1): Promise<void> => {
      setIsLoading(true);
      try {
        // Use the provided pageIndex or fall back to current pagination pageIndex
        // const effectivePageIndex = pageIndex || paginationData.pageIndex;
        // const response = await getVendorList({
        //   args: {
        //     pageSize: paginationData.pageSize,
        //     pageIndex: effectivePageIndex,
        //     sortingOptions,
        //     filteringOptions,
        //   },
        // });
        // // Destructure response for cleaner code
        // const {
        //   items,
        //   pageIndex: responsePageIndex,
        //   pageSize,
        //   totalCount,
        //   totalPages,
        //   hasPreviousPage,
        //   hasNextPage,
        // } = response;
        // setVendorList(items);
        // // Update pagination in one call with destructured values
        // setPaginationData((prevState) => ({
        //   ...prevState,
        //   pageIndex: responsePageIndex,
        //   pageSize,
        //   totalCount,
        //   totalPages,
        //   hasPreviousPage,
        //   hasNextPage,
        // }));

        setVendorList(vendorMockData.vendorList);
        setPaginationData(vendorMockData.vendorPagination);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      paginationData.pageIndex,
      sortingOptions,
    ]
  );

  const handleDelete = async (): Promise<void> => {
    // Don't proceed if no vendor selected
    if (!selectedVendor?.id) {
      toast.error("No vendor selected for deletion");
      return;
    }

    setIsLoading(true);
    try {
      await deleteVendor(selectedVendor.id);
      toast.success("Vendor deleted successfully");
      handleModalClose();
      // Refresh the list to show updated data
      await fetchVendorList();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async () => {
    // Don't proceed if no vendor selected
    if (!selectedVendor?.id) {
      toast.error("No vendor selected for status change");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement API call to update vendor status
      // For now just show success message
      toast.success("Vendor status updated successfully");
      handleModalClose();
      // Refresh the list to show updated data
      await fetchVendorList();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ListPageHeader
        name={"Add Vendor"}
        moduleName={"Vendor Master"}
        navigateUrl={PageRoutes.VENDOR.CREATE}
      />

      <ReactTable
        DATA={vendorList}
        COLUMNS={VENDOR_TABLE_COLUMNS}
        fetchData={fetchVendorList}
        sortingOptions={sortingOptions}
        setSortingOptionHandler={setSortingOptionHandler}
        pageIndex={paginationData.pageIndex}
        pageSize={paginationData.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        checkboxSelection={true}
        showEditColumns
        showFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        totalCount={paginationData.totalCount}
        hasPreviousPage={paginationData.hasPreviousPage}
        hasNextPage={paginationData.hasNextPage}
        moreFilterOption={moreFilterOption}
        loading={isLoading}
      />

      {/* Delete Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "delete" && (
        <DeleteModal
          isOpen={isModalOpen.isOpen}
          onClose={handleModalClose}
          title="Delete Vendor"
          itemName="Vendor"
          onDelete={handleDelete}
        />
      )}

      {/* Active/Inactive Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "activeInactive" && (
        <StatusChangeModel
          isOpen={true} // No need to check isOpen again since we already check in condition
          onClose={handleModalClose}
          onConfirm={handleStatusChange}
          currentRowData={{
            recStatus:
              selectedVendor?.vendorStatus === "A" ? "active" : "inactive",
            quantityName: "vendor",
            recordName: "vendor",
          }}
          title={`${selectedVendor?.vendorStatus === "A" ? "Inactive" : "Active"} Status`}
          message={`Are you sure you want to ${selectedVendor?.vendorStatus === "A" ? "inactive" : "active"} this vendor?`}
        />
      )}

      {/* View History Modal */}
      {isModalOpen.isOpen && isModalOpen.type === "viewHistory" && (
        <Modal
          isOpen={true}
          onClose={handleModalClose}
          header={<div className="text-sm font-semibold">View History</div>}
          content={
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-quaternary-dark dark:text-quaternary-light">
                <thead className="bg-white font-bold uppercase text-quaternary-dark dark:text-quaternary-light border-b border-gray-light dark:border-gray-dark">
                  <tr>
                    {[
                      "Updated By",
                      "Updated Date",
                      "Property",
                      "Old Value",
                      "New Value",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {vendorMockData.viewHistory.map((item: IViewHistory) => (
                    <tr className="hover:bg-slate-50" key={item.id}>
                      <td className="px-4 py-3">{item.updatedBy}</td>
                      <td className="px-4 py-3">{item.updatedDate}</td>
                      <td className="px-4 py-3">{item.property}</td>
                      <td className="px-4 py-3">{item.oldValue}</td>
                      <td className="px-4 py-3">{item.newValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
      )}
    </div>
  );
};

export default VendorListPage;
