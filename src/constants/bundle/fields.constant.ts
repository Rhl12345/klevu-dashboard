import { TDynamicFields } from "@/types/products-database/productDatabase.type";
import * as Yup from "yup";
import {
  CATEGORY_FORM_FIELD,
  GENDER_FORM_FIELD,
  PAGE_REDIRECTION_URL_FORM_FIELD,
  PRICING_FORM_FIELD,
  PRODUCT_DATABASE_COMMON_FIELDS,
  SE_NAME_FORM_FIELD,
  SHORT_DESCRIPTION_FORM_FIELD,
} from "../product-database/fields.constant";

export type FieldType =
  | "text"
  | "number"
  | "dropdown"
  | "checkbox"
  | "richtext"
  | "readonly"
  | "toggle"
  | "volume";

export interface IFieldConfig {
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  isRequired?: boolean;
  validation?: any; // Yup validation schema
  options?: { label: string; value: string | number }[]; // For dropdowns
  dependsOn?: string; // For conditional fields
  disabled?: boolean;
  fullWidth?: boolean;
  initialValue?: any;
  subFields?: TDynamicFields;
}

export const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Draft", value: "draft" },
];

export const PRODUCT_TYPE_OPTIONS = [
  { label: "Blank", value: "blank" },
  { label: "FG", value: "fg" },
  { label: "Gift Card", value: "gift-card" },
];

export const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Unisex", value: "unisex" },
  { label: "Youth", value: "youth" },
];

export const DECORATION_OPTIONS = [
  { label: "Embroidery", value: "embroidery" },
  { label: "Print", value: "print" },
  { label: "ENG", value: "engraving" },
];

export const BUNDLE_COMMON_FIELDS: TDynamicFields = {
  bundleName: {
    label: "Bundle Name",
    name: "bundleName",
    placeholder: "Enter Bundle Name",
    type: "text",
    isRequired: true,
    validation: Yup.string().trim().required("Bundle Name is required"),
    initialValue: "",
    fullWidth: true,
  },
  hasDifferentErpName: PRODUCT_DATABASE_COMMON_FIELDS.hasDifferentErpName,
  differentErpName: PRODUCT_DATABASE_COMMON_FIELDS.differentErpName,
  hasExistingErpId: PRODUCT_DATABASE_COMMON_FIELDS.hasExistingErpId,
  erpItemId: PRODUCT_DATABASE_COMMON_FIELDS.erpItemId,
  sku: PRODUCT_DATABASE_COMMON_FIELDS.sku,
  productType: PRODUCT_DATABASE_COMMON_FIELDS.productType,
  taxCode: PRODUCT_DATABASE_COMMON_FIELDS.taxCode,
  pageRedirectionUrl: PAGE_REDIRECTION_URL_FORM_FIELD.pageRedirectionUrl,
  seName: SE_NAME_FORM_FIELD.seName,
  category: CATEGORY_FORM_FIELD.category,
  description: PRODUCT_DATABASE_COMMON_FIELDS.description,
};

export const STORE_BUNDLE_FIELDS: TDynamicFields = {
  gender: GENDER_FORM_FIELD.gender,
  shortDescription: SHORT_DESCRIPTION_FORM_FIELD.shortDescription,
  searchDimensionTemplate:
    PRODUCT_DATABASE_COMMON_FIELDS.searchDimensionTemplate,
  volume: PRODUCT_DATABASE_COMMON_FIELDS.volume,
  weight: PRODUCT_DATABASE_COMMON_FIELDS.weight,
  shipWeight: PRODUCT_DATABASE_COMMON_FIELDS.shipWeight,
};

export const BUNDLE_PRICING_FORM_FIELD: TDynamicFields = {
  ...PRICING_FORM_FIELD,
  isGiftWrapEnabled: {
    label: "Is Gift Wrap",
    name: "isGiftWrapEnabled",
    type: "checkbox",
    validation: Yup.boolean(),
    initialValue: false,
    fullWidth: true,
  },
  giftWrapPrice: {
    label: "Gift Wrap Price",
    name: "giftWrapPrice",
    type: "number",
    isRequired: true,
    placeholder: "Enter Gift Wrap Price",
    validation: Yup.number().when("isGiftWrapEnabled", {
      is: true,
      then: (schema) =>
        schema
          .required("Gift Wrap Price is required")
          .min(0, "Gift Wrap Price should not be negative"),
    }),
    dependsOn: "isGiftWrapEnabled",
    initialValue: "",
  },
};

export const emptyInitialValues = Object.entries(BUNDLE_COMMON_FIELDS).reduce(
  (acc, [key, field]) => {
    acc[key] = field.initialValue;
    if (field.subFields) {
      Object.entries(field.subFields).forEach(([subKey, subField]) => {
        acc[subKey] = subField.initialValue;
      });
    }
    return acc;
  },
  {} as Record<string, any>
);

export const BUNDLE_FIELDS_ORDER = [
  "bundleName",
  "hasDifferentErpName",
  "differentErpName",
  "hasExistingErpId",
  "erpItemId",
  "sku",
  "productType",
  "taxCode",
  "gender",
  "pageRedirectionUrl",
  "seName",
  "decoration",
  "category",
  "description",
  "shortDescription",
  "searchDimensionTemplate",
  "volume",
  "weight",
  "shipWeight",
];
