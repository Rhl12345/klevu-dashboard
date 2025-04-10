import { ICouponFormValues } from "@/types/promotions/promotions.type";
import * as yup from "yup";

export const getInitialValues = (couponCode: any) => {
  const couponCodeInitialValues: ICouponFormValues = {
    discountName: couponCode?.name || "",
    store: couponCode?.storeName || "",
    discountCode: couponCode?.discountCode || "",
    promotionType: couponCode?.promotionType || "isPercentage",
    rangeDetails: couponCode?.rangeDetails || [
      {
        rangeFrom: 0,
        rangeTo: 0,
        discountValue: 0,
        valuePercentage: 0,
        usePercentage: false,
      },
    ],
    appliesTo: "isAllProduct",
    minimumRequirements: couponCode?.minimumRequirements || "isNoneMinimum",
    customerEligibility: couponCode?.customerEligibility || "isEveryone",
    isLimitNoOfTimes: couponCode?.isLimitNoOfTimes || false,
    isLimitOneUser: couponCode?.isLimitOneUser || false,
    startDate: couponCode?.startdate || "",
    endDate: couponCode?.enddate || "",
    discountValue: couponCode?.discountValue || "",
    selectedBrands: couponCode?.selectedBrands || [],
    selectedCategories: couponCode?.selectedCategories || [],
    selectedProducts: couponCode?.selectedProducts || [],
    minimumPurchaseAmount: couponCode?.minimumPurchaseAmount || "",
    minimumQuantity: couponCode?.minimumQuantity || "",
    selectedCustomers: couponCode?.selectedCustomers || [],
    totalUsageLimit: couponCode?.totalUsageLimit || "",
  };
  return couponCodeInitialValues;
};

export const couponCodeValidationSchema = yup.object().shape({
  discountName: yup.string().trim().required("Discount name is required"),
  store: yup.string().trim().required("Store is required"),
  discountCode: yup.string().trim().required("Discount code is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
  promotionType: yup.string().trim().required("Promotion type is required"),
  rangeDetails: yup.array().of(
    yup.object().shape({
      rangeFrom: yup
        .number()
        .min(0, "Range from must be positive")
        .required("Range from is required"),
      rangeTo: yup
        .number()
        .min(0, "Range to must be positive")
        .required("Range to is required"),
      discountValue: yup
        .number()
        .min(0, "Discount value must be positive")
        .when("usePercentage", (usePercentage) => {
          return usePercentage
            ? yup.number().max(100, "Percentage cannot exceed 100")
            : yup.number();
        }),
    })
  ),
  appliesTo: yup.string().trim().required("Applies to is required"),
});
