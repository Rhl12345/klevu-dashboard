import * as Yup from "yup";

export const sizeMasterValidationSchema = Yup.object().shape({
    productType: Yup.string().trim().required("Product Type is required"),
    displayOrder: Yup.string().trim().required("Display Order is required"),
  });


export const sizeValidationSchema = Yup.object().shape({
  sizeName: Yup.string().trim().required("Size Name is required"),
  displayOrder: Yup.string().trim().required("Display Order is required"),
  status: Yup.string().trim().required("Status is required"),
});