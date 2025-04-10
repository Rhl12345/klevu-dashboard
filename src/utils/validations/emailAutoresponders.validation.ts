import * as yup from "yup";
import { emailRegex } from "../regex.constant";
export const EmailAutorespondersSchema = yup.object().shape({
  id: yup.number(),
  label: yup.string().trim().required("Email Template label is required."),
  subject: yup.string().trim().required("Subject is required."),
  emailBody: yup.string().trim().required("Email body is required."),
  emailFrom: yup
    .string()
    .trim()
    .required("Email from is required.")
    .test("email-test", "Enter valid email", (value) => {
      if (emailRegex.test(value || "")) {
        return true;
      }

      return false;
    }),
  store: yup.string().trim().required("Store Name is required."),
});
