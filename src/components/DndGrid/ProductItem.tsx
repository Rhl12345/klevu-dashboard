import React from "react";
import { Label } from "@/components/Label/Label";
import { Formik } from "formik";
import { displayOrderValidationSchema } from "@/utils/validations/inputNumber.validation";
import InputNumber from "@/components/Input/InputNumber";

const ProductItem = ({ index }: { index: number }) => {
  return (
    <Formik
      initialValues={{ displayOrder: 0 }}
      validationSchema={displayOrderValidationSchema}
      onSubmit={(values) => console.log("Submitted:", values)}
    >
      {({ errors, touched, setFieldValue, handleBlur, values }) => (
        <div className="w-full p-3 bg-white cursor-move">
          <div className="border border-gray-300 p-3 mt-3 text-center h-full">
            <div className="flex items-center justify-center">
              <img
                src={`https://redefinecommerce.blob.core.windows.net/storagemedia/1/product/attributeimages/12H5-EK0107.jpg`}
                title=""
                alt=""
                style={{ maxWidth: "300px", maxHeight: "410px" }}
              />
            </div>
            <div className="mt-5 h-[80px] max-w-xs mx-auto">
              {`Product ${index + 1} - Sample Name`}
            </div>
            <div className="mt-2 text-sm">
              Price : <span>${(Math.random() * 100).toFixed(2)}</span>
            </div>
            <div className="mt-2 text-sm">
              Our sku :{" "}
              <span>{`SKU-${(index + 1).toString().padStart(6, "0")}`}</span>
            </div>
            <div className="flex items-center justify-center mt-2 text-sm gap-1">
              <Label className="whitespace-nowrap">Display Order :</Label>
              <InputNumber
                id="displayOrder"
                name="displayOrder"
                value={values.displayOrder}
                onChange={(e) =>
                  setFieldValue("displayOrder", Number(e.target.value))
                }
                onBlur={handleBlur}
                className="h-10 w-20"
                allowNegative={false}
                displayError
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProductItem;
