import * as Yup from "yup";
import {
  phonePattern1,
  phonePattern5,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from "../regex.constant";

export const editAddressValidationSchema = Yup.object({
  storeId: Yup.string().trim().required("Store ID is required"),
  firstname: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  companyName: Yup.string().trim().required("Company name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  recStatus: Yup.string().trim().required("Status is required"),
});

export const addAddressValidationSchema = Yup.object({
  address1: Yup.string().trim().required("Address is required"),
  firstname: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
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
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  OtherState: Yup.string()
    .trim()
    .when("state", {
      is: "Other",
      then: () => Yup.string().trim().required("State is required"),
      otherwise: () => Yup.string(),
    }),
  countryName: Yup.string().trim().required("Country is required"),
  postalCode: Yup.string()
    .trim()
    .required("Postal code is required")
    .max(6, "Postal code must be at most 6 characters"),
  fax: Yup.string()
    .trim()
    .nullable()
    .max(15, "Fax must be at most 15 characters"),
  countryCode: Yup.string()
    .trim()
    .nullable()
    .max(3, "Country code must be at most 3 characters"),
});

export const ChangePassWordValidations = Yup.object().shape({
  currentPassword: Yup.string().trim().required("Current password is required"),
  newPassword: Yup.string()
    .trim()
    .test("setpassword", "New password is required", function (value) {
      return true;
    })
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must not exceed 25 characters"),
  confirm_password: Yup.string()
    .trim()
    .test("setpassword", "Please confirm your password", function (value) {
      return true;
    })
    .when(["newPassword"], ([newPassword], schema) => {
      return newPassword
        ? schema.oneOf([newPassword], "Passwords must match")
        : schema;
    }),
});

export const createCustomerValidationSchema = Yup.object({
  storeId: Yup.string().trim().required("Store is required"),
  firstname: Yup.string().trim().required("First Name is required"),
  lastName: Yup.string().trim().required("Last Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  // tierId: Yup.string().trim().required(ValidationMsgs.customer.tierRequired),
  companyName: Yup.string().trim().required("Company Name is required"),
  recStatus: Yup.string().trim().required("Rec Status is required"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .trim()
    .required("Confirm Password is required")
    .when("password", (values: any[], schema: any) =>
      values[0] && values[0].length > 0
        ? schema.oneOf([Yup.ref("password")], "Confirm Password does not match")
        : schema
    ),
  customerAddress: Yup.array().of(
    Yup.object().shape({
      address1: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("Address is required")
            : schema
        ),
      firstname: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("First Name is required")
            : schema
        ),
      lastName: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("Last Name is required")
            : schema
        ),
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("Email is required")
            : schema
        ),
      phone: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("Phone is required")
            : schema
        )
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
        }),
      city: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("City is required")
            : schema
        ),
      state: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("State is required")
            : schema
        ),
      OtherState: Yup.string()
        .trim()
        .when(["addressType", "state"], (values: any[], schema: any) => {
          if (
            (values[0] !== "S" || !values[1]?.sameAsShipping) &&
            values[1] === "Other"
          ) {
            return schema.required("Other State is required");
          }
          return schema;
        }),
      countryName: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("Country is required")
            : schema
        ),
      postalCode: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.required("Postal Code is required")
            : schema
        ),
      fax: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.nullable().max(15, "Fax Length")
            : schema
        ),
      countryCode: Yup.string()
        .trim()
        .when("addressType", (values: any, schema: any) =>
          values !== "S" || !values.sameAsShipping
            ? schema.nullable().max(3, "Country Code Length")
            : schema
        ),
    })
  ),
});
export const createCustomerTierValidationSchema = Yup.object({
  brandId: Yup.string().trim().required("BrandId is Required"),
  vendorId: Yup.string().trim().required("VendorId is Required"),
  tierId: Yup.string().trim().required("TierId is Required"),
  // mainTierId: Yup.string().trim().required(ValidationMsgs.customer.tierRequired)
});

export const editCustomLogoValidationSchema = Yup.object().shape({
  logoPosition: Yup.string().required("Logo position is required"),
  decorationType: Yup.string().required("Decoration type is required"),
  logo: Yup.mixed()
    .required("Logo is required")
    .test("fileFormat", "Only image files are allowed", (value: any) => {
      if (!value) return false;
      const supportedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      return supportedFormats.includes(value?.type);
    }),
});

export const creditInfoValidationSchema = Yup.object({
  creditAmount: Yup.number().required("Credit amount is required"),
  reason: Yup.string().trim().required("Reason is required"),
});

export const notesValidationSchema = Yup.object({
  notes: Yup.string().trim().required("Notes is required"),
});

export const paymentOptionsValidationSchema = Yup.object({
  poNumber: Yup.string()
    .trim()
    .when("isGeneralPo", {
      is: (isGeneralPo: boolean) => isGeneralPo === false,
      then: (schema) => schema.required("PO Number is required"),
      otherwise: (schema) => schema,
    }),

  amount: Yup.number().when("isGeneralPo", {
    is: (isGeneralPo: boolean) => isGeneralPo === false,
    then: (schema) => schema.required("Amount is required"),
    otherwise: (schema) => schema,
  }),
});

export const exportCreditValidationSchema = Yup.object({
  storeId: Yup.string().trim().required("Store is required"),
});

export const importCreditValidationSchema = Yup.object({
  storeId: Yup.string().trim().required("Store is required"),
});

export const resendEmailValidationSchema = Yup.object().shape({
  from: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  toEmail: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string().trim().required("Subject is required"),
  body: Yup.string().trim().required("Body is required"),
});
