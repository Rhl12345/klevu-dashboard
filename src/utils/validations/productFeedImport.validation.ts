import * as Yup from "yup";

const ProductFeedImportValidationSchema = Yup.object().shape({
  exportType: Yup.string().trim().required("Export type is required"),
  file: Yup.mixed(),
  productImage: Yup.mixed(),
});

const CoreProductFeedImportValidationSchema = Yup.object().shape({
  exportType: Yup.string().trim().required("Export type is required"),
  file: Yup.mixed(),
  productImage: Yup.mixed(),
  brand: Yup.array().of(Yup.string()),
  vendor: Yup.array().of(Yup.string()),
  status: Yup.string().trim(),
});

export {
  ProductFeedImportValidationSchema,
  CoreProductFeedImportValidationSchema,
};
