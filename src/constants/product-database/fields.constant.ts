import { TDynamicFields } from "@/types/products-database/productDatabase.type";
import * as Yup from "yup";

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

export const PRODUCT_DATABASE_COMMON_FIELDS: TDynamicFields = {
  brand: {
    label: "Brand OR Manufacturer Name",
    name: "brand",
    type: "dropdown",
    placeholder: "Select Brand",
    isRequired: true,
    options: [], // To be populated from API or other source
    validation: Yup.string().trim().required("Brand is required"),
    initialValue: "",
    fullWidth: true,
  },
  vendor: {
    label: "Vendor Name",
    name: "vendor",
    type: "dropdown",
    placeholder: "Select Vendor",
    isRequired: true,
    options: [], // To be populated from API or other source
    validation: Yup.string().trim().required("Vendor is required"),
    initialValue: "",
    fullWidth: true,
  },
  productName: {
    label: "Product Name",
    name: "productName",
    type: "text",
    placeholder: "Enter Product Name",
    isRequired: true,
    validation: Yup.string().trim().required("Product Name is required"),
    initialValue: "",
    fullWidth: true,
  },
  hasDifferentErpName: {
    label: "Our ERP / BC will have different Name from Above Name",
    name: "hasDifferentErpName",
    type: "checkbox",
    validation: Yup.boolean(),
    fullWidth: true,
    initialValue: false,
  },
  differentErpName: {
    label: "ERP Name / BC Name",
    name: "differentErpName",
    type: "text",
    placeholder: "Enter ERP Name",
    validation: Yup.string()
      .trim()
      .when("hasDifferentErpName", {
        is: true,
        then: (schema) => schema.required("ERP Name is required"),
      }),
    dependsOn: "hasDifferentErpName",
    fullWidth: true,
    initialValue: "",
  },
  hasExistingErpId: {
    label: "This item has and Existing ID in our ERP / BC",
    name: "hasExistingErpId",
    type: "checkbox",
    validation: Yup.boolean(),
    fullWidth: true,
    initialValue: false,
  },
  erpItemId: {
    label: "ERP / BC Item ID",
    name: "erpItemId",
    type: "number",
    placeholder: "Enter ERP Item ID",
    validation: Yup.number().when("hasExistingErpId", {
      is: true,
      then: (schema) => schema.required("ERP Item ID is required"),
    }),
    dependsOn: "hasExistingErpId",
    fullWidth: true,
    initialValue: "",
  },
  vendorSku: {
    label: "Vendor SKU / Manufacturer / Brand Part Number",
    name: "vendorSku",
    type: "text",
    placeholder: "Enter Vendor SKU",
    isRequired: true,
    validation: Yup.string().trim().required("Vendor SKU is required"),
    initialValue: "",
  },
  sku: {
    label: "Our SKU",
    name: "sku",
    type: "text",
    placeholder: "Enter Our SKU",
    isRequired: true,
    validation: Yup.string().trim().required("SKU is required"),
    initialValue: "",
  },
  productType: {
    label: "Product Type",
    name: "productType",
    type: "dropdown",
    isRequired: true,
    placeholder: "Select Product Type",
    options: [], // To be populated from API or other source
    validation: Yup.string().trim().required("Product Type is required"),
    initialValue: "",
  },
  companionProduct: {
    label: "Companion Product",
    name: "companionProduct",
    type: "dropdown",
    placeholder: "Select Companion Product",
    options: [], // To be populated from API or other source
    validation: Yup.string().trim(),
    initialValue: "",
  },
  taxCode: {
    label: "Tax Code",
    name: "taxCode",
    type: "text",
    isRequired: true,
    placeholder: "Enter Tax Code",
    validation: Yup.string().trim().required("Tax Code is required"),
    initialValue: "",
  },
  description: {
    label: "Description",
    name: "description",
    type: "richtext",
    isRequired: true,
    fullWidth: true,
    validation: Yup.string().trim().required("Description is required"),
    initialValue: "",
  },
  searchDimensionTemplate: {
    label: "Search Dimension Template",
    name: "searchDimensionTemplate",
    type: "dropdown",
    placeholder: "Select Search Dimension Template",
    options: [], // To be populated from API or other source
    validation: Yup.string().trim(),
    initialValue: "",
    fullWidth: true,
  },
  volume: {
    label: "Volume",
    name: "volume",
    type: "volume",
    placeholder: "Enter Volume",
    validation: Yup.number().optional().positive("Volume must be positive"),
    initialValue: "",
    fullWidth: true,
    subFields: {
      length: {
        label: "Length",
        name: "length",
        placeholder: "Enter Length",
        type: "number",
        validation: Yup.number().optional().positive("Length must be positive"),
        initialValue: "",
      },
      width: {
        label: "Width",
        name: "width",
        placeholder: "Enter Width",
        type: "number",
        validation: Yup.number().optional().positive("Width must be positive"),
        initialValue: "",
      },
      height: {
        label: "Height",
        name: "height",
        placeholder: "Enter Height",
        type: "number",
        validation: Yup.number().optional().positive("Height must be positive"),
        initialValue: "",
      },
    },
  },
  weight: {
    label: "Weight (LBS)",
    name: "weight",
    type: "number",
    placeholder: "Enter Weight",
    validation: Yup.number().optional().positive("Weight must be positive"),
    initialValue: "",
  },
  shipWeight: {
    label: "Ship Weight (LBS)",
    name: "shipWeight",
    type: "number",
    placeholder: "Enter Ship Weight",
    validation: Yup.number()
      .optional()
      .positive("Ship weight must be positive"),
    initialValue: "",
  },
};

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

