import * as Yup from "yup";

export const themeConfigurationValidationSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email format"),
  phone: Yup.string().min(10, "10 digits allowed").max(10, "10 digits allowed"),
  customElements: Yup.object().shape({
    "--tw-theme-btn-primary-color": Yup.string().required(
      "This field is required"
    ),
    "--tw-theme-btn-primary-text-color": Yup.string().required(
      "This field is required"
    ),
    "--tw-theme-btn-secondary-color": Yup.string().required(
      "This field is required"
    ),
    "--tw-theme-btn-secondary-text-color": Yup.string().required(
      "This field is required"
    ),
  }),
  custom: Yup.boolean().required("Custom field must be defined"),
});

export const defaultThemeConfigurationValidationSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email format"),
  phone: Yup.string().min(10, "10 digits allowed").max(10, "10 digits allowed"),
});
