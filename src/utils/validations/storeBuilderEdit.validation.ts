import * as Yup from "yup";

export const taxesFeesValidationSchema = Yup.object().shape({
  cardProcessingCharge: Yup.number().when(
    ["isDisplayFeesInformation"],
    ([isDisplayFeesInformation], schema) => {
      return isDisplayFeesInformation === true
        ? schema
            .required("Convenience Fee is required")
            .min(0, "Minimum 0")
            .max(100, "Maximum 100")
        : schema.optional();
    }
  ),
});

export const feeModalValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  type: Yup.number().required("Type is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than 0")
    .when("type", {
      is: 1,
      then: (schema) => schema.max(100, "Amount must be less than 100"),
      otherwise: (schema) => schema,
    }),
});

export const couponModalValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  type: Yup.string().trim().required("Type is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than 0")
    .when("type", {
      is: "1",
      then: (schema) => schema.max(100, "Amount must be less than 100"),
      otherwise: (schema) => schema,
    }),
});
