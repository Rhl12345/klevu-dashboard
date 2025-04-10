import * as yup from "yup";

const ResetPasswordValidationSchema = yup.object().shape({
  newPassword: yup.string().trim().required("New password is required"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
});

export { ResetPasswordValidationSchema };
