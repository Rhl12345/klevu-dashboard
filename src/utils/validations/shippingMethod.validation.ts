import * as Yup from "yup";

export const shippingMethodSchema = Yup.object().shape({
  name: Yup.string().trim().required("Shipping Method name is required."),
  shippingVia: Yup.string().trim().required("Shipping Via is required."),
  charges: Yup.number().required("Shipping Method Charges is required."),
  shippingServicesId: Yup.number().required("Please Select Shipping Service."),
  recStatus: Yup.string().required("Status is required"),
});
