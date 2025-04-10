import * as Yup from "yup";

const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
});

export { ForgotPasswordValidationSchema };
