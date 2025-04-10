import * as yup from "yup";
export const threadGroupColorOptionSchema = yup.object().shape({
  threadBrandName: yup.string().trim().required("Thread Brand is required"),
  groupColorValue: yup
    .string()
    .trim()
    .required("Group Color Value is required"),
  displayOrder: yup
    .number()
    .typeError('Please enter a valid Display Order').integer("Display Order must be a whole number")
    .required("Display Order is required")
    .min(1, "Display Order must be a positive number"),
});
