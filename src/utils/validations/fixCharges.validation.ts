import * as yup from "yup";
export const FixChargesSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().trim().required("Name is required."),
  charges: yup.string().trim().required("Charges is required."),
  storeName: yup.string().trim().required("Please select a store."),
});
