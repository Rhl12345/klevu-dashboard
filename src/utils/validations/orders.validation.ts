import * as Yup from "yup";

export const customerNotesValidation = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
});
