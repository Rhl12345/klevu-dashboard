import * as Yup from "yup";

export const myAccountValidationSchema = Yup.object().shape({
  firstname: Yup.string().trim().required("First name is required"),
  lastname: Yup.string().trim().required("Last name is required"),
  phone: Yup.string().trim().required("Phone number is required"),
  acceptNewsletter: Yup.boolean(),
});

export const passwordChangeValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().trim().required("Current password is required"),
  newPassword: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});