export const GENDER_FORM_FIELD: TDynamicFields = {
  gender: {
    label: "Gender",
    name: "gender",
    type: "dropdown",
    placeholder: "Select Gender",
    options: GENDER_OPTIONS,
    validation: Yup.string().trim(),
    initialValue: "",
  },
};

export const DECORATION_FORM_FIELD: TDynamicFields = {
  decoration: {
    label: "Decoration",
    name: "decoration",
    type: "dropdown",
    placeholder: "Select Decoration",
    options: [],
    validation: Yup.string().trim(),
    initialValue: "",
    fullWidth: true,
  },
};

export const CATEGORY_FORM_FIELD: TDynamicFields = {
  category: {
    label: "Category",
    name: "category",
    type: "dropdown",
    placeholder: "Select Category",
    isRequired: true,
    options: [],
    validation: Yup.string().trim().required("Category is required"),
    initialValue: "",
    fullWidth: true,
  },
};

export const SHORT_DESCRIPTION_FORM_FIELD: TDynamicFields = {
  shortDescription: {
    label: "Short Description",
    name: "shortDescription",
    type: "richtext",
    isRequired: true,
    fullWidth: true,
    validation: Yup.string().trim().required("Short Description is required"),
    initialValue: "",
  },
};

export const STATUS_FORM_FIELD: TDynamicFields = {
  status: {
    label: "Status",
    name: "status",
    type: "dropdown",
    isRequired: true,
    placeholder: "Select Status",
    disabled: false,
    fullWidth: true,
    validation: Yup.string().trim().required("Status is required"),
    initialValue: "",
    options: [],
  },
};

