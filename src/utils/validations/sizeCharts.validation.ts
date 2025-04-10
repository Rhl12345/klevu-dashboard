import * as Yup from "yup";

export const sizeChartsValidationSchema = Yup.object({
  sizeChartName: Yup.string()
    .trim()
    .required("Size chart template name is required.")
    .max(300, "Size chart template name must be less than 300 characters."),
  brandId: Yup.string().trim().required("Brand name is required."),
  sizeChartRange: Yup.string().trim().required("Size chart range is required."),
  description: Yup.string().trim().required("Description is required."),
  measurements: Yup.string().trim().required("Measurement is required."),
  recStatus: Yup.string().trim().required("Status is required."),
});
