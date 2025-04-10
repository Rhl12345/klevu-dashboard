import * as Yup from "yup";

export const productCustomFieldsTabValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  extraPrice: Yup.number().required("Extra Price is required"),
});
