import * as yup from "yup";
export const ProductTagsSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().trim().required("Name is required."),
  charges: yup.string().trim().required("Charges is required."),
  storeName: yup.string().trim().required("Please select a store."),
  tagType: yup.string().trim().required("Please select a tag type."),
  createdBy: yup.string().trim().required("Enter The name."),
  position: yup.string().trim().required("Please select a position."),
});
