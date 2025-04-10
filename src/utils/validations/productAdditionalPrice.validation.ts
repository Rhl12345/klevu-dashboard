import * as Yup from "yup";
 export const productAdditionalPriceValidationSchema =Yup.object({
    name: Yup.string().required("Name is required"),
    amount: Yup.number().required("Amount is required"),
  })
