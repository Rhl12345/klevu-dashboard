"use client";
import { PRODUCT_FEEDS } from "@/types/products-database/productDatabase.type";
import React, { useMemo } from "react";
import CommonCreateImport from "@/components/common/import/components/create";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import {
  CoreProductFeedImportValidationSchema,
  ProductFeedImportValidationSchema,
} from "@/utils/validations/productFeedImport.validation";
import { IProductFeedImportFormValues } from "@/types/export/export.type";
import {
  CORE_EXPORT_TYPES,
  EXPORT_BRANDS,
  EXPORT_TYPES,
  EXPORT_VENDORS,
} from "@/utils/constants";
import { STATUS_OPTIONS } from "@/utils/Dummy";

const initialValues: IProductFeedImportFormValues = {
  exportType: "",
  file: undefined,
  productImage: undefined,
  brand: [],
  vendor: [],
  status: "",
};

const CreateImport = ({ type }: { type: PRODUCT_FEEDS }) => {
  const handleProductFeedSubmit = async (
    values: IProductFeedImportFormValues
  ) => {
    try {
      toast.success("Data Uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCoreProductFeedSubmit = async (
    values: IProductFeedImportFormValues
  ) => {
    try {
      toast.success("Data Uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const RenderComponent = useMemo(() => {
    switch (type) {
      case PRODUCT_FEEDS.PRODUCT_FEED:
        return (
          <CommonCreateImport
            type={type}
            initialValues={initialValues}
            onSubmit={handleProductFeedSubmit}
            validationSchema={ProductFeedImportValidationSchema}
            brandOptions={EXPORT_BRANDS}
            vendorOptions={EXPORT_VENDORS}
            statusOptions={STATUS_OPTIONS}
            exportTypeOptions={EXPORT_TYPES}
          />
        );
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return (
          <CommonCreateImport
            type={type}
            initialValues={initialValues}
            validationSchema={CoreProductFeedImportValidationSchema}
            onSubmit={handleCoreProductFeedSubmit}
            brandOptions={EXPORT_BRANDS}
            vendorOptions={EXPORT_VENDORS}
            statusOptions={STATUS_OPTIONS}
            exportTypeOptions={CORE_EXPORT_TYPES}
          />
        );
      default:
        break;
    }
  }, [type]);
  return RenderComponent;
};

export default CreateImport;
