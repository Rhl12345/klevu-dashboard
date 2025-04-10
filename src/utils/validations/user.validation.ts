import * as Yup from "yup";

export const UserSchema = Yup.object().shape({
  adminUserViewModel: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string()
          .required("First name is required")
          .min(2, "First name must be at least 2 characters")
          .max(50, "First name must be less than 50 characters"),
        lastName: Yup.string()
          .required("Last name is required")
          .min(2, "Last name must be at least 2 characters")
          .max(50, "Last name must be less than 50 characters"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required")
          .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "Invalid email format"
          ),
        phone: Yup.string()
          .required("Phone is required")
          .matches(
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            "Invalid phone number format"
          ),
        reportingTo: Yup.number()
          .required("Reporting to is required")
          .min(1, "Please select a valid reporting manager"),
        isSuperUser: Yup.boolean(),
        role: Yup.string().when("isSuperUser", {
          is: false,
          then: (schema) => schema.required("Role is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    )
    .min(1, "At least one user is required"),
});

export const CloneValidationSchema = Yup.object({
  firstname: Yup.string().trim().required("First name is required"),
  lastname: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Phone number must be a valid format"
    ),
});
