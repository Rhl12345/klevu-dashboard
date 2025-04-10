"use client";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";
import React, { useMemo } from "react";
import CommonCreateExport from "@/components/common/export/components/create";
import { ICoreProductFeedFormValues } from "@/types/export/export.type";
import {
  STORE_EXPORT_BRANDS,
  STORE_EXPORT_TYPES,
  STORE_EXPORT_VENDORS,
  STORE_OPTION_PRODUCT_FIELDS,
  STORE_PRODUCT_FIELDS,
  STORE_STATUS_OPTIONS,
} from "@/utils/constants";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { ExportValidationSchema } from "@/utils/validations/productFeedExport.validation";

const initialValues: ICoreProductFeedFormValues = {
  brand: [],
  vendor: [],
  exportType: "",
  status: "",
  productDisContinue: "no",
  optionProductStatus: "",
  optionProductDiscontinue: "all",
  productSubType: "all",
};

const checkBoxFields = {
  StoreProduct: STORE_PRODUCT_FIELDS,
  StoreOptionProduct: STORE_OPTION_PRODUCT_FIELDS,
};

const CreateStoreExport = (props: { type: STORE_TYPES }) => {
  const handleEcommerceStoreSubmit = async (
    values: ICoreProductFeedFormValues,
    { resetForm }: FormikHelpers<ICoreProductFeedFormValues>
  ) => {
    try {
      toast.success("Data downloaded successfully");
      resetForm();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCorporateStoreSubmit = async (
    values: ICoreProductFeedFormValues,
    { resetForm }: FormikHelpers<ICoreProductFeedFormValues>
  ) => {
    try {
      toast.success("Data downloaded successfully");
      resetForm();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const RenderComponent = useMemo(() => {
    switch (props.type) {
      case STORE_TYPES.ECOMMERCE:
        return (
          <CommonCreateExport
            type={props.type}
            initialValues={initialValues}
            validationSchema={ExportValidationSchema}
            onSubmit={handleEcommerceStoreSubmit}
            statusOptions={STORE_STATUS_OPTIONS}
            checkBoxFields={checkBoxFields}
            exportTypeOptions={STORE_EXPORT_TYPES}
            brandOptions={STORE_EXPORT_BRANDS}
            vendorOptions={STORE_EXPORT_VENDORS}
          />
        );
      case STORE_TYPES.CORPORATE:
        return (
          <CommonCreateExport
            type={props.type}
            initialValues={initialValues}
            validationSchema={ExportValidationSchema}
            onSubmit={handleCorporateStoreSubmit}
            checkBoxFields={checkBoxFields}
            statusOptions={STORE_STATUS_OPTIONS}
            exportTypeOptions={STORE_EXPORT_TYPES}
            brandOptions={STORE_EXPORT_BRANDS}
            vendorOptions={STORE_EXPORT_VENDORS}
          />
        );
      default:
        break;
    }
  }, [props.type]);

  return RenderComponent;
};

export default CreateStoreExport;
