import * as Yup from "yup";

export const companyValidationSchema = Yup.object().shape({
  corporateName: Yup.string().required("Corporate Name is required"),
  departmentName: Yup.string().required("Department Name is required"),
  address1: Yup.string().required("Address 1 is required"),
  address2: Yup.string(),
  suite: Yup.string(),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  countryCode: Yup.string().required("Country Code is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  state: Yup.string().required("State is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  fax: Yup.string(),
});
