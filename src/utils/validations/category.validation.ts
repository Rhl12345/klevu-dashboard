import * as Yup from "yup";
export const CategorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters"),
  parentCategory: Yup.string(),
  description: Yup.string().trim(),
  status: Yup.string().required("Status is required"),
});
