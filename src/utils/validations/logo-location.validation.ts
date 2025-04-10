import * as Yup from "yup";

const LogoLocationValidationSchema = Yup.object().shape({
  categoryId: Yup.string().trim().required("Category is required."),
  recStatus: Yup.string().trim().required("Status is required."),
});

const LogoLocationFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Logo location name is required")
    .max(60, "Name cannot exceed 60 characters"),
  threeDImageURL: Yup.string().trim(),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative")
    .typeError("Price must be a number"),
  cost: Yup.number()
    .required("Cost is required")
    .min(0, "Cost cannot be negative")
    .typeError("Cost must be a number"),
  brandGuidelines: Yup.boolean(),
});

export { LogoLocationValidationSchema, LogoLocationFormValidationSchema };
