"use client";

import React from "react";
import ReactTable from "@/components/Table/ReactTable";
import { ITableColumn } from "@/components/Table/types";
import Button from "@/components/Button/Button";
import productCustomFieldsData from "@/mock-data/productCustomFieldsTab.json";
import Text from "@/components/Text/Text";
import { IProductCustomFields } from "@/types/products-database/productCustomFieldsTab.type";

const ProductCustomFieldsSection = ({
  productId,
  handleTabChange,
}: {
  productId: string;
  handleTabChange: (tab: number) => void;
}) => {
  const columns: ITableColumn<IProductCustomFields>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: false,
    },
    {
      id: "require",
      header: "Require",
      accessorKey: "require",
      enableSorting: false,
    },
    {
      id: "extraPrice",
      header: "Extra Price",
      accessorKey: "extraPrice",
      enableSorting: false,
    },
    {
      id: "changePerCharacter",
      header: "Change Per Character",
      accessorKey: "changePerCharacter",
      enableSorting: false,
    },
    {
      id: "makeExclusive",
      header: "Make Exclusive",
      accessorKey: "makeExclusive",
      enableSorting: false,
    },
  ];
  return (
    <>
      <div className=" border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <div className="flex flex-col gap-4 dark:border-gray-dark">
          <div className="flex justify-between items-center">
            <Text size="lg" className="font-bold">
              Product Custom Fields
            </Text>

            <Button
              variant="default"
              size="sm"
              onClick={() => handleTabChange(10)}
            >
              Edit
            </Button>
          </div>
          <ReactTable
            COLUMNS={columns}
            DATA={productCustomFieldsData.productCustomFieldsData}
            usedInsideModal={true}
            showFilter={false}
            displaySearch={false}
            showPagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCustomFieldsSection;
