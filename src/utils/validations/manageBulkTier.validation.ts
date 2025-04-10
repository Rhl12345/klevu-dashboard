import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    customerNumber: Yup.string().trim().required("Customer Number is required"),
    storeName: Yup.string().trim().required("Store Name is required"),
    tier: Yup.string().trim().required("Tier is required"),
});