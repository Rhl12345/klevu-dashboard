import * as Yup from "yup";
 export const validationSchema = Yup.object().shape({
    corporateName: Yup.string()
      .required("Corporate Name is required")
      .max(50, "Corporate Name must be less than 100 characters"),
    departmentName: Yup.string().max(
      100,
      "Department Name must be less than 100 characters"
    ),
    address1: Yup.string()
      .required("Address 1 is required")
      .max(200, "Address must be less than 200 characters"),
    address2: Yup.string().max(200, "Address must be less than 200 characters"),
    suite: Yup.string().max(50, "Suite must be less than 50 characters"),
    city: Yup.string()
      .required("City is required")
      .max(20, "City must be less than 20 characters"),
    countryName: Yup.string().required("Country is required"),
    countryCode: Yup.string().max(
      8,
      "Country Code must be less than 8 characters"
    ),
    zipCode: Yup.string()
      .required("Postal Code is required")
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Postal Code cannot contain special characters or spaces"
      )
      .max(8, "Postal Code must be less than 8 characters"),
    state: Yup.string().required("State is required"),
    OtherState: Yup.string().when("state", {
      is: "Other",
      then: (schema) => schema.required("Other State is required"),
      otherwise: (schema) => schema.optional(),
    }),
    webSite: Yup.string()
      .url("Please enter a valid URL")
      .max(200, "Website URL must be less than 200 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    phone: Yup.string()
      .matches(/^[0-9-+()]*$/, "Please enter a valid phone number")
      .max(10, "Phone number must be less than 10 characters"),
    fax: Yup.string()
      .matches(/^[0-9-+()]*$/, "Please enter a valid fax number")
      .max(10, "Fax number must be less than 10 characters"),
  });
  export const validation = Yup.object().shape({
    logoPosition: Yup.string().required("Logo Position is required"),
    decorationType: Yup.string().required("Decoration Type is required"),
  });