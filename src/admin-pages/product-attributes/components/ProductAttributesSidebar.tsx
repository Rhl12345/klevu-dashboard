import Dropdown from "@/components/DropDown/DropDown";
import { IProductAttributesFormValues } from "@/types/product-attributes/product-attributes.type";
import { useFormikContext } from "formik";
import React from "react";

const ProductAttributesSidebar = () => {
  const { values, setFieldValue } =
    useFormikContext<IProductAttributesFormValues>();

  return (
    <>
      <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border border-gray-light dark:border-gray-dark">
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
          <Dropdown
            asterisk={true}
            label="Product Attributes"
            aria-label="product attributes status"
            defaultValue={values.ProductAttributesTypeStatus}
            name="productAttributesStatus"
            id="productAttributesStatus"
            options={[
              { label: "Active", value: "A" },
              { label: "Inactive", value: "I" },
            ]}
            onChange={(e: any) => {
              setFieldValue(
                "productAttributesStatus",
                e.value === "A" ? "A" : "I"
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductAttributesSidebar;
