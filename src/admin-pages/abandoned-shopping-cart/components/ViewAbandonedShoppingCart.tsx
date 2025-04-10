import React, { useMemo } from "react";
import { ITableColumn } from "@/components/Table/types";
import {
  ICartItem,
  IViewAbandonedShoppingCartProps,
} from "@/types/abandoned-shopping-cart/abandonedShoppingCart.type";
import Image from "@/components/Image/Image";
import Button from "@/components/Button/Button";
import ReactTable from "@/components/Table/ReactTable";
import { CURRENCY_SYMBOLS_BY_CODE } from "@/utils/constants";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { Label } from "@/components/Label/Label";
const ViewAbandonedShoppingCart = ({
  selectedCart,
  setIsModalOpen,
  isModalOpen,
}: IViewAbandonedShoppingCartProps) => {
  const handlePrintCart = () => {
    try {
      window.print();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const columnsViewCart = useMemo<ITableColumn<ICartItem>[]>(
    () => [
      {
        id: "thumbNail",
        header: "ThumbNail",
        accessorKey: "thumbNail",
        enableSorting: false,
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="w-16 h-16">
              <Image
                src={product.thumbNail}
                alt={`Product image for ${product.productName}`}
                height={10}
                width={10}
                aspectRatio="landscape"
                objectFit="contain"
                rounded="sm"
                variant="next"
              />
            </div>
          );
        },
      },
      {
        id: "productName",
        header: "Product Name",
        accessorKey: "productName",
        enableSorting: false,
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex flex-col gap-1">
              <div>{product.productName}</div>

              <div>
                <div>Color: {product.color || "N/A"}</div>
              </div>
              <div className="flex items-center gap-4 border-b border-gray-light dark:border-gray-dark pb-1">
                <div>Size: {product.size || "N/A"}</div>
                <div>Qty: {product.quantity}</div>
                <div>
                  Unit Price: {CURRENCY_SYMBOLS_BY_CODE.USD}
                  {product.unitPrice}
                </div>
              </div>
              <div className="flex items-center gap-4 border-none border-gray-light dark:border-gray-dark pb-1">
                <div>Size: {product.size || "N/A"}</div>
                <div>Qty: {product.quantity}</div>
                <div>
                  Unit Price: {CURRENCY_SYMBOLS_BY_CODE.USD}
                  {product.unitPrice}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        id: "sku",
        header: "SKU",
        accessorKey: "sku",
        enableSorting: false,
      },
      {
        id: "quantity",
        header: "Quantity",
        accessorKey: "quantity",
        enableSorting: false,
      },
      {
        id: "subTotal",
        header: `SubTotal (${CURRENCY_SYMBOLS_BY_CODE.USD})`,
        accessorKey: "subTotal",
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="7xl"
        header="Abandoned Shopping Cart"
        content={
          <>
            <div className="space-y-4">
              <Label className="flex gap-x-2">
                Store Name : <div>{selectedCart?.storeName}</div>
              </Label>
              <Label className=" flex gap-x-2">
                Name : <div>{selectedCart?.name}</div>
              </Label>
              <Label className=" flex gap-x-2">
                Email : <div>{selectedCart?.email}</div>
              </Label>
            </div>
            <ReactTable
              usedInsideModal={true}
              isListPage={false}
              COLUMNS={columnsViewCart}
              DATA={selectedCart?.cartItems ?? []}
              fetchData={() => {}}
              showEditColumns={false}
              showFilter={false}
              displaySearch={false}
              showPagination={false}
            />
          </>
        }
        footer={
          <div className="flex gap-2">
            <Button
              variant="outline-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => handlePrintCart()}
            >
              Print Cart
            </Button>
          </div>
        }
      />
    </>
  );
};

export default ViewAbandonedShoppingCart;
