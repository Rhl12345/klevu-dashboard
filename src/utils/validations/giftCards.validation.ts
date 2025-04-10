import * as Yup from "yup";

export const giftCardSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  image: Yup.string().trim().required("Image is required"),
  ourSku: Yup.string()
    .trim()
    .required("SKU is required")
    .matches(
      /^[a-zA-Z0-9-]+$/,
      "SKU must be alphanumeric and can include dashes"
    ),
  endDate: Yup.date().required("End Date is required"),
  salePrice: Yup.number().required("Price is required"),
  recStatus: Yup.string().required("Status is required"),
});
