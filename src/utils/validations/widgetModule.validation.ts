import * as Yup from "yup";

export const WidgetModuleValidationSchema = Yup.object().shape({
  widget: Yup.string()
    .required("Widget is required")
    .trim()
    .min(1, "Widget cannot be empty"),
  modules: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one module must be selected")
    .required("Modules are required"),
});
