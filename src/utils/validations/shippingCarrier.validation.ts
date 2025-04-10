import * as Yup from "yup";

export const shippingCarrierSchema = Yup.object().shape({
  name: Yup.string().trim().required("Shipping Carrier name is required."),
  url: Yup.string()
    .matches(
      /^$|^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "Enter valid URL"
    )
    .nullable()
    .transform((value) => value?.trim() || null),
  recStatus: Yup.string().required("Status is required"),
});
