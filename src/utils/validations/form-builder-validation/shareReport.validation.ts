import * as Yup from "yup";

export const ShareReportValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
});
