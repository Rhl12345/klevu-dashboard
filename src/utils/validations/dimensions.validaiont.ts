import * as Yup from "yup";

const DimensionSchemaValidation = Yup.object().shape({
  name: Yup.string().trim().required("Dimension name is required."),
  categoryId: Yup.string().trim().required("Category is required."),
  length: Yup.number()
    .integer("Please enter a valid length.")
    .required("Length is required."),
  width: Yup.number()
    .integer("Please enter a valid width.")
    .required("Width is required."),
  height: Yup.number()
    .integer("Please enter a valid height.")
    .required("Height is required"),
  recStatus: Yup.string().trim().required("Status is required."),
});

export { DimensionSchemaValidation };
