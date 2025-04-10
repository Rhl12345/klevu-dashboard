import * as Yup from "yup";
import { OG_TAGS_FIELD_CONSTRAINS } from "@/utils/constants";

const imageValidation = Yup.mixed<File | string>()
  .nullable()
  .test("fileSize", "File size must be less than 5MB", (value) => {
    if (!value || typeof value === "string") return true;
    return value.size <= OG_TAGS_FIELD_CONSTRAINS.image; // 5MB
  })
  .test("fileType", "Supported formats: JPG, PNG, WEBP", (value) => {
    if (!value || typeof value === "string") return true;
    return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
      value.type
    );
  });

const socialMediaFields = {
  title: Yup.string()
    .trim()
    .max(
      OG_TAGS_FIELD_CONSTRAINS.title,
      `Title must be less than ${OG_TAGS_FIELD_CONSTRAINS.title} characters`
    )
    .optional(),
  description: Yup.string()
    .trim()
    .max(
      OG_TAGS_FIELD_CONSTRAINS.description,
      `Description must be less than ${OG_TAGS_FIELD_CONSTRAINS.description} characters`
    )
    .optional(),
  image: imageValidation,
};

const headerTagFields = {
  h1: Yup.string().trim(),
  h2: Yup.string().trim(),
  h3: Yup.string().trim(),
  h4: Yup.string().trim(),
  h5: Yup.string().trim(),
  h6: Yup.string().trim(),
};

export const seoStoreValidationSchema = Yup.object({
  pageUrl: Yup.string().trim().required("Page URL is required"),
  pageTitle: Yup.string().trim().required("Page Title is required"),
  metaDescription: Yup.string().trim().required("Meta Description is required"),
  metaKeywords: Yup.string().trim().required("Meta Keywords are required"),
  roiKeywords: Yup.string().trim(),
  targetedKeywords: Yup.string().trim(),
  ...headerTagFields,
  social: Yup.object().shape({
    ogTags: Yup.object().shape(socialMediaFields),
    facebook: Yup.object().shape(socialMediaFields),
    twitter: Yup.object().shape(socialMediaFields),
    linkedin: Yup.object().shape(socialMediaFields),
    pinterest: Yup.object().shape(socialMediaFields),
  }),
});
