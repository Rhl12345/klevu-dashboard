import * as Yup from "yup";

const MailLogValidationSchema = Yup.object().shape({
  fromEmail: Yup.string()
    .trim()
    .email("Invalid email")
    .required("From Email is required"),
  toEmail: Yup.string()
    .trim()
    .email("Invalid email")
    .required("To Email is required"),
  subject: Yup.string().trim().required("Subject is required"),
  body: Yup.string().trim().required("Body is required"),
  storeEmailLogo: Yup.mixed(),
});

export { MailLogValidationSchema };
