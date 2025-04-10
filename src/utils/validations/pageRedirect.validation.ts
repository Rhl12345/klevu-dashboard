import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  storeId: Yup.string().trim().required("Store Name is required"),
  oldUrl: Yup.string().trim().required("Old URL is required"),
  newUrl: Yup.string().trim().required("New URL is required"),
});
