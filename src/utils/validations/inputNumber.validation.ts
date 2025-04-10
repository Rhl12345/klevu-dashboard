import * as Yup from "yup";

export const baseValidationSchema = Yup.object().shape({
  number: Yup.number()
    .typeError("Please enter a valid number")
    .required("This field is required"),
});

export const currencyValidationSchema = Yup.object().shape({
  currency: Yup.number()
    .typeError("Please enter a valid amount")
    .required("Amount is required")
    .min(0, "Amount must be positive")
    .max(1000000, "Amount cannot exceed 1,000,000"),
});

export const rangeValidationSchema = Yup.object().shape({
  range: Yup.number()
    .typeError("Please enter a valid number")
    .required("This field is required")
    .min(0, "Number must be between 0 and 100")
    .max(100, "Number must be between 0 and 100"),
});

export const displayOrderValidationSchema = Yup.object().shape({
  displayOrder: Yup.number()
    .typeError("Please enter a valid number")
    .required("This field is required")
    .min(0, "Display order must be positive"),
});