export const PRICING_FORM_FIELD: TDynamicFields = {
  msrp: {
    label: "MSRP",
    name: "msrp",
    type: "number",
    placeholder: "Enter MSRP",
    isRequired: true,
    validation: Yup.number()
      .required("MSRP is required")
      .min(0, "MSRP should not be negative"),
    initialValue: "",
  },
  ourCost: {
    label: "Our Cost",
    name: "ourCost",
    type: "number",
    placeholder: "Enter Our Cost",
    isRequired: true,
    validation: Yup.number()
      .required("Our Cost is required")
      .min(0, "Our Cost should not be negative")
      .test(
        "is-less-than-msrp",
        "Our Cost must be less than or equal to MSRP",
        function (value) {
          const msrp = this.parent.msrp;
          return value <= msrp;
        }
      ),
    initialValue: "",
  },
  imap: {
    label: "IMAP",
    name: "imap",
    type: "number",
    placeholder: "Enter IMAP",
    validation: Yup.number()
      .optional()
      .min(0, "IMAP should not be negative")
      .test(
        "is-less-than-msrp  ",
        "IMAP must be less than or equal to MSRP",
        function (value) {
          const msrp = this.parent.msrp;
          const isImapEnabled = this.parent.isImapEnabled;
          return isImapEnabled ? true : value ? value <= msrp : true;
        }
      ),
    initialValue: 0,
  },
  salePrice: {
    label: "Sale Price",
    name: "salePrice",
    type: "number",
    placeholder: "Enter Sale Price",
    isRequired: true,
    validation: Yup.number()
      .required("Sale Price is required")
      .min(0, "Sale Price should not be negative")
      .test(
        "is-less-than-msrp",
        "Sale Price must be less than MSRP",
        function (value) {
          const msrp = this.parent.msrp;
          return value ? value <= msrp : true;
        }
      ),
    initialValue: "",
  },
  isImapEnabled: {
    label: "Enable (IMAP) Minimum Advertised Price",
    name: "isImapEnabled",
    type: "checkbox",
    validation: Yup.boolean(),
    initialValue: false,
    fullWidth: true,
  },
};

export const CALL_FOR_PRICE_FORM_FIELD: TDynamicFields = {
  callForPrice: {
    label: "Call for Price",
    name: "callForPrice",
    type: "checkbox",
    validation: Yup.boolean(),
    initialValue: false,
    fullWidth: true,
  },
};

export const STORE_FORM_PRICING_FORM_FIELD: TDynamicFields = {
  ...PRICING_FORM_FIELD,
  isGiftWrapEnabled: {
    label: "Is Gift Wrap",
    name: "isGiftWrapEnabled",
    type: "checkbox",
    validation: Yup.boolean(),
    initialValue: false,
    fullWidth: true,
  },
  ...CALL_FOR_PRICE_FORM_FIELD,
  isImapEnabled: {
    label: "Enable (IMAP) Minimum Advertised Price",
    name: "isImapEnabled",
    type: "checkbox",
    validation: Yup.boolean(),
    initialValue: false,
    fullWidth: true,
  },
};

export const emptyInitialValues = Object.entries(
  PRODUCT_DATABASE_COMMON_FIELDS
).reduce(
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

export const PAGE_REDIRECTION_URL_FORM_FIELD: TDynamicFields = {
  pageRedirectionUrl: {
    label: "Page Redirection URL",
    name: "pageRedirectionUrl",
    type: "text",
    placeholder: "Enter Page Redirection URL",
    validation: Yup.string().trim(),
    initialValue: "",
  },
};

export const SE_NAME_FORM_FIELD: TDynamicFields = {
  seName: {
    label: "Se Name",
    name: "seName",
    type: "text",
    isRequired: true,
    placeholder: "Enter Se Name",
    validation: Yup.string().trim().required("Se Name is required"),
    initialValue: "",
  },
};

export const NOTIFICATION_BANNER_FORM_FIELD: TDynamicFields = {
  notificationBanner: {
    label: "Notification Banner",
    name: "notificationBanner",
    type: "toggle",
    fullWidth: true,
    initialValue: false,
  },
};

export const PRODUCT_AND_CORE_PRODUCT_FIELDS_ORDER = [
  "brand",
  "vendor",
  "productName",
  "hasDifferentErpName",
  "differentErpName",
  "hasExistingErpId",
  "erpItemId",
  "vendorSku",
  "sku",
  "productType",
  "companionProduct",
  "taxCode",
  "gender",
  "pageRedirectionUrl",
  "seName",
  "decoration",
  "category",
  "description",
  "shortDescription",
  "notificationBanner",
  "searchDimensionTemplate",
  "volume",
  "weight",
  "shipWeight",
];
