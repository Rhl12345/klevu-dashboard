"use client";
import Button from "@/components/Button/Button";
import Dropdown from "@/components/DropDown/DropDown";
import Input from "@/components/Input/Input";
import { IDropdownOption } from "@/components/Table/types";
import { ICreateImportProps } from "@/types/export/export.type";
import {
  getMultiSelectFilteredData,
  getSingleSelectFilteredData,
} from "@/utils/helpers";
import { useFormik } from "formik";
import React, { useRef } from "react";

const CorporateImport = (props: ICreateImportProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: props.initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      await props.onSubmit(values);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
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
                <Dropdown
                  id="brandName"
                  label="Brand Name"
                  isMulti
                  name="brand"
                  options={props.brandOptions}
                  isFormikField={false}
                  value={getMultiSelectFilteredData(
                    props.brandOptions,
                    formik.values.brand
                  )}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "brand",
                      (event as IDropdownOption[]).map((option) => option.value)
                    );
                  }}
                />
              </div>

              <div className="w-full">
                <Dropdown
                  id="vendorName"
                  label="Vendor Name"
                  isMulti
                  name="vendor"
                  options={props.vendorOptions}
                  isFormikField={false}
                  value={getMultiSelectFilteredData(
                    props.vendorOptions,
                    formik.values.vendor
                  )}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "vendor",
                      (event as IDropdownOption[]).map((option) => option.value)
                    );
                  }}
                />
              </div>

              <div className="w-full">
                <Dropdown
                  id="status"
                  label="Status"
                  name="status"
                  options={props.statusOptions}
                  isFormikField={false}
                  value={getSingleSelectFilteredData(
                    props.statusOptions,
                    formik.values.status
                  )}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "status",
                      (event as IDropdownOption).value
                    );
                  }}
                  errorMessage={
                    formik.touched.status ? formik.errors.status : ""
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

export default CorporateImport;
