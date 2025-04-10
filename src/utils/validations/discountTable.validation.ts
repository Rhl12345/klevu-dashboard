import * as Yup from "yup";

/**
 * @file discountTable.validation.ts
 * @description Centralized validation schemas for discount table related forms
 */

// Validation messages
export const ValidationMsgs = {
  quantityDiscountDetail: {
    lowQuantityTypeError: "Low Quantity must be a number",
    lowQuantityRequired: "Low Quantity is required",
    lowQuantityMin: "Low Quantity must be greater than zero",
    highQuantityTypeError: "High Quantity must be a number",
    highQuantityRequired: "High Quantity is required",
    highQuantityMin: "High Quantity must be greater than Low Quantity",
    discountPercentTypeError: "Discount Percent must be a number",
    discountPercentMax: "Discount Percent cannot exceed 100",
    discountPercentRequired: "Discount Percent is required",
    discountPercentMin: "Discount Percent must be greater than 0",
  },
  discountTable: {
    storeRequired: "Store is required",
    nameRequired: "Name is required",
    statusRequired: "Status is required",
    brandRequired: "Brand is required",
    vendorRequired: "Vendor is required",
  },
  clone: {
    quantityNameRequired: "Quantity Name is required",
    quantityNameMin: "Name must be at least 3 characters",
    quantityNameMax: "Name must not exceed 50 characters",
  },
};

// Discount Detail validation schema
export const discountDetailValidationSchema = Yup.object().shape({
  minQuantity: Yup.number()
    .min(1, ValidationMsgs.quantityDiscountDetail.lowQuantityMin)
    .required(ValidationMsgs.quantityDiscountDetail.lowQuantityRequired),
  maxQuantity: Yup.number()
    .required(ValidationMsgs.quantityDiscountDetail.highQuantityRequired)
    .when("minQuantity", {
      is: (val: number) => !isNaN(val),
      then: (schema) =>
        schema.min(
          Yup.ref("minQuantity"),
          ValidationMsgs.quantityDiscountDetail.highQuantityMin
        ),
    }),
  discount: Yup.number()
    .min(1, ValidationMsgs.quantityDiscountDetail.discountPercentMin)
    .max(100, ValidationMsgs.quantityDiscountDetail.discountPercentMax)
    .required(ValidationMsgs.quantityDiscountDetail.discountPercentRequired),
});

// Discount Table validation schema
export const discountTableValidationSchema = Yup.object().shape({
  storeId: Yup.number()
    .min(1, ValidationMsgs.discountTable.storeRequired)
    .required(ValidationMsgs.discountTable.storeRequired),
  quantityName: Yup.string()
    .trim()
    .required(ValidationMsgs.discountTable.nameRequired),
  recStatus: Yup.string().required(ValidationMsgs.discountTable.statusRequired),
  brandId: Yup.number().when(["isBundle", "storeId"], {
    is: (isBundle: boolean, storeId: number) => !isBundle && storeId > 0,
    then: (schema) => schema.min(1, ValidationMsgs.discountTable.brandRequired),
    otherwise: (schema) => schema.nullable(),
  }),
  vendorId: Yup.number().when(["isBundle", "storeId", "brandId"], {
    is: (isBundle: boolean, storeId: number, brandId: number) =>
      !isBundle && storeId > 0 && brandId > 0,
    then: (schema) =>
      schema.min(1, ValidationMsgs.discountTable.vendorRequired),
    otherwise: (schema) => schema.nullable(),
  }),
});

// Clone validation schema
export const cloneValidationSchema = Yup.object().shape({
  quantityName: Yup.string()
    .required(ValidationMsgs.clone.quantityNameRequired)
    .min(3, ValidationMsgs.clone.quantityNameMin)
    .max(50, ValidationMsgs.clone.quantityNameMax),
});
