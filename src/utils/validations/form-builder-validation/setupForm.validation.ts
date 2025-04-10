import * as Yup from "yup";

export const setupFormValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  url: Yup.string().trim().required("Url is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .when("isReceiveEmail", {
      is: true,
      then: (schema) => schema.required("Email is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  ccEmail: Yup.string().trim().email("Invalid email format"),
  bccEmail: Yup.string().trim().email("Invalid email format"),
  formLength: Yup.string().trim().required("Form Length is required"),
  openDate: Yup.string().trim().required("Start Date is required"),
  noEndDate: Yup.boolean(),
  closeDate: Yup.string()
    .trim()
    .when("noEndDate", {
      is: false,
      then: (schema) => schema.required("End Date is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  formLogoPath: Yup.string().trim().required("Form Logo is required"),

  shippingAddresses: Yup.array().of(
    Yup.object().shape({
      addressTitle: Yup.string()
        .trim()
        .when("payBusinessMethodId", (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("Address Title is required")
            : schema.notRequired()
        ),
      shipFirstName: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("FirstName is required")
            : schema.notRequired()
      ),
      shipLastName: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("LastName is required")
            : schema.notRequired()
      ),
      shipCompany: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("Company is required")
            : schema.notRequired()
      ),
      shipAddress1: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("Address1 is required")
            : schema.notRequired()
      ),
      shipAddress2: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) => schema.notRequired()
      ),
      shipCity: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("City is required")
            : schema.notRequired()
      ),
      shipState: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("State is required")
            : schema.notRequired()
      ),

      shipZipcode: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("Zipcode is required")
            : schema.notRequired()
      ),
      shipCountry: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema.required("Country is required")
            : schema.notRequired()
      ),
      shipPhone: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema
                .required("Phone is required")
                .max(10, "10 digits allowed")
                .min(10, "10 digits allowed")
            : schema.notRequired()
      ),
      shipEmail: Yup.string().when(
        "payBusinessMethodId",
        (payBusinessMethodId, schema) =>
          [1, 0, 3].includes(Number(payBusinessMethodId))
            ? schema
                .email("Invalid email address")
                .required("Email is required")
            : schema.notRequired()
      ),
    })
  ),
});
