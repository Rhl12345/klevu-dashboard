import {
  IFormBuilderMoreFilterOption,
  IFormField,
  ISetupFormValues,
} from "@/types/form-builder/formBuilder.type";

export const moreFilterOptions: IFormBuilderMoreFilterOption[] = [
  {
    name: "Brand",
    options: [
      { label: "A T Cross Company", value: "A T Cross Company" },
      { label: "adidas", value: "adidas" },
    ],
    type: "checkbox",
  },
  {
    name: "Name",
    options: [
      { label: "Admin 0", value: "Admin 0" },
      { label: "Admin 1", value: "Admin 1" },
    ],
    type: "checkbox",
  },
  {
    name: "Date",
    options: [],
    type: "date",
  },
];

export const FORM_FIELDS: IFormField[] = [
  {
    name: "name" as keyof ISetupFormValues,
    label: "Name",
    options: { asterisk: true },
  },
  {
    name: "formType" as keyof ISetupFormValues,
    label: "Form Type",
    options: {
      asterisk: true,
      type: "dropdown",
      options: [
        { label: "Fill Multi Product Form", value: "filledUpForm" },
        { label: "Request Form", value: "requestForm" },
      ],
    },
  },
  {
    name: "programId" as keyof ISetupFormValues,
    label: "Program Id",
    options: { asterisk: true },
  },
  {
    name: "url" as keyof ISetupFormValues,
    label: "URL",
    options: { asterisk: true },
  },
] as const;

export const MODAL_TYPES = {
  CLONE: "clone",
  VIEW_DATA: "viewData",
  DELETE: "delete",
  ACTIVE_INACTIVE: "activeInactive",
} as const;

export const TAB_CONFIG = {
  SETUP: {
    key: "setup",
    title: "Setup",
  },
  ADDITIONAL_SELECTION_GROUP: {
    key: "additionalSelectionGroup",
    title: "Additional Selection Group",
  },
  SAVE_CONFIGURE: {
    key: "saveConfigureForm",
    title: "Save & Configure Form",
  },
  CONFIGURATION: {
    key: "configuration",
    title: "Configuration",
  },
  FORM_THEME_CONFIGURATION: {
    key: "formThemeConfiguration",
    title: "Form Theme Configuration",
  },
  REPORT: {
    key: "report",
    title: "Report",
  },
  SHARE_REPORT: {
    key: "shareReport",
    title: "Share Report",
  },
  PRODUCT_SEQUENCE: {
    key: "productSequence",
    title: "Product Sequence",
  },
} as const;
