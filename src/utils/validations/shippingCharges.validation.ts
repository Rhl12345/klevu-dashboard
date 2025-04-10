import * as Yup from "yup";

const ShippingChargesSchemaValidation = Yup.object().shape({
  charge: Yup.number()
    .typeError("Please enter a valid amount")
    .required("Shipping Charge is required")
    .min(0, "Shipping Charge must be positive"),
  orderTotalMin: Yup.number()
    .typeError("Please enter a valid amount")
    .required("Order Total Minimum is required")
    .min(0, "Order Total Minimum must be positive"),
  orderTotalMax: Yup.number()
    .typeError("Please enter a valid amount")
    .required("Order Total Maximum is required")
    .min(0, "Order Total Maximum must be positive"),
  storeId: Yup.string().trim().required("Please select a store."),
});

export { ShippingChargesSchemaValidation };
