import * as Yup from "yup";

export const storyCategorySchema = Yup.object().shape({
  category: Yup.string().trim().required("Category is required."),
});
