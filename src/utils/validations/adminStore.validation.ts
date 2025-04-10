import * as yup from "yup";

export const validationSchema = yup.object().shape({
  storeName: yup.string().required("Store name is required."),
});

export const threadInfoValidationSchema = yup.object({
  threadBrand: yup.string().trim().required("Thread Brand is required"),
  colorsAndComments: yup.array().of(
    yup.object({
      color: yup.string().trim().required("Color is required"),
      comment: yup.string().trim().required("Comment is required"),
    })
  ),
});
