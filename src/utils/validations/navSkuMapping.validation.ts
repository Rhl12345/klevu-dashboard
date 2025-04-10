import * as yup from "yup";
export const NavSkuMappingSchema = yup.object().shape({
  storeName: yup.string().trim().required("Please select a store."),
  currentSku: yup.string().trim().required("Current Sku is required"),
  bcSku: yup.string().trim().required("BC Sku is required"),
});
