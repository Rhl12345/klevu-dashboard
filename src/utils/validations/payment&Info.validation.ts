import * as yup from "yup";

export const customFieldValidation = yup.object({
  fieldName: yup.string().required("Field Name is required"),
});

export const tierFeeValidation = yup.object({
    name: yup.string().required("Tier fee name is required."),
    from: yup.number().min(1, "Tier fee amount is required.").required("Tier fee amount is required."),
    to: yup.number()
      .min(1, "Tier fee amount is required.")
      .required("Tier fee amount is required.")
      .test("is-greater", "To value must be greater than From value", function (value) {
        const { from } = this.parent;
        return value > from; // Ensure 'to' is greater than 'from'
      }),
    fees: yup.number().min(1, "Tier fee is required").required("Tier fee is required"),
  }); 