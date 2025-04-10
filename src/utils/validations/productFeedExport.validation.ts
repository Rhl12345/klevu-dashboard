import * as Yup from "yup";

const ExportValidationSchema = Yup.object().shape({
  brand: Yup.array(),
  vendor: Yup.array(),
  exportType: Yup.string().trim().required("Export Type is required"),
  status: Yup.string().trim(),
});

export { ExportValidationSchema };
