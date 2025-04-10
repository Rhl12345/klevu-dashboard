import React, { memo } from "react";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/DropDown/DropDown";
import { IProductSizeFormProps } from "@/types/sizemaster/sizemaster.type";
import AddSizeFieldArray from "@/admin-pages/size-master/create/components/AddSizeFieldArray";

const ProductSizeForm: React.FC<IProductSizeFormProps> = ({
  formik,
  statusOptions,
}) => {
  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    setFieldTouched,
  } = formik;

  return (
    <div className="w-full flex max-lg:flex-wrap gap-4 lg:gap-8 lg:py-8 xl:px-8 py-4 px-4">
      <div className="w-full lg:w-7/12 xl:w-10/12">
        <div className="flex flex-wrap gap-4 lg:gap-8">
          <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark p-4 lg:p-6 bg-body-light dark:bg-body-dark">
            <div className="font-semibold text-secondary-dark dark:text-secondary-light">
              <div className="gap-4 lg:gap-6 grid grid-cols-1">
                <div className="lg:flex gap-4 lg:gap-6 lg:space-y-0 space-y-6">
                  <div className="lg:w-6/12">
                    <Input
                      id="productType"
                      name="productType"
                      label="Product Type"
                      placeholder="Enter Product Type"
                      value={values.productType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      asterisk
                      aria-required="true"
                      aria-invalid={
                        touched.productType && errors.productType
                          ? "true"
                          : "false"
                      }
                    />
                  </div>
                  <div className="lg:w-6/12">
                    <Input
                      id="displayOrder"
                      name="displayOrder"
                      label="Display Order"
                      placeholder="Enter Display Order"
                      value={values.displayOrder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      asterisk
                      aria-required="true"
                      aria-invalid={
                        touched.displayOrder && errors.displayOrder
                          ? "true"
                          : "false"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-none content border border-gray-light dark:border-gray-dark bg-body-light dark:bg-body-dark">
            <div className="font-semibold text-secondary-dark dark:text-secondary-light">
              <div className="gap-4 lg:gap-6 grid grid-cols-1">
                <AddSizeFieldArray />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-5/12 xl:w-2/12 py-4 border border-gray-light dark:border-gray-dark">
        <div className="relative border-b border-gray-light dark:border-gray-dark pb-6 px-4">
          <Dropdown
            id="status"
            name="status"
            label="Size Master Status"
            placeholder="Select Status"
            options={statusOptions}
            value={statusOptions.find(
              (option) => option.value == values.status
            )}
            onChange={(option: any) => {
              setFieldValue("status", option?.value || "");
            }}
            error={touched.status && errors.status ? true : false}
            onBlur={() => setFieldTouched("status", true)}
            errorMessage={
              touched.status && errors.status ? errors.status : undefined
            }
            aria-required="true"
            aria-invalid={touched.status && errors.status ? "true" : "false"}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductSizeForm);
