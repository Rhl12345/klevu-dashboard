import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  storeName: Yup.string()
    .trim()
    .required("Store Name is required")
    .min(2, "Store name must be at least 2 characters"),
  tierName: Yup.string()
    .trim()
    .required("Tier Name is required")
    .min(2, "Tier name must be at least 2 characters"),
  tier: Yup.number()
    .typeError("Tier must be a number")
    .required("Tier is required")
    .min(1, "Tier must be at least 1")
    .max(10000, "Tier cannot exceed 100"),
});

export const validationTierSchema = Yup.object().shape({
  tierName: Yup.string()
    .trim()
    .required("Tier Name is required")
    .min(2, "Tier name must be at least 2 characters"),
  tierValue: Yup.number()
    .typeError("Tier value must be a number")
    .required("Tier Value is required")
    .min(1, "Tier value must be at least 1")
    .max(10000, "Tier value cannot exceed 100"),
});
