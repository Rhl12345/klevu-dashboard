import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Brand Name is required"),
  displayOrder: Yup.number()
    .required("Display Order is required")
    .min(1, "Display Order must be at least 1")
    .typeError("Display Order must be a number"),
  vendorName: Yup.array()
    .of(Yup.string())
    .min(1, "At least one vendor is required"),
  recStatus: Yup.string().required("Brand Status is required"),
  seTitle: Yup.string().required("Meta Title is required"),
  discountPercentage: Yup.number()
    .min(1, "Discount Percentage must be at least 1")
    .typeError("Discount Percentage must be a number"),
  minQuantity: Yup.number()
    .typeError("Minimum Quantity must be a number")
    .min(0, "Minimum Quantity must be at least 0"),
});

export const catalogValidationSchema = Yup.object().shape({
  displayOrder: Yup.number().required("Display Order is required"),
  catalogName: Yup.string().required("Catalog Name is required"),
  catalogLogo: Yup.mixed().required("Catalog Logo is required"),
  uploadCatalog: Yup.mixed().required("Upload Catalog is required"),
  uploadCatalogName: Yup.string().required("Upload Catalog Name is required"),
});
