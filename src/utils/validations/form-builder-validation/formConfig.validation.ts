import * as Yup from "yup";

export const bannerImageValidationSchema = Yup.object().shape({
  bannerImage: Yup.mixed().required("Banner image is required"),
});
