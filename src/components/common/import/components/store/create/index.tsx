"use client";
import { STORE_TYPES } from "@/types/products-database/productDatabase.type";
import React, { useMemo } from "react";
import CommonCreateImport from "@/components/common/import/components/create";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/utils/common.util";
import { IProductFeedImportFormValues } from "@/types/export/export.type";
import {
  EXPORT_BRANDS,
  EXPORT_VENDORS,
  STORE_EXPORT_TYPES,
} from "@/utils/constants";
import { STATUS_OPTIONS } from "@/utils/Dummy";
import {
  CoreProductFeedImportValidationSchema,
  ProductFeedImportValidationSchema,
} from "@/utils/validations/productFeedImport.validation";

const storeInitialValues: IProductFeedImportFormValues = {
  exportType: "",
  file: undefined,
  productImage: undefined,
  brand: [],
  vendor: [],
  status: "",
};

const CreateImport = ({ type }: { type: STORE_TYPES }) => {
  const handleEcommerceStoreSubmit = async (
    values: typeof storeInitialValues
  ) => {
    try {
      toast.success("Data Uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleCorporateStoreSubmit = async (
    values: typeof storeInitialValues
  ) => {
    try {
      toast.success("Data Uploaded successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const RenderComponent = useMemo(() => {
    switch (type) {
      case STORE_TYPES.ECOMMERCE:
        return (
          <CommonCreateImport
            type={type}
            initialValues={storeInitialValues}
            onSubmit={handleEcommerceStoreSubmit}
            validationSchema={ProductFeedImportValidationSchema}
            brandOptions={EXPORT_BRANDS}
            vendorOptions={EXPORT_VENDORS}
            statusOptions={STATUS_OPTIONS}
            exportTypeOptions={STORE_EXPORT_TYPES}
          />
        );
      case STORE_TYPES.CORPORATE:
        return (
          <CommonCreateImport
            type={type}
            initialValues={storeInitialValues}
            validationSchema={CoreProductFeedImportValidationSchema}
            onSubmit={handleCorporateStoreSubmit}
            brandOptions={EXPORT_BRANDS}
            vendorOptions={EXPORT_VENDORS}
            statusOptions={STATUS_OPTIONS}
            exportTypeOptions={STORE_EXPORT_TYPES}
          />
        );
      default:
        break;
    }
  }, [type]);
  return RenderComponent;
};

export default CreateImport;
