import { OG_TAGS_FIELD_CONSTRAINS } from "@/utils/constants";
import * as Yup from "yup";

// Common validation schemas
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
  url: Yup.string().trim().optional(),
};

export const StoreConfigureSeoSchema = Yup.object().shape({
  // ===================> General tab schema start <===================

  // Common Tags
  commonTags: Yup.object().shape({
    headCode: Yup.string().trim().optional(),
    bodyCode: Yup.string().trim().optional(),
  }),

  // Google Analytics
  googleAnalytics: Yup.object().shape({
    enabled: Yup.boolean().required(),
    tagId: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) =>
          schema.required("Google Analytics tag ID is required"),
        otherwise: (schema) => schema.optional(),
      }),
  }),

  // Google Tag Manager Section
  googleTagManager: Yup.object().shape({
    enabled: Yup.boolean().required(),
    gtmCode: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) =>
          schema.required("Google Tag Manager code is required"),
        otherwise: (schema) => schema.optional(),
      }),
  }),

  // Facebook Pixel Section
  facebookPixel: Yup.object().shape({
    enabled: Yup.boolean().required(),
    pixelId: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) => schema.required("Facebook Pixel ID is required"),
        otherwise: (schema) => schema.optional(),
      }),
  }),

  // Pinterest Section
  pinterest: Yup.object().shape({
    enabled: Yup.boolean().required(),
    headCode: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) =>
          schema.required("Pinterest head code is required when enabled"),
        otherwise: (schema) => schema.optional(),
      }),
    htmlVerificationCode: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) =>
          schema.required(
            "Pinterest verification code is required when enabled"
          ),
        otherwise: (schema) => schema.optional(),
      }),
  }),

  // Affiliate Conversion Section
  affiliateConversion: Yup.object().shape({
    enabled: Yup.boolean().required(),
    connection: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) =>
          schema.required(
            "Affiliate conversion connection is required when enabled"
          ),
        otherwise: (schema) => schema.optional(),
      }),
  }),

  // ===================> General tab schema end <===================

  // ===================> Social tab schema start <===================

  social: Yup.object().shape({
    ogTags: Yup.object().shape({
      image: imageValidation,
      ...socialMediaFields,
    }),
    facebook: Yup.object().shape(socialMediaFields),
    twitter: Yup.object().shape(socialMediaFields),
    linkedin: Yup.object().shape(socialMediaFields),
    pinterest: Yup.object().shape(socialMediaFields),
  }),

  // ===================> Integration tab schema start <===================
  integration: Yup.object().shape({
    enabled: Yup.boolean().required(),
    semrushAPIKey: Yup.string()
      .trim()
      .when("enabled", {
        is: true,
        then: (schema) =>
          schema
            .required("Semrush API key is required")
            .matches(
              /^[A-Za-z0-9]+$/,
              "API key must contain only letters and numbers"
            )
            .min(10, "API key must be at least 10 characters"),
        otherwise: (schema) => schema.optional(),
      }),
  }),
  // ===================> Integration tab schema end <===================
});
