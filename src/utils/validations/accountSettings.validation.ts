import * as Yup from "yup";
import { domainRegex } from "../regex.constant";

export const settingValidationSchema = Yup.object().shape({
  // Optional fields with basic type checking
  passwordStrengthType: Yup.string().nullable(),
  resetPasswordType: Yup.number().nullable(),
  restrictUsedPasswordType: Yup.number().nullable(),
  isOneTimePasswordEnabled: Yup.boolean().nullable(),
  twoStepVerificationType: Yup.number().nullable(),

  // Required validations
  resetPasswordDays: Yup.number().when(
    "resetPasswordType",
    (resetPasswordType, schema) => {
      const type = Array.isArray(resetPasswordType)
        ? resetPasswordType[0]
        : resetPasswordType;
      return type === 2
        ? schema
            .min(1, "Password reset days must be at least 1")
            .max(365, "Password reset days cannot exceed 365")
            .integer("Password reset days must be a whole number")
            .required("Please enter the number of days")
        : schema.nullable();
    }
  ),

  restrictUsedPasswordCount: Yup.number().when(
    "restrictUsedPasswordType",
    (restrictUsedPasswordType, schema) => {
      const type = Array.isArray(restrictUsedPasswordType)
        ? restrictUsedPasswordType[0]
        : restrictUsedPasswordType;
      return type === 2
        ? schema
            .min(1, "Previous password count must be at least 1")
            .max(20, "Previous password count cannot exceed 20")
            .integer("Previous password count must be a whole number")
            .required(
              "Please enter the number of previous passwords to restrict"
            )
        : schema.nullable();
    }
  ),

  domain: Yup.string()
    .trim()
    .matches(domainRegex, "Please enter a valid domain (e.g., example.com)")
    .max(253, "Domain name cannot exceed 253 characters"),
});
