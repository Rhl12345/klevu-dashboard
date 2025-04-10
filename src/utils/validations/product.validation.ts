import * as Yup from "yup";

export const editInventoryValidationSchema = Yup.object().shape({
  quantity: Yup.number().min(0, "Quantity must not be negative").optional(),
  futureInventory: Yup.array().of(
    Yup.object().shape({
      date: Yup.date()
        .min(new Date(), "Future Inventory Date must be in the future")
        .optional()
        .nullable(),
      quantity: Yup.number()
        .min(0, "Future Inventory Quantity must not be negative")
        .optional(),
    })
  ),
});
