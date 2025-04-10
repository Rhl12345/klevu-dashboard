import * as Yup from "yup";

export const ProductAndSeoRequirementSchema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  name: Yup.string().trim().required("Name is required"),
  percentage: Yup.number()
    .integer("Percentage must be a whole number")
    .min(0, "Percentage must be between 0 and 100")
    .max(100, "Percentage must be between 0 and 100")
    .required("Readiness percentage is required"),
  readinessStatus: Yup.string().required("Readiness status is required"),
});
