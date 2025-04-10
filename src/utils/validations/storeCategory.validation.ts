import * as Yup from "yup";
const StoreCategoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
    displayOrder: Yup.number()
      .required("Display Order is required")
      .positive("Display Order must be a positive number"),
    recStatus: Yup.string().required("Category Status is required"),
    customCollectionUrl: Yup.string().required("Custom Collection URL is required"),
    seName: Yup.string().required("SEO Name is required"),
    parentCategory: Yup.string().required("Parent Category is required"),
  });

export default StoreCategoryValidationSchema;