import * as Yup from "yup";
import {
  domainRegex,
  emailRegex,
  passwordLowerCaseCheck,
  passwordNumberCheck,
  passwordUpperCaseCheck,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
  phonePattern5,
} from "../regex.constant";

export const adminThemeValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  thirdPartyServiceId: Yup.string()
    .trim()
    .required("Third Party Service is required"),
  username: Yup.string().trim(),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordUpperCaseCheck,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      passwordLowerCaseCheck,
      "Password must contain at least one lowercase letter"
    )
    .matches(passwordNumberCheck, "Password must contain at least one number")
    .required("New password is required"),
  url: Yup.string()
    .trim()
    .matches(domainRegex, "Please enter a valid domain (e.g., example.com)")
    .max(253, "Domain name cannot exceed 253 characters"),
  redirectUrlToSite: Yup.string()
    .trim()
    .matches(domainRegex, "Please enter a valid domain (e.g., example.com)")
    .max(253, "Domain name cannot exceed 253 characters"),
  thankYouPageUrl: Yup.string()
    .trim()
    .matches(domainRegex, "Please enter a valid domain (e.g., example.com)")
    .max(253, "Domain name cannot exceed 253 characters"),
  storeId: Yup.string().trim().required("Store Name is required"),
  recStatus: Yup.string().trim().required("Status is required"),
  key: Yup.string().trim(),
  secretkey: Yup.string().trim(),
  source: Yup.string().trim(),
  certificate: Yup.string().trim(),
  description: Yup.string().trim(),
});

export const storeValidationSchema = Yup.object().shape({
  storeName: Yup.string().required("Store name is required."),
  domainTypeId: Yup.string().required("Please select a domain type"),
});

export const themeValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .test("phone-test", "Enter valid phone number", (value) => {
      if (
        phonePattern1.test(value || "") ||
        phonePattern2.test(value || "") ||
        phonePattern3.test(value || "") ||
        phonePattern4.test(value || "") ||
        phonePattern5.test(value || "")
      ) {
        return true;
      }
      return false;
    })
    .max(50, "Phone Number exceeds the maximum limit of 50 characters. "),
  email: Yup.string()
    .trim()
    .test("email-test", "Enter valid email", (value) => {
      if (emailRegex.test(value || "")) {
        return true;
      }

      return false;
    }),
  backgroundColor: Yup.string().when("theme", {
    is: "custom",
    then: (schema) => schema.required("Background color is required"),
  }),
  textColor: Yup.string().when("theme", {
    is: "custom",
    then: (schema) => schema.required("Text color is required"),
  }),
});
