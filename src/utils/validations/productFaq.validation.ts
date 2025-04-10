import * as Yup from "yup";

export const faqSchema = Yup.object().shape({
  question: Yup.string().trim().required("Question is required"),
  answer: Yup.string().trim().required("Answer is required"),
});
