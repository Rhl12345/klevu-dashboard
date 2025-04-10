import * as Yup from "yup";

export const personalDetailsValidationSchema = Yup.object().shape({
  store: Yup.string().required("Store is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  bcCustomerId: Yup.string().optional(), // Optional field

  // Billing Info
  billingFirstName: Yup.string().required("Billing First Name is required"),
  billingLastName: Yup.string().required("Billing Last Name is required"),
  billingCompanyName: Yup.string().optional(), // Optional field
  billingAddress1: Yup.string().required("Billing Address 1 is required"),
  billingAddress2: Yup.string().optional(), // Optional field
  billingSuite: Yup.string().optional(), // Optional field
  billingCity: Yup.string().required("Billing City is required"),
  billingCountry: Yup.string().required("Billing Country is required"),
  billingCountryCode: Yup.string().required("Billing Country Code is required"),
  billingState: Yup.string().required("Billing State is required"),
  billingPostalCode: Yup.string().required("Billing Postal Code is required"),
  billingEmail: Yup.string().email("Invalid email").optional(), // Optional field
  billingPhone: Yup.string().optional(), // Optional field
  billingFax: Yup.string().optional(), // Optional field

  // Shipping Info
  shippingFirstName: Yup.string().required("Shipping First Name is required"),
  shippingLastName: Yup.string().required("Shipping Last Name is required"),
  shippingCompanyName: Yup.string().optional(), // Optional field
  shippingAddress1: Yup.string().required("Shipping Address 1 is required"),
  shippingAddress2: Yup.string().optional(), // Optional field
  shippingSuite: Yup.string().optional(), // Optional field
  shippingCity: Yup.string().required("Shipping City is required"),
  shippingCountry: Yup.string().required("Shipping Country is required"),
  shippingCountryCode: Yup.string().required("Shipping Country Code is required"),
  shippingState: Yup.string().required("Shipping State is required"),
  shippingPostalCode: Yup.string().required("Shipping Postal Code is required"),
  shippingEmail: Yup.string().email("Invalid email").optional(), // Optional field
  shippingPhone: Yup.string().optional(), // Optional field
  shippingFax: Yup.string().optional(), // Optional field
}); 