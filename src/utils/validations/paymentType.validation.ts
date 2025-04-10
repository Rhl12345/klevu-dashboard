import * as Yup from "yup";

export const paymentTypeSchema = Yup.object().shape({
  name: Yup.string().trim().required("Payment type name is required."),
  isMultipleSelect: Yup.boolean().required("Multiple Select is required"),
  recStatus: Yup.string().required("Status is required"),
});
