import React, { useState } from "react";
import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import orderProductModalData from "@/mock-data/OrderProductModal.json";
import Loading from "@/app/loading";
import { IOrderProductVariant } from "@/types/company/order.type";
const OrderProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [productVariantData, setProductVariantData] = useState(orderProductModalData);
  const [isLoading, setIsLoading] = useState(false);

  const VariantColumns: ITableColumn<IOrderProductVariant>[] = [
    {
      id: "product Image",
      header: "product Image",
      accessorKey: "productImage",
      enableSorting: false,
      cell: ({ row }) => {

        const value = row.original.productImage;
        return value && value.length > 0 ? (
          <>
            <div
              className="flex -space-x-9 items-center"
            >
              {Array.isArray(value) ? (
                value.map((ProductMainImg, index) => (
                  <div
                    key={index}
                    className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white"
                  >
                    <Image src={ProductMainImg} />
                  </div>
                ))
              ) : (
                <div className="h-14 w-14 flex items-center justify-center overflow-hidden rounded-full border bg-white">
                  <Image src={value} className="max-h-full" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
            <Image src={value} />
          </div>
        );
      },
    },
    {
      id: "name",
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }) => row.original.name,
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => {
        return row.original.price;
      },

    },
    {
      id: "totalAmount",
      header: "Total Amount",
      accessorKey: "totalAmount",
      
    },

   
    {
      id: "items",
      header: "Items",
      accessorKey: "items",
    },
    {
      id: "recStatus",
      header: "	Fulfillment Status",
      accessorKey: "recStatus",
      cell: ({ row }) => {
        return <Status type={row.original.recStatus} />;
      },
    },
  ];


  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="7xl"
        header="Order Products"
        contentClassName="!p-0"
        content={
          isLoading ? (
            <Loading />
          ) : (
            <ReactTable
              COLUMNS={VariantColumns}
              DATA={productVariantData}
              hasNextPage={false}
              hasPreviousPage={false}
              displaySearch={false}
              showFilter={false}
              totalCount={productVariantData.length}
              isListPage={false}
            />
          )
        }
      />
    </>
  );
};

export default OrderProductModal;
