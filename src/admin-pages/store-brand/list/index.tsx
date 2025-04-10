"use client";
import React, { useState } from "react";
import TableActionPanel from "@/components/common/TableActionPanel";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import ReactTable from "@/components/Table/ReactTable";
import { IFilterOption, ITableColumn } from "@/components/Table/types";
import { paginationDetails, STATUS_VALUES } from "@/utils/constants";
import storeBrandData from "@/mock-data/storeBrandData.json";
import { IStoreBrand } from "@/types/store-brand/storeBrand.type";
import DeleteModal from "@/components/Modal/DeleteModal";
import StatusModal from "@/components/Modal/StatusModal";
import ViewHistoryModal from "@/components/Modal/ViewHistoryModal";
import { DUMMY_VIEW_HISTORY_DATA } from "@/utils/Dummy";
import Link from "next/link";
import DateCell from "@/components/common/DateCell";
import { getFilterOption } from "@/utils/helpers";
import { PageRoutes } from "@/admin-pages/routes";

/**
 * StoreBrandListPage component displays a list of store brands with various functionalities.
 *
 * Props:
 * - storeType: The type of store (string).
 * - storeName: The name of the store (string).
 */
const StoreBrandListPage = ({
  storeType,
  storeName,
}: {
  storeType: string;
  storeName: string;
}) => {
  // State hooks for managing filtering options, selected rows, pagination, etc.
  const [filteringOptions, setColumnFilteringOptions] = useState<
    IFilterOption[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<IStoreBrand[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ ...paginationDetails });
  const [selectedBrand, setSelectedBrand] = useState<IStoreBrand | any>(null);
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean; // Modal open state
    type: "delete" | "activeInactive" | "viewHistory" | null; // Type of modal
  }>({ isOpen: false, type: null });

  /**
   * Updates pagination data based on the key and value provided.
   *
   * @param key - The pagination key to update.
   * @param value - The new value for the pagination key.
   */
  const setPaginationDataFunc = (
    key: keyof typeof paginationDetails,
    value: number
  ) => {
    setPagination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Modal handling functions
  /**
   * Opens the specified modal with the selected brand.
   *
   * @param type - The type of modal to open.
   * @param brand - The brand to be selected.
   */
  const handleModalOpen = (
    type: "delete" | "activeInactive" | "viewHistory",
    brand: IStoreBrand
  ) => {
    setSelectedBrand(brand);
    setIsModalOpen({ isOpen: true, type });
  };

  /**
   * Closes the currently open modal and resets the selected brand.
   */
  const handleModalClose = () => {
    setIsModalOpen({ isOpen: false, type: null });
    setSelectedBrand(null);
  };

  // Column definitions for the ReactTable
  const columns: ITableColumn<IStoreBrand>[] = [
    {
      id: "image",
      header: "Image",
      accessorKey: "brandLogoUrl",
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="w-16 h-16">
            <Link
              href={`${PageRoutes.BRAND_MASTER.EDIT(storeType, storeName)}${row.original.id}`}
            >
              <Image
                src={row.original.brandLogoUrl}
                alt={`${row.original.brandLogoUrl}'s avatar`}
                height={10}
                width={10}
                aspectRatio="landscape"
                objectFit="contain"
                rounded="sm"
                variant="next"
              />
            </Link>
          </div>
        );
      },
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "brandName",
      cell: ({ row }) => {
        return (
          <Link
            href={`${PageRoutes.BRAND_MASTER.EDIT(storeType, storeName)}${row.original.id}`}
          >
            {row.original.brandName}
          </Link>
        );
      },
    },
    {
      id: "productCount",
      header: "# of Products",
      accessorKey: "productCount",
    },
    {
      id: "activeProductCount",
      header: "Active Products",
      accessorKey: "activeProductCount",
    },
    {
      id: "vendorName",
      header: "Vendors",
      accessorKey: "vendorName",
      enableSorting: false,
    },
    {
      id: "createdDate",
      header: "Create date",
      accessorKey: "createdDate",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
    {
      id: "createdBy",
      header: "Created By",
      accessorKey: "createdBy",
    },
    {
      id: "updatedDate",
      header: "UPDATED date",
      accessorKey: "modifiedDate",
      cell: ({ getValue }) => <DateCell date={getValue()} />,
    },
    {
      id: "updatedBy",
      header: "Updated By",
      accessorKey: "modifiedName",
    },

    {
      id: "recStatus",
      accessorKey: "recStatus",
      header: "Status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const value = getValue();
        return value !== undefined ? <Status type={value} /> : "";
      },
    },

    {
      id: "action",
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const brand = row.original;
        return (
          <TableActionPanel
            edit={{
              show: true,
              url: `${PageRoutes.BRAND_MASTER.EDIT(storeType, storeName)}${brand.id}`,
            }}
            remove={{
              show: true,
              onClick: () => handleModalOpen("delete", brand),
            }}
            status={{
              show: true,
              status: brand?.recStatus === "A" ? "active" : "inactive",
              onClick: () => handleModalOpen("activeInactive", brand),
            }}
            viewHistory={{
              show: true,
              onClick: () => handleModalOpen("viewHistory", brand),
            }}
          />
        );
      },
    },
  ];

  // More filter options for the table
  const moreFilterOptions = [
    getFilterOption(
      "Name",
      "brandName",
      "checkbox",
      storeBrandData.nameOptions,
      true
    ),
    getFilterOption(
      "Vendor",
      "vendorName",
      "checkbox",
      storeBrandData.venderOptions,
      false
    ),
    getFilterOption("Created Date", "createdDate", "date", [], false),
    getFilterOption("Updated Date", "modifiedDate", "date", [], false),
    getFilterOption("Status", "recStatus", "radio", STATUS_VALUES, true),
  ];

  /**
   * Fetches the store list data based on the current page index.
   *
   * @param pageIndex - The current page index (default is 1).
   * @returns Promise<void>
   */
  const getStoreList = async (pageIndex = 1) => {
    return;
  };

  return (
    <>
      <ListPageHeader moduleName={`Brand Master - ${storeName} `} />
      <ReactTable
        COLUMNS={columns}
        DATA={storeBrandData.dummyData}
        checkboxSelection
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setTablePageSize={(value) => {
          setPaginationDataFunc("pageSize", value);
        }}
        fetchData={getStoreList}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        setGlobalFilter={setGlobalFilter}
        selectedRows={selectedRows}
        globalFilter={globalFilter}
        totalCount={storeBrandData.dummyData.length}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
        moreFilterOption={moreFilterOptions}
      />

      <DeleteModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "delete"}
        onClose={handleModalClose}
        title="Delete"
        itemName="Brand"
        onDelete={() => {}}
      />

      <StatusModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "activeInactive"}
        onClose={handleModalClose}
        onConfirm={() => {}}
        currentRowData={selectedBrand}
        title="Change Status"
        message="Do you want to change the status of this brand?"
      />

      <ViewHistoryModal
        isOpen={isModalOpen.isOpen && isModalOpen.type === "viewHistory"}
        onClose={handleModalClose}
        historyData={DUMMY_VIEW_HISTORY_DATA}
        recordName={selectedBrand?.brandName || ""}
      />
    </>
  );
};

export default StoreBrandListPage;
