"use client";

import React, { useState } from "react";

import Dropdown from "@/components/DropDown/DropDown";
import ListPageHeader from "@/components/CreateAndListPageHeader/ListPageHeader";
import DndGrid from "@/components/DndGrid/DndGrid";
import { Label } from "@/components/Label/Label";
import Tooltip from "@/components/Tooltip/Tooltip";
import Button from "@/components/Button/Button";
import ImportModal from "@/components/common/ImportModal";
import ProductItem from "@/components/common/ProductItem";

import productList from "@/mock-data/productOrder.json";
import {
  productOrderBrandOptions,
  productOrderCategoryOptions,
} from "@/utils/Dummy";

import { IDropdownOption } from "@/types/common/common.type";

const ProductOrder = () => {
  const [items, setItems] = useState(productList.subRow);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <div>
      <ListPageHeader moduleName={"Product Order"}>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Export</Button>
          <Button variant="primary" onClick={() => setIsImportModalOpen(true)}>
            Import
          </Button>
        </div>
      </ListPageHeader>

      <div className={`relative w-full lg:px-8 px-4 pt-4 lg:pt-8`}>
        <div className="w-full flex flex-wrap bg-gray-default dark:bg-transparent border border-gray-light dark:border-gray-dark p-2 relative">
          <div className="w-full flex flex-wrap justify-between gap-2">
            <div className="flex items-center">
              <Label>Total Products : {items.length}</Label>
              <Tooltip title="Total Products">
                <p>
                  At a time only one option will be selected (either 'Brand' or
                  'Category')
                </p>
                <p>
                  The Valid sequence is inbetween 1 and
                  {productList.subRow.length}
                </p>
              </Tooltip>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Dropdown
                className="lg:w-48"
                options={productOrderBrandOptions}
                onChange={(newValue) => {
                  const value = newValue as IDropdownOption;
                  setSelectedBrand(value?.value);
                }}
                value={productOrderBrandOptions.find(
                  (brand) => brand.value === selectedBrand
                )}
                placeholder="Select Brand"
              />
              <Dropdown
                className="lg:w-48"
                options={productOrderCategoryOptions}
                onChange={(newValue) => {
                  const value = newValue as IDropdownOption;
                  setSelectedCategory(value?.value);
                }}
                value={productOrderCategoryOptions.find(
                  (category) => category.value === selectedCategory
                )}
                placeholder="Select Category"
              />
            </div>
          </div>
        </div>
      </div>

      <DndGrid
        items={items}
        sortableKey={`productId`}
        setItems={setItems}
        renderItem={(item: any, index: number) => {
          return <ProductItem product={item} index={index} />;
        }}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};

export default ProductOrder;
