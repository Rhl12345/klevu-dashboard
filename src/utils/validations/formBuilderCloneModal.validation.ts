import * as Yup from "yup";

export const formBuilderSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  formType: Yup.string().trim().required("Form Type is required"),
  programId: Yup.string().trim().required("Program Id is required"),
  url: Yup.string()
    .matches(
      /^$|^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "Enter valid URL"
    )
    .nullable()
    .transform((value) => value?.trim())
    .required("Url is required"),
});
