import * as Yup from "yup";

export const ThreadBrandSchema = Yup.object().shape({
  logoGroupDescriptionId: Yup.number()
    .required("Group Description is required")
    .typeError("Please select a valid Group Description")
    .positive("Please select a valid Group Description")
    .min(1, "Please select a valid Group Description"),

  brandValue: Yup.string()
    .required("Brand Value is required")
    .min(2, "Brand Value must be at least 2 characters")
    .max(50, "Brand Value must not exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9\s-_]+$/,
      "Brand Value can only contain letters, numbers, spaces, hyphens and underscores"
    )
    .trim(),

  displayOrder: Yup.number()
    .required("Display Order is required")
    .typeError("Display Order must be a number")
    .integer("Display Order must be a whole number")
    .min(1, "Display Order must be greater than 0"),

  recStatus: Yup.string()
    .oneOf(["A", "I"], "Invalid status value")
    .default("A"),
});
