import React, { useState } from "react";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import Dropdown from "@/components/DropDown/DropDown";
import Button from "@/components/Button/Button";
import { useFormikContext } from "formik";
import { IDropdownOption } from "@/components/Table/types";
import ProductModal from "@/admin-pages/store-brand/components/ProductModal";
import storeBrandData from "@/mock-data/storeBrandData.json";
import { IProductModalProps } from "@/types/store-brand/storeBrand.type";

const PromotionalProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { values, setFieldValue } = useFormikContext<IProductModalProps>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-6">
        <div className="w-full flex flex-col gap-4 lg:gap-6 rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <ToggleButton
                wrapperClassName="items-center justify-between"
                label="Show Border"
                id="showBorder"
                name="showBorder"
                defaultValue={values.showBorder}
                isInline
              />
            </div>
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <ToggleButton
                label="Show Picture Name"
                name="showPictureName"
                id="showPictureName"
                isInline
                defaultValue={values.showProductName}
                wrapperClassName="items-center justify-between"
              />
            </div>
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark ">
              <ToggleButton
                label="Show Split Products"
                name="showSplitProducts"
                id="showSplitProducts"
                isInline
                defaultValue={values.showSplitProducts}
                wrapperClassName="items-center justify-between"
              />
            </div>
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <ToggleButton
                label="Show Button"
                name="showButton"
                id="showButton"
                isInline
                defaultValue={values.showButton}
                wrapperClassName="items-center justify-between"
              />
            </div>
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <ToggleButton
                label="Show Price"
                name="showPrice"
                id="showPrice"
                isInline
                defaultValue={values.showPrice}
                wrapperClassName="items-center justify-between"
              />
            </div>
            <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
              <ToggleButton
                label="Show Brand Logo"
                name="showBrandLogo"
                id="showBrandLogo"
                isInline
                defaultValue={values.showBrandLogo}
                wrapperClassName="items-center justify-between"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <Dropdown
                name="promotionalProductsOptions"
                id="promotionalProductsOptions"
                isFormikField
                options={storeBrandData.promotionalProductsData}
                onChange={(event) => {
                  setFieldValue(
                    "promotionalProductsOptions",
                    (event as IDropdownOption).value
                  );
                }}
              />
            </div>
            <div className="gap-4">
              <Button onClick={handleOpenModal}>Add Products</Button>
              <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalProduct;
