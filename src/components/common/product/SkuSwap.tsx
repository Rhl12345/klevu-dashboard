import React, { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import { ISKUSwap } from "@/types/products-database/productDatabase.type";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import Loader from "@/components/common/Loader";
import * as yup from "yup";

const SkuSwap = ({
  initialData,
  productId,
  onFormChange,
  setIsFormValid,
}: ISKUSwap) => {
  const [isLoader, setIsLoader] = useState(false);
  const SkuSwapSchema = yup.object().shape({
    newSku: yup.string().trim(),
  });
  const skuSwapFormikBag = useFormik({
    initialValues: {
      oldSku: initialData.sku,
      newSku: "",
    },
    validationSchema: SkuSwapSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoader(true);
        toast.success("Sku Swap updated successfully");
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoader(false);
      }
    },
  });
  useEffect(() => {
    if (onFormChange && skuSwapFormikBag.dirty) {
      onFormChange();
    }

    if (Object.keys(skuSwapFormikBag.errors).length === 0) {
      setIsFormValid?.(true);
    } else {
      setIsFormValid?.(false);
    }
  }, [skuSwapFormikBag.dirty, onFormChange, skuSwapFormikBag.errors]);
  return (
    <>
      <div className="border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
        <form onSubmit={skuSwapFormikBag.handleSubmit}>
          {isLoader ? (
            <div className="flex justify-center items-center h-screen">
              <Loader />
            </div>
          ) : (
            <FormikProvider value={skuSwapFormikBag}>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full last:mb-0">
                  <div className="flex flex-col gap-2 relative">
                    <Input
                      label="Old SKU"
                      name="oldSku"
                      id="oldSku"
                      value={skuSwapFormikBag.values.oldSku}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full last:mb-0">
                  <div className="flex flex-col gap-2 relative">
                    <Input
                      label="New SKU"
                      name="newSku"
                      id="newSku"
                      placeholder="Select sku..."
                      autoSuggestion={true}
                      suggestions={["SKU123", "demo"]}
                      value={skuSwapFormikBag.values.newSku}
                      onChange={skuSwapFormikBag.handleChange}
                      onBlur={skuSwapFormikBag.handleBlur}
                    />
                  </div>
                </div>
              </div>
            </FormikProvider>
          )}
        </form>
      </div>
    </>
  );
};

export default SkuSwap;
