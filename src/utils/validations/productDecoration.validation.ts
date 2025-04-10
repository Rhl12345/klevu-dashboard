import * as Yup from "yup";

const ProductDecorationValidationSchema = Yup.object({
  description: Yup.string().trim().required("Logo Name is required"),
  logoTypeId: Yup.string().trim().required("Logo Type is required"),
});

export { ProductDecorationValidationSchema };
