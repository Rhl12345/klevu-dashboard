import * as Yup from "yup";

export const createQuoteValidationSchema = Yup.object().shape({
  storeId: Yup.string().trim().required("Store is required"),
  customerName: Yup.string().trim().required("Customer name is required"),
  products: Yup.array().min(1, "At least one product is required"),
  expiryDate: Yup.date().required("Expiry date is required"),
});

export const addNewProductValidationSchema = Yup.object().shape({
  otfItemNo: Yup.string().trim(),
  otfItemVariant: Yup.string().trim(),
  name: Yup.string().trim().required("Name is required"),
  sku: Yup.string().trim().required("SKU is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Must be greater than 0"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Must be greater than or equal to 0"),
  color: Yup.string().trim(),
  size: Yup.string().trim(),
});
