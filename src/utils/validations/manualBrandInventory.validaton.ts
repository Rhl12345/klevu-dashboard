import * as Yup from "yup";

const UploadBrandInventorySchema = Yup.object().shape({
  brand: Yup.string().trim().required("Brand is required"),
  brandInventoryFile: Yup.mixed(),
});

const ImportExportManualBrandInventorySchema = Yup.object().shape({
  brand: Yup.string().trim().required("Brand Name is required"),
  vendor: Yup.string().trim().required("Vendor is required"),
  recStatus: Yup.string().trim().required("Status is required"),
});

export { UploadBrandInventorySchema, ImportExportManualBrandInventorySchema };
