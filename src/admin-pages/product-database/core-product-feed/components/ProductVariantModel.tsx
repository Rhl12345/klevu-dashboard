import Status from "@/components/DisplayStatus/Status";
import Image from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import { getProductVariantList } from "@/services/core-product-feed/coreProductFeed.service";
import { IProductVariant } from "@/types/core-product-feed/productVariant.type";
import { getFormatDate } from "@/utils/date.util";
import { toast } from "react-toastify";

import React, { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/common.util";
import Loading from "@/app/loading";

const ProductVariantModel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [productVariantData, setProductVariantData] = useState<
    IProductVariant[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const VariantColumns: ITableColumn<IProductVariant>[] = [
    {
      id: "productImage",
      header: "Product Image",
      accessorKey: "productImage",
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.original.productImage;
        return value && value.length > 0 ? (
          <>
            <div
              className="flex -space-x-9 items-center"
              style={{ width: "160px" }}
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
      id: "ourSku",
      header: "Our SKU",
      accessorKey: "ourSKU",
      cell: ({ row }) => {
        return row.original.ourSKU;
      },
    },
    {
      id: "upc",
      header: "UPC",
      accessorKey: "upc",
      cell: ({ row }) => {
        return row.original.upc;
      },
    },
    {
      id: "quantity",
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }) => {
        return row.original.quantity;
      },
    },
    {
      id: "createdDate",
      header: "CREATED Date",
      accessorKey: "createdDate",
      cell: ({ row }) => {
        const { date, time } = getFormatDate(row?.original?.createdDate);
        return (
          <>
            <div>{date} </div>
            <div className="  text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    {
      id: "createdBy",
      header: "Created BY",
      accessorKey: "createdBy",
      cell: ({ row }) => {
        return <div>{row.original.createdBy}</div>;
      },
    },
    {
      id: "updatedDate",
      header: "UPDATED Date",
      accessorKey: "modifiedDate",
      cell: ({ row }) => {
        const { date, time } = getFormatDate(row?.original?.modifiedDate);
        return (
          <>
            <div>{date} </div>
            <div className="  text-xs font-normal">{time}</div>
          </>
        );
      },
    },
    {
      id: "updatedBy",
      header: "UPDATED BY",
      accessorKey: "modifiedBy",
      cell: ({ row }) => {
        return <div>{row.original.modifiedBy}</div>;
      },
    },
    {
      id: "recStatus",
      header: "status",
      accessorKey: "recStatus",
      cell: ({ row }) => {
        return <Status type={row.original.recStatus} />;
      },
    },
  ];

  const getProductVariantListData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getProductVariantList();
      setProductVariantData(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProductVariantListData();
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="9xl"
        header={<div className="text-sm font-semibold">Product Variant</div>}
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
              hasPageSize={false}
              showPagination={false}
              isListPage={false}
              usedInsideModal={true}
              totalCount={productVariantData.length}
            />
          )
        }
      />
    </>
  );
};

export default ProductVariantModel;
