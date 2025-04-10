import React from "react";
import { Label } from "@/components/Label/Label";
import { Formik } from "formik";
import { displayOrderValidationSchema } from "@/utils/validations/inputNumber.validation";
import InputNumber from "@/components/Input/InputNumber";
import SvgIcon from "@/components/SvgIcons/SvgIcon";
import { IProduct } from "@/types/stores/ecommerce/product-order/productOrder.type";
import Image from "@/components/Image/Image";

const ProductItem = ({
  product,
  index,
}: {
  product: IProduct;
  index: number;
}) => {
  return (
    <Formik
      initialValues={{ displayOrder: index + 1 }}
      validationSchema={displayOrderValidationSchema}
      onSubmit={() => {}}
    >
      {({ setFieldValue, handleBlur, values }) => (
        <div className="w-full bg-body-light dark:bg-body-dark text-quaternary-dark dark:text-quaternary-light">
          <div className="border border-gray-light dark:border-gray-dark p-4 text-center h-full flex flex-col items-center gap-2 lg:gap-4 cursor-default">
            <div className="flex items-center justify-between w-full relative">
              <SvgIcon
                name="dots-grid"
                className="w-5 h-5 absolute top-0 right-2 text-quaternary-dark dark:text-quaternary-light cursor-move"
              />
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_BASE_URL_ADMIN}${product?.image}`}
                alt={`Product ${product?.productId}`}
                className="w-full max-w-xs mx-auto h-auto object-contain"
              />
            </div>

            <div className=" h-20 max-w-xs mx-auto text-center">
              {`${product?.productName}`}
            </div>
            <div className="text-sm font-normal">
              Price: <span>${product?.msrp}</span>
            </div>
            <div className="text-sm font-normal">
              Our sku:{" "}
              <span>{`SKU-${product?.ourSku?.toString().padStart(6, "0")}`}</span>
            </div>
            <div className="flex items-center justify-center text-sm gap-2">
              <Label className="text-sm font-normal">Display Order:</Label>
              <InputNumber
                id="displayOrder"
                name="displayOrder"
                value={values.displayOrder}
                onChange={(e) =>
                  setFieldValue("displayOrder", Number(e.target.value))
                }
                onBlur={handleBlur}
                className="h-10 w-20"
                displayError
                allowNegative={false}
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProductItem;