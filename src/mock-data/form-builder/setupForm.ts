import { ITabOption } from "@/components/Tab/types";
import { IFormTypeSectionProps } from "@/types/form-builder/formBuilder.type";

export const formLengthOptions = [
  { value: "1", label: "1 Page" },

  { value: "2", label: "2 Pages" },
  { value: "3", label: "3 Pages" },
  { value: "4", label: "4 Pages" },
  { value: "5", label: "5 Pages" },
];

export const storeBuildernavlocationcodeOptions = [
  { value: "GPK", label: "GPK" },
  { value: "PK", label: "PK" },
  { value: "DROPSHIP", label: "DROPSHIP" },
  { value: "ODADVPK", label: "ODADVPK" },
  { value: "ODLLYDVD", label: "ODLLYDVD" },
  { value: "ODMCHSLT", label: "ODMCHSLT" },
  { value: "ODSTAG", label: "ODSTAG" },
  { value: "ODCTYSPRT", label: "ODCTYSPRT" },
  { value: "ODCMTHRD", label: "ODCMTHRD" },
  { value: "ODROYLTHRD", label: "ODROYLTHRD" },
  { value: "ODMARKYT", label: "ODMARKYT" },
  { value: "ODENTIRE", label: "ODENTIRE" },
];

export const importProductSkuOptions = [
  { value: "decoratedSKU", label: "Decorated SKU" },
  { value: "blankSKU", label: "Blank SKU" },
];

export const productCountOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

export const payBusinessMethodIdStringOptions: IFormTypeSectionProps["payBusinessMethodIdStringOptions"] =
  [
    {
      label: "Ship to One Location",
      value: 0,
    },
    {
      label: "Select from Multiple Locations",
      value: 1,
    },
    {
      label: "Home Shipments",
      value: 2,
    },
    {
      label: "Selection from Multiple Locations + Home Shipments",
      value: 3,
    },
  ];

export const countries = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Mexico", label: "Mexico" },
];

export const states = [
  { value: "California", label: "California" },
  { value: "New York", label: "New York" },
  { value: "Texas", label: "Texas" },
];

export const AddressType = {
  billing: "billing",
  shipping: "shipping",
  state: {
    billing: "billingState",
    shipping: "shipState",
  },
};

export const formBuilderTabItems: ITabOption[] = [
  { id: 0, label: "Setup" },
  { id: 1, label: "Primary Selection Group" },
  { id: 2, label: "Additional Selection Group" },
  { id: 3, label: "Fixed Products" },
  { id: 4, label: "Save & Configure Form" },
  { id: 5, label: "Configuration" },
  { id: 6, label: "Form Theme Configuration" },
  { id: 7, label: "Report" },
  { id: 8, label: "Share Report" },
  { id: 9, label: "Product Sequence" },
];
