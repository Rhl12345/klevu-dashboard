import { ITableColumn } from "@/components/Table/types";
import { IAdditionalProduct } from "@/types/products-database/productAdditionalPrice.type";
import React, { useState } from "react";
import ReactTable from "@/components/Table/ReactTable";
import productAdditionalPriceData from "@/mock-data/ProductAdditionalPrice.json";
import Loader from "@/components/common/Loader";
import Text from "@/components/Text/Text";
import Button from "@/components/Button/Button";

const ProductAdditionalPriceViewSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tab: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IAdditionalProduct[]>(
    productAdditionalPriceData
  );
  const columns: ITableColumn<IAdditionalProduct>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: false,
    },
    {
      id: "amount",
      header: "Amount",
      accessorKey: "amount",
      enableSorting: false,
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      enableSorting: false,
    },
    {
      id: "hideFromCustomer",
      header: "Hide From customer",
      accessorKey: "hideFromCustomer",
      enableSorting: false,
    },
    {
      id: "fundRaising",
      header: "Fund Raising",
      accessorKey: "fundRaising",
      enableSorting: false,
    },
  ];
  return (
    <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-bold">
              Product Additional Price
            </Text>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleTabChange(9)}
            >
              Edit
            </Button>
          </div>
          <ReactTable
            COLUMNS={columns}
            DATA={data}
            showFilter={false}
            displaySearch={false}
            showPagination={false}
            usedInsideModal={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProductAdditionalPriceViewSection;
