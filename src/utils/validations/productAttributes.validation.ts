import * as Yup from "yup";

export const productAttributesSchema = Yup.object().shape({
  id: Yup.number(),
  createdBy: Yup.string()
    .required("Product Attributes Name is required")
    .trim(),
  DisplayOrder: Yup.string().required("Display Order is required"),
  name: Yup.string().required("Display Order is required"),
  TextPrompt: Yup.string().required("Text Prompt is required"),
});
