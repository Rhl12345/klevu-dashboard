"use client";
import { PRODUCT_FEEDS } from "@/types/products-database/productDatabase.type";
import { useMemo } from "react";
import CommonCreateExport from "@/components/common/export/components/create";
import { ICoreProductFeedFormValues } from "@/types/export/export.type";
import { getErrorMessage } from "@/utils/common.util";
import { toast } from "react-toastify";
import { FormikHelpers } from "formik";
import {
  CORE_EXPORT_TYPES,
  EXPORT_BRANDS,
  EXPORT_TYPES,
  EXPORT_VENDORS,
  OPTION_PRODUCT_FIELDS,
  PRODUCT_COLORS,
  PRODUCT_FIELDS,
  PRODUCT_WITH_OPTION_DISCONTINUE,
  PRODUCT_STATUS_OPTIONS,
  STORE_PRODUCT_COLORS,
} from "@/utils/constants";
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
  Product: PRODUCT_FIELDS,
  OptionProduct: OPTION_PRODUCT_FIELDS,
  ProductColor: PRODUCT_COLORS,
  ProductColorWithStores: STORE_PRODUCT_COLORS,
  ProductWithOptionDiscontinue: PRODUCT_WITH_OPTION_DISCONTINUE,
};

const CreateExport = (props: { type: PRODUCT_FEEDS }) => {
  const handleProductFeedSubmit = async (
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

  const handleCoreProductFeedSubmit = async (
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
      case PRODUCT_FEEDS.PRODUCT_FEED:
        return (
          <CommonCreateExport
            type={props.type}
            initialValues={initialValues}
            validationSchema={ExportValidationSchema}
            onSubmit={handleProductFeedSubmit}
            exportTypeOptions={EXPORT_TYPES}
            brandOptions={EXPORT_BRANDS}
            vendorOptions={EXPORT_VENDORS}
            statusOptions={PRODUCT_STATUS_OPTIONS}
          />
        );
      case PRODUCT_FEEDS.CORE_PRODUCT_FEED:
        return (
          <CommonCreateExport
            type={props.type}
            initialValues={initialValues}
            validationSchema={ExportValidationSchema}
            onSubmit={handleCoreProductFeedSubmit}
            checkBoxFields={checkBoxFields}
            exportTypeOptions={CORE_EXPORT_TYPES}
            brandOptions={EXPORT_BRANDS}
            vendorOptions={EXPORT_VENDORS}
            statusOptions={PRODUCT_STATUS_OPTIONS}
          />
        );
      default:
        break;
    }
  }, [props.type]);
  return RenderComponent;
};

export default CreateExport;
