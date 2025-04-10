import * as Yup from "yup";

export const BrandSchema = Yup.object().shape({
  name: Yup.string().trim().required("Brand Name is required"),
  resStatus: Yup.string().required("Brand Status is required"),
  vendorId: Yup.array().min(1, "Vendor is required."),
});

export const CatalogSchema = Yup.object().shape({
  vendorId: Yup.number().required("Vendor is required"),
  catalogName: Yup.string().required("Catalog Name is required"),
  startDate: Yup.string().required("Start Date is required"),
  releasedDate: Yup.string().required("Release Date is required"),
  uploadCatalogURL: Yup.string().required("Upload Catalog is required"),
});
