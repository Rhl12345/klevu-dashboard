import * as Yup from "yup";
const ColorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .max(60, "Name must be at most 60 characters"),

  hexCode: Yup.string()
    .trim()
    .required("Hex code is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex code format"),

  borderColor: Yup.string()
    .trim()
    .required("Border color is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex code format"),

  textColor: Yup.string()
    .trim()
    .required("Text color is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex code format"),

  displayOrder: Yup.number()
    .required("Display order is required")
    .integer("Display order must be an integer")
    .min(0, "Display order must be a positive number"),

  recStatus: Yup.string(),
});

export { ColorValidationSchema };
