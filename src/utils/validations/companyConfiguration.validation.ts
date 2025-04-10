import * as Yup from "yup";
import {
  emailRegex,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
  phonePattern5,
} from "../regex.constant";
export const CompanyConfigurationSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full name is required."),
  shortName: Yup.string().trim().required("Short name is required."),
  email: Yup.string()
    .trim()
    .required("Email is required.")
    .test("email-test", "Enter valid email", (value) => {
      if (emailRegex.test(value || "")) {
        return true;
      }

      return false;
    }),
  phone: Yup.string()
    .trim()
    .required("Phone number is required.")
    .test("phone-test", "Enter valid phone number", (value) => {
      if (
        phonePattern1.test(value || "") ||
        phonePattern2.test(value || "") ||
        phonePattern3.test(value || "") ||
        phonePattern4.test(value || "") ||
        phonePattern5.test(value || "")
      ) {
        return true;
      }
      return false;
    })
    .max(50, "Phone Number exceeds the maximum limit of 50 characters. "),
  companyLogo: Yup.string().trim().required("Company logo is required."),
  logout: Yup.string().trim().required("Logout time is required."),
});
