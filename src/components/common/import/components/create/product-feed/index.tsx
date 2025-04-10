"use client";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { IDropdownOption } from "@/components/Table/types";
import { ICreateImportProps } from "@/types/export/export.type";
import { getSingleSelectFilteredData } from "@/utils/helpers";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-toastify";

const ProductFeedImport = (props: ICreateImportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: props.initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (!values.file && !values.productImage) {
        toast.info("Please upload a file or product image");
        return;
      }
      await props.onSubmit(values);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      if (productImageInputRef.current) {
        productImageInputRef.current.value = "";
      }
      resetForm();
    },
    validationSchema: props.validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-12 gap-4 lg:gap-8 border border-gray-light dark:border-gray-dark ">
          <div className="bg-body-light dark:bg-body-dark col-span-full p-6">
            <div className="w-full flex flex-wrap lg:grid lg:grid-cols-2 gap-6 mb-6">
              <div className="w-full">
                <Dropdown
                  id="exportType"
                  asterisk
                  label="Export Type"
                  name="exportType"
                  options={props.exportTypeOptions}
                  isFormikField={false}
                  value={getSingleSelectFilteredData(
                    props.exportTypeOptions,
                    formik.values.exportType
                  )}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "exportType",
                      (event as IDropdownOption).value
                    );
                  }}
                  errorMessage={
                    formik.touched.exportType ? formik.errors.exportType : ""
                  }
                />
              </div>

              <div className="w-full">
                <Input
                  type="file"
                  accept=".csv"
                  label="File"
                  formik={false}
                  ref={fileInputRef}
                  name="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    formik.setFieldValue("file", file);
                  }}
                  errorMessage={formik.touched.file ? formik.errors.file : ""}
                />
              </div>

              <div className="w-full">
                <Input
                  type="file"
                  accept=".zip"
                  label="Product Image"
                  formik={false}
                  ref={productImageInputRef}
                  name="productImage"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    formik.setFieldValue("productImage", file);
                  }}
                />
              </div>
            </div>

            <div className="flex w-full justify-end">
              <Button variant="primary" type="submit">
                Import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductFeedImport;
