"use client";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import MyTabs from "@/components/Tab/Tab";
import { PRODUCT_MODAL_TABS } from "@/utils/constants";
import React, { useEffect, useMemo, useState } from "react";
import AllProductsTab from "@/admin-pages/store-category/components/AllProduct";
import SelectedProduct from "@/admin-pages/store-category/components/SelectedProduct";
import storeCategoryList from "@/mock-data/StoreCategoryList.json";
import { IProductModalProps } from "@/types/store-category/storeCategory.type";
import { ITabOption } from "@/components/Tab/types";
import Input from "@/components/Input/Input";
import Text from "@/components/Text/Text";

const ProductModal = ({ isOpen, onClose }: IProductModalProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [productTab, setProductTab] =
    useState<ITabOption[]>(PRODUCT_MODAL_TABS);

  const RenderComponent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return (
          <AllProductsTab
            AllProductsData={storeCategoryList.CategoryProductsModalData}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        );
      case 1:
        return (
          <SelectedProduct
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        );
      default:
        break;
    }
  }, [activeTab, selectedRows]);
  const handleModalClose = () => {
    setActiveTab(0);
    onClose();
  };

  const handleTab = (index: number) => {
    setActiveTab(index);
  };
  useEffect(() => {
    const temp = `Selected Products (${selectedRows?.length})`;
    setProductTab((prev) => {
      return prev.map((tab) => {
        if (tab.id === 1) {
          return {
            ...tab,
            label: temp,
          };
        }
        return tab;
      });
    });
  }, [selectedRows]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Browse Products"
      size="6xl"
      content={
        <>
          <div className="w-full flex flex-col gap-4 lg:gap-6 bg-body-light dark:bg-body-dark relative h-full max-h-[calc(100vh-20rem)]">
            <div className="w-full flex flex-col gap-4 lg:gap-6 bg-body-light dark:bg-body-dark">
                <Text size="sm">
                  Choose up to 10 products from your catalog to display.
                </Text>
                <Input
                  placeholder="Search"
                  formik={false}
                  name="search"
                />
              <MyTabs
                options={productTab}
                activeTab={productTab.findIndex((tab) => tab.id === activeTab)}
                onTabClick={handleTab}
                isListPage={true}
                usedInsideModal={true}
              />
            </div>
            {RenderComponent}
          </div>
        </>
      }
      footer={
        <div className="flex gap-2">
          <Button variant="outline-secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleModalClose}>
            Save
          </Button>
        </div>
      }
    />
  );
};
export default ProductModal;
