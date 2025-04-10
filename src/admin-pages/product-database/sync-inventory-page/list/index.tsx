"use client";
import { toast } from "react-toastify";
import { useState } from "react";

import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";
import { getFormatDate } from "@/utils/date.util";
import { PageRoutes } from "@/admin-pages/routes";
import ProductFileComponent from "@/admin-pages/product-database/sync-inventory-page/list/components/ProductFIleComponent";
import UploadFileModal from "./components/UploadFileModal";

interface ISyncInventoryItem {
  systemSKU: string;
  brand: string;
  vendor: string;
  style: string;
  color: string;
  size: string;
  vendorInventory: number;
  bufferInventory: number;
  bcInventory: number;
  inventory: number;
  log: string;
  dateTimeOfUpdate: string;
}

// Add this constant before the SyncInventoryList component
const DUMMY_SYNC_INVENTORY_DATA: ISyncInventoryItem[] = [
  {
    systemSKU: "0724L-582-MD",
    brand: "Zero Restriction",
    vendor: "Zero Restriction",
    style: "0724l",
    color: "bejeweled",
    size: "med",
    vendorInventory: 26,
    bufferInventory: 0,
    bcInventory: 0,
    inventory: 26,
    log: "Inventory returned successfully",
    dateTimeOfUpdate: "2025-02-28T01:06:24",
  },
  {
    systemSKU: "0724L-583-SM",
    brand: "Zero Restriction",
    vendor: "Zero Restriction",
    style: "0724l",
    color: "mardi gras",
    size: "sml",
    vendorInventory: 76,
    bufferInventory: 0,
    bcInventory: 0,
    inventory: 76,
    log: "Inventory returned successfully",
    dateTimeOfUpdate: "2025-02-28T01:06:24",
  },
  {
    systemSKU: "10051-2090-XL",
    brand: "Southern Tide",
    vendor: "Southern Tide",
    style: "10051",
    color: "heather navy",
    size: "xl",
    vendorInventory: 15,
    bufferInventory: 0,
    bcInventory: 0,
    inventory: 15,
    log: "Inventory returned successfully",
    dateTimeOfUpdate: "2025-02-28T01:06:24",
  },
  {
    systemSKU: "10093-1065-SM",
    brand: "Southern Tide",
    vendor: "Southern Tide",
    style: "10093",
    color: "slate grey",
    size: "s",
    vendorInventory: 0,
    bufferInventory: 0,
    bcInventory: 0,
    inventory: 0,
    log: "SKU not found.",
    dateTimeOfUpdate: "2025-02-28T01:06:24",
  },
  {
    systemSKU: "10348-2288-LG",
    brand: "Southern Tide",
    vendor: "Southern Tide",
    style: "10348",
    color: "heather ocean channel",
    size: "l",
    vendorInventory: 873,
    bufferInventory: 0,
    bcInventory: 0,
    inventory: 873,
    log: "Inventory returned successfully",
    dateTimeOfUpdate: "2025-02-28T01:06:24",
  },
];

const SyncInventoryList = ({ storeName }: { storeName: string }) => {
  const [modalType, setModalType] = useState<"download" | "upload" | null>(
    null
  );

  const SYNC_INVENTORY_COLUMNS: ITableColumn<ISyncInventoryItem>[] = [
    {
      id: "systemSKU",
      header: "SystemSKU",
      accessorKey: "systemSKU",
    },
    {
      id: "brand",
      header: "Brand",
      accessorKey: "brand",
    },
    {
      id: "vendor",
      header: "Vendor",
      accessorKey: "vendor",
    },
    {
      id: "style",
      header: "Style",
      accessorKey: "style",
    },
    {
      id: "color",
      header: "Color",
      accessorKey: "color",
    },
    {
      id: "size",
      header: "Size",
      accessorKey: "size",
    },
    {
      id: "vendorInventory",
      header: "Vendor Inventory",
      accessorKey: "vendorInventory",
    },
    {
      id: "bufferInventory",
      header: "Buffer Inventory",
      accessorKey: "bufferInventory",
    },
    {
      id: "bcInventory",
      header: "BC Inventory",
      accessorKey: "bcInventory",
    },
    {
      id: "inventory",
      header: "Inventory",
      accessorKey: "inventory",
    },
    {
      id: "log",
      header: "Log",
      accessorKey: "log",
    },
    {
      id: "dateTimeOfUpdate",
      header: "Date/Time Of Update",
      accessorKey: "dateTimeOfUpdate",
      cell: ({ row }) => {
        const { date, time } = getFormatDate(row.original.dateTimeOfUpdate);
        return (
          <div className="text-xs font-normal">
            {date} {time}
          </div>
        );
      },
    },
  ];

  const handleImport = () => {
    setModalType("download");
  };

  const handleExport = () => {
    setModalType("upload");
  };

  return (
    <>
      <ListPageHeader
        moduleName="Master Catalog"
        showBackButton={true}
        navigateUrl={`${PageRoutes.MASTER_PRODUCT_FEED.CORE_PRODUCT_FEED.LIST}`}
      />

      <div className="w-full lg:pt-8 xl:px-8 pt-8 px-4">
        <div className="w-full relative border border-gray-light dark:border-gray-dark rounded-none overflow-hidden p-4">
          <div className="flex justify-between items-center mb-4">
            <Text>{`${storeName} Bulk Export Product Inventory`}</Text>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleImport}>
                Download Product File
              </Button>
              <Button variant="primary" onClick={handleExport}>
                Upload Inventory File
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-light dark:border-gray-dark pt-4">
            <Text>
              Processed On {getFormatDate(new Date().toISOString()).date}
            </Text>
          </div>
        </div>
      </div>

      <ProductFileComponent
        isOpen={modalType === "download"}
        onClose={() => setModalType(null)}
      />

      <UploadFileModal
        isOpen={modalType === "upload"}
        onClose={() => setModalType(null)}
      />

      <ReactTable
        isListPage={true}
        COLUMNS={SYNC_INVENTORY_COLUMNS}
        DATA={DUMMY_SYNC_INVENTORY_DATA}
        totalCount={1}
        totalPages={1}
        pageIndex={1}
        pageSize={1}
        showPagination={true}
        showFilter={true}
        showEditColumns={true}
        showMoreFilters={true}
        displaySearch="left"
      />
    </>
  );
};

export default SyncInventoryList;
