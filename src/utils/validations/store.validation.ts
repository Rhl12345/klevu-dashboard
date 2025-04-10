import * as Yup from "yup";
import {
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

const StoreConfigurationSchema = Yup.object().shape({
  // Store Info
  storeTypeId: Yup.number()
    .min(1, "Store type is required")
    .required("Store type is required"),
  name: Yup.string().trim().required("Store name is required"),
  code: Yup.string().trim().required("Store code is required"),
  url: Yup.string().trim().required("Store URL is required"),
  navCode: Yup.string().trim().required("Navigation code is required"),
  prefix: Yup.string().trim().required("Prefix is required"),
  billToCustomer: Yup.string().trim(),
  orderPlaceCountryList: Yup.array()
    .of(Yup.string())
    .min(1, "At least one Order Place Country is required"),
  justInDays: Yup.number()
    .min(0, "Just in days must be positive")
    .typeError("Please enter valid input"),

  // Login Type - At least one login type should be true
  generalLogin: Yup.boolean(),
  thirdPartyLogin: Yup.boolean(),
  bothLogin: Yup.boolean(),
  onlyGuestLogin: Yup.boolean(),

  // Payment Options
  paymentOption: Yup.object(),

  // Shipping Charges
  shippingChargeType: Yup.string().required("Shipping charge type is required"),

  shippingServiceId: Yup.array()
    .of(Yup.string())
    .min(1, "At least one shipping service is required"),
  shippingMethodId: Yup.array()
    .of(Yup.string())
    .min(1, "At least one shipping method is required"),

  isFreeShipping: Yup.boolean(),
  generalAmount: Yup.number()
    .min(0, "Amount must be positive")
    .typeError("Please enter valid input")
    .required("Amount is required"),

  // Logo Related
  firstLogoCharge: Yup.number()
    .min(0, "Logo charge must be positive")
    .typeError("Please enter valid logo charge")
    .required("First Logo charge is required"),
  secondLogoCharge: Yup.number()
    .min(0, "Logo charge must be positive")
    .typeError("Please enter valid logo charge number")
    .required("Second Logo charge is required"),

  // Domain Based Login
  domainBasedLoginDesc: Yup.string()
    .trim()
    .when("domainBasedLogin", {
      is: true,
      then: (schema) =>
        schema.required("Domain based login description is required"),
    }),

  // Sew Out
  sewOutCharges: Yup.number()
    .min(0, "Sew out charges must be positive")
    .typeError("Please enter valid sew out charge")
    .required("SewoutCharge is required"),

  // Logo Setup
  logoSetupCharges: Yup.number()
    .min(0, "setup charge must be positive charge")
    .typeError("please enter valid Logo setup charge")
    .required("Logo setup charge is required"),

  // Line Personalization
  firstLineCharges: Yup.number().when("isLinepersonalization", {
    is: true,
    then: (schema) => schema.min(0, "First line charges must be positive"),
  }),
  secondLineCharges: Yup.number().when("isLinepersonalization", {
    is: true,
    then: (schema) => schema.min(0, "Second line charges must be positive"),
  }),

  // Small Run
  smallRunLimit: Yup.number().when("isSmallRun", {
    is: true,
    then: (schema) => schema.min(1, "Small run limit must be positive"),
  }),
  smallRunFeesCharges: Yup.number().when("isSmallRun", {
    is: true,
    then: (schema) => schema.min(0, "Small run fees must be positive"),
  }),
});

export const storeFormSchema = Yup.object().shape({
  businessName: Yup.string().trim().required("Business Name is required"),
  businessCategory: Yup.string()
    .trim()
    .required("Business Category is required"),
  storeDisplayName: Yup.string()
    .trim()
    .required("Store Display Name is required"),
  programId: Yup.string().trim(),
  email: Yup.string()
    .trim()
    .required("Email is required.")
    .test("email-test", "Enter valid email", (value) => {
      if (emailRegex.test(value || "")) {
        return true;
      }
      return false;
    }),
  storeLogo: Yup.mixed()
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
  emailLogo: Yup.mixed()
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
  jobTitle: Yup.string().trim().required("Job title is required"),
  department: Yup.string().trim().required("Department is required"),
  company: Yup.string().trim().required("Company is required"),
  storeOwnerEmail: Yup.string()
    .trim()
    .required("Email is required.")
    .test("email-test", "Enter valid email", (value) => {
      if (emailRegex.test(value || "")) {
        return true;
      }
      return false;
    }),

  streetAddress: Yup.string().trim().required("Street Address is required"),
  aptSuite: Yup.string().trim(),
  zipCode: Yup.string().trim().required("Zip code is required"),
  storeCity: Yup.string().trim().required("City is required"),
  storeOwnerCountry: Yup.string().trim().required("Country is required"),
  storeOwnerState: Yup.string().trim().required("State is required"),
  storeOwnerFirstName: Yup.string().trim().required("First Name is required"),
  storeOwnerLastName: Yup.string().trim().required("Last Name is required"),
  storeName: Yup.string().trim().required("Store Name is required"),
  domainTypeId: Yup.string().trim().required("Domain Type is required"),
  isPasswordProtected: Yup.boolean(),
  password: Yup.string()
    .trim()
    .when("isPasswordProtected", {
      is: true,
      then: (schema) =>
        schema
          .trim()
          .required("New password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            passwordUpperCaseCheck,
            "Password must contain at least one uppercase letter"
          )
          .matches(
            passwordLowerCaseCheck,
            "Password must contain at least one lowercase letter"
          )
          .matches(
            passwordNumberCheck,
            "Password must contain at least one number"
          ),
    }),
  salesPerson: Yup.string().trim().required("Please select sales person"),
  teamName: Yup.string().trim(),
  accessUrl: Yup.string().trim().required("Access URL is required"),
  bcCustomerId: Yup.string().trim(),
  bcLocationCode: Yup.string().trim(),
  estShipDate: Yup.date(),
  followUpDays: Yup.string().trim().required("Follow up days is required"),
  storePhone: Yup.string()
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

export { StoreConfigurationSchema };
