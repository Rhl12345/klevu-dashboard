import * as Yup from "yup";

export const moduleValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  navigationurl: Yup.string().trim().required("Navigation URL is required"),
  accesscode: Yup.string().trim(),
  menuicon: Yup.string().trim(),
  accessRightModuleId: Yup.string().trim(),
});

export const navigationValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  menuicon: Yup.string().trim(),
  parentModuleId: Yup.string().trim(),
  recStatus: Yup.string().trim().required("Status is required"),
});
