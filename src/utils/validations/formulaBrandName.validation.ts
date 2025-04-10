import * as Yup from "yup";
import { RecStatusValueName } from "../constants";

export const validationSchema = Yup.object().shape({
  storeId: Yup.string().trim().required("Store Name is required"),
  brandName: Yup.string()
    .trim()
    .required("Brand Name is required")
    .max(100, "Brand Name must be at most 100 characters"),
  brandReplace: Yup.string()
    .trim()
    .required("Brand Replace is required")
    .max(100, "Brand Replace must be at most 100 characters"),
  splitName: Yup.string()
    .trim()
    .required("Split Name is required")
    .max(100, "Split Name must be at most 100 characters"),
  replaceCharacter: Yup.string()
    .trim()
    .required("Replace Character is required")
    .max(100, "Replace Character must be at most 100 characters"),
  recStatus: Yup.string()
    .trim()
    .required("Brand Name Formula Status is required")
    .oneOf(
      [RecStatusValueName.Active, RecStatusValueName.Inactive],
      "Invalid status"
    ),
  isDefault: Yup.boolean(),
});
