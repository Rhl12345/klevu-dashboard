"use client";

// Components
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import { ITableColumn } from "@/components/Table/types";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";

// Types
import {
  IProductVariant,
  IStoreListProductVariantTableCellProps,
  IProductVariantModalProps,
} from "@/types/store-product-list/storePorductList";

// Utils
import { getFormatDate } from "@/utils/date.util";

// Mock Data
import StoreProductList from "@/mock-data/StoreProductList.json";

// Hooks
import { useState } from "react";

const IMAGE_BASE_URL = "https://storagemedia.corporategear.com";

/**
 * ProductVariantModal component displays the product variant modal
 * @param {IProductVariantModalProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */

const ProductVariantModal = ({
  isOpen,
  onClose,
  product,
}: IProductVariantModalProps) => {
  const [productVariant, setProductVariant] = useState<IProductVariant[]>(
    StoreProductList.productVariant
  );
  const PRODUCT_VARIANT_COLUMNS: ITableColumn<IProductVariant>[] = [
    {
      id: "product Image",
      header: "product Image",
      accessorKey: "productImage",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.productImage ? (
          <div className="h-14 w-14 flex items-center justify-center overflow-hidden">
            <Image
              src={`${IMAGE_BASE_URL}${props.row.original.productImage}`}
              className={"max-h-full"}
            />
          </div>
        ) : null;
      },
    },
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.name ? (
          <>
            <div className="w-[200px] flex justify-start items-center group">
              <div>{props.row.original.name}</div>
            </div>
          </>
        ) : null;
      },
    },
    {
      id: "ourSku",
      header: "Our SKU",
      accessorKey: "ourSKU",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.ourSKU ? (
          <div>{props.row.original.ourSKU}</div>
        ) : null;
      },
    },
    {
      id: "upc",
      header: "UPC",
      accessorKey: "upc",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.upc ? (
          <div>{props.row.original.upc}</div>
        ) : null;
      },
    },
    {
      id: "quantity",
      header: "Quantity",
      accessorKey: "quantity",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.quantity ? (
          <div>{props.row.original.quantity}</div>
        ) : null;
      },
    },
    {
      id: "createdDate",
      header: "CREATED Date",
      accessorKey: "createdDate",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        const { date, time } = getFormatDate(props.row.original.createdDate);
        return props.row.original.createdDate ? (
          <>
            <div>{date} </div>
            <div>{time}</div>
          </>
        ) : null;
      },
    },
    {
      id: "createdBy",
      header: "Created BY",
      accessorKey: "createdBy",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.createdBy ? (
          <div>{props.row.original.createdBy}</div>
        ) : null;
      },
    },
    {
      id: "updatedDate",
      header: "UPDATED Date",
      accessorKey: "modifiedDate",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        const { date, time } = getFormatDate(props.row.original.modifiedDate);
        return props.row.original.modifiedDate ? (
          <>
            <div>{date} </div>
            <div className="  text-xs font-normal">{time}</div>
          </>
        ) : null;
      },
    },
    {
      id: "updatedBy",
      header: "UPDATED BY",
      accessorKey: "modifiedBy",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return props.row.original.modifiedBy ? (
          <>
            <div>{props.row.original.modifiedBy}</div>
          </>
        ) : null;
      },
    },
    {
      id: "recStatus",
      header: "status",
      accessorKey: "recStatus",
      enableSorting: false,
      cell: (props: IStoreListProductVariantTableCellProps) => {
        return <Status type={props.row.original.recStatus} />;
      },
    },
  ];
  return (
    <Modal
      header={`Variant Of ${product.name} | SKU : ${product.ourSKU}`}
      isOpen={isOpen}
      onClose={onClose}
      size="7xl"
      content={
        <ReactTable
          usedInsideModal={true}
          COLUMNS={PRODUCT_VARIANT_COLUMNS}
          DATA={productVariant}
          fetchData={() => {}}
          sortingOptions={[]}
          setSortingOptionHandler={() => {}}
          hasNextPage={false}
          hasPreviousPage={false}
          totalCount={productVariant.length}
          hasPageSize={false}
          displaySearch="center"
          showMoreFilters={false}
          showEditColumns={false}
        />
      }
    />
  );
};

export default ProductVariantModal;
